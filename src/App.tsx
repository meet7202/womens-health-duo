import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";

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
    <BrowserRouter basename={routerBasename()}>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route
          path="*"
          element={
            <Suspense fallback={null}>
              <NotFound />
            </Suspense>
          }
        />
      </Routes>
    </BrowserRouter>
  </TooltipProvider>
);

export default App;
