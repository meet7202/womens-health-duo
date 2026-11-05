/**
 * Keys with locked SEO-15 caption holds (YouTube ids + Instagram shortcodes).
 * Import/sync scripts must not overwrite approved display corrections for these.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const editorialPath = path.join(root, "src/data/knowledgeHubCaptionEditorial.json");

/** @returns {Set<string>} */
export function lockedCaptionEditorialKeys() {
  try {
    const data = JSON.parse(fs.readFileSync(editorialPath, "utf8"));
    return new Set(
      Object.entries(data)
        .filter(([, v]) => v && v.lockImports)
        .map(([k]) => k),
    );
  } catch {
    return new Set();
  }
}

/** @param {string | undefined} key */
export function isCaptionEditorialLocked(key) {
  if (!key) return false;
  return lockedCaptionEditorialKeys().has(key);
}
