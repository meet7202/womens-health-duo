import { CHARMI_HUB_ARTICLES } from "./charmiCareHubs";
import type { CalendarArticleRevision } from "./types";
import { ZALAK_HUB_ARTICLES } from "./zalakCareHubs";

/**
 * Hand-authored bodies for hub guides that previously rendered thin cluster scaffolds.
 * Merged in `articles/index.ts` over the generated calendar catalog.
 * Explainer SVGs: `node scripts/generate-hub-explainers.mjs`.
 */
export const HUB_CALENDAR_ARTICLES: readonly CalendarArticleRevision[] = [
  ...ZALAK_HUB_ARTICLES,
  ...CHARMI_HUB_ARTICLES,
];
