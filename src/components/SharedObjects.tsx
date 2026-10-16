import { useState } from "react"
import { Boxes, Undo2 } from "lucide-react"
import { toast } from "sonner"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ConfirmActionDialog } from "@/components/ConfirmActionDialog"
import { useRevokeObjectGrantMutation } from "@/graphql/mutations/membership.generated"
import type { ObjectGrantFragment } from "@/graphql/fragments/membership.generated"
import { toastError } from "@/lib/errors"

/**
 * The objects shared with someone who is not a full member (a scoped
 * membership): each one by its hub and `@service/structure:id`, with how far it
 * reaches.
 * `canRevoke` decides per object whether to offer taking it back; taking back
 * the last one removes the person from the organization, which lok does and the
 * confirmation says.
 */
export function SharedObjects({
  grants,
  canRevoke,
  revokeLabel = "Take back",
  onRevoked,
}: {
  grants: readonly ObjectGrantFragment[]
  canRevoke?: (grant: ObjectGrantFragment) => boolean
  revokeLabel?: string
  onRevoked?: (grant: ObjectGrantFragment, last: boolean) => void
}) {
  const [target, setTarget] = useState<ObjectGrantFragment | null>(null)
  const [revoke] = useRevokeObjectGrantMutation({ refetchQueries: ["Me", "GetMembership", "Memberships"] })

  if (grants.length === 0) {
    return <p className="text-sm text-muted-foreground">Nothing is shared.</p>
  }

  const last = grants.length === 1

  const confirm = async () => {
    if (!target) return
    try {
      await revoke({ variables: { input: { id: target.id } } })
      toast.success(last ? "Taken back; they are no longer in the organization" : "Taken back")
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
                <code className="truncate text-sm">
                  {grant.structure}:{grant.objectId}
                </code>
                {grant.reach !== "self" && (
                  <Badge variant="secondary" className="text-xs" title="How much related data comes with it">
                    + {grant.reach}
                  </Badge>
                )}
              </div>
              <p className="text-xs text-muted-foreground">
                On {grant.hub.name}
                {grant.grantedBy && <> · shared by {grant.grantedBy.username}</>}
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
        title={`${revokeLabel} ${target?.structure}:${target?.objectId} on ${target?.hub.name}?`}
        description={
          last
            ? "It is the last thing shared, so this also removes them from the organization."
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
