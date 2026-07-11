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
  const virtualXml = readDist("sitemap-virtual-service-cities.xml");
  const videoXml = readDist("sitemap-videos.xml");
  const robots = readDist("robots.txt");

  const errors = [];

  const primaryLocs = extractLocs(primaryXml);
  const virtualLocs = extractLocs(virtualXml);
  const videoLocs = extractLocs(videoXml);

  if (primaryLocs.length !== meta.primaryUrlCount) {
    errors.push(`sitemap.xml has ${primaryLocs.length} URLs, expected ${meta.primaryUrlCount}`);
  }
  if (virtualLocs.length !== meta.virtualServiceCityUrlCount) {
    errors.push(
      `sitemap-virtual-service-cities.xml has ${virtualLocs.length} URLs, expected ${meta.virtualServiceCityUrlCount}`,
    );
  }
  if (videoLocs.length !== meta.videoUrlCount) {
    errors.push(`sitemap-videos.xml has ${videoLocs.length} URLs, expected ${meta.videoUrlCount}`);
  }

  const primarySet = new Set(primaryLocs);
  const overlap = virtualLocs.filter((loc) => primarySet.has(loc));
  if (overlap.length > 0) {
    errors.push(
      `${overlap.length} URL(s) appear in both primary and virtual-service-cities sitemaps`,
    );
  }

  for (const line of [
    `${meta.siteUrl}/sitemap.xml`,
    `${meta.siteUrl}/sitemap-virtual-service-cities.xml`,
    `${meta.siteUrl}/sitemap-videos.xml`,
  ]) {
    if (!robots.includes(line)) {
      errors.push(`robots.txt missing Sitemap: ${line}`);
    }
  }

  for (const xml of [primaryXml, virtualXml, videoXml]) {
    const mods = extractLastmods(xml);
    const bad = mods.filter((d) => d !== meta.lastmod);
    if (bad.length > 0) {
      errors.push(`stale <lastmod> in sitemap (expected ${meta.lastmod}, found ${bad[0]})`);
      break;
    }
  }

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
      `audit-seo-sitemap: OK (lastmod ${meta.lastmod}; primary ${primaryLocs.length}, virtual ${virtualLocs.length}, video ${videoLocs.length})`,
    );
    return;
  }

  console.error(`audit-seo-sitemap: ${errors.length} issue(s):\n`);
  for (const e of errors) console.error(`  ${e}`);
  process.exit(1);
}

main();
