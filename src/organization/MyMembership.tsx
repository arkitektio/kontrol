import { useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { UserCircle, Shield, Plus, Clock, Check, X, LogOut } from "lucide-react"
import { toast } from "sonner"
import { useMeQuery } from "@/graphql/queries/me.generated"
import { useOrganizationQuery } from "@/graphql/queries/organization.generated"
import { useDeleteMembershipMutation } from "@/graphql/mutations/membership.generated"
import { toastError } from "@/lib/errors"
import { ConfirmActionDialog } from "@/components/ConfirmActionDialog"
import { useRequestRoleMutation, useCancelRoleRequestMutation } from "@/graphql/mutations/role_request.generated"
import { PageHeader } from "@/components/PageHeader"
import { BrandHuePicker } from "@/components/BrandHuePicker"
import { NotificationPreferences } from "@/components/NotificationPreferences"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

import { SettingsStackSkeleton } from "@/components/skeletons"

/** Colour a request badge by its status. */
function statusVariant(status: string): "default" | "secondary" | "destructive" | "outline" {
  if (status === "approved") return "default"
  if (status === "declined") return "destructive"
  return "secondary" // pending
}

/**
 * "Me in this organization": lets a member see the roles they hold, request
 * additional roles from the owner, track those requests, and pick their personal
 * brand colour for the organization. Everything is read from the already-fetched
 * `Me` query — the membership carries its roles, its role requests, and the
 * organization's full role list.
 */
export default function MyMembership() {
  const { orgId } = useParams<{ orgId: string }>()
  const navigate = useNavigate()
  const { data, loading } = useMeQuery()
  // Me's memberships carry the list-level org (no amIOwner) — ask the org itself.
  const { data: orgData } = useOrganizationQuery({ variables: { id: orgId! }, skip: !orgId })
  const [leaveOpen, setLeaveOpen] = useState(false)

  const [requestRole, { loading: requesting }] = useRequestRoleMutation({
    refetchQueries: ["Me", "RoleRequests"],
  })
  const [cancelRequest, { loading: cancelling }] = useCancelRoleRequestMutation({
    refetchQueries: ["Me", "RoleRequests"],
  })
  const [deleteMembership] = useDeleteMembershipMutation()

  if (loading) return <SettingsStackSkeleton header="pageHeader" cards={2} rows={3} />
  const membership = data?.me?.memberships?.find((m) => m.organization.id === orgId)
  if (!membership) {
    return (
      <div className="flex flex-1 flex-col gap-8 p-6">
        <PageHeader
          icon={UserCircle}
          title="My Access"
          description="You are not a member of this organization."
        />
      </div>
    )
  }

  const org = membership.organization
  const heldRoleIds = new Set(membership.roles.map((r) => r.id))
  const pendingRequests = membership.roleRequests.filter((r) => r.status === "pending")
  const pendingRoleIds = new Set(pendingRequests.map((r) => r.role.id))

  // Roles offered by the org that the member neither holds nor has pending.
  const requestableRoles = org.roles.filter(
    (r) => !heldRoleIds.has(r.id) && !pendingRoleIds.has(r.id),
  )

  // Show resolved requests (approved/declined) plus any still pending, newest first.
  const requestHistory = [...membership.roleRequests].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  )

  const handleRequest = async (roleId: string) => {
    try {
      await requestRole({ variables: { input: { organization: org.id, role: roleId } } })
      toast.success("Role requested — the organization owner will review it")
    } catch (e) {
      toastError(e, "Couldn't request the role")
    }
  }

  const handleCancel = async (id: string) => {
    try {
      await cancelRequest({ variables: { input: { id } } })
      toast.success("Request withdrawn")
    } catch (e) {
      toastError(e, "Couldn't withdraw the request")
    }
  }

  const isOwner = Boolean(orgData?.organization?.amIOwner)

  const handleLeave = async () => {
    try {
      // Wait for Me to come back without this org before navigating, so the
      // shell doesn't briefly treat us as still being a member.
      await deleteMembership({
        variables: { input: { id: membership.id } },
        refetchQueries: ["Me"],
        awaitRefetchQueries: true,
      })
      toast.success(`You left ${org.name || org.slug}`)
      navigate("/home")
    } catch (e) {
      toastError(e, "Couldn't leave the organization")
      return false
    }
  }

  return (
    <div className="flex flex-1 flex-col gap-8 p-6">
      <PageHeader
        icon={UserCircle}
        title="My Access"
        description={`Your roles and access in ${org.name || org.slug}`}
      />

      {/* Current roles */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Shield className="h-5 w-5" /> My roles
          </CardTitle>
          <CardDescription>The roles you currently hold in this organization.</CardDescription>
        </CardHeader>
        <CardContent>
          {membership.roles.length === 0 ? (
            <p className="text-sm text-muted-foreground">You have no roles yet.</p>
          ) : (
            <div className="flex flex-wrap gap-2">
              {membership.roles.map((r) => (
                <Badge key={r.id} variant="outline" className="text-sm">
                  {r.identifier}
                </Badge>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Request access */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Plus className="h-5 w-5" /> Request access
          </CardTitle>
          <CardDescription>
            Ask the organization owner to grant you an additional role.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {requestableRoles.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              No further roles are available to request.
            </p>
          ) : (
            <div className="space-y-2">
              {requestableRoles.map((r) => (
                <div
                  key={r.id}
                  className="flex items-center justify-between gap-4 rounded-lg border p-3"
                >
                  <div>
                    <p className="font-medium">{r.identifier}</p>
                    {r.description && r.description !== r.identifier ? (
                      <p className="text-sm text-muted-foreground">{r.description}</p>
                    ) : null}
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    disabled={requesting}
                    onClick={() => handleRequest(r.id)}
                  >
                    Request
                  </Button>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Request history */}
      {requestHistory.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Clock className="h-5 w-5" /> My requests
            </CardTitle>
            <CardDescription>Roles you have requested and their status.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {requestHistory.map((req) => (
                <div
                  key={req.id}
                  className="flex items-center justify-between gap-4 rounded-lg border p-3"
                >
                  <div className="flex items-center gap-3">
                    {req.status === "approved" ? (
                      <Check className="h-4 w-4 text-green-600" />
                    ) : req.status === "declined" ? (
                      <X className="h-4 w-4 text-destructive" />
                    ) : (
                      <Clock className="h-4 w-4 text-muted-foreground" />
                    )}
                    <span className="font-medium">{req.role.identifier}</span>
                    <Badge variant={statusVariant(req.status)}>{req.status}</Badge>
                  </div>
                  {req.status === "pending" && (
                    <Button
                      size="sm"
                      variant="ghost"
                      disabled={cancelling}
                      onClick={() => handleCancel(req.id)}
                    >
                      Cancel
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Per-organization notification opt-in */}
      <NotificationPreferences organizationId={org.id} />

      {/* Personal brand colour for this organization */}
      <BrandHuePicker organizationId={org.id} />

      {/* Leave — the owner has to hand the organization over first. */}
      <Card className="border-destructive/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <LogOut className="h-5 w-5" /> Leave organization
          </CardTitle>
          <CardDescription>
            {isOwner
              ? "You own this organization. Transfer ownership to another member before you leave."
              : "You will lose access to this organization until you are invited again."}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isOwner ? (
            <Button variant="outline" asChild>
              <Link to={`/organization/${org.id}/danger-zone`}>Transfer ownership</Link>
            </Button>
          ) : (
            <Button variant="destructive" onClick={() => setLeaveOpen(true)} disabled={!orgData}>
              Leave organization
            </Button>
          )}
        </CardContent>
      </Card>

      <ConfirmActionDialog
        open={leaveOpen}
        onOpenChange={setLeaveOpen}
        title={`Leave ${org.name || org.slug}?`}
        description="You lose access to its hubs, apps and data straight away. To come back you need a new invite."
        confirmLabel="Leave organization"
        pendingLabel="Leaving..."
        destructive
        onConfirm={handleLeave}
      />
    </div>
  )
}
