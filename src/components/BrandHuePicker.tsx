import { useEffect, useState } from "react"
import { useMeQuery } from "@/graphql/queries/me.generated"
import { useSetMembershipBrandHueMutation } from "@/graphql/mutations/membership.generated"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "./ui/card"
import { Button } from "./ui/button"
import { Slider } from "./ui/slider"
import { Palette } from "lucide-react"
import { toast } from "sonner"
import {
  applyBrand,
  brandSwatch,
  clampChroma,
  DEFAULT_BRAND_CHROMA,
  DEFAULT_BRAND_HUE,
  MAX_BRAND_CHROMA,
} from "@/lib/brand"

const HUE_GRADIENT =
  "linear-gradient(to right, hsl(0 70% 50%), hsl(60 70% 50%), hsl(120 70% 50%), hsl(180 70% 50%), hsl(240 70% 50%), hsl(300 70% 50%), hsl(360 70% 50%))"

/** Grey → full-strength ramp at the hue in play, so the track previews itself. */
const chromaGradient = (hue: number) =>
  `linear-gradient(to right, ${brandSwatch(hue, 0)}, ${brandSwatch(hue, MAX_BRAND_CHROMA / 2)}, ${brandSwatch(hue, MAX_BRAND_CHROMA)})`

/**
 * Lets the current member pick a personal brand hue and chroma for one
 * organization. The choice is saved on the server (per-membership) and tints the
 * whole UI while this organization is active — see MembershipHueSync. Dragging
 * either slider previews live.
 */
export function BrandHuePicker({ organizationId }: { organizationId: string }) {
  const { data } = useMeQuery()
  const membership = data?.me?.memberships?.find((m) => m.organization?.id === organizationId)
  const savedHue = membership?.brandHue ?? null
  const savedChroma = membership?.brandChroma ?? null
  // Falls back to the organization's defaults when the member hasn't set one.
  const orgHue = membership?.organization?.brandHue ?? null
  const orgChroma = membership?.organization?.brandChroma ?? null
  const fallbackHue = orgHue ?? DEFAULT_BRAND_HUE
  const fallbackChroma = clampChroma(orgChroma ?? DEFAULT_BRAND_CHROMA)

  const [hue, setHue] = useState<number>(savedHue ?? fallbackHue)
  const [chroma, setChroma] = useState<number>(clampChroma(savedChroma ?? fallbackChroma))

  // Adopt the saved values once they load (or change elsewhere).
  useEffect(() => {
    if (savedHue != null) setHue(savedHue)
  }, [savedHue])
  useEffect(() => {
    if (savedChroma != null) setChroma(clampChroma(savedChroma))
  }, [savedChroma])

  const [save, { loading }] = useSetMembershipBrandHueMutation({ refetchQueries: ["Me"] })

  const previewHue = (h: number) => {
    setHue(h)
    applyBrand({ hue: h })
  }

  const previewChroma = (c: number) => {
    setChroma(c)
    applyBrand({ chroma: c })
  }

  // Both values go on every write: the mutation treats an omitted field as
  // "leave alone", so a partial payload would strand the other half.
  const handleSave = async () => {
    try {
      await save({
        variables: { input: { organization: organizationId, brandHue: hue, brandChroma: chroma } },
      })
      toast.success("Your colour for this organization was saved")
    } catch (e: any) {
      toast.error("Failed to save colour: " + e.message)
    }
  }

  const handleReset = async () => {
    try {
      await save({
        variables: {
          input: { organization: organizationId, brandHue: null, brandChroma: null },
        },
      })
      applyBrand({ hue: fallbackHue, chroma: fallbackChroma })
      setHue(fallbackHue)
      setChroma(fallbackChroma)
      toast.success(
        orgHue != null || orgChroma != null
          ? "Reset to the organization default"
          : "Reset to the default colour",
      )
    } catch (e: any) {
      toast.error("Failed to reset colour: " + e.message)
    }
  }

  // Only members can colour their own view of an organization.
  if (!membership) return null

  return (
    <Card>
      <CardHeader className="flex flex-row items-center gap-3 space-y-0">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
          <Palette className="h-5 w-5" />
        </div>
        <div className="space-y-1">
          <CardTitle className="text-lg">Your colour</CardTitle>
          <CardDescription>
            Pick a brand hue and intensity for this organization. Only you see it.
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="space-y-5">
        <div className="flex items-center gap-4">
          <div
            className="h-10 w-10 shrink-0 rounded-full border"
            style={{ backgroundColor: brandSwatch(hue, chroma) }}
            aria-hidden
          />
          <div className="flex-1 space-y-4">
            <div className="space-y-2">
              <div
                className="h-3 w-full rounded-full"
                style={{ background: HUE_GRADIENT }}
                aria-hidden
              />
              <Slider
                min={0}
                max={360}
                step={1}
                value={[hue]}
                onValueChange={([v]) => previewHue(v)}
                aria-label="Brand hue"
              />
            </div>
            <div className="space-y-2">
              <div
                className="h-3 w-full rounded-full"
                style={{ background: chromaGradient(hue) }}
                aria-hidden
              />
              <Slider
                min={0}
                max={MAX_BRAND_CHROMA}
                step={0.005}
                value={[chroma]}
                onValueChange={([v]) => previewChroma(v)}
                aria-label="Brand intensity"
              />
            </div>
          </div>
          <div className="flex w-10 shrink-0 flex-col gap-4 text-right text-sm tabular-nums text-muted-foreground">
            <span>{Math.round(hue)}</span>
            <span>{chroma.toFixed(2)}</span>
          </div>
        </div>
        <div className="flex gap-2">
          <Button onClick={handleSave} disabled={loading}>
            {loading ? "Saving..." : "Save colour"}
          </Button>
          {(savedHue != null || savedChroma != null) && (
            <Button variant="outline" onClick={handleReset} disabled={loading}>
              Reset
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
