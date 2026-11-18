#!/usr/bin/node
/**
 * Generate 52 pending-review article packages + watermarked SVG explainers
 * from blog/WHD_AGENT_ARTICLE_PROMPTS/WHD_BLOG_PLAN.json.
 *
 * Does NOT invent clinical approval or published bylines.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createHash } from "node:crypto";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const PLAN = path.join(ROOT, "blog/WHD_AGENT_ARTICLE_PROMPTS/WHD_BLOG_PLAN.json");
const OUT_CATALOG = path.join(ROOT, "src/data/topicGuides/articles/catalog.generated.ts");
const OUT_STATUS = path.join(ROOT, "blog/drafts/STATUS.json");
const IMAGES_ROOT = path.join(ROOT, "public/images/articles");

function esc(s) {
  return String(s ?? "")
    .replace(/\\/g, "\\\\")
    .replace(/`/g, "\\`")
    .replace(/\$/g, "\\$");
}

function slugFromPath(p) {
  return String(p || "")
    .replace(/^\/+|\/+$/g, "")
    .split("/")
    .filter(Boolean)
    .pop();
}

function doctorName(id) {
  return id === "zalak" ? "Dr. Zalak Shah (PT)" : "Dr. Charmi Shah";
}

function doctorLane(id) {
  return id === "zalak"
    ? "women's health physiotherapy and STOTT Pilates"
    : "obstetrics, gynecology, fertility, and laparoscopic care";
}

function profilePath(id) {
  return id === "zalak" ? "/dr-zalak-shah/" : "/dr-charmi-shah/";
}

function sectionParagraphs(article, heading, draftWords, index, total) {
  const lead = doctorName(article.doctor_id);
  const lane = doctorLane(article.doctor_id);
  const angle = article.distinct_angle || article.clinical_guardrail || "";
  const story = article.storytelling_brief || "";
  const source =
    (article.sources && article.sources[0]) || "a reputable clinical patient information page";

  const base = [
    `${heading.replace(/\?$/, "")} is one of the practical questions people bring to Women's Health Duo. This section focuses on recognising patterns and preparing for care — not diagnosing yourself from a webpage.`,
    `In ${lane}, ${lead} helps readers separate what can be discussed in a planned consultation from what needs urgent in-person assessment. Online education cannot replace a history, examination when needed, or tests chosen for your situation.`,
    `Useful next step: note what changed for you (timing, triggers, severity, and how it affects daily life), then bring that record to a visit. Official patient information such as ${source} can orient you, but your plan should still be individual.`,
  ];

  if (index === 0 && story) {
    base.unshift(
      `Illustrative example (not a real patient story): ${story} Labelled examples like this are for orientation only — they do not predict your diagnosis or outcome.`,
    );
  }

  if (angle && index === Math.min(1, total - 1)) {
    base.push(`Distinct focus for this page: ${angle}`);
  }

  if (/seek|urgent|help|when should|assessment is needed|medical/i.test(heading)) {
    base.push(
      `Seek urgent or emergency care for sudden severe pain, heavy bleeding that soaks through protection quickly, fainting, chest pain, difficulty breathing, fever with pregnancy concerns, thoughts of self-harm, or any symptom your local emergency guidance treats as urgent. Do not use routine WhatsApp booking for emergencies.`,
    );
    base.push(
      `For non-urgent questions, you can book a suitable consultation and ask which clinician lane fits best. This article remains education for that conversation.`,
    );
  }

  // Expand toward drafting budget without inventing protocols/doses/outcomes.
  while (
    base.join(" ").split(/\s+/).length < Math.max(120, Math.floor((draftWords || 175) * 0.85))
  ) {
    base.push(
      `Keep a short list of questions for your appointment: what this pattern might mean in your context, what cannot be concluded online, which assessment options are being considered, and what follow-up looks like if symptoms change.`,
    );
    if (base.length > 8) break;
  }

  return base;
}

function buildDirectAnswer(article) {
  const lead = doctorName(article.doctor_id);
  const q = article.primary_question || article.title;
  return (
    `${q.replace(/\?$/, "")} usually needs context from your history, exam findings when indicated, and sometimes tests — it is not something a single webpage can finalise. ` +
    `This guide explains common patterns, what to record, and when to seek care, then points to a routine conversation with ${lead} at Women's Health Duo when appropriate.`
  );
}

function buildDescription(article) {
  const lead = doctorName(article.doctor_id);
  const phoneHint = "Book a consult";
  let d = `${article.title} — clear orientation from Women's Health Duo with ${lead}. ${phoneHint}.`;
  if (d.length > 155) {
    d = `${article.title} — orientation with ${lead}. Book a consult.`;
  }
  return d.slice(0, 160);
}

function buildSeoTitle(article) {
  const t = article.title.replace(/\s+/g, " ").trim();
  if (t.length <= 58) return t;
  return `${t.slice(0, 55).replace(/\s+\S*$/, "")}…`;
}

function loadAllBodyPacks() {
  const mergeJson = path.join(ROOT, "src/data/topicGuides/articles/bodies/all-bodies.json");
  if (!fs.existsSync(mergeJson)) {
    console.warn(
      "generate-blog-drafts: missing bodies/all-bodies.json — run: node scripts/export-blog-bodies.mjs",
    );
    return {};
  }
  return JSON.parse(fs.readFileSync(mergeJson, "utf8"));
}

function readJsonIfExists(file, fallback) {
  return fs.existsSync(file) ? JSON.parse(fs.readFileSync(file, "utf8")) : fallback;
}

const imageSpecs = readJsonIfExists(path.join(ROOT, "blog/drafts/image-specs.json"), {
  articles: {},
}).articles;
const imageManifest = readJsonIfExists(path.join(ROOT, "blog/drafts/image-manifest.json"), {});
/** Google Images click hooks — 4 short lines answered in the article body. */
const explainerCardsById = readJsonIfExists(path.join(ROOT, "blog/drafts/explainer-cards.json"), {
  articles: {},
}).articles;

// Publication is recorded in STATUS.json by the owner. Regeneration never invents it.
const previousStatus = readJsonIfExists(OUT_STATUS, { articles: [] });
const previousStatusById = new Map((previousStatus.articles || []).map((a) => [a.id, a]));

function publicationFields(id) {
  const prev = previousStatusById.get(id);
  if (prev?.publicationStatus !== "published" || !prev.actualPublishDate) {
    return { publicationStatus: "draft" };
  }
  return {
    publicationStatus: "published",
    publishedAt: prev.actualPublishDate,
  };
}

/** Clinical approval recorded on the STATUS row (set by the owner after doctor review). */
function clinicalApprovalFor(id) {
  const prev = previousStatusById.get(id);
  if (prev?.clinicalApproval !== "approved") return undefined;
  const reviewers = (prev.clinicalReviewers || []).filter((r) => r === "zalak" || r === "charmi");
  if (!reviewers.length) return undefined;
  return { reviewers, approvedOn: prev.clinicalApprovedOn };
}

function buildArticle(article, bodyPacks) {
  const slug = slugFromPath(article.path);
  const pack = bodyPacks[article.id];
  const directAnswer = pack?.directAnswer || buildDirectAnswer(article);
  let cleanedSections;
  if (pack?.sections?.length) {
    cleanedSections = pack.sections;
  } else {
    const sections = (article.outline || []).map((heading, i, arr) => {
      const budget = article.section_budgets?.[i]?.draft_words ?? 175;
      return {
        heading,
        paragraphs: sectionParagraphs(article, heading, budget, i, arr.length),
      };
    });
    cleanedSections = sections.map((s) => {
      let h = s.heading.trim();
      h = h
        .replace(/^Describe /i, "")
        .replace(/^Explain /i, "")
        .replace(/^Outline /i, "")
        .replace(/^Show /i, "")
        .replace(/^Create /i, "")
        .replace(/^Cover /i, "")
        .replace(/^Plan /i, "")
        .replace(/^Discuss /i, "")
        .replace(/^Separate /i, "")
        .replace(/^Compare /i, "")
        .replace(/^Provide /i, "")
        .replace(/^Acknowledge /i, "")
        .replace(/^Identify /i, "")
        .replace(/^Organize /i, "")
        .replace(/^Define /i, "");
      if (h && h[0] === h[0].toLowerCase()) {
        h = h.charAt(0).toUpperCase() + h.slice(1);
      }
      return { ...s, heading: h || s.heading };
    });
  }

  const imagePath = article.proposed_image_path || `/images/articles/${slug}/${slug}-explainer.svg`;
  const imageSrc = imagePath.replace(/\.webp$/i, ".svg");

  const rasterFigures = (imageSpecs[article.id] || [])
    .map((spec) => {
      const dims = (imageManifest[article.id] || []).find((m) => m.key === spec.key);
      if (!dims) return null;
      const base = `/images/articles/${slug}/${slug}-${spec.key}`;
      return {
        src: `${base}.webp`,
        srcSet: `${base}-800.webp 800w, ${base}.webp ${dims.width}w`,
        alt: spec.alt,
        caption: spec.caption,
        width: dims.width,
        height: dims.height,
        approvalStatus: spec.approvalStatus === "approved" ? "approved" : "pending",
      };
    })
    .filter(Boolean);

  const figures = [
    ...rasterFigures,
    {
      src: imageSrc,
      alt: pack?.explainerAlt || article.image_alt_draft || `${article.title} explainer graphic`,
      caption: "Patient-education graphic for orientation. Not a diagnostic tool.",
      width: 1200,
      height: 675,
      approvalStatus: "pending",
    },
  ];

  const references = pack?.references?.length
    ? pack.references.map((r) => ({ label: r.label, url: r.url }))
    : (article.sources || []).map((url) => ({
        label: url.replace(/^https?:\/\//, "").split("/")[0],
        url,
      }));

  const internalLinks = (article.internal_links || []).map((l) => ({
    anchor: l.anchor,
    path: l.path,
  }));

  const approval = clinicalApprovalFor(article.id);

  const reviewedSources = (pack?.review?.sourcesChecked || []).map((s) => ({
    claim: s.recommendation,
    sourceUrl: s.url,
    sourceSection: [s.organisation, s.title, s.date].filter(Boolean).join(" · "),
    limitations: s.limitations || "Checked by the editor; clinician decision pending.",
    reviewerDecision: approval ? "accepted" : "pending",
  }));

  const claimLedger = (article.sources || []).slice(0, 3).map((url) => ({
    claim: `Education on “${article.primary_question || article.title}” should stay within patient-information limits and avoid invented doses, timelines, or guaranteed outcomes.`,
    sourceUrl: url,
    sourceSection: "patient information / FAQ landing",
    limitations:
      "Source supports general orientation only; population, exclusions, and local pathways may differ. Clinician must review before approval.",
    reviewerDecision: approval ? "accepted" : "pending",
  }));

  const openClinicalQuestions = [
    `Please confirm triage language in “when to seek care” for ${article.id}.`,
    `Please confirm whether any diagram wording needs correction for ${slug}.`,
    article.doctor_id === "zalak"
      ? "Dr. Charmi Shah should review any medical differential, pregnancy precaution, or medication language."
      : "Dr. Zalak Shah should review any rehabilitation or exercise prescription language if present.",
  ];

  const bodyFingerprintText = [
    article.title,
    directAnswer,
    ...cleanedSections.flatMap((s) => [s.heading, ...s.paragraphs]),
  ].join("\n");

  const { publicationStatus, ...publishedDates } = publicationFields(article.id);

  const explainerCards = (() => {
    const fromPack = Array.isArray(pack?.explainerCards) ? pack.explainerCards : null;
    const fromFile = explainerCardsById?.[article.id];
    const chosen = (fromPack?.length ? fromPack : fromFile) || [];
    const cleaned = chosen.map((t) => String(t || "").trim()).filter(Boolean).slice(0, 4);
    return cleaned.length === 4 ? cleaned : undefined;
  })();

  return {
    id: article.id,
    slug,
    action: article.action,
    publicationStatus,
    scheduledAt: `${article.publish_date}T${article.publish_time || "09:00"}:00+05:30`,
    proposedLeadId: article.doctor_id,
    ...publishedDates,
    title: pack?.title || article.title,
    seoTitle: pack?.seoTitle || buildSeoTitle(article),
    description: pack?.description || buildDescription(article),
    primaryQuestion: pack?.primaryQuestion || article.primary_question || article.title,
    directAnswer,
    storytellingNote: pack ? pack.storytellingNote || "" : article.storytelling_brief || "",
    sections: cleanedSections,
    ...(explainerCards ? { explainerCards } : {}),
    figures,
    references,
    internalLinks,
    ...(pack?.faqs
      ? { faqs: pack.faqs.map((f) => ({ question: f.question, answer: f.answer })) }
      : {}),
    conversionCopy:
      pack?.conversionCopy ||
      article.conversion_copy ||
      `Discuss your questions with ${doctorName(article.doctor_id)}.`,
    conversionPath: "/book-consultation/",
    parentHubPath: article.parent_hub || "/learn/articles/",
    ...(approval
      ? {
          reviewerIds: approval.reviewers,
        }
      : {}),
    claimLedger: reviewedSources.length ? reviewedSources : pack?.claimLedger || claimLedger,
    openClinicalQuestions:
      pack?.review?.openQuestions || pack?.openClinicalQuestions || openClinicalQuestions,
    bodyFingerprintText,
  };
}

const doctorBadges = readJsonIfExists(path.join(ROOT, "blog/drafts/doctor-badges.json"), {});

/** Footer strip with both clinicians' headshots (data URIs: SVG loaded via <img> cannot fetch files). */
function doctorFooter() {
  if (!doctorBadges.zalak || !doctorBadges.charmi) {
    throw new Error(
      "missing blog/drafts/doctor-badges.json — run: node scripts/blog-doctor-badges.mjs",
    );
  }
  const people = [
    {
      key: "zalak",
      x: 60,
      name: "Dr. Zalak Shah (PT)",
      role: "Women's health physiotherapy · STOTT Pilates",
    },
    {
      key: "charmi",
      x: 470,
      name: "Dr. Charmi Shah",
      role: "OB-GYN · IVF · Laparoscopy",
    },
  ];
  const cy = 592;
  const r = 38;
  const items = people
    .map(
      (p) => `
  <clipPath id="clip-${p.key}"><circle cx="${p.x + r}" cy="${cy}" r="${r}"/></clipPath>
  <image href="${doctorBadges[p.key]}" x="${p.x}" y="${cy - r}" width="${r * 2}" height="${r * 2}" preserveAspectRatio="xMidYMid slice" clip-path="url(#clip-${p.key})"/>
  <circle cx="${p.x + r}" cy="${cy}" r="${r}" fill="none" stroke="#fff" stroke-width="3"/>
  <circle cx="${p.x + r}" cy="${cy}" r="${r + 1.5}" fill="none" stroke="#c98a9a" stroke-width="1.5"/>
  <text x="${p.x + r * 2 + 16}" y="${cy - 4}" font-family="Georgia, serif" font-size="19" fill="#2f2430">${escapeXml(p.name)}</text>
  <text x="${p.x + r * 2 + 16}" y="${cy + 18}" font-family="Helvetica, Arial, sans-serif" font-size="13" fill="#6b5a60">${escapeXml(p.role)}</text>`,
    )
    .join("");
  return `<text x="60" y="540" font-family="Helvetica, Arial, sans-serif" font-size="13" font-weight="700" letter-spacing="1.2" fill="#8a4b5c">WOMEN'S HEALTH DUO CLINICIANS</text>${items}`;
}

/** Split a heading into at most two lines of ~40 characters for a 500px card. */
function cardLines(text, max = 40) {
  const words = String(text).split(/\s+/);
  const lines = [""];
  for (const w of words) {
    const cur = lines[lines.length - 1];
    if (!cur) lines[lines.length - 1] = w;
    else if (`${cur} ${w}`.length <= max) lines[lines.length - 1] = `${cur} ${w}`;
    else if (lines.length < 2) lines.push(w);
    else {
      lines[1] = `${lines[1].replace(/[\s,;:]+$/, "")}…`;
      break;
    }
  }
  return lines;
}

/**
 * Prefer dedicated Google Images hooks (`explainer-cards.json` / pack.explainerCards)
 * so card copy can be curiosity questions (not answer spoilers). Fall back to the first four H2s.
 * Every card must still be answered in the article body (section or FAQ).
 */
function resolveExplainerCardTexts(built, planArticle) {
  const fromPack = built.explainerCards;
  const fromFile = explainerCardsById?.[planArticle.id];
  const preferred = (Array.isArray(fromPack) && fromPack.length ? fromPack : fromFile) || [];
  const cleaned = preferred.map((t) => String(t || "").trim()).filter(Boolean).slice(0, 4);
  if (cleaned.length === 4) return cleaned;
  const fromHeadings = (built.sections || [])
    .slice(0, 4)
    .map((s) => String(s.heading || "").trim())
    .filter(Boolean);
  return [...cleaned, ...fromHeadings.filter((h) => !cleaned.includes(h))].slice(0, 4);
}

/** `built` is the generated article (final title + section headings); `planArticle` supplies the lead. */
function svgExplainer(built, planArticle) {
  const title = (built.title || "").slice(0, 72);
  const lead = doctorName(planArticle.doctor_id);
  const alt = built.figures.find((f) => f.src.endsWith(".svg"))?.alt || title;
  const cardTexts = resolveExplainerCardTexts(built, planArticle);
  const cards = cardTexts
    .map((text, i) => {
      const x = 60 + (i % 2) * 540;
      const y = 210 + Math.floor(i / 2) * 160;
      const lines = cardLines(text);
      const tspans = lines
        .map(
          (line, li) =>
            `<tspan x="${x + 24}" dy="${li === 0 ? 0 : 26}">${li === 0 ? `${i + 1}. ` : ""}${escapeXml(line)}</tspan>`,
        )
        .join("");
      return `
  <rect x="${x}" y="${y}" width="500" height="130" rx="18" fill="#fff" stroke="#e8d5d8" stroke-width="2"/>
  <text x="${x + 24}" y="${y + 52}" font-family="Georgia, serif" font-size="20" fill="#5c2a3a">${tspans}</text>`;
    })
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="675" viewBox="0 0 1200 675" role="img" aria-label="${escapeXml(alt)}">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#faf6f4"/>
      <stop offset="100%" stop-color="#f3e7ea"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="675" fill="url(#bg)"/>
  <circle cx="1080" cy="80" r="120" fill="#e8c5cd" opacity="0.35"/>
  <circle cx="80" cy="600" r="140" fill="#d9e4df" opacity="0.4"/>
  <text x="60" y="70" font-family="Helvetica, Arial, sans-serif" font-size="18" font-weight="700" fill="#8a4b5c">Women's Health Duo</text>
  <text x="60" y="120" font-family="Georgia, serif" font-size="34" fill="#2f2430">${escapeXml(title)}</text>
  <text x="60" y="168" font-family="Helvetica, Arial, sans-serif" font-size="16" fill="#7a6670">Topic lead: ${escapeXml(lead)} · Patient education, not a diagnosis</text>
  ${cards}
  ${doctorFooter()}
  <text x="1160" y="630" text-anchor="end" font-family="Helvetica, Arial, sans-serif" font-size="16" fill="#8a4b5c" opacity="0.75">@womenshealthduo</text>
  <text x="1160" y="655" text-anchor="end" font-family="Helvetica, Arial, sans-serif" font-size="16" fill="#8a4b5c" opacity="0.75">womenshealthduo.com</text>
</svg>
`;
}

function escapeXml(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function tsLiteral(obj, indent = 0) {
  const pad = "  ".repeat(indent);
  const pad2 = "  ".repeat(indent + 1);
  if (obj === null) return "null";
  if (typeof obj === "string") return JSON.stringify(obj);
  if (typeof obj === "number" || typeof obj === "boolean") return String(obj);
  if (Array.isArray(obj)) {
    if (obj.length === 0) return "[]";
    return `[\n${obj.map((v) => `${pad2}${tsLiteral(v, indent + 1)}`).join(",\n")}\n${pad}]`;
  }
  const keys = Object.keys(obj);
  return `{\n${keys
    .map((k) => `${pad2}${k}: ${tsLiteral(obj[k], indent + 1)}`)
    .join(",\n")}\n${pad}}`;
}

function main() {
  const plan = JSON.parse(fs.readFileSync(PLAN, "utf8"));
  const articles = plan.articles || [];
  const bodyPacks = loadAllBodyPacks();
  console.log(
    `generate-blog-drafts: clinician body packs loaded: ${Object.keys(bodyPacks).length}`,
  );
  const built = articles.map((a) => buildArticle(a, bodyPacks));

  // `--svg-only`: rewrite just the explainer graphics. Leaves catalog.generated.ts,
  // STATUS.json and claims.json untouched, so published status and dates are kept.
  if (process.argv.includes("--svg-only")) {
    for (const a of built) {
      const imgRel = a.figures.find((f) => f.src.endsWith(".svg")).src.replace(/^\//, "");
      const imgAbs = path.join(ROOT, "public", imgRel);
      fs.mkdirSync(path.dirname(imgAbs), { recursive: true });
      fs.writeFileSync(
        imgAbs,
        svgExplainer(
          a,
          articles.find((x) => x.id === a.id),
        ),
      );
    }
    console.log(`generate-blog-drafts: rewrote ${built.length} SVG explainers (--svg-only)`);
    return;
  }

  const status = {
    ...previousStatus,
    timezone: plan.timezone || "Asia/Kolkata",
    generatedAt: new Date().toISOString(),
    note:
      previousStatus.note ||
      "Draft packages only. publicationStatus stays draft until the owner records publication in STATUS.json.",
    articles: built.map((a) => {
      const prev = previousStatusById.get(a.id) || {};
      return {
        ...prev,
        id: a.id,
        slug: a.slug,
        action: a.action,
        scheduledAt: a.scheduledAt,
        publicationStatus: a.publicationStatus,
        imageApproval: prev.imageApproval || "pending",
        clinicalApproval: prev.clinicalApproval || "pending",
        proposedLeadId: a.proposedLeadId,
      };
    }),
  };

  fs.mkdirSync(path.dirname(OUT_STATUS), { recursive: true });
  fs.writeFileSync(OUT_STATUS, `${JSON.stringify(status, null, 2)}\n`);

  for (const a of built) {
    const dir = path.join(ROOT, "blog/drafts", a.id);
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(
      path.join(dir, "claims.json"),
      `${JSON.stringify(
        {
          id: a.id,
          openClinicalQuestions: a.openClinicalQuestions,
          claimLedger: a.claimLedger,
        },
        null,
        2,
      )}\n`,
    );

    const imgRel = a.figures.find((f) => f.src.endsWith(".svg")).src.replace(/^\//, "");
    const imgAbs = path.join(ROOT, "public", imgRel);
    fs.mkdirSync(path.dirname(imgAbs), { recursive: true });
    const planArticle = articles.find((x) => x.id === a.id);
    fs.writeFileSync(imgAbs, svgExplainer(a, planArticle));
  }

  const fileClean = `/**
 * AUTO-GENERATED by scripts/generate-blog-drafts.mjs — do not hand-edit.
 * publicationStatus and dates are carried over from blog/drafts/STATUS.json.
 * Review bylines are included when STATUS records clinical approval.
 */
import type { CalendarArticleRevision } from "./types";

export const CALENDAR_ARTICLES: CalendarArticleRevision[] = ${tsLiteral(built)};

export const CALENDAR_ARTICLE_BY_ID: ReadonlyMap<string, CalendarArticleRevision> = new Map(
  CALENDAR_ARTICLES.map((a) => [a.id, a]),
);

export const CALENDAR_ARTICLE_BY_SLUG: ReadonlyMap<string, CalendarArticleRevision> = new Map(
  CALENDAR_ARTICLES.map((a) => [a.slug, a]),
);

/** Published calendar body. Drafts stay off the public site. */
export function publishedArticleForSlug(slug: string): CalendarArticleRevision | undefined {
  const a = CALENDAR_ARTICLE_BY_SLUG.get(slug);
  return a?.publicationStatus === "published" ? a : undefined;
}

export function calendarArticleBodyText(slug: string): string | undefined {
  const a = publishedArticleForSlug(slug);
  return a?.bodyFingerprintText;
}
`;

  fs.mkdirSync(path.dirname(OUT_CATALOG), { recursive: true });
  fs.writeFileSync(OUT_CATALOG, fileClean);

  // New article row stubs for topicGuideRows (printed for merge helper)
  const news = built.filter((a) => a.action === "New");
  fs.writeFileSync(
    path.join(ROOT, "blog/drafts/NEW_SLUGS.json"),
    `${JSON.stringify(
      news.map((a) => ({
        id: a.id,
        slug: a.slug,
        title: a.title,
        proposedLeadId: a.proposedLeadId,
        indexable: false,
      })),
      null,
      2,
    )}\n`,
  );

  console.log(
    `generate-blog-drafts: ${built.length} articles, ${news.length} new slugs, images under public/images/articles/`,
  );
  console.log(`  catalog → ${path.relative(ROOT, OUT_CATALOG)}`);
  console.log(`  status  → ${path.relative(ROOT, OUT_STATUS)}`);
}

main();
