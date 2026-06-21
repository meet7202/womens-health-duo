import {
  SITE_URL,
  SITE_NAME,
  DEFAULT_DESCRIPTION,
  CONTACT,
  OG_IMAGE_PATH,
  ORGANIZATION_SCHEMA_DESCRIPTION,
} from "@/config/site";
import { ROUTES } from "@/config/routes";
import { PRACTICE_CHARMI_IN_PERSON, PRACTICE_ZALAK_IN_PERSON } from "@/config/practiceLocations";

/**
 * Schema.org structured data for search engines and AI crawlers.
 */
export function JsonLd() {
  const orgId = `${SITE_URL}/#organization`;
  const websiteId = `${SITE_URL}/#website`;
  const charmiId = `${SITE_URL}/#physician-charmi`;
  const zalakId = `${SITE_URL}/#physician-zalak`;
  const ogImage = `${SITE_URL}${OG_IMAGE_PATH}`;

  const india = { "@type": "Country" as const, name: "India" };

  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["MedicalOrganization", "Organization"],
        "@id": orgId,
        name: SITE_NAME,
        url: SITE_URL,
        logo: `${SITE_URL}${OG_IMAGE_PATH}`,
        image: ogImage,
        description: ORGANIZATION_SCHEMA_DESCRIPTION,
        disambiguatingDescription:
          "Women's health education and booked medical consultations; we do not sell dietary supplements or pills as a product line.",
        email: CONTACT.email,
        telephone: CONTACT.phoneE164,
        sameAs: [CONTACT.instagram, CONTACT.youtube, CONTACT.whatsappUrl],
        areaServed: [
          { "@type": "City", name: "Ahmedabad", containedInPlace: india },
          { "@type": "City", name: "Mumbai", containedInPlace: india },
          { "@type": "City", name: "Bangalore", containedInPlace: india },
          {
            "@type": "Place",
            name: "Worldwide (online-first)",
            description:
              "500+ dedicated virtual consultation city URLs under /online-consultation plus global telehealth: online OB-GYN, IVF discussion, laparoscopy consults, women's health physiotherapy, Mat Pilates online, and Mat & Reformer STOTT Pilates for NRIs and international patients.",
          },
        ],
        knowsAbout: [
          "Women's hormonal health education and consultation",
          "Menstrual health and period disorders",
          "Fertility education and IVF consultation",
          "Pelvic health and women's health physiotherapy",
          "STOTT Pilates Mat and Reformer",
          "Obstetrics and gynecology (OB-GYN)",
          "IVF and fertility care",
          "Women's health physiotherapy",
          "Online Mat Pilates and women's health telehealth",
          "Pregnancy and postpartum rehabilitation",
          "Online telehealth for NRIs and global Indian diaspora",
        ],
        member: [{ "@id": charmiId }, { "@id": zalakId }],
      },
      {
        "@type": "Physician",
        "@id": charmiId,
        name: "Dr. Charmi Shah",
        medicalSpecialty: ["Obstetrics", "Gynecology", "Infertility", "ReproductiveMedicine"],
        jobTitle: "Obstetrician, Gynecologist (OB-GYN) & IVF Specialist",
        knowsAbout: [
          "High-risk obstetrics",
          "IVF, IUI, fertility evaluation",
          "Laparoscopic gynecologic surgery",
          "PCOS, endometriosis, menstrual disorders",
          `In-person OB-GYN in ${PRACTICE_CHARMI_IN_PERSON}; primary global access via online video consults for NRIs and international patients`,
        ],
        parentOrganization: { "@id": orgId },
        areaServed: [
          { "@type": "City", name: "Ahmedabad", containedInPlace: india },
          { "@type": "City", name: "Mumbai", containedInPlace: india },
        ],
        address: {
          "@type": "PostalAddress",
          addressLocality: "Mumbai",
          addressCountry: "IN",
        },
        telephone: CONTACT.phoneE164,
        email: CONTACT.email,
        url: SITE_URL,
      },
      {
        "@type": "Physician",
        "@id": zalakId,
        name: "Dr. Zalak Shah",
        medicalSpecialty: ["Physiotherapy", "PhysicalTherapy"],
        jobTitle: "Women's Health Physiotherapist & STOTT Pilates Instructor (Mat & Reformer)",
        knowsAbout: [
          "Pelvic floor rehabilitation",
          "Prenatal and postnatal physiotherapy",
          "Online STOTT Mat Pilates for international patients",
          "STOTT Pilates Mat equipment",
          "STOTT Pilates Reformer",
          "Musculoskeletal physiotherapy for women",
          `In-person women's health physiotherapy in ${PRACTICE_ZALAK_IN_PERSON}; primary global access via online classes and telehealth for NRIs worldwide`,
        ],
        parentOrganization: { "@id": orgId },
        areaServed: [
          { "@type": "City", name: "Ahmedabad", containedInPlace: india },
          { "@type": "City", name: "Bengaluru", containedInPlace: india },
        ],
        address: {
          "@type": "PostalAddress",
          addressLocality: "Bengaluru",
          addressCountry: "IN",
        },
        telephone: CONTACT.phoneE164,
        email: CONTACT.email,
        url: SITE_URL,
      },
      {
        "@type": "WebSite",
        "@id": websiteId,
        url: SITE_URL,
        name: SITE_NAME,
        description: DEFAULT_DESCRIPTION,
        inLanguage: ["en-IN", "en"],
        publisher: { "@id": orgId },
      },
      {
        "@type": ["MedicalClinic", "LocalBusiness"],
        "@id": `${SITE_URL}${ROUTES.ahmedabad}#clinic`,
        name: `${SITE_NAME} — Ahmedabad`,
        url: `${SITE_URL}${ROUTES.ahmedabad}`,
        telephone: CONTACT.phoneE164,
        email: CONTACT.email,
        parentOrganization: { "@id": orgId },
        areaServed: { "@type": "City", name: "Ahmedabad", containedInPlace: india },
      },
      {
        "@type": ["MedicalClinic", "LocalBusiness"],
        "@id": `${SITE_URL}${ROUTES.mumbai}#clinic`,
        name: `${SITE_NAME} — Mumbai`,
        url: `${SITE_URL}${ROUTES.mumbai}`,
        telephone: CONTACT.phoneE164,
        email: CONTACT.email,
        parentOrganization: { "@id": orgId },
        areaServed: { "@type": "City", name: "Mumbai", containedInPlace: india },
      },
      {
        "@type": ["MedicalClinic", "LocalBusiness"],
        "@id": `${SITE_URL}${ROUTES.bangalore}#clinic`,
        name: `${SITE_NAME} — Bengaluru (Bangalore)`,
        url: `${SITE_URL}${ROUTES.bangalore}`,
        telephone: CONTACT.phoneE164,
        email: CONTACT.email,
        parentOrganization: { "@id": orgId },
        areaServed: { "@type": "City", name: "Bengaluru", containedInPlace: india },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
    />
  );
}
