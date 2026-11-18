/**
 * Sitemap pathnames only — imported from `vite.config.ts` via `routes.ts`.
 * Keep this module free of `@/` path aliases so Node can resolve the chain.
 */
import { TOPIC_GUIDE_ROWS } from "./topicGuideRows";

/** True unless the row explicitly sets `indexable: false`. */
export function isTopicGuideIndexable(row: { indexable?: boolean }): boolean {
  return row.indexable !== false;
}

export function topicGuideSitemapPaths(): string[] {
  return TOPIC_GUIDE_ROWS.filter(isTopicGuideIndexable)
    .map((r) => `/${r.slug}`)
    .sort((a, b) => a.localeCompare(b));
}
