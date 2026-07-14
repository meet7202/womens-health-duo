#!/usr/bin/env node
/**
 * Append one enriched Instagram reel row without rewriting existing hub JSON.
 * Preserves file byte order/format for indexed Learn watch pages (SEO).
 *
 * Usage:
 *   node scripts/append-instagram-reel.mjs <shortcode-or-url>
 */
import { execSync } from "node:child_process";
import { readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { downloadHubThumbnail } from "./lib/download-hub-thumbnail.mjs";
import { doctorFromInstagramRow, titleFromCaption, topicsFromInstagramRow } from "./lib/instagram-hub-classify.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const jsonPath = path.join(root, "src/data/knowledgeHubInstagramReels.json");

const URL_RE = /instagram\.com\/(?:[^/]+\/)?(?:reel|p)\/([A-Za-z0-9_-]+)\/?/i;
const BARE_RE = /^[A-Za-z0-9_-]{10,}$/;

function shortcodeFromArg(arg) {
  const t = String(arg ?? "").trim();
  const fromUrl = t.match(URL_RE);
  if (fromUrl) return fromUrl[1];
  if (BARE_RE.test(t)) return t;
  return null;
}

async function fetchYtDlp(shortcode) {
  const url = `https://www.instagram.com/reel/${shortcode}/`;
  const raw = execSync(`yt-dlp --dump-single-json --no-download ${JSON.stringify(url)}`, {
    encoding: "utf8",
    stdio: ["ignore", "pipe", "pipe"],
  });
  return JSON.parse(raw);
}

function buildBlock(row) {
  const topicsInline = JSON.stringify(row.topics);
  return `  {
    "id": ${JSON.stringify(row.id)},
    "instagramReelId": ${JSON.stringify(row.instagramReelId)},
    "doctor": ${JSON.stringify(row.doctor)},
    "topics": ${topicsInline},
    "title": ${JSON.stringify(row.title)},
    "summary": ${JSON.stringify(row.summary)},
    "instagramCaption": ${JSON.stringify(row.instagramCaption)},
    "postedAt": ${JSON.stringify(row.postedAt)},
    "instagramVideoUrl": ${JSON.stringify(row.instagramVideoUrl)},
    "instagramPosterUrl": ${JSON.stringify(row.instagramPosterUrl)},
    "instagramPosterPath": ${JSON.stringify(row.instagramPosterPath)}
  }`;
}

async function main() {
  const shortcode = shortcodeFromArg(process.argv[2]);
  if (!shortcode) {
    console.error("Usage: node scripts/append-instagram-reel.mjs <shortcode-or-url>");
    process.exit(1);
  }

  let raw = readFileSync(jsonPath, "utf8");
  if (raw.includes(`"${shortcode}"`)) {
    console.error(`Already present: ${shortcode}`);
    process.exit(0);
  }

  const j = await fetchYtDlp(shortcode);
  const caption = String(j.description ?? "").trim();
  const postedAt = new Date(j.timestamp * 1000).toISOString();
  const displayUrl = String(j.thumbnail ?? "").trim();
  const videoUrl = String(j.url ?? "").trim();
  const scrapeRow = {
    shortCode: shortcode,
    caption,
    productType: "clips",
    type: "Video",
    videoDuration: j.duration ?? 0,
  };

  const posterPath = await downloadHubThumbnail({
    imageUrl: displayUrl,
    fileBase: `ig-${shortcode.toLowerCase()}`,
  });

  const row = {
    id: `ig-${shortcode.toLowerCase()}`,
    instagramReelId: shortcode,
    doctor: doctorFromInstagramRow(scrapeRow),
    topics: topicsFromInstagramRow(scrapeRow, "reel"),
    title: titleFromCaption(caption, "Women's Health Duo — Instagram Reel"),
    summary: "Patient education from @womenshealthduo on Instagram.",
    instagramCaption: caption,
    postedAt,
    instagramVideoUrl: videoUrl,
    instagramPosterUrl: displayUrl,
    instagramPosterPath: posterPath,
  };

  if (!raw.endsWith("\n]\n") && !raw.endsWith("]\n")) {
    console.error("Unexpected JSON file ending:", jsonPath);
    process.exit(1);
  }

  raw = raw.replace(/\n]\n?$/, `,\n${buildBlock(row)}\n]\n`);
  writeFileSync(jsonPath, raw);

  const orig = JSON.parse(execSync(`git show HEAD:${path.relative(root, jsonPath)}`, { encoding: "utf8" }));
  const cur = JSON.parse(readFileSync(jsonPath, "utf8"));
  let changed = 0;
  for (const o of orig) {
    const c = cur.find((r) => r.instagramReelId === o.instagramReelId);
    if (!c || JSON.stringify(c) !== JSON.stringify(o)) changed += 1;
  }

  console.error(
    `Appended ${shortcode} to ${path.relative(root, jsonPath)} (${cur.length} rows; ${changed} existing rows changed).`,
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
