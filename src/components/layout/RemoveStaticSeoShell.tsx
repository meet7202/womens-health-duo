import { useLayoutEffect } from "react";

/**
 * Build-time shells include `#static-seo-shell` with an `<h1>` for crawlers that do not
 * execute JavaScript. After React paints a live `<h1>`, drop the duplicate shell.
 */
export function RemoveStaticSeoShell() {
  useLayoutEffect(() => {
    const tryRemove = () => {
      const shell = document.getElementById("static-seo-shell");
      if (!shell) return;
      const liveH1 = document.querySelector("#root h1");
      if (liveH1) shell.remove();
    };

    tryRemove();
    requestAnimationFrame(() => {
      tryRemove();
    });
  }, []);

  return null;
}
