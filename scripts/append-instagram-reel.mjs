#!/usr/bin/env node
/**
 * Append one Instagram reel (delegates to append-instagram-learn.mjs).
 * @deprecated Prefer `node scripts/append-instagram-learn.mjs <url>` for reels and posts.
 */
import { spawnSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const target = path.join(__dirname, "append-instagram-learn.mjs");
const args = process.argv.slice(2);
const res = spawnSync(process.execPath, [target, ...args], { stdio: "inherit" });
process.exit(res.status ?? 1);
