import { SITE_URL } from "@/config/site";
import {
  knowledgeHubInstagramEmbedUrl,
  knowledgeHubInstagramPermalink,
  knowledgeHubVideoCaptionForSeo,
  knowledgeHubVideoDisplayTitle,
  type KnowledgeHubVideo,
} from "@/data/knowledgeHubVideos";
import { isEligibleKnowledgeHubVideoObject } from "@/lib/knowledgeHubVideoEligibility";
import { githubPagesAbsoluteUrl } from "@/lib/githubPagesPublicUrl";
import { knowledgeHubVideoThumbnailAbsolute, youtubeThumbnailUrl } from "@/lib/mediaSeo";

/**
 * Schema for a single Learn watch page.
 * Returns VideoObject only when eligible (date + thumbnail + real player).
 * Instagram image/carousel posts intentionally omit SocialMediaPosting — Google’s
 * Discussion Forum rich result requires `author` and is meant for UGC forums, not
 * publisher clips (poster `ImageObject` on the watch page covers image SEO).
 * Never sets `contentUrl` to an HTML watch page (Google requires video bytes for contentUrl).
 */
export function knowledgeHubWatchPageVideoSchema(
  video: KnowledgeHubVideo,
  watchPagePath: string,
): Record<string, unknown> | null {
  const pageUrl = githubPagesAbsoluteUrl(SITE_URL, watchPagePath);
  const pageWebPageId = `${pageUrl}#webpage`;
  const orgFragment = `${githubPagesAbsoluteUrl(SITE_URL, "/")}#organization`;
  const name = knowledgeHubVideoDisplayTitle(video);
  const description = knowledgeHubVideoCaptionForSeo(video);

  if (video.kind === "instagram_post") {
    return null;
  }

  if (!isEligibleKnowledgeHubVideoObject(video)) {
    return null;
  }

  if (video.kind === "youtube_short") {
    const embedUrl = `https://www.youtube.com/embed/${video.youtubeVideoId}`;
    const watchUrl =
      video.youtubeOpenAs === "watch"
        ? `https://www.youtube.com/watch?v=${video.youtubeVideoId}`
        : `https://www.youtube.com/shorts/${video.youtubeVideoId}`;
    return {
      "@type": "VideoObject",
      "@id": `${pageUrl}#video`,
      name,
      description,
      thumbnailUrl: youtubeThumbnailUrl(video.youtubeVideoId),
      embedUrl,
      url: watchUrl,
      caption: description.slice(0, 500),
      uploadDate: video.postedAt,
      mainEntityOfPage: { "@type": "WebPage", "@id": pageWebPageId },
      publisher: { "@id": orgFragment },
    };
  }

  const permalink = knowledgeHubInstagramPermalink(video);
  const embedUrl = knowledgeHubInstagramEmbedUrl(video);
  const thumbnailUrl = knowledgeHubVideoThumbnailAbsolute(SITE_URL, video);
  if (!thumbnailUrl) return null;

  return {
    "@type": "VideoObject",
    "@id": `${pageUrl}#video`,
    name,
    description,
    thumbnailUrl,
    embedUrl,
    url: permalink,
    caption: description.slice(0, 500),
    uploadDate: video.postedAt,
    mainEntityOfPage: { "@type": "WebPage", "@id": pageWebPageId },
    publisher: { "@id": orgFragment },
  };
}
