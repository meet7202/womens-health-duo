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

  // If we still lack a timestamp, try fetching the public Instagram page HTML
  // and extract JSON-LD `uploadDate` / `datePublished` or other date hints.
  async function fetchHtmlShortcode() {
    try {
      const res = await fetch(instagramPageUrl(shortcode, 'p'), { headers: { 'User-Agent': UA } });
      if (!res.ok) return null;
      return await res.text();
    } catch {
      return null;
    }
  }

  try {
    if (!meta.timestamp) {
      const html = await fetchHtmlShortcode();
      if (html) {
        // Look for a JSON-LD block first
        const ldMatch = html.match(/<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/i);
        if (ldMatch) {
          try {
            const ld = JSON.parse(ldMatch[1]);
            const dateStr = ld?.uploadDate ?? ld?.datePublished;
            if (dateStr) {
              const d = new Date(dateStr);
              if (!Number.isNaN(d.getTime())) meta.timestamp = Math.floor(d.getTime() / 1000);
            }
          } catch (e) {
            // ignore JSON parse errors
          }
        }

        // Fallback: search for explicit uploadDate or datePublished strings in HTML
        if (!meta.timestamp) {
          const m = html.match(/"uploadDate"\s*:\s*"([0-9T:\-\.Z]+)"/i) || html.match(/"datePublished"\s*:\s*"([0-9T:\-\.Z]+)"/i);
          if (m) {
            const d = new Date(m[1]);
            if (!Number.isNaN(d.getTime())) meta.timestamp = Math.floor(d.getTime() / 1000);
          }
        }
      }
    }
  } catch (err) {
    // Swallow fallback errors — we don't want to fail the whole import for this
  }

  // Normalize common timestamp/upload date fields that yt-dlp or oembed may provide.
  // - `timestamp` is expected in seconds
  // - `timestamp_ms` may be present (milliseconds)
  // - `upload_date` is sometimes returned as YYYYMMDD string
  // Ensure `meta.timestamp` is a numeric seconds-since-epoch when possible.
  try {
    if (!meta.timestamp) {
      if (typeof meta.timestamp_ms === "number" && Number.isFinite(meta.timestamp_ms)) {
        meta.timestamp = Math.floor(meta.timestamp_ms / 1000);
      } else if (typeof meta.timestamp_ms === "string" && /\d+/.test(meta.timestamp_ms)) {
        const v = Number(meta.timestamp_ms);
        if (Number.isFinite(v)) meta.timestamp = Math.floor(v / 1000);
      } else if (typeof meta.upload_date === "string" && /^\d{8}$/.test(meta.upload_date)) {
        const s = meta.upload_date;
        const year = Number(s.slice(0, 4));
        const month = Number(s.slice(4, 6));
        const day = Number(s.slice(6, 8));
        if (year >= 1970 && month >= 1 && month <= 12 && day >= 1 && day <= 31) {
          const dt = new Date(Date.UTC(year, month - 1, day, 0, 0, 0));
          meta.timestamp = Math.floor(dt.getTime() / 1000);
        }
      } else if (typeof meta.upload_date === "number" && Number.isFinite(meta.upload_date)) {
        // Handle numeric YYYYMMDD
        const s = String(meta.upload_date);
        if (/^\d{8}$/.test(s)) {
          const year = Number(s.slice(0, 4));
          const month = Number(s.slice(4, 6));
          const day = Number(s.slice(6, 8));
          const dt = new Date(Date.UTC(year, month - 1, day, 0, 0, 0));
          meta.timestamp = Math.floor(dt.getTime() / 1000);
        }
      }
    }
  } catch (err) {
    // Don't fail the whole import for timestamp parsing issues
  }
  return { kind: instagramMediaKindFromMeta(meta), meta, oembed };
}
