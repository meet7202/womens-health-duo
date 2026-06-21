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
};
