import { readFileSync, writeFileSync } from "node:fs";

/** @param {Record<string, unknown>} row */
export function hubRowBlock(row) {
  const lines = ["  {"];
  for (const [key, value] of Object.entries(row)) {
    if (value === undefined) continue;
    lines.push(`    ${JSON.stringify(key)}: ${JSON.stringify(value)},`);
  }
  lines[lines.length - 1] = lines[lines.length - 1].replace(/,$/, "");
  lines.push("  }");
  return lines.join("\n");
}

/**
 * Append one object to a JSON array file without re-serializing existing rows.
 * @param {{ filePath: string; row: Record<string, unknown> }} opts
 */
export function appendHubJsonRow({ filePath, row }) {
  let raw = readFileSync(filePath, "utf8");
  // Accept files ending with Unix or Windows line endings. Preserve original EOL when appending.
  const eol = raw.includes("\r\n") ? "\r\n" : "\n";
  if (!raw.trimEnd().endsWith("]")) {
    throw new Error(`Unexpected JSON file ending: ${filePath}`);
  }
  // Replace the trailing closing array bracket (and any trailing newline) with the new row, preserving EOL.
  raw = raw.replace(/\r?\n?\]\r?\n?$/, `,\n${hubRowBlock(row)}${eol}]${eol}`);
  writeFileSync(filePath, raw);
}

/**
 * @param {{ filePath: string; idField: string; beforeRows: Record<string, unknown>[] }} opts
 */
export function assertExistingHubRowsUnchanged({ filePath, idField, beforeRows }) {
  const after = JSON.parse(readFileSync(filePath, "utf8"));
  for (const o of beforeRows) {
    const id = o[idField];
    const c = after.find((r) => r[idField] === id);
    if (!c || JSON.stringify(c) !== JSON.stringify(o)) {
      throw new Error(`Existing hub row changed unexpectedly: ${String(id)}`);
    }
  }
}
