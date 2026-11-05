import {
  SITE_URL,
  SITE_NAME,
  DEFAULT_DESCRIPTION,
  CONTACT,
  OG_IMAGE_PATH,
  ORGANIZATION_SCHEMA_DESCRIPTION,
} from "@/config/site";
import { ROUTES } from "@/config/routes";
import { githubPagesAbsoluteUrl } from "@/lib/githubPagesPublicUrl";
import { PRACTICE_CHARMI_IN_PERSON, PRACTICE_ZALAK_IN_PERSON } from "@/config/practiceLocations";
import { DOCTOR_REGISTRATION } from "@/config/doctorRegistration";
import { physicianImageObject } from "@/components/seo/schema/mediaImages";

/**
 * Schema.org structured data for search engines and AI crawlers.
 */
export function JsonLd() {
  const origin = githubPagesAbsoluteUrl(SITE_URL, "/");
  const orgId = `${origin}#organization`;
  const websiteId = `${origin}#website`;
  const charmiId = `${origin}#physician-charmi`;
  const zalakId = `${origin}#physician-zalak`;
  const ogImage = githubPagesAbsoluteUrl(SITE_URL, OG_IMAGE_PATH);
  const charmiImage = physicianImageObject("charmi");
  const zalakImage = physicianImageObject("zalak");

  const india = { "@type": "Country" as const, name: "India" };

  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["MedicalOrganization", "Organization"],
        "@id": orgId,
        name: SITE_NAME,
        url: origin,
        logo: ogImage,
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
          { "@type": "City", name: "Valsad", containedInPlace: india },
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
        // Schema.org MedicalSpecialty members only (Obstetric / Gynecologic). IVF & laparoscopy → knowsAbout.
        medicalSpecialty: ["Obstetric", "Gynecologic"],
        jobTitle: "Obstetrician, Gynecologist (OB-GYN) & IVF Specialist",
        description:
          "Obstetrician and gynecologist with fellowship training in laparoscopy and IVF; high-risk pregnancy, fertility pathways, and minimally invasive gynecologic surgery.",
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
          { "@type": "City", name: "Valsad", containedInPlace: india },
        ],
        address: {
          "@type": "PostalAddress",
          addressLocality: "Mumbai",
          addressCountry: "IN",
        },
        telephone: CONTACT.phoneE164,
        email: CONTACT.email,
        url: origin,
        image: charmiImage,
        hasCredential: {
          "@type": "EducationalOccupationalCredential",
          credentialCategory: "Medical registration",
          identifier: DOCTOR_REGISTRATION.charmi.registrationNumber,
          recognizedBy: {
            "@type": "Organization",
            name: DOCTOR_REGISTRATION.charmi.registrationCouncil,
          },
        },
      },
      {
        // Person (not Physician): allied-health physiotherapist — avoid overclaiming MD Physician.
        // Physiotherapy specialty lives in jobTitle / knowsAbout (medicalSpecialty is not a Person domain).
        "@type": "Person",
        "@id": zalakId,
        name: "Dr. Zalak Shah",
        jobTitle: "Women's Health Physiotherapist & STOTT Pilates Instructor (Mat & Reformer)",
        description:
          "Women's health physiotherapist (BPT, MPT) and STOTT Pilates Instructor (Mat & Reformer); pelvic floor, prenatal/postnatal rehab, and musculoskeletal physiotherapy for women.",
        knowsAbout: [
          "Women's health physiotherapy",
          "Physiotherapy",
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
        url: origin,
        image: zalakImage,
        hasCredential: {
          "@type": "EducationalOccupationalCredential",
          credentialCategory: "Physiotherapy registration",
          identifier: DOCTOR_REGISTRATION.zalak.registrationNumber,
          recognizedBy: {
            "@type": "Organization",
            name: DOCTOR_REGISTRATION.zalak.registrationCouncil,
          },
        },
      },
      {
        "@type": "WebSite",
        "@id": websiteId,
        url: origin,
        name: SITE_NAME,
        description: DEFAULT_DESCRIPTION,
        inLanguage: ["en-IN", "en"],
        publisher: { "@id": orgId },
      },
      {
        "@type": ["MedicalClinic", "LocalBusiness"],
        "@id": `${githubPagesAbsoluteUrl(SITE_URL, ROUTES.ahmedabad)}#clinic`,
        name: `${SITE_NAME} ,  Ahmedabad`,
        url: githubPagesAbsoluteUrl(SITE_URL, ROUTES.ahmedabad),
        telephone: CONTACT.phoneE164,
        email: CONTACT.email,
        parentOrganization: { "@id": orgId },
        areaServed: { "@type": "City", name: "Ahmedabad", containedInPlace: india },
        medicalSpecialty: ["Obstetric", "Gynecologic", "Physiotherapy"],
        description:
          "In-person OB-GYN, IVF and laparoscopy with Dr. Charmi Shah and women's health physiotherapy / STOTT Pilates with Dr. Zalak Shah in Ahmedabad.",
        knowsAbout: [
          "IVF, IUI, and fertility evaluation",
          "Laparoscopic gynecologic surgery",
          "Women's health physiotherapy",
        ],
      },
      {
        "@type": ["MedicalClinic", "LocalBusiness"],
        "@id": `${githubPagesAbsoluteUrl(SITE_URL, ROUTES.mumbai)}#clinic`,
        name: `${SITE_NAME} ,  Mumbai`,
        url: githubPagesAbsoluteUrl(SITE_URL, ROUTES.mumbai),
        telephone: CONTACT.phoneE164,
        email: CONTACT.email,
        parentOrganization: { "@id": orgId },
        areaServed: { "@type": "City", name: "Mumbai", containedInPlace: india },
        medicalSpecialty: ["Obstetric", "Gynecologic"],
        description:
          "In-person OB-GYN, IVF and laparoscopy with Dr. Charmi Shah in Mumbai; Dr. Zalak Shah's physiotherapy is online worldwide and in person in Bangalore and Ahmedabad.",
        knowsAbout: [
          "IVF, IUI, and fertility evaluation",
          "Laparoscopic gynecologic surgery",
          "High-risk pregnancy planning",
        ],
      },
      {
        "@type": ["MedicalClinic", "LocalBusiness"],
        "@id": `${githubPagesAbsoluteUrl(SITE_URL, ROUTES.valsad)}#clinic`,
        name: `${SITE_NAME} ,  Valsad`,
        url: githubPagesAbsoluteUrl(SITE_URL, ROUTES.valsad),
        telephone: CONTACT.phoneE164,
        email: CONTACT.email,
        parentOrganization: { "@id": orgId },
        areaServed: { "@type": "City", name: "Valsad", containedInPlace: india },
        medicalSpecialty: ["Obstetric", "Gynecologic"],
        description:
          "In-person OB-GYN, IVF and laparoscopy with Dr. Charmi Shah in Valsad; Dr. Zalak Shah's physiotherapy is online worldwide and in person in Bangalore and Ahmedabad.",
        knowsAbout: [
          "IVF, IUI, and fertility evaluation",
          "Laparoscopic gynecologic surgery",
          "High-risk pregnancy planning",
        ],
      },
      {
        "@type": ["MedicalClinic", "LocalBusiness"],
        "@id": `${githubPagesAbsoluteUrl(SITE_URL, ROUTES.bangalore)}#clinic`,
        name: `${SITE_NAME} ,  Bengaluru (Bangalore)`,
        url: githubPagesAbsoluteUrl(SITE_URL, ROUTES.bangalore),
        telephone: CONTACT.phoneE164,
        email: CONTACT.email,
        parentOrganization: { "@id": orgId },
        areaServed: { "@type": "City", name: "Bengaluru", containedInPlace: india },
        medicalSpecialty: ["Physiotherapy"],
        description:
          "In-person women's health physiotherapy and STOTT Pilates with Dr. Zalak Shah in Bengaluru; Dr. Charmi Shah offers online OB-GYN worldwide and in-person care in Mumbai, Ahmedabad, and Valsad.",
        knowsAbout: [
          "Women's health physiotherapy",
          "Pelvic floor rehabilitation",
          "STOTT Pilates Mat and Reformer",
        ],
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
