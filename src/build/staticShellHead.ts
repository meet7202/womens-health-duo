/**
 * Build-time HTML `<head>` values for static SPA shells (`dist/.../index.html`).
 * Must not use `@/` path aliases (imported from `vite.config.ts` in Node).
 */
import { DEFAULT_DESCRIPTION, DEFAULT_TITLE } from "../config/site.defaults";
import { ROUTES } from "../config/routes";
import { PRACTICE_BOTH_DOCTORS_IN_PERSON } from "../config/practiceLocations";
import { DOCTOR_BY_SLUG } from "../data/doctorProfiles";
import { CITY_PAGES } from "../data/cityPages";
import { getSeoOnlineServiceBySlug } from "../data/seoOnlineServices";
import { getTopicGuide } from "../data/topicGuides/topicGuideRegistry";
import { homeSectionSeo } from "../lib/homeSectionPaths";
import {
  learnHubFilteredPath,
  learnHubSeoDescription,
  learnHubSeoTitle,
  learnHubSeoH1,
  learnVideoWatchPath,
  parseLearnHubPathname,
  parseLearnVideoWatchId,
  stripTrailingIndexHtmlPath,
  LEARN_HUB_BASE_PATH,
} from "../lib/learnHubUrls";
import { getKnowledgeHubVideoById } from "../data/knowledgeHubVideos";
import {
  EDITORIAL_DOCUMENT_TITLE,
  EDITORIAL_H1,
  FAQ_DOCUMENT_TITLE,
  FAQ_H1,
  HOME_DEFAULT_H1,
  LEARN_ARTICLES_DOCUMENT_TITLE,
  LEARN_ARTICLES_H1,
  MEDICAL_DOCUMENT_TITLE,
  MEDICAL_H1,
  learnWatchDocumentTitle,
  learnWatchH1,
  learnWatchMetaDescription,
  doctorDocumentTitle,
  indiaCityDocumentTitle,
  topicGuideDocumentTitle,
  virtualCityDocumentTitle,
  virtualCityH1,
  virtualCountryDocumentTitle,
  virtualCountryH1,
  virtualHubDocumentTitle,
  virtualHubH1,
  virtualServiceCityDocumentTitle,
  virtualServiceCityH1,
} from "../lib/pageSeoCopy";
import {
  VIRTUAL_CONSULTATION_HUB_PATH,
  getVirtualConsultationCityBySlug,
  getVirtualConsultationCountryByPathSegment,
  virtualCityPathSegment,
  virtualServiceCityPath,
} from "../lib/virtualConsultation";
import { githubPagesAbsoluteUrl } from "../lib/githubPagesPublicUrl";

const VIRTUAL_HUB_DESCRIPTION = `Video visits from India with Dr. Charmi Shah (OB-GYN, IVF, laparoscopy) and Dr. Zalak Shah (women's health physiotherapy, Mat Pilates online, STOTT Pilates on Mat and Reformer). We serve families in India and abroad, pick your city below, then choose the type of care. ${PRACTICE_BOTH_DOCTORS_IN_PERSON} See each doctor's profile for hours and how to book.`;

const FAQ_DESCRIPTION =
  "Frequently asked questions about Women's Health Duo: Dr. Charmi Shah (OB-GYN, IVF, laparoscopy) and Dr. Zalak Shah (women's health physiotherapy, Mat Pilates online, STOTT Pilates), cities served, and online consultations.";

const MEDICAL_DESCRIPTION =
  "Medical disclaimer for Women's Health Duo: education and telehealth consults are not emergency care, not a substitute for in-person evaluation when needed, and not supplement retail.";

const EDITORIAL_DESCRIPTION =
  "How Women's Health Duo publishes Learn hub captions, video selections, and on-site health content, authorship, accuracy intent, and corrections.";

const LEARN_ARTICLES_DESCRIPTION =
  "Browse every written guide on this site: short articles and common questions, grouped by theme, with links to related pages and the Learn video hub.";

function countryVirtualDescription(country: string, cityCount: number) {
  return `Virtual OB-GYN, IVF discussion, laparoscopy consults, women's health physiotherapy, Mat Pilates online, and STOTT Pilates (Mat & Reformer) for patients in ${country}. ${cityCount} city overviews link to each type of online visit, book via WhatsApp or email. ${PRACTICE_BOTH_DOCTORS_IN_PERSON}`;
}

function cityVirtualDescription(city: string, country: string) {
  return `Virtual online consultations for patients in ${city}, ${country}: Dr. Charmi Shah (OB-GYN, IVF, laparoscopy) and Dr. Zalak Shah (women's health physiotherapy, Mat Pilates online, STOTT Pilates Mat & Reformer). ${PRACTICE_BOTH_DOCTORS_IN_PERSON} Book via WhatsApp or email.`;
}

function serviceVirtualMetaDescription(
  serviceTitle: string,
  city: string,
  country: string,
  doctor: "charmi" | "zalak",
) {
  const who =
    doctor === "charmi"
      ? "Dr. Charmi Shah (OB-GYN, IVF, laparoscopy)"
      : "Dr. Zalak Shah (women's health physiotherapy, Mat Pilates online, STOTT Pilates)";
  return `${serviceTitle} via online consultation for patients in ${city}, ${country} with ${who}. ${PRACTICE_BOTH_DOCTORS_IN_PERSON} WhatsApp or email to book.`;
}

function normalizePathname(pathname: string): string {
  const p = stripTrailingIndexHtmlPath(pathname).replace(/\/+$/, "") || "/";
  return p;
}

function canonicalHrefForPath(siteUrl: string, pathname: string): string {
  return githubPagesAbsoluteUrl(siteUrl, normalizePathname(pathname));
}

function escapeAttr(text: string): string {
  return text.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");
}

function escapeTitleText(text: string): string {
  return text.replace(/&/g, "&amp;").replace(/</g, "&lt;");
}

export type ShellPageMeta = {
  canonicalHref: string;
  title: string;
  h1: string;
  metaDescription: string;
};

export function resolveShellPageMeta(siteUrl: string, pathname: string): ShellPageMeta {
  const path = normalizePathname(pathname);
  const canonicalHref = canonicalHrefForPath(siteUrl, path);

  const sectionSeo = homeSectionSeo(path);
  if (sectionSeo) {
    return {
      canonicalHref: canonicalHrefForPath(siteUrl, sectionSeo.canonicalPath),
      title: sectionSeo.title,
      h1: sectionSeo.title,
      metaDescription: sectionSeo.metaDescription,
    };
  }

  if (path === ROUTES.home) {
    return {
      canonicalHref,
      title: DEFAULT_TITLE,
      h1: HOME_DEFAULT_H1,
      metaDescription: DEFAULT_DESCRIPTION,
    };
  }

  if (path === ROUTES.faq) {
    return {
      canonicalHref,
      title: FAQ_DOCUMENT_TITLE,
      h1: FAQ_H1,
      metaDescription: FAQ_DESCRIPTION,
    };
  }
  if (path === ROUTES.medicalDisclaimer) {
    return {
      canonicalHref,
      title: MEDICAL_DOCUMENT_TITLE,
      h1: MEDICAL_H1,
      metaDescription: MEDICAL_DESCRIPTION,
    };
  }
  if (path === ROUTES.editorialPolicy) {
    return {
      canonicalHref,
      title: EDITORIAL_DOCUMENT_TITLE,
      h1: EDITORIAL_H1,
      metaDescription: EDITORIAL_DESCRIPTION,
    };
  }
  if (path === ROUTES.learnArticles) {
    return {
      canonicalHref,
      title: LEARN_ARTICLES_DOCUMENT_TITLE,
      h1: LEARN_ARTICLES_H1,
      metaDescription: LEARN_ARTICLES_DESCRIPTION,
    };
  }

  if (path === VIRTUAL_CONSULTATION_HUB_PATH) {
    return {
      canonicalHref,
      title: virtualHubDocumentTitle(),
      h1: virtualHubH1(),
      metaDescription: VIRTUAL_HUB_DESCRIPTION,
    };
  }

  const segs = path.split("/").filter(Boolean);
  if (segs[0] === "online-consultation" && segs[1] === "country" && segs[2]) {
    const row = getVirtualConsultationCountryByPathSegment(segs[2]);
    if (row) {
      return {
        canonicalHref,
        title: virtualCountryDocumentTitle(row.country),
        h1: virtualCountryH1(row.country),
        metaDescription: countryVirtualDescription(row.country, row.cities.length),
      };
    }
  }

  if (segs[0] === "online-consultation" && segs.length === 3 && segs[1] !== "country") {
    const city = getVirtualConsultationCityBySlug(segs[1]);
    const service = getSeoOnlineServiceBySlug(segs[2]);
    if (city && service && segs[1].toLowerCase() === virtualCityPathSegment(city)) {
      const p = virtualServiceCityPath(city, service.slug);
      return {
        canonicalHref: canonicalHrefForPath(siteUrl, p),
        title: virtualServiceCityDocumentTitle(service.shortTitle, city.city, city.country),
        h1: virtualServiceCityH1(service.title, city.city, city.country),
        metaDescription: serviceVirtualMetaDescription(
          service.title,
          city.city,
          city.country,
          service.doctor,
        ),
      };
    }
  }

  if (segs[0] === "online-consultation" && segs.length === 2) {
    const city = getVirtualConsultationCityBySlug(segs[1]);
    if (city && segs[1].toLowerCase() === virtualCityPathSegment(city)) {
      const p = `${VIRTUAL_CONSULTATION_HUB_PATH}/${virtualCityPathSegment(city)}`;
      return {
        canonicalHref: canonicalHrefForPath(siteUrl, p),
        title: virtualCityDocumentTitle(city.city, city.country),
        h1: virtualCityH1(city.city, city.country),
        metaDescription: cityVirtualDescription(city.city, city.country),
      };
    }
  }

  if (path === LEARN_HUB_BASE_PATH || path.startsWith(`${LEARN_HUB_BASE_PATH}/`)) {
    const watchId = parseLearnVideoWatchId(path);
    if (watchId) {
      const video = getKnowledgeHubVideoById(watchId);
      if (video) {
        const watchPath = learnVideoWatchPath(video.id);
        return {
          canonicalHref: canonicalHrefForPath(siteUrl, watchPath),
          title: learnWatchDocumentTitle(video),
          h1: learnWatchH1(video),
          metaDescription: learnWatchMetaDescription(video),
        };
      }
    }
    const parsed = parseLearnHubPathname(path);
    const canonicalPath = learnHubFilteredPath(parsed);
    return {
      canonicalHref: canonicalHrefForPath(siteUrl, canonicalPath),
      title: learnHubSeoTitle(parsed),
      h1: learnHubSeoH1(parsed),
      metaDescription: learnHubSeoDescription(parsed),
    };
  }

  for (const city of Object.values(CITY_PAGES)) {
    if (city.path === path) {
      const cityLabel =
        city.key === "ahmedabad"
          ? "Ahmedabad"
          : city.key === "mumbai"
            ? "Mumbai"
            : city.key === "valsad"
              ? "Valsad"
              : "Bangalore";
      return {
        canonicalHref,
        title: indiaCityDocumentTitle(cityLabel),
        h1: city.h1,
        metaDescription: city.metaDescription,
      };
    }
  }

  for (const d of Object.values(DOCTOR_BY_SLUG)) {
    if (d.path === path) {
      const specialty =
        d.slug === "charmi" ? "OB-GYN, IVF & laparoscopy" : "Women's health physio & Pilates";
      return {
        canonicalHref,
        title: doctorDocumentTitle(d.name, specialty),
        h1: d.name,
        metaDescription: d.metaDescription,
      };
    }
  }

  if (segs.length === 1) {
    const slug = segs[0]!;
    const guide = getTopicGuide(slug);
    if (guide) {
      return {
        canonicalHref: canonicalHrefForPath(siteUrl, guide.path),
        title: topicGuideDocumentTitle(guide.title),
        h1: guide.title,
        metaDescription: guide.metaDescription,
      };
    }
  }

  return {
    canonicalHref,
    title: DEFAULT_TITLE,
    h1: HOME_DEFAULT_H1,
    metaDescription: DEFAULT_DESCRIPTION,
  };
}

const PAGE_PLACEHOLDER_KEYS = [
  "@@PAGE_CANONICAL@@",
  "@@PAGE_TITLE@@",
  "@@PAGE_META_DESCRIPTION@@",
  "@@PAGE_OG_URL@@",
  "@@PAGE_OG_TITLE@@",
  "@@PAGE_OG_DESCRIPTION@@",
  "@@PAGE_TW_TITLE@@",
  "@@PAGE_TW_DESCRIPTION@@",
  "@@PAGE_STATIC_FALLBACK@@",
] as const;

function escapeHtmlPcdata(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function shellAbsoluteHref(siteUrl: string, path: string): string {
  const p = path === "/" ? "/" : path.startsWith("/") ? path : `/${path}`;
  return githubPagesAbsoluteUrl(siteUrl, p);
}

const STATIC_SEO_SHELL_STYLES =
  "position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0";

/**
 * Crawlable HTML for this route: visible H1 outside `<noscript>` (removed when React mounts)
 * plus a fuller `<noscript>` fallback for users without JavaScript.
 */
export function buildStaticShellBodyFallback(meta: ShellPageMeta, siteUrl: string): string {
  const h1 = escapeHtmlPcdata(meta.h1);
  const lead = escapeHtmlPcdata(meta.metaDescription);
  const nav: [string, string][] = [
    ["/", "Home"],
    [ROUTES.learn, "Learn"],
    [ROUTES.faq, "FAQ"],
    [ROUTES.onlineConsultation, "Online consultations"],
    ["/llms.txt", "Assistant overview (llms.txt)"],
  ];
  const links = nav
    .map(
      ([path, label]) =>
        `<a href="${escapeAttr(shellAbsoluteHref(siteUrl, path))}">${escapeHtmlPcdata(label)}</a>`,
    )
    .join(" · ");

  const crawlableMain = `<main id="static-seo-shell" style="${STATIC_SEO_SHELL_STYLES}">
    <h1>${h1}</h1>
    <p>${lead}</p>
  </main>`;

  const noscriptMain = `<noscript>
  <main style="max-width:40rem;margin:1.5rem auto;padding:0 1rem;font-family:system-ui,sans-serif;line-height:1.5;color:#111">
    <h1 style="font-size:1.35rem;font-weight:600">${h1}</h1>
    <p>${lead}</p>
    <p>${links}</p>
    <p style="font-size:0.9rem;color:#444">Additional pages load in the browser when JavaScript is enabled.</p>
  </main>
</noscript>`;

  return crawlableMain + noscriptMain;
}

export function assertShellPagePlaceholdersPresent(html: string) {
  for (const k of PAGE_PLACEHOLDER_KEYS) {
    if (!html.includes(k)) {
      throw new Error(`static SPA shell template missing placeholder ${k}`);
    }
  }
}

export function applyShellPageMetaToHtml(
  html: string,
  meta: ShellPageMeta,
  siteUrl: string,
): string {
  const titleEsc = escapeTitleText(meta.title);
  const titleAttrEsc = escapeAttr(meta.title);
  const descEsc = escapeAttr(meta.metaDescription);
  const canonEsc = escapeAttr(meta.canonicalHref);
  const pairs: [string, string][] = [
    ["@@PAGE_CANONICAL@@", canonEsc],
    ["@@PAGE_TITLE@@", titleEsc],
    ["@@PAGE_META_DESCRIPTION@@", descEsc],
    ["@@PAGE_OG_URL@@", canonEsc],
    ["@@PAGE_OG_TITLE@@", titleAttrEsc],
    ["@@PAGE_OG_DESCRIPTION@@", descEsc],
    ["@@PAGE_TW_TITLE@@", titleAttrEsc],
    ["@@PAGE_TW_DESCRIPTION@@", descEsc],
    ["@@PAGE_STATIC_FALLBACK@@", buildStaticShellBodyFallback(meta, siteUrl)],
  ];
  let out = html;
  for (const [needle, val] of pairs) {
    out = out.split(needle).join(val);
  }
  return out;
}
