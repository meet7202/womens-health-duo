import { instagramShortcodeFromInput } from "./instagram-url.mjs";
import { youtubeVideoIdFromInput } from "./youtube-url.mjs";

/** @typedef {{ platform: "instagram" | "youtube"; key: string; input: string }} LearnMediaInput */

/** @param {string} input */
export function parseLearnMediaInput(input) {
  const t = String(input ?? "").trim();
  if (!t || t.startsWith("#")) return null;

  if (/^instagram:/i.test(t)) {
    const key = instagramShortcodeFromInput(t.slice("instagram:".length).trim());
    return key ? { platform: "instagram", key, input: t } : null;
  }
  if (/^youtube:/i.test(t)) {
    const key = youtubeVideoIdFromInput(t.slice("youtube:".length).trim());
    return key ? { platform: "youtube", key, input: t } : null;
  }

  if (/instagram\.com/i.test(t)) {
    const key = instagramShortcodeFromInput(t);
    return key ? { platform: "instagram", key, input: t } : null;
  }

  if (/youtube\.com|youtu\.be/i.test(t)) {
    const key = youtubeVideoIdFromInput(t);
    return key ? { platform: "youtube", key, input: t } : null;
  }

  const ytKey = youtubeVideoIdFromInput(t);
  const igKey = instagramShortcodeFromInput(t);
  if (ytKey && !igKey) return { platform: "youtube", key: ytKey, input: t };
  if (igKey && !ytKey) return { platform: "instagram", key: igKey, input: t };
  if (ytKey && igKey && ytKey === igKey) {
    return { platform: "ambiguous", key: ytKey, input: t };
  }

  return null;
}
