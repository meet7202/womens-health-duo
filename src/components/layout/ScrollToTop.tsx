import { useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";

/** React Router does not scroll the window on pathname changes; restore a predictable top-of-page view. */
export function ScrollToTop() {
  const { pathname } = useLocation();
  useLayoutEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [pathname]);
  return null;
}
