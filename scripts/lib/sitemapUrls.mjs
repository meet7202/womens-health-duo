/**
 * Read absolute page URLs from built sitemap XML in dist/.
 * Run after `npm run build`.
 */
import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";

const DIST = "dist";

const FEED_FILES = {
  primary: "sitemap.xml",
  virtual: "sitemap-virtual-service-cities.xml",
  video: "sitemap-videos.xml",
};

function readDist(name) {
  const path = join(DIST, name);
  if (!existsSync(path)) {
    throw new Error(`missing ${path} — run npm run build first`);
  }
  return readFileSync(path, "utf8");
}

export function extractLocs(xml) {
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
}

export function readSitemapBuildMeta() {
  return JSON.parse(readDist(".sitemap-build-meta.json"));
}

/**
 * @param {'primary' | 'virtual' | 'video' | 'all'} feed
 * @returns {string[]}
 */
export function loadIndexableUrls(feed = "all") {
  const feeds = feed === "all" ? Object.keys(FEED_FILES) : [feed];

  for (const name of feeds) {
    if (!FEED_FILES[name]) {
      throw new Error(`unknown feed "${feed}" — use primary, virtual, video, or all`);
    }
  }

  const urls = [];
  const seen = new Set();

  for (const name of feeds) {
    const locs = extractLocs(readDist(FEED_FILES[name]));
    for (const loc of locs) {
      if (!seen.has(loc)) {
        seen.add(loc);
        urls.push(loc);
      }
    }
  }

  return urls;
}

export function hostFromSiteUrl(siteUrl) {
  return new URL(siteUrl).hostname;
}
