/**
 * City×service pages with Search Console demand (`scripts/select-featured-service-cities.mjs`).
 * The full matrix is indexable. This set only gets a slightly higher sitemap priority.
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
