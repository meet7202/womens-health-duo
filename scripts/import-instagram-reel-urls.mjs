#!/usr/bin/env node
/**
 * Merge Instagram reel URLs into src/data/knowledgeHubInstagramReels.json.
 *
 * Usage:
 *   node scripts/import-instagram-reel-urls.mjs path/to/reel-urls.txt
 *   pnpm import:instagram-reels -- path/to/reel-urls.txt
 *   cat reel-urls.txt | node scripts/import-instagram-reel-urls.mjs
 *
 * Lines starting with # are ignored. Accepts full URLs or bare shortcodes
 * (alphanumeric + _ -). Matches `instagram.com/reel/…`, `instagram.com/p/…`, and
 * `instagram.com/<username>/reel/…` (or `/p/…`).
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const jsonPath = path.join(__dirname, "../src/data/knowledgeHubInstagramReels.json");

const URL_RE = /instagram\.com\/(?:[^/]+\/)?(?:reel|p)\/([A-Za-z0-9_-]+)\/?/i;
const BARE_RE = /^[A-Za-z0-9_-]{10,}$/;

function extractShortcode(line) {
  const t = line.trim();
  if (!t || t.startsWith("#")) return null;
  const fromUrl = t.match(URL_RE);
  if (fromUrl) return fromUrl[1];
  if (BARE_RE.test(t)) return t;
  return null;
}

function readInputLines() {
  const file = process.argv[2];
  const raw = file ? fs.readFileSync(path.resolve(file), "utf8") : fs.readFileSync(0, "utf8");
  return raw.split(/\r?\n/);
}

function main() {
  const existing = JSON.parse(fs.readFileSync(jsonPath, "utf8"));
  if (!Array.isArray(existing)) {
    console.error("Expected array in", jsonPath);
    process.exit(1);
  }

  const byCode = new Map();
  for (const row of existing) {
    if (row && typeof row.instagramReelId === "string") {
      byCode.set(row.instagramReelId, { ...row });
    }
  }

  let added = 0;
  for (const line of readInputLines()) {
    const code = extractShortcode(line);
    if (!code) continue;
    if (byCode.has(code)) continue;
    byCode.set(code, {
      id: `ig-${code.toLowerCase()}`,
      instagramReelId: code,
      doctor: "both",
      topics: ["Reels", "Women's health"],
      title: "Women's Health Duo — Instagram Reel",
      summary: "Patient education from @womenshealthduo on Instagram.",
      instagramCaption: "",
    });
    added += 1;
  }

  const out = [...byCode.values()].sort((a, b) =>
    String(a.instagramReelId).localeCompare(String(b.instagramReelId)),
  );
  fs.writeFileSync(jsonPath, `${JSON.stringify(out, null, 2)}\n`, "utf8");
  console.error(`Updated ${jsonPath}: ${out.length} total rows (${added} new).`);
}

main();
