/**
 * Alt/title/caption strings for images and video posters (Google Images / Video discovery).
 * No `@/` imports — safe from Node build scripts.
 */
import type { DoctorSlug } from "../data/doctorProfiles";
import {
  knowledgeHubInstagramPoster,
  knowledgeHubVideoDisplayTitle,
  type KnowledgeHubVideo,
} from "../data/knowledgeHubVideos";
import { githubPagesAbsoluteUrl } from "./githubPagesPublicUrl";

export function doctorPhotoAlt(slug: DoctorSlug): string {
  return slug === "charmi"
    ? "Dr. Charmi Shah, OB-GYN and IVF specialist at Women's Health Duo"
    : "Dr. Zalak Shah, women's health physiotherapist and STOTT Pilates instructor at Women's Health Duo";
}

export function doctorPhotoTitle(slug: DoctorSlug): string {
  return slug === "charmi"
    ? "Dr. Charmi Shah — obstetrician, gynecologist, IVF and laparoscopy"
    : "Dr. Zalak Shah — women's health physio, STOTT Pilates Mat and Reformer";
}

export const HERO_IMAGE_ALT =
  "Dr. Charmi Shah and Dr. Zalak Shah, sisters and co-founders of Women's Health Duo";

export const HERO_IMAGE_TITLE = "Women's Health Duo — OB-GYN and women's health physiotherapy team";

function hubDoctorLabel(video: KnowledgeHubVideo): string {
  if (video.doctor === "charmi") return "Dr. Charmi Shah";
  if (video.doctor === "zalak") return "Dr. Zalak Shah";
  return "Dr. Charmi Shah and Dr. Zalak Shah";
}

function hubMediaKindLabel(video: KnowledgeHubVideo): string {
  if (video.kind === "youtube_short") return "YouTube Short";
  if (video.kind === "instagram_reel") return "Instagram Reel";
  return video.instagramPostType === "carousel" ? "Instagram carousel" : "Instagram post";
}

/** Descriptive `alt` / `title` for hub posters and watch-page thumbnails. */
export function knowledgeHubPosterAlt(video: KnowledgeHubVideo): string {
  const title = knowledgeHubVideoDisplayTitle(video);
  return `${title} — ${hubMediaKindLabel(video)} cover, Women's Health Duo (${hubDoctorLabel(video)})`;
}

export function youtubeThumbnailUrl(youtubeVideoId: string): string {
  return `https://i.ytimg.com/vi/${youtubeVideoId}/hqdefault.jpg`;
}

/** Absolute HTTPS thumbnail for schema, OG, and video sitemap. */
export function knowledgeHubVideoThumbnailAbsolute(
  siteUrl: string,
  video: KnowledgeHubVideo,
): string {
  if (video.kind === "youtube_short") {
    return youtubeThumbnailUrl(video.youtubeVideoId);
  }
  const poster = knowledgeHubInstagramPoster(video);
  if (poster?.startsWith("/")) {
    return githubPagesAbsoluteUrl(siteUrl, poster);
  }
  if (poster) return poster;
  return githubPagesAbsoluteUrl(siteUrl, "/favicon.svg");
}
