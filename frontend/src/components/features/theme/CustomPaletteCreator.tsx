import React from "react";
import {
  Slider,
  SliderOutput,
  SliderTrack,
  SliderThumb,
  Label,
  Button,
} from "react-aria-components";
import { Palette, RotateCcw } from "lucide-react";
import { useThemeStore, THEME_PRESETS } from "../../../store/useThemeStore";

export function CustomPaletteCreator() {
  const {
    primaryColor,
    setPrimaryColor,
    secondaryColor,
    setSecondaryColor,
    accentColor,
    setAccentColor,
    currentPreset,
    setPreset,
  } = useThemeStore();

  const ColorSlider = ({
    label,
    value,
    onChange,
    hueOnly = false,
  }: {
    label: string;
    value: any;
    onChange: (v: any) => void;
    hueOnly?: boolean;
  }) => (
    <div className="ColorGroup space-y-3 p-4 bg-muted/20 rounded-2xl border border-border/50">
      <div className="Header flex justify-between text-[10px] font-bold uppercase tracking-widest text-primary">
        <Label>{label}</Label>
        <span className="Value">H: {Math.round(value.h)}°</span>
      </div>
      <Slider
        value={value.h}
        onChange={(h) => onChange({ ...value, h: h as number })}
        minValue={0}
        maxValue={360}
        className="flex flex-col gap-2"
      >
        <SliderTrack className="relative h-2 w-full rounded-full bg-linear-to-r from-red-500 via-green-500 to-red-500">
          <SliderThumb className="h-4 w-4 top-1/2 bg-white border-2 border-primary rounded-full shadow-md outline-none focus-visible:ring-2 focus-visible:ring-primary" />
        </SliderTrack>
      </Slider>

      {!hueOnly && (
        <div className="OtherChannels grid grid-cols-2 gap-4">
          <Slider
            value={value.l}
            onChange={(l) => onChange({ ...value, l: l as number })}
            minValue={0}
            maxValue={1}
            step={0.01}
          >
            <div className="flex justify-between text-[8px] uppercase font-bold opacity-50">
              <Label>Lightness</Label>
              <SliderOutput />
            </div>
            <SliderTrack className="relative h-1 w-full bg-muted rounded-full">
              <SliderThumb className="h-3 w-3 top-1/2 bg-white border border-border rounded-full outline-none" />
            </SliderTrack>
          </Slider>
          <Slider
            value={value.c}
            onChange={(c) => onChange({ ...value, c: c as number })}
            minValue={0}
            maxValue={0.4}
            step={0.01}
          >
            <div className="flex justify-between text-[8px] uppercase font-bold opacity-50">
              <Label>Chroma</Label>
              <SliderOutput />
            </div>
            <SliderTrack className="relative h-1 w-full bg-muted rounded-full">
              <SliderThumb className="h-3 w-3 top-1/2 bg-white border border-border rounded-full outline-none" />
            </SliderTrack>
          </Slider>
        </div>
      )}
    </div>
  );

  return (
    <div className="CustomPaletteCreator p-8 bg-card border border-border rounded-[2.5rem] shadow-2xl space-y-8">
      <div className="Header flex items-center justify-between">
        <div className="TitleGroup">
          <h2 className="Title flex items-center gap-3 text-xl font-bold tracking-tight">
            <Palette className="h-6 w-6 text-primary" />
            Theme Engine
          </h2>
          <p className="Subtitle text-xs text-foreground/40 mt-1">
            OKLCH Curated Presets & Custom Palette
          </p>
        </div>
        <div className="PresetStatus text-[10px] font-bold uppercase tracking-widest px-3 py-1 bg-primary/10 text-primary rounded-full">
          {currentPreset}
        </div>
      </div>

      <div className="PresetsGrid grid grid-cols-4 sm:grid-cols-5 gap-3">
        {THEME_PRESETS.slice(0, 10).map((p) => (
          <Button
            key={p.name}
            onPress={() => setPreset(p.name)}
            aria-label={`Select ${p.name} preset`}
            className={`PresetItem h-10 rounded-xl border-2 transition-all hover:scale-105 ${
              currentPreset === p.name
                ? "border-primary scale-110 shadow-lg shadow-primary/20"
                : "border-border hover:border-primary/30"
            }`}
            style={{
              backgroundColor: `oklch(${p.primary.l} ${p.primary.c} ${p.primary.h})`,
            }}
          />
        ))}
        <Button
          onPress={() => setPreset("Default Blue")}
          className="ResetBtn h-10 rounded-xl border-2 border-dashed border-border flex items-center justify-center hover:border-primary/50 group transition-colors"
        >
          <RotateCcw className="h-4 w-4 text-foreground/30 group-hover:text-primary transition-colors" />
        </Button>
      </div>

      <div className="CustomSliders space-y-4">
        <ColorSlider
          label="Primary Color (Base)"
          value={primaryColor}
          onChange={setPrimaryColor}
        />
        <ColorSlider
          label="Secondary Color"
          value={secondaryColor}
          onChange={setSecondaryColor}
        />
        <ColorSlider
          label="Accent Color"
          value={accentColor}
          onChange={setAccentColor}
        />
      </div>

      <div className="GrayscaleHarmonizer p-4 bg-primary/3 border border-primary/10 rounded-2xl">
        <h4 className="HarmonizerTitle text-[10px] font-bold uppercase tracking-widest text-primary/60 mb-3">
          Auto-Harmonized Grayscale
        </h4>
        <div className="GraySwatches flex gap-2">
          {[0.98, 0.9, 0.7, 0.5, 0.3, 0.1].map((l) => (
            <div
              key={l}
              className="Swatch flex-1 h-8 rounded-lg shadow-xs"
              style={{
                backgroundColor: `oklch(${l} ${Math.min(primaryColor.c * 0.1, 0.01)} ${primaryColor.h})`,
              }}
            />
          ))}
        </div>
        <p className="MetaInfo text-[9px] text-foreground/30 mt-3 italic text-center">
          Grayscale hues are automatically shifted to match the Primary color's
          Hue for visual harmony.
        </p>
      </div>
    </div>
  );
}
