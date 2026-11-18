import { SITE_NAME, SITE_URL } from "@/config/site";
import { githubPagesAbsoluteUrl } from "@/lib/githubPagesPublicUrl";
import { DOCTOR_BY_SLUG } from "@/data/doctorProfiles";
import type { TopicGuideAuthorId } from "@/data/topicGuides/types";

function person(id: TopicGuideAuthorId | undefined) {
  const doctor = id ? DOCTOR_BY_SLUG[id] : undefined;
  if (!doctor) return undefined;
  return {
    "@type": "Person" as const,
    name: doctor.name,
    jobTitle: doctor.jobTitle,
    url: githubPagesAbsoluteUrl(SITE_URL, doctor.path),
  };
}

/**
 * Article JSON-LD for published editorial guides.
 * `authorId` / `reviewerIds` must be recorded contributions (approved revision);
 * otherwise the Organization is the author and `reviewedBy` is omitted.
 */
export function articleSchema(params: {
  path: string;
  headline: string;
  description: string;
  datePublished?: string;
  authorId?: TopicGuideAuthorId;
  reviewerIds?: readonly TopicGuideAuthorId[];
  imageUrls?: readonly string[];
}) {
  const url = githubPagesAbsoluteUrl(SITE_URL, params.path);
  const reviewers = (params.reviewerIds ?? [])
    .map((id) => person(id))
    .filter((p): p is NonNullable<ReturnType<typeof person>> => Boolean(p));
  const author = person(params.authorId) ?? {
    "@type": "Organization" as const,
    name: SITE_NAME,
    url: githubPagesAbsoluteUrl(SITE_URL, "/"),
  };

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
  if (params.imageUrls?.length) {
    node.image = [...params.imageUrls];
  }

  return node;
}
