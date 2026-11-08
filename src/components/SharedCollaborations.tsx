import { useState } from "react"
import { Boxes, Undo2 } from "lucide-react"
import { toast } from "sonner"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ConfirmActionDialog } from "@/components/ConfirmActionDialog"
import { useRevokeCollaborationGrantMutation } from "@/graphql/mutations/membership.generated"
import type { CollaborationGrantFragment } from "@/graphql/fragments/membership.generated"
import { toastError } from "@/lib/errors"
import { absoluteTime, timeAgo } from "@/lib/time"

/**
 * A collaboration by its service instance and its id there, e.g. `7/12`. Only
 * the ids: a guest may not see the organization's instances, so the grant's
 * `instance` cannot be selected here.
 */
export function collaborationLabel(grant: CollaborationGrantFragment) {
  return `${grant.instanceId}/${grant.collaborationId}`
}

/**
 * The collaborations granted to a guest (a scoped membership): each one by its
 * service instance and its id there, with the roles that hold inside it (none:
 * view only).
 * `canRevoke` decides per collaboration whether to offer taking it back; taking
 * back the last one removes the person from the organization, which lok does and
 * the confirmation says. `self`: the list is the viewer's own (a guest looking at
 * what was shared with them), so the copy speaks to them.
 */
export function SharedCollaborations({
  grants,
  canRevoke,
  revokeLabel = "Take back",
  onRevoked,
  self = false,
}: {
  grants: readonly CollaborationGrantFragment[]
  canRevoke?: (grant: CollaborationGrantFragment) => boolean
  revokeLabel?: string
  onRevoked?: (grant: CollaborationGrantFragment, last: boolean) => void
  self?: boolean
}) {
  const [target, setTarget] = useState<CollaborationGrantFragment | null>(null)
  const [revoke] = useRevokeCollaborationGrantMutation({ refetchQueries: ["Me", "GetMembership", "Memberships"] })

  if (grants.length === 0) {
    return <p className="text-sm text-muted-foreground">No collaborations are shared.</p>
  }

  const last = grants.length === 1

  const confirm = async () => {
    if (!target) return
    try {
      await revoke({ variables: { input: { id: target.id } } })
      toast.success(
        self
          ? last ? "Given back; you are no longer in the organization" : "Given back"
          : last ? "Taken back; they are no longer in the organization" : "Taken back",
      )
      onRevoked?.(target, last)
    } catch (e) {
      toastError(e, "Couldn't take it back")
      return false
    }
  }

  return (
    <>
      <ul className="divide-y rounded-md border">
        {grants.map((grant) => (
          <li key={grant.id} className="flex items-center justify-between gap-3 p-3">
            <div className="min-w-0 space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <Boxes className="h-4 w-4 shrink-0 text-muted-foreground" />
                <code
                  className="truncate text-sm"
                  title={`Collaboration ${grant.collaborationId} of service instance ${grant.instanceId}`}
                >
                  {collaborationLabel(grant)}
                </code>
                {grant.roles.length === 0 ? (
                  <Badge variant="outline" className="text-xs" title="No roles inside the collaboration">
                    view only
                  </Badge>
                ) : (
                  grant.roles.map((role) => (
                    <Badge key={role} variant="secondary" className="text-xs" title="A role that holds inside the collaboration">
                      {role}
                    </Badge>
                  ))
                )}
              </div>
              <p className="text-xs text-muted-foreground">
                {grant.grantedBy ? `Shared by ${grant.grantedBy.username}` : "Shared"}
                {" · "}
                <span title={absoluteTime(grant.createdAt)}>{timeAgo(grant.createdAt)}</span>
                {grant.expiresAt && (
                  <>
                    {" · "}
                    <span title={absoluteTime(grant.expiresAt)}>
                      {new Date(grant.expiresAt).getTime() < Date.now() ? "expired" : "expires"} {timeAgo(grant.expiresAt)}
                    </span>
                  </>
                )}
              </p>
            </div>
            {canRevoke?.(grant) && (
              <Button variant="ghost" size="sm" onClick={() => setTarget(grant)}>
                <Undo2 className="mr-2 h-4 w-4" />
                {revokeLabel}
              </Button>
            )}
          </li>
        ))}
      </ul>
      <ConfirmActionDialog
        open={target !== null}
        onOpenChange={(open) => !open && setTarget(null)}
        title={`${revokeLabel} collaboration ${target ? collaborationLabel(target) : ""}?`}
        description={
          self
            ? last
              ? "It is the last collaboration shared with you, so this also removes you from the organization."
              : "Your apps lose it within 15 minutes; a session from a browser login can keep it for up to an hour."
            : last
              ? "It is the last collaboration shared, so this also removes them from the organization."
              : "Their apps lose it within 15 minutes; a session from a browser login can keep it for up to an hour."
        }
        confirmLabel={revokeLabel}
        pendingLabel="Working..."
        destructive
        onConfirm={confirm}
      />
    </>
  )
}
