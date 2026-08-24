import { useMeQuery } from "@/graphql/queries/me.generated"
import { useSetMembershipNotificationsMutation } from "@/graphql/mutations/notification.generated"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { Switch } from "./ui/switch"
import { Label } from "./ui/label"
import { Bell, Smartphone } from "lucide-react"
import { toast } from "sonner"

/**
 * Lets the current member decide whether one organization may push notifications
 * to the devices they registered in the Pokket companion app.
 *
 * Registering a device in Pokket is the *global* consent — it is what creates the
 * channel at all. This switch is the per-organization mute on top of it, which is
 * why it defaults to on: a member who signed in to Pokket has already said yes to
 * notifications, and this only narrows that down per organization.
 */
export function NotificationPreferences({ organizationId }: { organizationId: string }) {
  const { data } = useMeQuery()
  const membership = data?.me?.memberships?.find((m) => m.organization?.id === organizationId)

  const [save, { loading }] = useSetMembershipNotificationsMutation({ refetchQueries: ["Me"] })

  // Only a member can mute an organization they belong to.
  if (!membership) return null

  const allowed = membership.allowNotifications
  const hasDevice = membership.hasNotificationChannel
  const orgName = membership.organization?.name || membership.organization?.slug

  const handleToggle = async (next: boolean) => {
    try {
      await save({ variables: { input: { organization: organizationId, allow: next } } })
      toast.success(
        next
          ? `${orgName} can now send you notifications`
          : `${orgName} will no longer send you notifications`,
      )
    } catch (e: any) {
      toast.error("Failed to save your notification preference: " + e.message)
    }
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center gap-3 space-y-0">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
          <Bell className="h-5 w-5" />
        </div>
        <div className="space-y-1">
          <CardTitle className="text-lg">Notifications</CardTitle>
          <CardDescription>
            Whether {orgName} may send push notifications to your devices.
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between gap-4 rounded-lg border p-3">
          <div className="space-y-0.5">
            <Label htmlFor="allow-notifications" className="text-sm font-medium">
              Allow notifications from this organization
            </Label>
            <p className="text-sm text-muted-foreground">
              Admins of {orgName} can then send messages to the devices you registered.
            </p>
          </div>
          <Switch
            id="allow-notifications"
            checked={allowed}
            disabled={loading}
            onCheckedChange={handleToggle}
          />
        </div>

        <div className="flex items-start gap-3 text-sm text-muted-foreground">
          <Smartphone className="mt-0.5 h-4 w-4 shrink-0" />
          {hasDevice ? (
            <p>
              You have at least one device registered through the Pokket companion app.
            </p>
          ) : (
            <p>
              No device is registered yet. Sign in to the Pokket companion app to receive
              notifications — until then this setting has nothing to deliver to.
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
