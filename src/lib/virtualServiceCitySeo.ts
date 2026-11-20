/**
 * Shared SEO strings for `/online-consultation/:city/:service` (React page + static shells).
 * Must not use `@/` path aliases (imported from `staticShellHead.ts` in Node).
 */
import { isFeaturedServiceCityPath } from "../data/featuredServiceCities";
import type { SeoOnlineService } from "../data/seoOnlineServices";
import { SERVICE_CITY_CONTENT } from "../data/serviceCityContent";
import {
  virtualServiceCityDocumentTitle,
  virtualServiceCityH1,
  virtualServiceCityMetaDescription,
} from "./pageSeoCopy";
import {
  type VirtualConsultationCity,
  virtualCityPathSegment,
  virtualServiceCityPath,
} from "./virtualConsultation";

export function serviceQueryLabel(service: SeoOnlineService): string {
  return SERVICE_CITY_CONTENT[service.slug]?.queryLabel ?? service.title;
}

export function virtualServiceCitySeo(city: VirtualConsultationCity, service: SeoOnlineService) {
  const path = virtualServiceCityPath(city, service.slug);
  const label = serviceQueryLabel(service);
  const nameIsShared = virtualCityPathSegment(city).endsWith(`-${city.countryCode.toLowerCase()}`);
  return {
    path,
    label,
    indexable: isFeaturedServiceCityPath(path),
    title: virtualServiceCityDocumentTitle(label, city.city, city.country, nameIsShared),
    h1: virtualServiceCityH1(label, city.city, city.country),
    metaDescription: virtualServiceCityMetaDescription(
      label,
      city.city,
      city.country,
      service.doctor,
    ),
  };
}
