/** Sitemap pathnames — no `@/` imports (loaded from `vite.config.ts` via `routes.ts`). */
import { internationalServiceSitemapPaths } from "./internationalServiceRegistry";

export function internationalConsultationSitemapPaths(): string[] {
  return internationalServiceSitemapPaths();
}
