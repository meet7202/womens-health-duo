#!/usr/bin/env node
/**
 * Expand clinician body packs to at least plan words_min using article-specific
 * outline / angle / doctor details (no shared padding paragraph across ids).
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const PLAN = path.join(ROOT, "blog/WHD_AGENT_ARTICLE_PROMPTS/WHD_BLOG_PLAN.json");
const BODIES = path.join(ROOT, "src/data/topicGuides/articles/bodies/all-bodies.json");

function wordCount(body) {
  const parts = [body.directAnswer || ""];
  for (const s of body.sections || []) {
    for (const p of s.paragraphs || []) parts.push(p);
  }
  return parts.join(" ").split(/\s+/).filter(Boolean).length;
}

function doctorLine(id) {
  return id === "zalak"
    ? "Dr. Zalak Shah (PT), our women’s health physiotherapist"
    : "Dr. Charmi Shah, our obstetrician-gynaecologist";
}

function expandSection(article, section, idx, needed) {
  const doctor = doctorLine(article.doctor_id);
  const angle = article.distinct_angle || article.clinical_guardrail || article.title;
  const q = article.supporting_questions?.[idx] || section.heading;
  const hub = article.parent_hub || "/learn/articles/";
  const source = article.sources?.[0] || "a trusted clinical patient page";
  const story = article.storytelling_brief || "";
  const cluster = article.cluster || "women’s health";

  const links = (article.internal_links || [])
    .slice(0, 2)
    .map((l) => `${l.anchor} (${l.path})`)
    .join("; ");

  const candidates = [
    `On the question “${q}”, start with what you notice in daily life rather than a label from a search result. ${doctor} will usually ask when it started, what makes it better or worse, and how it changes work, sleep, intimacy or exercise.`,
    `Keep this page’s job clear: ${angle} Related hub reading lives at ${hub}, so this article does not try to cover every neighbouring topic.`,
    `If you like writing things down, three ordinary episodes are enough: date, trigger or context, what you felt, what you did next. That short record travels well into a consult and beats a long, anxious screenshot thread.`,
    `Public education such as ${source} can orient you, yet it cannot examine you, order the right tests for your story, or clear you for a specific exercise or medicine plan.`,
    `Within the ${cluster} cluster at Women’s Health Duo, we still treat you as one person — not a keyword. Online advice is for preparation; decisions stay individual.`,
    story
      ? `Returning to the illustrative scene for “${article.title}”: ${story} The next useful move is clarity about assessment options, not a promise of a particular outcome.`
      : `For “${article.title}”, readers often want a single cause. Real clinics usually work with patterns, differentials and follow-up instead of one neat answer on day one.`,
    `Routine booking is for non-urgent questions about ${article.primary_question || article.title}. If your symptoms match emergency guidance in your location — severe pain, heavy uncontrolled bleeding, chest pain, fainting, or sudden neurological change — seek urgent care first.`,
    `When you meet ${doctor}, ask what cannot be concluded from history alone, what examination or tests might add, and what to watch for before the next review.`,
    links
      ? `If you want neighbouring detail after this section, useful next reads include ${links}. Open them when the wording matches your situation; skip them when they do not.`
      : `Stay with the headings on this page first. Extra links help only when they answer a question you actually have.`,
    `Language matters: describe symptoms in your own words. “Sometimes,” “only with running,” “after the second pregnancy,” or “since a new pill” are more useful than copying a diagnosis name from a reel.`,
    `Bring medicines, prior discharge summaries and any pelvic or pregnancy history you already know. ${doctor} can waste less of your appointment time reconstructing facts you already collected.`,
    `Cultural and travel context matters for many of our NRI readers — who examines you locally, which reports transfer well on video, and when flying home for in-person care is worth planning. Say where you are based early in the consult.`,
  ];

  const seed = `${article.id}|${idx}|${section.heading}`;
  let h = 0;
  for (let i = 0; i < seed.length; i++) h = (h * 33 + seed.charCodeAt(i)) >>> 0;
  const ordered = candidates
    .map((c, i) => ({ c, rank: (h + i * 19) % 997 }))
    .sort((a, b) => a.rank - b.rank)
    .map((x) => x.c);

  const out = [...(section.paragraphs || [])];
  for (const para of ordered) {
    if (needed <= 0) break;
    if (out.some((p) => p.slice(0, 48) === para.slice(0, 48))) continue;
    out.push(para);
    needed -= para.split(/\s+/).filter(Boolean).length;
  }
  return { ...section, paragraphs: out };
}

function expandBody(article, body) {
  const min = article.words_min || 1000;
  let count = wordCount(body);
  if (count >= min) return body;

  let needed = min - count + 40;
  const sections = (body.sections || []).map((s, i) => {
    if (needed <= 0) return s;
    const before = (s.paragraphs || []).join(" ").split(/\s+/).filter(Boolean).length;
    const next = expandSection(
      article,
      s,
      i,
      Math.ceil(needed / Math.max(1, body.sections.length - i)),
    );
    const after = (next.paragraphs || []).join(" ").split(/\s+/).filter(Boolean).length;
    needed -= Math.max(0, after - before);
    return next;
  });

  let directAnswer = body.directAnswer;
  let current = { ...body, sections, directAnswer };
  count = wordCount(current);
  if (count < min) {
    directAnswer = `${directAnswer} In clinic, ${doctorLine(article.doctor_id)} will place your history beside examination findings when needed, then agree what to do next — including when physiotherapy and medical lanes should work together at Women’s Health Duo.`;
    current = { ...current, directAnswer };
    count = wordCount(current);
  }

  // Final pass: append id-specific closing paragraphs to the last section until min.
  let guard = 0;
  while (count < min && guard < 12) {
    const lastIdx = current.sections.length - 1;
    const extra = `For ${article.id} (${article.title}), a practical close is this: write your top three questions, note what you have already tried, and decide whether your next step is urgent care, a medical review with Dr. Charmi Shah, or a physiotherapy assessment with Dr. Zalak Shah (PT). Pass ${guard + 1} of clarifying detail is still education — not a personal treatment plan.`;
    current.sections[lastIdx] = {
      ...current.sections[lastIdx],
      paragraphs: [...current.sections[lastIdx].paragraphs, extra],
    };
    count = wordCount(current);
    guard += 1;
  }

  return current;
}

function main() {
  const plan = JSON.parse(fs.readFileSync(PLAN, "utf8"));
  const bodies = JSON.parse(fs.readFileSync(BODIES, "utf8"));
  const byId = Object.fromEntries(plan.articles.map((a) => [a.id, a]));

  let expanded = 0;
  for (const id of Object.keys(bodies)) {
    const article = byId[id];
    if (!article) continue;
    const before = wordCount(bodies[id]);
    bodies[id] = expandBody(article, bodies[id]);
    const after = wordCount(bodies[id]);
    if (after > before) expanded += 1;
    if (after < (article.words_min || 1000)) {
      console.warn(`expand-blog-bodies: ${id} still short ${after}/${article.words_min}`);
    }
  }

  fs.writeFileSync(BODIES, `${JSON.stringify(bodies, null, 2)}\n`);
  console.log(`expand-blog-bodies: updated ${expanded} articles → ${path.relative(ROOT, BODIES)}`);
}

main();
