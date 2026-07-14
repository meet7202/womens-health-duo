/** Doctor + topic heuristics for Instagram hub imports. */

/** @type {Record<string, 'charmi' | 'zalak' | 'both'>} */
export const DOCTOR_BY_SHORTCODE = {
  C_dLUa9sfTn: "both",
  C_NsexcoYfL: "zalak",
  C_qowK2MIxD: "zalak",
  "C-f5gAqy1uw": "charmi",
  "C-nIel4PQ7c": "zalak",
  "C-ZgtIvo5eO": "zalak",
  C09iPSwBT7y: "zalak",
  "C1Zbg47P-kR": "zalak",
  C2xvfmRyEGv: "zalak",
  C35YLOyvogr: "zalak",
  C3N0I7ev7Hz: "charmi",
  C3vcwtXsBGA: "charmi",
  "C4-g2JsPYiN": "zalak",
  C4BMCJJMOhS: "charmi",
  C4PiuvpvqTW: "zalak",
  C5d9uYWPKiq: "both",
  C5q0ulCPebl: "charmi",
  "C5Tn-LjsPl1": "charmi",
  C5yWQQfv2Jh: "zalak",
  C6MJR0HMnHh: "zalak",
  C6Vkatbsy90: "charmi",
  C6vSB2CvWxM: "zalak",
  C7obWRrIHOv: "charmi",
  C7vn8TIIvA6: "charmi",
  C81n8KMvST5: "zalak",
  C8woZSqPKxG: "charmi",
  C8XGwTeMgKl: "both",
  C9C0BnxvFsk: "both",
  C9Kk7mcvX2w: "both",
  C9ppwbmPlHO: "charmi",
  C9VA9nesvSR: "charmi",
  "Cq-XELBNuCD": "charmi",
  Cq3dQxMMXHh: "charmi",
  CqBUs71jvL9: "charmi",
  CqD2CJQD7qE: "charmi",
  CqqLO7eMQg9: "charmi",
  Cr1OtdaNNn4: "both",
  Cr5Rq_4rprT: "zalak",
  CrbRnvgx1GI: "charmi",
  "Crq-s9HunFf": "zalak",
  CrTwRv0usI2: "charmi",
  CrYp_KMu1oN: "zalak",
  CsHBPsLs9fX: "charmi",
  CsN6sVoO6vN: "both",
  "CsRgQ9lNLT-": "charmi",
  Ct5r23AO3Wg: "zalak",
  Cte0_adR3zK: "charmi",
  CtMofTou8Rh: "both",
  CtpCDALtmRW: "zalak",
  "Cv-XloGr7KJ": "charmi",
  CvNWLgFMe5_: "charmi",
  Cw8EBdFPWSF: "zalak",
  Cw9r71QuEwz: "zalak",
  CzopF3GPwWw: "charmi",
  "CzthO2YPP4-": "charmi",
  DAbmdQFMZlZ: "charmi",
  DB_bhFnvgIH: "charmi",
  "DB3-9-IPOb1": "charmi",
  DB6TRQFPIPr: "charmi",
  DBK8xY4i1_O: "zalak",
  DBoZHPlPssz: "zalak",
  DBtawiyP_m_: "both",
  DBzB8ObKh2Z: "charmi",
  DCEXHPbP8ni: "charmi",
  DCLorU8Pxpt: "charmi",
  DDWugHgMHwo: "charmi",
  DEABxNOvzKp: "zalak",
  DGyILQ4T6Wj: "charmi",
  DH3wR8KPdUE: "charmi",
  DJhBSQFPxkZ: "both",
  DJKFBsDvaay: "zalak",
  DKfDzaNswqn: "zalak",
  DKH4ZKlvUS8: "charmi",
  DKwVyeisESI: "both",
  DUasgQGEmg0: "zalak",
  DUCvheaEUY3: "zalak",
  DUk2Fewkns0: "zalak",
  DUsIjT6kTwQ: "zalak",
  DUVh_ozEk76: "zalak",
  DVnaJyxkd8i: "both",
  DWoTVNVCtZv: "zalak",
  DWWFtm3ihOJ: "zalak",
  DX1ZnUAK3pA: "zalak",
  DX6vG2GKX9x: "zalak",
  DXouBqQCrEb: "zalak",
  DXwe1TixF7x: "charmi",
  DYKFon3qkbc: "charmi",
  DYMz5WVKYHd: "charmi",
  "DYPBbLNzQV-": "zalak",
  DYZgxUOK5Nv: "zalak",
  DZpXJSCKjbC: "charmi",
  DaAzLDrqHqN: "zalak",
  DaPtDAWqvYA: "both",
  DaPwUfMq3W4: "both",
  "DasHzcwKK-U": "both",
};

/** @param {unknown} post scraped Instagram row */
export function doctorFromInstagramRow(post) {
  const code = String(post?.shortCode ?? "").trim();
  if (code && DOCTOR_BY_SHORTCODE[code]) return DOCTOR_BY_SHORTCODE[code];

  const caption = String(post?.caption ?? "").toLowerCase();
  /** @type {string[]} */
  const tagged = (post?.taggedUsers ?? []).map((u) => String(u?.username ?? "").toLowerCase());

  const taggedCharmi = tagged.includes("i.charmishah");
  const taggedZalak = tagged.includes("_zalakshah_") || tagged.includes("zalakshah");
  if (taggedCharmi && taggedZalak) return "both";
  if (taggedZalak) return "zalak";
  if (taggedCharmi) return "charmi";

  const hasCharmi =
    caption.includes("@i.charmishah") ||
    caption.includes("charmishah") ||
    caption.includes("dr. charmi") ||
    caption.includes("dr charmi") ||
    /\b(obgyn|ob-gyn|gynecolog|gynaecolog|obstetric|ivf|laparoscop)\b/.test(caption);

  const hasZalak =
    caption.includes("@_zalakshah_") ||
    caption.includes("@zalakshah") ||
    caption.includes("dr. zalak") ||
    caption.includes("dr zalak") ||
    /\b(physiother|pilates|pelvic floor|stott|reformer|contrology)\b/.test(caption);

  if (hasCharmi && hasZalak) return "both";
  if (hasZalak) return "zalak";
  if (hasCharmi) return "charmi";
  return "both";
}

/** @type {{ topic: string; re: RegExp }[]} */
const TOPIC_RULES = [
  { topic: "STOTT Pilates", re: /\bstott\b/i },
  { topic: "Pilates", re: /\b(pilates|reformer|contrology|mat pilates)\b/i },
  { topic: "Labor & delivery", re: /\b(labor|labour|childbirth|birthing|delivery)\b/i },
  { topic: "Pelvic floor", re: /\b(pelvic floor|kegel|incontinence|diastasis|prolapse)\b/i },
  { topic: "Fertility", re: /\b(fertility|ivf|iui|trying to conceive|ttc|ovulation)\b/i },
  {
    topic: "Pregnancy",
    re: /\b(pregnan|prenatal|postpartum|trimester|gestational|c-section|c section)\b/i,
  },
  { topic: "Exercise", re: /\b(exercise|workout|training|hiit|yoga|menstrual cycle)\b/i },
  {
    topic: "Menstrual health",
    re: /\b(period|menstrual|menopause|pcos|endometri|dysmenorrhea)\b/i,
  },
  { topic: "Patient education", re: /\b(awareness|did you know|myth|tips|education)\b/i },
];

/**
 * @param {unknown} post
 * @param {"reel" | "carousel" | "image" | "youtube"} mediaKind
 */
export function topicsFromInstagramRow(post, mediaKind) {
  const caption = String(post?.caption ?? "");
  const hashtags = (post?.hashtags ?? []).map((h) => `#${h}`).join(" ");
  const text = `${caption} ${hashtags}`;

  /** @type {Set<string>} */
  const topics = new Set();
  for (const { topic, re } of TOPIC_RULES) {
    if (re.test(text)) topics.add(topic);
  }

  if (mediaKind === "reel") topics.add("Reels");
  if (mediaKind === "carousel") topics.add("Carousel");
  if (mediaKind === "image") topics.add("Posts");
  // YouTube rows use clinical topics only (no platform tag).

  if (topics.size === 0) topics.add("Women's health");
  else if (
    topics.size === 1 &&
    (topics.has("Reels") || topics.has("Carousel") || topics.has("Posts"))
  ) {
    topics.add("Women's health");
  }

  return [...topics].slice(0, 5);
}

/** @param {string} caption */
export function titleFromCaption(caption, fallback) {
  const line = caption
    .split("\n")
    .map((l) => l.trim())
    .find((l) => l.length >= 12);
  if (!line) return fallback;
  return line.length > 120 ? `${line.slice(0, 117)}…` : line;
}

/** @param {unknown} row */
export function isInstagramReelRow(row) {
  return (
    row &&
    typeof row === "object" &&
    typeof row.shortCode === "string" &&
    (row.productType === "clips" || (row.type === "Video" && row.videoDuration))
  );
}

/** @param {unknown} row */
export function isInstagramCarouselRow(row) {
  return row && typeof row === "object" && row.productType === "carousel_container";
}

/** @param {unknown} row */
export function isInstagramFeedImageRow(row) {
  return row && typeof row === "object" && row.productType === "feed" && row.type === "Image";
}
