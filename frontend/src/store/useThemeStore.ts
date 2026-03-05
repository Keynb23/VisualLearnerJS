import { create } from "zustand";
import { persist } from "zustand/middleware";
import { oklch, formatCss } from "culori";

type ThemeMode = "light" | "dark";

interface ColorState {
  l: number;
  c: number;
  h: number;
}

interface ThemeStore {
  mode: ThemeMode;
  primaryColor: ColorState;
  setMode: (mode: ThemeMode) => void;
  toggleMode: () => void;
  setPrimaryColor: (color: ColorState) => void;
  injectCSSVariables: () => void;
}

const toOklchString = (l: number, c: number, h: number) => {
  return `${(l * 100).toFixed(2)}% ${c.toFixed(3)} ${h.toFixed(2)}`;
};

export const useThemeStore = create<ThemeStore>()(
  persist(
    (set, get) => ({
      mode: "dark",
      primaryColor: { l: 0.6, c: 0.15, h: 250 }, // Default Blueish

      setMode: (mode) => {
        set({ mode });
        get().injectCSSVariables();
      },

      toggleMode: () => {
        const newMode = get().mode === "light" ? "dark" : "light";
        set({ mode: newMode });
        get().injectCSSVariables();
      },

      setPrimaryColor: (color) => {
        set({ primaryColor: color });
        get().injectCSSVariables();
      },

      injectCSSVariables: () => {
        if (typeof window === "undefined") return;

        const { mode, primaryColor } = get();
        const root = document.documentElement;

        // Update class for tailwind dark mode
        if (mode === "dark") {
          root.classList.add("dark");
        } else {
          root.classList.remove("dark");
        }

        const { l, c, h } = primaryColor;

        // Inject primary
        root.style.setProperty("--primary", toOklchString(l, c, h));

        // Generate matching grayscales (Harmonious Tinted Grays)
        // We use a very low chroma version of the primary hue for harmony
        const grayChroma = Math.min(c * 0.1, 0.01);

        if (mode === "light") {
          root.style.setProperty(
            "--background",
            toOklchString(0.98, grayChroma, h)
          );
          root.style.setProperty(
            "--foreground",
            toOklchString(0.1, grayChroma, h)
          );
          root.style.setProperty("--card", toOklchString(1.0, 0, 0));
          root.style.setProperty("--muted", toOklchString(0.95, grayChroma, h));
          root.style.setProperty("--border", toOklchString(0.9, grayChroma, h));
        } else {
          root.style.setProperty(
            "--background",
            toOklchString(0.1, grayChroma, h)
          );
          root.style.setProperty(
            "--foreground",
            toOklchString(0.98, grayChroma, h)
          );
          root.style.setProperty("--card", toOklchString(0.12, grayChroma, h));
          root.style.setProperty("--muted", toOklchString(0.15, grayChroma, h));
          root.style.setProperty("--border", toOklchString(0.2, grayChroma, h));
        }
      },
    }),
    {
      name: "theme-storage",
      onRehydrateStorage: () => (state) => {
        state?.injectCSSVariables();
      },
    }
  )
);
