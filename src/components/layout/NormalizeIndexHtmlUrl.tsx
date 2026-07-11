import { useLayoutEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { publicPathname } from "@/lib/githubPagesPublicUrl";

const SUFFIX = "/index.html";

/**
 * GitHub Pages serves SPA shells from `…/index.html` files; some clients may request that path.
 * Canonical public URLs are `/path/` (no `index.html`), including nested Learn URLs.
 */
export function NormalizeIndexHtmlUrl() {
  const location = useLocation();
  const navigate = useNavigate();

  useLayoutEffect(() => {
    const { pathname, search, hash } = location;
    if (!pathname.endsWith(SUFFIX)) return;
    const stripped = pathname.slice(0, -SUFFIX.length) || "/";
    void navigate({ pathname: publicPathname(stripped), search, hash }, { replace: true });
  }, [location, navigate]);

  return null;
}
