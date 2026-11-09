import { useLayoutEffect } from "react";

/**
 * Build-time shells include `#static-seo-shell` with an `<h1>` for crawlers that do not
 * execute JavaScript (and the Markdown-for-Agents worker).
 *
 * Sighted JS visitors never see it: `index.html` adds `html.js` and CSS `display: none`
 * so GitHub Pages `404.html` shells do not flash “Page not found” above the SPA.
 *
 * Still wait for a live `#root h1` before removing the node so lazy/Suspense routes keep
 * crawl HTML in the document until real content mounts (then drop the duplicate H1).
 */
export function RemoveStaticSeoShell() {
  useLayoutEffect(() => {
    const shell = document.getElementById("static-seo-shell");
    if (!shell) return;

    const tryRemove = () => {
      const liveH1 = document.querySelector("#root h1");
      if (liveH1) {
        shell.remove();
        return true;
      }
      return false;
    };

    if (tryRemove()) return;

    const root = document.getElementById("root");
    if (!root || typeof MutationObserver === "undefined") {
      requestAnimationFrame(() => {
        tryRemove();
      });
      return;
    }

    const observer = new MutationObserver(() => {
      if (tryRemove()) observer.disconnect();
    });
    observer.observe(root, { childList: true, subtree: true });

    // Fallback if observation never sees an H1 (true 404 route).
    const timeoutId = window.setTimeout(() => {
      observer.disconnect();
      // Keep shell only when React never produced a page H1 (NotFound still has one).
      tryRemove();
    }, 8_000);

    return () => {
      observer.disconnect();
      window.clearTimeout(timeoutId);
    };
  }, []);

  return null;
}
