#!/usr/bin/env node
/**
 * Merge Instagram JSON scrapes into Learn hub JSON stores.
 *
 * Usage:
 *   node scripts/import-instagram.mjs
 *   node scripts/import-instagram.mjs ig/reels_scrap.json ig/posts_scrap.json
 *   npm run import:instagram
 *
 * Defaults:
 *   - Reels from ig/reels_scrap.json → knowledgeHubInstagramReels.json
 *   - Carousels + feed images from ig/posts_scrap.json → knowledgeHubInstagramPosts.json
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  doctorFromInstagramRow,
  isInstagramCarouselRow,
  isInstagramFeedImageRow,
  isInstagramReelRow,
  titleFromCaption,
  topicsFromInstagramRow,
} from "./lib/instagram-hub-classify.mjs";
import { attachHubThumbnailPaths } from "./lib/download-hub-thumbnail.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const reelsJsonPath = path.join(root, "src/data/knowledgeHubInstagramReels.json");
const postsJsonPath = path.join(root, "src/data/knowledgeHubInstagramPosts.json");

const defaultReelsScrap = path.join(root, "ig/reels_scrap.json");
const defaultPostsScrap = path.join(root, "ig/posts_scrap.json");

function loadJsonArray(filePath) {
  if (!fs.existsSync(filePath)) {
    console.error("File not found:", filePath);
    process.exit(1);
  }
  const data = JSON.parse(fs.readFileSync(filePath, "utf8"));
  if (!Array.isArray(data)) {
    console.error("Expected JSON array in", filePath);
    process.exit(1);
  }
  return data;
}

function readStore(filePath) {
  if (!fs.existsSync(filePath)) return [];
  const data = JSON.parse(fs.readFileSync(filePath, "utf8"));
  return Array.isArray(data) ? data : [];
}

function sortHubRows(rows, idKey) {
  return [...rows].sort((a, b) => {
    const aDate = String(a.postedAt ?? "");
    const bDate = String(b.postedAt ?? "");
    if (aDate && bDate && aDate !== bDate) return bDate.localeCompare(aDate);
    if (aDate && !bDate) return -1;
    if (!aDate && bDate) return 1;
    return String(a[idKey]).localeCompare(String(b[idKey]));
  });
}

function mergeReels(scrapRows, existingRows) {
  /** @type {Map<string, Record<string, unknown>>} */
  const byCode = new Map();
  for (const row of existingRows) {
    if (row?.instagramReelId) byCode.set(row.instagramReelId, { ...row });
  }

  let added = 0;
  let updated = 0;
  let skipped = 0;

  for (const row of scrapRows) {
    if (!isInstagramReelRow(row)) {
      skipped += 1;
      continue;
    }
    const code = String(row.shortCode).trim();
    const caption = String(row.caption ?? "").trim();
    const postedAt = String(row.timestamp ?? "").trim();
    const views = row.videoPlayCount;
    const isNew = !byCode.has(code);
    const prev = isNew
      ? {
          id: `ig-${code.toLowerCase()}`,
          instagramReelId: code,
          doctor: doctorFromInstagramRow(row),
          topics: topicsFromInstagramRow(row, "reel"),
          title: titleFromCaption(caption, "Women's Health Duo — Instagram Reel"),
          summary: "Patient education from @womenshealthduo on Instagram.",
        }
      : { ...byCode.get(code) };

    if (caption) prev.instagramCaption = caption;
    if (postedAt) prev.postedAt = postedAt;
    if (typeof views === "number" && Number.isFinite(views)) prev.approxViews = views;
    const videoUrl = String(row.videoUrl ?? "").trim();
    const posterUrl = String(row.displayUrl ?? "").trim();
    if (videoUrl) prev.instagramVideoUrl = videoUrl;
    if (posterUrl) prev.instagramPosterUrl = posterUrl;

    if (isNew) {
      added += 1;
    } else {
      if (
        !prev.topics?.length ||
        (prev.topics.length <= 2 &&
          prev.topics.every((t) => t === "Reels" || t === "Women's health"))
      ) {
        prev.topics = topicsFromInstagramRow(row, "reel");
      }
      updated += 1;
    }

    byCode.set(code, prev);
  }

  const out = sortHubRows([...byCode.values()], "instagramReelId");
  return { out, added, updated, skipped };
}

function mergePosts(scrapRows, existingRows) {
  /** @type {Map<string, Record<string, unknown>>} */
  const byCode = new Map();
  for (const row of existingRows) {
    if (row?.instagramPostId) byCode.set(row.instagramPostId, { ...row });
  }

  let added = 0;
  let updated = 0;
  let skipped = 0;

  for (const row of scrapRows) {
    let mediaKind = null;
    if (isInstagramCarouselRow(row)) mediaKind = "carousel";
    else if (isInstagramFeedImageRow(row)) mediaKind = "image";
    else {
      skipped += 1;
      continue;
    }

    const code = String(row.shortCode).trim();
    const caption = String(row.caption ?? "").trim();
    const postedAt = String(row.timestamp ?? "").trim();
    const views = row.videoPlayCount ?? row.likesCount;
    const fallbackTitle =
      mediaKind === "carousel"
        ? "Women's Health Duo — Instagram Carousel"
        : "Women's Health Duo — Instagram Post";

    const isNew = !byCode.has(code);
    const prev = isNew
      ? {
          id: `igp-${code.toLowerCase()}`,
          instagramPostId: code,
          instagramPostType: mediaKind,
          doctor: doctorFromInstagramRow(row),
          topics: topicsFromInstagramRow(row, mediaKind),
          title: titleFromCaption(caption, fallbackTitle),
          summary: "Patient education from @womenshealthduo on Instagram.",
        }
      : { ...byCode.get(code) };

    if (caption) prev.instagramCaption = caption;
    if (postedAt) prev.postedAt = postedAt;
    if (typeof views === "number" && Number.isFinite(views)) prev.approxViews = views;
    prev.instagramPostType = mediaKind;
    prev.doctor = doctorFromInstagramRow(row);
    prev.topics = topicsFromInstagramRow(row, mediaKind);
    const posterUrl = String(row.displayUrl ?? row.images?.[0] ?? "").trim();
    if (posterUrl) prev.instagramPosterUrl = posterUrl;

    if (isNew) added += 1;
    else updated += 1;

    byCode.set(code, prev);
  }

  const out = sortHubRows([...byCode.values()], "instagramPostId");
  return { out, added, updated, skipped };
}

function main() {
  const reelsScrapPath = path.resolve(process.argv[2] ?? defaultReelsScrap);
  const postsScrapPath = path.resolve(process.argv[3] ?? defaultPostsScrap);

  const reelsScrap = loadJsonArray(reelsScrapPath);
  const postsScrap = loadJsonArray(postsScrapPath);

  const existingReels = readStore(reelsJsonPath);
  const existingPosts = readStore(postsJsonPath);

  const reelsResult = mergeReels(reelsScrap, existingReels);
  const postsResult = mergePosts(postsScrap, existingPosts);

  return { reelsResult, postsResult };
}

async function run() {
  const { reelsResult, postsResult } = main();

  const reelThumbs = await attachHubThumbnailPaths(
    reelsResult.out,
    (row) => String(row.instagramPosterUrl ?? "").trim() || undefined,
  );
  const postThumbs = await attachHubThumbnailPaths(
    postsResult.out,
    (row) => String(row.instagramPosterUrl ?? "").trim() || undefined,
  );

  fs.writeFileSync(reelsJsonPath, `${JSON.stringify(reelsResult.out, null, 2)}\n`, "utf8");
  console.error(
    `Updated ${reelsJsonPath}: ${reelsResult.out.length} reels (+${reelsResult.added} new, ${reelsResult.updated} touched, ${reelsResult.skipped} skipped). Thumbnails: ${reelThumbs.saved} saved, ${reelThumbs.failed} failed.`,
  );

  fs.writeFileSync(postsJsonPath, `${JSON.stringify(postsResult.out, null, 2)}\n`, "utf8");
  console.error(
    `Updated ${postsJsonPath}: ${postsResult.out.length} posts (+${postsResult.added} new, ${postsResult.updated} touched, ${postsResult.skipped} skipped). Thumbnails: ${postThumbs.saved} saved, ${postThumbs.failed} failed.`,
  );
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
