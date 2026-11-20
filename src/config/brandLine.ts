/**
 * Repeated entity line for humans + AI: brand ↔ doctors ↔ roles.
 * Use in visible chrome (footer, About, doctor profiles); keep tone factual.
 */
export const BRAND_ENTITY_LINE =
  "Women's Health Duo: Dr. Charmi Shah (OB-GYN / IVF) & Dr. Zalak Shah (women's health physiotherapy and Pilates).";

/** Spellings patients type. The apostrophe form stays the canonical `SITE_NAME`. */
export const BRAND_NAME_ALIASES = [
  "Womens Health Duo",
  "WomensHealthDuo",
  "womens-health-duo",
] as const;

export const BRAND_ALSO_WRITTEN =
  "Also written Womens Health Duo, WomensHealthDuo, and womens-health-duo.";

/** Spacing and role forms already true of Dr. Charmi Shah. No extra surname. */
export const CHARMI_NAME_ALIASES = [
  "Dr Charmi Shah",
  "Dr. Charmi",
  "Charmi Shah",
  "Dr. Charmi Shah OB-GYN",
  "Dr. Charmi Shah OBG",
  "Dr. Charmi Shah gynecologist",
] as const;

export const CHARMI_ALSO_WRITTEN =
  "Also written Dr Charmi Shah, Dr. Charmi, Charmi Shah, and Dr. Charmi Shah OBG. She is an obstetrician and gynecologist.";

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

export const ZALAK_ALSO_WRITTEN =
  "Also written Dr Zalak Shah, Dr. Zalak Shah PT, Dr. Zalak, and Zalak Shah. Zalak Shah teaches Pilates and women's health physiotherapy.";
