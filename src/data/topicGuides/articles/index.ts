export type {
  ArticleClaimLedgerEntry,
  ArticleFigure,
  ArticleInlineLink,
  ArticlePublicationStatus,
  CalendarArticleRevision,
} from "./types";

import {
  CALENDAR_ARTICLES as GENERATED_CALENDAR_ARTICLES,
  calendarArticleBodyText as generatedCalendarArticleBodyText,
} from "./catalog.generated";
import { HUB_CALENDAR_ARTICLES } from "./hubBodies";
import type { CalendarArticleRevision } from "./types";

/** Generated calendar programme plus hand-authored hub bodies (hubs win on slug clash). */
export const CALENDAR_ARTICLES: readonly CalendarArticleRevision[] = (() => {
  const bySlug = new Map<string, CalendarArticleRevision>();
  for (const article of GENERATED_CALENDAR_ARTICLES) bySlug.set(article.slug, article);
  for (const article of HUB_CALENDAR_ARTICLES) bySlug.set(article.slug, article);
  return [...bySlug.values()];
})();

export const CALENDAR_ARTICLE_BY_ID: ReadonlyMap<string, CalendarArticleRevision> = new Map(
  CALENDAR_ARTICLES.map((a) => [a.id, a]),
);

export const CALENDAR_ARTICLE_BY_SLUG: ReadonlyMap<string, CalendarArticleRevision> = new Map(
  CALENDAR_ARTICLES.map((a) => [a.slug, a]),
);

/** Published calendar or hub body. Drafts stay off the public site. */
export function publishedArticleForSlug(slug: string): CalendarArticleRevision | undefined {
  const a = CALENDAR_ARTICLE_BY_SLUG.get(slug);
  return a?.publicationStatus === "published" ? a : undefined;
}

export function calendarArticleBodyText(slug: string): string | undefined {
  const hub = publishedArticleForSlug(slug);
  if (hub?.bodyFingerprintText) return hub.bodyFingerprintText;
  return generatedCalendarArticleBodyText(slug);
}
