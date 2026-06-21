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

/**
 * Canonical site URL for SEO. Set `VITE_SITE_URL` in `.env` (no trailing slash).
 */
export const SITE_URL = (
  typeof import.meta !== "undefined" && import.meta.env?.VITE_SITE_URL
    ? String(import.meta.env.VITE_SITE_URL)
    : SITE_DEFAULT_URL
).replace(/\/$/, "");

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
