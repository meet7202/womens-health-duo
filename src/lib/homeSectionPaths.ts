import { ROUTES } from "../config/routes";
import { DEFAULT_DESCRIPTION } from "../config/site.defaults";
import { githubPagesAbsoluteUrl, publicPathname } from "./githubPagesPublicUrl";
import { homeSectionDocumentTitle } from "./pageSeoCopy";

/** Permalink pathname → scroll target element id on the homepage. */
const PATH_TO_SCROLL_ID: Readonly<Record<string, string>> = {
  [ROUTES.homeAbout]: "about",
  [ROUTES.homeServicesSection]: "services",
  [ROUTES.homeTestimonials]: "testimonials",
  [ROUTES.homeContact]: "contact",
  [ROUTES.homePillars]: "pillars",
  [ROUTES.homeQuickAnswers]: "faq",
};

/** Section element id → homepage section permalink (inverse of `PATH_TO_SCROLL_ID`). */
const SCROLL_ID_TO_PATH: Readonly<Record<string, string>> = Object.fromEntries(
  (Object.entries(PATH_TO_SCROLL_ID) as [string, string][]).map(([path, id]) => [id, path]),
);

const PATH_TO_LABEL: Readonly<Record<string, string>> = {
  [ROUTES.homeAbout]: "About",
  [ROUTES.homeServicesSection]: "Services",
  [ROUTES.homeTestimonials]: "Testimonials",
  [ROUTES.homeContact]: "Contact",
  [ROUTES.homePillars]: "Topic map",
  [ROUTES.homeQuickAnswers]: "Quick answers",
};

function normalizePathname(pathname: string): string {
  return pathname.replace(/\/+$/, "") || "/";
}

/** Scroll target id for a homepage section permalink, or `null` for other routes. */
export function homeScrollTargetId(pathname: string): string | null {
  return PATH_TO_SCROLL_ID[normalizePathname(pathname)] ?? null;
}

export function isHomeSectionPermalink(pathname: string): boolean {
  return homeScrollTargetId(pathname) !== null;
}

/** Permalink pathname for a homepage section id (`about`, `services`, …), or `null`. */
export function homePermalinkForScrollId(scrollId: string): string | null {
  const path = SCROLL_ID_TO_PATH[scrollId];
  return path ? publicPathname(path) : null;
}

/** SEO overrides when rendering the homepage on a section permalink. */
export function homeSectionSeo(pathname: string): {
  canonicalPath: string;
  title: string;
  metaDescription: string;
} | null {
  const norm = normalizePathname(pathname);
  const label = PATH_TO_LABEL[norm];
  if (!label) return null;
  return {
    canonicalPath: publicPathname(norm),
    title: homeSectionDocumentTitle(label),
    metaDescription: DEFAULT_DESCRIPTION,
  };
}

export function homeFaqJsonLdPageUrl(siteUrl: string, pathname: string): string {
  return githubPagesAbsoluteUrl(siteUrl, normalizePathname(pathname));
}
