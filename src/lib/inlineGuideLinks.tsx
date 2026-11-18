import type { ReactNode } from "react";
import { AppLink as Link } from "@/components/router/AppLink";
import { TOPIC_GUIDE_ROWS } from "@/data/topicGuides/topicGuideRows";
import { isTopicGuideIndexable } from "@/data/topicGuides/topicGuideSitemapPaths";
import { publicPathname } from "@/lib/githubPagesPublicUrl";

/** A term worth opening, mapped to the page that explains it. Longer phrases are matched first. */
const TERM_TARGETS: readonly { phrase: string; slug: string }[] = [
  { phrase: "pelvic organ prolapse", slug: "pelvic-organ-prolapse" },
  { phrase: "polycystic ovary syndrome", slug: "what-is-pcos" },
  { phrase: "insulin resistance", slug: "pcos-insulin-resistance" },
  { phrase: "diastasis recti", slug: "what-is-diastasis-recti" },
  { phrase: "pelvic floor", slug: "what-is-the-pelvic-floor" },
  { phrase: "prenatal physiotherapy", slug: "what-is-prenatal-physiotherapy" },
  { phrase: "preconception planning", slug: "what-is-preconception-planning" },
  { phrase: "painful intercourse", slug: "can-pelvic-floor-therapy-help-with-painful-intercourse" },
  { phrase: "painful sex", slug: "can-pelvic-floor-therapy-help-with-painful-intercourse" },
  { phrase: "stress incontinence", slug: "why-do-i-leak-urine-when-i-cough" },
  { phrase: "bladder leakage", slug: "bladder-leakage" },
  { phrase: "urine leakage", slug: "why-do-i-leak-urine-when-i-cough" },
  { phrase: "irregular periods", slug: "why-are-my-periods-irregular" },
  { phrase: "painful periods", slug: "why-are-my-periods-painful" },
  { phrase: "heavy periods", slug: "what-causes-heavy-periods" },
  { phrase: "STOTT Pilates", slug: "what-is-stott-pilates" },
  { phrase: "folic acid", slug: "folic-acid-before-pregnancy" },
  { phrase: "endometriosis", slug: "endometriosis-symptoms-diagnosis" },
  { phrase: "perimenopause", slug: "perimenopause-symptoms" },
  { phrase: "morning sickness", slug: "pregnancy-nausea-when-to-seek-care" },
  { phrase: "positive pregnancy test", slug: "positive-pregnancy-test-next-steps" },
  { phrase: "early pregnancy bleeding", slug: "bleeding-in-early-pregnancy" },
  { phrase: "caesarean", slug: "how-to-recover-after-c-section" },
  { phrase: "C-section", slug: "how-to-recover-after-c-section" },
  { phrase: "ovulation", slug: "how-to-track-ovulation" },
  { phrase: "Kegels", slug: "are-kegels-right-for-everyone" },
  { phrase: "prolapse", slug: "pelvic-organ-prolapse" },
  { phrase: "PMDD", slug: "what-is-pmdd" },
  { phrase: "PCOS", slug: "what-is-pcos" },
  { phrase: "AMH", slug: "amh-test-fertility" },
  { phrase: "IUI", slug: "iui-vs-ivf" },
  { phrase: "IVF", slug: "what-is-ivf" },
  { phrase: "HRT", slug: "menopause-hrt-questions" },
];

const LIVE_SLUGS = new Set(TOPIC_GUIDE_ROWS.filter(isTopicGuideIndexable).map((row) => row.slug));

const TERMS = [...TERM_TARGETS]
  .filter((term) => LIVE_SLUGS.has(term.slug))
  .sort((a, b) => b.phrase.length - a.phrase.length);

const PATTERN = new RegExp(
  `(^|[^A-Za-z0-9])(${TERMS.map((term) => term.phrase.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|")})(?![A-Za-z0-9])`,
  "gi",
);

const BY_PHRASE = new Map(TERMS.map((term) => [term.phrase.toLowerCase(), term.slug]));

/** How many inline term links one article may add. */
export const INLINE_LINK_BUDGET = 8;

/**
 * Link the first useful mention of a term to the page that explains it.
 * Skips the page the reader is already on, and skips a target already linked in this article.
 */
export function linkInlineTerms(
  text: string,
  currentSlug: string,
  usedSlugs: Set<string>,
  budget: { left: number },
  maxPerParagraph = 2,
): ReactNode[] {
  if (!text || budget.left <= 0) return [text];
  const nodes: React.ReactNode[] = [];
  let cursor = 0;
  let added = 0;
  for (const match of text.matchAll(PATTERN)) {
    if (added >= maxPerParagraph || budget.left <= 0) break;
    const boundary = match[1] ?? "";
    const phrase = match[2] ?? "";
    const slug = BY_PHRASE.get(phrase.toLowerCase());
    const start = (match.index ?? 0) + boundary.length;
    if (!slug || slug === currentSlug || usedSlugs.has(slug) || start < cursor) continue;
    if (start > cursor) nodes.push(text.slice(cursor, start));
    nodes.push(
      <Link
        key={`${slug}-${start}`}
        to={publicPathname(`/${slug}`)}
        className="text-primary font-medium underline underline-offset-4"
      >
        {phrase}
      </Link>,
    );
    usedSlugs.add(slug);
    budget.left -= 1;
    added += 1;
    cursor = start + phrase.length;
  }
  if (cursor < text.length) nodes.push(text.slice(cursor));
  return nodes.length ? nodes : [text];
}
