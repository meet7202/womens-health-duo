#!/usr/bin/env node
/**
 * Append one Instagram reel (delegates to append-learn-media.mjs).
 * @deprecated Prefer `node scripts/append-learn-media.mjs <url>` for all Learn hub clips.
 */
import { spawnSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const target = path.join(__dirname, "append-learn-media.mjs");
const args = process.argv.slice(2);
const res = spawnSync(process.execPath, [target, ...args], { stdio: "inherit" });
process.exit(res.status ?? 1);
