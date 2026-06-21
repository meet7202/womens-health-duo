import {
  SITE_DEFAULT_URL,
  SITE_NAME,
  DEFAULT_TITLE,
  DEFAULT_DESCRIPTION,
  KEYWORDS,
  CONTACT,
  OG_IMAGE_PATH,
  HOME_ENTITY_DEFINITION,
  HOME_HERO_LEDE,
  ORGANIZATION_SCHEMA_DESCRIPTION,
} from "./site.defaults";
import { ensureHttpsSiteOrigin } from "../lib/ensureHttpsSiteOrigin";

/**
 * Canonical site URL for SEO. Set `VITE_SITE_URL` in `.env` (no trailing slash).
 * Non-local `http://` values are upgraded to `https://` so sitemaps and meta never ship HTTP.
 */
export const SITE_URL = ensureHttpsSiteOrigin(
  (typeof import.meta !== "undefined" && import.meta.env?.VITE_SITE_URL
    ? String(import.meta.env.VITE_SITE_URL)
    : SITE_DEFAULT_URL
  ).replace(/\/$/, ""),
);

export {
  SITE_NAME,
  DEFAULT_TITLE,
  DEFAULT_DESCRIPTION,
  KEYWORDS,
  CONTACT,
  OG_IMAGE_PATH,
  HOME_ENTITY_DEFINITION,
  HOME_HERO_LEDE,
  ORGANIZATION_SCHEMA_DESCRIPTION,
};
