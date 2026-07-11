import { useState, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import whdLogo from "@/assets/whd-logo.jpg";
import { ROUTES } from "@/config/routes";
import { cn } from "@/lib/utils";
import { publicPathname } from "@/lib/githubPagesPublicUrl";
import { whatsappIntentFromPathname, whatsappUrlWithMessage } from "@/lib/whatsappCta";
import { AppLink as Link } from "@/components/router/AppLink";

const homeNavSections = [
  { label: "About", to: publicPathname(ROUTES.homeAbout) },
  { label: "Services", to: publicPathname(ROUTES.homeServicesSection) },
  { label: "Testimonials", to: publicPathname(ROUTES.homeTestimonials) },
  { label: "Contact", to: publicPathname(ROUTES.homeContact) },
] as const;

/** Nav links before Learn: About → Services → Testimonials. */
const HOME_NAV_BEFORE_LEARN = homeNavSections.slice(0, 3);
/** Nav links after Learn (Contact). */
const HOME_NAV_AFTER_LEARN = homeNavSections.slice(3);

function normalizePath(p: string) {
  return p.replace(/\/+$/, "") || "/";
}

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isRootHomePath = normalizePath(location.pathname) === ROUTES.home;
  const isLearnActive =
    location.pathname === ROUTES.learn || location.pathname.startsWith(`${ROUTES.learn}/`);
  const whatsappHref = useMemo(
    () => whatsappUrlWithMessage(whatsappIntentFromPathname(location.pathname)),
    [location.pathname],
  );

  const closeMobile = () => setIsOpen(false);

  /** Home / logo: SPA `Link` to `/` does not scroll when already on `/`, and RR does not scroll to top by default. */
  const goHome = (e: React.MouseEvent) => {
    if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) {
      return;
    }
    e.preventDefault();
    closeMobile();
    const alreadyHome = location.pathname === ROUTES.home;
    const hasHash = Boolean(location.hash.replace(/^#/, "").trim());
    if (alreadyHome && !hasHash) {
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
      return;
    }
    void navigate({ pathname: publicPathname(ROUTES.home) }, { replace: alreadyHome });
    const scrollTop = () => window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    queueMicrotask(scrollTop);
    requestAnimationFrame(() => {
      requestAnimationFrame(scrollTop);
    });
  };

  const onHomeSectionNavClick = (e: React.MouseEvent, to: string) => {
    if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) {
      return;
    }
    e.preventDefault();
    closeMobile();
    void navigate(publicPathname(to), { replace: isRootHomePath });
  };

  /** Learn in the nav: always open the hub and top of page; if already on `/learn`, scroll up (Link alone would not). */
  const goLearn = (e: React.MouseEvent) => {
    if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) {
      return;
    }
    e.preventDefault();
    closeMobile();
    const path = normalizePath(location.pathname);
    const learnRoot = normalizePath(ROUTES.learn);
    if (path === learnRoot) {
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
      return;
    }
    void navigate(publicPathname(ROUTES.learn));
    const scrollTop = () => window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    queueMicrotask(scrollTop);
    requestAnimationFrame(() => {
      requestAnimationFrame(scrollTop);
    });
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <motion.div
            className="flex min-w-0 flex-1 items-center gap-3 md:flex-initial"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link
              to={publicPathname(ROUTES.home)}
              onClick={goHome}
              className="flex min-w-0 items-center gap-2 sm:gap-3 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              <div className="h-10 w-10 shrink-0 sm:h-12 sm:w-12">
                <img
                  src={whdLogo}
                  alt="Women's Health Duo"
                  className="h-full w-full object-contain"
                  width={48}
                  height={48}
                />
              </div>
              <div className="min-w-0">
                <p className="font-heading truncate text-base font-semibold text-foreground sm:text-xl">
                  Women&apos;s Health Duo
                </p>
                <p className="hidden text-xs text-muted-foreground -mt-0.5 sm:block">
                  Dr. Charmi &amp; Dr. Zalak Shah
                </p>
              </div>
            </Link>
          </motion.div>

          <nav className="hidden md:flex items-center gap-4 lg:gap-6" aria-label="Primary">
            <Link
              to={publicPathname(ROUTES.home)}
              onClick={goHome}
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              Home
            </Link>
            {HOME_NAV_BEFORE_LEARN.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={(e) => onHomeSectionNavClick(e, item.to)}
                className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                {item.label}
              </Link>
            ))}
            <Link
              to={publicPathname(ROUTES.learn)}
              onClick={goLearn}
              className={cn(
                "text-sm font-medium transition-colors rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 shrink-0",
                isLearnActive ? "text-primary" : "text-muted-foreground hover:text-primary",
              )}
            >
              Learn
            </Link>
            {HOME_NAV_AFTER_LEARN.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={(e) => onHomeSectionNavClick(e, item.to)}
                className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <motion.div
            className="hidden md:flex items-center gap-2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Button
              asChild
              size="default"
              className="bg-[#25D366] hover:bg-[#1ebe57] text-white border-0 shadow-soft"
            >
              <a href={whatsappHref} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="w-4 h-4 mr-2" aria-hidden />
                Book on WhatsApp
              </a>
            </Button>
          </motion.div>

          <button
            type="button"
            aria-expanded={isOpen}
            aria-controls="mobile-nav"
            aria-label={isOpen ? "Close menu" : "Open menu"}
            onClick={() => setIsOpen(!isOpen)}
            className="shrink-0 md:hidden p-2 text-foreground rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-background border-t border-border/50"
          >
            <nav id="mobile-nav" className="container mx-auto px-4 py-4 flex flex-col gap-1">
              <Link
                to={publicPathname(ROUTES.home)}
                onClick={goHome}
                className="text-left py-3 px-4 text-foreground hover:bg-accent rounded-lg transition-colors"
              >
                Home
              </Link>
              {HOME_NAV_BEFORE_LEARN.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={(e) => onHomeSectionNavClick(e, item.to)}
                  className="text-left py-3 px-4 text-foreground hover:bg-accent rounded-lg transition-colors"
                >
                  {item.label}
                </Link>
              ))}
              <Link
                to={publicPathname(ROUTES.learn)}
                onClick={goLearn}
                className={cn(
                  "text-left py-3 px-4 rounded-lg transition-colors",
                  isLearnActive
                    ? "bg-accent text-primary font-medium"
                    : "text-foreground hover:bg-accent",
                )}
              >
                Learn
              </Link>
              {HOME_NAV_AFTER_LEARN.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={(e) => onHomeSectionNavClick(e, item.to)}
                  className="text-left py-3 px-4 text-foreground hover:bg-accent rounded-lg transition-colors"
                >
                  {item.label}
                </Link>
              ))}
              <Button asChild className="mt-2 bg-[#25D366] hover:bg-[#1ebe57] text-white border-0">
                <a href={whatsappHref} target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="w-4 h-4 mr-2" aria-hidden />
                  Book on WhatsApp
                </a>
              </Button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
