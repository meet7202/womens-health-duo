import { SITE_NAME, SITE_URL } from "@/config/site";
import { githubPagesAbsoluteUrl } from "@/lib/githubPagesPublicUrl";
import { DOCTOR_BY_SLUG } from "@/data/doctorProfiles";
import type { TopicGuideAuthorId } from "@/data/topicGuides/types";

/**
 * Article JSON-LD for published editorial guides.
 * Only call when visible attribution/dates are truthful (approved revision).
 */
export function articleSchema(params: {
  path: string;
  headline: string;
  description: string;
  datePublished?: string;
  dateModified?: string;
  authorId?: TopicGuideAuthorId;
  reviewerIds?: readonly TopicGuideAuthorId[];
  imageUrls?: readonly string[];
}) {
  const url = githubPagesAbsoluteUrl(SITE_URL, params.path);
  const author =
    params.authorId && DOCTOR_BY_SLUG[params.authorId]
      ? {
          "@type": "Person" as const,
          name: DOCTOR_BY_SLUG[params.authorId].name,
          url: githubPagesAbsoluteUrl(SITE_URL, DOCTOR_BY_SLUG[params.authorId].path),
        }
      : {
          "@type": "Organization" as const,
          name: SITE_NAME,
          url: githubPagesAbsoluteUrl(SITE_URL, "/"),
        };

  const reviewers = (params.reviewerIds ?? []).flatMap((id) => {
    const doctor = DOCTOR_BY_SLUG[id];
    return doctor
      ? [
          {
            "@type": "Person" as const,
            name: doctor.name,
            jobTitle: doctor.jobTitle,
            url: githubPagesAbsoluteUrl(SITE_URL, doctor.path),
          },
        ]
      : [];
  });

  const node: Record<string, unknown> = {
    "@type": "Article",
    "@id": `${url}#article`,
    headline: params.headline,
    description: params.description,
    mainEntityOfPage: { "@type": "WebPage", "@id": `${url}#webpage` },
    author,
    ...(reviewers.length ? { reviewedBy: reviewers } : {}),
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      url: githubPagesAbsoluteUrl(SITE_URL, "/"),
    },
    isAccessibleForFree: true,
  };

  if (params.datePublished) node.datePublished = params.datePublished;
  if (params.dateModified) node.dateModified = params.dateModified;
  if (params.imageUrls?.length) {
    node.image = [...params.imageUrls];
  }

  return node;
}
