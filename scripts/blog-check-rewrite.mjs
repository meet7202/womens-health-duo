#!/usr/bin/env node
/**
 * Validate whole-article revisions in
 * src/data/topicGuides/articles/bodies/rewrites/<ID>.json
 *
 * There is deliberately no minimum word count: length targets caused the old
 * padding. Checks focus on leaked editing notes, filler, attribution, sourcing
 * and repetition across articles.
 *
 * Usage:
 *   node scripts/blog-check-rewrite.mjs W01-Z W01-C   # check specific ids
 *   node scripts/blog-check-rewrite.mjs --all         # check every revision
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const PLAN = path.join(ROOT, "blog/WHD_AGENT_ARTICLE_PROMPTS/WHD_BLOG_PLAN.json");
const DIR = path.join(ROOT, "src/data/topicGuides/articles/bodies/rewrites");

const plan = JSON.parse(fs.readFileSync(PLAN, "utf8"));
const byId = Object.fromEntries(plan.articles.map((a) => [a.id, a]));

/** Articles whose topic requires a verified supplement dose in the text. */
const DOSE_ALLOWED = new Set(["W03-C", "W09-C"]);

const words = (s) => String(s).split(/\s+/).filter(Boolean).length;

const BANNED = [
  [/\b(best|No\.\s?1|number one|miracle|100%)\b/i, "superlative or promise"],
  [
    /\b(delve|tapestry|embark|navigat(e|ing) the|in today's|it is important to note|it's important to note|in conclusion|holistic journey|unlock|empower|game[- ]changer|seamless|landscape)\b/i,
    "stock AI phrasing",
  ],
  [/\bas an AI\b/i, "AI self-reference"],
  [/it should inform a conversation, not become/i, "old template filler"],
  [/the reader can prepare by recording/i, "old template filler"],
  [/a technically ideal plan that cannot be/i, "old template filler"],
  [/would place this detail/i, "old template filler"],
  [/this matters because two people asking/i, "old template filler"],
  [/in clinic, the practical question is what this changes/i, "old template filler"],
  [/advice should also fit the person's life/i, "old template filler"],
  [/a useful way to think about “/i, "old template filler"],
  [/\bfinal reviewed version\b/i, "editorial note leaked into copy"],
  [/\bthis draft\b/i, "editorial note leaked into copy"],
  [/\bthis article (intentionally|deliberately)\b/i, "editorial note leaked into copy"],
  [/\bthe brief\b/i, "editorial note leaked into copy"],
  [
    /\bDr\. [A-Z][a-z]+ Shah(?: \(PT\))? should (explain|confirm|review|decide)\b/,
    "instruction to a clinician",
  ],
  [
    /\bDr\. [A-Z][a-z]+ Shah(?: \(PT\))? would (want|ask|place|look|likely)\b/,
    "hypothetical clinician narration",
  ],
  [/\billustrative example\b/i, "invented anecdote"],
  [/\b(composite|imagine a patient|consider a woman who)\b/i, "invented anecdote"],
  [/\breader\b/i, "talks about 'the reader' instead of 'you'"],
  [/\bPass \d+ of clarifying detail\b/i, "old template filler"],
  [/\bpolycystic ovary metabolic syndrome\b/i, "wrong PMOS expansion"],
];

const LANE = [
  [
    /Zalak[^.]{0,80}\b(gyn(a)?ecolog\w*|obstetrician|IVF specialist|fertility specialist|prescrib\w*)/i,
    "Dr. Zalak described in a medical lane",
  ],
  [
    /Charmi[^.]{0,60}\b(physiotherapist|Pilates instructor)/i,
    "Dr. Charmi described as physio/Pilates",
  ],
];

const BUZZ = /\b(individuali[sz]ed|evidence-based|holistic|personali[sz]ed)\b/gi;

function bodyText(b) {
  return [
    b.directAnswer,
    ...(b.sections || []).flatMap((s) => [s.heading, ...s.paragraphs]),
    ...(b.faqs || []).flatMap((f) => [f.question, f.answer]),
  ].join("\n");
}

function sentences(text) {
  return text
    .split(/(?<=[.!?])\s+/)
    .map((s) => s.trim())
    .filter((s) => words(s) >= 12);
}

function checkOne(id) {
  const errors = [];
  const warnings = [];
  const file = path.join(DIR, `${id}.json`);
  if (!fs.existsSync(file))
    return { id, errors: [`missing ${path.relative(ROOT, file)}`], warnings };
  let b;
  try {
    b = JSON.parse(fs.readFileSync(file, "utf8"));
  } catch (e) {
    return { id, errors: [`invalid JSON: ${e.message}`], warnings };
  }
  const a = byId[id];
  if (!a) return { id, errors: [`unknown id ${id}`], warnings };
  if (b.id !== id) errors.push(`"id" must be "${id}"`);

  for (const key of ["title", "description", "primaryQuestion", "directAnswer", "conversionCopy"]) {
    if (typeof b[key] !== "string" || !b[key].trim()) errors.push(`${key} missing`);
  }
  if (b.description && (b.description.length < 70 || b.description.length > 160))
    errors.push(`description ${b.description.length} chars (want 70–160)`);
  if (b.title && /:\s*and\b/i.test(b.title)) errors.push(`awkward colon in title: "${b.title}"`);
  if (b.directAnswer) {
    const n = words(b.directAnswer);
    if (n < 30 || n > 110) errors.push(`directAnswer ${n} words (want 30–110)`);
  }
  if (b.storytellingNote) errors.push("storytellingNote must be empty (no invented anecdotes)");

  const secs = Array.isArray(b.sections) ? b.sections : [];
  if (secs.length < 3 || secs.length > 9) errors.push(`${secs.length} sections (want 3–9)`);
  const headings = new Set();
  for (const [i, s] of secs.entries()) {
    if (!s.heading || typeof s.heading !== "string")
      errors.push(`section ${i + 1} heading missing`);
    else {
      const h = s.heading.trim().toLowerCase();
      if (headings.has(h)) errors.push(`duplicate heading "${s.heading}"`);
      headings.add(h);
      if (h.replace(/\?$/, "") === String(b.title).trim().toLowerCase().replace(/\?$/, ""))
        errors.push(`heading repeats the title: "${s.heading}"`);
      if (s.heading.length > 80) errors.push(`heading too long: "${s.heading}"`);
    }
    const ps = Array.isArray(s.paragraphs) ? s.paragraphs : [];
    if (ps.length < 1 || ps.length > 8)
      errors.push(`section ${i + 1} has ${ps.length} paragraphs (want 1–8)`);
    for (const [j, p] of ps.entries()) {
      const n = words(p);
      if (n < 8 || n > 150)
        errors.push(`section ${i + 1} paragraph ${j + 1}: ${n} words (want 8–150)`);
    }
  }

  const faqs = Array.isArray(b.faqs) ? b.faqs : [];
  if (!Array.isArray(b.faqs)) errors.push("faqs must be an array (may be empty)");
  if (faqs.length > 4) errors.push(`${faqs.length} FAQs (max 4)`);
  for (const f of faqs) {
    if (!/\?$/.test(f.question || "")) errors.push(`FAQ question must end with "?": ${f.question}`);
    if (/\b(book|booking|consultation|whatsapp|appointment)\b/i.test(f.question || ""))
      errors.push(`booking FAQ not allowed: "${f.question}"`);
    const n = words(f.answer || "");
    if (n < 15 || n > 100) errors.push(`FAQ answer ${n} words (want 15–100): ${f.question}`);
  }

  const refs = Array.isArray(b.references) ? b.references : [];
  if (refs.length < 1) errors.push("references missing");
  for (const r of refs) {
    if (!/^https:\/\//.test(r.url || "")) errors.push(`reference url must be https: ${r.url}`);
    if (!r.label || /^[\w.-]+\.[a-z]{2,}$/i.test(r.label.trim()) || !r.label.includes(" "))
      errors.push(`reference label must name organisation and document: "${r.label}"`);
  }

  const review = b.review || {};
  if (!Array.isArray(review.sourcesChecked) || review.sourcesChecked.length < 1)
    errors.push("review.sourcesChecked missing");
  for (const s of review.sourcesChecked || []) {
    for (const k of ["organisation", "title", "url", "recommendation"]) {
      if (!s[k]) errors.push(`review.sourcesChecked entry missing ${k}`);
    }
  }
  if (!Array.isArray(review.openQuestions)) errors.push("review.openQuestions must be an array");
  if (!Array.isArray(review.corrections)) errors.push("review.corrections must be an array");

  const bodyWords =
    words(b.directAnswer || "") +
    secs.flatMap((s) => s.paragraphs || []).reduce((t, p) => t + words(p), 0);
  if (bodyWords < 450)
    warnings.push(`body ${bodyWords} words: check the question is fully answered`);

  const text = bodyText(b);
  for (const [re, why] of BANNED) {
    const m = text.match(re);
    if (m) errors.push(`${why}: "${m[0]}"`);
  }
  for (const [re, why] of LANE) {
    const m = text.match(re);
    if (m) errors.push(`${why}: "${m[0].slice(0, 120)}"`);
  }
  const dose = text.match(/\b\d+(\.\d+)?\s?(mg|mcg|µg|micrograms?|milligrams?|IU)\b/i);
  if (dose && !DOSE_ALLOWED.has(id)) errors.push(`dose or unit number: "${dose[0]}"`);
  const g = text.match(/[^.]*\bguarantee\w*[^.]*\./i);
  if (g && !/\b(no|not|cannot|can't|without|never)\b/i.test(g[0]))
    errors.push(`possible outcome guarantee: "${g[0].trim().slice(0, 120)}"`);

  const nameHits = (text.match(/\bDr\. (Zalak|Charmi) Shah\b/g) || []).length;
  if (nameHits > 3) errors.push(`clinician named ${nameHits} times in body (max 3)`);
  const buzz = (text.match(BUZZ) || []).length;
  if (buzz > 1)
    warnings.push(`buzzwords used ${buzz} times (individualised/evidence-based/holistic)`);
  if (
    !/\b(urgent|emergency|same day|same-day|immediately|straight away|A&E|casualty)\b/i.test(text)
  )
    warnings.push("no urgent-care guidance found (fine only if the topic has no red flags)");

  return { id, errors, warnings, bodyWords, text };
}

function shingles(text, n = 9) {
  const toks = text
    .toLowerCase()
    .replace(/[“”"'’()]/g, "")
    .split(/[^a-z0-9]+/)
    .filter(Boolean);
  const out = new Set();
  for (let i = 0; i + n <= toks.length; i++) out.add(toks.slice(i, i + n).join(" "));
  return out;
}

function main() {
  const args = process.argv.slice(2);
  const all = args.includes("--all");
  let ids = args.filter((x) => !x.startsWith("--"));
  if (all) {
    ids = fs.existsSync(DIR)
      ? fs
          .readdirSync(DIR)
          .filter((f) => f.endsWith(".json"))
          .map((f) => f.replace(/\.json$/, ""))
          .sort()
      : [];
  }
  if (!ids.length) {
    console.error("usage: node scripts/blog-check-rewrite.mjs <ID...> | --all");
    process.exit(1);
  }

  const results = ids.map(checkOne);

  // Cross-article repetition against every revision on disk.
  const existing = fs.existsSync(DIR)
    ? fs
        .readdirSync(DIR)
        .filter((f) => f.endsWith(".json"))
        .map((f) => f.replace(/\.json$/, ""))
    : [];
  const shingleIndex = new Map();
  const sentenceIndex = new Map();
  for (const other of existing) {
    try {
      const ob = JSON.parse(fs.readFileSync(path.join(DIR, `${other}.json`), "utf8"));
      const t = bodyText(ob);
      for (const s of shingles(t)) {
        if (!shingleIndex.has(s)) shingleIndex.set(s, new Set());
        shingleIndex.get(s).add(other);
      }
      for (const s of sentences(t)) {
        const k = s.toLowerCase();
        if (!sentenceIndex.has(k)) sentenceIndex.set(k, new Set());
        sentenceIndex.get(k).add(other);
      }
    } catch {
      /* invalid file reported by its own check */
    }
  }
  for (const r of results) {
    if (!r.text) continue;
    const shared = new Map();
    for (const s of shingles(r.text)) {
      const owners = shingleIndex.get(s);
      if (!owners) continue;
      for (const o of owners) if (o !== r.id) shared.set(o, (shared.get(o) || []).concat(s));
    }
    for (const [o, list] of shared) {
      const msg = `repeats wording from ${o}: "${list[0]}"${list.length > 1 ? ` (+${list.length - 1} more)` : ""}`;
      if (list.length > 2) r.errors.push(msg);
      else r.warnings.push(msg);
    }
    const seen = new Set();
    for (const s of sentences(r.text)) {
      const k = s.toLowerCase();
      if (seen.has(k)) r.errors.push(`sentence repeated within article: "${s.slice(0, 90)}"`);
      seen.add(k);
      const owners = [...(sentenceIndex.get(k) || [])].filter((o) => o !== r.id);
      if (owners.length) r.errors.push(`sentence copied from ${owners[0]}: "${s.slice(0, 90)}"`);
    }
  }

  let failed = 0;
  for (const r of results) {
    const status = r.errors.length ? "FAIL" : "OK";
    if (r.errors.length) failed += 1;
    console.log(`${status} ${r.id}${r.bodyWords ? ` (${r.bodyWords} words)` : ""}`);
    for (const e of r.errors) console.log(`  error: ${e}`);
    for (const w of r.warnings) console.log(`  warn:  ${w}`);
  }
  console.log(`${results.length - failed}/${results.length} passed`);
  process.exit(failed ? 1 : 0);
}

main();
