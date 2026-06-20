import { PRACTICE_BOTH_DOCTORS_IN_PERSON } from "./practiceLocations";

/**
 * Default SEO values (no `import.meta`). Imported by `site.ts` and `vite.config.ts`.
 * Override the public URL at build/runtime with `VITE_SITE_URL` in `.env`.
 * Maintainer context for agents: see `AGENTS.md` at the repository root.
 */
export const SITE_DEFAULT_URL = "https://womenshealthduo.com";

export const SITE_NAME = "Women's Health Duo";

export const DEFAULT_TITLE =
  "Women's Health Duo | Online OB-GYN, IVF & Women's Health Physio / STOTT Pilates";

export const DEFAULT_DESCRIPTION = `Video OB-GYN, IVF, and laparoscopy consults with Dr. Charmi Shah; online women's health physiotherapy, Mat Pilates online, and STOTT Pilates (Mat & Reformer) with Dr. Zalak Shah—for international and NRI patients from anywhere, no travel required. ${PRACTICE_BOTH_DOCTORS_IN_PERSON} WhatsApp +91 79905 50754.`;

export const KEYWORDS = [
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
