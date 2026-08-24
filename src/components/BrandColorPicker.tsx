import { useEffect, useState } from "react"
import { Palette, Shuffle } from "lucide-react"
import { cn } from "@/lib/utils"
import {
  applyBrand,
  brandSwatch,
  DEFAULT_BRAND_CHROMA,
  DEFAULT_BRAND_HUE,
  MAX_BRAND_CHROMA,
  readAppliedChroma,
  readAppliedHue,
} from "@/lib/brand"

/** A few curated hues users can pick from with one click. */
const PRESETS = [267, 222, 200, 160, 130, 90, 40, 12, 330, 300]

/**
 * Picks the brand hue and intensity that tint the whole UI (see `--brand-hue`
 * and `--brand-chroma-user` in index.css). The early inline script in index.html
 * applies the stored (or first-visit random) hue before paint; this popover lets
 * the visitor change it. Every change is saved to localStorage immediately and
 * restored on the next load. Sits in the topbar (DetailLayout header).
 */
export function BrandColorPicker() {
  const [hue, setHue] = useState(DEFAULT_BRAND_HUE)
  const [chroma, setChroma] = useState(DEFAULT_BRAND_CHROMA)

  // Sync from whatever the early script already applied. Reads the *-user knob
  // for chroma, not the derived `--brand-chroma`: in dark mode the latter is
  // already damped, so round-tripping it would ratchet the palette down.
  useEffect(() => {
    setHue(Math.round(readAppliedHue()))
    setChroma(readAppliedChroma())
  }, [])

  function preview(nextHue: number, nextChroma: number = chroma) {
    setHue(nextHue)
    setChroma(nextChroma)
    applyBrand({ hue: nextHue, chroma: nextChroma })
  }

  function shuffle() {
    preview(Math.floor(Math.random() * 360))
  }

  return (
    <details className="group relative [&_summary::-webkit-details-marker]:hidden">
      <summary
        aria-label="Brand color"
        className="flex size-9 cursor-pointer list-none items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
      >
        <span
          className="size-4 rounded-full ring-1 ring-inset ring-black/10"
          style={{ background: brandSwatch(hue, chroma) }}
        />
      </summary>

      <div className="absolute right-0 z-50 mt-2 w-64 rounded-xl border border-border bg-popover p-4 text-popover-foreground shadow-xl">
        <div className="flex items-center gap-2 text-sm font-medium">
          <Palette className="size-4 text-primary" />
          Brand color
        </div>
        <p className="mt-1 text-xs text-muted-foreground">
          Tints the whole app. Your pick is saved and restored next time.
        </p>

        <input
          type="range"
          min={0}
          max={359}
          value={hue}
          onChange={(e) => preview(Number(e.target.value))}
          aria-label="Hue"
          className="mt-3 h-2 w-full cursor-pointer appearance-none rounded-full"
          style={{
            // Built from the live chroma so the track shows the colours this
            // picker would actually produce, rather than a fixed-intensity ramp.
            background: `linear-gradient(to right, ${[0, 60, 120, 180, 240, 300, 360]
              .map((h) => brandSwatch(h, chroma))
              .join(", ")})`,
          }}
        />

        <input
          type="range"
          min={0}
          max={MAX_BRAND_CHROMA}
          step={0.005}
          value={chroma}
          onChange={(e) => preview(hue, Number(e.target.value))}
          aria-label="Intensity"
          className="mt-3 h-2 w-full cursor-pointer appearance-none rounded-full"
          style={{
            background: `linear-gradient(to right, ${brandSwatch(hue, 0)}, ${brandSwatch(
              hue,
              MAX_BRAND_CHROMA,
            )})`,
          }}
        />

        <div className="mt-3 flex flex-wrap gap-1.5">
          {PRESETS.map((preset) => (
            <button
              key={preset}
              type="button"
              onClick={() => preview(preset)}
              aria-label={`Hue ${preset}`}
              className={cn(
                "size-6 rounded-full ring-1 ring-inset ring-black/10 transition-transform hover:scale-110",
                Math.abs(hue - preset) < 6 && "ring-2 ring-foreground",
              )}
              style={{ background: brandSwatch(preset, chroma) }}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={shuffle}
          className="mt-4 inline-flex w-full items-center justify-center gap-1.5 rounded-md border border-border px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
        >
          <Shuffle className="size-3.5" />
          Random
        </button>
      </div>
    </details>
  )
}

export default BrandColorPicker
