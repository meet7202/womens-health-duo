#!/usr/bin/env node
/**
 * SEO-32: page-status ledger seeded from docs/seo-route-inventory.csv (or regenerated
 * route collection). Writes docs/seo-page-status.csv with unknown verification fields.
 *
 * Usage: node scripts/generate-seo-page-status.mjs
 * Test:  node scripts/test-seo-page-status.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createServer } from "vite";
import react from "@vitejs/plugin-react-swc";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const inventoryCsv = path.join(root, "docs/seo-route-inventory.csv");
const outCsv = path.join(root, "docs/seo-page-status.csv");

function csvEscape(value) {
  const s = String(value ?? "");
  if (/[",\n\r]/.test(s)) return `"${s.replace(/"/g, '""')}"`;
  return s;
}

function parseCsvLine(line) {
  const cells = [];
  let cur = "";
  let inQuotes = false;
  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (inQuotes) {
      if (ch === '"' && line[i + 1] === '"') {
        cur += '"';
        i++;
      } else if (ch === '"') {
        inQuotes = false;
      } else {
        cur += ch;
      }
    } else if (ch === '"') {
      inQuotes = true;
    } else if (ch === ",") {
      cells.push(cur);
      cur = "";
    } else {
      cur += ch;
    }
  }
  cells.push(cur);
  return cells;
}

function contentFamily(pathname) {
  if (pathname === "/" || pathname === "") return "homepage";
  if (pathname.startsWith("/learn/watch/")) return "learn_watch";
  if (pathname.startsWith("/learn")) return "learn_hub";
  if (
    pathname.startsWith("/online-consultation/") &&
    pathname.split("/").filter(Boolean).length >= 3
  ) {
    return "virtual_city_service";
  }
  if (pathname.startsWith("/online-consultation/country/")) return "virtual_country";
  if (
    pathname.startsWith("/online-consultation/") &&
    pathname.split("/").filter(Boolean).length === 2
  ) {
    return "virtual_city";
  }
  if (pathname.startsWith("/online-consultation")) return "virtual_hub";
  if (pathname.startsWith("/international-consultation")) return "international";
  if (pathname.startsWith("/global-online")) return "legacy_global_online";
  if (
    pathname === "/prenatal" ||
    pathname === "/postnatal" ||
    pathname === "/pilates" ||
    pathname.includes("/prenatal-classes") ||
    pathname.includes("/postnatal-classes") ||
    pathname.includes("/pilates-classes")
  ) {
    return "zalak_group_class";
  }
  if (pathname === "/dr-charmi-shah" || pathname === "/dr-zalak-shah") return "doctor_profile";
  if (["/mumbai", "/ahmedabad", "/valsad", "/bangalore"].includes(pathname)) return "india_city";
  if (
    ["/about", "/services", "/testimonials", "/contact", "/pillars", "/quick-answers"].includes(
      pathname,
    )
  ) {
    return "home_section_alias";
  }
  if (pathname.startsWith("/book-consultation")) return "booking";
  return "other_or_topic_guide";
}

function taskIdsForFamily(family, contentStatus) {
  const ids = ["SEO-32"];
  if (family === "virtual_city_service" || family === "virtual_city") ids.push("SEO-11");
  if (family === "other_or_topic_guide") ids.push("SEO-12", "SEO-36");
  if (family === "learn_watch") ids.push("SEO-16", "SEO-36");
  if (family === "learn_hub") ids.push("SEO-01", "SEO-26");
  if (family === "legacy_global_online" || contentStatus === "alias_redirect_shell") {
    ids.push("SEO-07");
  }
  if (family === "zalak_group_class") ids.push("SEO-04");
  if (family === "homepage" || family === "home_section_alias") ids.push("SEO-33");
  return [...new Set(ids)].join(";");
}

function decisionForRow({ contentStatus, family }) {
  if (contentStatus === "alias_redirect_shell" || family === "legacy_global_online") {
    return "redirect";
  }
  return "keep/improve";
}

async function collectRoutePaths(server) {
  const routesMod = await server.ssrLoadModule("/src/config/routes.ts");
  const sitemapPaths = [...routesMod.SITEMAP_PATHS];
  const aliasShells = [
    "/global-online",
    routesMod.ROUTES.zalakPrenatalClasses,
    routesMod.ROUTES.zalakPostnatalClasses,
    routesMod.ROUTES.zalakPilatesClasses,
  ];
  const legacyMapPath = path.join(root, "src/data/legacyGlobalOnlineSlugMap.json");
  if (fs.existsSync(legacyMapPath)) {
    const legacy = JSON.parse(fs.readFileSync(legacyMapPath, "utf8"));
    for (const slug of Object.keys(legacy)) {
      aliasShells.push(`/global-online/${slug}`);
    }
  }
  return [...new Set([...sitemapPaths, ...aliasShells])].sort();
}

function loadInventoryRows() {
  if (!fs.existsSync(inventoryCsv)) return null;
  const text = fs.readFileSync(inventoryCsv, "utf8").trim();
  if (!text) return null;
  const lines = text.split(/\r?\n/);
  const header = parseCsvLine(lines[0] ?? "");
  const idx = Object.fromEntries(header.map((h, i) => [h, i]));
  if (idx.path == null) return null;
  const rows = [];
  for (const line of lines.slice(1)) {
    if (!line.trim()) continue;
    const cells = parseCsvLine(line);
    rows.push({
      path: cells[idx.path] ?? "",
      family: cells[idx.template_family] ?? contentFamily(cells[idx.path] ?? ""),
      contentStatus: cells[idx.content_status] ?? "active",
    });
  }
  return rows;
}

export async function generateSeoPageStatus() {
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
    const routePaths = await collectRoutePaths(server);
    const routeSet = new Set(routePaths);
    const inventory = loadInventoryRows();

    /** Prefer inventory seed; fill any missing route-collection paths. */
    const byPath = new Map();
    if (inventory) {
      for (const row of inventory) {
        if (!row.path) continue;
        byPath.set(row.path, row);
      }
    }
    for (const p of routePaths) {
      if (!byPath.has(p)) {
        byPath.set(p, {
          path: p,
          family: contentFamily(p),
          contentStatus: "active",
        });
      }
    }

    const header = [
      "path",
      "family",
      "decision",
      "task_ids",
      "source_check",
      "built_html",
      "http",
      "in_route_collection",
    ];
    const lines = [header.join(",")];
    const paths = [...byPath.keys()].sort((a, b) => a.localeCompare(b));

    for (const p of paths) {
      const row = byPath.get(p);
      const family = row.family || contentFamily(p);
      const decision = decisionForRow({ contentStatus: row.contentStatus, family });
      lines.push(
        [
          p,
          family,
          decision,
          taskIdsForFamily(family, row.contentStatus),
          "unknown",
          "unknown",
          "unknown",
          routeSet.has(p) ? "yes" : "no",
        ]
          .map(csvEscape)
          .join(","),
      );
    }

    fs.mkdirSync(path.dirname(outCsv), { recursive: true });
    fs.writeFileSync(outCsv, `${lines.join("\n")}\n`, "utf8");

    const ledgerCount = paths.length;
    const onlyLedger = paths.filter((p) => !routeSet.has(p)).length;
    const onlyRoutes = routePaths.filter((p) => !byPath.has(p)).length;

    console.log(
      `generate-seo-page-status: wrote ${ledgerCount} rows → ${path.relative(root, outCsv)}`,
    );
    console.log(
      `  route collection: ${routePaths.length}; inventory seed: ${inventory?.length ?? 0}; only-ledger: ${onlyLedger}; only-routes: ${onlyRoutes}`,
    );

    return {
      ledgerCount,
      routeCount: routePaths.length,
      onlyLedger,
      onlyRoutes,
      outCsv,
    };
  } finally {
    await server.close();
  }
}

const isDirectRun =
  process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (isDirectRun) {
  generateSeoPageStatus().catch((err) => {
    console.error(`generate-seo-page-status: ${err.message}`);
    console.error(err.stack);
    process.exit(1);
  });
}
