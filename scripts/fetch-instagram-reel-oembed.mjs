#!/usr/bin/env node
/**
 * One-off helper: fetch Instagram oEmbed JSON per reel shortcode (public).
 * Usage: node scripts/fetch-instagram-reel-oembed.mjs > /tmp/reel-oembed.jsonl
 */
import { readFileSync } from "node:fs";
import { setTimeout as delay } from "node:timers/promises";

const jsonPath = new URL("../src/data/knowledgeHubInstagramReels.json", import.meta.url);
const rows = JSON.parse(readFileSync(jsonPath, "utf8"));
const UA = "Mozilla/5.0 (compatible; WHD-reel-meta/1.0; +https://womenshealthduo.com)";

for (const row of rows) {
  const id = row.instagramReelId;
  const url = `https://www.instagram.com/reel/${id}/`;
  const api = `https://www.instagram.com/api/v1/oembed/?url=${encodeURIComponent(url)}`;
  try {
    const res = await fetch(api, { headers: { "User-Agent": UA } });
    const text = await res.text();
    let data;
    try {
      data = JSON.parse(text);
    } catch {
      console.log(
        JSON.stringify({
          instagramReelId: id,
          error: "not_json",
          status: res.status,
          snippet: text.slice(0, 120),
        }),
      );
      await delay(400);
      continue;
    }
    console.log(
      JSON.stringify({
        instagramReelId: id,
        title: data.title ?? "",
        thumbnail_url: data.thumbnail_url ?? "",
      }),
    );
  } catch (e) {
    console.log(JSON.stringify({ instagramReelId: id, error: String(e) }));
  }
  await delay(350);
}
