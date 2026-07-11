import { SITE_URL } from "@/config/site";
import type { DoctorSlug } from "@/data/doctorProfiles";
import {
  knowledgeHubVideoCaptionForSeo,
  knowledgeHubVideoDisplayTitle,
  type KnowledgeHubVideo,
} from "@/data/knowledgeHubVideos";
import { DOCTOR_PHOTOS } from "@/config/doctorPhotos";
import { githubPagesAbsoluteUrl } from "@/lib/githubPagesPublicUrl";
import {
  doctorPhotoAlt,
  doctorPhotoTitle,
  knowledgeHubPosterAlt,
  knowledgeHubVideoThumbnailAbsolute,
} from "@/lib/mediaSeo";

export function physicianImageObject(slug: DoctorSlug) {
  const meta = DOCTOR_PHOTOS[slug];
  const url = githubPagesAbsoluteUrl(SITE_URL, meta.seoImagePath ?? meta.displaySrc);
  return {
    "@type": "ImageObject" as const,
    "@id": `${url}#image`,
    url,
    contentUrl: url,
    name: doctorPhotoTitle(slug),
    caption: doctorPhotoAlt(slug),
    width: meta.width,
    height: meta.height,
  };
}

/** Poster / thumbnail as `ImageObject` for Google Images (paired with watch pages). */
export function knowledgeHubPosterImageObject(video: KnowledgeHubVideo, watchPagePath: string) {
  const pageUrl = githubPagesAbsoluteUrl(SITE_URL, watchPagePath);
  const contentUrl = knowledgeHubVideoThumbnailAbsolute(SITE_URL, video);
  const name = knowledgeHubPosterAlt(video);
  const caption = knowledgeHubVideoCaptionForSeo(video).slice(0, 500);
  return {
    "@type": "ImageObject" as const,
    "@id": `${pageUrl}#poster`,
    url: contentUrl,
    contentUrl,
    name,
    caption,
    description: knowledgeHubVideoDisplayTitle(video),
    ...(video.postedAt ? { uploadDate: video.postedAt } : {}),
    isPartOf: { "@type": "WebPage", "@id": `${pageUrl}#webpage` },
  };
}
