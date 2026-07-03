import type { CSSProperties } from "react"
import type { ManifestFragment } from "@/api/graphql"
import BlobLogo from "./BlobLogo"

interface AutoLogoProps {
  manifest: ManifestFragment
  className?: string
  style?: CSSProperties
  /** Accepted for backwards compatibility; the blob logo is theme-agnostic. */
  theme?: "light" | "dark"
  /** Accepted for backwards compatibility; no longer affects the CSS logo. */
  size?: number
}

/**
 * App logo seeded from its manifest. Each requirement colours a blob, so apps
 * with different dependencies get visually distinct orbs (falls back to the
 * identifier when there are no requirements).
 */
export default function AutoLogo({ manifest, className, style }: AutoLogoProps) {
  const keys =
    manifest.requirements && manifest.requirements.length > 0
      ? manifest.requirements.map((r) => r.key)
      : [manifest.identifier]

  return <BlobLogo seed={manifest.identifier} keys={keys} className={className} style={style} />
}
