import { useState } from "react"
import { useApolloClient } from "@apollo/client/react"
import { Bell, BellOff, Send, Smartphone } from "lucide-react"
import { toast } from "sonner"
import { useNotifyMemberMutation } from "@/graphql/mutations/notification.generated"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

/**
 * Sends a one-off push notification to a single member's registered devices.
 *
 * Open to any member of the organization, mirroring what lok enforces
 * (`notify_member` requires only `assert_member`). The recipient's own consent is
 * the gate that matters: `allowNotifications` is theirs to set on their "My
 * Access" page, and lok refuses the send when it is off — the form reflects that
 * state rather than letting the sender discover it as an error.
 */
export function SendNotification({
  membershipId,
  username,
  allowNotifications,
  hasNotificationChannel,
}: {
  membershipId: string
  username: string
  allowNotifications: boolean
  hasNotificationChannel: boolean
}) {
  const [title, setTitle] = useState("")
  const [message, setMessage] = useState("")

  const client = useApolloClient()
  const [notify, { loading }] = useNotifyMemberMutation({
    refetchQueries: ["GetMembership"],
  })

  const mutedByMember = !allowNotifications
  const noDevice = !hasNotificationChannel
  const canSend = !mutedByMember && !noDevice && message.trim().length > 0

  const handleSend = async () => {
    try {
      const { data } = await notify({
        variables: {
          input: {
            membership: membershipId,
            title: title.trim() || null,
            message: message.trim(),
          },
        },
      })
      const delivered = data?.notifyMember.delivered ?? 0
      const attempted = data?.notifyMember.attempted ?? 0
      if (delivered === 0) {
        // The push endpoint rejected every device — the member was reachable in
        // principle, so this is a delivery failure, not a consent problem.
        toast.error(`None of ${username}'s ${attempted} device(s) accepted the notification`)
      } else {
        toast.success(`Sent to ${username} (${delivered}/${attempted} device(s))`)
        setTitle("")
        setMessage("")
      }
    } catch (e: any) {
      // A refusal usually means the card was gating on stale data — the member
      // muted the org, or unregistered their device, in a session of their own.
      // `refetchQueries` only runs on success, so pull the truth in by hand.
      client.refetchQueries({ include: ["GetMembership"] })
      toast.error("Failed to send notification: " + e.message)
    }
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center gap-3 space-y-0">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
          {mutedByMember ? <BellOff className="h-5 w-5" /> : <Bell className="h-5 w-5" />}
        </div>
        <div className="space-y-1">
          <CardTitle className="text-lg">Send a notification</CardTitle>
          <CardDescription>
            Push a message to {username}'s devices through the Pokket companion app.
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {mutedByMember ? (
          <div className="flex items-start gap-3 rounded-lg border border-dashed p-3 text-sm text-muted-foreground">
            <BellOff className="mt-0.5 h-4 w-4 shrink-0" />
            <p>
              {username} has turned off notifications from this organization. Only they
              can turn them back on, from their own access page.
            </p>
          </div>
        ) : noDevice ? (
          <div className="flex items-start gap-3 rounded-lg border border-dashed p-3 text-sm text-muted-foreground">
            <Smartphone className="mt-0.5 h-4 w-4 shrink-0" />
            <p>
              {username} has no device registered. They need to sign in to the Pokket
              companion app before they can be notified.
            </p>
          </div>
        ) : null}

        <div className="space-y-2">
          <Label htmlFor="notification-title">Title</Label>
          <Input
            id="notification-title"
            placeholder="Optional — defaults to the organization name"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            disabled={mutedByMember || noDevice}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="notification-message">Message</Label>
          <Textarea
            id="notification-message"
            placeholder={`What should ${username} know?`}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={3}
            disabled={mutedByMember || noDevice}
          />
        </div>

        <div className="flex justify-end">
          <Button onClick={handleSend} disabled={!canSend || loading}>
            <Send className="mr-2 h-4 w-4" />
            {loading ? "Sending…" : "Send notification"}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
