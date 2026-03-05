import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";
import { MainLayout } from "@/components/layout/MainLayout";
import type { QueryClient } from "@tanstack/react-query";

interface MyRouterContext {
  queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  component: () => (
    <MainLayout>
      <Outlet />
    </MainLayout>
  ),
});
