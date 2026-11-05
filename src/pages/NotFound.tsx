import { useLocation } from "react-router-dom";
import { useEffect, useMemo } from "react";
import { ROUTES } from "@/config/routes";
import { ROBOTS_NOINDEX_NOFOLLOW } from "@/config/routeDisposition";
import { whatsappMessageGenericPage, whatsappUrlWithMessage } from "@/lib/whatsappCta";
import { AppLink as Link } from "@/components/router/AppLink";
import { SeoHead } from "@/components/seo/SeoHead";
import { TrackedWhatsAppLink, WHATSAPP_CTA_CLASS } from "@/components/cta/TrackedWhatsAppLink";

const NotFound = () => {
  const location = useLocation();
  const waMessage = useMemo(
    () => whatsappMessageGenericPage("404 ,  page not found", location.pathname),
    [location.pathname],
  );

  useEffect(() => {
    if (import.meta.env.DEV) {
      console.warn("[404]", location.pathname);
    }
  }, [location.pathname]);

  return (
    <>
      <SeoHead
        title="Page not found | Women's Health Duo"
        metaDescription="This URL is not a published Women's Health Duo page. Return home or book a consult via the practice WhatsApp number."
        path={location.pathname}
        robots={ROBOTS_NOINDEX_NOFOLLOW}
      />
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
            <TrackedWhatsAppLink
              href={whatsappUrlWithMessage(waMessage)}
              ctaPlacement="not_found"
              pagePath={location.pathname}
              className={WHATSAPP_CTA_CLASS}
            >
              Book on WhatsApp
            </TrackedWhatsAppLink>
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
    </>
  );
};

export default NotFound;
