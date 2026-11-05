#!/usr/bin/env node
/**
 * SEO-12 / SEO-36: guide editorial disposition ledger from TOPIC_GUIDE_ROWS.
 * Writes docs/seo-guide-disposition.csv (decision keep-improve, status pending).
 *
 * Usage: node scripts/generate-seo-guide-disposition.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createServer } from "vite";
import react from "@vitejs/plugin-react-swc";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const outCsv = path.join(root, "docs/seo-guide-disposition.csv");

function csvEscape(value) {
  const s = String(value ?? "");
  if (/[",\n\r]/.test(s)) return `"${s.replace(/"/g, '""')}"`;
  return s;
}

function defaultPrimaryQuestion(title) {
  const t = String(title ?? "").trim();
  if (!t) return "";
  if (t.endsWith("?")) return t;
  return `What should I know about ${t}?`;
}

function clinicalReviewerRequired(cluster, primaryConsult) {
  // All topic guides are YMYL education; clinician review required before approval claims.
  void cluster;
  void primaryConsult;
  return "yes";
}

async function main() {
  const server = await createServer({
    root,
    configFile: false,
    plugins: [react()],
    resolve: {
      alias: { "@": path.join(root, "src") },
    },
    server: { middlewareMode: true },
    appType: "custom",
  });

  try {
    const rowsMod = await server.ssrLoadModule("/src/data/topicGuides/topicGuideRows.ts");
    const registryMod = await server.ssrLoadModule("/src/data/topicGuides/topicGuideRegistry.ts");
    const overridesMod = await server.ssrLoadModule(
      "/src/data/topicGuides/guideUniquenessOverrides.ts",
    );

    const TOPIC_GUIDE_ROWS = rowsMod.TOPIC_GUIDE_ROWS;
    const topicGuideTitleFromSlug = registryMod.topicGuideTitleFromSlug;
    const getTopicGuide = registryMod.getTopicGuide;
    const priority = new Set(overridesMod.GUIDE_UNIQUENESS_PRIORITY_SLUGS);

    const header = [
      "path",
      "title",
      "cluster",
      "primaryQuestion",
      "decision",
      "clinical_reviewer_required",
      "status",
      "has_direct_answer_scaffold",
      "reviewStatus",
    ];

    const lines = [header.join(",")];
    let scaffolded = 0;

    for (const row of TOPIC_GUIDE_ROWS) {
      const guide = getTopicGuide(row.slug);
      const title = guide?.title ?? row.title ?? topicGuideTitleFromSlug(row.slug);
      const primaryQuestion =
        guide?.primaryQuestion ??
        overridesMod.guideUniquenessOverrideForSlug(row.slug)?.primaryQuestion ??
        defaultPrimaryQuestion(title);
      const scaffoldYes = Boolean(guide?.directAnswer?.trim()) || priority.has(row.slug);
      const hasScaffoldFlag = scaffoldYes ? "yes" : "no";
      if (scaffoldYes) scaffolded += 1;

      lines.push(
        [
          `/${row.slug}`,
          title,
          row.cluster,
          primaryQuestion,
          "keep-improve",
          clinicalReviewerRequired(row.cluster, row.primaryConsult),
          "pending",
          hasScaffoldFlag,
          row.reviewStatus ?? guide?.reviewStatus ?? "pending",
        ]
          .map(csvEscape)
          .join(","),
      );
    }

    fs.mkdirSync(path.dirname(outCsv), { recursive: true });
    fs.writeFileSync(outCsv, `${lines.join("\n")}\n`, "utf8");
    console.log(
      `generate-seo-guide-disposition: wrote ${TOPIC_GUIDE_ROWS.length} rows → ${path.relative(root, outCsv)} (${scaffolded} with direct-answer scaffold)`,
    );
  } finally {
    await server.close();
  }
}

main().catch((err) => {
  console.error(`generate-seo-guide-disposition: ${err.message}`);
  console.error(err.stack);
  process.exit(1);
});
