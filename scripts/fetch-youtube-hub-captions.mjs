#!/usr/bin/env node
/**
 * Fetches public YouTube descriptions (Shorts + uploads) and writes
 * `src/data/knowledgeHubYoutubeCaptions.json` as { [videoId]: string }.
 *
 * Usage: node scripts/fetch-youtube-hub-captions.mjs
 */
import { writeFileSync, readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { setTimeout as delay } from "node:timers/promises";
import { isCaptionEditorialLocked } from "./lib/caption-editorial-locks.mjs";
import { youtubeShortDescriptionFromWatchHtml } from "./lib/youtubeInitialPlayerResponse.mjs";

const root = fileURLToPath(new URL("..", import.meta.url));
const tsPath = `${root}/src/data/knowledgeHubVideos.ts`;
const outPath = `${root}/src/data/knowledgeHubYoutubeCaptions.json`;
const previous = (() => {
  try {
    return JSON.parse(readFileSync(outPath, "utf8"));
  } catch {
    return {};
  }
})();

const UA =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36";

const ts = readFileSync(tsPath, "utf8");
const ids = [...ts.matchAll(/youtubeVideoId:\s*"([^"]+)"/g)].map((m) => m[1]);
const unique = [...new Set(ids)];

const map = {};
for (const id of unique) {
  // SEO-15: preserve locked platform originals under editorial hold (do not overwrite corrections).
  if (isCaptionEditorialLocked(id) && typeof previous[id] === "string" && previous[id].trim()) {
    map[id] = previous[id];
    console.log("Preserved locked caption for", id);
    continue;
  }
  const url = `https://www.youtube.com/watch?v=${id}`;
  try {
    const res = await fetch(url, {
      headers: { "User-Agent": UA, "Accept-Language": "en-US,en;q=0.9" },
    });
    const html = await res.text();
    const desc = youtubeShortDescriptionFromWatchHtml(html);
    map[id] = desc ?? "";
    if (!desc) console.warn("No description for", id);
  } catch (e) {
    console.warn(id, String(e));
    map[id] = "";
  }
  await delay(600);
}

writeFileSync(outPath, `${JSON.stringify(map, null, 2)}\n`, "utf8");
console.log(`Wrote ${Object.keys(map).length} entries to ${outPath}`);
