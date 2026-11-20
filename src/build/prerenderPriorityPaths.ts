/**
 * SEO-10 — build-time React prerender paths (React 18 `renderToString`).
 *
 * Covers every **indexable content template** with at least one URL (plus priority hubs).
 * Indexable topic guides, Learn filters and watch pages are appended at build time
 * (see `vite.config.ts`) so their text is in the HTML without JavaScript.
 * The full service×city matrix is appended from `vite.config.ts`. Soft-fail per path.
 *
 * Must not use `@/` imports (loaded from Node / vite closeBundle).
 */
export const PRERENDER_PRIORITY_PATHS: readonly string[] = [
  // Home + section permalink template
  "/",
  "/about",
  // Doctors + India cities
  "/dr-charmi-shah",
  "/dr-zalak-shah",
  "/ahmedabad",
  "/mumbai",
  "/valsad",
  "/bangalore",
  // Zalak class landings
  "/prenatal",
  "/postnatal",
  "/pilates",
  // Booking + community
  "/book-consultation",
  "/free-womens-health-community",
  // Learn hub templates (root, doctor filter, topic filter, articles index, watch)
  "/learn",
  "/learn/dr-zalak",
  "/learn/topic/pregnancy",
  "/learn/articles",
  "/learn/watch/yt-duo-pilates-day",
  "/learn/watch/ig-dapwufmq3w4",
  // FAQ + policies
  "/faq",
  "/medical-disclaimer",
  "/editorial-policy",
  "/telemedicine-policy",
  "/privacy-policy",
  "/terms-of-service",
  "/refund-policy",
  // International consultation templates
  "/international-consultation",
  "/international-consultation/dr-zalak",
  "/international-consultation/ivf-second-opinion",
  "/international-consultation/pelvic-floor-physiotherapy-online",
  // Virtual consultation templates (hub / country / city / service×city)
  "/online-consultation",
  "/online-consultation/country/india",
  "/online-consultation/mumbai",
  "/online-consultation/ahmedabad",
  "/online-consultation/valsad",
  "/online-consultation/bengaluru",
  "/online-consultation/mumbai/ivf-fertility-treatments",
];

/** Marker attribute written into `#root` when prerender succeeds (hydration / audits). */
export const PRERENDER_ROOT_ATTR = "data-seo-prerender";
