import { QueryClient } from "@tanstack/react-query";
import { createRouter, createHashHistory } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";

export const getRouter = () => {
  const queryClient = new QueryClient();

  const router = createRouter({
    routeTree,
    context: { queryClient },
    scrollRestoration: true,
    defaultPreloadStaleTime: 0,
    // Hash routing (comme dans l'app d'origine / build Capacitor) : uniquement
    // côté navigateur, l'historique hash n'existe pas côté serveur.
    ...(typeof window !== "undefined" ? { history: createHashHistory() } : {}),
  });

  return router;
};
