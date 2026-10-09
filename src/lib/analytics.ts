import { ROUTES } from "@/config/routes";

type AnalyticsPayload = {
  page_path: string;
  cta_placement: string;
  doctor: string;
  service: string;
};

declare global {
  interface Window {
    gtag?: (
      command: "event",
      eventName: string,
      params: Record<string, string | number | boolean | undefined>,
    ) => void;
    dataLayer?: Array<Record<string, unknown>>;
  }
}

function inferDoctorFromPathname(pathname: string): string | undefined {
  const norm = pathname.replace(/\/+$/, "") || "/";

  if (
    norm === ROUTES.drCharmi ||
    norm.startsWith(`${ROUTES.internationalConsultation}/dr-charmi`)
  ) {
    return "Dr. Charmi Shah";
  }
  if (norm === ROUTES.drZalak || norm.startsWith(`${ROUTES.internationalConsultation}/dr-zalak`)) {
    return "Dr. Zalak Shah";
  }
  if (
    norm === ROUTES.ahmedabad ||
    norm === ROUTES.mumbai ||
    norm === ROUTES.valsad ||
    norm === ROUTES.bangalore
  ) {
    return "city_page";
  }
  return undefined;
}

function inferServiceFromPathname(pathname: string): string {
  const norm = pathname.replace(/\/+$/, "") || "/";

  if (norm === ROUTES.learn || norm.startsWith(`${ROUTES.learn}/`)) return "learn";
  if (
    norm === ROUTES.onlineConsultation ||
    norm.startsWith(`${ROUTES.onlineConsultation}/`) ||
    norm === ROUTES.bookConsultation ||
    norm.includes("online-consult") ||
    norm.includes("virtual-consult")
  ) {
    return "online_consult";
  }
  if (norm === ROUTES.bookConsultation) return "book_consultation";
  if (norm === ROUTES.faq) return "faq";
  if (norm === ROUTES.home || norm === "") return "homepage";
  if (norm.startsWith(`${ROUTES.internationalConsultation}/`)) return "international_consultation";
  if (norm.startsWith(`${ROUTES.globalOnline}/`) || norm.startsWith(`${ROUTES.globalOnline}`)) {
    return "legacy_global_online";
  }
  if (
    norm === ROUTES.prenatal ||
    norm === ROUTES.zalakPrenatalClasses ||
    norm.includes("prenatal")
  ) {
    return "prenatal";
  }
  if (
    norm === ROUTES.postnatal ||
    norm === ROUTES.zalakPostnatalClasses ||
    norm.includes("postnatal")
  ) {
    return "postnatal";
  }
  if (
    norm.includes("incontinence") ||
    norm.includes("bladder") ||
    norm.includes("bladder-leakage") ||
    norm.includes("leakage")
  ) {
    return "incontinence";
  }
  if (norm.includes("diastasis")) return "diastasis";
  if (
    norm.includes("womens-health-physiotherapy") ||
    norm.includes("physio") ||
    norm.includes("pilates")
  ) {
    return "physiotherapy";
  }

  return "general";
}

export function trackWhatsAppClick({
  ctaPlacement,
  doctor,
  service,
  pagePath,
}: {
  ctaPlacement: string;
  doctor?: string;
  service?: string;
  pagePath?: string;
}): AnalyticsPayload {
  const safePath = pagePath ?? (typeof window !== "undefined" ? window.location.pathname : "/");
  const payload: AnalyticsPayload = {
    page_path: safePath,
    cta_placement: ctaPlacement,
    doctor: doctor ?? inferDoctorFromPathname(safePath) ?? "not_selected",
    service: service ?? inferServiceFromPathname(safePath),
  };

  if (typeof window !== "undefined") {
    if (typeof window.gtag === "function") {
      window.gtag("event", "whatsapp_click", payload);
    }
    if (Array.isArray(window.dataLayer)) {
      window.dataLayer.push({ event: "whatsapp_click", ...payload });
    }
  }

  return payload;
}
