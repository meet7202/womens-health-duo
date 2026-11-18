#!/usr/bin/env node
/**
 * Human-gated promote: flip an approved calendar article to published.
 *
 * Requires STATUS clinicalApproval === "approved" (and publicationStatus approved|draft after clinician sign-off).
 * Updates:
 *  - blog/drafts/STATUS.json
 *  - src/data/topicGuides/articles/catalog.generated.ts (publicationStatus + dates + author fields)
 *  - for New URLs: src/data/topicGuides/articles/newGuideRows.ts indexable → true
 *
 * Does NOT deploy or IndexNow-submit. After merge/deploy: npm run blog:submit-index -- --id=...
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const STATUS_PATH = path.join(ROOT, "blog/drafts/STATUS.json");
const CATALOG_PATH = path.join(ROOT, "src/data/topicGuides/articles/catalog.generated.ts");
const NEW_ROWS_PATH = path.join(ROOT, "src/data/topicGuides/articles/newGuideRows.ts");
const PLAN = path.join(ROOT, "blog/WHD_AGENT_ARTICLE_PROMPTS/WHD_BLOG_PLAN.json");

function parseArgs(argv) {
  let id = null;
  let force = false;
  for (const arg of argv) {
    if (arg.startsWith("--id=")) id = arg.slice("--id=".length);
    else if (arg === "--force-unreviewed") force = true;
    else if (arg === "--help" || arg === "-h") {
      console.log(`Usage: node scripts/blog-promote.mjs --id=W01-Z

Fails unless clinicalApproval is "approved" in blog/drafts/STATUS.json.
(Use --force-unreviewed only for local dry plumbing tests — never for production YMYL.)`);
      process.exit(0);
    }
  }
  if (!id) {
    console.error("blog:promote: missing --id=");
    process.exit(1);
  }
  return { id, force };
}

function isoDateIst() {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Kolkata",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date());
}

function main() {
  const { id, force } = parseArgs(process.argv.slice(2));
  const status = JSON.parse(fs.readFileSync(STATUS_PATH, "utf8"));
  const plan = JSON.parse(fs.readFileSync(PLAN, "utf8"));
  const planArticle = plan.articles.find((a) => a.id === id);
  const row = status.articles.find((a) => a.id === id);
  if (!planArticle || !row) {
    console.error(`blog:promote: unknown id ${id}`);
    process.exit(1);
  }

  if (row.clinicalApproval !== "approved" && !force) {
    console.error(
      `blog:promote: ${id} clinicalApproval is "${row.clinicalApproval}" — obtain clinician approval first (or pass --force-unreviewed for local plumbing only).`,
    );
    process.exit(1);
  }
  if (force) {
    console.warn(
      "blog:promote: WARNING --force-unreviewed used; do not ship unreviewed YMYL copy.",
    );
  }

  const today = isoDateIst();
  row.publicationStatus = "published";
  row.clinicalApproval = "approved";
  row.actualPublishDate = today;
  fs.writeFileSync(STATUS_PATH, `${JSON.stringify(status, null, 2)}\n`);

  let catalog = fs.readFileSync(CATALOG_PATH, "utf8");
  // Narrow replace for this article object: publicationStatus near id.
  const idToken = `"${id}"`;
  const idPos =
    catalog.indexOf(`id: ${idToken}`) >= 0
      ? catalog.indexOf(`id: ${idToken}`)
      : catalog.indexOf(`id: "${id}"`);
  if (idPos < 0) {
    console.error(`blog:promote: could not find ${id} in catalog`);
    process.exit(1);
  }
  // Find publicationStatus after this id within ~800 chars
  const window = catalog.slice(idPos, idPos + 1200);
  if (
    !/publicationStatus: "draft"|publicationStatus: "approved"|publicationStatus: "in_clinical_review"|publicationStatus: "published"/.test(
      window,
    )
  ) {
    console.error(`blog:promote: publicationStatus not found near ${id}`);
    process.exit(1);
  }
  const updatedWindow = window.replace(
    /publicationStatus: "(draft|approved|in_clinical_review|published)"/,
    'publicationStatus: "published"',
  );
  // Inject author/dates if missing in window — append after proposedLeadId line when promoting.
  let patchedWindow = updatedWindow;
  if (!/publishedAt:/.test(patchedWindow)) {
    patchedWindow = patchedWindow.replace(
      /proposedLeadId: "(zalak|charmi)"/,
      (m, lead) =>
        `${m},\n    authorId: "${lead}",\n    reviewerId: "${lead}",\n    publishedAt: "${today}",\n    updatedAt: "${today}",\n    reviewedAt: "${today}"`,
    );
  } else {
    patchedWindow = patchedWindow
      .replace(/publishedAt: "[^"]*"/, `publishedAt: "${today}"`)
      .replace(/updatedAt: "[^"]*"/, `updatedAt: "${today}"`);
  }
  catalog = catalog.slice(0, idPos) + patchedWindow + catalog.slice(idPos + window.length);
  fs.writeFileSync(CATALOG_PATH, catalog);

  if (planArticle.action === "New") {
    let rows = fs.readFileSync(NEW_ROWS_PATH, "utf8");
    const slug = planArticle.path.replace(/^\/+|\/+$/g, "");
    // Flip indexable for this slug block
    const slugIdx = rows.indexOf(`slug: "${slug}"`);
    if (slugIdx >= 0) {
      const chunk = rows.slice(slugIdx, slugIdx + 500);
      const flipped = chunk.replace(/indexable: false/, "indexable: true");
      rows = rows.slice(0, slugIdx) + flipped + rows.slice(slugIdx + chunk.length);
      fs.writeFileSync(NEW_ROWS_PATH, rows);
    }
  }

  const url = `https://womenshealthduo.com${planArticle.path}`;
  console.log(`blog:promote: ${id} → published (${today})`);
  console.log(`  URL: ${url}`);
  console.log(
    "  Next: commit/PR → merge to main → Pages deploy → npm run blog:submit-index -- --id=" + id,
  );
}

main();
