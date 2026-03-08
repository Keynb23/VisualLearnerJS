import { Outlet, Link } from "@tanstack/react-router";
import { Sidebar } from "@/components/layout/Sidebar";
import { ModeToggle } from "../ui/ModeToggle";
import { useThemeStore } from "../../store/useThemeStore";
import { SVGBackground } from "../features/background/SVGBackground";
import { DefaultBG } from "../features/background/defaultBG";
import { CanvasBackground } from "../features/background/CanvasBackground";
import { R3FBackground } from "../features/background/R3FBackground";

function ActiveBackground() {
  const { backgroundMode } = useThemeStore();
  switch (backgroundMode) {
    case "canvas":
      return <CanvasBackground />;
    case "r3f":
      return <R3FBackground />;
    default:
      return <DefaultBG />;
  }
}

interface MainLayoutProps {
  children: React.ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="AppShell flex min-h-screen w-full bg-background transition-colors duration-500 overflow-x-hidden">
      <ActiveBackground />
      <Sidebar />
      <main className="MainContent flex-1 relative">
        <header className="TopHeader flex justify-end p-4 sticky top-0 z-10 backdrop-blur-md border-b border-border/10">
          <ModeToggle />
        </header>
        <div className="ContentWrapper max-w-6xl mx-auto">{children}</div>
      </main>
    </div>
  );
}
