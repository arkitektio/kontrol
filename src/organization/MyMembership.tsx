import { useParams } from "react-router-dom"
import { UserCircle, Shield, Plus, Clock, Check, X } from "lucide-react"
import { toast } from "sonner"
import {
  useMeQuery,
  useRequestRoleMutation,
  useCancelRoleRequestMutation,
} from "@/api/graphql"
import { PageHeader } from "@/components/PageHeader"
import { BrandHuePicker } from "@/components/BrandHuePicker"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

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
  const { data, loading } = useMeQuery()

  const [requestRole, { loading: requesting }] = useRequestRoleMutation({
    refetchQueries: ["Me", "RoleRequests"],
  })
  const [cancelRequest, { loading: cancelling }] = useCancelRoleRequestMutation({
    refetchQueries: ["Me", "RoleRequests"],
  })

  if (loading) return <div className="container mx-auto py-10">Loading...</div>

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
    } catch (e: any) {
      toast.error("Failed to request role: " + e.message)
    }
  }

  const handleCancel = async (id: string) => {
    try {
      await cancelRequest({ variables: { input: { id } } })
      toast.success("Request withdrawn")
    } catch (e: any) {
      toast.error("Failed to cancel request: " + e.message)
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

      {/* Personal brand colour for this organization */}
      <BrandHuePicker organizationId={org.id} />
    </div>
  )
}
