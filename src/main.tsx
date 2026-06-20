import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RootErrorBoundary } from "@/components/RootErrorBoundary";
import App from "./App.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <RootErrorBoundary>
    <StrictMode>
      <App />
    </StrictMode>
  </RootErrorBoundary>,
);
