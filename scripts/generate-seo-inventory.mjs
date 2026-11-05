#!/usr/bin/env node
/**
 * SEO-00 baseline inventory: every sitemap path + known alias shells.
 * Writes docs/seo-route-inventory.csv (source expectations; HTTP status left unknown).
 *
 * Usage: node scripts/generate-seo-inventory.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createServer } from "vite";
import react from "@vitejs/plugin-react-swc";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const outCsv = path.join(root, "docs/seo-route-inventory.csv");

function csvEscape(value) {
  const s = String(value ?? "");
  if (/[",\n\r]/.test(s)) return `"${s.replace(/"/g, '""')}"`;
  return s;
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
    const routesMod = await server.ssrLoadModule("/src/config/routes.ts");
    const shellMod = await server.ssrLoadModule("/src/build/staticShellHead.ts");
    const siteUrl = "https://womenshealthduo.com";

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

    const primarySet = new Set(routesMod.SITEMAP_PATHS_PRIMARY_URLSET);
    const virtualSet = new Set(routesMod.SITEMAP_SEGMENT_VIRTUAL_SERVICE_CITIES);

    const allPaths = [...new Set([...sitemapPaths, ...aliasShells])].sort();

    const header = [
      "path",
      "template_family",
      "canonical_href",
      "robots_assumed",
      "title",
      "description",
      "h1",
      "in_primary_sitemap",
      "in_virtual_sitemap",
      "shell_expected",
      "content_status",
      "redirect_to_path",
    ];

    const rows = [header.join(",")];
    const titleCounts = new Map();

    for (const pathname of allPaths) {
      const meta = shellMod.resolveShellPageMeta(siteUrl, pathname);
      titleCounts.set(meta.title, (titleCounts.get(meta.title) ?? 0) + 1);
      const inPrimary = primarySet.has(pathname);
      const inVirtual = virtualSet.has(pathname);
      const isAlias = aliasShells.includes(pathname) && !inPrimary && !inVirtual;
      rows.push(
        [
          pathname,
          contentFamily(pathname),
          meta.canonicalHref,
          isAlias || meta.redirectToPath ? "alias_or_redirect" : "index,follow (assumed)",
          meta.title,
          meta.metaDescription,
          meta.h1,
          inPrimary ? "yes" : "no",
          inVirtual ? "yes" : "no",
          "yes",
          meta.redirectToPath ? "alias_redirect_shell" : "active",
          meta.redirectToPath ?? "",
        ]
          .map(csvEscape)
          .join(","),
      );
    }

    fs.mkdirSync(path.dirname(outCsv), { recursive: true });
    fs.writeFileSync(outCsv, `${rows.join("\n")}\n`, "utf8");

    const dupTitles = [...titleCounts.entries()].filter(([, n]) => n > 1).length;
    console.log(
      `generate-seo-inventory: wrote ${allPaths.length} rows → ${path.relative(root, outCsv)}`,
    );
    console.log(`  distinct titles: ${titleCounts.size}; duplicate-title groups: ${dupTitles}`);

    // Spot-check class routes (SEO-04)
    for (const p of ["/prenatal", "/postnatal", "/pilates", "/dr-zalak-shah/prenatal-classes"]) {
      const m = shellMod.resolveShellPageMeta(siteUrl, p);
      console.log(
        `  check ${p}: title=${JSON.stringify(m.title)} redirect=${m.redirectToPath ?? "-"}`,
      );
    }
  } finally {
    await server.close();
  }
}

main().catch((err) => {
  console.error(`generate-seo-inventory: ${err.message}`);
  console.error(err.stack);
  process.exit(1);
});
