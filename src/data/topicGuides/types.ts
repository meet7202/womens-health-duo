import type { FaqItem } from "../siteFaq";

export type TopicGuideTier = 1 | 2 | 3 | 4 | 5 | 6 | 7;

export type TopicGuideClusterId =
  | "pcos"
  | "periods"
  | "hormones"
  | "fertility"
  | "pregnancy-physio"
  | "postpartum"
  | "pelvic"
  | "physio"
  | "pilates"
  | "gyn-general"
  | "online-gyne";

export type TopicGuideSection = {
  heading: string;
  paragraphs: string[];
};

/**
 * Editorial review gate (SEO-14).
 * Do not invent approvals: default existing guides to `pending` until a real clinician review.
 * Byline/review UI renders only when `reviewStatus === "approved"` and supporting fields are present.
 */
export type TopicGuideReviewStatus = "pending" | "draft" | "needs-review" | "approved";

export type TopicGuideAuthorId = "charmi" | "zalak";

export type TopicGuideReference = {
  label: string;
  /** Optional public URL; omit when citing a named guideline without a stable link. */
  url?: string;
};

export type TopicGuideRow = {
  slug: string;
  tier: TopicGuideTier;
  cluster: TopicGuideClusterId;
  /** When set, overrides `topicGuideTitleFromSlug`. */
  title?: string;
  primaryConsult?: "charmi" | "zalak" | "both";
  learnTopics?: string[];
  serviceSlugs?: string[];
  /** When set, replaces auto-related (still capped). */
  related?: string[];
  /**
   * Explicit cluster FAQ ids from `clusterContent` pools (order preserved; SEO-13).
   * When set, booking FAQs stay separate and cluster FAQs are not padded to a fixed count.
   * When omitted, pool selection prefers a title/slug match then declaration order (no hash).
   */
  faqIds?: readonly string[];
  /** Verified author only — omit until attribution is confirmed. */
  authorId?: TopicGuideAuthorId;
  /** Verified medical reviewer only — omit until review is confirmed. */
  reviewerId?: TopicGuideAuthorId;
  publishedAt?: string;
  updatedAt?: string;
  reviewedAt?: string;
  /** Defaults to `pending` for existing guides; never invent `approved`. */
  reviewStatus?: TopicGuideReviewStatus;
  references?: readonly TopicGuideReference[];
  /**
   * SEO-12: reader question this page answers (optional until uniqueness pass).
   * Prefer `guideUniquenessOverrides` for priority slugs rather than inventing per-row clinical copy here.
   */
  primaryQuestion?: string;
  /** SEO-12: short title-specific answer; not a clinician approval badge. */
  directAnswer?: string;
};

export type TopicGuidePageModel = {
  slug: string;
  path: string;
  tier: TopicGuideTier;
  cluster: TopicGuideClusterId;
  title: string;
  /** Lead under the H1: title, cluster blurb, short booking line; trimmed at sentence boundaries when long. */
  introParagraph: string;
  /** Shorter description for `<meta name="description">` and JSON-LD; trimmed at sentence boundaries when long. */
  metaDescription: string;
  sections: TopicGuideSection[];
  faqs: FaqItem[];
  learnTopicLabels: string[];
  primaryConsult: "charmi" | "zalak" | "both";
  serviceSlugs: string[];
  relatedSlugs: string[];
  authorId?: TopicGuideAuthorId;
  reviewerId?: TopicGuideAuthorId;
  publishedAt?: string;
  updatedAt?: string;
  reviewedAt?: string;
  reviewStatus?: TopicGuideReviewStatus;
  references: readonly TopicGuideReference[];
  /** SEO-12 uniqueness scaffolding when present (still `reviewStatus: pending`). */
  primaryQuestion?: string;
  directAnswer?: string;
};
