/**
 * Shared document titles and on-page H1 strings for static shells and React pages.
 * Must not use `@/` imports (imported from `staticShellHead.ts` in Node).
 */
import { DOCUMENT_TITLE_MAX_LEN, formatDocumentTitle } from "./seoTitle";
import { capMetaDescription, LEARN_WATCH_META_FALLBACK } from "./seoDescription";
import type { LearnHubParsed } from "./learnHubUrls";
import {
  knowledgeHubVideoCaptionForSeo,
  knowledgeHubVideoDisplayTitle,
  type KnowledgeHubVideo,
} from "../data/knowledgeHubVideos";

/** Homepage hero H1 when `/` has no section permalink. */
export const HOME_DEFAULT_H1 = "Comprehensive Women's Health Care";

export const HOME_DEFAULT_H1_SUBTITLE =
  "Hormonal Health · Fertility · Pregnancy · Postpartum · Pelvic Health · Physiotherapy";

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

/**
 * City × service titles: emphasize online consultation/advice (not in-city surgery).
 * Keep city identity early so long country names do not erase the location (SEO-05).
 */
export function virtualServiceCityDocumentTitle(
  serviceShort: string,
  city: string,
  country: string,
): string {
  const topic = serviceShort.trim();
  const withCountry = formatDocumentTitle(`Online advice: ${topic} — ${city}, ${country}`);
  if (withCountry.length <= DOCUMENT_TITLE_MAX_LEN) return withCountry;
  const cityOnly = formatDocumentTitle(`Online advice: ${topic} — ${city}`);
  if (cityOnly.length <= DOCUMENT_TITLE_MAX_LEN) return cityOnly;
  return formatDocumentTitle(`${topic} online — ${city}`);
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
    return formatDocumentTitle(`${parsed.topic} videos`);
  }
  return formatDocumentTitle(`${parsed.topic} videos · ${learnDoctorLabel(parsed.doctor)}`);
}

export function learnHubH1(parsed: LearnHubParsed): string {
  if (parsed.doctor === "all" && parsed.topic === "all") {
    return "Women's health and pregnancy videos";
  }
  if (parsed.doctor !== "all" && parsed.topic === "all") {
    return `${learnDoctorLabel(parsed.doctor)} health clips`;
  }
  if (parsed.doctor === "all" && parsed.topic !== "all") {
    return `${parsed.topic} videos`;
  }
  return `${parsed.topic} videos with ${learnDoctorLabel(parsed.doctor)}`;
}

/** Emoji and skin-tone / variation modifiers from Instagram captions read as noise in titles. */
function stripEmoji(text: string): string {
  return text
    .replace(/\p{Extended_Pictographic}/gu, "")
    .replace(/[\u{1F3FB}-\u{1F3FF}]/gu, "")
    .replace(/\u{FE0F}|\u{200D}/gu, "")
    .replace(/\s+/g, " ")
    .replace(/^[\s\p{P}]+(?=\p{L})/u, "")
    .trim();
}

function watchTitleBase(video: KnowledgeHubVideo): string {
  const raw = knowledgeHubVideoDisplayTitle(video);
  return stripEmoji(raw) || raw;
}

export function learnWatchDocumentTitle(video: KnowledgeHubVideo): string {
  const base = watchTitleBase(video);
  if (video.kind === "instagram_post") {
    const suffix = video.instagramPostType === "carousel" ? "Instagram carousel" : "Instagram post";
    return formatDocumentTitle(`${base} — ${suffix}`);
  }
  return formatDocumentTitle(base);
}

export function learnWatchH1(video: KnowledgeHubVideo): string {
  if (video.kind === "instagram_post") {
    const base = watchTitleBase(video);
    const suffix = video.instagramPostType === "carousel" ? "Instagram carousel" : "Instagram post";
    return `${base} — ${suffix}`;
  }
  return watchTitleBase(video);
}

export function learnWatchMetaDescription(video: KnowledgeHubVideo): string {
  const caption = knowledgeHubVideoCaptionForSeo(video).replace(/\s+/g, " ").trim();
  const prefix =
    video.kind === "instagram_post"
      ? video.instagramPostType === "carousel"
        ? "Carousel from @womenshealthduo on Instagram. "
        : "Post from @womenshealthduo on Instagram. "
      : "";
  return capMetaDescription(prefix + caption, { fallback: LEARN_WATCH_META_FALLBACK });
}

export function topicGuideDocumentTitle(guideTitle: string): string {
  const branded = formatDocumentTitle(guideTitle);
  if (!branded.includes("…")) return branded;
  // A complete question reads better in results than a truncated one with the brand suffix.
  const plain = guideTitle.trim();
  return plain.length <= DOCUMENT_TITLE_MAX_LEN ? plain : branded;
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

/** India in-person city landings — emphasize who actually practices there (SEO-05). */
export function indiaCityDocumentTitle(
  cityKey: "ahmedabad" | "mumbai" | "valsad" | "bangalore" | string,
): string {
  switch (cityKey) {
    case "bangalore":
      return formatDocumentTitle("Women's Physio & Pilates in Bangalore");
    case "mumbai":
      return formatDocumentTitle("Gynecologist & IVF in Mumbai");
    case "valsad":
      return formatDocumentTitle("Gynecologist in Valsad: Dr. Charmi Shah");
    case "ahmedabad":
      return formatDocumentTitle("Ahmedabad OB-GYN, Physio & Pilates");
    default:
      return formatDocumentTitle(`${cityKey} women's health care`);
  }
}

/** Short specialty for profile titles; name + specialty must fit before the brand suffix (39 chars). */
export function doctorTitleSpecialty(slug: "charmi" | "zalak"): string {
  return slug === "charmi" ? "Gynecologist & IVF" : "Physio & Pilates";
}

export function doctorDocumentTitle(name: string, specialty: string): string {
  return formatDocumentTitle(`${name}: ${specialty}`);
}
