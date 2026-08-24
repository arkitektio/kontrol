import type { CSSProperties } from "react"

/**
 * The neutral brand hue (Arkitekt violet) used whenever no organization- or
 * membership-specific brand hue applies. Keep this the single source of truth so
 * the org-switcher preview, the global MembershipHueSync recolor, and the
 * pickers can't drift apart on what "no hue" means.
 */
export const DEFAULT_BRAND_HUE = 267

/**
 * The neutral brand chroma, matching `--brand-chroma-user`'s fallback in
 * index.css. Dark mode damps this further on its own (see the `.dark` block), so
 * everything here works in the light-mode scale.
 */
export const DEFAULT_BRAND_CHROMA = 0.19

/**
 * Chroma is clamped to the sRGB-safe range: oklch above ~0.3 clips on most
 * displays, so a picker that went to the schema's full 0..1 would spend most of
 * its travel producing the same colour.
 */
export const MIN_BRAND_CHROMA = 0
// NOTE: the pre-paint scripts in index.html and main.tsx can't import this (they
// run before the bundle), so they hardcode the same ceiling. Change all three.
export const MAX_BRAND_CHROMA = 0.3

/** localStorage key the pre-paint script and the hue syncs read/write. Exported
 * as the canonical name even though `applyBrand` is now the only writer. */
export const BRAND_HUE_KEY = "arkitekt-brand-hue"

/** localStorage key for the brand chroma, mirroring BRAND_HUE_KEY. */
export const BRAND_CHROMA_KEY = "arkitekt-brand-chroma"

/** Keep a chroma inside the displayable range, whatever the server sent. */
export const clampChroma = (chroma: number) =>
  Math.min(MAX_BRAND_CHROMA, Math.max(MIN_BRAND_CHROMA, chroma))

/**
 * Push the brand values onto <html> and remember them. Writes the *knob*
 * (`--brand-chroma-user`), never `--brand-chroma` itself — see index.css for why.
 * A non-finite value is dropped rather than written: an invalid custom property
 * makes the dependent `calc()` invalid at computed-value time, which would blank
 * the palette instead of falling back.
 */
export function applyBrand({ hue, chroma }: { hue?: number | null; chroma?: number | null }) {
  const root = document.documentElement
  if (hue != null && Number.isFinite(hue)) {
    root.style.setProperty("--brand-hue", String(hue))
    try {
      localStorage.setItem(BRAND_HUE_KEY, String(hue))
    } catch {
      /* localStorage unavailable */
    }
  }
  if (chroma != null && Number.isFinite(chroma)) {
    const c = clampChroma(chroma)
    root.style.setProperty("--brand-chroma-user", String(c))
    try {
      localStorage.setItem(BRAND_CHROMA_KEY, String(c))
    } catch {
      /* localStorage unavailable */
    }
  }
}

/**
 * The chroma currently in force as a *user* value — i.e. what the pickers should
 * open on. Reads `--brand-chroma-user` rather than the derived `--brand-chroma`,
 * which in dark mode is already damped and would ratchet the palette down a
 * notch every time a picker round-trips it.
 */
export function readAppliedChroma(): number {
  const raw = getComputedStyle(document.documentElement).getPropertyValue("--brand-chroma-user")
  const parsed = parseFloat(raw)
  return Number.isFinite(parsed) ? clampChroma(parsed) : DEFAULT_BRAND_CHROMA
}

/** The hue currently in force, for the same reason as readAppliedChroma. */
export function readAppliedHue(): number {
  const raw = getComputedStyle(document.documentElement).getPropertyValue("--brand-hue")
  const parsed = parseFloat(raw)
  return Number.isFinite(parsed) ? parsed : DEFAULT_BRAND_HUE
}

/** A swatch of the brand colour itself, for previews that sit outside the theme. */
export const brandSwatch = (hue: number, chroma: number = DEFAULT_BRAND_CHROMA) =>
  `oklch(0.62 ${clampChroma(chroma)} ${hue})`

/**
 * Inline style that scopes the brand values to a subtree, re-tinting any
 * `DynamicArkitektLogo` cube inside it. Shared so the sidebar switcher and the
 * configure-page org picker paint the exact same swatch for a given org.
 */
export const hueStyle = (
  hue: number | null | undefined,
  chroma?: number | null,
): CSSProperties =>
  ({
    ["--brand-hue"]: String(hue ?? DEFAULT_BRAND_HUE),
    ["--brand-chroma-user"]: String(clampChroma(chroma ?? DEFAULT_BRAND_CHROMA)),
  }) as CSSProperties
