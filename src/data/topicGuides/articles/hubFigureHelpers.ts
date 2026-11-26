import type { FaqItem } from "../../siteFaq";
import type { TopicGuideAuthorId, TopicGuideReference, TopicGuideSection } from "../types";
import type {
  ArticleClaimLedgerEntry,
  ArticleFigure,
  ArticleInlineLink,
  CalendarArticleRevision,
} from "./types";

type RasterSpec = {
  /** Approved article image folder under `public/images/articles/`. */
  pack: string;
  alt: string;
  caption: string;
};

/** Approved article raster (scene/anatomy) with 800w srcset. */
export function articleRaster(
  folder: string,
  kind: "scene" | "anatomy",
  alt: string,
  caption: string,
): ArticleFigure {
  const base = `/images/articles/${folder}/${folder}-${kind}`;
  return {
    src: `${base}.webp`,
    srcSet: `${base}-800.webp 800w, ${base}.webp 1600w`,
    alt,
    caption,
    width: 1600,
    height: 1067,
    approvalStatus: "approved",
  };
}

export function articleExplainer(folder: string, alt: string): ArticleFigure {
  return {
    src: `/images/articles/${folder}/${folder}-explainer.svg`,
    alt,
    caption: "Patient-education graphic for orientation. Not a diagnostic tool.",
    width: 1200,
    height: 675,
    approvalStatus: "approved",
  };
}

type HubArticleInput = {
  id: string;
  slug: string;
  lead: TopicGuideAuthorId;
  title: string;
  seoTitle: string;
  description: string;
  primaryQuestion: string;
  directAnswer: string;
  sections: TopicGuideSection[];
  explainerCards: [string, string, string, string];
  scene: RasterSpec;
  anatomy: RasterSpec;
  /** Alt text for the hub's own explainer (`scripts/generate-hub-explainers.mjs`). */
  explainerAlt: string;
  references: TopicGuideReference[];
  internalLinks: ArticleInlineLink[];
  faqs: FaqItem[];
  conversionCopy: string;
  parentHubPath: string;
  claimLedger?: ArticleClaimLedgerEntry[];
};

/**
 * Hub pages share the calendar-article layout: direct answer, topic sections,
 * scene, anatomy, and a hub-specific explainer, plus topic FAQs.
 * Two further rasters are added at page build from related guides.
 * Both doctors approved this revision on 26 November 2026.
 */
export function hubArticle(input: HubArticleInput): CalendarArticleRevision {
  return {
    id: input.id,
    slug: input.slug,
    action: "Refresh",
    publicationStatus: "published",
    scheduledAt: "2026-11-26T09:00:00+05:30",
    proposedLeadId: input.lead,
    publishedAt: "2026-11-26",
    reviewedAt: "2026-11-26",
    reviewerIds: ["charmi", "zalak"],
    title: input.title,
    seoTitle: input.seoTitle,
    description: input.description,
    primaryQuestion: input.primaryQuestion,
    directAnswer: input.directAnswer,
    storytellingNote: "",
    sections: input.sections,
    explainerCards: input.explainerCards,
    figures: [
      articleRaster(input.scene.pack, "scene", input.scene.alt, input.scene.caption),
      articleRaster(input.anatomy.pack, "anatomy", input.anatomy.alt, input.anatomy.caption),
      articleExplainer(input.slug, input.explainerAlt),
    ],
    references: input.references,
    internalLinks: input.internalLinks,
    faqs: input.faqs,
    conversionCopy: input.conversionCopy,
    conversionPath: "/book-consultation/",
    parentHubPath: input.parentHubPath,
    claimLedger: input.claimLedger ?? [],
    openClinicalQuestions: [],
    bodyFingerprintText: [
      input.primaryQuestion,
      input.directAnswer,
      ...input.sections.flatMap((s) => [s.heading, ...s.paragraphs]),
    ].join("\n"),
  };
}
