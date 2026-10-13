import type { ReactNode } from "react"
import { ShieldAlert } from "lucide-react"
import { useIsOrgAdmin } from "@/hooks/useIsOrgAdmin"

/**
 * Renders `children` for the organization's owner and admins. Everyone else
 * gets `note` (or nothing): the backend refuses these actions with a bare
 * "Not found, or you are not authorized", so the UI says who may do them
 * instead of offering a button that fails.
 *
 * Nothing renders while the memberships are still loading, so an admin never
 * sees the note flash.
 */
export function AdminOnly({
  orgId,
  note,
  children,
}: {
  orgId?: string | null
  note?: ReactNode
  children: ReactNode
}) {
  const { isAdmin, loading } = useIsOrgAdmin(orgId)
  if (loading) return null
  if (isAdmin) return <>{children}</>
  if (!note) return null
  return (
    <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
      <ShieldAlert className="h-3.5 w-3.5 shrink-0" />
      {note}
    </p>
  )
}
