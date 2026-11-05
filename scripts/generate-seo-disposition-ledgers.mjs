#!/usr/bin/env node
/**
 * SEO-12 / SEO-32 / SEO-36 — generate disposition ledgers from live route + media data.
 *
 * Writes:
 *   docs/seo-guide-disposition.csv
 *   docs/seo-page-status.csv
 *   docs/seo-media-disposition.csv
 *
 * Usage: node scripts/generate-seo-disposition-ledgers.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createServer } from "vite";
import react from "@vitejs/plugin-react-swc";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const docs = path.join(root, "docs");

function csvEscape(value) {
  const s = String(value ?? "");
  if (/[",\n\r]/.test(s)) return `"${s.replace(/"/g, '""')}"`;
  return s;
}

function writeCsv(filePath, headers, rows) {
  const lines = [headers.join(",")];
  for (const row of rows) {
    lines.push(headers.map((h) => csvEscape(row[h])).join(","));
  }
  fs.writeFileSync(filePath, `${lines.join("\n")}\n`, "utf8");
  console.log(`wrote ${path.relative(root, filePath)} (${rows.length} rows)`);
}

function contentFamily(pathname) {
  if (pathname === "/" || pathname === "") return "homepage";
  if (pathname.startsWith("/learn/watch/")) return "learn_watch";
  if (pathname.startsWith("/learn")) return "learn_hub";
  if (pathname.startsWith("/online-consultation/country/")) return "virtual_country";
  if (
    pathname.startsWith("/online-consultation/") &&
    pathname.split("/").filter(Boolean).length >= 3
  ) {
    return "virtual_city_service";
  }
  if (
    pathname.startsWith("/online-consultation/") &&
    pathname.split("/").filter(Boolean).length === 2
  ) {
    return "virtual_city";
  }
  if (pathname.startsWith("/online-consultation")) return "virtual_hub";
  if (pathname.startsWith("/international-consultation")) return "international";
  if (pathname === "/prenatal" || pathname === "/postnatal" || pathname === "/pilates") {
    return "zalak_group_class";
  }
  if (pathname === "/dr-charmi-shah" || pathname === "/dr-zalak-shah") return "doctor_profile";
  if (["/mumbai", "/ahmedabad", "/valsad", "/bangalore"].includes(pathname)) return "india_city";
  if (pathname.startsWith("/book-consultation")) return "booking";
  return "other_or_topic_guide";
}

async function main() {
  const server = await createServer({
    root,
    configFile: false,
    plugins: [react()],
    resolve: { alias: { "@": path.join(root, "src") } },
    server: { middlewareMode: true },
    appType: "custom",
  });

  try {
    const guidesMod = await server.ssrLoadModule("/src/data/topicGuides/topicGuideRows.ts");
    const uniquenessMod = await server.ssrLoadModule(
      "/src/data/topicGuides/guideUniquenessOverrides.ts",
    );
    const routesMod = await server.ssrLoadModule("/src/config/routes.ts");
    const videosMod = await server.ssrLoadModule("/src/data/knowledgeHubVideos.ts");
    const captionMod = await server.ssrLoadModule("/src/data/knowledgeHubCaptionEditorial.ts");

    const priority = new Set(uniquenessMod.GUIDE_UNIQUENESS_PRIORITY_SLUGS || []);
    const overrides = uniquenessMod.GUIDE_UNIQUENESS_OVERRIDES || {};

    const guideRows = (guidesMod.TOPIC_GUIDE_ROWS || []).map((row) => {
      const ov = overrides[row.slug];
      return {
        path: `/${row.slug}/`,
        title: row.title || row.slug,
        cluster: row.cluster,
        primaryQuestion: row.primaryQuestion || ov?.primaryQuestion || "",
        decision: "keep-improve",
        clinical_reviewer_required: "yes",
        status: "pending",
        uniqueness_scaffold: priority.has(row.slug) ? "yes" : "no",
      };
    });
    writeCsv(
      path.join(docs, "seo-guide-disposition.csv"),
      [
        "path",
        "title",
        "cluster",
        "primaryQuestion",
        "decision",
        "clinical_reviewer_required",
        "status",
        "uniqueness_scaffold",
      ],
      guideRows,
    );

    const sitemapPaths = [...routesMod.SITEMAP_PATHS].map((p) => {
      const core = (p.startsWith("/") ? p : `/${p}`).replace(/\/+$/, "") || "/";
      return core === "/" ? "/" : `${core}/`;
    });
    const pageRows = sitemapPaths.map((p) => {
      const core = p === "/" ? "/" : p.replace(/\/+$/, "");
      const family = contentFamily(core);
      const taskIds = [];
      if (family === "virtual_city_service") taskIds.push("SEO-11");
      if (family === "other_or_topic_guide" && core.length > 2) taskIds.push("SEO-12");
      if (family === "learn_watch") taskIds.push("SEO-16", "SEO-19");
      if (family === "zalak_group_class") taskIds.push("SEO-04", "SEO-08");
      return {
        path: p,
        family,
        decision: "keep-improve",
        task_ids: taskIds.join("|") || "SEO-32",
        source_check: "unknown",
        built_html: "unknown",
        http: "unknown",
      };
    });
    writeCsv(
      path.join(docs, "seo-page-status.csv"),
      ["path", "family", "decision", "task_ids", "source_check", "built_html", "http"],
      pageRows,
    );

    const videos = videosMod.KNOWLEDGE_HUB_VIDEOS || [];
    const lockedKeys = new Set(
      (captionMod.lockedCaptionEditorialKeys?.() || []).map((k) => String(k).toLowerCase()),
    );
    lockedKeys.add("ye9qpltptrw");
    lockedKeys.add("ig-c9ppwbmplho");
    lockedKeys.add("c9ppwbmplho");
    lockedKeys.add("yt-duo-fertility-tests");
    const nonindex = new Set(["ig-cr1otdannn4", "ig-dbtawiyp_m_"]);

    const mediaRows = videos.map((v) => {
      let decision = "reviewed-keep";
      let notes = "";
      const idLow = String(v.id || "").toLowerCase();
      const ytLow = String(v.youtubeVideoId || "").toLowerCase();
      if (nonindex.has(v.id)) {
        decision = "nonindex-archive";
        notes = "SEO-16 empty/error caption; no VideoObject";
      } else if (
        lockedKeys.has(idLow) ||
        lockedKeys.has(ytLow) ||
        captionMod.captionEditorialHoldForKey?.(v.id) ||
        captionMod.captionEditorialHoldForKey?.(v.youtubeVideoId)
      ) {
        decision = "owner-needed";
        notes = "SEO-15 ovarian-reserve / caption clinical hold";
      }
      return {
        id: v.id,
        kind: v.kind,
        doctor: v.doctor,
        decision,
        review_status: decision === "reviewed-keep" ? "reviewed-keep" : "pending",
        notes,
      };
    });
    writeCsv(
      path.join(docs, "seo-media-disposition.csv"),
      ["id", "kind", "doctor", "decision", "review_status", "notes"],
      mediaRows,
    );

    const invPath = path.join(docs, "seo-route-inventory.csv");
    if (fs.existsSync(invPath)) {
      const invLines = fs.readFileSync(invPath, "utf8").trim().split("\n").length - 1;
      console.log(
        `membership check: page-status=${pageRows.length} sitemap; inventory≈${invLines} (expect same order of magnitude)`,
      );
    }
  } finally {
    await server.close();
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
