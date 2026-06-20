import { Link, useLocation } from "react-router-dom";
import { useEffect, useLayoutEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useLayoutEffect(() => {
    const prevTitle = document.title;
    document.title = "Page not found | Women's Health Duo";

    let robots = document.querySelector('meta[name="robots"]');
    const created = !robots;
    if (!robots) {
      robots = document.createElement("meta");
      robots.setAttribute("name", "robots");
      document.head.appendChild(robots);
    }
    const prevRobots = robots.getAttribute("content");
    robots.setAttribute("content", "noindex, nofollow");

    return () => {
      document.title = prevTitle;
      if (created && robots?.parentNode) {
        robots.parentNode.removeChild(robots);
      } else if (prevRobots != null) {
        robots?.setAttribute("content", prevRobots);
      } else {
        robots?.setAttribute(
          "content",
          "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
        );
      }
    };
  }, []);

  useEffect(() => {
    if (import.meta.env.DEV) {
      console.warn("[404]", location.pathname);
    }
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted">
      <div className="text-center">
        <h1 className="mb-4 text-4xl font-bold">404</h1>
        <p className="mb-4 text-xl text-muted-foreground">Oops! Page not found</p>
        <Link to="/" className="text-primary underline underline-offset-4 hover:text-primary/90">
          Return to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
