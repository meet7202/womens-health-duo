#!/usr/bin/env node
/**
 * Calendar status vs blog/drafts/STATUS.json (Asia/Kolkata).
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const PLAN = path.join(ROOT, "blog/WHD_AGENT_ARTICLE_PROMPTS/WHD_BLOG_PLAN.json");
const STATUS = path.join(ROOT, "blog/drafts/STATUS.json");

function todayIst() {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Kolkata",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date());
}

function main() {
  const plan = JSON.parse(fs.readFileSync(PLAN, "utf8"));
  const status = JSON.parse(fs.readFileSync(STATUS, "utf8"));
  const byId = new Map(status.articles.map((a) => [a.id, a]));
  const today = todayIst();

  console.log(`blog:status — today ${today} (${plan.timezone || "Asia/Kolkata"})`);
  console.log(`cadence: ${plan.cadence}`);
  console.log("");

  const rows = plan.articles.map((a) => {
    const s = byId.get(a.id);
    return {
      id: a.id,
      date: a.publish_date,
      due: a.publish_date <= today ? "DUE/PAST" : "upcoming",
      publicationStatus: s?.publicationStatus ?? "missing",
      clinicalApproval: s?.clinicalApproval ?? "unknown",
      imageApproval: s?.imageApproval ?? "unknown",
      title: a.title,
    };
  });

  const due = rows.filter((r) => r.due === "DUE/PAST" && r.publicationStatus !== "published");
  const next = rows.filter((r) => r.due === "upcoming").slice(0, 4);

  console.log(`Pending past/due (not published): ${due.length}`);
  for (const r of due.slice(0, 8)) {
    console.log(
      `  ${r.id}  ${r.date}  [${r.publicationStatus}/${r.clinicalApproval}]  ${r.title.slice(0, 60)}`,
    );
  }
  console.log("");
  console.log("Next upcoming:");
  for (const r of next) {
    console.log(
      `  ${r.id}  ${r.date}  [${r.publicationStatus}/${r.clinicalApproval}]  ${r.title.slice(0, 60)}`,
    );
  }

  const counts = rows.reduce((acc, r) => {
    acc[r.publicationStatus] = (acc[r.publicationStatus] || 0) + 1;
    return acc;
  }, {});
  console.log("");
  console.log("Counts by publicationStatus:", counts);
  console.log("");
  console.log("Promote only when clinicalApproval=approved: npm run blog:promote -- --id=W01-Z");
}

main();
