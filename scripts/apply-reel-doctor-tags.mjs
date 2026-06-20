#!/usr/bin/env node
/**
 * Applies `doctor` tags on `knowledgeHubInstagramReels.json` from a curated map.
 * Map is built from Instagram oEmbed captions (public) + channel roles:
 * Dr. Charmi → OB-GYN / gynecology lead; Dr. Zalak → women’s health physio / Pilates lead;
 * `both` → true duo messaging or unavailable media.
 *
 * Regenerate oEmbed snapshot: `node scripts/fetch-instagram-reel-oembed.mjs > /tmp/reel-oembed.jsonl`
 */
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("..", import.meta.url));
const jsonPath = `${root}/src/data/knowledgeHubInstagramReels.json`;

/** @type {Record<string, 'charmi' | 'zalak' | 'both'>} */
const DOCTOR_BY_REEL = {
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
};

const rows = JSON.parse(readFileSync(jsonPath, "utf8"));
let missing = 0;
for (const row of rows) {
  const d = DOCTOR_BY_REEL[row.instagramReelId];
  if (!d) {
    console.error("Missing map entry for", row.instagramReelId);
    missing += 1;
    continue;
  }
  row.doctor = d;
}
if (missing) process.exit(1);
writeFileSync(jsonPath, `${JSON.stringify(rows, null, 2)}\n`, "utf8");
console.log(`Updated ${rows.length} reels.`);
