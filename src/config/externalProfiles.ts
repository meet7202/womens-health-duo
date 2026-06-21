/**
 * Third-party profile links (not in JSON-LD `sameAs`; see `AGENTS.md`).
 * Keep URLs accurate; prefer official profile pages over search pages.
 */
export const EXTERNAL = {
  drCharmi: {
    linkedIn: "https://www.linkedin.com/in/charmi-shah-7154001a4/",
    pharmEasyEditorial: "https://pharmeasy.in/legal/editorial-policy/dr-charmi-shah-80",
  },
  drZalak: {
    linkedIn: "https://www.linkedin.com/in/izalakshah/",
    /** Google Maps / Business Profile share links (separate listings per city). */
    googleBusinessAhmedabad: "https://share.google/Dvx1j3yYqsuo2MvDV",
    googleBusinessBangalore: "https://share.google/kjTkctZb9U7bOcpIE",
    /** Patient-facing link to read additional Google reviews (same listing / share hub). */
    googleReviewsShare: "https://share.google/OvzmpQG6sVAO0YPRx",
  },
} as const;
