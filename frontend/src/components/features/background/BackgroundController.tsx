import { ListBox, ListBoxItem } from "react-aria-components";
import { Wind, Film, Layers, MousePointer2, type LucideIcon } from "lucide-react";
import { useThemeStore, type BackgroundMode } from "../../../store/useThemeStore";

// ─── Mode Config ──────────────────────────────────────────────────────────────

/** Metadata for each background engine mode displayed in the selector */
const MODES: Array<{
  id: BackgroundMode;
  name: string;
  icon: LucideIcon;
  desc: string;
}> = [
  { id: "static",      name: "Static",      icon: Wind,          desc: "Animated gradient blobs" },
  { id: "gifmask",     name: "GIF Mask",    icon: Film,          desc: "Ink mask over cycling images" },
  { id: "depth",       name: "Depth",       icon: Layers,        desc: "3D floating objects" },
  { id: "interactive", name: "Interactive", icon: MousePointer2, desc: "Constellation & gravity" },
];

// ─── Component ────────────────────────────────────────────────────────────────

/**
 * BackgroundController — lets the user select one of the 4 background engine modes.
 * Reads/writes backgroundMode directly from the Zustand theme store.
 * Shows a warning when performance mode is disabled.
 */
export function BackgroundController() {
  // Pull both the current mode value and the setter from global state
  const { backgroundMode, setBackgroundMode, performance } = useThemeStore();

  return (
    <div className="BackgroundController p-6 bg-card border border-border rounded-2xl shadow-lg space-y-4">

      {/* Header */}
      <div className="BackgroundControllerHeader space-y-1">
        <h3 className="BackgroundControllerTitle font-bold text-sm">Background Engine</h3>
        <p className="BackgroundControllerSubtitle text-[10px] text-foreground/50 uppercase tracking-widest">
          Select Visualization Mode
        </p>
      </div>

      {/* Mode selector — React Aria ListBox for keyboard + screen-reader support */}
      <ListBox
        aria-label="Background Mode"
        selectionMode="single"
        selectedKeys={[backgroundMode]}
        onSelectionChange={(keys) => {
          // Cast the selected key to BackgroundMode and update the store
          const mode = Array.from(keys)[0] as BackgroundMode;
          if (mode) setBackgroundMode(mode);
        }}
        className="ModeList space-y-2 outline-none"
      >
        {MODES.map((mode) => (
          <ListBoxItem
            key={mode.id}
            id={mode.id}
            className="ModeItem flex items-center gap-4 p-3 rounded-xl border border-transparent hover:bg-muted group selected:border-primary/50 selected:bg-primary/5 cursor-pointer outline-none transition-all"
          >
            {/* Icon container — highlights when this mode is selected */}
            <div className="ModeIconContainer p-2 rounded-lg bg-muted group-selected:bg-primary/10 transition-colors">
              <mode.icon className="ModeIcon h-4 w-4 text-foreground/60 group-selected:text-primary" />
            </div>

            {/* Text labels */}
            <div className="ModeTextContainer flex-1">
              <div className="ModeName text-sm font-semibold">{mode.name}</div>
              <div className="ModeDesc text-[10px] text-foreground/40">{mode.desc}</div>
            </div>
          </ListBoxItem>
        ))}
      </ListBox>

      {/* Performance warning — shown when animations are globally disabled */}
      {!performance.enabled && (
        <p className="PerformanceWarning text-[10px] text-amber-500 font-medium italic">
          Visualization is currently disabled in Performance Controller.
        </p>
      )}
    </div>
  );
}
