import { toast } from "sonner"
import { Inbox } from "lucide-react"
import {
  useRoleRequestsQuery,
  useApproveRoleRequestMutation,
  useDeclineRoleRequestMutation,
} from "@/api/graphql"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

/**
 * Owner-only inbox of pending role requests for an organization. Renders nothing
 * when there are none. Approving grants the role to the requesting member's
 * membership (server-side); both actions refetch Me so the member's own "My
 * Access" view updates too.
 */
export function RoleRequestInbox({ organizationId }: { organizationId: string }) {
  const { data } = useRoleRequestsQuery({
    variables: { filters: { organization: organizationId, status: "pending" } },
  })

  const [approve, { loading: approving }] = useApproveRoleRequestMutation({
    refetchQueries: ["Me", "RoleRequests"],
  })
  const [decline, { loading: declining }] = useDeclineRoleRequestMutation({
    refetchQueries: ["Me", "RoleRequests"],
  })

  const requests = data?.roleRequests ?? []
  if (requests.length === 0) return null

  const busy = approving || declining

  const handleApprove = async (id: string) => {
    try {
      await approve({ variables: { input: { id } } })
      toast.success("Role granted")
    } catch (e: any) {
      toast.error("Failed to approve: " + e.message)
    }
  }

  const handleDecline = async (id: string) => {
    try {
      await decline({ variables: { input: { id } } })
      toast.success("Request declined")
    } catch (e: any) {
      toast.error("Failed to decline: " + e.message)
    }
  }

  return (
    <Card className="border-primary/40">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <Inbox className="h-5 w-5" /> Role requests
          <Badge variant="secondary">{requests.length}</Badge>
        </CardTitle>
        <CardDescription>Members asking to be granted additional roles.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        {requests.map((req) => (
          <div key={req.id} className="flex items-center justify-between gap-4 rounded-lg border p-3">
            <div className="flex items-center gap-3">
              <Avatar className="h-8 w-8">
                <AvatarImage src={req.membership.user.profile?.avatar?.presignedUrl || undefined} />
                <AvatarFallback>
                  {req.membership.user.username.substring(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm">
                  <span className="font-medium">{req.membership.user.username}</span> wants{" "}
                  <Badge variant="outline">{req.role.identifier}</Badge>
                </p>
                {req.reason ? (
                  <p className="text-xs text-muted-foreground">{req.reason}</p>
                ) : null}
              </div>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <Button size="sm" variant="outline" disabled={busy} onClick={() => handleDecline(req.id)}>
                Decline
              </Button>
              <Button size="sm" disabled={busy} onClick={() => handleApprove(req.id)}>
                Approve
              </Button>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
