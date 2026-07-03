import type { CSSProperties } from "react"
import type { PolyType } from "@/lib/logoUtils"
import BlobLogo from "./BlobLogo"

interface GeneralLogoProps {
  color?: string
  /** Accepted for backwards compatibility; the blob logo has no polygon type. */
  polyType?: PolyType
  seed?: string
  className?: string
  style?: CSSProperties
  /** Accepted for backwards compatibility; the blob logo is theme-agnostic. */
  theme?: "light" | "dark"
  /** Accepted for backwards compatibility; no longer affects the CSS logo. */
  size?: number
}

/** Single-seed blob logo (services, generic entities). */
export default function GeneralLogo({ color, seed, className, style }: GeneralLogoProps) {
  return <BlobLogo seed={seed || color || "arkitekt"} className={className} style={style} />
}
