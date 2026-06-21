import { SITE_URL, SITE_NAME, CONTACT } from "@/config/site";
import { PRACTICE_BOTH_DOCTORS_IN_PERSON } from "@/config/practiceLocations";
import type { SeoOnlineService } from "@/data/seoOnlineServices";
import type { VirtualConsultationCity } from "@/lib/virtualConsultation";
import { virtualServiceCityPath } from "@/lib/virtualConsultation";
import { githubPagesAbsoluteUrl } from "@/lib/githubPagesPublicUrl";

export function virtualServiceCityOfferSchema(
  city: VirtualConsultationCity,
  service: SeoOnlineService,
) {
  const url = githubPagesAbsoluteUrl(SITE_URL, virtualServiceCityPath(city, service.slug));
  const orgId = `${githubPagesAbsoluteUrl(SITE_URL, "/")}#organization`;
  const countryNode: Record<string, unknown> = {
    "@type": "Country",
    name: city.country,
  };
  if (city.countryCode && city.countryCode !== "ZZ") {
    countryNode.identifier = city.countryCode;
  }
  const doctorName =
    service.doctor === "charmi" ? "Dr. Charmi Shah (OB-GYN)" : "Dr. Zalak Shah (physiotherapy)";
  return {
    "@type": "MedicalBusiness",
    "@id": `${url}#virtual-service-city`,
    name: `${SITE_NAME} ,  ${service.title} (${city.city})`,
    url,
    telephone: CONTACT.phoneE164,
    email: CONTACT.email,
    parentOrganization: { "@id": orgId },
    areaServed: {
      "@type": "City",
      name: city.city,
      containedInPlace: countryNode,
    },
    description: `Online ${service.title} for patients in ${city.city}, ${city.country} with ${doctorName}. ${PRACTICE_BOTH_DOCTORS_IN_PERSON}`,
  };
}
