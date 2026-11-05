/**
 * SEO-10 — build-time React prerender paths (React 18 `renderToString`).
 *
 * Covers every **indexable content template** with at least one URL (plus priority hubs).
 * Not every matrix/watch/guide URL — long-tail stays on `#static-seo-shell` until a full
 * sitemap prerender pass is warranted. Soft-fail per path in `prerenderPriorityPages.ts`.
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
  "/online-consultation/mumbai/ivf-fertility-treatments",
  // Topic guide care hubs + FAQ-style samples (SEO-12 priority set)
  "/womens-health-physiotherapy",
  "/prenatal-physiotherapy",
  "/postpartum-recovery",
  "/bladder-leakage",
  "/diastasis-recti",
  "/what-is-prenatal-physiotherapy",
  "/what-is-diastasis-recti",
  "/what-is-womens-health-physiotherapy",
  "/can-physiotherapy-help-with-bladder-leakage",
];

/** Marker attribute written into `#root` when prerender succeeds (hydration / audits). */
export const PRERENDER_ROOT_ATTR = "data-seo-prerender";
