/**
 * One factual sentence for the About section: brand, both doctors, correct clinical lanes.
 * Name spellings patients type live in the alias lists below and are emitted only as
 * JSON-LD `alternateName` (`JsonLd.tsx`). Do not print those lists as visible page copy.
 */
export const BRAND_ENTITY_LINE =
  "Women's Health Duo: Dr. Charmi Shah (OB-GYN / IVF) & Dr. Zalak Shah (women's health physiotherapy and Pilates).";

/** Spellings patients type. The apostrophe form stays the canonical `SITE_NAME`. */
export const BRAND_NAME_ALIASES = [
  "Womens Health Duo",
  "WomensHealthDuo",
  "womens-health-duo",
] as const;

/** Spacing and role forms already true of Dr. Charmi Shah. No extra surname. */
export const CHARMI_NAME_ALIASES = [
  "Dr Charmi Shah",
  "Dr. Charmi",
  "Charmi Shah",
  "Dr. Charmi Shah OB-GYN",
  "Dr. Charmi Shah OBG",
  "Dr. Charmi Shah gynecologist",
] as const;

/** Spacing and role forms already true of Dr. Zalak Shah (PT). */
export const ZALAK_NAME_ALIASES = [
  "Dr Zalak Shah",
  "Dr. Zalak Shah (PT)",
  "Dr. Zalak Shah PT",
  "Dr. Zalak",
  "Zalak Shah",
  "Zalak Shah PT",
  "Zalak Shah Pilates",
  "Zalak Shah women's health physiotherapist",
] as const;
