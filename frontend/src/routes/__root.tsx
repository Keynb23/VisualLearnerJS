import { createRootRouteWithContext } from "@tanstack/react-router";
import { MainLayout } from "@/components/layout/MainLayout";
import type { QueryClient } from "@tanstack/react-query";

interface MyRouterContext {
  queryClient: QueryClient;
}

// MainLayout renders <Outlet /> internally — no need to pass it as children here
export const Route = createRootRouteWithContext<MyRouterContext>()({
  component: () => <MainLayout />,
});
