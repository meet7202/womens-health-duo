/** Public routes (pathname only; React Router `basename` applies on GitHub Pages). */
import { SEO_ONLINE_SERVICES } from "../data/seoOnlineServices";
import {
  learnHubSitemapPaths,
  learnWatchSitemapPaths,
  LEARN_HUB_BASE_PATH,
} from "../lib/learnHubUrls";
import { topicGuideSitemapPaths } from "../data/topicGuides/topicGuideSitemapPaths";
import { internationalConsultationSitemapPaths } from "../data/internationalServices/internationalConsultationSitemapPaths";
import {
  VIRTUAL_CONSULTATION_HUB_PATH,
  VIRTUAL_CONSULTATION_COUNTRIES,
  virtualConsultationCityPath,
  virtualConsultationCountryPath,
  virtualServiceCityPath,
  VIRTUAL_CONSULTATION_CITIES,
} from "../lib/virtualConsultation";

export const ROUTES = {
  home: "/",
  /** Homepage section permalinks (same `Index` as `/`; scroll to matching id). */
  homeAbout: "/about",
  homeServicesSection: "/services",
  homeTestimonials: "/testimonials",
  homeContact: "/contact",
  homePillars: "/pillars",
  /** Homepage FAQ accordion (`#faq`); distinct from the full `/faq` page. */
  homeQuickAnswers: "/quick-answers",
  drCharmi: "/dr-charmi-shah",
  drZalak: "/dr-zalak-shah",
  ahmedabad: "/ahmedabad",
  mumbai: "/mumbai",
  valsad: "/valsad",
  bangalore: "/bangalore",
  learn: "/learn",
  /** Index of all written topic guides (linked from Learn; crawlable internal hub). */
  learnArticles: "/learn/articles",
  faq: "/faq",
  medicalDisclaimer: "/medical-disclaimer",
  editorialPolicy: "/editorial-policy",
  telemedicinePolicy: "/telemedicine-policy",
  privacyPolicy: "/privacy-policy",
  termsOfService: "/terms-of-service",
  refundPolicy: "/refund-policy",
  bookConsultation: "/book-consultation",
  /** Free WhatsApp community — SEO landing for free women's health resources. */
  freeWomensHealthCommunity: "/free-womens-health-community",
  /** International second opinion & specialist telehealth service pages. */
  internationalConsultation: "/international-consultation",
  /** Virtual hub + city overview pages + service×city SEO pages */
  onlineConsultation: VIRTUAL_CONSULTATION_HUB_PATH,
  /** @deprecated Use `onlineConsultation`; kept for redirects only */
  globalOnline: "/global-online",
} as const;

const _learnHubPathMatchesRoute: typeof LEARN_HUB_BASE_PATH = ROUTES.learn;
void _learnHubPathMatchesRoute;

/** Paths that render the homepage and scroll to a section (sitemap + helpers). */
export const HOME_SECTION_SCROLL_PATHS: readonly string[] = [
  ROUTES.homeAbout,
  ROUTES.homeServicesSection,
  ROUTES.homeTestimonials,
  ROUTES.homeContact,
  ROUTES.homePillars,
  ROUTES.homeQuickAnswers,
];

/** Each online service for every virtual city (sitemap only; see `VirtualOnlineServiceCityPage`). */
export const SITEMAP_SEGMENT_VIRTUAL_SERVICE_CITIES: readonly string[] =
  VIRTUAL_CONSULTATION_CITIES.flatMap((c) =>
    SEO_ONLINE_SERVICES.map((s) => virtualServiceCityPath(c, s.slug)),
  );

const VIRTUAL_COUNTRY_SITEMAP_PATHS: readonly string[] = VIRTUAL_CONSULTATION_COUNTRIES.map((c) =>
  virtualConsultationCountryPath(c),
);

/** Virtual hub, country hubs, and per-city overview pages (no service×city matrix). */
export const SITEMAP_SEGMENT_VIRTUAL_HUB_COUNTRY_CITY: readonly string[] = [
  ROUTES.onlineConsultation,
  ...VIRTUAL_COUNTRY_SITEMAP_PATHS,
  ...VIRTUAL_CONSULTATION_CITIES.map((c) => virtualConsultationCityPath(c)),
];

/** Virtual hub through service×city (full virtual SEO set). */
export const SITEMAP_SEGMENT_VIRTUAL_CONSULTATION: readonly string[] = [
  ...SITEMAP_SEGMENT_VIRTUAL_HUB_COUNTRY_CITY,
  ...SITEMAP_SEGMENT_VIRTUAL_SERVICE_CITIES,
];

/** International consultation hub, doctor sub-hubs, and service landings. */
export const SITEMAP_SEGMENT_INTERNATIONAL_CONSULTATION: readonly string[] =
  internationalConsultationSitemapPaths();

/** Home, section permalinks, doctor profiles, India city landings, Learn articles index, FAQ, policies. */
export const SITEMAP_SEGMENT_CORE: readonly string[] = [
  ROUTES.home,
  ...HOME_SECTION_SCROLL_PATHS,
  ROUTES.drCharmi,
  ROUTES.drZalak,
  ROUTES.ahmedabad,
  ROUTES.mumbai,
  ROUTES.valsad,
  ROUTES.bangalore,
  ROUTES.learnArticles,
  ROUTES.faq,
  ROUTES.medicalDisclaimer,
  ROUTES.editorialPolicy,
  ROUTES.telemedicinePolicy,
  ROUTES.privacyPolicy,
  ROUTES.termsOfService,
  ROUTES.refundPolicy,
  ROUTES.bookConsultation,
  ROUTES.freeWomensHealthCommunity,
  ...SITEMAP_SEGMENT_INTERNATIONAL_CONSULTATION,
];

/** Learn hub + every indexable doctor/topic filter URL + per-clip watch pages. */
export const SITEMAP_SEGMENT_LEARN: readonly string[] = [
  ...learnHubSitemapPaths(),
  ...learnWatchSitemapPaths(),
];

/** Flat topic guide article paths (e.g. `/pcos`). */
export const SITEMAP_SEGMENT_TOPIC_GUIDES: readonly string[] = topicGuideSitemapPaths();

const TOPIC_GUIDE_PATH_SET = new Set<string>(SITEMAP_SEGMENT_TOPIC_GUIDES);

/**
 * Which logical bucket a pathname belongs to for `<changefreq>` when emitting `sitemap.xml`.
 */
export function sitemapUrlsetKindForPath(
  pathname: string,
): "core" | "learn" | "guides" | "virtual" {
  const p = pathname === "" ? "/" : pathname.startsWith("/") ? pathname : `/${pathname}`;
  if (p.startsWith("/learn")) return "learn";
  if (p.startsWith("/online-consultation")) return "virtual";
  if (TOPIC_GUIDE_PATH_SET.has(p)) return "guides";
  return "core";
}

/**
 * Sitemap `<priority>` hints: higher for money pages and hubs, lower for legal and long-tail matrix.
 * Used at build time in `vite.config.ts`.
 */
export function sitemapPriorityForPath(pathname: string): string {
  const p = pathname === "" ? "/" : pathname.startsWith("/") ? pathname : `/${pathname}`;
  const segs = p.split("/").filter(Boolean);

  if (p === "/" || segs.length === 0) return "1.0";

  if ((HOME_SECTION_SCROLL_PATHS as readonly string[]).includes(p)) return "0.87";

  if (p === ROUTES.drCharmi || p === ROUTES.drZalak) return "0.95";
  if (
    p === ROUTES.ahmedabad ||
    p === ROUTES.mumbai ||
    p === ROUTES.valsad ||
    p === ROUTES.bangalore
  ) {
    return "0.92";
  }
  if (p === ROUTES.learnArticles) return "0.91";
  if (p === ROUTES.faq) return "0.84";
  if (
    p === ROUTES.medicalDisclaimer ||
    p === ROUTES.editorialPolicy ||
    p === ROUTES.telemedicinePolicy ||
    p === ROUTES.privacyPolicy ||
    p === ROUTES.termsOfService ||
    p === ROUTES.refundPolicy
  ) {
    return "0.35";
  }
  if (p === ROUTES.bookConsultation) return "0.94";
  if (p === ROUTES.freeWomensHealthCommunity) return "0.93";
  if (p === ROUTES.internationalConsultation) return "0.95";
  if (p.startsWith(`${ROUTES.internationalConsultation}/`)) {
    const rest = p.slice(ROUTES.internationalConsultation.length + 1);
    if (rest === "dr-charmi" || rest === "dr-zalak") return "0.94";
    return "0.92";
  }

  if (segs[0] === "learn") {
    if (segs.length === 1) return "0.92";
    if (segs.length === 2) return "0.88";
    return "0.86";
  }

  if (TOPIC_GUIDE_PATH_SET.has(p)) return "0.89";

  if (segs[0] === "online-consultation") {
    if (segs.length === 1) return "0.96";
    if (segs[1] === "country") return "0.88";
    if (segs.length === 2) return "0.84";
    return "0.70";
  }

  return "0.9";
}

/** Lower `<priority>` for optional supplemental service×city sitemap (duplicate URLs allowed). */
export function sitemapPriorityVirtualServiceCityLongtail(): string {
  return "0.58";
}

/**
 * Paths listed in the primary `sitemap.xml` only (no service×city matrix).
 * Long-tail `/online-consultation/:city/:service` URLs live in
 * `sitemap-virtual-service-cities.xml` instead.
 */
export const SITEMAP_PATHS_PRIMARY_URLSET: readonly string[] = [
  ...SITEMAP_SEGMENT_CORE,
  ...SITEMAP_SEGMENT_LEARN,
  ...SITEMAP_SEGMENT_TOPIC_GUIDES,
  ...SITEMAP_SEGMENT_VIRTUAL_HUB_COUNTRY_CITY,
];

/** Every indexable path (primary urlset + supplemental long-tail). Used for static shells. */
export const SITEMAP_PATHS: readonly string[] = [
  ...SITEMAP_PATHS_PRIMARY_URLSET,
  ...SITEMAP_SEGMENT_VIRTUAL_SERVICE_CITIES,
];
