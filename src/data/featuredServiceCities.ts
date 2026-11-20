/**
 * City×service pages chosen from Search Console data (`scripts/select-featured-service-cities.mjs`).
 * Only these are indexable and listed in the sitemap; the rest of the matrix stays noindex.
 * Must not use `@/` path aliases (imported from `routes.ts` in Node).
 */
import featuredServiceCityPaths from "./featuredServiceCityPaths.json";

function normalize(pathname: string): string {
  return pathname.replace(/\/+$/, "") || "/";
}

export const FEATURED_SERVICE_CITY_PATHS: ReadonlySet<string> = new Set(
  featuredServiceCityPaths.paths.map(normalize),
);

export function isFeaturedServiceCityPath(pathname: string): boolean {
  return FEATURED_SERVICE_CITY_PATHS.has(normalize(pathname));
}
