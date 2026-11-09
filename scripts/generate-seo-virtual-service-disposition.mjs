#!/usr/bin/env node
/**
 * SEO-11: service-family disposition for the city×service matrix (not 6,565 paraphrases).
 * Defaults every family to keep-improve; protects GSC-clicked paths from migration CSV.
 * Freeze remains VIRTUAL_CONSULTATION_CITY_COUNT_FREEZE — no silent expansion.
 *
 * Usage: node scripts/generate-seo-virtual-service-disposition.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createServer } from "vite";
import react from "@vitejs/plugin-react-swc";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const outCsv = path.join(root, "docs/seo-virtual-service-disposition.csv");
const migrationCsv = path.join(root, "docs/seo-url-migration.csv");

function csvEscape(value) {
  const s = String(value ?? "");
  if (/[",\n\r]/.test(s)) return `"${s.replace(/"/g, '""')}"`;
  return s;
}

function parseProtectedServicePaths() {
  if (!fs.existsSync(migrationCsv)) return new Map();
  const text = fs.readFileSync(migrationCsv, "utf8");
  const lines = text.split(/\r?\n/).filter(Boolean);
  const header = lines[0]?.split(",") ?? [];
  const pathIdx = header.indexOf("normalized_path");
  const familyIdx = header.indexOf("family");
  const clicksIdx = header.indexOf("clicks");
  const byService = new Map();
  for (const line of lines.slice(1)) {
    // Simple CSV split is enough for this file's rows (no embedded commas in family).
    const cols = line.split(",");
    const family = cols[familyIdx] ?? "";
    if (!family.includes("city × service") && !family.includes("Virtual city × service")) continue;
    const norm = cols[pathIdx] ?? "";
    const clicks = Number(cols[clicksIdx] ?? 0) || 0;
    const parts = norm.split("/").filter(Boolean);
    // /online-consultation/{city}/{service}
    if (parts.length < 3 || parts[0] !== "online-consultation") continue;
    const serviceSlug = parts[parts.length - 1];
    const entry = byService.get(serviceSlug) ?? { paths: [], clicks: 0 };
    entry.paths.push(norm);
    entry.clicks += clicks;
    byService.set(serviceSlug, entry);
  }
  return byService;
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
    const servicesMod = await server.ssrLoadModule("/src/data/seoOnlineServices.ts");
    const virtualMod = await server.ssrLoadModule("/src/lib/virtualConsultation.ts");
    const services = servicesMod.SEO_ONLINE_SERVICES;
    const cityCount = virtualMod.VIRTUAL_CONSULTATION_CITIES.length;
    const freeze = virtualMod.VIRTUAL_CONSULTATION_CITY_COUNT_FREEZE;
    const protectedByService = parseProtectedServicePaths();

    const header = [
      "service_slug",
      "short_title",
      "doctor",
      "city_count",
      "matrix_urls",
      "decision",
      "hub_path",
      "gsc_protected_paths",
      "gsc_clicks_sum",
      "rationale",
      "status",
    ];
    const lines = [header.join(",")];

    for (const s of services) {
      const prot = protectedByService.get(s.slug) ?? { paths: [], clicks: 0 };
      lines.push(
        [
          s.slug,
          s.shortTitle,
          s.doctor,
          cityCount,
          cityCount,
          "keep-improve",
          `/online-consultation/`,
          prot.paths.length,
          prot.clicks,
          "SEO-11 freeze: retain indexable city×service shells; strengthen hub CTAs; no mass-noindex of Appendix A / uncertain rows; no invented local clinics",
          "reviewed-keep",
        ]
          .map(csvEscape)
          .join(","),
      );
    }

    fs.writeFileSync(outCsv, `${lines.join("\n")}\n`, "utf8");
    console.log(
      `generate-seo-virtual-service-disposition: wrote ${services.length} service rows → ${path.relative(root, outCsv)}`,
    );
    console.log(
      `  cities=${cityCount} freeze=${freeze} matrix≈${cityCount * services.length} protected_service_paths=${[...protectedByService.values()].reduce((n, e) => n + e.paths.length, 0)}`,
    );
    if (cityCount > freeze) {
      console.error(`SEO-11 FAIL: city count ${cityCount} exceeds freeze ${freeze}`);
      process.exitCode = 1;
    }
  } finally {
    await server.close();
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
