import { Check, UserPlus, X } from "lucide-react"
import { toast } from "sonner"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  useApproveMembershipRequestMutation,
  useDeclineMembershipRequestMutation,
} from "@/graphql/mutations/membership_request.generated"
import { useMembershipRequestsQuery } from "@/graphql/queries/membership_request.generated"
import { useIsOrgAdmin } from "@/hooks/useIsOrgAdmin"
import { toastError } from "@/lib/errors"
import { timeAgo } from "@/lib/time"

/**
 * The dashboard tile for people asking to join the organization — usually
 * someone who was sent a link (/deeplink, /smartlink) and is not a member yet.
 *
 * Only owners and admins get it (lok returns an empty list to anyone else, so
 * the admin check here just saves the request), and like the "Needs attention"
 * tile it only exists while something is waiting: no requests, no tile.
 *
 * Approving creates the membership with the `guest` role; roles are changed
 * afterwards on the member's page.
 */
export function JoinRequestsCard({ organizationId, className }: { organizationId: string; className?: string }) {
  const { isAdmin } = useIsOrgAdmin(organizationId)
  const { data } = useMembershipRequestsQuery({
    variables: { id: organizationId },
    skip: !isAdmin,
  })

  // The member count and avatars on the dashboard come from SidebarOrganization.
  const refetchQueries = ["MembershipRequests", "SidebarOrganization"]
  const [approve, { loading: approving }] = useApproveMembershipRequestMutation({ refetchQueries })
  const [decline, { loading: declining }] = useDeclineMembershipRequestMutation({ refetchQueries })
  const busy = approving || declining

  const requests = data?.organization.membershipRequests ?? []
  if (!isAdmin || requests.length === 0) return null

  const handleApprove = async (id: string, name: string) => {
    try {
      await approve({ variables: { input: { id } } })
      toast.success(`${name} is now a member`)
    } catch (e) {
      toastError(e, "Couldn't approve the request")
    }
  }

  const handleDecline = async (id: string) => {
    try {
      await decline({ variables: { input: { id } } })
      toast.success("Request declined")
    } catch (e) {
      toastError(e, "Couldn't decline the request")
    }
  }

  return (
    <Card className={`border-primary/40 ${className ?? ""}`}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <UserPlus className="h-5 w-5" /> Requests to join
          <Badge variant="secondary">{requests.length}</Badge>
        </CardTitle>
        <CardDescription>
          People asking to become members. Approving lets them in as a guest.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        {requests.map((request) => {
          const name = request.user.profile?.name || request.user.username
          return (
            <div
              key={request.id}
              className="flex flex-wrap items-center justify-between gap-4 rounded-lg border p-3"
            >
              <div className="flex items-center gap-3">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={request.user.profile?.avatar?.presignedUrl || undefined} />
                  <AvatarFallback>{name.substring(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm">
                    <span className="font-medium">{name}</span>{" "}
                    <span className="text-muted-foreground">@{request.user.username}</span>
                  </p>
                  {request.reason ? <p className="text-muted-foreground text-xs">{request.reason}</p> : null}
                  <p className="text-muted-foreground text-xs">Asked {timeAgo(request.createdAt)}</p>
                </div>
              </div>
              <div className="flex shrink-0 items-center gap-2">
                <Button size="sm" variant="outline" disabled={busy} onClick={() => handleDecline(request.id)}>
                  <X className="mr-1 h-4 w-4" />
                  Decline
                </Button>
                <Button size="sm" disabled={busy} onClick={() => handleApprove(request.id, name)}>
                  <Check className="mr-1 h-4 w-4" />
                  Approve
                </Button>
              </div>
            </div>
          )
        })}
      </CardContent>
    </Card>
  )
}
