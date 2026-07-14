import { execSync } from "node:child_process";
import { youtubeWatchUrl } from "./youtube-url.mjs";

/** @param {string} url */
function ytDlpJson(url) {
  const raw = execSync(`yt-dlp --dump-single-json --no-download ${JSON.stringify(url)}`, {
    encoding: "utf8",
    stdio: ["ignore", "pipe", "pipe"],
  });
  return JSON.parse(raw);
}

/** @param {unknown} meta */
export function youtubeIsShortFromMeta(meta) {
  const pageUrl = String(meta?.original_url ?? meta?.webpage_url ?? "");
  if (/\/shorts\//i.test(pageUrl)) return true;
  const duration = Number(meta?.duration);
  if (Number.isFinite(duration) && duration > 0 && duration <= 60) return true;
  return false;
}

/**
 * @param {string} videoId
 * @returns {Promise<{ videoId: string; isShort: boolean; meta: Record<string, unknown> }>}
 */
export async function fetchYoutubeLearnMeta(videoId) {
  const meta = ytDlpJson(youtubeWatchUrl(videoId));
  return { videoId, isShort: youtubeIsShortFromMeta(meta), meta };
}
