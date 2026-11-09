import { useLayoutEffect } from "react";

/**
 * Build-time shells include a visible `#static-seo-shell` (SEO-10) for no-JS crawlers
 * and the Markdown-for-Agents worker. Once React mounts, that HTML is redundant.
 *
 * Important UX: GitHub Pages serves `404.html` (shell title “Page not found”) for any
 * path without a static folder. The SPA then renders the real route under `#root`. If we
 * wait for `#root h1`, lazy/Suspense routes leave the 404 shell stuck above the site.
 * Remove the shell as soon as JS takes over — crawlers that skip JS still see it in HTML.
 */
export function RemoveStaticSeoShell() {
  useLayoutEffect(() => {
    document.getElementById("static-seo-shell")?.remove();
  }, []);

  return null;
}
