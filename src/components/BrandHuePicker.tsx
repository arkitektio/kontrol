import { useEffect, useState } from "react"
import { useMeQuery, useSetMembershipBrandHueMutation } from "@/api/graphql"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "./ui/card"
import { Button } from "./ui/button"
import { Slider } from "./ui/slider"
import { Palette } from "lucide-react"
import { toast } from "sonner"
import { DEFAULT_BRAND_HUE } from "@/lib/brand"

const HUE_GRADIENT =
  "linear-gradient(to right, hsl(0 70% 50%), hsl(60 70% 50%), hsl(120 70% 50%), hsl(180 70% 50%), hsl(240 70% 50%), hsl(300 70% 50%), hsl(360 70% 50%))"

/**
 * Lets the current member pick a personal brand hue for one organization. The
 * choice is saved on the server (per-membership) and tints the whole UI while
 * this organization is active — see MembershipHueSync. Dragging previews live.
 */
export function BrandHuePicker({ organizationId }: { organizationId: string }) {
  const { data } = useMeQuery()
  const membership = data?.me?.memberships?.find((m) => m.organization?.id === organizationId)
  const savedHue = membership?.brandHue ?? null
  // Falls back to the organization's default hue when the member hasn't set one.
  const orgHue = membership?.organization?.brandHue ?? null
  const fallbackHue = orgHue ?? DEFAULT_BRAND_HUE

  const [hue, setHue] = useState<number>(savedHue ?? fallbackHue)

  // Adopt the saved hue once it loads (or changes elsewhere).
  useEffect(() => {
    if (savedHue != null) setHue(savedHue)
  }, [savedHue])

  const [save, { loading }] = useSetMembershipBrandHueMutation({ refetchQueries: ["Me"] })

  const preview = (h: number) => {
    setHue(h)
    document.documentElement.style.setProperty("--brand-hue", String(h))
  }

  const handleSave = async () => {
    try {
      await save({ variables: { input: { organization: organizationId, brandHue: hue } } })
      toast.success("Your colour for this organization was saved")
    } catch (e: any) {
      toast.error("Failed to save colour: " + e.message)
    }
  }

  const handleReset = async () => {
    try {
      await save({ variables: { input: { organization: organizationId, brandHue: null } } })
      document.documentElement.style.setProperty("--brand-hue", String(fallbackHue))
      try {
        localStorage.setItem("arkitekt-brand-hue", String(fallbackHue))
      } catch {
        /* localStorage unavailable */
      }
      setHue(fallbackHue)
      toast.success(orgHue != null ? "Reset to the organization default" : "Reset to the default colour")
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
            Pick a brand hue for this organization. Only you see it.
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="space-y-5">
        <div className="flex items-center gap-4">
          <div
            className="h-10 w-10 shrink-0 rounded-full border"
            style={{ backgroundColor: `hsl(${hue} 70% 50%)` }}
            aria-hidden
          />
          <div className="flex-1 space-y-2">
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
              onValueChange={([v]) => preview(v)}
              aria-label="Brand hue"
            />
          </div>
          <span className="w-10 shrink-0 text-right text-sm tabular-nums text-muted-foreground">
            {Math.round(hue)}
          </span>
        </div>
        <div className="flex gap-2">
          <Button onClick={handleSave} disabled={loading}>
            {loading ? "Saving..." : "Save colour"}
          </Button>
          {savedHue != null && (
            <Button variant="outline" onClick={handleReset} disabled={loading}>
              Reset
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
