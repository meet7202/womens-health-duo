#!/usr/bin/env node
/**
 * SEO-32: assert page-status ledger membership ≈ route collection size.
 * Regenerates the ledger, then compares counts (allows tiny inventory-only drift).
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createServer } from "vite";
import react from "@vitejs/plugin-react-swc";
import { generateSeoPageStatus } from "./generate-seo-page-status.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const statusCsv = path.join(root, "docs/seo-page-status.csv");

/** Relative difference must stay under this fraction (inventory may include extras). */
const MAX_RELATIVE_DELTA = 0.02;
/** Absolute slack when collections are small. */
const MAX_ABS_DELTA = 50;

function parseCsvPaths(filePath) {
  const text = fs.readFileSync(filePath, "utf8").trim();
  const lines = text.split(/\r?\n/).slice(1).filter(Boolean);
  return new Set(
    lines.map((line) => {
      // path is first column; unquoted paths have no commas
      if (line.startsWith('"')) {
        const end = line.indexOf('"', 1);
        return line.slice(1, end).replace(/""/g, '"');
      }
      return line.split(",")[0];
    }),
  );
}

async function routeCollectionSize() {
  const server = await createServer({
    root,
    configFile: false,
    plugins: [react()],
    resolve: { alias: { "@": path.join(root, "src") } },
    server: { middlewareMode: true },
    appType: "custom",
  });
  try {
    const routesMod = await server.ssrLoadModule("/src/config/routes.ts");
    const aliasShells = [
      "/global-online",
      routesMod.ROUTES.zalakPrenatalClasses,
      routesMod.ROUTES.zalakPostnatalClasses,
      routesMod.ROUTES.zalakPilatesClasses,
    ];
    const legacyMapPath = path.join(root, "src/data/legacyGlobalOnlineSlugMap.json");
    if (fs.existsSync(legacyMapPath)) {
      const legacy = JSON.parse(fs.readFileSync(legacyMapPath, "utf8"));
      for (const slug of Object.keys(legacy)) aliasShells.push(`/global-online/${slug}`);
    }
    return new Set([...routesMod.SITEMAP_PATHS, ...aliasShells]).size;
  } finally {
    await server.close();
  }
}

async function main() {
  const gen = await generateSeoPageStatus();
  const ledger = parseCsvPaths(statusCsv);
  const routeCount = await routeCollectionSize();
  const ledgerCount = ledger.size;
  const delta = Math.abs(ledgerCount - routeCount);
  const rel = routeCount === 0 ? 1 : delta / routeCount;
  const ok = delta <= MAX_ABS_DELTA || rel <= MAX_RELATIVE_DELTA;

  console.log(
    `test-seo-page-status: ledger=${ledgerCount} routes=${routeCount} delta=${delta} rel=${(rel * 100).toFixed(2)}%`,
  );
  console.log(
    `  generate reported ledger=${gen.ledgerCount} onlyLedger=${gen.onlyLedger} onlyRoutes=${gen.onlyRoutes}`,
  );

  if (!ok) {
    console.error(
      `FAIL: membership delta too large (abs>${MAX_ABS_DELTA} and rel>${MAX_RELATIVE_DELTA * 100}%)`,
    );
    process.exit(1);
  }
  if (gen.onlyRoutes > 0) {
    console.error(`FAIL: ${gen.onlyRoutes} route-collection paths missing from ledger`);
    process.exit(1);
  }
  console.log("PASS: page-status membership approximately equals route collection");
}

main().catch((err) => {
  console.error(`test-seo-page-status: ${err.message}`);
  console.error(err.stack);
  process.exit(1);
});
