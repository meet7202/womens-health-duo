#!/usr/bin/env node
/**
 * Re-download hub cover images for rows missing `instagramPosterPath`.
 * Usage: node scripts/retry-hub-thumbnails.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { setTimeout as delay } from "node:timers/promises";
import { downloadHubThumbnail } from "./lib/download-hub-thumbnail.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const UA = "Mozilla/5.0 (compatible; WHD-hub-import/1.0; +https://womenshealthduo.com)";

const stores = [
  {
    file: path.join(root, "src/data/knowledgeHubInstagramReels.json"),
    oembedPath: (row) => `https://www.instagram.com/reel/${row.instagramReelId}/`,
    scrapeFile: path.join(root, "ig/reels_scrap.json"),
    scrapeCodeKey: "instagramReelId",
  },
  {
    file: path.join(root, "src/data/knowledgeHubInstagramPosts.json"),
    oembedPath: (row) => `https://www.instagram.com/p/${row.instagramPostId}/`,
    scrapeFile: path.join(root, "ig/posts_scrap.json"),
    scrapeCodeKey: "instagramPostId",
  },
];

function loadScrapMap(scrapFile) {
  /** @type {Map<string, string>} shortCode -> displayUrl */
  const map = new Map();
  if (!fs.existsSync(scrapFile)) return map;
  const rows = JSON.parse(fs.readFileSync(scrapFile, "utf8"));
  if (!Array.isArray(rows)) return map;
  for (const row of rows) {
    const code = String(row?.shortCode ?? "").trim();
    const url = String(row?.displayUrl ?? row?.images?.[0] ?? "").trim();
    if (code && url) map.set(code, url);
  }
  return map;
}

async function oembedThumbnailUrl(permalink) {
  const api = `https://www.instagram.com/api/v1/oembed/?url=${encodeURIComponent(permalink)}`;
  try {
    const res = await fetch(api, { headers: { "User-Agent": UA } });
    if (!res.ok) return null;
    const data = await res.json();
    const url = String(data?.thumbnail_url ?? "").trim();
    return url || null;
  } catch {
    return null;
  }
}

async function retryStore({ file, oembedPath, scrapeFile, scrapeCodeKey }) {
  const rows = JSON.parse(fs.readFileSync(file, "utf8"));
  if (!Array.isArray(rows)) throw new Error(`Expected array in ${file}`);

  const scrap = loadScrapMap(scrapeFile);
  const pending = rows.filter((row) => !row.instagramPosterPath);
  let saved = 0;
  let failed = 0;

  for (const row of pending) {
    const id = String(row.id ?? "").trim();
    const code = String(row[scrapeCodeKey] ?? "").trim();
    let imageUrl = String(row.instagramPosterUrl ?? "").trim();

    if (!imageUrl && code && scrap.has(code)) {
      imageUrl = scrap.get(code);
      row.instagramPosterUrl = imageUrl;
    }

    if (!imageUrl) {
      const permalink = oembedPath(row);
      imageUrl = (await oembedThumbnailUrl(permalink)) ?? "";
      if (imageUrl) row.instagramPosterUrl = imageUrl;
      await delay(200);
    }

    if (!imageUrl || !id) {
      console.error(`SKIP ${id || code}: no image URL`);
      failed += 1;
      continue;
    }

    const local = await downloadHubThumbnail({ imageUrl, fileBase: id });
    if (local) {
      row.instagramPosterPath = local;
      saved += 1;
      console.error(`OK   ${id}`);
    } else {
      failed += 1;
      console.error(`FAIL ${id}`);
    }
    await delay(150);
  }

  fs.writeFileSync(file, `${JSON.stringify(rows, null, 2)}\n`, "utf8");
  return { file, pending: pending.length, saved, failed };
}

const results = [];
for (const store of stores) {
  results.push(await retryStore(store));
}

for (const r of results) {
  console.error(
    `${path.basename(r.file)}: ${r.saved}/${r.pending} saved, ${r.failed} still missing`,
  );
}
