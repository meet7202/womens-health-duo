import { useMemo } from "react";
import { useLocation } from "react-router-dom";
import { MessageCircle } from "lucide-react";
import { TrackedWhatsAppLink } from "@/components/cta/TrackedWhatsAppLink";
import { whatsappIntentFromPathname, whatsappUrlWithMessage } from "@/lib/whatsappCta";

/**
 * Fixed bottom-right WhatsApp launcher on every route. Message reflects current URL.
 */
export function StickyWhatsAppButton() {
  const { pathname } = useLocation();
  const href = useMemo(
    () => whatsappUrlWithMessage(whatsappIntentFromPathname(pathname)),
    [pathname],
  );

  return (
    <TrackedWhatsAppLink
      href={href}
      ctaPlacement="sticky_fab"
      pagePath={pathname}
      title="Book on WhatsApp — Women's Health Duo"
      className="fixed z-[60] flex items-center gap-2 rounded-full bg-whatsapp px-4 py-3 pr-4 text-sm font-semibold text-white shadow-lg ring-2 ring-white/90 hover:bg-whatsapp-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 motion-safe:transition-colors max-sm:py-3.5 max-sm:pl-3.5 max-sm:pr-3.5 sm:bottom-6 sm:right-6"
      style={{
        bottom: "max(1.25rem, env(safe-area-inset-bottom, 0px))",
        right: "max(1rem, env(safe-area-inset-right, 0px))",
      }}
      aria-label="Book on WhatsApp — Women's Health Duo"
    >
      <MessageCircle className="w-5 h-5 shrink-0" aria-hidden />
      <span className="hidden sm:inline">Book on WhatsApp</span>
    </TrackedWhatsAppLink>
  );
}
