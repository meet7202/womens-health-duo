#!/usr/bin/env node
/**
 * Refresh expired Instagram reel CDN URLs in knowledgeHubInstagramReels.json.
 * Updates only instagramVideoUrl + instagramPosterUrl — titles, captions, ids unchanged.
 *
 * Usage:
 *   node scripts/refresh-instagram-cdn.mjs
 *   node scripts/refresh-instagram-cdn.mjs --all
 *   node scripts/refresh-instagram-cdn.mjs --limit 5
 *
 * Requires `yt-dlp` on PATH.
 */
import { readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { fetchInstagramLearnMeta } from "./lib/fetch-instagram-meta.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const reelsJsonPath = path.join(root, "src/data/knowledgeHubInstagramReels.json");

const CDN_FIELDS = new Set(["instagramVideoUrl", "instagramPosterUrl"]);
const FETCH_DELAY_MS = 750;

/** @param {string[]} argv */
function parseArgs(argv) {
  let forceAll = false;
  let limit = Infinity;
  for (let i = 2; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === "--all") forceAll = true;
    else if (arg === "--limit") {
      limit = Number(argv[i + 1] ?? "0");
      i += 1;
    }
  }
  return { forceAll, limit: Number.isFinite(limit) && limit > 0 ? limit : Infinity };
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/** @param {string | undefined} url */
async function cdnUrlHealthy(url) {
  const t = String(url ?? "").trim();
  if (!t) return false;
  try {
    const res = await fetch(t, { method: "HEAD", redirect: "follow" });
    return res.ok;
  } catch {
    return false;
  }
}

/**
 * @param {Record<string, unknown>} before
 * @param {Record<string, unknown>} after
 * @param {string} reelId
 */
function assertOnlyCdnFieldsChanged(before, after, reelId) {
  const keys = new Set([...Object.keys(before), ...Object.keys(after)]);
  for (const key of keys) {
    if (CDN_FIELDS.has(key)) continue;
    const b = before[key];
    const a = after[key];
    if (JSON.stringify(b) !== JSON.stringify(a)) {
      throw new Error(`Unexpected field change on ${reelId}: ${key}`);
    }
  }
}

/**
 * @param {Record<string, unknown>} row
 * @param {Record<string, unknown>} meta
 */
function applyCdnFromMeta(row, meta) {
  const videoUrl = String(meta.url ?? "").trim();
  const posterUrl = String(meta.thumbnail ?? "").trim();
  if (videoUrl) row.instagramVideoUrl = videoUrl;
  if (posterUrl) row.instagramPosterUrl = posterUrl;
}

async function main() {
  const { forceAll, limit } = parseArgs(process.argv);
  const beforeRows = JSON.parse(readFileSync(reelsJsonPath, "utf8"));
  if (!Array.isArray(beforeRows)) {
    throw new Error(`Expected JSON array: ${reelsJsonPath}`);
  }

  let checked = 0;
  let skippedHealthy = 0;
  let refreshed = 0;
  let failed = 0;
  let unchanged = 0;

  /** @type {Record<string, unknown>[]} */
  const afterRows = beforeRows.map((row) => ({ ...row }));

  for (const row of afterRows) {
    if (checked >= limit) break;
    const reelId = String(row.instagramReelId ?? "").trim();
    if (!reelId) continue;
    checked += 1;

    const beforeSnapshot = { ...row };
    const currentVideo = String(row.instagramVideoUrl ?? "").trim();

    if (!forceAll && currentVideo && (await cdnUrlHealthy(currentVideo))) {
      skippedHealthy += 1;
      continue;
    }

    try {
      const { kind, meta } = await fetchInstagramLearnMeta(reelId);
      if (kind !== "reel") {
        console.error(`${reelId}: not a reel (${kind}) — skipped`);
        unchanged += 1;
        continue;
      }

      applyCdnFromMeta(row, meta);
      assertOnlyCdnFieldsChanged(beforeSnapshot, row, reelId);

      const videoChanged = row.instagramVideoUrl !== beforeSnapshot.instagramVideoUrl;
      const posterChanged = row.instagramPosterUrl !== beforeSnapshot.instagramPosterUrl;
      if (videoChanged || posterChanged) {
        refreshed += 1;
        console.error(
          `${reelId}: refreshed CDN${videoChanged ? " video" : ""}${posterChanged ? " poster" : ""}`,
        );
      } else {
        unchanged += 1;
        console.error(`${reelId}: fetch ok, URLs unchanged`);
      }
    } catch (err) {
      failed += 1;
      const msg = err instanceof Error ? err.message : String(err);
      console.error(`${reelId}: refresh failed — ${msg}`);
    }

    await sleep(FETCH_DELAY_MS);
  }

  if (refreshed > 0) {
    writeFileSync(reelsJsonPath, `${JSON.stringify(afterRows, null, 2)}\n`);
  }

  console.error(
    `Done: checked=${checked} refreshed=${refreshed} skipped_healthy=${skippedHealthy} unchanged=${unchanged} failed=${failed}`,
  );
  // Partial yt-dlp failures are OK when at least one row refreshed (CI writes JSON only then).
  if (failed > 0 && refreshed === 0) process.exit(1);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
