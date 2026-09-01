import { useEffect, useState } from "react"
import { useUpdateOrganizationMutation } from "@/graphql/mutations/organization.generated"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { Button } from "./ui/button"
import { Label } from "./ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select"
import { Timer } from "lucide-react"
import { toast } from "sonner"

/**
 * Owner-only card for the organization's access-token lifetime.
 *
 * Longer tokens exist for clients that cannot refresh on the usual hourly
 * cadence — an unattended acquisition, an instrument PC behind a firewall. The
 * trade-off is real and worth stating in the UI: resource servers verify tokens
 * as pure JWTs and never consult the revocation table, so the lifetime IS the
 * revocation window.
 *
 * The options mirror the server's accepted range (lok clamps to 5 minutes …
 * 24 hours and rejects anything outside it), which is why this is a fixed list
 * rather than a free-text field. There is no "unset" option: `updateOrganization`
 * reads a null as "leave unchanged", so the way back to the default is to pick
 * the one-hour option, which stores the same lifetime the default produces.
 */
const OPTIONS = [
  { value: 3600, label: "1 hour (default)" },
  { value: 7200, label: "2 hours" },
  { value: 14400, label: "4 hours" },
  { value: 28800, label: "8 hours" },
  { value: 43200, label: "12 hours" },
  { value: 86400, label: "24 hours (maximum)" },
]

const DEFAULT_LIFETIME = 3600

export function AccessTokenLifetimeCard({
  organizationId,
  accessTokenLifetime,
}: {
  organizationId: string
  accessTokenLifetime?: number | null
}) {
  const saved = accessTokenLifetime ?? DEFAULT_LIFETIME
  const [value, setValue] = useState(String(saved))

  // Adopt the stored value once it loads (or changes elsewhere).
  useEffect(() => {
    setValue(String(accessTokenLifetime ?? DEFAULT_LIFETIME))
  }, [accessTokenLifetime])

  const [save, { loading }] = useUpdateOrganizationMutation({
    refetchQueries: ["Organization"],
  })

  const unchanged = Number(value) === saved

  const handleSave = async () => {
    if (unchanged) return
    try {
      await save({
        variables: { input: { id: organizationId, accessTokenLifetime: Number(value) } },
      })
      toast.success("Access token lifetime updated")
    } catch (e: any) {
      toast.error("Failed to update access token lifetime: " + e.message)
    }
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center gap-3 space-y-0">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
          <Timer className="h-5 w-5" />
        </div>
        <div className="space-y-1">
          <CardTitle className="text-lg">Access token lifetime</CardTitle>
          <CardDescription>
            How long an access token issued to this organization's clients stays valid.
            Clients keep working past it by refreshing, so raise this only for clients that
            cannot refresh on their own.
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="org-token-lifetime">Lifetime</Label>
          <Select value={value} onValueChange={setValue}>
            <SelectTrigger id="org-token-lifetime" className="w-full sm:w-72">
              <SelectValue placeholder="Select a lifetime" />
            </SelectTrigger>
            <SelectContent>
              {OPTIONS.map((option) => (
                <SelectItem key={option.value} value={String(option.value)}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <p className="text-sm text-muted-foreground">
            A longer lifetime is also a longer window in which a leaked token still works:
            services check the token's signature and expiry, not whether it was revoked
            since. Revoking a client takes effect at the next refresh.
          </p>
        </div>
        <Button onClick={handleSave} disabled={loading || unchanged}>
          {loading ? "Saving..." : "Save lifetime"}
        </Button>
      </CardContent>
    </Card>
  )
}
