/**
 * Fail verify when built sitemaps, robots.txt, and static shells drift from routes.ts counts.
 * Run after `npm run build`.
 */
import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";

const DIST = "dist";

function readDist(name) {
  const path = join(DIST, name);
  if (!existsSync(path)) {
    console.error(`audit-seo-sitemap: missing ${path} — run npm run build first`);
    process.exit(1);
  }
  return readFileSync(path, "utf8");
}

function extractLocs(xml) {
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
}

function extractLastmods(xml) {
  return [...xml.matchAll(/<lastmod>([^<]+)<\/lastmod>/g)].map((m) => m[1]);
}

function pathnameFromLoc(loc, siteUrl) {
  const prefix = siteUrl.replace(/\/+$/, "");
  if (!loc.startsWith(prefix)) return null;
  const path = loc.slice(prefix.length) || "/";
  return path.endsWith("/") ? path : `${path}/`;
}

function shellPathForPathname(pathname) {
  if (pathname === "/" || pathname === "") return join(DIST, "index.html");
  const rel = pathname.replace(/^\/+|\/+$/g, "");
  return join(DIST, rel, "index.html");
}

function main() {
  const meta = JSON.parse(readDist(".sitemap-build-meta.json"));
  const primaryXml = readDist("sitemap.xml");
  const videoXml = readDist("sitemap-videos.xml");
  const robots = readDist("robots.txt");

  const errors = [];

  const primaryLocs = extractLocs(primaryXml);
  const videoLocs = extractLocs(videoXml);

  if (primaryLocs.length !== meta.primaryUrlCount) {
    errors.push(`sitemap.xml has ${primaryLocs.length} URLs, expected ${meta.primaryUrlCount}`);
  }
  if (videoLocs.length !== meta.videoUrlCount) {
    errors.push(`sitemap-videos.xml has ${videoLocs.length} URLs, expected ${meta.videoUrlCount}`);
  }

  if (existsSync(join(DIST, "sitemap-virtual-service-cities.xml"))) {
    errors.push("sitemap-virtual-service-cities.xml must not be emitted (matrix is noindex)");
  }
  if (robots.includes("sitemap-virtual-service-cities.xml")) {
    errors.push("robots.txt must not list sitemap-virtual-service-cities.xml");
  }

  const matrixLoc = /\/online-consultation\/(?!country\/)[^/]+\/[^/]+\/?$/;
  const matrixInPrimary = primaryLocs.filter((loc) => matrixLoc.test(loc));
  if (matrixInPrimary.length > 0) {
    errors.push(
      `sitemap.xml lists ${matrixInPrimary.length} noindexed service×city URL(s), e.g. ${matrixInPrimary[0]}`,
    );
  }

  let matrixIndexable = 0;
  let matrixChecked = 0;
  const matrixSample = (meta.noindexVirtualServiceCitySample ?? []).slice(0, 25);
  for (const pathname of matrixSample) {
    const shell = shellPathForPathname(pathname.endsWith("/") ? pathname : `${pathname}/`);
    if (!existsSync(shell)) {
      errors.push(`missing static shell for noindexed matrix page ${pathname}`);
      continue;
    }
    matrixChecked += 1;
    const html = readFileSync(shell, "utf8");
    if (!/<meta\s+name="robots"\s+content="noindex, follow"/.test(html)) matrixIndexable += 1;
  }
  if (matrixIndexable > 0) {
    errors.push(`${matrixIndexable} sampled service×city shell(s) are missing noindex, follow`);
  }
  if ((meta.noindexVirtualServiceCityCount ?? 0) > 0 && matrixChecked === 0) {
    errors.push("no service×city shells were sampled for noindex");
  }

  const contentSignal = "Content-Signal: search=yes, ai-input=yes, ai-train=no";
  if (!robots.includes(contentSignal)) {
    errors.push(`robots.txt missing ${contentSignal}`);
  } else {
    const contentSignalOrder =
      /User-agent:\s+\*\s*\nContent-Signal:\s*search=yes,\s*ai-input=yes,\s*ai-train=no\s*\nAllow:\s*\//m;
    if (!contentSignalOrder.test(robots)) {
      errors.push("robots.txt Content-Signal must sit under User-agent: * before Allow: /");
    }
  }

  for (const line of [`${meta.siteUrl}/sitemap.xml`, `${meta.siteUrl}/sitemap-videos.xml`]) {
    if (!robots.includes(line)) {
      errors.push(`robots.txt missing Sitemap: ${line}`);
    }
  }

  // SEO-09: lastmod is optional. When present it must be a real calendar date, not future,
  // and must not be required to equal the build clock (build-day stamps are not content dates).
  const today = new Date().toISOString().slice(0, 10);
  const isoDay = /^\d{4}-\d{2}-\d{2}$/;
  for (const [label, xml] of [["sitemap.xml", primaryXml]]) {
    for (const d of extractLastmods(xml)) {
      if (!isoDay.test(d)) {
        errors.push(`${label}: invalid <lastmod> ${d}`);
        break;
      }
      if (d > today) {
        errors.push(`${label}: future <lastmod> ${d}`);
        break;
      }
    }
  }
  // Video publication dates live under video:publication_date (postedAt only) — not url lastmod.

  const intlInPrimary = primaryLocs.filter((loc) =>
    loc.includes("/international-consultation/"),
  ).length;
  if (intlInPrimary < meta.internationalConsultationUrlCount - 1) {
    errors.push(
      `primary sitemap lists ${intlInPrimary} international-consultation URLs, expected ${meta.internationalConsultationUrlCount}`,
    );
  }

  let missingShells = 0;
  for (const loc of primaryLocs) {
    const pathname = pathnameFromLoc(loc, meta.siteUrl);
    if (!pathname) continue;
    const shell = shellPathForPathname(pathname);
    if (!existsSync(shell)) {
      missingShells += 1;
      if (missingShells <= 3) {
        errors.push(`missing static shell for ${pathname} (${shell})`);
      }
    }
  }
  if (missingShells > 3) {
    errors.push(`… and ${missingShells - 3} more missing static shells`);
  }

  if (errors.length === 0) {
    console.log(
      `audit-seo-sitemap: OK (lastmodStrategy ${meta.lastmodStrategy ?? "unknown"}; primary ${primaryLocs.length}, video ${videoLocs.length}; ${meta.noindexVirtualServiceCityCount} service×city pages noindex, ${matrixChecked} sampled)`,
    );
    return;
  }

  console.error(`audit-seo-sitemap: ${errors.length} issue(s):\n`);
  for (const e of errors) console.error(`  ${e}`);
  process.exit(1);
}

main();
