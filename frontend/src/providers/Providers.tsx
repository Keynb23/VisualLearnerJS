import React, { useMemo } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import { Provider as JotaiProvider } from "jotai";
import { routeTree } from "../routeTree.gen";
import { useThemeStore } from "../store/useThemeStore";

// Register the router instance for type safety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

const queryClient = new QueryClient();

const router = createRouter({
  routeTree,
  context: {
    queryClient,
  },
});

export function Providers() {
  // Initialize theme on mount
  React.useEffect(() => {
    useThemeStore.getState().injectCSSVariables();
  }, []);

  return (
    <JotaiProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </JotaiProvider>
  );
}
