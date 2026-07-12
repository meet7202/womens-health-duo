/**
 * IndexNow API key — set INDEXNOW_KEY in `.env` (never commit the value).
 * Build writes dist/{key}.txt when INDEXNOW_KEY is set.
 */
import { loadEnvFile } from "./loadEnv.mjs";

loadEnvFile();

export function getIndexNowKey() {
  const key = process.env.INDEXNOW_KEY?.trim();
  if (!key) {
    throw new Error("INDEXNOW_KEY is not set — add it to .env (see .env.example)");
  }
  return key;
}
