/** * Sitemap pathnames only , imported from `vite.config.ts` via `routes.ts`. * Keep this module free of `@/` path aliases so Node can resolve the chain. */
import { TOPIC_GUIDE_ROWS } from "./topicGuideRows";
export function topicGuideSitemapPaths(): string[] {
  return TOPIC_GUIDE_ROWS.map((r) => `/${r.slug}`).sort((a, b) => a.localeCompare(b));
}
