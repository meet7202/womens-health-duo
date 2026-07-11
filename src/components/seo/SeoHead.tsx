import { useLayoutEffect } from "react";
import {
  SITE_URL,
  DEFAULT_TITLE,
  DEFAULT_DESCRIPTION,
  KEYWORDS,
  OG_IMAGE_PATH,
} from "@/config/site";
import { githubPagesAbsoluteUrl } from "@/lib/githubPagesPublicUrl";
import { BING_TITLE_MAX_LEN, capDocumentTitle } from "@/lib/seoTitle";

export type SeoHeadProps = {
  /** Full `<title>` text */
  title?: string;
  metaDescription?: string;
  /** Path beginning with `/` (e.g. `/faq`). Home is `/`. */
  path?: string;
  metaKeywords?: string;
};

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

function canonicalUrlForPath(path: string | undefined) {
  const p = !path || path === "/" ? "/" : path.startsWith("/") ? path : `/${path}`;
  return githubPagesAbsoluteUrl(SITE_URL, p);
}

/**
 * Syncs canonical URL and Open Graph / Twitter tags with `SITE_URL` (from `VITE_SITE_URL` at build time).
 * Omit props on the homepage to use defaults from `site.defaults`.
 */
export function SeoHead({ title, metaDescription, path, metaKeywords }: SeoHeadProps = {}) {
  const resolvedTitle = capDocumentTitle(title ?? DEFAULT_TITLE, BING_TITLE_MAX_LEN);
  const resolvedDescription = metaDescription ?? DEFAULT_DESCRIPTION;
  const resolvedKeywords = metaKeywords ?? KEYWORDS;
  const pageUrl = canonicalUrlForPath(path);

  useLayoutEffect(() => {
    const ogImage = githubPagesAbsoluteUrl(SITE_URL, OG_IMAGE_PATH);

    document.title = resolvedTitle;
    upsertMeta("name", "description", resolvedDescription);
    upsertMeta("name", "keywords", resolvedKeywords);
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
    upsertMeta("property", "og:title", resolvedTitle);
    upsertMeta("property", "og:description", resolvedDescription);
    upsertMeta("property", "og:image", ogImage);
    upsertMeta("property", "og:image:alt", "Women's Health Duo ,  holistic women's healthcare");
    upsertMeta("property", "og:locale", "en_IN");

    upsertMeta("name", "twitter:card", "summary_large_image");
    document.querySelector('meta[name="twitter:site"]')?.remove();
    upsertMeta("name", "twitter:title", resolvedTitle);
    upsertMeta("name", "twitter:description", resolvedDescription);
    upsertMeta("name", "twitter:image", ogImage);
  }, [resolvedTitle, resolvedDescription, resolvedKeywords, pageUrl]);

  return null;
}
