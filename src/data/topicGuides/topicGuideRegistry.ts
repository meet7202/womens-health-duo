import { learnHubTopicLabels, learnHubFilteredPath } from "../../lib/learnHubUrls";
import { publicPathname } from "../../lib/githubPagesPublicUrl";
import { bookConsultationPath } from "../../lib/bookingIntent";
import { SEO_ONLINE_SERVICES } from "../seoOnlineServices";
import { buildTopicGuideFaqs, clusterConfig } from "./clusterContent";
import { guideUniquenessOverrideForSlug } from "./guideUniquenessOverrides";
import { TOPIC_GUIDE_ROWS } from "./topicGuideRows";
import type {
  TopicGuideAuthorId,
  TopicGuideClusterId,
  TopicGuidePageModel,
  TopicGuideReviewHoldStatus,
  TopicGuideReviewStatus,
  TopicGuideRow,
  TopicGuideSection,
} from "./types";

/**
 * Owner-authorized editorial stamp (9 Nov 2026): clinicians author/review all topic guides.
 * Per-row fields still win when set. Do not invent future review dates on rebuild.
 */
const TOPIC_GUIDE_OWNER_APPROVED_AT = "2026-11-09";

/**
 * Per-slug clinical holds. Entries force a non-approved `reviewStatus` even when the set default
 * is `approved`, so incomplete / withheld guides never show an approval byline.
 * Prefer this map for temporary holds; use row `reviewStatus` for durable per-guide state.
 */
export const TOPIC_GUIDE_REVIEW_HOLDS: ReadonlyMap<string, TopicGuideReviewHoldStatus> = new Map([
  // Example: ["some-slug", "needs-review"],
]);

/**
 * Resolve editorial gate for one guide.
 * Precedence: `TOPIC_GUIDE_REVIEW_HOLDS` → explicit row `reviewStatus` → owner default `approved`.
 */
export function resolveTopicGuideReviewStatus(row: TopicGuideRow): TopicGuideReviewStatus {
  const hold = TOPIC_GUIDE_REVIEW_HOLDS.get(row.slug);
  if (hold) return hold;
  if (row.reviewStatus) return row.reviewStatus;
  return "approved";
}

function editorialAttribution(consult: "charmi" | "zalak" | "both"): {
  authorId: TopicGuideAuthorId;
  reviewerId: TopicGuideAuthorId;
} {
  if (consult === "zalak") return { authorId: "zalak", reviewerId: "zalak" };
  if (consult === "charmi") return { authorId: "charmi", reviewerId: "charmi" };
  // Duo-led topics: OB-GYN authors; physio sister reviews.
  return { authorId: "charmi", reviewerId: "zalak" };
}
const QUESTION_FIRST = new Set([
  "what",
  "why",
  "how",
  "when",
  "who",
  "which",
  "can",
  "are",
  "is",
  "do",
  "does",
]);
function titleCaseToken(raw: string, _index: number, _parts: string[]): string {
  const w = raw.toLowerCase();
  if (w === "pcos") return "PCOS";
  if (w === "ivf") return "IVF";
  if (w === "pms") return "PMS";
  if (w === "pmdd") return "PMDD";
  if (w === "i") return "I";
  if (w === "stott") return "STOTT";
  if (w.length <= 2 && !["iv", "or", "no", "so", "we", "us", "in", "on", "at", "to"].includes(w))
    return raw.toUpperCase();
  return raw.charAt(0).toUpperCase() + raw.slice(1).toLowerCase();
}
const SMALL_WORDS = new Set([
  "a",
  "an",
  "the",
  "and",
  "or",
  "for",
  "to",
  "of",
  "in",
  "on",
  "at",
  "with",
  "from",
  "by",
  "as",
  "is",
  "are",
  "am",
  "do",
  "does",
  "my",
  "your",
  "we",
  "me",
]);
function capitalizeWord(w: string): string {
  const low = w.toLowerCase();
  if (low === "pcos") return "PCOS";
  if (low === "ivf") return "IVF";
  if (low === "pms") return "PMS";
  if (low === "pmdd") return "PMDD";
  if (low === "c-section") return "C-section";
  if (low === "stott") return "STOTT";
  return w.charAt(0).toUpperCase() + w.slice(1).toLowerCase();
}
function polishGuideTitle(joined: string): string {
  const hasQ = joined.endsWith("?");
  const core = (hasQ ? joined.slice(0, -1) : joined).trim();
  const parts = core.split(/\s+/).filter(Boolean);
  if (parts.length === 0) return joined;
  const out: string[] = [capitalizeWord(parts[0]!)];
  for (let i = 1; i < parts.length; i++) {
    const p = parts[i]!;
    const low = p.toLowerCase();
    if (SMALL_WORDS.has(low)) out.push(low);
    else out.push(capitalizeWord(p));
  }
  return `${out.join(" ")}${hasQ ? "?" : ""}`;
} /** Visible H1 / title tag base when `row.title` is not set. */
export function topicGuideTitleFromSlug(slug: string): string {
  const parts = slug.split("-").filter(Boolean);
  const tokens: string[] = [];
  for (let i = 0; i < parts.length; i++) {
    const low = parts[i]!.toLowerCase();
    if (low === "c" && parts[i + 1]?.toLowerCase() === "section") {
      tokens.push("C-section");
      i++;
      continue;
    }
    tokens.push(titleCaseToken(parts[i]!, i, parts));
  }
  let out = tokens.join(" ");
  out = out.replace(/\s+/g, " ").trim();
  const first = slug.split("-")[0]?.toLowerCase() ?? "";
  if (QUESTION_FIRST.has(first) && !out.endsWith("?")) out = `${out}?`;
  return polishGuideTitle(out);
}
const INTRO_CODA =
  "Read on for Learn clips and how to book Dr. Charmi Shah (OB-GYN and IVF) or Dr. Zalak Shah (women's health physiotherapy and STOTT Pilates).";

const INTRO_MAX_CHARS = 340;

/** Meta / JSON-LD: keep a reasonable length without ellipsis; end on a full sentence when trimmed. */
function truncateMetaToCompleteSentences(text: string, maxChars: number): string {
  const full = text.trim();
  if (full.length <= maxChars) return full;
  const slice = full.slice(0, maxChars);
  const sentenceEnds: readonly string[] = [". ", "? ", "! "];
  for (const sep of sentenceEnds) {
    let from = slice.length;
    while (from > 0) {
      from = slice.lastIndexOf(sep, from - 1);
      if (from >= 48) {
        return slice.slice(0, from + 1).trim();
      }
    }
  }
  const sp = slice.lastIndexOf(" ");
  if (sp >= 40) {
    return `${slice.slice(0, sp).trim()}.`;
  }
  return `${slice.trim()}.`;
}

/** Trim `text` to at most `maxChars` by dropping after the last full sentence in the prefix (no dangling phrases). */
function endAtLastCompleteSentenceInPrefix(text: string, maxChars: number): string {
  const t = text.trim();
  if (t.length <= maxChars) return t;
  const slice = t.slice(0, maxChars);
  for (let i = slice.length - 1; i >= 28; i--) {
    const ch = slice[i];
    if (ch !== "." && ch !== "?" && ch !== "!") continue;
    const next = slice[i + 1];
    if (next === undefined || /\s/u.test(next)) {
      return slice.slice(0, i + 1).trim();
    }
  }
  return truncateMetaToCompleteSentences(t, maxChars);
}

function buildTopicGuideIntroParagraph(title: string, blurb: string): string {
  const t = title.trim();
  const b = blurb.trim();
  const head = /[?!.]$/u.test(t) ? `${t} ${b}` : `${t}. ${b}`;
  const core = /[.!?]"?$/u.test(head.trim()) ? head.trim() : `${head.trim()}.`;
  const withCoda = `${core} ${INTRO_CODA}`;
  if (withCoda.length <= INTRO_MAX_CHARS) return withCoda;
  const spaceForCore = INTRO_MAX_CHARS - INTRO_CODA.length - 1;
  const trimmedCore =
    spaceForCore >= 40 ? endAtLastCompleteSentenceInPrefix(core, spaceForCore) : core;
  return `${trimmedCore} ${INTRO_CODA}`;
}

/**
 * Concise page-specific meta before length capping (SEO-05).
 * Do not append the long intro coda here — capping was leaving orphaned “Read.” fragments.
 */
function buildMetaDescription(title: string, blurb: string): string {
  const t = title.trim();
  const b = blurb.trim();
  const head = /[?!.]$/u.test(t) ? `${t} ${b}` : `${t}. ${b}`;
  const core = /[.!?]"?$/u.test(head.trim()) ? head.trim() : `${head.trim()}.`;
  return truncateMetaToCompleteSentences(core, 155);
}
function filterLearnTopics(labels: string[]): string[] {
  const allowed = new Set(learnHubTopicLabels());
  const unique = [...new Set(labels)].filter((l) => allowed.has(l));
  if (unique.length > 0) return unique;
  return ["Patient education"].filter((l) => allowed.has(l));
}
/** Primary guide slug per cluster (used to order “similar” links when rows have no explicit `related`). */
const CLUSTER_HUB_SLUG: Record<TopicGuideClusterId, string> = {
  pcos: "pcos",
  periods: "irregular-periods",
  hormones: "hormonal-imbalance",
  fertility: "fertility",
  "pregnancy-physio": "prenatal-physiotherapy",
  postpartum: "postpartum-recovery",
  pelvic: "pelvic-floor-therapy",
  physio: "womens-health-physiotherapy",
  pilates: "prenatal-pilates",
  "gyn-general": "online-gynecologist",
  "online-gyne": "online-gynecologist",
};
function computeRelated(
  row: TopicGuideRow,
  byCluster: Map<TopicGuideClusterId, string[]>,
): string[] {
  if (row.related && row.related.length > 0) {
    return row.related.filter((s) => s !== row.slug).slice(0, 8);
  }
  const hub = CLUSTER_HUB_SLUG[row.cluster];
  const pool = (byCluster.get(row.cluster) ?? []).filter((s) => s !== row.slug);
  const scored = pool.map((s) => {
    const r = TOPIC_GUIDE_ROWS.find((x) => x.slug === s);
    const tier = r?.tier ?? 9;
    const tierScore = tier === 1 ? 0 : tier;
    const dist = Math.abs(tier - row.tier);
    return { s, tierScore, dist };
  });
  scored.sort((a, b) => {
    if (a.tierScore !== b.tierScore) return a.tierScore - b.tierScore;
    if (a.dist !== b.dist) return a.dist - b.dist;
    return a.s.localeCompare(b.s);
  });
  const fromCluster = scored.map((x) => x.s);
  const merged: string[] = [];
  if (hub && hub !== row.slug) merged.push(hub);
  for (const s of fromCluster) {
    if (!merged.includes(s)) merged.push(s);
    if (merged.length >= 8) break;
  }
  return merged.slice(0, 8);
}
function byClusterMap(): Map<TopicGuideClusterId, string[]> {
  const m = new Map<TopicGuideClusterId, string[]>();
  for (const row of TOPIC_GUIDE_ROWS) {
    const arr = m.get(row.cluster) ?? [];
    arr.push(row.slug);
    m.set(row.cluster, arr);
  }
  for (const v of m.values()) v.sort((a, b) => a.localeCompare(b));
  return m;
}
const BY_CLUSTER = byClusterMap();
function normalizeGuideKey(raw: string): string {
  return raw
    .toLowerCase()
    .replace(/['']/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function defaultPrimaryQuestion(title: string): string {
  const t = title.trim();
  if (!t) return "What should I know before booking?";
  if (t.endsWith("?")) return t;
  const first = t.split(/\s+/)[0]?.toLowerCase() ?? "";
  if (QUESTION_FIRST.has(first)) return `${t.replace(/\?*$/, "")}?`;
  return `What should I know about ${t}?`;
}

function doctorAttribution(consult: "charmi" | "zalak" | "both"): string {
  if (consult === "zalak") {
    return "Dr. Zalak Shah (women's health physiotherapy / STOTT Pilates)";
  }
  if (consult === "charmi") {
    return "Dr. Charmi Shah (OB-GYN / IVF / laparoscopy)";
  }
  return "Dr. Charmi Shah (OB-GYN / IVF) and Dr. Zalak Shah (women's health physiotherapy / STOTT Pilates)";
}

/**
 * SEO-12: every retained guide gets a title-led first section.
 * Priority: row fields → curated override → matching FAQ pool answer → cluster first paragraph + metaBlurb.
 * Owner approved the guide set clinically; uniqueness copy still avoids inventing protocols/rates.
 */
function sectionsWithUniquenessScaffold(
  title: string,
  clusterSections: TopicGuideSection[],
  row: TopicGuideRow,
  opts: {
    consult: "charmi" | "zalak" | "both";
    metaBlurb: string;
    faqPool: { id?: string; question: string; answer: string }[];
  },
): {
  sections: TopicGuideSection[];
  primaryQuestion: string;
  directAnswer: string;
} {
  const override = guideUniquenessOverrideForSlug(row.slug);
  let primaryQuestion = row.primaryQuestion ?? override?.primaryQuestion;
  let directAnswer = row.directAnswer ?? override?.directAnswer;
  let followOn = override?.followOn;
  let firstHeading = override?.firstSectionHeading;

  if (!primaryQuestion?.trim() || !directAnswer?.trim()) {
    const slugKey = normalizeGuideKey(row.slug);
    const titleNorm = title.toLowerCase().replace(/[?'']/g, "").replace(/\s+/g, " ").trim();
    const faqMatch =
      opts.faqPool.find((f) => f.id && normalizeGuideKey(f.id) === slugKey) ??
      opts.faqPool.find((f) => {
        const q = f.question.toLowerCase().replace(/[?'']/g, "").replace(/\s+/g, " ").trim();
        return q === titleNorm || q.includes(titleNorm) || titleNorm.includes(q);
      });
    if (faqMatch) {
      primaryQuestion = primaryQuestion?.trim() || faqMatch.question;
      directAnswer = directAnswer?.trim() || faqMatch.answer;
      followOn =
        followOn ??
        `A visit with ${doctorAttribution(opts.consult)} can place this in your individual context. This page is education for that conversation, not a diagnosis or treatment plan.`;
    } else {
      const clusterLead = clusterSections[0]?.paragraphs[0]?.trim();
      primaryQuestion = primaryQuestion?.trim() || defaultPrimaryQuestion(title);
      directAnswer =
        directAnswer?.trim() ||
        clusterLead ||
        `${title.replace(/\?+$/, "")} is a topic patients ask about at Women's Health Duo. ${opts.metaBlurb}`;
      followOn =
        followOn ??
        `${opts.metaBlurb} Discuss next steps with ${doctorAttribution(opts.consult)} — this page prepares questions; it does not replace individualized care.`;
      firstHeading = firstHeading ?? primaryQuestion;
    }
  }

  const pq = primaryQuestion!.trim();
  const da = directAnswer!.trim();
  const paragraphs = [da];
  if (followOn?.trim()) paragraphs.push(followOn.trim());
  const first: TopicGuideSection = {
    heading: firstHeading?.trim() || pq,
    paragraphs,
  };
  // Drop a cluster first section that only restates the same title heading.
  const rest = clusterSections.filter((sec, idx) => {
    if (idx !== 0) return true;
    const h = sec.heading.trim().toLowerCase();
    const q = pq.toLowerCase().replace(/\?+$/, "");
    const titleLow = title.trim().toLowerCase().replace(/\?+$/, "");
    return h !== q && h !== titleLow && !h.startsWith(`${titleLow}:`);
  });
  return {
    sections: [first, ...rest],
    primaryQuestion: pq,
    directAnswer: da,
  };
}

const GUIDE_BY_SLUG: ReadonlyMap<string, TopicGuidePageModel> = new Map(
  TOPIC_GUIDE_ROWS.map((row) => {
    const cc = clusterConfig(row.cluster);
    const title = row.title ?? topicGuideTitleFromSlug(row.slug);
    const consult = row.primaryConsult ?? cc.defaultConsult;
    const services = row.serviceSlugs ?? cc.defaultServiceSlugs;
    const learnTopicLabels = filterLearnTopics(row.learnTopics ?? cc.defaultLearnTopics);
    const uniqueness = sectionsWithUniquenessScaffold(title, cc.buildSections(title), row, {
      consult,
      metaBlurb: cc.metaBlurb,
      faqPool: cc.faqPool,
    });
    const faqs = buildTopicGuideFaqs(row.slug, title, consult, cc.faqPool, row.faqIds);
    const path = publicPathname(`/${row.slug}`);
    const relatedSlugs = computeRelated(row, BY_CLUSTER);
    const reviewStatus = resolveTopicGuideReviewStatus(row);
    const approved = reviewStatus === "approved";
    // Only stamp clinician byline fields when the guide is actually approved (or row overrides).
    const attribution = approved ? editorialAttribution(consult) : undefined;
    const model: TopicGuidePageModel = {
      slug: row.slug,
      path,
      tier: row.tier,
      cluster: row.cluster,
      title,
      introParagraph: buildTopicGuideIntroParagraph(title, cc.metaBlurb),
      metaDescription: buildMetaDescription(title, cc.metaBlurb),
      sections: uniqueness.sections,
      faqs,
      learnTopicLabels,
      primaryConsult: consult,
      serviceSlugs: services,
      relatedSlugs,
      authorId: row.authorId ?? attribution?.authorId,
      reviewerId: row.reviewerId ?? attribution?.reviewerId,
      publishedAt: row.publishedAt ?? (approved ? TOPIC_GUIDE_OWNER_APPROVED_AT : undefined),
      updatedAt: row.updatedAt ?? (approved ? TOPIC_GUIDE_OWNER_APPROVED_AT : undefined),
      reviewedAt: row.reviewedAt ?? (approved ? TOPIC_GUIDE_OWNER_APPROVED_AT : undefined),
      reviewStatus,
      references: row.references ?? [],
      primaryQuestion: uniqueness.primaryQuestion,
      directAnswer: uniqueness.directAnswer,
    };
    return [row.slug, model] as const;
  }),
);
export function getTopicGuide(slug: string | undefined): TopicGuidePageModel | undefined {
  if (!slug) return undefined;
  return GUIDE_BY_SLUG.get(slug);
}
/** Main entry slugs highlighted on the Learn hub (subset of all guides). */
export function topicGuideHubSlugs(): string[] {
  return TOPIC_GUIDE_ROWS.filter((r) => r.tier === 1).map((r) => r.slug);
}

const CLUSTER_INDEX_LABEL: Record<TopicGuideClusterId, string> = {
  pcos: "PCOS",
  periods: "Periods and bleeding",
  hormones: "Hormones",
  fertility: "Fertility and conception",
  "pregnancy-physio": "Pregnancy movement",
  postpartum: "Postpartum",
  pelvic: "Pelvic floor and bladder",
  physio: "Women's health physiotherapy",
  pilates: "Pilates",
  "gyn-general": "Gynecology",
  "online-gyne": "Online gynecology",
};

const CLUSTER_INDEX_ORDER: TopicGuideClusterId[] = [
  "pcos",
  "periods",
  "hormones",
  "fertility",
  "pregnancy-physio",
  "postpartum",
  "pelvic",
  "physio",
  "pilates",
  "gyn-general",
  "online-gyne",
];

export type TopicGuideIndexGroup = {
  clusterId: TopicGuideClusterId;
  clusterLabel: string;
  guides: { slug: string; title: string; path: string }[];
};

/** All written guides grouped for the crawlable `/learn/articles` index. */
export function topicGuidesGroupedForIndex(): TopicGuideIndexGroup[] {
  const byCluster = new Map<TopicGuideClusterId, TopicGuideRow[]>();
  for (const row of TOPIC_GUIDE_ROWS) {
    const arr = byCluster.get(row.cluster) ?? [];
    arr.push(row);
    byCluster.set(row.cluster, arr);
  }
  for (const rows of byCluster.values()) {
    rows.sort((a, b) => a.slug.localeCompare(b.slug));
  }
  return CLUSTER_INDEX_ORDER.filter((id) => byCluster.has(id)).map((clusterId) => {
    const rows = byCluster.get(clusterId)!;
    const guides = rows.map((row) => {
      const g = GUIDE_BY_SLUG.get(row.slug);
      const title = g?.title ?? topicGuideTitleFromSlug(row.slug);
      return { slug: row.slug, title, path: publicPathname(`/${row.slug}`) };
    });
    return {
      clusterId,
      clusterLabel: CLUSTER_INDEX_LABEL[clusterId],
      guides,
    };
  });
}

/**
 * Booking CTAs for guides: doctor + allowlisted service intent → /book-consultation/ (SEO-23).
 * Do not deep-link arbitrary city×service matrix pages as “sample booking”.
 */
export function topicGuideExampleConsultPaths(
  serviceSlugs: string[],
  primaryConsult: "charmi" | "zalak" | "both" = "both",
): { label: string; path: string }[] {
  const fallbackDoctor: "charmi" | "zalak" = primaryConsult === "zalak" ? "zalak" : "charmi";
  const out: { label: string; path: string }[] = [];
  for (const slug of serviceSlugs) {
    const svc = SEO_ONLINE_SERVICES.find((s) => s.slug === slug);
    if (!svc) continue;
    const doc = svc.doctor === "zalak" || svc.doctor === "charmi" ? svc.doctor : fallbackDoctor;
    out.push({
      label: `Book: ${svc.shortTitle}`,
      path: bookConsultationPath({ doctor: doc, service: svc.slug }),
    });
  }
  if (out.length === 0) {
    out.push({
      label: "Book a teleconsultation",
      path: bookConsultationPath({ doctor: fallbackDoctor }),
    });
  }
  return out.slice(0, 3);
}
export function topicGuideLearnLinks(labels: string[]): { label: string; path: string }[] {
  return labels.map((label) => ({
    label: `Learn: ${label}`,
    path: learnHubFilteredPath({ doctor: "all", topic: label }),
  }));
}
