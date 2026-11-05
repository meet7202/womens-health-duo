import { useLayoutEffect } from "react";
import {
  SITE_URL,
  DEFAULT_TITLE,
  DEFAULT_DESCRIPTION,
  KEYWORDS,
  OG_IMAGE_PATH,
  DEFAULT_OG_IMAGE_ALT,
} from "@/config/site";
import { githubPagesAbsoluteUrl } from "@/lib/githubPagesPublicUrl";
import { capMetaDescription } from "@/lib/seoDescription";
import { BING_TITLE_MAX_LEN, capDocumentTitle } from "@/lib/seoTitle";
import { ROBOTS_INDEX_FOLLOW } from "@/config/routeDisposition";

export type SeoHeadProps = {
  /** Full `<title>` text */
  title?: string;
  metaDescription?: string;
  /** Path beginning with `/` (e.g. `/faq`). Home is `/`. */
  path?: string;
  metaKeywords?: string;
  /**
   * Robots directive. Must match the static shell for the same route (SEO-02).
   * Defaults to index/follow; pass noindex for intentional exclusions / errors.
   */
  robots?: string;
  /** Absolute or site-relative OG/Twitter image (watch pages: video poster). */
  ogImage?: string;
  ogImageAlt?: string;
  /** Preload critical images from the homepage / top of the page. */
  preloadImages?: Array<{
    href: string;
    as?: string;
    type?: string;
    /** Responsive preload — must match the LCP `<picture>` srcset/sizes. */
    imageSrcSet?: string;
    imageSizes?: string;
    crossOrigin?: "anonymous" | "use-credentials";
  }>;
  /** Open Graph type; use `video.other` on Learn watch pages. */
  ogType?: "website" | "video.other";
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

function upsertLinkWithAttrs(rel: string, href: string, attrs: Record<string, string>) {
  let el = document.querySelector(`link[rel="${rel}"][href="${href}"]`);
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", rel);
    el.setAttribute("href", href);
    document.head.appendChild(el);
  }
  Object.entries(attrs).forEach(([key, value]) => el.setAttribute(key, value));
}

function canonicalUrlForPath(path: string | undefined) {
  const p = !path || path === "/" ? "/" : path.startsWith("/") ? path : `/${path}`;
  return githubPagesAbsoluteUrl(SITE_URL, p);
}

/**
 * Syncs canonical URL and Open Graph / Twitter tags with `SITE_URL` (from `VITE_SITE_URL` at build time).
 * Omit props on the homepage to use defaults from `site.defaults`.
 */
export function SeoHead({
  title,
  metaDescription,
  path,
  metaKeywords,
  robots = ROBOTS_INDEX_FOLLOW,
  ogImage,
  ogImageAlt,
  preloadImages,
  ogType = "website",
}: SeoHeadProps = {}) {
  const resolvedTitle = capDocumentTitle(title ?? DEFAULT_TITLE, BING_TITLE_MAX_LEN);
  const resolvedDescription = capMetaDescription(metaDescription ?? DEFAULT_DESCRIPTION);
  const resolvedKeywords = metaKeywords ?? KEYWORDS;
  const resolvedRobots = robots.trim() || ROBOTS_INDEX_FOLLOW;
  const pageUrl = canonicalUrlForPath(path);
  const defaultOgImage = githubPagesAbsoluteUrl(SITE_URL, OG_IMAGE_PATH);
  const resolvedOgImage =
    ogImage == null
      ? defaultOgImage
      : ogImage.startsWith("http")
        ? ogImage
        : githubPagesAbsoluteUrl(SITE_URL, ogImage);
  const resolvedOgImageAlt = ogImageAlt ?? DEFAULT_OG_IMAGE_ALT;

  useLayoutEffect(() => {
    document.title = resolvedTitle;
    upsertMeta("name", "description", resolvedDescription);
    upsertMeta("name", "keywords", resolvedKeywords);
    upsertMeta("name", "robots", resolvedRobots);
    // Single robots directive — avoid conflicting googlebot/bingbot overrides (SEO-02).
    document.querySelector('meta[name="googlebot"]')?.remove();
    document.querySelector('meta[name="bingbot"]')?.remove();

    upsertLink("canonical", pageUrl);

    preloadImages?.forEach((image) => {
      upsertLinkWithAttrs("preload", image.href, {
        as: image.as ?? "image",
        ...(image.type ? { type: image.type } : {}),
        ...(image.imageSrcSet ? { imagesrcset: image.imageSrcSet } : {}),
        ...(image.imageSizes ? { imagesizes: image.imageSizes } : {}),
        ...(image.crossOrigin ? { crossorigin: image.crossOrigin } : {}),
      });
    });

    upsertMeta("property", "og:type", ogType);
    upsertMeta("property", "og:site_name", "Women's Health Duo");
    upsertMeta("property", "og:url", pageUrl);
    upsertMeta("property", "og:title", resolvedTitle);
    upsertMeta("property", "og:description", resolvedDescription);
    upsertMeta("property", "og:image", resolvedOgImage);
    upsertMeta("property", "og:image:alt", resolvedOgImageAlt);
    upsertMeta("property", "og:locale", "en_IN");

    upsertMeta("name", "twitter:card", "summary_large_image");
    document.querySelector('meta[name="twitter:site"]')?.remove();
    upsertMeta("name", "twitter:title", resolvedTitle);
    upsertMeta("name", "twitter:description", resolvedDescription);
    upsertMeta("name", "twitter:image", resolvedOgImage);
    upsertMeta("name", "twitter:image:alt", resolvedOgImageAlt);
  }, [
    resolvedTitle,
    resolvedDescription,
    resolvedKeywords,
    resolvedRobots,
    pageUrl,
    resolvedOgImage,
    resolvedOgImageAlt,
    ogType,
    preloadImages,
  ]);

  return null;
}
