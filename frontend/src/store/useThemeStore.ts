import { create } from "zustand";
import { persist } from "zustand/middleware";
import { oklch, formatCss } from "culori";

type ThemeMode = "light" | "dark";

interface ColorState {
  l: number;
  c: number;
  h: number;
}

interface ThemePreset {
  name: string;
  primary: ColorState;
  secondary: ColorState;
  accent: ColorState;
}

interface PerformanceState {
  enabled: boolean;
  speed: number; // 0.1 to 2.0
}

interface ThemeStore {
  mode: ThemeMode;
  primaryColor: ColorState;
  secondaryColor: ColorState;
  accentColor: ColorState;
  performance: PerformanceState;
  currentPreset: string;
  backgroundMode: "svg" | "canvas" | "r3f";
  setMode: (mode: ThemeMode) => void;
  toggleMode: () => void;
  setPrimaryColor: (color: ColorState) => void;
  setSecondaryColor: (color: ColorState) => void;
  setAccentColor: (color: ColorState) => void;
  setPerformance: (performance: Partial<PerformanceState>) => void;
  setPreset: (presetName: string) => void;
  setBackgroundMode: (mode: "svg" | "canvas" | "r3f") => void;
  injectCSSVariables: () => void;
}

export const THEME_PRESETS: ThemePreset[] = [
  {
    name: "Default Blue",
    primary: { l: 0.6, c: 0.15, h: 250 },
    secondary: { l: 0.7, c: 0.1, h: 200 },
    accent: { l: 0.8, c: 0.2, h: 300 },
  },
  {
    name: "Midnight Neon",
    primary: { l: 0.55, c: 0.25, h: 320 },
    secondary: { l: 0.5, c: 0.2, h: 180 },
    accent: { l: 0.85, c: 0.15, h: 60 },
  },
  {
    name: "Nordic Forest",
    primary: { l: 0.45, c: 0.1, h: 150 },
    secondary: { l: 0.6, c: 0.05, h: 120 },
    accent: { l: 0.8, c: 0.1, h: 40 },
  },
  {
    name: "Cyberpunk Gold",
    primary: { l: 0.7, c: 0.18, h: 80 },
    secondary: { l: 0.6, c: 0.2, h: 330 },
    accent: { l: 0.9, c: 0.2, h: 100 },
  },
  {
    name: "Oceanic",
    primary: { l: 0.5, c: 0.15, h: 220 },
    secondary: { l: 0.4, c: 0.1, h: 200 },
    accent: { l: 0.7, c: 0.2, h: 180 },
  },
  {
    name: "Sunset",
    primary: { l: 0.6, c: 0.2, h: 30 },
    secondary: { l: 0.5, c: 0.25, h: 10 },
    accent: { l: 0.8, c: 0.15, h: 60 },
  },
  {
    name: "Slate",
    primary: { l: 0.4, c: 0.02, h: 250 },
    secondary: { l: 0.5, c: 0.02, h: 250 },
    accent: { l: 0.6, c: 0.02, h: 250 },
  },
  {
    name: "Emerald",
    primary: { l: 0.6, c: 0.15, h: 160 },
    secondary: { l: 0.7, c: 0.1, h: 140 },
    accent: { l: 0.85, c: 0.2, h: 180 },
  },
  {
    name: "Amethyst",
    primary: { l: 0.55, c: 0.18, h: 280 },
    secondary: { l: 0.45, c: 0.15, h: 300 },
    accent: { l: 0.75, c: 0.2, h: 260 },
  },
  {
    name: "Crimson",
    primary: { l: 0.5, c: 0.2, h: 0 },
    secondary: { l: 0.4, c: 0.15, h: 340 },
    accent: { l: 0.7, c: 0.2, h: 20 },
  },
  {
    name: "Sahara",
    primary: { l: 0.75, c: 0.12, h: 70 },
    secondary: { l: 0.65, c: 0.1, h: 50 },
    accent: { l: 0.85, c: 0.2, h: 90 },
  },
  {
    name: "Deep Space",
    primary: { l: 0.3, c: 0.08, h: 240 },
    secondary: { l: 0.2, c: 0.1, h: 260 },
    accent: { l: 0.5, c: 0.15, h: 220 },
  },
  {
    name: "Matcha",
    primary: { l: 0.8, c: 0.1, h: 110 },
    secondary: { l: 0.7, c: 0.08, h: 130 },
    accent: { l: 0.9, c: 0.15, h: 90 },
  },
  {
    name: "Rose Quartz",
    primary: { l: 0.85, c: 0.05, h: 0 },
    secondary: { l: 0.8, c: 0.08, h: 340 },
    accent: { l: 0.95, c: 0.1, h: 20 },
  },
  {
    name: "Dracula",
    primary: { l: 0.6, c: 0.15, h: 280 },
    secondary: { l: 0.5, c: 0.1, h: 150 },
    accent: { l: 0.8, c: 0.2, h: 330 },
  },
  {
    name: "Monokai",
    primary: { l: 0.75, c: 0.18, h: 80 },
    secondary: { l: 0.5, c: 0.15, h: 300 },
    accent: { l: 0.65, c: 0.2, h: 180 },
  },
  {
    name: "Solarized",
    primary: { l: 0.55, c: 0.1, h: 60 },
    secondary: { l: 0.45, c: 0.08, h: 190 },
    accent: { l: 0.8, c: 0.2, h: 40 },
  },
  {
    name: "Nord",
    primary: { l: 0.65, c: 0.05, h: 210 },
    secondary: { l: 0.55, c: 0.08, h: 190 },
    accent: { l: 0.8, c: 0.1, h: 230 },
  },
  {
    name: "Aura",
    primary: { l: 0.7, c: 0.15, h: 290 },
    secondary: { l: 0.6, c: 0.2, h: 250 },
    accent: { l: 0.8, c: 0.25, h: 320 },
  },
  {
    name: "Matrix",
    primary: { l: 0.5, c: 0.15, h: 140 },
    secondary: { l: 0.4, c: 0.1, h: 140 },
    accent: { l: 0.7, c: 0.2, h: 140 },
  },
];

const toOklchString = (l: number, c: number, h: number) => {
  return `${(l * 100).toFixed(2)}% ${c.toFixed(3)} ${h.toFixed(2)}`;
};

export const useThemeStore = create<ThemeStore>()(
  persist(
    (set, get) => ({
      mode: "dark",
      primaryColor: THEME_PRESETS[0].primary,
      secondaryColor: THEME_PRESETS[0].secondary,
      accentColor: THEME_PRESETS[0].accent,
      performance: { enabled: true, speed: 1.0 },
      currentPreset: THEME_PRESETS[0].name,
      backgroundMode: "svg",

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
        set({ primaryColor: color, currentPreset: "Custom" });
        get().injectCSSVariables();
      },

      setSecondaryColor: (color) => {
        set({ secondaryColor: color, currentPreset: "Custom" });
        get().injectCSSVariables();
      },

      setAccentColor: (color) => {
        set({ accentColor: color, currentPreset: "Custom" });
        get().injectCSSVariables();
      },

      setPerformance: (performance) => {
        set((state) => ({
          performance: { ...state.performance, ...performance },
        }));
      },

      setPreset: (name) => {
        const preset = THEME_PRESETS.find((p) => p.name === name);
        if (preset) {
          set({
            primaryColor: preset.primary,
            secondaryColor: preset.secondary,
            accentColor: preset.accent,
            currentPreset: name,
          });
          get().injectCSSVariables();
        }
      },

      setBackgroundMode: (mode) => set({ backgroundMode: mode }),

      injectCSSVariables: () => {
        if (typeof window === "undefined") return;

        // Use requestAnimationFrame for smoother updates during dragging
        requestAnimationFrame(() => {
          const { mode, primaryColor, secondaryColor, accentColor } = get();
          const root = document.documentElement;

          // Update class for tailwind dark mode
          if (mode === "dark") {
            root.classList.add("dark");
          } else {
            root.classList.remove("dark");
          }

          // Inject colors
          root.style.setProperty(
            "--primary",
            toOklchString(primaryColor.l, primaryColor.c, primaryColor.h)
          );
          root.style.setProperty(
            "--secondary",
            toOklchString(secondaryColor.l, secondaryColor.c, secondaryColor.h)
          );
          root.style.setProperty(
            "--accent",
            toOklchString(accentColor.l, accentColor.c, accentColor.h)
          );

          // Generate matching grayscales (Harmonious Tinted Grays)
          const { l, c, h } = primaryColor;
          // Use slightly more chroma for grays to keep them "harmonious" but visible
          const grayChroma = Math.min(c * 0.15, 0.015);

          if (mode === "light") {
            root.style.setProperty(
              "--background",
              toOklchString(0.99, grayChroma, h)
            );
            root.style.setProperty(
              "--foreground",
              toOklchString(0.1, grayChroma, h)
            );
            root.style.setProperty("--card", toOklchString(1.0, 0, 0));
            root.style.setProperty(
              "--muted",
              toOklchString(0.96, grayChroma, h)
            );
            root.style.setProperty(
              "--border",
              toOklchString(0.9, grayChroma, h)
            );
          } else {
            // Dark Mode Refinements for Visibility
            root.style.setProperty(
              "--background",
              toOklchString(0.12, grayChroma, h)
            );
            root.style.setProperty(
              "--foreground",
              toOklchString(0.99, grayChroma, h)
            );
            root.style.setProperty(
              "--card",
              toOklchString(0.16, grayChroma, h)
            );
            root.style.setProperty(
              "--muted",
              toOklchString(0.2, grayChroma, h)
            );
            root.style.setProperty(
              "--border",
              toOklchString(0.25, grayChroma, h)
            );
          }
        });
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
