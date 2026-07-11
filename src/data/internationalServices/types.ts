import type { DoctorSlug } from "../doctorProfiles";

export type InternationalServiceFaq = { question: string; answer: string };

export type InternationalService = {
  slug: string;
  doctor: DoctorSlug;
  title: string;
  shortTitle: string;
  metaDescription: string;
  intro: readonly string[];
  canHelp: readonly string[];
  notFor: readonly string[];
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
