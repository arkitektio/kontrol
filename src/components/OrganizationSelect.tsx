import { useEffect } from "react"
import type { ListOrganizationFragment } from "@/graphql/fragments/organization.generated"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select"
import { DynamicArkitektLogo } from "@/logos/ArkitektLogo"
import { useActiveOrganization } from "@/hooks/useActiveOrganization"
import { applyBrand, DEFAULT_BRAND_CHROMA, DEFAULT_BRAND_HUE, hueStyle } from "@/lib/brand"

interface OrganizationSelectProps {
  organizations: ListOrganizationFragment[]
  value?: string
  onValueChange: (value: string) => void
  placeholder?: string
}

/** A hue-tinted Arkitekt cube over the org name + its hub slug — the same row the
 * sidebar switcher shows, so a given organization reads identically everywhere. */
function OrgRow({
  org,
  hue,
  chroma,
}: {
  org: ListOrganizationFragment
  hue: number
  chroma: number
}) {
  return (
    <div className="flex min-w-0 flex-1 items-center gap-3">
      <div
        className="text-primary flex size-8 shrink-0 items-center justify-center rounded-md border"
        style={hueStyle(hue, chroma)}
      >
        <DynamicArkitektLogo
          width="100%"
          height="100%"
          strokeColor="currentColor"
          aColor="currentColor"
        />
      </div>
      <div className="grid min-w-0 flex-1 text-left leading-tight">
        <span className="truncate text-sm font-medium">{org.name || org.slug}</span>
        <span className="text-muted-foreground truncate text-xs">{org.slug}</span>
      </div>
    </div>
  )
}

/**
 * Organization picker for the redirect-driven configure flows. Beyond selecting an
 * org it tints the whole page with that org's *membership* brand hue (the member's
 * personal hue → the org default → the neutral brand hue), so the authorization
 * screen already wears the workspace's colours before you commit.
 */
export function OrganizationSelect({
  organizations,
  value,
  onValueChange,
  placeholder = "Select organization",
}: OrganizationSelectProps) {
  const { effectiveHueForOrg, effectiveChromaForOrg } = useActiveOrganization()

  const hueFor = (org: ListOrganizationFragment) =>
    effectiveHueForOrg(org.id) ?? org.brandHue ?? DEFAULT_BRAND_HUE
  const chromaFor = (org: ListOrganizationFragment) =>
    effectiveChromaForOrg(org.id) ?? org.brandChroma ?? DEFAULT_BRAND_CHROMA

  const selectedOrg = value ? organizations.find((o) => o.id === value) ?? null : null
  const activeHue = selectedOrg ? hueFor(selectedOrg) : null
  const activeChroma = selectedOrg ? chromaFor(selectedOrg) : null

  // Paint the page with the chosen org's colour. On these embedded pages a
  // ?brand-hue=/?brand-chroma= param may have set the tint on mount; the
  // selection is a deliberate choice, so it wins from here on.
  useEffect(() => {
    applyBrand({ hue: activeHue, chroma: activeChroma })
  }, [activeHue, activeChroma])

  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger className="h-auto w-full py-2" aria-label="Organization">
        {selectedOrg ? (
          <OrgRow
            org={selectedOrg}
            hue={activeHue ?? DEFAULT_BRAND_HUE}
            chroma={activeChroma ?? DEFAULT_BRAND_CHROMA}
          />
        ) : (
          <span className="text-muted-foreground">{placeholder}</span>
        )}
      </SelectTrigger>
      <SelectContent position="popper" className="w-[var(--radix-select-trigger-width)]">
        {organizations.map((org) => (
          <SelectItem key={org.id} value={org.id} className="py-2">
            <OrgRow org={org} hue={hueFor(org)} chroma={chromaFor(org)} />
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
