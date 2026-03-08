// tailwindcss is installed in frontend/ — type import lives there, not at root
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // These map to CSS variables injected at runtime by useThemeStore.injectCSSVariables()
        // Values are OKLCH-based and update dynamically when the user changes theme/preset
        primary:    "oklch(var(--primary) / <alpha-value>)",
        secondary:  "oklch(var(--secondary) / <alpha-value>)",
        accent:     "oklch(var(--accent) / <alpha-value>)",
        background: "oklch(var(--background) / <alpha-value>)",
        foreground: "oklch(var(--foreground) / <alpha-value>)",
        card:       "oklch(var(--card) / <alpha-value>)",
        muted:      "oklch(var(--muted) / <alpha-value>)",
        border:     "oklch(var(--border) / <alpha-value>)",
      },
      // Glassmorphism utility — used for frosted-glass panels
      backdropBlur: {
        xs: '2px',
      }
    },
  },
  plugins: [],
}
