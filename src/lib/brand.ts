import type { CSSProperties } from "react"

/**
 * The neutral brand hue (Arkitekt violet) used whenever no organization- or
 * membership-specific brand hue applies. Keep this the single source of truth so
 * the org-switcher preview, the global MembershipHueSync recolor, and the
 * pickers can't drift apart on what "no hue" means.
 */
export const DEFAULT_BRAND_HUE = 267

/** localStorage key the pre-paint script and the hue syncs read/write. */
export const BRAND_HUE_KEY = "arkitekt-brand-hue"

/**
 * Inline style that scopes `--brand-hue` to a subtree, re-tinting any
 * `DynamicArkitektLogo` cube inside it. Shared so the sidebar switcher and the
 * configure-page org picker paint the exact same swatch for a given org.
 */
export const hueStyle = (hue: number | null | undefined): CSSProperties =>
  ({ ["--brand-hue"]: String(hue ?? DEFAULT_BRAND_HUE) } as CSSProperties)
