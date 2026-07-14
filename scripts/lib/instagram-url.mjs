const URL_RE = /instagram\.com\/(?:[^/]+\/)?(?:reel|p)\/([A-Za-z0-9_-]+)\/?/i;
const BARE_RE = /^[A-Za-z0-9_-]{10,}$/;

/** @param {string} input */
export function instagramShortcodeFromInput(input) {
  const t = String(input ?? "").trim();
  if (!t || t.startsWith("#")) return null;
  const fromUrl = t.match(URL_RE);
  if (fromUrl) return fromUrl[1];
  if (BARE_RE.test(t)) return t;
  return null;
}

/** @param {string} shortcode @param {"reel" | "p"} kind */
export function instagramPageUrl(shortcode, kind = "p") {
  return `https://www.instagram.com/${kind}/${shortcode}/`;
}
