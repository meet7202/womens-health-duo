import { useLocation } from "react-router-dom";
import { useEffect, useLayoutEffect, useMemo } from "react";
import { ROUTES } from "@/config/routes";
import { whatsappMessageGenericPage, whatsappUrlWithMessage } from "@/lib/whatsappCta";
import { AppLink as Link } from "@/components/router/AppLink";

const NotFound = () => {
  const location = useLocation();
  const waMessage = useMemo(
    () => whatsappMessageGenericPage("404 ,  page not found", location.pathname),
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
        <p
          className="mb-2 text-5xl font-bold tabular-nums text-muted-foreground"
          aria-hidden="true"
        >
          404
        </p>
        <h1 className="mb-4 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
          Page not found
        </h1>
        <p className="mb-6 text-muted-foreground">
          We couldn&apos;t find that URL. Return home or message us on WhatsApp, your chat goes
          straight to our practice number.
        </p>
        <div className="mb-6 flex flex-col items-stretch gap-3 sm:items-center">
          <a
            href={whatsappUrlWithMessage(waMessage)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#25D366] px-4 py-3 text-sm font-semibold text-white shadow-md hover:bg-[#1ebe57] transition-colors"
          >
            Book on WhatsApp
          </a>
          <Link
            to={ROUTES.homeContact}
            className="text-center text-sm text-primary underline underline-offset-4 hover:text-primary/90"
          >
            Prefer to add details first? Use the homepage contact form (opens WhatsApp)
          </Link>
        </div>
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
