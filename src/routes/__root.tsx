import { useCallback, useState, type ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  createRootRouteWithContext,
  HeadContent,
  Outlet,
  Scripts,
  useRouterState,
} from "@tanstack/react-router";
import { SplashScreen } from "@/components/SplashScreen";

import appCss from "../styles.css?url";

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover",
      },
      { name: "theme-color", content: "#000000" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  // Mobile (APK): React is mounted inside #root, so rendering <html>/<body>
  // creates a cyclic fiber tree that freezes the app on any input event.
  if ((globalThis as { __MOBILE_SPA__?: boolean }).__MOBILE_SPA__) {
    return <>{children}</>;
  }
  return (
    <html lang="en" style={{ backgroundColor: "#000000" }}>
      <head>
        <HeadContent />
      </head>
      <body style={{ backgroundColor: "#000000", margin: 0, padding: 0, color: "#ffffff" }}>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const [showSplash, setShowSplash] = useState(true);
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  const completeSplash = useCallback(() => setShowSplash(false), []);
  const shouldMountSplash = pathname === "/" && showSplash;

  return (
    <QueryClientProvider client={queryClient}>
      {shouldMountSplash ? <SplashScreen onComplete={completeSplash} /> : <Outlet />}
    </QueryClientProvider>
  );
}
