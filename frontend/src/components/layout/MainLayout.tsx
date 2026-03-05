import { Outlet, Link } from "@tanstack/react-router";
import { Sidebar } from "@/components/layout/Sidebar";
import { ModeToggle } from "../ui/ModeToggle";

interface MainLayoutProps {
  children: React.ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="AppShell flex min-h-screen w-full bg-background transition-colors duration-500">
      <Sidebar />
      <main className="MainContent flex-1 relative">
        <header className="TopHeader flex justify-end p-4 sticky top-0 z-10 backdrop-blur-sm">
          <ModeToggle />
        </header>
        <div className="ContentWrapper max-w-6xl mx-auto">{children}</div>
      </main>
    </div>
  );
}
