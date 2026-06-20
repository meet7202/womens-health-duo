import { SITE_URL } from "@/config/site";
import { ROUTES } from "@/config/routes";
import { knowledgeHubVideoCaptionForSeo, type KnowledgeHubVideo } from "@/data/knowledgeHubVideos";

function youtubeThumb(id: string) {
  return `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;
}

/** VideoObject entries for the Learn hub (supports video rich results / indexing hints). */
export function knowledgeHubVideoSchemaNodes(
  videos: readonly KnowledgeHubVideo[],
  learnPagePath: string = ROUTES.learn,
) {
  const pageUrl = `${SITE_URL}${learnPagePath}`;
  return videos.map((v) => {
    if (v.kind === "youtube_short") {
      const embedUrl = `https://www.youtube.com/embed/${v.youtubeVideoId}`;
      const watchUrl =
        v.youtubeOpenAs === "watch"
          ? `https://www.youtube.com/watch?v=${v.youtubeVideoId}`
          : `https://www.youtube.com/shorts/${v.youtubeVideoId}`;
      return {
        "@type": "VideoObject",
        "@id": `${pageUrl}#video-${v.id}`,
        name: v.title,
        description: knowledgeHubVideoCaptionForSeo(v),
        thumbnailUrl: youtubeThumb(v.youtubeVideoId),
        embedUrl,
        url: watchUrl,
        isPartOf: { "@type": "WebPage", "@id": `${pageUrl}#webpage` },
        publisher: { "@id": `${SITE_URL}/#organization` },
      };
    }
    const permalink = `https://www.instagram.com/reel/${v.instagramReelId}/`;
    const embedUrl = `https://www.instagram.com/reel/${v.instagramReelId}/embed/`;
    return {
      "@type": "VideoObject",
      "@id": `${pageUrl}#video-${v.id}`,
      name: v.title,
      description: knowledgeHubVideoCaptionForSeo(v),
      thumbnailUrl: `${SITE_URL}/favicon.svg`,
      embedUrl,
      url: permalink,
      isPartOf: { "@type": "WebPage", "@id": `${pageUrl}#webpage` },
      publisher: { "@id": `${SITE_URL}/#organization` },
    };
  });
}
