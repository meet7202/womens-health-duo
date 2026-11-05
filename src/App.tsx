import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ScrollToTop } from "@/components/layout/ScrollToTop";
import Index from "./pages/Index";
import { ROUTES, HOME_SECTION_SCROLL_PATHS } from "@/config/routes";
import { VIRTUAL_CONSULTATION_HUB_PATH } from "@/lib/virtualConsultation";
import { StickyWhatsAppButton } from "@/components/layout/StickyWhatsAppButton";
import { NormalizeIndexHtmlUrl } from "@/components/layout/NormalizeIndexHtmlUrl";
import { NormalizeTrailingSlashUrl } from "@/components/layout/NormalizeTrailingSlashUrl";
import { RemoveStaticSeoShell } from "@/components/layout/RemoveStaticSeoShell";
import { publicRoutePath } from "@/lib/githubPagesPublicUrl";

/**
 * SEO-24: lazy-load non-home page modules (named-export adapters).
 * Homepage (`Index`) stays eager — see Index.tsx stale-chunk comment.
 * Do not add a catch-all vendor chunk in vite.config (TDZ risk).
 */
const DoctorProfilePage = lazy(() =>
  import("./pages/DoctorProfilePage").then((m) => ({ default: m.DoctorProfilePage })),
);
const CityLandingPage = lazy(() =>
  import("./pages/CityLandingPage").then((m) => ({ default: m.CityLandingPage })),
);
const LearnPage = lazy(() => import("./pages/LearnPage").then((m) => ({ default: m.LearnPage })));
const LearnWatchPage = lazy(() =>
  import("./pages/LearnWatchPage").then((m) => ({ default: m.LearnWatchPage })),
);
const FaqPage = lazy(() => import("./pages/FaqPage").then((m) => ({ default: m.FaqPage })));
const MedicalDisclaimerPage = lazy(() =>
  import("./pages/MedicalDisclaimerPage").then((m) => ({ default: m.MedicalDisclaimerPage })),
);
const EditorialPolicyPage = lazy(() =>
  import("./pages/EditorialPolicyPage").then((m) => ({ default: m.EditorialPolicyPage })),
);
const TelemedicinePolicyPage = lazy(() =>
  import("./pages/TelemedicinePolicyPage").then((m) => ({ default: m.TelemedicinePolicyPage })),
);
const PrivacyPolicyPage = lazy(() =>
  import("./pages/PrivacyPolicyPage").then((m) => ({ default: m.PrivacyPolicyPage })),
);
const TermsOfServicePage = lazy(() =>
  import("./pages/TermsOfServicePage").then((m) => ({ default: m.TermsOfServicePage })),
);
const RefundPolicyPage = lazy(() =>
  import("./pages/RefundPolicyPage").then((m) => ({ default: m.RefundPolicyPage })),
);
const BookConsultationPage = lazy(() =>
  import("./pages/BookConsultationPage").then((m) => ({ default: m.BookConsultationPage })),
);
const FreeWomensHealthCommunityPage = lazy(() =>
  import("./pages/FreeWomensHealthCommunityPage").then((m) => ({
    default: m.FreeWomensHealthCommunityPage,
  })),
);
const InternationalConsultationHubPage = lazy(() =>
  import("./pages/InternationalConsultationHubPage").then((m) => ({
    default: m.InternationalConsultationHubPage,
  })),
);
const InternationalDoctorHubPage = lazy(() =>
  import("./pages/InternationalDoctorHubPage").then((m) => ({
    default: m.InternationalDoctorHubPage,
  })),
);
const InternationalServicePage = lazy(() =>
  import("./pages/InternationalServicePage").then((m) => ({ default: m.InternationalServicePage })),
);
const TopicGuidePage = lazy(() =>
  import("./pages/TopicGuidePage").then((m) => ({ default: m.TopicGuidePage })),
);
const LearnArticlesIndexPage = lazy(() =>
  import("./pages/LearnArticlesIndexPage").then((m) => ({ default: m.LearnArticlesIndexPage })),
);
const VirtualOnlineConsultationHubPage = lazy(() =>
  import("./pages/VirtualOnlineConsultationHubPage").then((m) => ({
    default: m.VirtualOnlineConsultationHubPage,
  })),
);
const VirtualOnlineConsultationCityPage = lazy(() =>
  import("./pages/VirtualOnlineConsultationCityPage").then((m) => ({
    default: m.VirtualOnlineConsultationCityPage,
  })),
);
const VirtualOnlineServiceCityPage = lazy(() =>
  import("./pages/VirtualOnlineServiceCityPage").then((m) => ({
    default: m.VirtualOnlineServiceCityPage,
  })),
);
const VirtualConsultationCountryPage = lazy(() =>
  import("./pages/VirtualConsultationCountryPage").then((m) => ({
    default: m.VirtualConsultationCountryPage,
  })),
);
const LegacyGlobalOnlineHubRedirect = lazy(() =>
  import("./pages/LegacyGlobalOnlineRedirects").then((m) => ({
    default: m.LegacyGlobalOnlineHubRedirect,
  })),
);
const LegacyGlobalOnlineCityRedirect = lazy(() =>
  import("./pages/LegacyGlobalOnlineRedirects").then((m) => ({
    default: m.LegacyGlobalOnlineCityRedirect,
  })),
);
const PrenatalClassesPage = lazy(() =>
  import("./pages/PrenatalClassesPage").then((m) => ({ default: m.PrenatalClassesPage })),
);
const PostnatalClassesPage = lazy(() =>
  import("./pages/PostnatalClassesPage").then((m) => ({ default: m.PostnatalClassesPage })),
);
const PilatesClassesPage = lazy(() =>
  import("./pages/PilatesClassesPage").then((m) => ({ default: m.PilatesClassesPage })),
);
const ZalakGroupClassPage = lazy(() =>
  import("./pages/ZalakGroupClassPage").then((m) => ({ default: m.ZalakGroupClassPage })),
);
const NotFound = lazy(() => import("./pages/NotFound"));

/** Accessible suspense fallback while a route chunk loads (SEO-24). */
function RouteChunkFallback() {
  return (
    <div
      role="status"
      aria-live="polite"
      aria-busy="true"
      className="min-h-[40vh] flex items-center justify-center px-4 py-16 text-muted-foreground"
    >
      <p className="text-sm">Loading page…</p>
    </div>
  );
}

/** GitHub Pages project URL is /womens-health-duo/; custom domain is /. */
const GITHUB_PAGES_REPO_BASE = "/womens-health-duo";

function routerBasename(): string | undefined {
  if (!import.meta.env.PROD) return undefined;
  const { pathname } = window.location;
  if (pathname === GITHUB_PAGES_REPO_BASE || pathname.startsWith(`${GITHUB_PAGES_REPO_BASE}/`)) {
    return GITHUB_PAGES_REPO_BASE;
  }
  return undefined;
}

const App = () => (
  <TooltipProvider>
    <Toaster />
    <Sonner />
    <BrowserRouter
      basename={routerBasename()}
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      }}
    >
      <NormalizeIndexHtmlUrl />
      <NormalizeTrailingSlashUrl />
      <RemoveStaticSeoShell />
      <ScrollToTop />
      <Suspense fallback={<RouteChunkFallback />}>
        <Routes>
          <Route path={ROUTES.home} element={<Index />} />
          {HOME_SECTION_SCROLL_PATHS.map((path) => (
            <Route key={path} path={publicRoutePath(path)} element={<Index />} />
          ))}
          <Route
            path={publicRoutePath(ROUTES.drCharmi)}
            element={<DoctorProfilePage slug="charmi" />}
          />
          <Route
            path={publicRoutePath(ROUTES.drZalak)}
            element={<DoctorProfilePage slug="zalak" />}
          />
          <Route path={publicRoutePath(ROUTES.prenatal)} element={<PrenatalClassesPage />} />
          <Route path={publicRoutePath(ROUTES.postnatal)} element={<PostnatalClassesPage />} />
          <Route path={publicRoutePath(ROUTES.pilates)} element={<PilatesClassesPage />} />
          <Route
            path={publicRoutePath(`${ROUTES.drZalak}/:classSlug`)}
            element={<ZalakGroupClassPage />}
          />
          <Route
            path={publicRoutePath(ROUTES.ahmedabad)}
            element={<CityLandingPage cityKey="ahmedabad" />}
          />
          <Route
            path={publicRoutePath(ROUTES.mumbai)}
            element={<CityLandingPage cityKey="mumbai" />}
          />
          <Route
            path={publicRoutePath(ROUTES.valsad)}
            element={<CityLandingPage cityKey="valsad" />}
          />
          <Route
            path={publicRoutePath(ROUTES.bangalore)}
            element={<CityLandingPage cityKey="bangalore" />}
          />
          <Route
            path={publicRoutePath(`${VIRTUAL_CONSULTATION_HUB_PATH}/country/:countryCode`)}
            element={<VirtualConsultationCountryPage />}
          />
          <Route
            path={publicRoutePath(`${VIRTUAL_CONSULTATION_HUB_PATH}/:citySlug/:serviceSlug`)}
            element={<VirtualOnlineServiceCityPage />}
          />
          <Route
            path={publicRoutePath(`${VIRTUAL_CONSULTATION_HUB_PATH}/:slug`)}
            element={<VirtualOnlineConsultationCityPage />}
          />
          <Route
            path={publicRoutePath(ROUTES.onlineConsultation)}
            element={<VirtualOnlineConsultationHubPage />}
          />
          <Route
            path={publicRoutePath(`${ROUTES.globalOnline}/:slug`)}
            element={<LegacyGlobalOnlineCityRedirect />}
          />
          <Route
            path={publicRoutePath(ROUTES.globalOnline)}
            element={<LegacyGlobalOnlineHubRedirect />}
          />
          <Route
            path={publicRoutePath(`${ROUTES.learn}/watch/:videoId`)}
            element={<LearnWatchPage />}
          />
          <Route
            path={publicRoutePath(`${ROUTES.learn}/topic/:topicSlug`)}
            element={<LearnPage />}
          />
          <Route
            path={publicRoutePath(ROUTES.learnArticles)}
            element={<LearnArticlesIndexPage />}
          />
          <Route
            path={publicRoutePath(`${ROUTES.learn}/:doctorSegment/topic/:topicSlug`)}
            element={<LearnPage />}
          />
          <Route path={publicRoutePath(`${ROUTES.learn}/:doctorSegment`)} element={<LearnPage />} />
          <Route path={publicRoutePath(ROUTES.learn)} element={<LearnPage />} />
          <Route path={publicRoutePath(ROUTES.faq)} element={<FaqPage />} />
          <Route
            path={publicRoutePath(ROUTES.bookConsultation)}
            element={<BookConsultationPage />}
          />
          <Route
            path={publicRoutePath(ROUTES.freeWomensHealthCommunity)}
            element={<FreeWomensHealthCommunityPage />}
          />
          <Route
            path={publicRoutePath(`${ROUTES.internationalConsultation}/dr-charmi`)}
            element={<InternationalDoctorHubPage />}
          />
          <Route
            path={publicRoutePath(`${ROUTES.internationalConsultation}/dr-zalak`)}
            element={<InternationalDoctorHubPage />}
          />
          <Route
            path={publicRoutePath(`${ROUTES.internationalConsultation}/:serviceSlug`)}
            element={<InternationalServicePage />}
          />
          <Route
            path={publicRoutePath(ROUTES.internationalConsultation)}
            element={<InternationalConsultationHubPage />}
          />
          <Route
            path={publicRoutePath(ROUTES.medicalDisclaimer)}
            element={<MedicalDisclaimerPage />}
          />
          <Route path={publicRoutePath(ROUTES.editorialPolicy)} element={<EditorialPolicyPage />} />
          <Route
            path={publicRoutePath(ROUTES.telemedicinePolicy)}
            element={<TelemedicinePolicyPage />}
          />
          <Route path={publicRoutePath(ROUTES.privacyPolicy)} element={<PrivacyPolicyPage />} />
          <Route path={publicRoutePath(ROUTES.termsOfService)} element={<TermsOfServicePage />} />
          <Route path={publicRoutePath(ROUTES.refundPolicy)} element={<RefundPolicyPage />} />
          <Route path={publicRoutePath("/:topicGuideSlug")} element={<TopicGuidePage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
      <StickyWhatsAppButton />
    </BrowserRouter>
  </TooltipProvider>
);

export default App;
