/**
 * Inject React 18 `renderToString` markup into priority SPA shells (SEO-10 foundation).
 * Soft-fails: shells stay valid if SSR throws (window-only components, etc.).
 * Must not use `@/` path aliases.
 *
 * Uses `vite.build({ ssr })` (not `createServer` + ssrLoadModule) so JSX compiles with the
 * production runtime and CJS deps resolve correctly under Node ESM.
 */
import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { build as viteBuild } from "vite";
import react from "@vitejs/plugin-react-swc";
import { PRERENDER_PRIORITY_PATHS, PRERENDER_ROOT_ATTR } from "./prerenderPriorityPaths";

function shellHtmlPath(outDirAbs: string, pathname: string): string {
  if (pathname === "/" || pathname === "") return path.join(outDirAbs, "index.html");
  const rel = pathname.replace(/^\/+/, "").replace(/\/+$/, "");
  return path.join(outDirAbs, ...rel.split("/"), "index.html");
}

function injectRootMarkup(html: string, appHtml: string): string {
  const stamped = `<div id="root" ${PRERENDER_ROOT_ATTR}="1">${appHtml}</div>`;
  const needle = '<div id="root"></div>';
  if (!html.includes(needle)) return html;
  // Drop crawl `#static-seo-shell` when React SSR already provides the real H1 (audit:seo-h1).
  const withoutShell = html.replace(
    /<main\b[^>]*\bid=["']static-seo-shell["'][^>]*>[\s\S]*?<\/main>/i,
    "",
  );
  return withoutShell.replace(needle, stamped);
}

/**
 * After static shells are written, attempt SSR for priority paths into `#root`.
 * Returns counts for build logging; never throws (foundation must not break deploys).
 */
export async function prerenderPriorityPagesIntoShells(
  outDirAbs: string,
  rootDir: string,
): Promise<{ attempted: number; succeeded: number; failed: number; errors: string[] }> {
  const errors: string[] = [];
  let succeeded = 0;
  let failed = 0;
  // Keep SSR scratch outside `dist/` — Vite `emptyOutDir` on a nested dist path can wipe shells.
  const ssrOutDir = path.join(rootDir, "node_modules/.cache/whd-prerender-ssr");
  const ssrEntryOut = path.join(ssrOutDir, "entry-server.mjs");

  try {
    fs.rmSync(ssrOutDir, { recursive: true, force: true });
    fs.mkdirSync(ssrOutDir, { recursive: true });
    await viteBuild({
      root: rootDir,
      configFile: false,
      mode: "production",
      plugins: [react()],
      resolve: {
        alias: { "@": path.resolve(rootDir, "./src") },
      },
      publicDir: false,
      logLevel: "error",
      build: {
        ssr: path.join(rootDir, "src/prerender/entry-server.tsx"),
        outDir: ssrOutDir,
        // Manual clean above — never emptyOutDir against anything under/near dist/.
        emptyOutDir: false,
        copyPublicDir: false,
        sourcemap: false,
        minify: false,
        rollupOptions: {
          output: {
            entryFileNames: "entry-server.mjs",
            format: "esm",
          },
        },
      },
    });

    if (!fs.existsSync(ssrEntryOut)) {
      throw new Error(`SSR bundle missing at ${ssrEntryOut}`);
    }

    const mod = (await import(pathToFileURL(ssrEntryOut).href)) as {
      renderPriorityPage: (url: string) => string;
    };

    for (const pathname of PRERENDER_PRIORITY_PATHS) {
      const file = shellHtmlPath(outDirAbs, pathname);
      if (!fs.existsSync(file)) {
        failed += 1;
        errors.push(`${pathname}: missing shell`);
        continue;
      }
      try {
        const location = pathname === "/" ? "/" : pathname.replace(/\/+$/, "");
        const markup = mod.renderPriorityPage(location);
        if (!markup || markup.length < 40) {
          failed += 1;
          errors.push(`${pathname}: empty SSR markup`);
          continue;
        }
        const raw = fs.readFileSync(file, "utf8");
        const next = injectRootMarkup(raw, markup);
        if (next === raw) {
          failed += 1;
          errors.push(`${pathname}: could not find empty #root to inject`);
          continue;
        }
        fs.writeFileSync(file, next, "utf8");
        succeeded += 1;
      } catch (err) {
        failed += 1;
        errors.push(`${pathname}: ${err instanceof Error ? err.message : String(err)}`);
      }
    }
  } catch (err) {
    failed = PRERENDER_PRIORITY_PATHS.length;
    errors.push(`vite SSR build: ${err instanceof Error ? err.message : String(err)}`);
  } finally {
    // Keep SSR scratch out of Pages artifacts; never fail the main build on cleanup races.
    try {
      fs.rmSync(ssrOutDir, { recursive: true, force: true, maxRetries: 3, retryDelay: 50 });
    } catch {
      // ignore ENOTEMPTY / concurrent writers in node_modules/.cache
    }
  }

  return {
    attempted: PRERENDER_PRIORITY_PATHS.length,
    succeeded,
    failed,
    errors,
  };
}
