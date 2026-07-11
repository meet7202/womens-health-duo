import { useLayoutEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { needsPublicTrailingSlash, publicPathname } from "@/lib/githubPagesPublicUrl";

/**
 * GitHub Pages and our sitemap use trailing slashes on directory URLs (`/about/`).
 * React Router `<Link to="/about">` would otherwise leave the address bar without a slash.
 */
export function NormalizeTrailingSlashUrl() {
  const location = useLocation();
  const navigate = useNavigate();

  useLayoutEffect(() => {
    const { pathname, search, hash } = location;
    if (!needsPublicTrailingSlash(pathname)) return;
    void navigate({ pathname: publicPathname(pathname), search, hash }, { replace: true });
  }, [location, navigate]);

  return null;
}
