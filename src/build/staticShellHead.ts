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
  parseLearnHubPathname,
  stripTrailingIndexHtmlPath,
  LEARN_HUB_BASE_PATH,
} from "../lib/learnHubUrls";
import {
  VIRTUAL_CONSULTATION_HUB_PATH,
  getVirtualConsultationCityBySlug,
  getVirtualConsultationCountryByPathSegment,
  virtualCityPathSegment,
  virtualServiceCityPath,
} from "../lib/virtualConsultation";
import { githubPagesAbsoluteUrl } from "../lib/githubPagesPublicUrl";

const VIRTUAL_HUB_TITLE =
  "Virtual online OB-GYN & women's health physio ,  global cities | Women's Health Duo";
const VIRTUAL_HUB_DESCRIPTION = `Video visits from India with Dr. Charmi Shah (OB-GYN, IVF, laparoscopy) and Dr. Zalak Shah (women's health physiotherapy, Mat Pilates online, STOTT Pilates on Mat and Reformer). We serve families in India and abroad, pick your city below, then choose the type of care. ${PRACTICE_BOTH_DOCTORS_IN_PERSON} See each doctor's profile for hours and how to book.`;

const FAQ_TITLE = "FAQ | Women's Health Duo: OB-GYN, IVF & Women's Health Physio";
const FAQ_DESCRIPTION =
  "Frequently asked questions about Women's Health Duo: Dr. Charmi Shah (OB-GYN, IVF, laparoscopy) and Dr. Zalak Shah (women's health physiotherapy, Mat Pilates online, STOTT Pilates), cities served, and online consultations.";

const MEDICAL_TITLE = "Medical disclaimer | Women's Health Duo";
const MEDICAL_DESCRIPTION =
  "Medical disclaimer for Women's Health Duo: education and telehealth consults are not emergency care, not a substitute for in-person evaluation when needed, and not supplement retail.";

const EDITORIAL_TITLE = "Editorial policy | Women's Health Duo";
const EDITORIAL_DESCRIPTION =
  "How Women's Health Duo publishes Learn hub captions, video selections, and on-site health content, authorship, accuracy intent, and corrections.";

const LEARN_ARTICLES_TITLE = "Articles and common questions | Women's Health Duo Learn";
const LEARN_ARTICLES_DESCRIPTION =
  "Browse every written guide on this site: short articles and common questions, grouped by theme, with links to related pages and the Learn video hub.";

function countryVirtualTitle(country: string) {
  return `Virtual online consultations ,  ${country} | Women's Health Duo`;
}

function countryVirtualDescription(country: string, cityCount: number) {
  return `Virtual OB-GYN, IVF discussion, laparoscopy consults, women's health physiotherapy, Mat Pilates online, and STOTT Pilates (Mat & Reformer) for patients in ${country}. ${cityCount} city overviews link to each type of online visit, book via WhatsApp or email. ${PRACTICE_BOTH_DOCTORS_IN_PERSON}`;
}

function cityVirtualTitle(city: string, country: string) {
  return `Virtual online OB-GYN & women's health physio ,  ${city}, ${country} | Women's Health Duo`;
}

function cityVirtualDescription(city: string, country: string) {
  return `Virtual online consultations for patients in ${city}, ${country}: Dr. Charmi Shah (OB-GYN, IVF, laparoscopy) and Dr. Zalak Shah (women's health physiotherapy, Mat Pilates online, STOTT Pilates Mat & Reformer). ${PRACTICE_BOTH_DOCTORS_IN_PERSON} Book via WhatsApp or email.`;
}

function serviceVirtualMetaTitle(serviceShort: string, city: string, country: string) {
  return `${serviceShort} online ,  ${city}, ${country} | Women's Health Duo`;
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
      metaDescription: sectionSeo.metaDescription,
    };
  }

  if (path === ROUTES.faq) {
    return { canonicalHref, title: FAQ_TITLE, metaDescription: FAQ_DESCRIPTION };
  }
  if (path === ROUTES.medicalDisclaimer) {
    return { canonicalHref, title: MEDICAL_TITLE, metaDescription: MEDICAL_DESCRIPTION };
  }
  if (path === ROUTES.editorialPolicy) {
    return { canonicalHref, title: EDITORIAL_TITLE, metaDescription: EDITORIAL_DESCRIPTION };
  }
  if (path === ROUTES.learnArticles) {
    return {
      canonicalHref,
      title: LEARN_ARTICLES_TITLE,
      metaDescription: LEARN_ARTICLES_DESCRIPTION,
    };
  }

  if (path === VIRTUAL_CONSULTATION_HUB_PATH) {
    return { canonicalHref, title: VIRTUAL_HUB_TITLE, metaDescription: VIRTUAL_HUB_DESCRIPTION };
  }

  const segs = path.split("/").filter(Boolean);
  if (segs[0] === "online-consultation" && segs[1] === "country" && segs[2]) {
    const row = getVirtualConsultationCountryByPathSegment(segs[2]);
    if (row) {
      return {
        canonicalHref,
        title: countryVirtualTitle(row.country),
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
        title: serviceVirtualMetaTitle(service.shortTitle, city.city, city.country),
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
        title: cityVirtualTitle(city.city, city.country),
        metaDescription: cityVirtualDescription(city.city, city.country),
      };
    }
  }

  if (path === LEARN_HUB_BASE_PATH || path.startsWith(`${LEARN_HUB_BASE_PATH}/`)) {
    const parsed = parseLearnHubPathname(path);
    const canonicalPath = learnHubFilteredPath(parsed);
    return {
      canonicalHref: canonicalHrefForPath(siteUrl, canonicalPath),
      title: learnHubSeoTitle(parsed),
      metaDescription: learnHubSeoDescription(parsed),
    };
  }

  for (const city of Object.values(CITY_PAGES)) {
    if (city.path === path) {
      return { canonicalHref, title: city.title, metaDescription: city.metaDescription };
    }
  }

  for (const d of Object.values(DOCTOR_BY_SLUG)) {
    if (d.path === path) {
      return { canonicalHref, title: d.metaTitle, metaDescription: d.metaDescription };
    }
  }

  if (segs.length === 1) {
    const slug = segs[0]!;
    const guide = getTopicGuide(slug);
    if (guide) {
      const docTitle = `${guide.title} | Women's Health Duo`;
      return {
        canonicalHref: canonicalHrefForPath(siteUrl, guide.path),
        title: docTitle,
        metaDescription: guide.metaDescription,
      };
    }
  }

  return { canonicalHref, title: DEFAULT_TITLE, metaDescription: DEFAULT_DESCRIPTION };
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

/**
 * HTML for `<noscript>` so crawlers and assistants that do not execute JavaScript still see
 * this route's title, description, and key navigation (plus llms.txt).
 */
export function buildStaticShellBodyFallback(meta: ShellPageMeta, siteUrl: string): string {
  const h1 = escapeHtmlPcdata(meta.title);
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
  return `<noscript>
  <main style="max-width:40rem;margin:1.5rem auto;padding:0 1rem;font-family:system-ui,sans-serif;line-height:1.5;color:#111">
    <h1 style="font-size:1.35rem;font-weight:600">${h1}</h1>
    <p>${lead}</p>
    <p>${links}</p>
    <p style="font-size:0.9rem;color:#444">Additional pages load in the browser when JavaScript is enabled.</p>
  </main>
</noscript>`;
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
