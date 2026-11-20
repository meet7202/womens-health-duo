/**
 * Child-process SSR prerender. A nested `vite.build()` inside the parent
 * build's `closeBundle` ends the parent process once the SSR bundle succeeds,
 * so this file runs as its own Node process.
 *
 * Args: <paths.json> <result.json>
 * paths.json: { outDirAbs, rootDir, pathnames: string[] }
 */
import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { build as viteBuild } from "vite";
import react from "@vitejs/plugin-react-swc";

const PRERENDER_ROOT_ATTR = "data-seo-prerender";

function shellHtmlPath(outDirAbs, pathname) {
  if (pathname === "/" || pathname === "") return path.join(outDirAbs, "index.html");
  const rel = pathname.replace(/^\/+/, "").replace(/\/+$/, "");
  return path.join(outDirAbs, ...rel.split("/"), "index.html");
}

function injectRootMarkup(html, appHtml) {
  const stamped = `<div id="root" ${PRERENDER_ROOT_ATTR}="1">${appHtml}</div>`;
  const needle = '<div id="root"></div>';
  if (!html.includes(needle)) return html;
  const withoutShell = html.replace(
    /<main\b[^>]*\bid=["']static-seo-shell["'][^>]*>[\s\S]*?<\/main>/i,
    "",
  );
  return withoutShell.replace(needle, stamped);
}

const pathsFile = process.argv[2];
const resultFile = process.argv[3];
const { outDirAbs, rootDir, pathnames } = JSON.parse(fs.readFileSync(pathsFile, "utf8"));
const errors = [];
let succeeded = 0;
let failed = 0;
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

  const mod = await import(pathToFileURL(ssrEntryOut).href);

  for (const pathname of pathnames) {
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
  failed = pathnames.length;
  errors.push(`vite SSR build: ${err instanceof Error ? err.message : String(err)}`);
} finally {
  try {
    fs.rmSync(ssrOutDir, { recursive: true, force: true, maxRetries: 3, retryDelay: 50 });
  } catch {
    // ignore ENOTEMPTY / concurrent writers in node_modules/.cache
  }
}

const result = {
  attempted: pathnames.length,
  succeeded,
  failed,
  errors,
};
fs.writeFileSync(resultFile, JSON.stringify(result), "utf8");
