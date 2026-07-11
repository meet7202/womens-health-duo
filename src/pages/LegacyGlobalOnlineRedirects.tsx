import { useParams } from "react-router-dom";
import { ROUTES } from "@/config/routes";
import { AppNavigate as Navigate } from "@/components/router/AppNavigate";
import {
  getVirtualConsultationCityBySlug,
  resolveLegacyGlobalOnlineSlug,
  virtualConsultationCityPath,
} from "@/lib/virtualConsultation";

export function LegacyGlobalOnlineHubRedirect() {
  return <Navigate to={ROUTES.onlineConsultation} replace />;
}

export function LegacyGlobalOnlineCityRedirect() {
  const { slug } = useParams<{ slug: string }>();
  const mapped = resolveLegacyGlobalOnlineSlug(slug);
  if (mapped) {
    const city = getVirtualConsultationCityBySlug(mapped);
    if (city) {
      return <Navigate to={virtualConsultationCityPath(city)} replace />;
    }
  }
  return <Navigate to={ROUTES.onlineConsultation} replace />;
}
