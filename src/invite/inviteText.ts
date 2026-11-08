import { timeAgo } from "@/lib/time"

/** "Expires in 2 days" / "Expired 3 hours ago" / "No expiry". */
export function inviteExpiry(expiresAt?: string | null): string {
  if (!expiresAt) return "No expiry"
  const expired = new Date(expiresAt).getTime() < Date.now()
  return `${expired ? "Expired" : "Expires"} ${timeAgo(expiresAt)}`
}

export function isInviteExpired(expiresAt?: string | null): boolean {
  return !!expiresAt && new Date(expiresAt).getTime() < Date.now()
}

/** What canceling an invite leaves in place, which differs for a collaboration invite. */
export function cancelInviteDescription(isCollaboration: boolean): string {
  return isCollaboration
    ? "The invite link will stop working. Guests who already accepted keep what was shared with them; use Take back to remove it."
    : "The invite link will stop working. People who already joined keep their membership."
}

/** "Shares 2 collaborations, no membership · accepted 1 of 3 times". */
export function collaborationSummary(i: { collaborations?: unknown[] | null; uses: number; maxUses?: number | null }): string {
  const n = i.collaborations?.length ?? 0
  return (
    `Shares ${n} ${n === 1 ? "collaboration" : "collaborations"}, no membership · accepted ${i.uses}` +
    `${i.maxUses != null ? ` of ${i.maxUses}` : ""} ${i.uses === 1 ? "time" : "times"}`
  )
}
