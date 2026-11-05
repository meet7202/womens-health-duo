import type { AnchorHTMLAttributes, ReactNode } from "react";
import { trackWhatsAppClick } from "@/lib/analytics";
import { cn } from "@/lib/utils";

export type TrackedWhatsAppLinkProps = {
  href: string;
  /** Analytics placement (header, sticky_fab, doctor_profile, …). */
  ctaPlacement: string;
  doctor?: string;
  service?: string;
  pagePath?: string;
  children: ReactNode;
  className?: string;
} & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href" | "onClick" | "children" | "className">;

/**
 * Real WhatsApp `<a>` with stable `whatsapp_click` instrumentation (SEO-37).
 * Never pass message body, symptoms, or patient identifiers into analytics.
 */
export function TrackedWhatsAppLink({
  href,
  ctaPlacement,
  doctor,
  service,
  pagePath,
  children,
  className,
  ...rest
}: TrackedWhatsAppLinkProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(className)}
      onClick={() =>
        trackWhatsAppClick({
          ctaPlacement,
          doctor,
          service,
          pagePath:
            pagePath ?? (typeof window !== "undefined" ? window.location.pathname : undefined),
        })
      }
      {...rest}
    >
      {children}
    </a>
  );
}

/** Accessible WhatsApp CTA surface: dark green + white meets WCAG AA (≥4.5:1). */
export const WHATSAPP_CTA_CLASS =
  "inline-flex items-center justify-center gap-2 rounded-lg bg-whatsapp px-4 py-3 text-sm font-semibold text-white shadow-md hover:bg-whatsapp-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 transition-colors";

/** Shared Button `className` for WhatsApp CTAs (pairs with `text-white`). */
export const WHATSAPP_BUTTON_CLASS = "bg-whatsapp hover:bg-whatsapp-hover text-white border-0";
