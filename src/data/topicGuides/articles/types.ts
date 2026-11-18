import type { FaqItem } from "../../siteFaq";
import type { TopicGuideAuthorId, TopicGuideReference, TopicGuideSection } from "../types";

/** Publication lifecycle — separate from editorial `reviewStatus` (byline gate). */
export type ArticlePublicationStatus = "draft" | "in_clinical_review" | "approved" | "published";

export type ArticleInlineLink = {
  anchor: string;
  path: string;
};

export type ArticleFigure = {
  src: string;
  /** Responsive `srcset` for raster figures (800w + full width WebP). */
  srcSet?: string;
  alt: string;
  caption: string;
  width: number;
  height: number;
  /** Pending until a clinician reviews diagrams / exercise-adjacent visuals. */
  approvalStatus: "pending" | "approved";
};

export type ArticleClaimLedgerEntry = {
  claim: string;
  sourceUrl: string;
  sourceSection?: string;
  limitations: string;
  reviewerDecision: "pending" | "accepted" | "revise";
};

/**
 * Unique article revision for the six-month calendar.
 * Draft/approved revisions must not replace live refresh HTML until `publicationStatus === "published"`.
 */
export type CalendarArticleRevision = {
  id: string;
  slug: string;
  action: "Refresh" | "New";
  publicationStatus: ArticlePublicationStatus;
  scheduledAt: string;
  proposedLeadId: TopicGuideAuthorId;
  title: string;
  seoTitle: string;
  description: string;
  primaryQuestion: string;
  directAnswer: string;
  storytellingNote: string;
  sections: TopicGuideSection[];
  /**
   * Four Google Images click-hook lines for the watermarked SVG explainer.
   * Must be answered in `sections` or `faqs`; sourced from `blog/drafts/explainer-cards.json`.
   */
  explainerCards?: [string, string, string, string];
  figures: ArticleFigure[];
  references: TopicGuideReference[];
  internalLinks: ArticleInlineLink[];
  /**
   * Article-specific FAQs. When present (even empty) they replace the pooled cluster
   * FAQs and the automatic booking questions on the article page.
   */
  faqs?: FaqItem[];
  conversionCopy: string;
  conversionPath: string;
  parentHubPath: string;
  claimLedger: ArticleClaimLedgerEntry[];
  openClinicalQuestions: string[];
  /** Body fingerprint input for IndexNow change detection. */
  bodyFingerprintText: string;
  publishedAt?: string;
  /** Only set after real clinician confirmation — do not invent. */
  authorId?: TopicGuideAuthorId;
  reviewerId?: TopicGuideAuthorId;
  /** Clinicians who reviewed and approved this text (both shown on the byline). */
  reviewerIds?: TopicGuideAuthorId[];
};
