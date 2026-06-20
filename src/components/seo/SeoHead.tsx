import { useLayoutEffect } from "react";
import {
  SITE_URL,
  DEFAULT_TITLE,
  DEFAULT_DESCRIPTION,
  KEYWORDS,
  OG_IMAGE_PATH,
} from "@/config/site";

function upsertMeta(attr: "name" | "property", key: string, content: string) {
  let el = document.querySelector(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function upsertLink(rel: string, href: string) {
  let el = document.querySelector(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", rel);
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

/**
 * Syncs canonical URL and Open Graph / Twitter tags with `SITE_URL` (from VITE_SITE_URL at build time).
 */
export function SeoHead() {
  useLayoutEffect(() => {
    const pageUrl = `${SITE_URL}/`;
    const ogImage = `${SITE_URL}${OG_IMAGE_PATH}`;

    document.title = DEFAULT_TITLE;
    upsertMeta("name", "description", DEFAULT_DESCRIPTION);
    upsertMeta("name", "keywords", KEYWORDS);
    upsertMeta(
      "name",
      "robots",
      "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
    );
    upsertMeta("name", "googlebot", "index, follow");

    upsertLink("canonical", pageUrl);

    upsertMeta("property", "og:type", "website");
    upsertMeta("property", "og:site_name", "Women's Health Duo");
    upsertMeta("property", "og:url", pageUrl);
    upsertMeta("property", "og:title", DEFAULT_TITLE);
    upsertMeta("property", "og:description", DEFAULT_DESCRIPTION);
    upsertMeta("property", "og:image", ogImage);
    upsertMeta("property", "og:image:alt", "Women's Health Duo — holistic women's healthcare");
    upsertMeta("property", "og:locale", "en_IN");

    upsertMeta("name", "twitter:card", "summary_large_image");
    document.querySelector('meta[name="twitter:site"]')?.remove();
    upsertMeta("name", "twitter:title", DEFAULT_TITLE);
    upsertMeta("name", "twitter:description", DEFAULT_DESCRIPTION);
    upsertMeta("name", "twitter:image", ogImage);
  }, []);

  return null;
}
