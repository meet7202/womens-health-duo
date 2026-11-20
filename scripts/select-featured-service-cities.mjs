#!/usr/bin/env node
/**
 * Picks the city×service pages that are indexable (the rest of the matrix stays noindex).
 * Ranks every matrix URL by Search Console impressions + clicks from a page-dimension export
 * filtered to `/online-consultation/`, restricted to India (minus in-person cities, which have
 * their own city pages), the Gulf, and high-income markets.
 *
 * Usage:
 *   node scripts/select-featured-service-cities.mjs \
 *     --gsc=.cache/seo-audit/gsc-online-consult-pages-6m.json [--limit=100]
 *
 * Writes src/data/featuredServiceCityPaths.json. Raise --limit to widen the indexable set.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createServer } from "vite";
import react from "@vitejs/plugin-react-swc";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const outFile = path.join(root, "src/data/featuredServiceCityPaths.json");

const args = Object.fromEntries(
  process.argv.slice(2).map((a) => {
    const [k, v] = a.replace(/^--/, "").split("=");
    return [k, v ?? "true"];
  }),
);
const gscFile = path.resolve(root, args.gsc ?? ".cache/seo-audit/gsc-online-consult-pages-6m.json");
const limit = Number(args.limit ?? 100);

const INDIA = ["IN"];
const GULF = ["AE", "SA", "QA", "BH", "KW", "OM"];
const HIGH_INCOME = [
  "US",
  "CA",
  "GB",
  "IE",
  "AU",
  "NZ",
  "SG",
  "HK",
  "JP",
  "KR",
  "TW",
  "IL",
  "DE",
  "FR",
  "NL",
  "BE",
  "CH",
  "AT",
  "LU",
  "SE",
  "NO",
  "DK",
  "FI",
  "IT",
  "ES",
  "PT",
];
const ELIGIBLE = new Set([...INDIA, ...GULF, ...HIGH_INCOME]);
/** In-person practice cities: their own city pages own local intent. */
const IN_PERSON_CITY_NAMES = new Set(["mumbai", "ahmedabad", "valsad", "bengaluru", "bangalore"]);
const CLICK_WEIGHT = 25;

function normalizePath(url) {
  const p = new URL(url).pathname.replace(/\/+$/, "");
  return p || "/";
}

async function main() {
  if (!fs.existsSync(gscFile)) {
    console.error(`select-featured-service-cities: missing GSC export ${gscFile}`);
    process.exit(1);
  }
  const rows = JSON.parse(fs.readFileSync(gscFile, "utf8")).rows ?? [];

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
    const cities = virtualMod.VIRTUAL_CONSULTATION_CITIES;

    const eligible = new Map();
    for (const city of cities) {
      if (!ELIGIBLE.has(city.countryCode)) continue;
      if (city.countryCode === "IN" && IN_PERSON_CITY_NAMES.has(city.city.toLowerCase())) continue;
      for (const service of services) {
        const p = virtualMod.virtualServiceCityPath(city, service.slug).replace(/\/+$/, "");
        eligible.set(p, { path: p, impressions: 0, clicks: 0 });
      }
    }

    for (const r of rows) {
      const entry = eligible.get(normalizePath(r.page));
      if (!entry) continue;
      entry.impressions += r.impressions ?? 0;
      entry.clicks += r.clicks ?? 0;
    }

    const ranked = [...eligible.values()]
      .filter((e) => e.impressions > 0)
      .map((e) => ({ ...e, score: e.impressions + e.clicks * CLICK_WEIGHT }))
      .sort((a, b) => b.score - a.score || a.path.localeCompare(b.path))
      .slice(0, limit);

    const payload = {
      note: "Indexable city×service pages, ranked by Search Console impressions + clicks. Regenerate with scripts/select-featured-service-cities.mjs.",
      source: path.relative(root, gscFile),
      limit,
      paths: ranked.map((e) => e.path),
      evidence: ranked.map(({ path: p, impressions, clicks }) => ({
        path: p,
        impressions,
        clicks,
      })),
    };
    fs.writeFileSync(outFile, `${JSON.stringify(payload, null, 2)}\n`, "utf8");
    console.log(
      `select-featured-service-cities: ${ranked.length} paths (eligible with data: ${
        [...eligible.values()].filter((e) => e.impressions > 0).length
      }) → ${path.relative(root, outFile)}`,
    );
  } finally {
    await server.close();
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
