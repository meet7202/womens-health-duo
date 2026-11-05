#!/usr/bin/env node
/**
 * Fills `instagramCaption` on each row from Instagram oEmbed `title` (full caption text).
 * Preserves all other fields. Rate-limited for politeness.
 *
 * Usage: node scripts/sync-instagram-captions-from-oembed.mjs
 */
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { setTimeout as delay } from "node:timers/promises";
import { isCaptionEditorialLocked } from "./lib/caption-editorial-locks.mjs";

const root = fileURLToPath(new URL("..", import.meta.url));
const jsonPath = `${root}/src/data/knowledgeHubInstagramReels.json`;
const UA = "Mozilla/5.0 (compatible; WHD-caption-sync/1.0; +https://womenshealthduo.com)";

const rows = JSON.parse(readFileSync(jsonPath, "utf8"));

for (const row of rows) {
  const id = row.instagramReelId;
  // SEO-15: do not overwrite locked platform captions under editorial hold.
  if (isCaptionEditorialLocked(id) && String(row.instagramCaption ?? "").trim()) {
    console.log("Preserved locked caption for", id);
    continue;
  }
  const url = `https://www.instagram.com/reel/${id}/`;
  const api = `https://www.instagram.com/api/v1/oembed/?url=${encodeURIComponent(url)}`;
  try {
    const res = await fetch(api, { headers: { "User-Agent": UA } });
    const text = await res.text();
    let data;
    try {
      data = JSON.parse(text);
    } catch {
      console.warn(id, "oEmbed not JSON", res.status);
      if (!row.instagramCaption) row.instagramCaption = "";
      await delay(400);
      continue;
    }
    const cap = typeof data.title === "string" ? data.title.trim() : "";
    row.instagramCaption = cap;
  } catch (e) {
    console.warn(id, String(e));
    if (!row.instagramCaption) row.instagramCaption = "";
  }
  await delay(350);
}

writeFileSync(jsonPath, `${JSON.stringify(rows, null, 2)}\n`, "utf8");
console.log(`Updated instagramCaption on ${rows.length} reels.`);
