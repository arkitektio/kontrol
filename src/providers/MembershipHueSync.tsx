import { useEffect } from "react"
import { useSearchParams } from "react-router-dom"
import { useActiveOrganization } from "@/hooks/useActiveOrganization"
import { DEFAULT_BRAND_HUE } from "@/lib/brand"

const HUE_KEY = "arkitekt-brand-hue"

/**
 * Applies the brand hue for whichever organization is active. Precedence: the
 * member's own membership brand hue (their personal override, saved via
 * setMembershipBrandHue) → the organization's default brand hue → nothing. This
 * tints the whole UI accordingly and persists it as the brand hue so it survives
 * reloads.
 *
 * A `brand-hue` URL query param still wins — that's an explicit override (used by
 * the embedded /configure pages), so we skip when one is present and let
 * ThemeQueryParamSync handle it.
 */
export function MembershipHueSync() {
  const [searchParams] = useSearchParams()
  const { activeOrgId, effectiveHueForOrg } = useActiveOrganization()

  const hasHueParam = searchParams.has("brand-hue")
  // Drive the global hue only when there's an active org to key off of. With an
  // active org we fall back to the default so swapping to an org that has no hue
  // of its own still repaints the page (matching the switcher's logo preview)
  // rather than stranding the previous org's colour.
  const hue = activeOrgId ? effectiveHueForOrg(activeOrgId) ?? DEFAULT_BRAND_HUE : null

  useEffect(() => {
    if (hasHueParam) return
    if (hue == null) return
    document.documentElement.style.setProperty("--brand-hue", String(hue))
    try {
      localStorage.setItem(HUE_KEY, String(hue))
    } catch {
      /* localStorage unavailable */
    }
  }, [hue, hasHueParam])

  return null
}
