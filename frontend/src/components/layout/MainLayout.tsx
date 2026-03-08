import { Outlet } from "@tanstack/react-router";
import { Sidebar } from "@/components/layout/Sidebar";
import { ModeToggle } from "../ui/ModeToggle";
import { useThemeStore } from "../../store/useThemeStore";
import { SVGBackground } from "../features/background/SVGBackground";
import { GifMaskBackground } from "../features/background/defaultBG";
import { CanvasBackground } from "../features/background/CanvasBackground";
import { R3FBackground } from "../features/background/R3FBackground";

// ─── Active Background ────────────────────────────────────────────────────────

/**
 * ActiveBackground — renders the correct background component based on the
 * backgroundMode stored in the Zustand theme store.
 *
 * Modes:
 *  "static"      → SVGBackground       (animated gradient blobs, lightest)
 *  "gifmask"     → GifMaskBackground   (inkMask.gif over cycling images)
 *  "depth"       → R3FBackground       (3D spheres at different depths)
 *  "interactive" → CanvasBackground    (constellation + mouse gravity)
 */
function ActiveBackground() {
  const { backgroundMode } = useThemeStore();

  switch (backgroundMode) {
    case "static":      return <SVGBackground />;
    case "gifmask":     return <GifMaskBackground />;
    case "depth":       return <R3FBackground />;
    case "interactive": return <CanvasBackground />;
    default:            return <SVGBackground />;
  }
}

// ─── Layout ───────────────────────────────────────────────────────────────────

/**
 * MainLayout — the master shell that wraps every page.
 * Renders the active background, sidebar, sticky header, and page content.
 */
export function MainLayout() {
  return (
    <div className="AppShell flex min-h-screen w-full bg-background transition-colors duration-500 overflow-x-hidden">

      {/* Background layer — fixed, behind all content */}
      <ActiveBackground />

      {/* Left navigation sidebar */}
      <Sidebar />

      {/* Main content area */}
      <main className="MainContent flex-1 relative">

        {/* Sticky top bar with mode toggle */}
        <header className="TopHeader flex justify-end p-4 sticky top-0 z-10 backdrop-blur-md border-b border-border/10">
          <ModeToggle />
        </header>

        {/* Page content — centered with max width */}
        <div className="ContentWrapper max-w-6xl mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
