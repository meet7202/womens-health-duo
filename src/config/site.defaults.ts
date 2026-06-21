/**
 * Default SEO values (no `import.meta`). Imported by `site.ts` and `vite.config.ts`.
 * Override the public URL at build/runtime with `VITE_SITE_URL` in `.env`.
 * Maintainer context for agents: see `AGENTS.md` at the repository root.
 */
export const SITE_DEFAULT_URL = "https://womenshealthduo.com";

export const SITE_NAME = "Women's Health Duo";

/**
 * Entity scope line: Learn hub stripe, organization/schema copy. Education plus booked clinical care.
 */
export const HOME_ENTITY_DEFINITION =
  "Women's Health Duo pairs women's health education with booked medical consultations. We focus on hormones, menstrual health, fertility, pelvic health, women's health physiotherapy, and movement-based care you can sustain between visits.";

/** Homepage hero lede only (first body paragraph under the H1). */
export const HOME_HERO_LEDE =
  "Comprehensive care from pregnancy to postpartum, fertility to pelvic health. We combine medical expertise with physiotherapy and STOTT Pilates for complete wellness.";

/** Rich MedicalOrganization description for schema.org (may exceed meta length). */
export const ORGANIZATION_SCHEMA_DESCRIPTION = `${HOME_ENTITY_DEFINITION} Dr. Charmi Shah (OB-GYN, IVF, laparoscopy) and Dr. Zalak Shah (women's health physiotherapy and STOTT Pilates on Mat and Reformer) lead the work. We film explainers and see patients in India and online; we do not retail supplements or vitamins.`;

/** Keep under ~60 characters for SERP title width and SEO audit tools. */
export const DEFAULT_TITLE = "Women's Health Duo | Hormones, Fertility & STOTT Pilates";

/** Target ~150–160 characters for meta description audits (HTML + OG + Twitter). */
export const DEFAULT_DESCRIPTION =
  "Women's Health Duo: OB-GYN/IVF and physio-led women's health education plus consults in India and online. Hormones, periods, fertility, pelvic health, STOTT Pilates. WhatsApp +917990550754.";

export const KEYWORDS = [
  "womens health duo clinical education consultation",
  "women's health education platform consultation",
  "hormonal health consultation online",
  "menstrual health telehealth India",
  "fertility education IVF consultation online",
  "STOTT Pilates women's health India online",
  "online OB-GYN consultation worldwide",
  "online gynecologist India NRI",
  "Indian gynecologist online Dubai UAE",
  "online women's health physiotherapy global",
  "online pelvic floor physiotherapy NRI",
  "telehealth OB-GYN Indian diaspora",
  "online IVF consultation second opinion",
  "online STOTT Pilates women's health Mat Reformer",
  "online Mat Pilates women's health STOTT",
  "STOTT Mat Pilates online classes",
  "online antenatal postnatal classes worldwide",
  "OB-GYN India",
  "obstetrician gynecologist Ahmedabad",
  "gynecologist Mumbai",
  "gynecologist Valsad",
  "gynecologist Bangalore",
  "gynecologist Ahmedabad",
  "IVF specialist Mumbai Ahmedabad Bangalore",
  "women's health physiotherapist online",
  "women's health physiotherapist Mumbai Bangalore Ahmedabad",
  "pelvic floor physiotherapy online India",
  "STOTT Pilates Mat Reformer",
  "mat Pilates women's health",
  "reformer Pilates women's health",
  "Pilates instructor Mat and Reformer India",
  "online gynecology consultation India global",
  "virtual women's health classes",
  "online antenatal postnatal classes",
  "fertility treatment IVF IUI",
  "high risk pregnancy obstetrics",
  "PCOS endometriosis laparoscopic surgery",
  "postpartum physiotherapy online",
  "prenatal Pilates online classes",
  "prenatal postnatal physiotherapy online",
  "Dr Charmi Shah OB-GYN",
  "Dr Zalak Shah physiotherapist Pilates",
  "Women's Health Duo",
  "WomensHealthDuo YouTube",
  "womens health duo Instagram",
  "online gynecologist London Indian",
  "online gynecologist Singapore NRI",
  "online gynecologist Toronto Canada",
  "online gynecologist Sydney Melbourne Australia",
  "online gynecologist New York USA",
  "online gynecologist San Francisco Bay Area",
  "online women's health telehealth Europe",
  "online women's health Middle East",
  "NRI women's health online",
  "telemedicine gynecologist India",
  "video gynecologist consultation India diaspora",
  "online laparoscopy consult gynecology India",
  "endometriosis online consultation India",
  "PCOS telehealth gynecologist Indian",
  "fibroid treatment second opinion online",
  "menopause telehealth India women's health",
  "high risk pregnancy telemedicine India",
  "IUI IVF teleconsultation India",
  "postpartum pelvic floor therapy online",
  "diastasis recti physiotherapy online India",
  "women's health telemedicine USA India doctor",
  "Indian OB-GYN online Middle East",
  "online women's health physiotherapy GCC",
  "virtual pregnancy exercise physiotherapist",
  "birth preparation online physiotherapy",
  "urinary incontinence women's physio online",
  "core strength postpartum online program",
  "women's musculoskeletal physio online",
  "holistic women's wellness program online",
  "Dr Charmi Shah IVF laparoscopy Mumbai",
  "Dr Zalak Shah STOTT Pilates Bangalore Ahmedabad",
  "womenshealthduo.com online consultation",
  "Women's Health Duo sitemap virtual cities",
].join(", ");

/** Public profiles (no Twitter/X). Used in JSON-LD `sameAs` and docs. */
export const CONTACT = {
  email: "womenshealthduo@gmail.com",
  phoneE164: "+917990550754",
  instagram: "https://www.instagram.com/womenshealthduo",
  youtube: "https://www.youtube.com/@WomensHealthDuo",
  /** Same WhatsApp number as site CTAs (E.164 without + for wa.me). */
  whatsappUrl: "https://wa.me/917990550754",
} as const;

export const OG_IMAGE_PATH = "/favicon.svg";
