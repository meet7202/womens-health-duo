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

  const imageXml = existsSync(join(DIST, "sitemap-images.xml"))
    ? readDist("sitemap-images.xml")
    : "";
  const imagePages = imageXml ? extractLocs(imageXml) : [];
  const imageCount = (imageXml.match(/<image:loc>/g) ?? []).length;
  if (!imageXml) errors.push("sitemap-images.xml is missing");
  if (!robots.includes("sitemap-images.xml")) {
    errors.push("robots.txt must list sitemap-images.xml");
  }
  if (imageCount < 50) {
    errors.push(`sitemap-images.xml lists ${imageCount} photos, expected the content set`);
  }
  for (const needle of [
    "/images/classes/",
    "/images/articles/",
    "/images/hub-thumbs/",
    "hero-doctors",
    "dr-zalak",
    "dr-charmi",
  ]) {
    if (imageXml && !imageXml.includes(needle)) {
      errors.push(`sitemap-images.xml is missing ${needle}`);
    }
  }
  if (existsSync(join(DIST, "sitemap-virtual-service-cities.xml"))) {
    errors.push(
      "sitemap-virtual-service-cities.xml must not be emitted (the matrix is in sitemap.xml)",
    );
  }
  if (robots.includes("sitemap-virtual-service-cities.xml")) {
    errors.push("robots.txt must not list sitemap-virtual-service-cities.xml");
  }

  const matrixLoc = /\/online-consultation\/(?!country\/)[^/]+\/[^/]+\/?$/;
  const matrixInPrimary = primaryLocs.filter((loc) => matrixLoc.test(loc));
  const matrixExpected = meta.virtualServiceCityCount ?? 0;
  if ((meta.noindexVirtualServiceCityCount ?? 0) !== 0) {
    errors.push(
      `service×city pages must all be indexable; noindex count is ${meta.noindexVirtualServiceCityCount}`,
    );
  }
  if (matrixInPrimary.length !== matrixExpected) {
    errors.push(
      `sitemap.xml lists ${matrixInPrimary.length} service×city URLs, expected ${matrixExpected}`,
    );
  }
  let matrixProblems = 0;
  for (const loc of matrixInPrimary) {
    const pathname = new URL(loc).pathname.replace(/\/+$/, "");
    const shell = shellPathForPathname(`${pathname}/`);
    if (!existsSync(shell)) {
      matrixProblems += 1;
      if (matrixProblems <= 3)
        errors.push(`missing static shell for service×city page ${pathname}`);
      continue;
    }
    const html = readFileSync(shell, "utf8");
    const robotsOk = /<meta\s+name="robots"\s+content="index, follow/.test(html);
    const prerendered = html.includes("data-seo-prerender");
    if (!robotsOk || !prerendered) {
      matrixProblems += 1;
      if (matrixProblems <= 3) {
        errors.push(
          `service×city page ${pathname}: ${robotsOk ? "" : "not index, follow "}${prerendered ? "" : "not prerendered"}`.trim(),
        );
      }
    }
  }
  if (matrixProblems > 3) {
    errors.push(`… and ${matrixProblems - 3} more service×city shell problems`);
  }

  const imageMatrix = imagePages.filter((loc) => matrixLoc.test(loc));
  if (imageMatrix.length > 0 && imageMatrix.length < matrixExpected) {
    errors.push(
      `sitemap-images.xml lists ${imageMatrix.length} service×city pages, expected ${matrixExpected}`,
    );
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
      `audit-seo-sitemap: OK (lastmodStrategy ${meta.lastmodStrategy ?? "unknown"}; primary ${primaryLocs.length}, video ${videoLocs.length}, images ${imageCount} on ${imagePages.length} pages; ${matrixInPrimary.length} service×city pages indexable)`,
    );
    return;
  }

  console.error(`audit-seo-sitemap: ${errors.length} issue(s):\n`);
  for (const e of errors) console.error(`  ${e}`);
  process.exit(1);
}

main();
