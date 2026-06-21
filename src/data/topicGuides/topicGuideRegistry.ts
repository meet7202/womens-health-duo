import { learnHubTopicLabels, learnHubFilteredPath } from "../../lib/learnHubUrls";
import {
  virtualServiceCityPath,
  getVirtualConsultationCityBySlug,
} from "../../lib/virtualConsultation";
import { SEO_ONLINE_SERVICES } from "../seoOnlineServices";
import { buildTopicGuideFaqs, clusterConfig } from "./clusterContent";
import { TOPIC_GUIDE_ROWS } from "./topicGuideRows";
import type { TopicGuideClusterId, TopicGuidePageModel, TopicGuideRow } from "./types";
const MUMBAI_SLUG = "mumbai";
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

function buildMetaDescription(title: string, blurb: string): string {
  return truncateMetaToCompleteSentences(buildTopicGuideIntroParagraph(title, blurb), 300);
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
const GUIDE_BY_SLUG: ReadonlyMap<string, TopicGuidePageModel> = new Map(
  TOPIC_GUIDE_ROWS.map((row) => {
    const cc = clusterConfig(row.cluster);
    const title = row.title ?? topicGuideTitleFromSlug(row.slug);
    const consult = row.primaryConsult ?? cc.defaultConsult;
    const services = row.serviceSlugs ?? cc.defaultServiceSlugs;
    const learnTopicLabels = filterLearnTopics(row.learnTopics ?? cc.defaultLearnTopics);
    const sections = cc.buildSections(title);
    const faqs = buildTopicGuideFaqs(row.slug, title, consult, cc.faqPool);
    const path = `/${row.slug}`;
    const relatedSlugs = computeRelated(row, BY_CLUSTER);
    const model: TopicGuidePageModel = {
      slug: row.slug,
      path,
      tier: row.tier,
      cluster: row.cluster,
      title,
      introParagraph: buildTopicGuideIntroParagraph(title, cc.metaBlurb),
      metaDescription: buildMetaDescription(title, cc.metaBlurb),
      sections,
      faqs,
      learnTopicLabels,
      primaryConsult: consult,
      serviceSlugs: services,
      relatedSlugs,
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
      return { slug: row.slug, title, path: `/${row.slug}` };
    });
    return {
      clusterId,
      clusterLabel: CLUSTER_INDEX_LABEL[clusterId],
      guides,
    };
  });
}

/** Mumbai service pages: example deep links for booking CTAs (same pattern as learn pillars). */
export function topicGuideExampleConsultPaths(
  serviceSlugs: string[],
): { label: string; path: string }[] {
  const city = getVirtualConsultationCityBySlug(MUMBAI_SLUG);
  if (!city) return [];
  const out: { label: string; path: string }[] = [];
  for (const slug of serviceSlugs) {
    const svc = SEO_ONLINE_SERVICES.find((s) => s.slug === slug);
    if (!svc) continue;
    out.push({
      label: `${svc.shortTitle} in Mumbai (sample booking link)`,
      path: virtualServiceCityPath(city, svc.slug),
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
