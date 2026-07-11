/**
 * Shared document titles and on-page H1 strings for static shells and React pages.
 * Must not use `@/` imports (imported from `staticShellHead.ts` in Node).
 */
import { DOCUMENT_TITLE_MAX_LEN, formatDocumentTitle } from "./seoTitle";
import type { LearnHubParsed } from "./learnHubUrls";
import {
  knowledgeHubVideoCaptionForSeo,
  knowledgeHubVideoDisplayTitle,
  type KnowledgeHubVideo,
} from "../data/knowledgeHubVideos";

/** Homepage hero H1 when `/` has no section permalink. */
export const HOME_DEFAULT_H1 =
  "Women's Hormonal Health, Menstrual Health, Fertility & STOTT Pilates";

export function homeSectionDocumentTitle(label: string): string {
  return formatDocumentTitle(label);
}

export function virtualHubDocumentTitle(): string {
  return formatDocumentTitle("Online OB-GYN & physio worldwide");
}

export function virtualHubH1(): string {
  return "Virtual online consultations";
}

export function virtualCountryDocumentTitle(country: string): string {
  return formatDocumentTitle(`Online care in ${country}`);
}

export function virtualCountryH1(country: string): string {
  return `Women's Health Duo – virtual care for patients in ${country}`;
}

export function virtualCityDocumentTitle(city: string, country: string): string {
  const withCountry = formatDocumentTitle(`Online care in ${city}, ${country}`);
  if (withCountry.length <= DOCUMENT_TITLE_MAX_LEN) return withCountry;
  return formatDocumentTitle(`Online care in ${city}`);
}

export function virtualCityH1(city: string, country: string): string {
  return `Women's Health Duo – online care for patients in ${city}, ${country}`;
}

/** Append " online" for SERP titles unless the label already mentions online. */
function seoLabelWithOnlineSuffix(label: string): string {
  const trimmed = label.trim();
  if (/\bonline\b/i.test(trimmed)) return trimmed;
  return `${trimmed} online`;
}

export function virtualServiceCityDocumentTitle(
  serviceShort: string,
  city: string,
  country: string,
): string {
  const service = seoLabelWithOnlineSuffix(serviceShort);
  const withCountry = formatDocumentTitle(`${service}, ${city}, ${country}`);
  if (withCountry.length <= DOCUMENT_TITLE_MAX_LEN) return withCountry;
  return formatDocumentTitle(`${service}, ${city}`);
}

export function virtualServiceCityH1(serviceTitle: string, city: string, country: string): string {
  return `${serviceTitle} – online consultation for patients in ${city}, ${country}`;
}

function learnDoctorLabel(d: LearnHubParsed["doctor"]): string {
  if (d === "charmi") return "Dr. Charmi";
  if (d === "zalak") return "Dr. Zalak";
  return "All doctors";
}

export function learnHubDocumentTitle(parsed: LearnHubParsed): string {
  if (parsed.doctor === "all" && parsed.topic === "all") {
    return formatDocumentTitle("Women's health videos");
  }
  if (parsed.doctor !== "all" && parsed.topic === "all") {
    return formatDocumentTitle(`${learnDoctorLabel(parsed.doctor)} clips`);
  }
  if (parsed.doctor === "all" && parsed.topic !== "all") {
    return formatDocumentTitle(parsed.topic);
  }
  return formatDocumentTitle(`${learnDoctorLabel(parsed.doctor)} · ${parsed.topic}`);
}

export function learnHubH1(parsed: LearnHubParsed): string {
  if (parsed.doctor === "all" && parsed.topic === "all") {
    return "Women's health and pregnancy videos";
  }
  if (parsed.doctor !== "all" && parsed.topic === "all") {
    return `${learnDoctorLabel(parsed.doctor)} health clips`;
  }
  if (parsed.doctor === "all" && parsed.topic !== "all") {
    return parsed.topic;
  }
  return `${parsed.topic} – ${learnDoctorLabel(parsed.doctor)}`;
}

export function learnWatchDocumentTitle(video: KnowledgeHubVideo): string {
  const base = knowledgeHubVideoDisplayTitle(video);
  if (video.kind === "instagram_post") {
    const suffix = video.instagramPostType === "carousel" ? "Instagram carousel" : "Instagram post";
    return formatDocumentTitle(`${base} — ${suffix}`);
  }
  return formatDocumentTitle(base);
}

export function learnWatchH1(video: KnowledgeHubVideo): string {
  if (video.kind === "instagram_post") {
    const base = knowledgeHubVideoDisplayTitle(video);
    const suffix = video.instagramPostType === "carousel" ? "Instagram carousel" : "Instagram post";
    return `${base} — ${suffix}`;
  }
  return knowledgeHubVideoDisplayTitle(video);
}

export function learnWatchMetaDescription(video: KnowledgeHubVideo): string {
  const caption = knowledgeHubVideoCaptionForSeo(video).replace(/\s+/g, " ").trim();
  const prefix =
    video.kind === "instagram_post"
      ? video.instagramPostType === "carousel"
        ? "Carousel from @womenshealthduo on Instagram. "
        : "Post from @womenshealthduo on Instagram. "
      : "";
  const text = prefix + caption;
  if (text.length <= 160) return text;
  return `${text.slice(0, 157)}…`;
}

export function topicGuideDocumentTitle(guideTitle: string): string {
  return formatDocumentTitle(guideTitle);
}

export const FAQ_DOCUMENT_TITLE = formatDocumentTitle("FAQ – OB-GYN, IVF & physio");
export const FAQ_H1 = "Frequently asked questions";

export const MEDICAL_DOCUMENT_TITLE = formatDocumentTitle("Medical disclaimer");
export const MEDICAL_H1 = "Medical disclaimer";

export const EDITORIAL_DOCUMENT_TITLE = formatDocumentTitle("Editorial policy");
export const EDITORIAL_H1 = "Editorial policy";

export const TELEMEDICINE_DOCUMENT_TITLE = formatDocumentTitle("Telemedicine policy");
export const TELEMEDICINE_H1 = "Telemedicine policy";

export const PRIVACY_DOCUMENT_TITLE = formatDocumentTitle("Privacy policy");
export const PRIVACY_H1 = "Privacy policy";

export const TERMS_DOCUMENT_TITLE = formatDocumentTitle("Terms of service");
export const TERMS_H1 = "Terms of service";

export const REFUND_DOCUMENT_TITLE = formatDocumentTitle("Refund policy");
export const REFUND_H1 = "Refund & cancellation policy";

export const BOOKING_DOCUMENT_TITLE = formatDocumentTitle("Book teleconsultation");
export const BOOKING_H1 = "Book a teleconsultation";

export const COMMUNITY_DOCUMENT_TITLE = formatDocumentTitle("Free women's health community");
export const COMMUNITY_H1 = "Free women's health community on WhatsApp";

export function internationalConsultationHubDocumentTitle(): string {
  return formatDocumentTitle("International women's health consultation");
}

export function internationalConsultationHubH1(): string {
  return "International consultation & second opinion";
}

export function internationalDoctorHubDocumentTitle(primary: string): string {
  return formatDocumentTitle(primary);
}

export function internationalServiceDocumentTitle(shortTitle: string): string {
  return formatDocumentTitle(seoLabelWithOnlineSuffix(shortTitle));
}

export const LEARN_ARTICLES_DOCUMENT_TITLE = formatDocumentTitle("Articles & common questions");
export const LEARN_ARTICLES_H1 = "Articles and common questions";

export function indiaCityDocumentTitle(cityName: string): string {
  return formatDocumentTitle(`${cityName} OB-GYN, IVF & physio`);
}

export function doctorDocumentTitle(name: string, specialty: string): string {
  return formatDocumentTitle(`${name} – ${specialty}`);
}
