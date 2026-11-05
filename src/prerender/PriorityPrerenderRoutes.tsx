/**
 * Eager route map for SEO-10 prerender (indexable content templates).
 * Client `App.tsx` keeps lazy splitting (SEO-24); this module is SSR-only.
 *
 * Mirrors App.tsx route shapes without BrowserRouter / Suspense / chrome chrome
 * (StickyWhatsApp, Normalize*, ScrollToTop) that are client-only.
 */
import { Route, Routes } from "react-router-dom";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "@/pages/Index";
import { DoctorProfilePage } from "@/pages/DoctorProfilePage";
import { CityLandingPage } from "@/pages/CityLandingPage";
import { BookConsultationPage } from "@/pages/BookConsultationPage";
import { FreeWomensHealthCommunityPage } from "@/pages/FreeWomensHealthCommunityPage";
import { PrenatalClassesPage } from "@/pages/PrenatalClassesPage";
import { PostnatalClassesPage } from "@/pages/PostnatalClassesPage";
import { PilatesClassesPage } from "@/pages/PilatesClassesPage";
import { LearnPage } from "@/pages/LearnPage";
import { LearnWatchPage } from "@/pages/LearnWatchPage";
import { LearnArticlesIndexPage } from "@/pages/LearnArticlesIndexPage";
import { FaqPage } from "@/pages/FaqPage";
import { MedicalDisclaimerPage } from "@/pages/MedicalDisclaimerPage";
import { EditorialPolicyPage } from "@/pages/EditorialPolicyPage";
import { TelemedicinePolicyPage } from "@/pages/TelemedicinePolicyPage";
import { PrivacyPolicyPage } from "@/pages/PrivacyPolicyPage";
import { TermsOfServicePage } from "@/pages/TermsOfServicePage";
import { RefundPolicyPage } from "@/pages/RefundPolicyPage";
import { InternationalConsultationHubPage } from "@/pages/InternationalConsultationHubPage";
import { InternationalDoctorHubPage } from "@/pages/InternationalDoctorHubPage";
import { InternationalServicePage } from "@/pages/InternationalServicePage";
import { VirtualOnlineConsultationHubPage } from "@/pages/VirtualOnlineConsultationHubPage";
import { VirtualOnlineConsultationCityPage } from "@/pages/VirtualOnlineConsultationCityPage";
import { VirtualOnlineServiceCityPage } from "@/pages/VirtualOnlineServiceCityPage";
import { VirtualConsultationCountryPage } from "@/pages/VirtualConsultationCountryPage";
import { TopicGuidePage } from "@/pages/TopicGuidePage";
import { ROUTES, HOME_SECTION_SCROLL_PATHS } from "@/config/routes";
import { VIRTUAL_CONSULTATION_HUB_PATH } from "@/lib/virtualConsultation";

export function PriorityPrerenderRoutes() {
  return (
    <TooltipProvider>
      <Routes>
        <Route path={ROUTES.home} element={<Index />} />
        {HOME_SECTION_SCROLL_PATHS.map((path) => (
          <Route key={path} path={path} element={<Index />} />
        ))}
        <Route path={ROUTES.drCharmi} element={<DoctorProfilePage slug="charmi" />} />
        <Route path={ROUTES.drZalak} element={<DoctorProfilePage slug="zalak" />} />
        <Route path={ROUTES.prenatal} element={<PrenatalClassesPage />} />
        <Route path={ROUTES.postnatal} element={<PostnatalClassesPage />} />
        <Route path={ROUTES.pilates} element={<PilatesClassesPage />} />
        <Route path={ROUTES.ahmedabad} element={<CityLandingPage cityKey="ahmedabad" />} />
        <Route path={ROUTES.mumbai} element={<CityLandingPage cityKey="mumbai" />} />
        <Route path={ROUTES.valsad} element={<CityLandingPage cityKey="valsad" />} />
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
        <Route path={`${ROUTES.learn}/watch/:videoId`} element={<LearnWatchPage />} />
        <Route path={`${ROUTES.learn}/topic/:topicSlug`} element={<LearnPage />} />
        <Route path={ROUTES.learnArticles} element={<LearnArticlesIndexPage />} />
        <Route path={`${ROUTES.learn}/:doctorSegment/topic/:topicSlug`} element={<LearnPage />} />
        <Route path={`${ROUTES.learn}/:doctorSegment`} element={<LearnPage />} />
        <Route path={ROUTES.learn} element={<LearnPage />} />
        <Route path={ROUTES.faq} element={<FaqPage />} />
        <Route path={ROUTES.bookConsultation} element={<BookConsultationPage />} />
        <Route
          path={ROUTES.freeWomensHealthCommunity}
          element={<FreeWomensHealthCommunityPage />}
        />
        <Route
          path={`${ROUTES.internationalConsultation}/dr-charmi`}
          element={<InternationalDoctorHubPage />}
        />
        <Route
          path={`${ROUTES.internationalConsultation}/dr-zalak`}
          element={<InternationalDoctorHubPage />}
        />
        <Route
          path={`${ROUTES.internationalConsultation}/:serviceSlug`}
          element={<InternationalServicePage />}
        />
        <Route
          path={ROUTES.internationalConsultation}
          element={<InternationalConsultationHubPage />}
        />
        <Route path={ROUTES.medicalDisclaimer} element={<MedicalDisclaimerPage />} />
        <Route path={ROUTES.editorialPolicy} element={<EditorialPolicyPage />} />
        <Route path={ROUTES.telemedicinePolicy} element={<TelemedicinePolicyPage />} />
        <Route path={ROUTES.privacyPolicy} element={<PrivacyPolicyPage />} />
        <Route path={ROUTES.termsOfService} element={<TermsOfServicePage />} />
        <Route path={ROUTES.refundPolicy} element={<RefundPolicyPage />} />
        <Route path="/:topicGuideSlug" element={<TopicGuidePage />} />
      </Routes>
    </TooltipProvider>
  );
}
