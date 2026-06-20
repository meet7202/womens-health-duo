import { Link, useLocation } from "react-router-dom";
import { useEffect, useLayoutEffect, useMemo } from "react";
import { ROUTES } from "@/config/routes";
import { whatsappMessageGenericPage, whatsappUrlWithMessage } from "@/lib/whatsappCta";

const NotFound = () => {
  const location = useLocation();
  const waMessage = useMemo(
    () => whatsappMessageGenericPage("404 — page not found", location.pathname),
    [location.pathname],
  );

  useLayoutEffect(() => {
    const prevTitle = document.title;
    document.title = "Page not found | Women's Health Duo";

    let robots = document.querySelector('meta[name="robots"]');
    const created = !robots;
    if (!robots) {
      robots = document.createElement("meta");
      robots.setAttribute("name", "robots");
      document.head.appendChild(robots);
    }
    const prevRobots = robots.getAttribute("content");
    robots.setAttribute("content", "noindex, nofollow");

    return () => {
      document.title = prevTitle;
      if (created && robots?.parentNode) {
        robots.parentNode.removeChild(robots);
      } else if (prevRobots != null) {
        robots?.setAttribute("content", prevRobots);
      } else {
        robots?.setAttribute(
          "content",
          "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
        );
      }
    };
  }, []);

  useEffect(() => {
    if (import.meta.env.DEV) {
      console.warn("[404]", location.pathname);
    }
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted px-4 pb-28 pt-8">
      <div className="mx-auto w-full max-w-md text-center">
        <h1 className="mb-4 text-4xl font-bold">404</h1>
        <p className="mb-6 text-xl text-muted-foreground">Oops! Page not found</p>
        <p className="mb-6 flex flex-col gap-3 text-sm text-muted-foreground sm:flex-row sm:justify-center sm:gap-6">
          <a
            href={whatsappUrlWithMessage(waMessage)}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary underline underline-offset-4 hover:text-primary/90"
          >
            Message on WhatsApp
          </a>
          <Link
            to={{ pathname: ROUTES.home, hash: "contact" }}
            className="text-primary underline underline-offset-4 hover:text-primary/90"
          >
            Contact form
          </Link>
        </p>
        <Link
          to={ROUTES.home}
          className="text-primary underline underline-offset-4 hover:text-primary/90"
        >
          Return to home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
