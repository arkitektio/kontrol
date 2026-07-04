import { useEffect, useState } from "react"
import { useUpdateOrganizationMutation } from "@/api/graphql"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { Button } from "./ui/button"
import { Slider } from "./ui/slider"
import { Palette } from "lucide-react"
import { toast } from "sonner"
import { DEFAULT_BRAND_HUE } from "@/lib/brand"

const HUE_GRADIENT =
  "linear-gradient(to right, hsl(0 70% 50%), hsl(60 70% 50%), hsl(120 70% 50%), hsl(180 70% 50%), hsl(240 70% 50%), hsl(300 70% 50%), hsl(360 70% 50%))"

/**
 * Owner-only card for the organization's *default* brand hue — the colour every
 * member sees unless they override it with their own membership hue (see
 * BrandHuePicker). Saved on the server via updateOrganization; only the owner may
 * call that mutation. Render this behind an `amIOwner` gate.
 */
export function OrgBrandHuePicker({
  organizationId,
  brandHue,
}: {
  organizationId: string
  brandHue?: number | null
}) {
  const savedHue = brandHue ?? null
  const [hue, setHue] = useState<number>(savedHue ?? DEFAULT_BRAND_HUE)

  // Adopt the saved hue once it loads (or changes elsewhere).
  useEffect(() => {
    if (savedHue != null) setHue(savedHue)
  }, [savedHue])

  const [save, { loading }] = useUpdateOrganizationMutation({ refetchQueries: ["Me"] })

  const handleSave = async () => {
    try {
      await save({ variables: { input: { id: organizationId, brandHue: hue } } })
      toast.success("Organization default colour saved")
    } catch (e: any) {
      toast.error("Failed to save colour: " + e.message)
    }
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center gap-3 space-y-0">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
          <Palette className="h-5 w-5" />
        </div>
        <div className="space-y-1">
          <CardTitle className="text-lg">Organization colour</CardTitle>
          <CardDescription>
            The default brand hue for everyone in this organization. Members can override it with
            their own colour.
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
            <div className="h-3 w-full rounded-full" style={{ background: HUE_GRADIENT }} aria-hidden />
            <Slider
              min={0}
              max={360}
              step={1}
              value={[hue]}
              onValueChange={([v]) => setHue(v)}
              aria-label="Organization brand hue"
            />
          </div>
          <span className="w-10 shrink-0 text-right text-sm tabular-nums text-muted-foreground">
            {Math.round(hue)}
          </span>
        </div>
        <Button onClick={handleSave} disabled={loading}>
          {loading ? "Saving..." : "Save colour"}
        </Button>
      </CardContent>
    </Card>
  )
}
