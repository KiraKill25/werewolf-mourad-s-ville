/**
 * Point d'entrée du build mobile (Capacitor / APK Android).
 * Rendu 100% côté client avec l'historique hash — aucun serveur requis.
 */
import { Component, StrictMode, type ErrorInfo, type ReactNode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "@tanstack/react-router";
import { getRouter } from "./router";
import "./styles.css";
import { installNativeBack, setBackFallback } from "./lib/back-navigation";

// Signale au RootShell qu'on monte dans #root : ne pas rendre <html>/<body>.
(globalThis as { __MOBILE_SPA__?: boolean }).__MOBILE_SPA__ = true;

const router = getRouter();

// Retour Android par défaut : chaque écran revient à l'étape précédente.
const PARENT: Record<string, string> = {
  "/setup": "/",
  "/gamemaster": "/setup",
  "/composition": "/gamemaster",
  "/distribution": "/composition",
  "/seating": "/distribution",
  "/roles": "/",
  "/game": "/",
};
const currentPath = () => router.state.location.pathname;
setBackFallback(() => {
  const to = PARENT[currentPath()];
  if (to) void router.navigate({ to });
});
void installNativeBack(() => currentPath() === "/" || currentPath() === "");

/**
 * Dernier filet de sécurité natif : si une erreur JS survient au rendu,
 * on affiche un écran de secours cliquable au lieu d'une vue figée.
 */
class RootErrorBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  override state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  override componentDidCatch(error: unknown, info: ErrorInfo) {
    console.error("RootErrorBoundary", error, info);
  }

  override render() {
    if (this.state.failed) {
      return (
        <div
          style={{
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 16,
            background: "#000",
            color: "#fff",
            fontFamily: "sans-serif",
            padding: 24,
            textAlign: "center",
          }}
        >
          <p>Une erreur est survenue.</p>
          <button
            type="button"
            style={{
              pointerEvents: "auto",
              padding: "12px 24px",
              borderRadius: 999,
              border: "1px solid #666",
              background: "transparent",
              color: "#fff",
            }}
            onClick={() => window.location.reload()}
          >
            Recharger
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RootErrorBoundary>
      <RouterProvider router={router} />
    </RootErrorBoundary>
  </StrictMode>,
);
