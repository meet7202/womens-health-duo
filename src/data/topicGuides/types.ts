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
 * Default is `pending` — never invent `approved` without per-guide clinician confirmation.
 * Byline/review UI renders only when `reviewStatus === "approved"` and author/reviewer fields are present.
 *
 * To approve a guide: set `reviewStatus: "approved"` plus verified `authorId` / `reviewerId` / dates on the row.
 * Temporary withhold of an approved row: add the slug to `TOPIC_GUIDE_REVIEW_HOLDS`.
 */
export type TopicGuideReviewStatus = "pending" | "draft" | "needs-review" | "approved";

/** Non-approved statuses used for per-guide clinical holds. */
export type TopicGuideReviewHoldStatus = Exclude<TopicGuideReviewStatus, "approved">;

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
  /**
   * Optional per-guide gate. When omitted, registry default is `pending`.
   * Set `approved` only after clinician confirmation (with author/reviewer/dates on the row).
   */
  reviewStatus?: TopicGuideReviewStatus;
  references?: readonly TopicGuideReference[];
  /**
   * SEO-12: reader question this page answers (optional until uniqueness pass).
   * Prefer `guideUniquenessOverrides` for priority slugs rather than inventing per-row clinical copy here.
   */
  primaryQuestion?: string;
  /** SEO-12: short title-specific answer; not a clinician approval badge. */
  directAnswer?: string;
  /**
   * Crawl/sitemap/index visibility — separate from `reviewStatus` (byline only).
   * Omit or `true` for the existing public guide set. Set `false` for unpublished new calendar URLs.
   */
  indexable?: boolean;
  /** Calendar article id (e.g. W01-Z) when this row is managed by the blog programme. */
  calendarArticleId?: string;
};

export type TopicGuideFigure = {
  src: string;
  srcSet?: string;
  alt: string;
  caption: string;
  width: number;
  height: number;
};

export type TopicGuidePageModel = {
  slug: string;
  path: string;
  tier: TopicGuideTier;
  cluster: TopicGuideClusterId;
  title: string;
  /** Shorter `<title>` text from the published article; the H1 stays `title`. */
  seoTitle?: string;
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
  /** Approved reviewers for the byline (set from a recorded clinical approval). */
  reviewerIds?: TopicGuideAuthorId[];
  /** ISO date of the recorded clinical review, when the guide is in an approved set. */
  reviewedAt?: string;
  publishedAt?: string;
  reviewStatus?: TopicGuideReviewStatus;
  references: readonly TopicGuideReference[];
  /** SEO-12 uniqueness scaffolding when present. */
  primaryQuestion?: string;
  directAnswer?: string;
  /** True unless the row explicitly sets `indexable: false`. */
  indexable: boolean;
  /** Present when a published calendar article revision supplies the unique body. */
  calendarArticleId?: string;
  figures?: readonly TopicGuideFigure[];
  conversionCopy?: string;
  conversionPath?: string;
  storytellingNote?: string;
  /** Stable text used in IndexNow body fingerprint when a published article is live. */
  bodyFingerprintText?: string;
  internalLinks?: readonly { anchor: string; path: string }[];
};
