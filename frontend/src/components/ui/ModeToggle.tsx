import { useRef } from "react";
import { Sun, Moon } from "lucide-react";
import {
  Button,
  Tooltip,
  TooltipTrigger,
  OverlayArrow,
} from "react-aria-components";
import { useThemeStore } from "../../store/useThemeStore";
import { motion, AnimatePresence } from "framer-motion";

export function ModeToggle() {
  const { mode, toggleMode } = useThemeStore();

  return (
    <TooltipTrigger>
      <Button
        onPress={toggleMode}
        aria-label={`Switch to ${mode === "light" ? "dark" : "light"} mode`}
        className="ModeToggleButton p-2 rounded-full border border-border bg-card/50 backdrop-blur-md hover:bg-muted transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
      >
        <AnimatePresence mode="wait">
          {mode === "light" ? (
            <motion.div
              key="sun"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Sun className="Icon h-5 w-5 text-amber-500" />
            </motion.div>
          ) : (
            <motion.div
              key="moon"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Moon className="Icon h-5 w-5 text-blue-400" />
            </motion.div>
          )}
        </AnimatePresence>
      </Button>
      <Tooltip
        placement="bottom end"
        offset={8}
        className="Tooltip bg-card border border-border p-3 rounded-lg shadow-xl max-w-xs text-xs z-50 animate-in fade-in zoom-in-95 duration-200"
      >
        <OverlayArrow>
          <svg
            width={8}
            height={8}
            viewBox="0 0 8 8"
            className="TooltipArrow fill-card stroke-border"
          >
            <path d="M0 0 L4 4 L8 0" />
          </svg>
        </OverlayArrow>
        <div className="EducationalLogic space-y-2">
          <p className="LogicTitle font-bold text-primary">
            JavaScript Engine State:
          </p>
          <p className="LogicDescription leading-tight">
            `zustand` triggers a state mutation. `injectCSSVariables` then
            updates `:root` styles via `setProperty`. This re-calculates OKLCH
            values in real-time, causing a CSS repaint.
          </p>
        </div>
      </Tooltip>
    </TooltipTrigger>
  );
}
