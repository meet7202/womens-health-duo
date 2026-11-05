/**
 * Build-time HTML `<head>` values for static SPA shells (`dist/.../index.html`).
 * Must not use `@/` path aliases (imported from `vite.config.ts` in Node).
 */
import {
  DEFAULT_DESCRIPTION,
  DEFAULT_OG_IMAGE_ALT,
  DEFAULT_TITLE,
  OG_IMAGE_PATH,
} from "../config/site.defaults";
import { ROUTES } from "../config/routes";
import {
  ROBOTS_INDEX_FOLLOW,
  ROBOTS_NOINDEX_FOLLOW,
  ROBOTS_NOINDEX_NOFOLLOW,
  resolveRouteDisposition,
} from "../config/routeDisposition";
import { PRACTICE_BOTH_DOCTORS_IN_PERSON } from "../config/practiceLocations";
import { DOCTOR_BY_SLUG } from "../data/doctorProfiles";
import { CITY_PAGES } from "../data/cityPages";
import { getSeoOnlineServiceBySlug } from "../data/seoOnlineServices";
import { getTopicGuide } from "../data/topicGuides/topicGuideRegistry";
import {
  getInternationalDoctorHub,
  getInternationalService,
  INTERNATIONAL_CONSULTATION_BASE,
} from "../data/internationalServices/internationalServiceRegistry";
import { INTERNATIONAL_HUB } from "../data/internationalServices/hubContent";
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
import { isIndexableKnowledgeHubWatchPage } from "../lib/knowledgeHubVideoEligibility";
import { ZALAK_GROUP_CLASS_CONTENT } from "../data/zalakGroupClasses";
import { formatDocumentTitle } from "../lib/seoTitle";
import {
  EDITORIAL_DOCUMENT_TITLE,
  EDITORIAL_H1,
  FAQ_DOCUMENT_TITLE,
  FAQ_H1,
  BOOKING_DOCUMENT_TITLE,
  BOOKING_H1,
  COMMUNITY_DOCUMENT_TITLE,
  COMMUNITY_H1,
  internationalConsultationHubDocumentTitle,
  internationalConsultationHubH1,
  internationalDoctorHubDocumentTitle,
  internationalServiceDocumentTitle,
  PRIVACY_DOCUMENT_TITLE,
  PRIVACY_H1,
  REFUND_DOCUMENT_TITLE,
  REFUND_H1,
  TELEMEDICINE_DOCUMENT_TITLE,
  TELEMEDICINE_H1,
  TERMS_DOCUMENT_TITLE,
  TERMS_H1,
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
  resolveLegacyGlobalOnlineSlug,
  virtualCityPathSegment,
  virtualConsultationCityPath,
  virtualServiceCityPath,
} from "../lib/virtualConsultation";
import { githubPagesAbsoluteUrl } from "../lib/githubPagesPublicUrl";
import { knowledgeHubPosterAlt, knowledgeHubVideoThumbnailAbsolute } from "../lib/mediaSeo";
import { capMetaDescription } from "../lib/seoDescription";

const VIRTUAL_HUB_DESCRIPTION = `Video visits from India with Dr. Charmi Shah (OB-GYN, IVF, laparoscopy) and Dr. Zalak Shah (women's health physiotherapy, Mat Pilates online, STOTT Pilates on Mat and Reformer). We serve families in India and abroad, pick your city below, then choose the type of care. ${PRACTICE_BOTH_DOCTORS_IN_PERSON} See each doctor's profile for hours and how to book.`;

const FAQ_DESCRIPTION =
  "Frequently asked questions about Women's Health Duo: Dr. Charmi Shah (OB-GYN, IVF, laparoscopy) and Dr. Zalak Shah (women's health physiotherapy, Mat Pilates online, STOTT Pilates), cities served, and online consultations.";

const MEDICAL_DESCRIPTION =
  "Medical disclaimer for Women's Health Duo: education and telehealth consults are not emergency care, not a substitute for in-person evaluation when needed, and not supplement retail.";

const EDITORIAL_DESCRIPTION =
  "How Women's Health Duo publishes Learn hub captions, video selections, and on-site health content, authorship, accuracy intent, and corrections.";

const TELEMEDICINE_DESCRIPTION =
  "Telemedicine policy for Women's Health Duo: how online consultations work, patient and doctor responsibilities, consent, prescriptions, privacy, fees, and emergency care.";

const PRIVACY_DESCRIPTION =
  "Privacy policy for Women's Health Duo: how we handle personal and health information, consultation records, retention, security, and your rights.";

const TERMS_DESCRIPTION =
  "Terms of service for using the Women's Health Duo website and booking teleconsultations.";

const REFUND_DESCRIPTION =
  "Refund and cancellation policy for Women's Health Duo teleconsultations and in-person appointments.";

const BOOKING_DESCRIPTION =
  "Book a teleconsultation with Dr. Charmi Shah (OB-GYN) or Dr. Zalak Shah (women's health physio). Complete patient details, medical history, and mandatory telemedicine consent.";

const COMMUNITY_DESCRIPTION =
  "Join Women's Health Duo's free WhatsApp community: health tips, workshop updates, and supportive conversations on pregnancy, fertility, PCOS, pelvic health, and wellness.";

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

export type ShellOgType = "website" | "video.other";

export type ShellPageMeta = {
  canonicalHref: string;
  title: string;
  h1: string;
  metaDescription: string;
  /**
   * Robots meta content (SEO-02). Defaults to index/follow for known pages;
   * redirect aliases and unknown routes set noindex explicitly.
   */
  robots?: string;
  /** When set, emit a temporary HTML redirect fallback until an edge 301/308 is live. */
  redirectToPath?: string;
  /**
   * Open Graph type (SEO-03 / SEO-21). Defaults to `website`.
   * Learn watch pages use `video.other` for Shorts/Reels; Instagram image/carousel posts stay `website`.
   */
  ogType?: ShellOgType;
  /** Absolute OG/Twitter image URL. Defaults to site `OG_IMAGE_PATH`. */
  ogImage?: string;
  /** `og:image:alt` / `twitter:image:alt`. Defaults to `DEFAULT_OG_IMAGE_ALT`. */
  ogImageAlt?: string;
  /** Extra crawlable body paragraphs under the meta lead (SEO-10). */
  shellExtraParagraphs?: string[];
  /** Extra in-shell links (site paths); merged with primary nav (SEO-10). */
  shellExtraLinks?: { path: string; label: string }[];
};

function defaultShellOgImage(siteUrl: string): string {
  return githubPagesAbsoluteUrl(siteUrl, OG_IMAGE_PATH);
}

function resolveShellOgFields(
  meta: ShellPageMeta,
  siteUrl: string,
): { ogType: ShellOgType; ogImage: string; ogImageAlt: string } {
  return {
    ogType: meta.ogType ?? "website",
    ogImage: meta.ogImage ?? defaultShellOgImage(siteUrl),
    ogImageAlt: meta.ogImageAlt ?? DEFAULT_OG_IMAGE_ALT,
  };
}

function resolvedRobots(meta: ShellPageMeta): string {
  if (meta.robots) return meta.robots;
  if (meta.redirectToPath) return ROBOTS_NOINDEX_FOLLOW;
  return ROBOTS_INDEX_FOLLOW;
}

/** Distinct not-found shell identity — never reuse homepage title/H1 (SEO-02 / SEO-07). */
export function notFoundShellMeta(siteUrl: string, pathname: string): ShellPageMeta {
  return {
    canonicalHref: canonicalHrefForPath(siteUrl, pathname),
    title: "Page not found | Women's Health Duo",
    h1: "Page not found",
    metaDescription:
      "This URL is not a published Women's Health Duo page. Return home or book a consult via the practice WhatsApp number.",
    robots: ROBOTS_NOINDEX_NOFOLLOW,
  };
}

const ZALAK_CLASS_BY_PATH = new Map(
  Object.values(ZALAK_GROUP_CLASS_CONTENT).map((c) => [c.path, c] as const),
);

const ZALAK_CLASS_NESTED_ALIAS_TO_CANONICAL: Record<string, string> = {
  [ROUTES.zalakPrenatalClasses]: ROUTES.prenatal,
  [ROUTES.zalakPostnatalClasses]: ROUTES.postnatal,
  [ROUTES.zalakPilatesClasses]: ROUTES.pilates,
};

function zalakClassShellMeta(siteUrl: string, classPath: string): ShellPageMeta | null {
  const content = ZALAK_CLASS_BY_PATH.get(classPath);
  if (!content) return null;
  return {
    canonicalHref: canonicalHrefForPath(siteUrl, content.path),
    title: formatDocumentTitle(content.title),
    h1: content.title,
    metaDescription: content.metaDescription,
    shellExtraParagraphs: [content.intro],
    shellExtraLinks: [
      { path: ROUTES.bookConsultation, label: "Book a consultation" },
      { path: ROUTES.drZalak, label: "Dr. Zalak Shah profile" },
      ...content.relatedLinks.slice(0, 3).map((l) => ({ path: l.path, label: l.label })),
    ],
  };
}

export function resolveShellPageMeta(siteUrl: string, pathname: string): ShellPageMeta {
  const path = normalizePathname(pathname);
  const canonicalHref = canonicalHrefForPath(siteUrl, path);

  const sectionSeo = homeSectionSeo(path);
  if (sectionSeo) {
    return {
      canonicalHref: canonicalHrefForPath(siteUrl, sectionSeo.canonicalPath),
      title: sectionSeo.title,
      h1: sectionSeo.h1,
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
  if (path === ROUTES.telemedicinePolicy) {
    return {
      canonicalHref,
      title: TELEMEDICINE_DOCUMENT_TITLE,
      h1: TELEMEDICINE_H1,
      metaDescription: TELEMEDICINE_DESCRIPTION,
    };
  }
  if (path === ROUTES.privacyPolicy) {
    return {
      canonicalHref,
      title: PRIVACY_DOCUMENT_TITLE,
      h1: PRIVACY_H1,
      metaDescription: PRIVACY_DESCRIPTION,
    };
  }
  if (path === ROUTES.termsOfService) {
    return {
      canonicalHref,
      title: TERMS_DOCUMENT_TITLE,
      h1: TERMS_H1,
      metaDescription: TERMS_DESCRIPTION,
    };
  }
  if (path === ROUTES.refundPolicy) {
    return {
      canonicalHref,
      title: REFUND_DOCUMENT_TITLE,
      h1: REFUND_H1,
      metaDescription: REFUND_DESCRIPTION,
    };
  }
  if (path === ROUTES.bookConsultation) {
    return {
      canonicalHref,
      title: BOOKING_DOCUMENT_TITLE,
      h1: BOOKING_H1,
      metaDescription: BOOKING_DESCRIPTION,
    };
  }
  if (path === ROUTES.freeWomensHealthCommunity) {
    return {
      canonicalHref,
      title: COMMUNITY_DOCUMENT_TITLE,
      h1: COMMUNITY_H1,
      metaDescription: COMMUNITY_DESCRIPTION,
    };
  }
  if (path === ROUTES.internationalConsultation) {
    return {
      canonicalHref,
      title: internationalConsultationHubDocumentTitle(),
      h1: internationalConsultationHubH1(),
      metaDescription: INTERNATIONAL_HUB.metaDescription,
    };
  }
  if (path.startsWith(`${INTERNATIONAL_CONSULTATION_BASE}/`)) {
    const segment = path.slice(INTERNATIONAL_CONSULTATION_BASE.length + 1);
    const doctorHub = getInternationalDoctorHub(segment);
    if (doctorHub) {
      return {
        canonicalHref: canonicalHrefForPath(siteUrl, path),
        title: internationalDoctorHubDocumentTitle(doctorHub.documentTitlePrimary),
        h1: doctorHub.h1,
        metaDescription: doctorHub.metaDescription,
      };
    }
    const service = getInternationalService(segment);
    if (service) {
      return {
        canonicalHref: canonicalHrefForPath(siteUrl, path),
        title: internationalServiceDocumentTitle(service.shortTitle),
        h1: service.title,
        metaDescription: service.metaDescription,
      };
    }
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
        const isAlias = watchId !== video.id;
        const indexable = isIndexableKnowledgeHubWatchPage(video);
        const posterAbs = knowledgeHubVideoThumbnailAbsolute(siteUrl, video);
        // Parity with LearnWatchPage SeoHead: video.other for Shorts/Reels; website for posts.
        const ogType: ShellOgType = video.kind === "instagram_post" ? "website" : "video.other";
        return {
          canonicalHref: canonicalHrefForPath(siteUrl, watchPath),
          title: learnWatchDocumentTitle(video),
          h1: learnWatchH1(video),
          metaDescription: learnWatchMetaDescription(video),
          ogType,
          ...(posterAbs
            ? { ogImage: posterAbs, ogImageAlt: knowledgeHubPosterAlt(video) }
            : { ogImageAlt: knowledgeHubPosterAlt(video) }),
          ...(isAlias
            ? { redirectToPath: watchPath, robots: ROBOTS_NOINDEX_FOLLOW }
            : indexable
              ? {}
              : { robots: ROBOTS_NOINDEX_FOLLOW }),
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
      return {
        canonicalHref,
        title: indiaCityDocumentTitle(city.key),
        h1: city.h1,
        metaDescription: city.metaDescription,
      };
    }
  }

  for (const d of Object.values(DOCTOR_BY_SLUG)) {
    if (d.path === path) {
      const specialty =
        d.slug === "charmi" ? "OB-GYN, IVF & laparoscopy" : "Women's health physio & Pilates";
      const blurb = d.overview[0]?.trim();
      return {
        canonicalHref,
        title: doctorDocumentTitle(d.name, specialty),
        h1: d.name,
        metaDescription: d.metaDescription,
        ...(blurb ? { shellExtraParagraphs: [blurb] } : {}),
        shellExtraLinks: [
          { path: ROUTES.bookConsultation, label: "Book a consultation" },
          { path: ROUTES.onlineConsultation, label: "Online consultations" },
        ],
      };
    }
  }

  const classMeta = zalakClassShellMeta(siteUrl, path);
  if (classMeta) return classMeta;

  const aliasDisposition = resolveRouteDisposition(path);
  if (aliasDisposition.kind === "redirect") {
    const target = zalakClassShellMeta(siteUrl, aliasDisposition.targetPath);
    if (target) {
      return {
        ...target,
        redirectToPath: aliasDisposition.targetPath,
        robots: ROBOTS_NOINDEX_FOLLOW,
      };
    }
  } else {
    const nestedClassCanonical = ZALAK_CLASS_NESTED_ALIAS_TO_CANONICAL[path];
    if (nestedClassCanonical) {
      const target = zalakClassShellMeta(siteUrl, nestedClassCanonical);
      if (target) {
        return {
          ...target,
          redirectToPath: nestedClassCanonical,
          robots: ROBOTS_NOINDEX_FOLLOW,
        };
      }
    }
  }

  if (segs.length === 1) {
    const slug = segs[0]!;
    const guide = getTopicGuide(slug);
    if (guide) {
      const intro = guide.introParagraph?.trim();
      return {
        canonicalHref: canonicalHrefForPath(siteUrl, guide.path),
        title: topicGuideDocumentTitle(guide.title),
        h1: guide.title,
        metaDescription: guide.metaDescription,
        ...(intro ? { shellExtraParagraphs: [intro] } : {}),
        shellExtraLinks: [
          { path: ROUTES.bookConsultation, label: "Book a consultation" },
          { path: ROUTES.learn, label: "Learn hub" },
          { path: ROUTES.learnArticles, label: "Articles and common questions" },
        ],
      };
    }
  }

  // Legacy `/global-online` → `/online-consultation` (SEO-07); shells stay noindex until edge 301.
  if (path === ROUTES.globalOnline || path.startsWith(`${ROUTES.globalOnline}/`)) {
    let target: string = VIRTUAL_CONSULTATION_HUB_PATH;
    if (segs.length === 2) {
      const mapped = resolveLegacyGlobalOnlineSlug(segs[1]);
      const city = mapped ? getVirtualConsultationCityBySlug(mapped) : undefined;
      if (city) target = virtualConsultationCityPath(city);
    }
    const targetMeta = resolveShellPageMeta(siteUrl, target);
    return {
      ...targetMeta,
      redirectToPath: target,
      robots: ROBOTS_NOINDEX_FOLLOW,
    };
  }

  // Unknown path: do not inherit homepage identity (SEO-02).
  return notFoundShellMeta(siteUrl, path);
}

const PAGE_PLACEHOLDER_KEYS = [
  "@@PAGE_CANONICAL@@",
  "@@PAGE_TITLE@@",
  "@@PAGE_META_DESCRIPTION@@",
  "@@PAGE_ROBOTS@@",
  "@@PAGE_OG_URL@@",
  "@@PAGE_OG_TYPE@@",
  "@@PAGE_OG_TITLE@@",
  "@@PAGE_OG_DESCRIPTION@@",
  "@@PAGE_OG_IMAGE@@",
  "@@PAGE_OG_IMAGE_ALT@@",
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

/** Visible crawlable shell (SEO-10) — not clipped; removed after React mounts a live H1. */
const STATIC_SEO_SHELL_STYLES =
  "max-width:42rem;margin:1.5rem auto;padding:0 1rem 1.25rem;font-family:system-ui,sans-serif;line-height:1.55;color:#111";

/**
 * Crawlable HTML for this route: one visible H1 in `#static-seo-shell` (removed when React mounts).
 * Enriched with route-specific paragraphs/links when available. Readable without JavaScript.
 */
export function buildStaticShellBodyFallback(meta: ShellPageMeta, siteUrl: string): string {
  const h1 = escapeHtmlPcdata(meta.h1);
  const lead = escapeHtmlPcdata(meta.metaDescription);
  const extras = (meta.shellExtraParagraphs ?? [])
    .map((p) => p.trim())
    .filter(Boolean)
    .map((p) => `<p>${escapeHtmlPcdata(p)}</p>`)
    .join("\n    ");

  const seenPaths = new Set<string>();
  const navEntries: { path: string; label: string }[] = [];
  const pushNav = (path: string, label: string) => {
    const key = path.replace(/\/+$/, "") || "/";
    if (seenPaths.has(key)) return;
    seenPaths.add(key);
    navEntries.push({ path, label });
  };
  pushNav("/", "Home");
  pushNav(ROUTES.learn, "Learn");
  pushNav(ROUTES.faq, "FAQ");
  pushNav(ROUTES.onlineConsultation, "Online consultations");
  pushNav(ROUTES.bookConsultation, "Book consultation");
  for (const link of meta.shellExtraLinks ?? []) {
    pushNav(link.path, link.label);
  }
  pushNav("/llms.txt", "Assistant overview (llms.txt)");

  const links = navEntries
    .map(
      ({ path, label }) =>
        `<a href="${escapeAttr(shellAbsoluteHref(siteUrl, path))}">${escapeHtmlPcdata(label)}</a>`,
    )
    .join(" · ");

  return `<main id="static-seo-shell" style="${STATIC_SEO_SHELL_STYLES}">
    <h1>${h1}</h1>
    <p>${lead}</p>
    ${extras}
    <nav aria-label="Site links">
      <p>${links}</p>
    </nav>
    <p style="font-size:0.9rem;color:#444">This summary is available without JavaScript. The full interactive page loads in the browser.</p>
  </main>`;
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
  const cappedMeta: ShellPageMeta = {
    ...meta,
    metaDescription: capMetaDescription(meta.metaDescription),
    robots: resolvedRobots(meta),
  };
  const titleEsc = escapeTitleText(cappedMeta.title);
  const titleAttrEsc = escapeAttr(cappedMeta.title);
  const descEsc = escapeAttr(cappedMeta.metaDescription);
  const robotsEsc = escapeAttr(resolvedRobots(cappedMeta));
  const canonEsc = escapeAttr(meta.canonicalHref);
  const og = resolveShellOgFields(cappedMeta, siteUrl);
  const ogTypeEsc = escapeAttr(og.ogType);
  const ogImageEsc = escapeAttr(og.ogImage);
  const ogImageAltEsc = escapeAttr(og.ogImageAlt);
  const pairs: [string, string][] = [
    ["@@PAGE_CANONICAL@@", canonEsc],
    ["@@PAGE_TITLE@@", titleEsc],
    ["@@PAGE_META_DESCRIPTION@@", descEsc],
    ["@@PAGE_ROBOTS@@", robotsEsc],
    ["@@PAGE_OG_URL@@", canonEsc],
    ["@@PAGE_OG_TYPE@@", ogTypeEsc],
    ["@@PAGE_OG_TITLE@@", titleAttrEsc],
    ["@@PAGE_OG_DESCRIPTION@@", descEsc],
    ["@@PAGE_OG_IMAGE@@", ogImageEsc],
    ["@@PAGE_OG_IMAGE_ALT@@", ogImageAltEsc],
    ["@@PAGE_TW_TITLE@@", titleAttrEsc],
    ["@@PAGE_TW_DESCRIPTION@@", descEsc],
    ["@@PAGE_STATIC_FALLBACK@@", buildStaticShellBodyFallback(cappedMeta, siteUrl)],
  ];
  let out = html;
  for (const [needle, val] of pairs) {
    out = out.split(needle).join(val);
  }
  if (meta.redirectToPath) {
    const targetAbs = escapeAttr(shellAbsoluteHref(siteUrl, meta.redirectToPath));
    const targetPathEsc = escapeHtmlPcdata(
      meta.redirectToPath.endsWith("/") ? meta.redirectToPath : `${meta.redirectToPath}/`,
    );
    const refresh = `<meta http-equiv="refresh" content="0;url=${targetAbs}">`;
    const linkNotice = `<p data-seo-alias-redirect="1"><a href="${targetAbs}">Continue to ${targetPathEsc}</a></p>`;
    if (out.includes("</head>")) {
      out = out.replace("</head>", `${refresh}\n</head>`);
    }
    if (out.includes("</body>")) {
      out = out.replace("</body>", `${linkNotice}\n</body>`);
    }
  }
  return out;
}
