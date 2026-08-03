import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ScrollToTop } from "@/components/layout/ScrollToTop";
import Index from "./pages/Index";
import { DoctorProfilePage } from "@/pages/DoctorProfilePage";
import { CityLandingPage } from "@/pages/CityLandingPage";
import { LearnPage } from "@/pages/LearnPage";
import { LearnWatchPage } from "@/pages/LearnWatchPage";
import { FaqPage } from "@/pages/FaqPage";
import { MedicalDisclaimerPage } from "@/pages/MedicalDisclaimerPage";
import { EditorialPolicyPage } from "@/pages/EditorialPolicyPage";
import { TelemedicinePolicyPage } from "@/pages/TelemedicinePolicyPage";
import { PrivacyPolicyPage } from "@/pages/PrivacyPolicyPage";
import { TermsOfServicePage } from "@/pages/TermsOfServicePage";
import { RefundPolicyPage } from "@/pages/RefundPolicyPage";
import { BookConsultationPage } from "@/pages/BookConsultationPage";
import { FreeWomensHealthCommunityPage } from "@/pages/FreeWomensHealthCommunityPage";
import { InternationalConsultationHubPage } from "@/pages/InternationalConsultationHubPage";
import { InternationalDoctorHubPage } from "@/pages/InternationalDoctorHubPage";
import { InternationalServicePage } from "@/pages/InternationalServicePage";
import { TopicGuidePage } from "@/pages/TopicGuidePage";
import { LearnArticlesIndexPage } from "@/pages/LearnArticlesIndexPage";
import { VirtualOnlineConsultationHubPage } from "@/pages/VirtualOnlineConsultationHubPage";
import { VirtualOnlineConsultationCityPage } from "@/pages/VirtualOnlineConsultationCityPage";
import { VirtualOnlineServiceCityPage } from "@/pages/VirtualOnlineServiceCityPage";
import { VirtualConsultationCountryPage } from "@/pages/VirtualConsultationCountryPage";
import {
  LegacyGlobalOnlineCityRedirect,
  LegacyGlobalOnlineHubRedirect,
} from "@/pages/LegacyGlobalOnlineRedirects";
import { PrenatalClassesPage } from "@/pages/PrenatalClassesPage";
import { PostnatalClassesPage } from "@/pages/PostnatalClassesPage";
import { PilatesClassesPage } from "@/pages/PilatesClassesPage";
import { ZalakGroupClassPage } from "@/pages/ZalakGroupClassPage";
import { ROUTES, HOME_SECTION_SCROLL_PATHS } from "@/config/routes";
import { VIRTUAL_CONSULTATION_HUB_PATH } from "@/lib/virtualConsultation";
import { StickyWhatsAppButton } from "@/components/layout/StickyWhatsAppButton";
import { NormalizeIndexHtmlUrl } from "@/components/layout/NormalizeIndexHtmlUrl";
import { NormalizeTrailingSlashUrl } from "@/components/layout/NormalizeTrailingSlashUrl";
import { RemoveStaticSeoShell } from "@/components/layout/RemoveStaticSeoShell";
import { publicRoutePath } from "@/lib/githubPagesPublicUrl";

const NotFound = lazy(() => import("./pages/NotFound"));

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
        <Route
          path={publicRoutePath(ROUTES.prenatal)}
          element={<PrenatalClassesPage />}
        />
        <Route
          path={publicRoutePath(ROUTES.postnatal)}
          element={<PostnatalClassesPage />}
        />
        <Route
          path={publicRoutePath(ROUTES.pilates)}
          element={<PilatesClassesPage />}
        />
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
        <Route path={publicRoutePath(`${ROUTES.learn}/topic/:topicSlug`)} element={<LearnPage />} />
        <Route path={publicRoutePath(ROUTES.learnArticles)} element={<LearnArticlesIndexPage />} />
        <Route
          path={publicRoutePath(`${ROUTES.learn}/:doctorSegment/topic/:topicSlug`)}
          element={<LearnPage />}
        />
        <Route path={publicRoutePath(`${ROUTES.learn}/:doctorSegment`)} element={<LearnPage />} />
        <Route path={publicRoutePath(ROUTES.learn)} element={<LearnPage />} />
        <Route path={publicRoutePath(ROUTES.faq)} element={<FaqPage />} />
        <Route path={publicRoutePath(ROUTES.bookConsultation)} element={<BookConsultationPage />} />
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
        <Route
          path="*"
          element={
            <Suspense fallback={null}>
              <NotFound />
            </Suspense>
          }
        />
      </Routes>
      <StickyWhatsAppButton />
    </BrowserRouter>
  </TooltipProvider>
);

export default App;
