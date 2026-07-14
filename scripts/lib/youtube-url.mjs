const WATCH_RE =
  /(?:youtube\.com\/watch\?(?:[^&]*&)*v=|youtu\.be\/|youtube\.com\/shorts\/)([A-Za-z0-9_-]{11})/i;
const BARE_RE = /^[A-Za-z0-9_-]{11}$/;

/** @param {string} input */
export function youtubeVideoIdFromInput(input) {
  const t = String(input ?? "").trim();
  if (!t || t.startsWith("#")) return null;
  const fromUrl = t.match(WATCH_RE);
  if (fromUrl) return fromUrl[1];
  if (BARE_RE.test(t)) return t;
  return null;
}

/** @param {string} videoId */
export function youtubeWatchUrl(videoId) {
  return `https://www.youtube.com/watch?v=${videoId}`;
}
