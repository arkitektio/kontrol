import { formatDistanceToNow } from "date-fns"
import { Check, Inbox, X } from "lucide-react"
import { toast } from "sonner"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  useApproveRoleRequestMutation,
  useDeclineRoleRequestMutation,
} from "@/graphql/mutations/role_request.generated"
import { useRoleRequestsQuery } from "@/graphql/queries/role_request.generated"

function timeAgo(iso?: string | null): string {
  if (!iso) return "unknown"
  try {
    return formatDistanceToNow(new Date(iso), { addSuffix: true })
  } catch {
    return "unknown"
  }
}

/**
 * The pending-role-request queue for one organization — the admin page's action
 * list, built the way the dashboard's "Needs attention" tile is: the things
 * waiting on a human, each with the decision right there on the row.
 *
 * Unlike the dashboard tile this one keeps its empty state. It is the whole
 * reason the page exists, so "nothing to review" is the answer an admin came
 * for, not an absence worth hiding.
 *
 * Approving grants the role to the requesting member's membership (server-side,
 * gated on owner-or-admin); both actions refetch Me so the member's own
 * "My Access" view updates too.
 */
export function RoleRequestInbox({ organizationId }: { organizationId: string }) {
  const { data, loading } = useRoleRequestsQuery({
    variables: { filters: { organization: organizationId, status: "pending" } },
  })

  const [approve, { loading: approving }] = useApproveRoleRequestMutation({
    refetchQueries: ["Me", "RoleRequests"],
  })
  const [decline, { loading: declining }] = useDeclineRoleRequestMutation({
    refetchQueries: ["Me", "RoleRequests"],
  })

  const requests = data?.roleRequests ?? []
  const busy = approving || declining

  const handleApprove = async (id: string) => {
    try {
      await approve({ variables: { input: { id } } })
      toast.success("Role granted")
    } catch (e) {
      toast.error("Failed to approve: " + (e as Error).message)
    }
  }

  const handleDecline = async (id: string) => {
    try {
      await decline({ variables: { input: { id } } })
      toast.success("Request declined")
    } catch (e) {
      toast.error("Failed to decline: " + (e as Error).message)
    }
  }

  return (
    <Card className={requests.length > 0 ? "border-primary/40" : undefined}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <Inbox className="h-5 w-5" /> Role requests
          {requests.length > 0 && <Badge variant="secondary">{requests.length}</Badge>}
        </CardTitle>
        <CardDescription>
          Members asking to be granted additional roles. Approving adds the role to their
          membership immediately.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        {loading && requests.length === 0 ? (
          <p className="text-muted-foreground text-sm">Loading requests…</p>
        ) : requests.length === 0 ? (
          <p className="text-muted-foreground text-sm">
            Nothing waiting on you. Requests land here the moment a member asks for a role
            from their My Access page.
          </p>
        ) : (
          requests.map((req) => (
            <div
              key={req.id}
              className="flex flex-wrap items-center justify-between gap-4 rounded-lg border p-3"
            >
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
                    <p className="text-muted-foreground text-xs">{req.reason}</p>
                  ) : null}
                  <p className="text-muted-foreground text-xs">Asked {timeAgo(req.createdAt)}</p>
                </div>
              </div>
              <div className="flex shrink-0 items-center gap-2">
                <Button size="sm" variant="outline" disabled={busy} onClick={() => handleDecline(req.id)}>
                  <X className="mr-1 h-4 w-4" />
                  Decline
                </Button>
                <Button size="sm" disabled={busy} onClick={() => handleApprove(req.id)}>
                  <Check className="mr-1 h-4 w-4" />
                  Approve
                </Button>
              </div>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  )
}
