import { CHARMI_INTERNATIONAL_SERVICES } from "./charmiServices";
import { ZALAK_INTERNATIONAL_SERVICES } from "./zalakServices";
import {
  INTERNATIONAL_CONSULTATION_BASE,
  INTERNATIONAL_DOCTOR_HUBS,
  INTERNATIONAL_HUB,
} from "./hubContent";
import type { InternationalDoctorHub, InternationalService } from "./types";

export { INTERNATIONAL_CONSULTATION_BASE, INTERNATIONAL_DOCTOR_HUBS, INTERNATIONAL_HUB };

export const INTERNATIONAL_SERVICES: readonly InternationalService[] = [
  ...CHARMI_INTERNATIONAL_SERVICES,
  ...ZALAK_INTERNATIONAL_SERVICES,
];

const serviceBySlug = new Map(INTERNATIONAL_SERVICES.map((s) => [s.slug, s]));

export function internationalServicePath(slug: string): string {
  return `${INTERNATIONAL_CONSULTATION_BASE}/${slug}`;
}

export function internationalDoctorHubPath(hub: InternationalDoctorHub): string {
  return `${INTERNATIONAL_CONSULTATION_BASE}/${hub.pathSegment}`;
}

export function getInternationalService(slug: string): InternationalService | undefined {
  return serviceBySlug.get(slug);
}

export function getInternationalDoctorHub(pathSegment: string): InternationalDoctorHub | undefined {
  return INTERNATIONAL_DOCTOR_HUBS.find((h) => h.pathSegment === pathSegment);
}

export function internationalServicesForDoctor(
  doctor: InternationalService["doctor"],
): readonly InternationalService[] {
  return INTERNATIONAL_SERVICES.filter((s) => s.doctor === doctor);
}

export function internationalServiceSitemapPaths(): string[] {
  const paths = [
    INTERNATIONAL_HUB.path,
    ...INTERNATIONAL_DOCTOR_HUBS.map((h) => internationalDoctorHubPath(h)),
    ...INTERNATIONAL_SERVICES.map((s) => internationalServicePath(s.slug)),
  ];
  return paths.sort((a, b) => a.localeCompare(b));
}
