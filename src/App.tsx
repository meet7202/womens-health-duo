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
import { FaqPage } from "@/pages/FaqPage";
import { MedicalDisclaimerPage } from "@/pages/MedicalDisclaimerPage";
import { EditorialPolicyPage } from "@/pages/EditorialPolicyPage";
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
import { ROUTES, HOME_SECTION_SCROLL_PATHS } from "@/config/routes";
import { VIRTUAL_CONSULTATION_HUB_PATH } from "@/lib/virtualConsultation";
import { StickyWhatsAppButton } from "@/components/layout/StickyWhatsAppButton";
import { NormalizeIndexHtmlUrl } from "@/components/layout/NormalizeIndexHtmlUrl";

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
      <ScrollToTop />
      <Routes>
        <Route path={ROUTES.home} element={<Index />} />
        {HOME_SECTION_SCROLL_PATHS.map((path) => (
          <Route key={path} path={path} element={<Index />} />
        ))}
        <Route path={ROUTES.drCharmi} element={<DoctorProfilePage slug="charmi" />} />
        <Route path={ROUTES.drZalak} element={<DoctorProfilePage slug="zalak" />} />
        <Route path={ROUTES.ahmedabad} element={<CityLandingPage cityKey="ahmedabad" />} />
        <Route path={ROUTES.mumbai} element={<CityLandingPage cityKey="mumbai" />} />
        <Route path={ROUTES.bangalore} element={<CityLandingPage cityKey="bangalore" />} />
        <Route
          path={`${VIRTUAL_CONSULTATION_HUB_PATH}/country/:countryCode`}
          element={<VirtualConsultationCountryPage />}
        />
        <Route
          path={`${VIRTUAL_CONSULTATION_HUB_PATH}/:citySlug/:serviceSlug`}
          element={<VirtualOnlineServiceCityPage />}
        />
        <Route
          path={`${VIRTUAL_CONSULTATION_HUB_PATH}/:slug`}
          element={<VirtualOnlineConsultationCityPage />}
        />
        <Route path={ROUTES.onlineConsultation} element={<VirtualOnlineConsultationHubPage />} />
        <Route path={`${ROUTES.globalOnline}/:slug`} element={<LegacyGlobalOnlineCityRedirect />} />
        <Route path={ROUTES.globalOnline} element={<LegacyGlobalOnlineHubRedirect />} />
        <Route path={`${ROUTES.learn}/topic/:topicSlug`} element={<LearnPage />} />
        <Route path={ROUTES.learnArticles} element={<LearnArticlesIndexPage />} />
        <Route path={`${ROUTES.learn}/:doctorSegment/topic/:topicSlug`} element={<LearnPage />} />
        <Route path={`${ROUTES.learn}/:doctorSegment`} element={<LearnPage />} />
        <Route path={ROUTES.learn} element={<LearnPage />} />
        <Route path={ROUTES.faq} element={<FaqPage />} />
        <Route path={ROUTES.medicalDisclaimer} element={<MedicalDisclaimerPage />} />
        <Route path={ROUTES.editorialPolicy} element={<EditorialPolicyPage />} />
        <Route path="/:topicGuideSlug" element={<TopicGuidePage />} />
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
