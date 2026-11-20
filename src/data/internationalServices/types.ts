import type { DoctorSlug } from "../doctorProfiles";

export type InternationalServiceFaq = { question: string; answer: string };

export type InternationalService = {
  slug: string;
  /** `"both"` is the shared Hindi and Gujarati page. It is not filed under one doctor hub. */
  doctor: DoctorSlug | "both";
  /** WhatsApp `service` label. Falls back to the slug when omitted. */
  analyticsService?: string;
  title: string;
  shortTitle: string;
  metaDescription: string;
  intro: readonly string[];
  canHelp: readonly string[];
  notFor: readonly string[];
  /** Extra on-page section, used for “while you wait” copy. */
  waitSection?: { heading: string; paragraphs: readonly string[] };
  faqs: readonly InternationalServiceFaq[];
  relatedSlugs: readonly string[];
};

export type InternationalDoctorHub = {
  doctor: DoctorSlug;
  pathSegment: "dr-charmi" | "dr-zalak";
  documentTitlePrimary: string;
  h1: string;
  metaDescription: string;
  intro: readonly string[];
};
