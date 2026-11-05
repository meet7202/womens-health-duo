/**
 * Allowlisted booking intent query params for `/book-consultation/` (SEO-23).
 * Must not use `@/` imports (may be pulled from Node / topic guide registry).
 */
import { ROUTES } from "../config/routes";
import type { DoctorSlug } from "../data/doctorProfiles";
import {
  getSeoOnlineServiceBySlug,
  SEO_ONLINE_SERVICES,
  type SeoOnlineService,
} from "../data/seoOnlineServices";
import { publicPathname } from "./githubPagesPublicUrl";

/** Allowlisted `doctor=` query values. */
export const BOOKING_INTENT_DOCTORS = ["charmi", "zalak"] as const;

export type BookingIntentDoctor = (typeof BOOKING_INTENT_DOCTORS)[number];

/** Allowlisted `service=` values — SEO online service slugs only (no patient data). */
export const BOOKING_INTENT_SERVICE_SLUGS: readonly string[] = SEO_ONLINE_SERVICES.map(
  (s: SeoOnlineService) => s.slug,
);

export type BookingIntent = {
  doctor: DoctorSlug | "";
  service: string;
};

export function isBookingIntentDoctor(value: string | null | undefined): value is DoctorSlug {
  return value === "charmi" || value === "zalak";
}

export function isBookingIntentService(value: string | null | undefined): value is string {
  if (!value) return false;
  return BOOKING_INTENT_SERVICE_SLUGS.includes(value);
}

/**
 * Parse allowlisted booking intent from a query string / URLSearchParams.
 * Invalid doctor or service → empty (safe fallback); never reads patient fields.
 */
export function parseBookingIntent(
  search: string | URLSearchParams | null | undefined,
): BookingIntent {
  const params =
    typeof search === "string"
      ? new URLSearchParams(search.startsWith("?") ? search.slice(1) : search)
      : (search ?? new URLSearchParams());

  const doctorRaw = params.get("doctor");
  const serviceRaw = params.get("service");

  const service = isBookingIntentService(serviceRaw) ? serviceRaw : "";
  let doctor: DoctorSlug | "" = isBookingIntentDoctor(doctorRaw) ? doctorRaw : "";

  if (!doctor && service) {
    const svc = getSeoOnlineServiceBySlug(service);
    if (svc) doctor = svc.doctor;
  }

  return { doctor, service };
}

/** Build `/book-consultation/?doctor=&service=` with allowlisted params only. */
export function bookConsultationPath(intent?: {
  doctor?: DoctorSlug | "both" | "";
  service?: string;
}): string {
  const params = new URLSearchParams();
  const doctor = intent?.doctor;
  if (doctor === "charmi" || doctor === "zalak") {
    params.set("doctor", doctor);
  }
  if (intent?.service && isBookingIntentService(intent.service)) {
    params.set("service", intent.service);
  }
  const qs = params.toString();
  const base = publicPathname(ROUTES.bookConsultation);
  return qs ? `${base}?${qs}` : base;
}

export function bookingIntentServiceLabel(slug: string): string | undefined {
  return getSeoOnlineServiceBySlug(slug)?.shortTitle;
}

export function bookingIntentServicesForDoctor(
  doctor: DoctorSlug | "",
): readonly SeoOnlineService[] {
  if (!doctor) return SEO_ONLINE_SERVICES;
  return SEO_ONLINE_SERVICES.filter((s) => s.doctor === doctor);
}
