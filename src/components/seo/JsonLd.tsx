import {
  SITE_URL,
  SITE_NAME,
  DEFAULT_DESCRIPTION,
  CONTACT,
  OG_IMAGE_PATH,
} from "@/config/site";

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
        "@type": "MedicalOrganization",
        "@id": orgId,
        name: SITE_NAME,
        url: SITE_URL,
        logo: `${SITE_URL}/favicon.ico`,
        image: ogImage,
        description: DEFAULT_DESCRIPTION,
        email: CONTACT.email,
        telephone: CONTACT.phoneE164,
        sameAs: [CONTACT.instagram],
        areaServed: [
          { "@type": "City", name: "Ahmedabad", containedInPlace: india },
          { "@type": "City", name: "Mumbai", containedInPlace: india },
          { "@type": "City", name: "Bangalore", containedInPlace: india },
          {
            "@type": "Place",
            name: "Worldwide",
            description:
              "Online OB-GYN consultations, women's health physiotherapy guidance, and Mat & Reformer Pilates classes for patients and students globally.",
          },
        ],
        knowsAbout: [
          "Obstetrics and gynecology (OB-GYN)",
          "IVF and fertility care",
          "Women's health physiotherapy",
          "STOTT Pilates Mat and Reformer",
          "Pregnancy and postpartum rehabilitation",
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
          "Online OB-GYN consultations for Ahmedabad, Mumbai, Bangalore and worldwide",
        ],
        parentOrganization: { "@id": orgId },
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
        jobTitle:
          "Women's Health Physiotherapist & STOTT Pilates Instructor (Mat & Reformer)",
        knowsAbout: [
          "Pelvic floor rehabilitation",
          "Antenatal and postnatal physiotherapy",
          "STOTT Pilates Mat equipment",
          "STOTT Pilates Reformer",
          "Musculoskeletal physiotherapy for women",
          "Online women's health physio and Pilates classes worldwide",
        ],
        parentOrganization: { "@id": orgId },
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
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
    />
  );
}
