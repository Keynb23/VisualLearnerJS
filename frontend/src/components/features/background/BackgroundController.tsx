import React from "react";
import { ListBox, ListBoxItem, Label } from "react-aria-components";
import { Image, Wind, Zap } from "lucide-react";
import { useThemeStore } from "../../../store/useThemeStore";

export function BackgroundController() {
  const { performance } = useThemeStore();
  const [backgroundMode, setBackgroundMode] = React.useState<
    "svg" | "canvas" | "r3f"
  >("svg");

  const modes = [
    { id: "svg", name: "SVG Path", icon: Wind, desc: "Lightweight & Vector" },
    { id: "canvas", name: "Canvas", icon: Zap, desc: "Performance Particles" },
    { id: "r3f", name: "R3F Gradient", icon: Image, desc: "3D Noise Meshes" },
  ];

  return (
    <div className="BackgroundController p-6 bg-card border border-border rounded-2xl shadow-lg space-y-4">
      <div className="Header space-y-1">
        <h3 className="Title font-bold text-sm">Background Engine</h3>
        <p className="Subtitle text-[10px] text-foreground/50 uppercase tracking-widest">
          Select Visualization Mode
        </p>
      </div>

      <ListBox
        aria-label="Background Mode"
        selectedKeys={[backgroundMode]}
        onSelectionChange={(keys) => {
          const mode = Array.from(keys)[0] as "svg" | "canvas" | "r3f";
          setBackgroundMode(mode);
        }}
        className="ModeList space-y-2 outline-none"
      >
        {modes.map((mode) => (
          <ListBoxItem
            key={mode.id}
            id={mode.id}
            className="ModeItem flex items-center gap-4 p-3 rounded-xl border border-transparent hover:bg-muted group selected:border-primary/50 selected:bg-primary/5 cursor-pointer outline-none transition-all"
          >
            <div className="IconContainer p-2 rounded-lg bg-muted group-selected:bg-primary/10 transition-colors">
              <mode.icon className="h-4 w-4 text-foreground/60 group-selected:text-primary" />
            </div>
            <div className="TextContainer flex-1">
              <div className="ModeName text-sm font-semibold">{mode.name}</div>
              <div className="ModeDesc text-[10px] text-foreground/40">
                {mode.desc}
              </div>
            </div>
          </ListBoxItem>
        ))}
      </ListBox>

      {!performance.enabled && (
        <p className="Warning text-[10px] text-amber-500 font-medium italic">
          Visualization is currently disabled in Performance Controller.
        </p>
      )}
    </div>
  );
}
