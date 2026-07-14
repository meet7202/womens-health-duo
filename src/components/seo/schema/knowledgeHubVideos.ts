import { SITE_URL } from "@/config/site";
import {
  knowledgeHubInstagramEmbedUrl,
  knowledgeHubInstagramPermalink,
  knowledgeHubVideoCaptionForSeo,
  knowledgeHubVideoDisplayTitle,
  type KnowledgeHubVideo,
} from "@/data/knowledgeHubVideos";
import { githubPagesAbsoluteUrl } from "@/lib/githubPagesPublicUrl";
import { knowledgeHubVideoThumbnailAbsolute, youtubeThumbnailUrl } from "@/lib/mediaSeo";

/** `VideoObject` for a single Learn watch page (Google video indexing). */
export function knowledgeHubWatchPageVideoSchema(video: KnowledgeHubVideo, watchPagePath: string) {
  const pageUrl = githubPagesAbsoluteUrl(SITE_URL, watchPagePath);
  const pageWebPageId = `${pageUrl}#webpage`;
  const orgFragment = `${githubPagesAbsoluteUrl(SITE_URL, "/")}#organization`;
  const name = knowledgeHubVideoDisplayTitle(video);
  const description = knowledgeHubVideoCaptionForSeo(video);

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
      contentUrl: pageUrl,
      caption: description.slice(0, 500),
      ...(video.postedAt ? { uploadDate: video.postedAt } : {}),
      mainEntityOfPage: { "@type": "WebPage", "@id": pageWebPageId },
      publisher: { "@id": orgFragment },
    };
  }

  if (video.kind === "instagram_post") {
    const permalink = knowledgeHubInstagramPermalink(video);
    return {
      "@type": "SocialMediaPosting",
      "@id": `${pageUrl}#post`,
      headline: name,
      articleBody: description,
      url: permalink,
      datePublished: video.postedAt,
      mainEntityOfPage: { "@type": "WebPage", "@id": pageWebPageId },
      publisher: { "@id": orgFragment },
    };
  }

  const permalink = knowledgeHubInstagramPermalink(video);
  const embedUrl = knowledgeHubInstagramEmbedUrl(video);
  const thumbnailUrl = knowledgeHubVideoThumbnailAbsolute(SITE_URL, video);
  return {
    "@type": "VideoObject",
    "@id": `${pageUrl}#video`,
    name,
    description,
    thumbnailUrl,
    embedUrl,
    url: permalink,
    // Stable WHD watch page — never expiring Instagram CDN MP4 URLs (playback-only in JSON).
    contentUrl: pageUrl,
    caption: description.slice(0, 500),
    ...(video.postedAt ? { uploadDate: video.postedAt } : {}),
    mainEntityOfPage: { "@type": "WebPage", "@id": pageWebPageId },
    publisher: { "@id": orgFragment },
  };
}
