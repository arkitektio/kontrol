import { useEffect } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { useListOrganizationsQuery, type ListOrganizationFragment } from "@/api/graphql"
import { useUser } from "@/auth"

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
  activeOrg: ListOrganizationFragment | null
  organizations: ListOrganizationFragment[]
  /** True while the org list is still loading — gate redirects on this. */
  loading: boolean
  /** Switch the active org: persist it and navigate into its dashboard. */
  setActiveOrg: (id: string) => void
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

  const { data, loading } = useListOrganizationsQuery({ skip: !user })
  const organizations = data?.organizations ?? []

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

  return { activeOrgId, activeOrg, organizations, loading, setActiveOrg }
}
