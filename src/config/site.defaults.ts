/**
 * Default SEO values (no `import.meta`). Imported by `site.ts` and `vite.config.ts`.
 * Override the public URL at build/runtime with `VITE_SITE_URL` in `.env`.
 * Maintainer context for agents: see `AGENTS.md` at the repository root.
 */
export const SITE_DEFAULT_URL = "https://womenshealthduo.com";

export const SITE_NAME = "Women's Health Duo";

export const DEFAULT_TITLE =
  "Women's Health Duo | OB-GYN, IVF & Women's Health Physio — Ahmedabad, Mumbai, Bangalore & Online Worldwide";

export const DEFAULT_DESCRIPTION =
  "Women's Health Duo: Dr. Charmi Shah (OB-GYN — obstetrics, gynecology, IVF, laparoscopy) and Dr. Zalak Shah (women's health physiotherapist, STOTT Pilates instructor — Mat & Reformer). Care and teaching for Ahmedabad, Mumbai, Bangalore, and global online consultations, classes, and women's wellness programs.";

export const KEYWORDS = [
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
  "online OB-GYN consultation worldwide",
  "online gynecology consultation India global",
  "virtual women's health classes",
  "online antenatal postnatal classes",
  "fertility treatment IVF IUI",
  "high risk pregnancy obstetrics",
  "PCOS endometriosis laparoscopic surgery",
  "postpartum physiotherapy online",
  "prenatal Pilates online classes",
  "Dr Charmi Shah OB-GYN",
  "Dr Zalak Shah physiotherapist Pilates",
  "Women's Health Duo",
  "WomensHealthDuo YouTube",
  "womens health duo Instagram",
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
