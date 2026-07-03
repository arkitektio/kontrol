import { useEffect, useState } from "react"
import { Palette, Shuffle } from "lucide-react"
import { cn } from "@/lib/utils"

const STORAGE_KEY = "arkitekt-brand-hue"

/** A few curated hues users can pick from with one click. */
const PRESETS = [267, 222, 200, 160, 130, 90, 40, 12, 330, 300]

function swatch(hue: number) {
  return `oklch(0.62 0.19 ${hue})`
}

/** Apply the hue to the whole UI and remember it for next time. */
function applyHue(hue: number) {
  document.documentElement.style.setProperty("--brand-hue", String(hue))
  try {
    localStorage.setItem(STORAGE_KEY, String(hue))
  } catch {
    /* ignore */
  }
}

/**
 * Picks the brand hue that tints the whole UI (see `--brand-hue` in index.css).
 * The early inline script in index.html applies the stored (or first-visit
 * random) hue before paint; this popover lets the visitor change it. Every
 * change is saved to localStorage immediately and restored on the next load.
 * Sits in the topbar (DetailLayout header).
 */
export function BrandColorPicker() {
  const [hue, setHue] = useState(267)

  // Sync from whatever the early script already applied.
  useEffect(() => {
    const current = getComputedStyle(document.documentElement).getPropertyValue("--brand-hue")
    const parsed = parseFloat(current)
    if (!Number.isNaN(parsed)) setHue(Math.round(parsed))
  }, [])

  function preview(next: number) {
    setHue(next)
    applyHue(next)
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
          style={{ background: swatch(hue) }}
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
            background:
              "linear-gradient(to right, oklch(0.62 0.19 0), oklch(0.62 0.19 60), oklch(0.62 0.19 120), oklch(0.62 0.19 180), oklch(0.62 0.19 240), oklch(0.62 0.19 300), oklch(0.62 0.19 360))",
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
              style={{ background: swatch(preset) }}
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
