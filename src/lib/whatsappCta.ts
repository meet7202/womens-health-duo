import { CONTACT } from "@/config/site";
import { ROUTES } from "@/config/routes";
import { getSeoOnlineServiceBySlug } from "@/data/seoOnlineServices";
import {
  getVirtualConsultationCityBySlug,
  getVirtualConsultationCountryByPathSegment,
  virtualConsultationCityPath,
  virtualServiceCityPath,
} from "@/lib/virtualConsultation";
import { isHomeSectionPermalink } from "@/lib/homeSectionPaths";

const MAX_PREFILL_LEN = 1800;

/** wa.me link with optional pre-filled chat text (UTF-8). */
export function whatsappUrlWithMessage(message: string): string {
  const text = message.trim().slice(0, MAX_PREFILL_LEN);
  return `${CONTACT.whatsappUrl}?text=${encodeURIComponent(text)}`;
}

function siteRef(path: string) {
  return `\n\n— Sent from womenshealthduo.com${path}`;
}

export function whatsappMessageHomepage(sourcePath: string = ROUTES.home): string {
  return `Hi Women's Health Duo,

I'd like to book an online consultation (OB-GYN / IVF / physio / Pilates). Please share your next available slots and anything you need from me before the call.

My city & country:
My time zone:
Brief reason for visit:${siteRef(sourcePath)}`;
}

export function whatsappMessageVirtualHub(): string {
  return `Hi Women's Health Duo,

I'm on your Virtual online consultations hub and would like to book a telehealth consult. Please guide me on the next steps.

My city & country:
My time zone:
Service I'm interested in:${siteRef(ROUTES.onlineConsultation)}`;
}

export function whatsappMessageVirtualCity(
  city: string,
  country: string,
  pagePath: string,
): string {
  return `Hi Women's Health Duo,

I'm interested in a virtual consultation while I'm based in ${city}, ${country}. I found your page for this city on your website.

My time zone:
Brief summary of what I need help with:${siteRef(pagePath)}`;
}

export function whatsappMessageVirtualServiceCity(
  serviceTitle: string,
  city: string,
  country: string,
  pagePath: string,
): string {
  return `Hi Women's Health Duo,

I'd like to book / discuss: ${serviceTitle}
I'm based in ${city}, ${country} (virtual consult).

My time zone:
Any reports or context you should know:${siteRef(pagePath)}`;
}

export function whatsappMessageDoctorProfile(doctorName: string, profilePath: string): string {
  return `Hi Women's Health Duo,

I'd like to book a consultation with ${doctorName}. I was reading the profile on your website.

My city & country:
My time zone:
What I'd like help with:${siteRef(profilePath)}`;
}

export function whatsappMessageIndiaCityPage(cityLabel: string, path: string): string {
  return `Hi Women's Health Duo,

I'm interested in care in ${cityLabel} (in-person or hybrid if I'm there, or online if I'm abroad).

My city & country now:
My time zone:
What I'd like to book:${siteRef(path)}`;
}

export function whatsappMessageLearn(pagePath: string = ROUTES.learn): string {
  return `Hi Women's Health Duo,

I came from your Learn page and would like to book a proper consultation.

My city & country:
My time zone:
Topic:${siteRef(pagePath)}`;
}

export function whatsappMessageFaq(): string {
  return `Hi Women's Health Duo,

I read your FAQ on the website and would like to book a consultation.

My city & country:
My time zone:
Question / concern:${siteRef(ROUTES.faq)}`;
}

export function whatsappMessageGenericPage(pageName: string, path: string): string {
  return `Hi Women's Health Duo,

I'm writing from the "${pageName}" page on your website and would like to book a consultation.

My city & country:
My time zone:${siteRef(path)}`;
}

/**
 * Default chat text for the sticky FAB from the current client route (no React context required).
 */
export function whatsappIntentFromPathname(pathname: string): string {
  const norm = pathname.replace(/\/+$/, "") || "/";

  if (norm === ROUTES.home || norm === "") {
    return whatsappMessageHomepage();
  }

  if (isHomeSectionPermalink(norm)) {
    return whatsappMessageHomepage(norm);
  }

  if (norm === ROUTES.drCharmi) {
    return whatsappMessageDoctorProfile("Dr. Charmi Shah", ROUTES.drCharmi);
  }
  if (norm === ROUTES.drZalak) {
    return whatsappMessageDoctorProfile("Dr. Zalak Shah (PT)", ROUTES.drZalak);
  }

  if (norm === ROUTES.ahmedabad) {
    return whatsappMessageIndiaCityPage("Ahmedabad", ROUTES.ahmedabad);
  }
  if (norm === ROUTES.mumbai) {
    return whatsappMessageIndiaCityPage("Mumbai", ROUTES.mumbai);
  }
  if (norm === ROUTES.bangalore) {
    return whatsappMessageIndiaCityPage("Bangalore", ROUTES.bangalore);
  }

  if (norm === ROUTES.learn || norm.startsWith(`${ROUTES.learn}/`)) {
    return whatsappMessageLearn(norm);
  }
  if (norm === ROUTES.faq) return whatsappMessageFaq();

  if (norm === ROUTES.medicalDisclaimer) {
    return whatsappMessageGenericPage("Medical disclaimer", ROUTES.medicalDisclaimer);
  }
  if (norm === ROUTES.editorialPolicy) {
    return whatsappMessageGenericPage("Editorial policy", ROUTES.editorialPolicy);
  }

  if (norm === ROUTES.globalOnline || norm.startsWith(`${ROUTES.globalOnline}/`)) {
    return whatsappMessageVirtualHub();
  }

  if (norm === ROUTES.onlineConsultation) {
    return whatsappMessageVirtualHub();
  }

  const hub = ROUTES.onlineConsultation;
  if (norm.startsWith(`${hub}/`)) {
    const rest = norm.slice(hub.length + 1);
    const parts = rest.split("/").filter(Boolean);
    if (parts.length === 2 && parts[0] === "country") {
      const country = getVirtualConsultationCountryByPathSegment(parts[1]);
      if (country) {
        return whatsappMessageVirtualHub();
      }
    }
    if (parts.length >= 2) {
      const [citySlug, serviceSlug] = parts;
      const city = getVirtualConsultationCityBySlug(citySlug);
      const service = getSeoOnlineServiceBySlug(serviceSlug);
      if (city && service) {
        return whatsappMessageVirtualServiceCity(
          service.title,
          city.city,
          city.country,
          virtualServiceCityPath(city, service.slug),
        );
      }
    }
    if (parts.length === 1) {
      const city = getVirtualConsultationCityBySlug(parts[0]);
      if (city) {
        return whatsappMessageVirtualCity(
          city.city,
          city.country,
          virtualConsultationCityPath(city),
        );
      }
    }
  }

  return whatsappMessageGenericPage("Women's Health Duo", norm);
}
