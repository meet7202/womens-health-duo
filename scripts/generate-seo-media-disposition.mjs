#!/usr/bin/env node
/**
 * SEO-36: per-record Learn media editorial disposition for all hub clips.
 * Default decision: reviewed-keep (useful clip scaffolding — not clinician approval).
 * Flags: ig-cr1otdannn4 / ig-dbtawiyp_m_ → nonindex-archive;
 *        ovarian-reserve hold IDs → owner-needed.
 *
 * Usage: node scripts/generate-seo-media-disposition.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createServer } from "vite";
import react from "@vitejs/plugin-react-swc";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const outCsv = path.join(root, "docs/seo-media-disposition.csv");

/** SEO-16 platform-unavailable / empty-error reels. */
const NONINDEX_ARCHIVE_IDS = new Set(["ig-cr1otdannn4", "ig-dbtawiyp_m_"]);

/** SEO-15 ovarian-reserve caption hold — clinician sign-off required. */
const OWNER_NEEDED_IDS = new Set(["yt-duo-fertility-tests", "YE9qPLTptRw", "ig-c9ppwbmplho"]);

function csvEscape(value) {
  const s = String(value ?? "");
  if (/[",\n\r]/.test(s)) return `"${s.replace(/"/g, '""')}"`;
  return s;
}

function dispositionFor(video) {
  const ids = [video.id];
  if (video.kind === "youtube_short" && video.youtubeVideoId) ids.push(video.youtubeVideoId);
  if (video.kind === "instagram_reel" && video.instagramReelId) {
    ids.push(video.instagramReelId, `ig-${video.instagramReelId}`);
  }
  if (video.kind === "instagram_post" && video.instagramPostId) {
    ids.push(video.instagramPostId, `igp-${video.instagramPostId}`);
  }

  for (const id of ids) {
    if (NONINDEX_ARCHIVE_IDS.has(id) || NONINDEX_ARCHIVE_IDS.has(String(id).toLowerCase())) {
      return {
        decision: "nonindex-archive",
        rationale:
          "SEO-16: platform-unavailable or empty-error reel; keep watch URL noindex/archive",
        task_ids: "SEO-16;SEO-36",
      };
    }
  }
  for (const id of ids) {
    if (OWNER_NEEDED_IDS.has(id) || OWNER_NEEDED_IDS.has(String(id).toLowerCase())) {
      return {
        decision: "owner-needed",
        rationale:
          "SEO-15: ovarian-reserve quantity≠quality caption hold pending Dr. Charmi sign-off",
        task_ids: "SEO-15;SEO-36",
      };
    }
  }
  return {
    decision: "reviewed-keep",
    rationale: "Useful Learn clip scaffolding default; deeper caption/title review still open",
    task_ids: "SEO-36",
  };
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
    const hubMod = await server.ssrLoadModule("/src/data/knowledgeHubVideos.ts");
    const videos = hubMod.KNOWLEDGE_HUB_VIDEOS;
    const header = [
      "id",
      "kind",
      "path",
      "decision",
      "rationale",
      "task_ids",
      "postedAt",
      "status",
    ];
    const lines = [header.join(",")];
    const counts = { "reviewed-keep": 0, "nonindex-archive": 0, "owner-needed": 0, other: 0 };

    for (const video of videos) {
      const d = dispositionFor(video);
      counts[d.decision] = (counts[d.decision] ?? 0) + 1;
      lines.push(
        [
          video.id,
          video.kind,
          `/learn/watch/${video.id}/`,
          d.decision,
          d.rationale,
          d.task_ids,
          video.postedAt ?? "",
          "pending",
        ]
          .map(csvEscape)
          .join(","),
      );
    }

    if (videos.length !== 203) {
      console.warn(`generate-seo-media-disposition: expected 203 media rows, got ${videos.length}`);
    }

    fs.mkdirSync(path.dirname(outCsv), { recursive: true });
    fs.writeFileSync(outCsv, `${lines.join("\n")}\n`, "utf8");
    console.log(
      `generate-seo-media-disposition: wrote ${videos.length} rows → ${path.relative(root, outCsv)}`,
    );
    console.log(
      `  decisions: reviewed-keep=${counts["reviewed-keep"] ?? 0} nonindex-archive=${counts["nonindex-archive"] ?? 0} owner-needed=${counts["owner-needed"] ?? 0}`,
    );
  } finally {
    await server.close();
  }
}

main().catch((err) => {
  console.error(`generate-seo-media-disposition: ${err.message}`);
  console.error(err.stack);
  process.exit(1);
});
