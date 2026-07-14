#!/usr/bin/env node
/**
 * Append Instagram reel or post/carousel to Learn hub JSON (SEO-safe: existing rows unchanged).
 *
 * Usage:
 *   node scripts/append-instagram-learn.mjs <url-or-shortcode> [more...]
 *   node scripts/append-instagram-learn.mjs --queue instagram-queue.txt
 *
 * Requires `yt-dlp` on PATH (GitHub Actions installs it in import-instagram-learn workflow).
 */
import { readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { appendHubJsonRow, assertExistingHubRowsUnchanged } from "./lib/append-hub-json.mjs";
import { downloadHubThumbnail } from "./lib/download-hub-thumbnail.mjs";
import { fetchInstagramLearnMeta } from "./lib/fetch-instagram-meta.mjs";
import {
  doctorFromInstagramRow,
  titleFromCaption,
  topicsFromInstagramRow,
} from "./lib/instagram-hub-classify.mjs";
import { instagramShortcodeFromInput } from "./lib/instagram-url.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const reelsJsonPath = path.join(root, "src/data/knowledgeHubInstagramReels.json");
const postsJsonPath = path.join(root, "src/data/knowledgeHubInstagramPosts.json");

/** @typedef {{ shortcode: string; status: "added" | "skipped" | "error"; kind?: string; message?: string }} ImportResult */

/** @param {string[]} argv */
function parseArgs(argv) {
  /** @type {string[]} */
  const urls = [];
  let queuePath = null;
  for (let i = 2; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === "--queue") {
      queuePath = argv[i + 1] ?? null;
      i += 1;
      continue;
    }
    urls.push(arg);
  }
  if (queuePath) {
    const queueFile = path.resolve(queuePath);
    const lines = readFileSync(queueFile, "utf8").split(/\r?\n/);
    for (const line of lines) urls.push(line);
    return { urls, queuePath: queueFile, queueLines: lines };
  }
  return { urls, queuePath: null, queueLines: null };
}

/** @param {unknown} meta */
function postedAtFromMeta(meta) {
  const ts = Number(meta?.timestamp);
  if (Number.isFinite(ts) && ts > 0) return new Date(ts * 1000).toISOString();
  return undefined;
}

/** @param {unknown} meta */
function approxViewsFromMeta(meta) {
  const likes = Number(meta?.like_count);
  return Number.isFinite(likes) && likes >= 0 ? likes : undefined;
}

/** @param {string} shortcode @param {"reel" | "carousel" | "image"} kind @param {Record<string, unknown>} meta */
function scrapeRowFromMeta(shortcode, kind, meta) {
  const caption = String(meta.description ?? "").trim();
  const base = { shortCode: shortcode, caption };
  if (kind === "reel") {
    return { ...base, productType: "clips", type: "Video", videoDuration: meta.duration ?? 0 };
  }
  if (kind === "carousel") {
    return { ...base, productType: "carousel_container" };
  }
  return { ...base, productType: "feed", type: "Image" };
}

/** @param {string} shortcode @param {"reel" | "carousel" | "image"} kind @param {Record<string, unknown>} meta */
async function appendLearnRow(shortcode, kind, meta) {
  if (kind === "reel") {
    const reelsBefore = JSON.parse(readFileSync(reelsJsonPath, "utf8"));
    if (reelsBefore.some((r) => r.instagramReelId === shortcode)) {
      return { shortcode, status: "skipped", kind: "reel", message: "already in reels JSON" };
    }

    const scrapeRow = scrapeRowFromMeta(shortcode, "reel", meta);
    const caption = String(meta.description ?? "").trim();
    const displayUrl = String(meta.thumbnail ?? "").trim();
    const videoUrl = String(meta.url ?? "").trim();
    const posterPath = await downloadHubThumbnail({
      imageUrl: displayUrl,
      fileBase: `ig-${shortcode.toLowerCase()}`,
    });

    /** @type {Record<string, unknown>} */
    const row = {
      id: `ig-${shortcode.toLowerCase()}`,
      instagramReelId: shortcode,
      doctor: doctorFromInstagramRow(scrapeRow),
      topics: topicsFromInstagramRow(scrapeRow, "reel"),
      title: titleFromCaption(caption, "Women's Health Duo — Instagram Reel"),
      summary: "Patient education from @womenshealthduo on Instagram.",
      instagramCaption: caption,
      postedAt: postedAtFromMeta(meta),
      instagramVideoUrl: videoUrl,
      instagramPosterUrl: displayUrl,
      instagramPosterPath: posterPath,
    };
    const views = approxViewsFromMeta(meta);
    if (views !== undefined) row.approxViews = views;

    appendHubJsonRow({ filePath: reelsJsonPath, row });
    assertExistingHubRowsUnchanged({
      filePath: reelsJsonPath,
      idField: "instagramReelId",
      beforeRows: reelsBefore,
    });

    return { shortcode, status: "added", kind: "reel" };
  }

  return appendPost(shortcode, kind, meta);
}

/**
 * @param {string} shortcode
 * @param {"carousel" | "image"} kind
 * @param {Record<string, unknown>} meta
 */
async function appendPost(shortcode, kind, meta) {
  const postsBefore = JSON.parse(readFileSync(postsJsonPath, "utf8"));
  if (postsBefore.some((r) => r.instagramPostId === shortcode)) {
    return { shortcode, status: "skipped", kind, message: "already in posts JSON" };
  }

  const mediaKind = kind === "carousel" ? "carousel" : "image";
  const scrapeRow = scrapeRowFromMeta(shortcode, mediaKind, meta);
  const caption = String(meta.description ?? "").trim();
  const displayUrl = String(meta.thumbnail ?? "").trim();
  const posterPath = await downloadHubThumbnail({
    imageUrl: displayUrl,
    fileBase: `igp-${shortcode.toLowerCase()}`,
  });

  const fallbackTitle =
    mediaKind === "carousel"
      ? "Women's Health Duo — Instagram Carousel"
      : "Women's Health Duo — Instagram Post";

  /** @type {Record<string, unknown>} */
  const row = {
    id: `igp-${shortcode.toLowerCase()}`,
    instagramPostId: shortcode,
    instagramPostType: mediaKind,
    doctor: doctorFromInstagramRow(scrapeRow),
    topics: topicsFromInstagramRow(scrapeRow, mediaKind),
    title: titleFromCaption(caption, fallbackTitle),
    summary: "Patient education from @womenshealthduo on Instagram.",
    instagramCaption: caption,
    instagramPosterUrl: displayUrl,
    instagramPosterPath: posterPath,
  };
  const postedAt = postedAtFromMeta(meta);
  if (postedAt) row.postedAt = postedAt;
  const views = approxViewsFromMeta(meta);
  if (views !== undefined) row.approxViews = views;

  appendHubJsonRow({ filePath: postsJsonPath, row });
  assertExistingHubRowsUnchanged({
    filePath: postsJsonPath,
    idField: "instagramPostId",
    beforeRows: postsBefore,
  });

  return { shortcode, status: "added", kind: mediaKind };
}

/** @param {string} shortcode */
async function importShortcode(shortcode) {
  try {
    const reelsRaw = readFileSync(reelsJsonPath, "utf8");
    const postsRaw = readFileSync(postsJsonPath, "utf8");
    if (reelsRaw.includes(`"${shortcode}"`) && postsRaw.includes(`"${shortcode}"`)) {
      return { shortcode, status: "skipped", message: "shortcode already present" };
    }
    if (reelsRaw.includes(`"${shortcode}"`)) {
      return { shortcode, status: "skipped", kind: "reel", message: "already in reels JSON" };
    }
    if (postsRaw.includes(`"${shortcode}"`)) {
      return { shortcode, status: "skipped", kind: "post", message: "already in posts JSON" };
    }

    const { kind, meta } = await fetchInstagramLearnMeta(shortcode);
    return appendLearnRow(shortcode, kind, meta);
  } catch (err) {
    return {
      shortcode,
      status: "error",
      message: err instanceof Error ? err.message : String(err),
    };
  }
}

/** @param {string} queueFile @param {string[]} originalLines @param {ImportResult[]} results */
function updateQueueFile(queueFile, originalLines, results) {
  const processed = new Set(
    results.filter((r) => r.status === "added" || r.status === "skipped").map((r) => r.shortcode),
  );
  const kept = originalLines.filter((line) => {
    const code = instagramShortcodeFromInput(line);
    if (!code) return true;
    return !processed.has(code);
  });
  writeFileSync(queueFile, `${kept.join("\n").replace(/\n*$/, "\n")}`);
}

async function main() {
  const { urls, queuePath, queueLines } = parseArgs(process.argv);
  const shortcodes = [...new Set(urls.map(instagramShortcodeFromInput).filter(Boolean))];
  if (shortcodes.length === 0) {
    console.error("Usage: node scripts/append-instagram-learn.mjs <url> [more...]");
    console.error("       node scripts/append-instagram-learn.mjs --queue instagram-queue.txt");
    process.exit(1);
  }

  /** @type {ImportResult[]} */
  const results = [];
  for (const code of shortcodes) {
    const result = await importShortcode(code);
    results.push(result);
    console.error(
      `${result.shortcode}: ${result.status}${result.kind ? ` (${result.kind})` : ""}${result.message ? ` — ${result.message}` : ""}`,
    );
  }

  if (queuePath && queueLines) {
    updateQueueFile(queuePath, queueLines, results);
  }

  const added = results.filter((r) => r.status === "added");
  const errors = results.filter((r) => r.status === "error");
  if (errors.length > 0) process.exit(1);
  if (added.length === 0) {
    console.error("No new Learn hub rows added.");
    process.exit(0);
  }

  console.error(`Added ${added.length} Learn hub row(s).`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
