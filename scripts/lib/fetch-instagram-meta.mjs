import { execSync } from "node:child_process";
import { instagramPageUrl } from "./instagram-url.mjs";

const UA = "Mozilla/5.0 (compatible; WHD-learn-import/1.0; +https://womenshealthduo.com)";

/** @param {string} url */
function ytDlpJson(url) {
  const raw = execSync(`yt-dlp --dump-single-json --no-download ${JSON.stringify(url)}`, {
    encoding: "utf8",
    stdio: ["ignore", "pipe", "pipe"],
  });
  return JSON.parse(raw);
}

/** @param {string} shortcode */
async function oEmbedForShortcode(shortcode) {
  const url = instagramPageUrl(shortcode, "p");
  const api = `https://www.instagram.com/api/v1/oembed/?url=${encodeURIComponent(url)}`;
  const res = await fetch(api, { headers: { "User-Agent": UA } });
  if (!res.ok) return null;
  try {
    return await res.json();
  } catch {
    return null;
  }
}

/** @param {unknown} meta */
export function instagramMediaKindFromMeta(meta) {
  if (!meta || typeof meta !== "object") return "image";
  const m = meta;
  if (m._type === "playlist" || (Array.isArray(m.entries) && m.entries.length > 1)) {
    return "carousel";
  }
  const videoUrl = String(m.url ?? "").trim();
  const isVideo =
    m._type === "video" ||
    videoUrl.includes(".mp4") ||
    (Array.isArray(m.formats) && m.formats.some((f) => f?.ext === "mp4" && f?.vcodec !== "none"));
  if (isVideo && videoUrl) return "reel";
  return "image";
}

/**
 * @param {string} shortcode
 * @returns {Promise<{ kind: "reel" | "carousel" | "image"; meta: Record<string, unknown>; oembed: Record<string, unknown> | null }>}
 */
export async function fetchInstagramLearnMeta(shortcode) {
  /** @type {Record<string, unknown> | null} */
  let meta = null;
  for (const kind of ["reel", "p"]) {
    try {
      meta = ytDlpJson(instagramPageUrl(shortcode, kind));
      if (meta) break;
    } catch {
      // try /p/ next
    }
  }

  const oembed = await oEmbedForShortcode(shortcode);
  if (!meta && oembed) {
    meta = {
      id: shortcode,
      description: oembed.title ?? "",
      thumbnail: oembed.thumbnail_url ?? "",
      timestamp: undefined,
      like_count: undefined,
      url: "",
      _type: "image",
    };
  }

  if (!meta) {
    throw new Error(`Could not fetch Instagram metadata for ${shortcode}`);
  }

  return { kind: instagramMediaKindFromMeta(meta), meta, oembed };
}
