import { SITE_URL, SITE_NAME, CONTACT } from "@/config/site";
import { PRACTICE_BOTH_DOCTORS_IN_PERSON } from "@/config/practiceLocations";
import type { VirtualConsultationCity } from "@/lib/virtualConsultation";
import { virtualConsultationCityPath } from "@/lib/virtualConsultation";
import { githubPagesAbsoluteUrl } from "@/lib/githubPagesPublicUrl";

export function virtualConsultationOfferSchema(city: VirtualConsultationCity) {
  const url = githubPagesAbsoluteUrl(SITE_URL, virtualConsultationCityPath(city));
  const orgId = `${githubPagesAbsoluteUrl(SITE_URL, "/")}#organization`;
  const countryNode: Record<string, unknown> = {
    "@type": "Country",
    name: city.country,
  };
  if (city.countryCode && city.countryCode !== "ZZ") {
    countryNode.identifier = city.countryCode;
  }
  return {
    "@type": "MedicalBusiness",
    "@id": `${url}#virtual-consultation`,
    name: `${SITE_NAME} ,  virtual OB-GYN & women's health physio (${city.city})`,
    url,
    telephone: CONTACT.phoneE164,
    email: CONTACT.email,
    parentOrganization: { "@id": orgId },
    areaServed: {
      "@type": "City",
      name: city.city,
      containedInPlace: countryNode,
    },
    description: `Virtual online consultations in ${city.city}, ${city.country}: Dr. Charmi Shah (OB-GYN, IVF, laparoscopy) and Dr. Zalak Shah (women's health physiotherapy, Mat Pilates online, STOTT Pilates Mat & Reformer). ${PRACTICE_BOTH_DOCTORS_IN_PERSON}`,
  };
}
