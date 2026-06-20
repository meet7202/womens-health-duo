import { lazy, Suspense } from "react";
import { Header } from "@/components/layout/Header";
import { PageBreadcrumbs } from "@/components/layout/PageBreadcrumbs";
import type { Crumb } from "@/components/seo/schema/breadcrumbs";

const Footer = lazy(() =>
  import("@/components/layout/Footer").then((m) => ({ default: m.Footer })),
);

type PageShellProps = {
  children: React.ReactNode;
  breadcrumbs?: Crumb[];
};

export function PageShell({ children, breadcrumbs }: PageShellProps) {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <main
        id="main-content"
        className="container mx-auto max-w-3xl px-4 pt-28 pb-28 sm:px-6 lg:px-8 lg:max-w-4xl"
      >
        {breadcrumbs && breadcrumbs.length > 0 ? <PageBreadcrumbs items={breadcrumbs} /> : null}
        {children}
      </main>
      <Suspense fallback={<div className="h-32 bg-foreground" aria-hidden />}>
        <Footer />
      </Suspense>
    </div>
  );
}
