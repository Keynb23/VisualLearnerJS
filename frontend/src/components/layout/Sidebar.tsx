import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  BookOpen,
  Layers,
  Terminal,
  Info,
} from "lucide-react";

export function Sidebar() {
  const navItems = [
    { label: "Dashboard", icon: LayoutDashboard, to: "/" },
    { label: "Examples", icon: Layers, to: "/examples" },
    { label: "Playground", icon: Terminal, to: "/playground" },
  ];

  return (
    <aside className="Sidebar sticky top-0 h-screen w-64 border-r border-border bg-card/80 backdrop-blur-2xl flex flex-col p-4 shadow-xl z-20">
      <div className="LogoContainer mb-8 flex items-center gap-2 px-2">
        <div className="Logo flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-background font-bold tracking-tighter">
          AG
        </div>
        <span className="AppName text-lg font-bold tracking-tight">
          Antigravity
        </span>
      </div>

      <nav className="NavLinks flex-1 space-y-1">
        {navItems.map((item) => (
          <Link
            key={item.label}
            to={item.to}
            className="NavLink group flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-muted"
            activeProps={{ className: "bg-primary/10 text-primary" }}
          >
            <item.icon className="NavIcon h-4 w-4" />
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>
    </aside>
  );
}
