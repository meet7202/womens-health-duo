#!/usr/bin/env node
/**
 * Append Instagram (reel / post / carousel) or YouTube (Short / video) to Learn hub.
 * SEO-safe: existing rows are not rewritten.
 *
 * Usage:
 *   node scripts/append-learn-media.mjs <url> [more...]
 *   node scripts/append-learn-media.mjs --queue learn-queue.txt
 *
 * Requires `yt-dlp` on PATH (GitHub Actions installs it in import-learn-media workflow).
 */
import { readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { appendHubJsonRow, assertExistingHubRowsUnchanged } from "./lib/append-hub-json.mjs";
import {
  appendYoutubeCaption,
  appendYoutubeTsRow,
  assertExistingYoutubeRowsUnchanged,
  extractYoutubeVideoIds,
  uniqueYoutubeHubId,
} from "./lib/append-youtube-learn.mjs";
import { downloadHubThumbnail } from "./lib/download-hub-thumbnail.mjs";
import { fetchInstagramLearnMeta } from "./lib/fetch-instagram-meta.mjs";
import { fetchYoutubeLearnMeta } from "./lib/fetch-youtube-meta.mjs";
import {
  doctorFromInstagramRow,
  titleFromCaption,
  topicsFromInstagramRow,
} from "./lib/instagram-hub-classify.mjs";
import { parseLearnMediaInput } from "./lib/learn-media-input.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const reelsJsonPath = path.join(root, "src/data/knowledgeHubInstagramReels.json");
const postsJsonPath = path.join(root, "src/data/knowledgeHubInstagramPosts.json");
const videosTsPath = path.join(root, "src/data/knowledgeHubVideos.ts");
const captionsJsonPath = path.join(root, "src/data/knowledgeHubYoutubeCaptions.json");

/** @typedef {{ key: string; platform: string; status: "added" | "skipped" | "error"; kind?: string; message?: string }} ImportResult */

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
  const views = Number(meta?.view_count ?? meta?.like_count);
  return Number.isFinite(views) && views >= 0 ? views : undefined;
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
async function appendInstagramRow(shortcode, kind, meta) {
  if (kind === "reel") {
    const reelsBefore = JSON.parse(readFileSync(reelsJsonPath, "utf8"));
    if (reelsBefore.some((r) => r.instagramReelId === shortcode)) {
      return {
        key: shortcode,
        platform: "instagram",
        status: "skipped",
        kind: "reel",
        message: "already in reels JSON",
      };
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

    return { key: shortcode, platform: "instagram", status: "added", kind: "reel" };
  }

  return appendInstagramPost(shortcode, kind, meta);
}

/**
 * @param {string} shortcode
 * @param {"carousel" | "image"} kind
 * @param {Record<string, unknown>} meta
 */
async function appendInstagramPost(shortcode, kind, meta) {
  const postsBefore = JSON.parse(readFileSync(postsJsonPath, "utf8"));
  if (postsBefore.some((r) => r.instagramPostId === shortcode)) {
    return {
      key: shortcode,
      platform: "instagram",
      status: "skipped",
      kind,
      message: "already in posts JSON",
    };
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

  return { key: shortcode, platform: "instagram", status: "added", kind: mediaKind };
}

/** @param {string} shortcode */
async function importInstagram(shortcode) {
  const reelsRaw = readFileSync(reelsJsonPath, "utf8");
  const postsRaw = readFileSync(postsJsonPath, "utf8");
  if (reelsRaw.includes(`"${shortcode}"`) && postsRaw.includes(`"${shortcode}"`)) {
    return {
      key: shortcode,
      platform: "instagram",
      status: "skipped",
      message: "shortcode already present",
    };
  }
  if (reelsRaw.includes(`"${shortcode}"`)) {
    return {
      key: shortcode,
      platform: "instagram",
      status: "skipped",
      kind: "reel",
      message: "already in reels JSON",
    };
  }
  if (postsRaw.includes(`"${shortcode}"`)) {
    return {
      key: shortcode,
      platform: "instagram",
      status: "skipped",
      kind: "post",
      message: "already in posts JSON",
    };
  }

  const { kind, meta } = await fetchInstagramLearnMeta(shortcode);
  return appendInstagramRow(shortcode, kind, meta);
}

/** @param {string} videoId */
async function importYoutube(videoId) {
  const beforeRaw = readFileSync(videosTsPath, "utf8");
  const existingIds = extractYoutubeVideoIds(beforeRaw);
  if (existingIds.includes(videoId)) {
    return {
      key: videoId,
      platform: "youtube",
      status: "skipped",
      kind: "youtube",
      message: "already in knowledgeHubVideos.ts",
    };
  }

  const { isShort, meta } = await fetchYoutubeLearnMeta(videoId);
  const caption = String(meta.description ?? meta.title ?? "").trim();
  const title = titleFromCaption(caption, String(meta.title ?? "Women's Health Duo on YouTube"));
  const scrapeRow = { shortCode: videoId, caption };
  const hubId = uniqueYoutubeHubId(title, beforeRaw);

  const summarySnippet = title.length > 72 ? `${title.slice(0, 69)}…` : title;
  const summary = isShort
    ? `Women's Health Duo on YouTube Shorts ,  ${summarySnippet}.`
    : `Women's Health Duo (@WomensHealthDuo) ,  long-form upload on YouTube.`;

  /** @type {Record<string, unknown>} */
  const row = {
    id: hubId,
    kind: "youtube_short",
    youtubeVideoId: videoId,
    doctor: doctorFromInstagramRow(scrapeRow),
    topics: topicsFromInstagramRow(scrapeRow, "youtube"),
    title,
    summary,
    postedAt: postedAtFromMeta(meta),
  };
  if (!isShort) row.youtubeOpenAs = "watch";
  const views = approxViewsFromMeta(meta);
  if (views !== undefined) row.approxViews = views;

  appendYoutubeTsRow({ filePath: videosTsPath, row });
  const afterRaw = readFileSync(videosTsPath, "utf8");
  assertExistingYoutubeRowsUnchanged({ beforeRaw, afterRaw, videoIds: existingIds });
  if (caption) appendYoutubeCaption({ filePath: captionsJsonPath, videoId, caption });

  return {
    key: videoId,
    platform: "youtube",
    status: "added",
    kind: isShort ? "youtube_short" : "youtube_video",
  };
}

/** @param {import("./lib/learn-media-input.mjs").LearnMediaInput | { platform: "ambiguous"; key: string; input: string }} parsed */
async function importParsed(parsed) {
  if (parsed.platform === "instagram") {
    return importInstagram(parsed.key);
  }
  if (parsed.platform === "youtube") {
    return importYoutube(parsed.key);
  }
  try {
    return await importYoutube(parsed.key);
  } catch (ytErr) {
    try {
      return await importInstagram(parsed.key);
    } catch (igErr) {
      const ytMsg = ytErr instanceof Error ? ytErr.message : String(ytErr);
      const igMsg = igErr instanceof Error ? igErr.message : String(igErr);
      return {
        key: parsed.key,
        platform: "ambiguous",
        status: "error",
        message: `YouTube: ${ytMsg}; Instagram: ${igMsg}`,
      };
    }
  }
}

/** @param {string} line */
async function importLine(line) {
  const parsed = parseLearnMediaInput(line);
  if (!parsed) return null;
  try {
    return await importParsed(parsed);
  } catch (err) {
    return {
      key: parsed.key,
      platform: parsed.platform,
      status: "error",
      message: err instanceof Error ? err.message : String(err),
    };
  }
}

/** @param {string} queueFile @param {string[]} originalLines @param {ImportResult[]} results */
function updateQueueFile(queueFile, originalLines, results) {
  const processed = new Set(
    results.filter((r) => r.status === "added" || r.status === "skipped").map((r) => r.key),
  );
  const kept = originalLines.filter((line) => {
    const parsed = parseLearnMediaInput(line);
    if (!parsed) return true;
    return !processed.has(parsed.key);
  });
  writeFileSync(queueFile, `${kept.join("\n").replace(/\n*$/, "\n")}`);
}

async function main() {
  const { urls, queuePath, queueLines } = parseArgs(process.argv);
  const inputs = urls.map((line) => parseLearnMediaInput(line)).filter((parsed) => parsed !== null);
  if (inputs.length === 0) {
    console.error("Usage: node scripts/append-learn-media.mjs <url> [more...]");
    console.error("       node scripts/append-learn-media.mjs --queue learn-queue.txt");
    console.error("");
    console.error("Supported: Instagram reel/post/carousel, YouTube Short or video.");
    process.exit(1);
  }

  const seen = new Set();
  /** @type {ImportResult[]} */
  const results = [];
  for (const line of urls) {
    const parsed = parseLearnMediaInput(line);
    if (!parsed) continue;
    const dedupeKey = `${parsed.platform}:${parsed.key}`;
    if (seen.has(dedupeKey)) continue;
    seen.add(dedupeKey);

    const result = await importLine(line);
    if (!result) continue;
    results.push(result);
    console.error(
      `${result.platform}/${result.key}: ${result.status}${result.kind ? ` (${result.kind})` : ""}${result.message ? ` — ${result.message}` : ""}`,
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
