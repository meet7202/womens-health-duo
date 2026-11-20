import { SITE_URL, SITE_NAME, CONTACT } from "@/config/site";
import type { CityKey, CityPageData } from "@/data/cityPages";
import { githubPagesAbsoluteUrl } from "@/lib/githubPagesPublicUrl";

/**
 * Schema.org MedicalSpecialty members offered in person at each city clinic.
 * IVF / laparoscopy / infertility are described in `description` / `knowsAbout` — they are not
 * MedicalSpecialty enum members. Align with practiceLocations.ts (Charmi: Mumbai/Ahmedabad/Valsad;
 * Zalak: Bangalore/Ahmedabad).
 */
const CITY_CLINIC_SPECIALTIES: Record<
  CityKey,
  { medicalSpecialty: string[]; description: string; knowsAbout: string[] }
> = {
  ahmedabad: {
    medicalSpecialty: ["Obstetric", "Gynecologic", "Physiotherapy"],
    description:
      "In-person OB-GYN, IVF and laparoscopy consults with Dr. Charmi Shah, and women's health physiotherapy / STOTT Pilates with Dr. Zalak Shah in Ahmedabad; online consults worldwide.",
    knowsAbout: [
      "Obstetrics and gynecology",
      "IVF, IUI, and fertility evaluation",
      "Laparoscopic gynecologic surgery",
      "High-risk pregnancy planning",
      "PCOS care",
      "Women's health physiotherapy",
      "Pelvic floor physiotherapy",
      "Prenatal classes",
      "Postnatal physiotherapy",
      "Diastasis recti",
      "Urinary incontinence physiotherapy",
      "STOTT Pilates Mat and Reformer",
    ],
  },
  mumbai: {
    medicalSpecialty: ["Obstetric", "Gynecologic"],
    description:
      "In-person OB-GYN, IVF and laparoscopy with Dr. Charmi Shah in Mumbai. Dr. Zalak Shah's women's health physiotherapy and STOTT Pilates are available online worldwide and in person in Bangalore and Ahmedabad.",
    knowsAbout: [
      "Obstetrics and gynecology",
      "IVF, IUI, and fertility evaluation",
      "Laparoscopic gynecologic surgery",
      "High-risk pregnancy planning",
    ],
  },
  valsad: {
    medicalSpecialty: ["Obstetric", "Gynecologic"],
    description:
      "In-person OB-GYN, IVF and laparoscopy with Dr. Charmi Shah in Valsad. Dr. Zalak Shah's women's health physiotherapy and STOTT Pilates are available online worldwide and in person in Bangalore and Ahmedabad.",
    knowsAbout: [
      "Obstetrics and gynecology",
      "IVF, IUI, and fertility evaluation",
      "Laparoscopic gynecologic surgery",
      "High-risk pregnancy planning",
    ],
  },
  bangalore: {
    medicalSpecialty: ["Physiotherapy"],
    description:
      "In-person women's health physiotherapy and STOTT Pilates with Dr. Zalak Shah in Bengaluru (Bangalore). Dr. Charmi Shah offers online OB-GYN, IVF, and laparoscopy consults worldwide and in-person care in Mumbai, Ahmedabad, and Valsad.",
    knowsAbout: [
      "Women's health physiotherapy",
      "Pelvic floor physiotherapy",
      "Prenatal classes",
      "Postnatal physiotherapy",
      "Diastasis recti",
      "Urinary incontinence physiotherapy",
      "STOTT Pilates Mat and Reformer",
    ],
  },
};

export function medicalClinicForCity(city: CityPageData) {
  const url = githubPagesAbsoluteUrl(SITE_URL, city.path);
  const specialty = CITY_CLINIC_SPECIALTIES[city.key];
  return {
    "@type": ["MedicalClinic", "LocalBusiness"],
    "@id": `${url}#clinic`,
    name: `${SITE_NAME}, ${city.cityName}`,
    url,
    telephone: CONTACT.phoneE164,
    email: CONTACT.email,
    parentOrganization: { "@id": `${githubPagesAbsoluteUrl(SITE_URL, "/")}#organization` },
    areaServed: {
      "@type": "City",
      name:
        city.key === "bangalore"
          ? "Bengaluru"
          : city.key === "mumbai"
            ? "Mumbai"
            : city.key === "valsad"
              ? "Valsad"
              : "Ahmedabad",
      containedInPlace: { "@type": "Country", name: "India" },
    },
    medicalSpecialty: specialty.medicalSpecialty,
    description: specialty.description,
    knowsAbout: specialty.knowsAbout,
    availableService: specialty.knowsAbout.map((name) => ({
      "@type": "MedicalProcedure",
      name,
    })),
    ...(city.key === "bangalore" && city.studio
      ? {
          address: {
            "@type": "PostalAddress",
            streetAddress: "Ahad Euphoria, Ahad Euphoria Road, Kodathi",
            addressLocality: "Bengaluru",
            postalCode: "560099",
            addressRegion: "Karnataka",
            addressCountry: "IN",
          },
          openingHoursSpecification: {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: [
              "Monday",
              "Tuesday",
              "Wednesday",
              "Thursday",
              "Friday",
              "Saturday",
              "Sunday",
            ],
            opens: "00:00",
            closes: "23:59",
          },
        }
      : {}),
  };
}
