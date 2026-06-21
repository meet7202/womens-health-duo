import virtualConsultationCities from "../data/virtualConsultationCities.json";
import legacyGlobalOnlineSlugMap from "../data/legacyGlobalOnlineSlugMap.json";
import { ANCHOR_VIRTUAL_CONSULTATION_CITIES } from "../data/anchorVirtualConsultationCities";

export const VIRTUAL_CONSULTATION_HUB_PATH = "/online-consultation" as const;

export type VirtualConsultationCity = (typeof virtualConsultationCities)[number];

/** Lowercase slug for URLs (city names, country names, etc.). */
export function slugifyUrlSegment(raw: string): string {
  return raw
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function mergeVirtualConsultationCities(): readonly VirtualConsultationCity[] {
  const merged = new Map<string, VirtualConsultationCity>();
  for (const c of virtualConsultationCities as VirtualConsultationCity[]) {
    merged.set(c.slug, c);
  }
  for (const a of ANCHOR_VIRTUAL_CONSULTATION_CITIES) {
    const row: VirtualConsultationCity = {
      slug: a.slug,
      city: a.city,
      country: a.country,
      countryCode: a.countryCode,
    };
    merged.set(a.slug, row);
  }
  return Object.freeze([...merged.values()]) as readonly VirtualConsultationCity[];
}

export const VIRTUAL_CONSULTATION_CITIES = mergeVirtualConsultationCities();

const CITY_BASE_SLUG_COUNTS: ReadonlyMap<string, number> = (() => {
  const m = new Map<string, number>();
  for (const c of VIRTUAL_CONSULTATION_CITIES) {
    const base = slugifyUrlSegment(c.city);
    m.set(base, (m.get(base) ?? 0) + 1);
  }
  return m;
})();

/** Public path segment for a city (e.g. `delhi`, or `manchester-gb` when the city name repeats). */
export function virtualCityPathSegment(city: VirtualConsultationCity): string {
  const base = slugifyUrlSegment(city.city);
  if ((CITY_BASE_SLUG_COUNTS.get(base) ?? 0) > 1) {
    return `${base}-${city.countryCode.toLowerCase()}`;
  }
  return base;
}

/** One row per country in the virtual city list ,  for country index pages + sitemap. */
export type VirtualConsultationCountryIndex = {
  countryCode: string;
  country: string;
  /** URL segment under `/online-consultation/country/…` (e.g. `india`, `united-states`). */
  pathSegment: string;
  cities: readonly VirtualConsultationCity[];
};

function buildVirtualConsultationCountries(): readonly VirtualConsultationCountryIndex[] {
  const map = new Map<string, { country: string; cities: VirtualConsultationCity[] }>();
  for (const c of VIRTUAL_CONSULTATION_CITIES) {
    const code = c.countryCode.toUpperCase();
    let entry = map.get(code);
    if (!entry) {
      entry = { country: c.country, cities: [] };
      map.set(code, entry);
    }
    entry.cities.push(c);
    if (c.country.length > entry.country.length) {
      entry.country = c.country;
    }
  }
  const sortedCities = (cities: VirtualConsultationCity[]) =>
    [...cities].sort((a, b) => a.city.localeCompare(b.city));
  return Object.freeze(
    [...map.entries()]
      .map(([countryCode, { country, cities }]) => ({
        countryCode: countryCode.toLowerCase(),
        country,
        pathSegment: slugifyUrlSegment(country),
        cities: sortedCities(cities),
      }))
      .sort((a, b) => a.country.localeCompare(b.country)),
  );
}

export const VIRTUAL_CONSULTATION_COUNTRIES = buildVirtualConsultationCountries();

export function virtualConsultationCountryPath(country: VirtualConsultationCountryIndex): string {
  return `${VIRTUAL_CONSULTATION_HUB_PATH}/country/${country.pathSegment}`;
}

/** Resolve country hub from URL segment (`india`) or legacy ISO-style code (`in`). */
export function getVirtualConsultationCountryByPathSegment(
  segment: string | undefined,
): VirtualConsultationCountryIndex | undefined {
  if (!segment) return undefined;
  const lower = segment.toLowerCase();
  return VIRTUAL_CONSULTATION_COUNTRIES.find(
    (c) => c.pathSegment === lower || c.countryCode === lower,
  );
}

/** @deprecated Prefer `getVirtualConsultationCountryByPathSegment` */
export const getVirtualConsultationCountryByCode = getVirtualConsultationCountryByPathSegment;

export function virtualConsultationCityPath(city: VirtualConsultationCity): string {
  return `${VIRTUAL_CONSULTATION_HUB_PATH}/${virtualCityPathSegment(city)}`;
}

/** Service-specific virtual URL: `/online-consultation/:citySegment/:serviceSlug` */
export function virtualServiceCityPath(city: VirtualConsultationCity, serviceSlug: string): string {
  return `${VIRTUAL_CONSULTATION_HUB_PATH}/${virtualCityPathSegment(city)}/${serviceSlug}`;
}

/** Same-country cities first, then others ,  for “similar cities” footer links (not exhaustive). */
export function pickSiblingCities(
  current: VirtualConsultationCity,
  limit: number,
): VirtualConsultationCity[] {
  const sameCountry = VIRTUAL_CONSULTATION_CITIES.filter(
    (c) => c.country === current.country && c.slug !== current.slug,
  );
  const other = VIRTUAL_CONSULTATION_CITIES.filter(
    (c) => c.country !== current.country && c.slug !== current.slug,
  );
  sameCountry.sort((a, b) => a.city.localeCompare(b.city));
  return [...sameCountry, ...other].slice(0, limit);
}

/**
 * Resolve a city from a route segment: accepts the public segment (`delhi`) or legacy internal
 * slug (`delhi-in`) for redirects.
 */
export function getVirtualConsultationCityBySlug(
  segment: string | undefined,
): VirtualConsultationCity | undefined {
  if (!segment) return undefined;
  const lower = segment.toLowerCase();
  const byInternal = VIRTUAL_CONSULTATION_CITIES.find((c) => c.slug.toLowerCase() === lower);
  if (byInternal) return byInternal;
  return VIRTUAL_CONSULTATION_CITIES.find((c) => virtualCityPathSegment(c) === lower);
}

export function getVirtualConsultationCountryForCity(
  city: VirtualConsultationCity,
): VirtualConsultationCountryIndex | undefined {
  const code = city.countryCode.toLowerCase();
  return VIRTUAL_CONSULTATION_COUNTRIES.find((c) => c.countryCode === code);
}

export const LEGACY_GLOBAL_ONLINE_SLUG_MAP: Record<string, string> = legacyGlobalOnlineSlugMap;

export function resolveLegacyGlobalOnlineSlug(slug: string | undefined): string | undefined {
  if (!slug) return undefined;
  return LEGACY_GLOBAL_ONLINE_SLUG_MAP[slug];
}
