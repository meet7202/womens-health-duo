/** Public routes (pathname only; React Router `basename` applies on GitHub Pages). */
import { SEO_ONLINE_SERVICES } from "../data/seoOnlineServices";
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
  drCharmi: "/dr-charmi-shah",
  drZalak: "/dr-zalak-shah",
  ahmedabad: "/ahmedabad",
  mumbai: "/mumbai",
  bangalore: "/bangalore",
  learn: "/learn",
  faq: "/faq",
  /** Virtual hub + city overview pages + service×city SEO pages */
  onlineConsultation: VIRTUAL_CONSULTATION_HUB_PATH,
  /** @deprecated Use `onlineConsultation`; kept for redirects only */
  globalOnline: "/global-online",
} as const;

/** Every service × virtual city — for sitemap.xml only (see `VirtualOnlineServiceCityPage`). */
const VIRTUAL_SERVICE_CITY_SITEMAP_PATHS: readonly string[] = VIRTUAL_CONSULTATION_CITIES.flatMap(
  (c) => SEO_ONLINE_SERVICES.map((s) => virtualServiceCityPath(c, s.slug)),
);

const VIRTUAL_COUNTRY_SITEMAP_PATHS: readonly string[] = VIRTUAL_CONSULTATION_COUNTRIES.map((c) =>
  virtualConsultationCountryPath(c),
);

export const SITEMAP_PATHS: readonly string[] = [
  ROUTES.home,
  ROUTES.drCharmi,
  ROUTES.drZalak,
  ROUTES.ahmedabad,
  ROUTES.mumbai,
  ROUTES.bangalore,
  ROUTES.learn,
  ROUTES.faq,
  ROUTES.onlineConsultation,
  ...VIRTUAL_COUNTRY_SITEMAP_PATHS,
  ...VIRTUAL_CONSULTATION_CITIES.map((c) => virtualConsultationCityPath(c)),
  ...VIRTUAL_SERVICE_CITY_SITEMAP_PATHS,
];
