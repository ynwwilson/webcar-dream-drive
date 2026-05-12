import { QueryClient } from "@tanstack/react-query";
import { createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";

export const getRouter = () => {
  const queryClient = new QueryClient();

  const router = createRouter({
    routeTree,
    context: { queryClient },
    scrollRestoration: true,
    defaultPreloadStaleTime: 0,
    defaultPreload: "intent",
    // Pré-carrega no hover instantaneamente (padrão é 50ms)
    defaultPreloadDelay: 0,
    // Usa a View Transitions API nativa do browser pra trocar de rota
    // (fade suave em GPU, sem custo de JS)
    defaultViewTransition: true,
    // Só mostra estado "pending" se a rota demorar mais de 300ms,
    // evitando flash de loading em navegações rápidas
    defaultPendingMs: 300,
    defaultPendingMinMs: 0,
  });

  return router;
};
