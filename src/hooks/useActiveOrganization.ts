import { useEffect } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { useMeQuery } from "@/api/graphql"
import { useUser } from "@/auth"

/** Minimal org shape the shell needs — sourced from the already-fetched Me query. */
export interface OrgSummary {
  id: string
  name?: string | null
  slug: string
  brandHue?: number | null
}

const STORAGE_KEY = "kontrol-active-org"

function readStored(): string | null {
  try {
    return localStorage.getItem(STORAGE_KEY)
  } catch {
    return null
  }
}

function writeStored(id: string) {
  try {
    localStorage.setItem(STORAGE_KEY, id)
  } catch {
    /* ignore */
  }
}

/** Pull the organization id out of an `/organization/:id/...` path, if any. */
function orgIdFromPath(pathname: string): string | null {
  const parts = pathname.split("/")
  const i = parts.indexOf("organization")
  return i !== -1 && parts[i + 1] ? parts[i + 1] : null
}

export interface ActiveOrganization {
  /** The resolved active org id, or null when the user has no memberships. */
  activeOrgId: string | null
  activeOrg: OrgSummary | null
  organizations: OrgSummary[]
  /** True while the org list is still loading — gate redirects on this. */
  loading: boolean
  /** Switch the active org: persist it and navigate into its dashboard. */
  setActiveOrg: (id: string) => void
  /**
   * The brand hue that should tint an org: the member's personal override for
   * that org → the org's default → null. Mirrors MembershipHueSync's precedence.
   */
  effectiveHueForOrg: (orgId: string | null | undefined) => number | null
}

/**
 * Resolves which organization the app should treat as active. Precedence:
 * the org in the current URL → the last-used org from localStorage → the first
 * membership. Returns null (not a broken id) when the user has no orgs. A stored
 * id that is no longer among the user's memberships is ignored, so leaving an
 * org can't strand the sidebar on a dead workspace.
 */
export function useActiveOrganization(): ActiveOrganization {
  const user = useUser()
  const location = useLocation()
  const navigate = useNavigate()

  // Sourced from Me (already fetched by the sidebar) rather than a separate
  // ListOrganizations request — the memberships carry the org list *and* the
  // per-membership brand hue, so this both de-duplicates a query and gives us
  // effective hues for free.
  const { data, loading } = useMeQuery({ skip: !user })
  const memberships = data?.me?.memberships ?? []
  const organizations: OrgSummary[] = memberships.map((m) => ({
    id: m.organization.id,
    name: m.organization.name,
    slug: m.organization.slug,
    brandHue: m.organization.brandHue,
  }))

  function effectiveHueForOrg(orgId: string | null | undefined): number | null {
    if (!orgId) return null
    const m = memberships.find((mem) => mem.organization.id === orgId)
    if (!m) return null
    return m.brandHue ?? m.organization.brandHue ?? null
  }

  const urlOrgId = orgIdFromPath(location.pathname)

  // Remember the org we're actively viewing so it becomes the default elsewhere.
  useEffect(() => {
    if (urlOrgId) writeStored(urlOrgId)
  }, [urlOrgId])

  let activeOrgId: string | null = null
  if (organizations.length > 0) {
    const ids = new Set(organizations.map((o) => o.id))
    const stored = readStored()
    if (urlOrgId && ids.has(urlOrgId)) activeOrgId = urlOrgId
    else if (stored && ids.has(stored)) activeOrgId = stored
    else activeOrgId = organizations[0].id
  }

  const activeOrg = organizations.find((o) => o.id === activeOrgId) ?? null

  function setActiveOrg(id: string) {
    writeStored(id)
    navigate(`/organization/${id}`)
  }

  return { activeOrgId, activeOrg, organizations, loading, setActiveOrg, effectiveHueForOrg }
}
