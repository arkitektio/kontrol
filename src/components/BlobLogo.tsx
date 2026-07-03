import type { CSSProperties } from "react"
import { cn } from "@/lib/utils"
import { stringToPaletteColor } from "@/lib/logoUtils"

// djb2 — same hash logoUtils uses, so colors/positions stay consistent per seed.
const hash = (s: string): number => {
  let h = 5381
  for (let i = 0; i < s.length; i++) h = ((h << 5) + h) + s.charCodeAt(i)
  return Math.abs(h)
}

interface BlobLogoProps {
  /** Deterministic seed — the same seed always renders the same orb. */
  seed: string
  /** Optional distinct keys to colour separate blobs (e.g. an app's requirements). */
  keys?: string[]
  className?: string
  style?: CSSProperties
}

/**
 * A lightweight, deterministic "blob" logo: a few blurred, palette-colored
 * globs seeded from a string. Replaces the old three.js procedural logos —
 * pure CSS, no canvas, no per-frame JS, safe to render many times on a page.
 */
export default function BlobLogo({ seed, keys, className, style }: BlobLogoProps) {
  const base = keys && keys.length > 0 ? keys.slice(0, 3) : []
  // Always render three blobs; pad from the seed so a single key still looks rich.
  const sources = [base[0] ?? seed, base[1] ?? `${seed}~a`, base[2] ?? `${seed}~b`]

  return (
    <div
      aria-hidden="true"
      className={cn("relative h-full w-full overflow-hidden rounded-xl", className)}
      style={style}
    >
      {sources.map((key, i) => {
        const h = hash(`${key}#${i}`)
        const top = 5 + (h % 45)
        const left = 5 + (Math.floor(h / 45) % 55)
        const size = 55 + (h % 35)
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              top: `${top}%`,
              left: `${left}%`,
              width: `${size}%`,
              height: `${size}%`,
              background: `radial-gradient(circle at 35% 35%, ${stringToPaletteColor(key)}, transparent 70%)`,
              borderRadius: "50%",
              filter: "blur(14px)",
              opacity: 0.85,
            }}
          />
        )
      })}
    </div>
  )
}
