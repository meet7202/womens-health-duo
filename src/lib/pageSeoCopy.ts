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

export function virtualServiceCityDocumentTitle(
  serviceShort: string,
  city: string,
  country: string,
): string {
  const withCountry = formatDocumentTitle(`${serviceShort} online, ${city}, ${country}`);
  if (withCountry.length <= DOCUMENT_TITLE_MAX_LEN) return withCountry;
  return formatDocumentTitle(`${serviceShort} online, ${city}`);
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
  return formatDocumentTitle(knowledgeHubVideoDisplayTitle(video));
}

export function learnWatchH1(video: KnowledgeHubVideo): string {
  return knowledgeHubVideoDisplayTitle(video);
}

export function learnWatchMetaDescription(video: KnowledgeHubVideo): string {
  const text = knowledgeHubVideoCaptionForSeo(video).replace(/\s+/g, " ").trim();
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

export const LEARN_ARTICLES_DOCUMENT_TITLE = formatDocumentTitle("Articles & common questions");
export const LEARN_ARTICLES_H1 = "Articles and common questions";

export function indiaCityDocumentTitle(cityName: string): string {
  return formatDocumentTitle(`${cityName} OB-GYN, IVF & physio`);
}

export function doctorDocumentTitle(name: string, specialty: string): string {
  return formatDocumentTitle(`${name} – ${specialty}`);
}
