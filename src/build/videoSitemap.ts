/**
 * Google Video sitemap (`sitemap-videos.xml`) for Learn watch pages.
 * Loaded from `vite.config.ts` at build time — no `@/` imports.
 */
import {
  KNOWLEDGE_HUB_VIDEOS,
  knowledgeHubInstagramEmbedUrl,
  knowledgeHubVideoCaptionForSeo,
  knowledgeHubVideoDisplayTitle,
  type KnowledgeHubVideo,
} from "../data/knowledgeHubVideos";
import { isEligibleKnowledgeHubVideoObject } from "../lib/knowledgeHubVideoEligibility";
import { learnVideoWatchPath } from "../lib/learnHubUrls";
import { githubPagesAbsoluteUrl } from "../lib/githubPagesPublicUrl";
import { knowledgeHubVideoThumbnailAbsolute } from "../lib/mediaSeo";

function escapeXml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function truncate(text: string, max: number): string {
  const t = text.replace(/\s+/g, " ").trim();
  if (t.length <= max) return t;
  return `${t.slice(0, max - 1)}…`;
}

function playerLoc(video: KnowledgeHubVideo): string | null {
  if (video.kind === "youtube_short") {
    return `https://www.youtube.com/embed/${video.youtubeVideoId}`;
  }
  if (video.kind === "instagram_reel") {
    return knowledgeHubInstagramEmbedUrl(video);
  }
  return null;
}

export function buildVideoSitemapXml(siteUrl: string, _lastmod: string): string {
  const entries = KNOWLEDGE_HUB_VIDEOS.filter(isEligibleKnowledgeHubVideoObject)
    .map((video) => {
      const watchPath = learnVideoWatchPath(video.id);
      const pageLoc = githubPagesAbsoluteUrl(siteUrl, watchPath);
      const title = truncate(knowledgeHubVideoDisplayTitle(video), 100);
      const description = truncate(knowledgeHubVideoCaptionForSeo(video), 2048);
      const thumb = knowledgeHubVideoThumbnailAbsolute(siteUrl, video);
      const player = playerLoc(video);
      if (!thumb || !player || !video.postedAt) return null;

      const parts = [
        `  <url>`,
        `    <loc>${escapeXml(pageLoc)}</loc>`,
        `    <video:video>`,
        `      <video:thumbnail_loc>${escapeXml(thumb)}</video:thumbnail_loc>`,
        `      <video:title>${escapeXml(title)}</video:title>`,
        `      <video:description>${escapeXml(description)}</video:description>`,
        `      <video:player_loc allow_embed="yes">${escapeXml(player)}</video:player_loc>`,
        `      <video:publication_date>${escapeXml(video.postedAt)}</video:publication_date>`,
        `      <video:family_friendly>yes</video:family_friendly>`,
        `      <video:requires_subscription>no</video:requires_subscription>`,
        `      <video:uploader info="${escapeXml(siteUrl)}">Women's Health Duo</video:uploader>`,
        `      <video:live>no</video:live>`,
        `      <video:tag>women's health</video:tag>`,
      ];
      if (video.topics[0]) {
        parts.push(`      <video:tag>${escapeXml(video.topics[0])}</video:tag>`);
      }
      parts.push(`    </video:video>`);
      parts.push(`  </url>`);
      return parts.join("\n");
    })
    .filter((e): e is string => Boolean(e));

  return `<?xml version="1.0" encoding="UTF-8"?>
<!-- Learn watch pages: YouTube Shorts and Instagram Reels (Google Video search) -->
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
${entries.join("\n")}
</urlset>
`;
}

export function videoSitemapEntryCount(): number {
  return KNOWLEDGE_HUB_VIDEOS.filter(isEligibleKnowledgeHubVideoObject).length;
}
