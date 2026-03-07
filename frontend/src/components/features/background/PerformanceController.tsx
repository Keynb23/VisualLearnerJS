import React from "react";
import {
  Slider,
  SliderOutput,
  SliderTrack,
  SliderThumb,
  Switch,
  Label,
} from "react-aria-components";
import { Zap, ZapOff } from "lucide-react";
import { useThemeStore } from "../../../store/useThemeStore";

export function PerformanceController() {
  const { performance, setPerformance } = useThemeStore();

  return (
    <div className="PerformanceController p-6 bg-card border border-border rounded-2xl shadow-lg space-y-6">
      <div className="Header flex items-center justify-between">
        <div className="Title flex items-center gap-2 font-bold text-sm">
          {performance.enabled ? (
            <Zap className="h-4 w-4 text-amber-500 fill-amber-500" />
          ) : (
            <ZapOff className="h-4 w-4 text-muted" />
          )}
          <span>Engine Performance</span>
        </div>
        <Switch
          isSelected={performance.enabled}
          onChange={(enabled) => setPerformance({ enabled })}
          className="group flex gap-2 items-center text-xs font-medium"
        >
          <div className="h-5 w-10 flex items-center bg-muted group-selected:bg-primary rounded-full px-0.5 transition-colors duration-200">
            <div className="h-4 w-4 bg-white rounded-full shadow-sm transition-transform duration-200 group-selected:translate-x-5" />
          </div>
        </Switch>
      </div>

      <div
        className={`Controls space-y-4 transition-opacity duration-300 ${performance.enabled ? "opacity-100" : "opacity-30 pointer-events-none"}`}
      >
        <Slider
          value={performance.speed}
          onChange={(speed) => setPerformance({ speed: speed as number })}
          minValue={0.1}
          maxValue={2.0}
          step={0.1}
          className="flex flex-col gap-2"
        >
          <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest text-foreground/50">
            <Label>Animation Speed</Label>
            <SliderOutput />
          </div>
          <SliderTrack className="relative h-1.5 w-full bg-muted rounded-full">
            <SliderThumb className="h-4 w-4 top-1/2 bg-primary border-2 border-card rounded-full shadow-md outline-none focus-visible:ring-2 focus-visible:ring-primary" />
          </SliderTrack>
        </Slider>
        <p className="HelpText text-[10px] text-foreground/40 leading-tight">
          Lower speed or disable animations for better battery life on
          low-performance devices.
        </p>
      </div>
    </div>
  );
}
