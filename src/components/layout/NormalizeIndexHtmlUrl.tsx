import { useLayoutEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const SUFFIX = "/index.html";

/**
 * GitHub Pages serves SPA shells from `…/index.html` files; some clients may request that path.
 * Canonical routes are `/path` (no `index.html`), including nested Learn URLs such as `/learn/dr-zalak/topic/pregnancy`.
 */
export function NormalizeIndexHtmlUrl() {
  const location = useLocation();
  const navigate = useNavigate();

  useLayoutEffect(() => {
    const { pathname, search, hash } = location;
    if (!pathname.endsWith(SUFFIX)) return;
    const nextPath = pathname.slice(0, -SUFFIX.length) || "/";
    void navigate({ pathname: nextPath, search, hash }, { replace: true });
  }, [location, navigate]);

  return null;
}
