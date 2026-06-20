import { SITE_URL, SITE_NAME, CONTACT } from "@/config/site";
import type { CityPageData } from "@/data/cityPages";

export function medicalClinicForCity(city: CityPageData) {
  const url = `${SITE_URL}${city.path}`;
  return {
    "@type": ["MedicalClinic", "LocalBusiness"],
    "@id": `${url}#clinic`,
    name: `${SITE_NAME} — ${city.h1.replace(/\s+/g, " ").trim()}`,
    url,
    telephone: CONTACT.phoneE164,
    email: CONTACT.email,
    parentOrganization: { "@id": `${SITE_URL}/#organization` },
    areaServed: {
      "@type": "City",
      name: city.key === "bangalore" ? "Bengaluru" : city.key === "mumbai" ? "Mumbai" : "Ahmedabad",
      containedInPlace: { "@type": "Country", name: "India" },
    },
    medicalSpecialty: [
      "Obstetrics",
      "Gynecology",
      "Physiotherapy",
      "PhysicalTherapy",
      "ReproductiveMedicine",
    ],
  };
}
