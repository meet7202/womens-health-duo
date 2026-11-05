/**
 * Shared VideoObject / video-sitemap eligibility for Learn media.
 * Must not use `@/` imports (consumed from Node build scripts).
 */
import { knowledgeHubInstagramPoster, type KnowledgeHubVideo } from "../data/knowledgeHubVideos";

const PLATFORM_ERROR_CAPTION_MARKERS = [
  "this content isn't available",
  "content isn't available to everyone",
  "sorry, this page isn't available",
];

/** True when caption/title looks like an Instagram availability error, not educational copy. */
export function isPlatformUnavailableCaption(text: string | undefined): boolean {
  const t = (text ?? "").trim().toLowerCase();
  if (!t) return false;
  return PLATFORM_ERROR_CAPTION_MARKERS.some((m) => t.includes(m));
}

/** Platform-unavailable or empty Instagram reel captions (SEO-16). */
export function isPlatformUnavailableOrEmptyReelCaption(video: KnowledgeHubVideo): boolean {
  if (video.kind !== "instagram_reel") return false;
  const cap = video.instagramCaption?.trim() ?? "";
  if (!cap) return true;
  return isPlatformUnavailableCaption(cap) || isPlatformUnavailableCaption(video.title);
}

/** Stable local poster path under `/images/…` — not CDN and not the site favicon. */
export function knowledgeHubStableLocalPosterPath(video: KnowledgeHubVideo): string | undefined {
  if (video.kind === "youtube_short") return undefined;
  const poster = knowledgeHubInstagramPoster(video);
  if (poster?.startsWith("/images/")) return poster;
  return undefined;
}

/**
 * Eligible for VideoObject / video sitemap when we have a real embed player plus
 * a trustworthy upload date and (for Instagram) a stable local poster.
 * Image/carousel posts are never video-eligible.
 * Platform-unavailable / empty-error reels (e.g. ig-cr1otdannn4, ig-dbtawiyp_m_) never emit VideoObject.
 */
export function isEligibleKnowledgeHubVideoObject(video: KnowledgeHubVideo): boolean {
  if (video.kind === "instagram_post") return false;
  if (!video.postedAt?.trim()) return false;

  if (video.kind === "youtube_short") {
    return Boolean(video.youtubeVideoId?.trim());
  }

  if (video.kind === "instagram_reel") {
    if (isPlatformUnavailableOrEmptyReelCaption(video)) return false;
    return Boolean(knowledgeHubStableLocalPosterPath(video));
  }

  return false;
}

/**
 * Indexable Learn watch pages (primary sitemap + robots index).
 * Instagram image/carousel posts stay indexable without VideoObject.
 * Incomplete or platform-unavailable reels/Shorts stay routable but noindex.
 */
export function isIndexableKnowledgeHubWatchPage(video: KnowledgeHubVideo): boolean {
  if (video.kind === "instagram_post") return true;
  if (video.kind === "instagram_reel" && isPlatformUnavailableOrEmptyReelCaption(video)) {
    return false;
  }
  return isEligibleKnowledgeHubVideoObject(video);
}
