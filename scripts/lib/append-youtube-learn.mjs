import { readFileSync, writeFileSync } from "node:fs";

const YOUTUBE_ARRAY_START = "const KNOWLEDGE_HUB_YOUTUBE_VIDEOS_RAW";
const YOUTUBE_ARRAY_END_MARKER = "\n];";
const YOUTUBE_NEXT_CONST = "const KNOWLEDGE_HUB_YOUTUBE_VIDEOS:";

/** @param {Record<string, unknown>} row */
export function hubTsRowBlock(row) {
  const lines = ["  {"];
  for (const [key, value] of Object.entries(row)) {
    if (value === undefined) continue;
    lines.push(`    ${key}: ${JSON.stringify(value)},`);
  }
  lines[lines.length - 1] = lines[lines.length - 1].replace(/,$/, "");
  lines.push("  }");
  return lines.join("\n");
}

/** @param {string} raw */
export function extractYoutubeVideoIds(raw) {
  /** @type {string[]} */
  const ids = [];
  const re = /youtubeVideoId:\s*"([^"]+)"/g;
  let m;
  while ((m = re.exec(raw)) !== null) ids.push(m[1]);
  return ids;
}

/** @param {string} title @param {string} raw */
export function uniqueYoutubeHubId(title, raw) {
  const slug = title
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .split("-")
    .filter(Boolean)
    .slice(0, 6)
    .join("-");
  const base = slug || "clip";
  let id = `yt-duo-${base}`;
  let n = 2;
  while (raw.includes(`id: "${id}"`)) {
    id = `yt-duo-${base}-${n}`;
    n += 1;
  }
  return id;
}

/**
 * @param {{ filePath: string; row: Record<string, unknown> }} opts
 */
export function appendYoutubeTsRow({ filePath, row }) {
  const raw = readFileSync(filePath, "utf8");
  const startIdx = raw.indexOf(YOUTUBE_ARRAY_START);
  if (startIdx < 0) throw new Error(`Missing ${YOUTUBE_ARRAY_START} in ${filePath}`);

  const nextConstIdx = raw.indexOf(YOUTUBE_NEXT_CONST, startIdx);
  if (nextConstIdx < 0) throw new Error(`Missing ${YOUTUBE_NEXT_CONST} in ${filePath}`);

  const arrayCloseIdx = raw.lastIndexOf(YOUTUBE_ARRAY_END_MARKER, nextConstIdx);
  if (arrayCloseIdx < 0) throw new Error(`Could not find YouTube array close in ${filePath}`);

  const block = hubTsRowBlock(row);
  const updated = `${raw.slice(0, arrayCloseIdx)},\n${block}${raw.slice(arrayCloseIdx)}`;
  writeFileSync(filePath, updated);
}

/**
 * @param {{ beforeRaw: string; afterRaw: string; videoIds: string[] }} opts
 */
export function assertExistingYoutubeRowsUnchanged({ beforeRaw, afterRaw, videoIds }) {
  for (const videoId of videoIds) {
    const re = new RegExp(
      `\\{[^{}]*youtubeVideoId:\\s*"${videoId.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}"[^{}]*\\}`,
      "s",
    );
    const beforeMatch = beforeRaw.match(re);
    if (!beforeMatch) continue;
    if (!afterRaw.includes(beforeMatch[0])) {
      throw new Error(`Existing YouTube hub row changed unexpectedly: ${videoId}`);
    }
  }
}

/**
 * @param {{ filePath: string; videoId: string; caption: string }} opts
 */
export function appendYoutubeCaption({ filePath, videoId, caption }) {
  let raw = readFileSync(filePath, "utf8");
  if (raw.includes(`"${videoId}"`)) return false;
  if (!raw.trimEnd().endsWith("}")) {
    throw new Error(`Unexpected captions JSON ending: ${filePath}`);
  }
  raw = raw.replace(/\n}\s*$/, `,\n  ${JSON.stringify(videoId)}: ${JSON.stringify(caption)}\n}\n`);
  writeFileSync(filePath, raw);
  return true;
}
