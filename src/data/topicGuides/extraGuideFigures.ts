import { publishedArticleForSlug } from "./articles";
import { TOPIC_GUIDE_ROWS } from "./topicGuideRows";
import type { TopicGuideClusterId, TopicGuideFigure } from "./types";

/**
 * Two extra rasters per article, taken from other published guides.
 * Same cluster first, then a neighbouring cluster. Captions stay the ones
 * already approved for that image. Explainers are skipped (they name one article).
 */
const NEIGHBOURS: Record<TopicGuideClusterId, readonly TopicGuideClusterId[]> = {
  pcos: ["hormones", "periods"],
  periods: ["hormones", "pcos"],
  hormones: ["periods", "pcos"],
  fertility: ["pcos", "periods"],
  "pregnancy-physio": ["postpartum", "physio"],
  postpartum: ["pregnancy-physio", "pelvic"],
  pelvic: ["postpartum", "physio"],
  physio: ["pelvic", "pilates"],
  pilates: ["physio", "pregnancy-physio"],
  "gyn-general": ["online-gyne", "periods"],
  "online-gyne": ["gyn-general", "periods"],
};

type Candidate = {
  from: string;
  kind: "scene" | "anatomy";
  figure: TopicGuideFigure;
};

function toFigure(figure: {
  src: string;
  srcSet?: string;
  alt: string;
  caption: string;
  width: number;
  height: number;
}): TopicGuideFigure {
  return {
    src: figure.src,
    srcSet: figure.srcSet,
    alt: figure.alt,
    caption: figure.caption,
    width: figure.width,
    height: figure.height,
  };
}

function candidates(clusters: readonly TopicGuideClusterId[], skipSlug: string): Candidate[] {
  const seen = new Set<string>();
  const out: Candidate[] = [];
  for (const cluster of clusters) {
    for (const row of TOPIC_GUIDE_ROWS) {
      if (row.cluster !== cluster || row.slug === skipSlug) continue;
      const article = publishedArticleForSlug(row.slug);
      if (!article) continue;
      for (const figure of article.figures) {
        if (!figure.src.endsWith(".webp") || seen.has(figure.src)) continue;
        seen.add(figure.src);
        out.push({
          from: row.slug,
          kind: figure.src.includes("-anatomy.") ? "anatomy" : "scene",
          figure: toFigure(figure),
        });
      }
    }
  }
  return out;
}

/** Two related rasters that are not already on this page. */
export function extraGuideFigures(
  slug: string,
  cluster: TopicGuideClusterId,
  ownSrcs: ReadonlySet<string>,
): TopicGuideFigure[] {
  const pool = candidates([cluster, ...NEIGHBOURS[cluster]], slug).filter(
    (item) => !ownSrcs.has(item.figure.src),
  );
  const picked: Candidate[] = [];
  const usedFrom = new Set<string>();
  const usedSrc = new Set<string>();

  const take = (prefer?: Candidate["kind"], differentArticle = true) => {
    const hit = pool.find(
      (item) =>
        !usedSrc.has(item.figure.src) &&
        (prefer === undefined || item.kind === prefer) &&
        (!differentArticle || !usedFrom.has(item.from)),
    );
    if (!hit) return;
    picked.push(hit);
    usedSrc.add(hit.figure.src);
    usedFrom.add(hit.from);
  };

  take("scene");
  take("anatomy");
  while (picked.length < 2) {
    const before = picked.length;
    take(undefined, false);
    if (picked.length === before) break;
  }

  return picked.map((item) => item.figure);
}
