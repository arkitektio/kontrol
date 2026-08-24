import { useMeQuery } from "@/graphql/queries/me.generated"
import { useUser } from "@/auth"

/**
 * The sentence a non-admin sees on every add-a-hub surface. Mirrors the backend's
 * `HUB_ADMIN_REQUIRED` denial (`api/management/authz.py`) word for word, so the UI
 * says the same thing the API would if the mutation were attempted anyway.
 */
export const HUB_ADMIN_REQUIRED =
  "Only organization admins can add a hub. Ask an admin of this organization to do it."

/**
 * Whether the current user owns `orgId` or holds its `admin` role — the bar for
 * adding a hub (accepting a hub device code, connecting a Kommunity Partner).
 *
 * Sourced from the memberships the Me query already fetched for the shell, so this
 * costs no extra request. `loading` is returned separately rather than folded into
 * a false: gating on it stops an admin from seeing an "ask an admin" flash before
 * their memberships arrive.
 */
export function useIsOrgAdmin(orgId?: string | null): { isAdmin: boolean; loading: boolean } {
  const user = useUser()
  const { data, loading } = useMeQuery({ skip: !user })

  const membership = data?.me?.memberships?.find((m) => m.organization.id === orgId)
  return { isAdmin: Boolean(orgId) && Boolean(membership?.organization.amIAdmin), loading }
}
