/**
 * Inject React 18 `renderToString` markup into priority SPA shells (SEO-10 foundation).
 * Soft-fails: shells stay valid if SSR throws (window-only components, etc.).
 * Must not use `@/` path aliases.
 *
 * The SSR bundle is built in a child process. Calling `vite.build()` from the
 * parent build's `closeBundle` ends that process once the SSR bundle succeeds.
 */
import { spawnSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { PRERENDER_PRIORITY_PATHS } from "./prerenderPriorityPaths";

/**
 * After static shells are written, attempt SSR for priority paths into `#root`.
 * Returns counts for build logging; never throws (foundation must not break deploys).
 */
export async function prerenderPriorityPagesIntoShells(
  outDirAbs: string,
  rootDir: string,
  extraPaths: readonly string[] = [],
): Promise<{ attempted: number; succeeded: number; failed: number; errors: string[] }> {
  const pathnames = [...new Set([...PRERENDER_PRIORITY_PATHS, ...extraPaths])];
  const cacheDir = path.join(rootDir, "node_modules/.cache");
  const pathsFile = path.join(cacheDir, "whd-prerender-paths.json");
  const resultFile = path.join(cacheDir, "whd-prerender-result.json");
  const script = path.join(rootDir, "scripts/prerender-priority-pages.mjs");

  try {
    fs.mkdirSync(cacheDir, { recursive: true });
    fs.rmSync(resultFile, { force: true });
    fs.writeFileSync(pathsFile, JSON.stringify({ outDirAbs, rootDir, pathnames }), "utf8");
    const child = spawnSync(process.execPath, [script, pathsFile, resultFile], {
      cwd: rootDir,
      stdio: "inherit",
      env: process.env,
    });
    if (!fs.existsSync(resultFile)) {
      const detail =
        child.error?.message ??
        (child.status != null ? `child exit ${child.status}` : "child produced no result");
      return {
        attempted: pathnames.length,
        succeeded: 0,
        failed: pathnames.length,
        errors: [`vite SSR build: ${detail}`],
      };
    }
    return JSON.parse(fs.readFileSync(resultFile, "utf8")) as {
      attempted: number;
      succeeded: number;
      failed: number;
      errors: string[];
    };
  } catch (err) {
    return {
      attempted: pathnames.length,
      succeeded: 0,
      failed: pathnames.length,
      errors: [`vite SSR build: ${err instanceof Error ? err.message : String(err)}`],
    };
  }
}
