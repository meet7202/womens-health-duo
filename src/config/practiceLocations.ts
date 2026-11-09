/**
 * Where each doctor sees patients (in person + virtual). Keep Contact, About, profiles, and SEO
 * blurbs aligned, do not use generic “locations on request” copy.
 *
 * Do not invent street addresses or claim a doctor is fixed to a centre on a given day —
 * in-person care is appointment-based; the brand is online-first.
 */
export const PRACTICE_CHARMI_IN_PERSON = "Mumbai, Ahmedabad, and Valsad";
export const PRACTICE_ZALAK_IN_PERSON = "Bangalore and Ahmedabad";

export const PRACTICE_CHARMI_LOCATIONS_LINE = `In person in ${PRACTICE_CHARMI_IN_PERSON}, and virtual visits worldwide.`;

export const PRACTICE_ZALAK_LOCATIONS_LINE = `In person in ${PRACTICE_ZALAK_IN_PERSON}, and virtual visits worldwide.`;

/** Compact (About cards, etc.) */
export const PRACTICE_CHARMI_LOCATIONS_SHORT = "Mumbai, Ahmedabad, Valsad, and virtual";
export const PRACTICE_ZALAK_LOCATIONS_SHORT = "Bangalore, Ahmedabad, and virtual";

/** Shared practice hours (India) — both doctors; do not invent per-centre schedules. */
export const PRACTICE_HOURS_LINE = "Monday–Saturday, 9:00 AM–6:00 PM (India)";

/**
 * Online-first booking note for Contact and similar surfaces.
 * In-person slots are arranged on request — never imply walk-in or fixed doctor/day rosters.
 */
export const PRACTICE_IN_PERSON_BOOKING_LINE =
  "Women's Health Duo is online-first. In-person visits at our India centres are by appointment — contact us for available slots. Doctors are not fixed to a single centre schedule.";

/** Virtual / global pages: both doctors, one sentence */
export const PRACTICE_BOTH_DOCTORS_IN_PERSON =
  "Dr. Charmi Shah in person in Mumbai, Ahmedabad, and Valsad; Dr. Zalak Shah in person in Bangalore and Ahmedabad, both offer virtual visits worldwide.";
