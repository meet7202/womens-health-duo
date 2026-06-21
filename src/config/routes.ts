/** Public routes (pathname only; React Router `basename` applies on GitHub Pages). */
import { SEO_ONLINE_SERVICES } from "../data/seoOnlineServices";
import { learnHubSitemapPaths, LEARN_HUB_BASE_PATH } from "../lib/learnHubUrls";
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
  bangalore: "/bangalore",
  learn: "/learn",
  faq: "/faq",
  medicalDisclaimer: "/medical-disclaimer",
  editorialPolicy: "/editorial-policy",
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

/** Every service × virtual city — for sitemap.xml only (see `VirtualOnlineServiceCityPage`). */
const VIRTUAL_SERVICE_CITY_SITEMAP_PATHS: readonly string[] = VIRTUAL_CONSULTATION_CITIES.flatMap(
  (c) => SEO_ONLINE_SERVICES.map((s) => virtualServiceCityPath(c, s.slug)),
);

const VIRTUAL_COUNTRY_SITEMAP_PATHS: readonly string[] = VIRTUAL_CONSULTATION_COUNTRIES.map((c) =>
  virtualConsultationCountryPath(c),
);

export const SITEMAP_PATHS: readonly string[] = [
  ROUTES.home,
  ...HOME_SECTION_SCROLL_PATHS,
  ROUTES.drCharmi,
  ROUTES.drZalak,
  ROUTES.ahmedabad,
  ROUTES.mumbai,
  ROUTES.bangalore,
  ...learnHubSitemapPaths(),
  ROUTES.faq,
  ROUTES.medicalDisclaimer,
  ROUTES.editorialPolicy,
  ROUTES.onlineConsultation,
  ...VIRTUAL_COUNTRY_SITEMAP_PATHS,
  ...VIRTUAL_CONSULTATION_CITIES.map((c) => virtualConsultationCityPath(c)),
  ...VIRTUAL_SERVICE_CITY_SITEMAP_PATHS,
];
