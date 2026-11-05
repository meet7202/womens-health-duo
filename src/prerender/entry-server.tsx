/**
 * React 18 SSR entry for SEO-10 priority prerender.
 * Do not use React 19 `prerender` APIs — this project is on React 18.
 */
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import { PriorityPrerenderRoutes } from "./PriorityPrerenderRoutes";

export function renderPriorityPage(url: string): string {
  const location = url.startsWith("/") ? url : `/${url}`;
  return renderToString(
    <StaticRouter location={location}>
      <PriorityPrerenderRoutes />
    </StaticRouter>,
  );
}
