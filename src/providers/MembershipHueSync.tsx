import { useEffect } from "react"
import { useSearchParams } from "react-router-dom"
import { useActiveOrganization } from "@/hooks/useActiveOrganization"
import { applyBrand, DEFAULT_BRAND_CHROMA, DEFAULT_BRAND_HUE } from "@/lib/brand"

/**
 * Applies the brand hue and chroma for whichever organization is active.
 * Precedence for each value independently: the member's own membership value
 * (their personal override, saved via setMembershipBrandHue) → the
 * organization's default → nothing. This tints the whole UI accordingly and
 * persists it so it survives reloads.
 *
 * A `brand-hue`/`brand-chroma` URL query param still wins — that's an explicit
 * override (used by the embedded /configure pages), so we skip the value it
 * names and let ThemeQueryParamSync handle it. The two are gated separately, so
 * a host that pins only the hue doesn't also freeze the chroma.
 */
export function MembershipHueSync() {
  const [searchParams] = useSearchParams()
  const { activeOrgId, effectiveHueForOrg, effectiveChromaForOrg } = useActiveOrganization()

  const hasHueParam = searchParams.has("brand-hue")
  const hasChromaParam = searchParams.has("brand-chroma")
  // Drive the global tint only when there's an active org to key off of. With an
  // active org we fall back to the defaults so swapping to an org that has no
  // colour of its own still repaints the page (matching the switcher's logo
  // preview) rather than stranding the previous org's colour.
  const hue = activeOrgId ? effectiveHueForOrg(activeOrgId) ?? DEFAULT_BRAND_HUE : null
  const chroma = activeOrgId
    ? effectiveChromaForOrg(activeOrgId) ?? DEFAULT_BRAND_CHROMA
    : null

  useEffect(() => {
    applyBrand({
      hue: hasHueParam ? null : hue,
      chroma: hasChromaParam ? null : chroma,
    })
  }, [hue, chroma, hasHueParam, hasChromaParam])

  return null
}
