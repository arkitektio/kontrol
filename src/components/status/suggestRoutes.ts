/**
 * "Did you mean …" for route 404s. Known navigable routes are scored against
 * the requested path with a normalised edit distance plus a bonus when the
 * last path segment matches, so `/servces` → `/services` and
 * `/organization/<id>/member` → `…/members`.
 */

export interface RouteSuggestion {
  path: string
  label: string
}

const GLOBAL_ROUTES: RouteSuggestion[] = [
  { path: "/home", label: "Home" },
  { path: "/profile", label: "Your profile" },
  { path: "/services", label: "Services" },
  { path: "/service-releases", label: "Service releases" },
  { path: "/service-instance-mappings", label: "Service instance mappings" },
  { path: "/instance-aliases", label: "Instance aliases" },
  { path: "/apps", label: "Apps" },
  { path: "/releases", label: "Releases" },
  { path: "/devices", label: "Devices" },
  { path: "/account/login", label: "Sign in" },
  { path: "/account/signup", label: "Sign up" },
  { path: "/account/email", label: "Email addresses" },
  { path: "/account/password/change", label: "Change password" },
  { path: "/account/2fa", label: "Two-factor authentication" },
  { path: "/account/sessions", label: "Sessions" },
  { path: "/account/providers", label: "Connected accounts" },
]

const ORG_ROUTES: Array<{ suffix: string; label: string }> = [
  { suffix: "", label: "Organization overview" },
  { suffix: "/profile", label: "Organization profile" },
  { suffix: "/me", label: "My access" },
  { suffix: "/members", label: "Members" },
  { suffix: "/invites", label: "Invites" },
  { suffix: "/rolesets", label: "Role sets" },
  { suffix: "/danger-zone", label: "Organization settings" },
  { suffix: "/hubs", label: "Hubs" },
  { suffix: "/mesh", label: "Mesh" },
  { suffix: "/devices", label: "Devices" },
  { suffix: "/clients", label: "Clients" },
  { suffix: "/services", label: "Services" },
  { suffix: "/service-instances", label: "Service instances" },
  { suffix: "/service-instance-mappings", label: "Service instance mappings" },
  { suffix: "/redeem-tokens", label: "Redeem tokens" },
  { suffix: "/permissions", label: "Permissions" },
  { suffix: "/partners", label: "Partners" },
]

function levenshtein(a: string, b: string): number {
  if (a === b) return 0
  if (!a.length) return b.length
  if (!b.length) return a.length
  let prev = Array.from({ length: b.length + 1 }, (_, i) => i)
  for (let i = 1; i <= a.length; i++) {
    const cur = [i]
    for (let j = 1; j <= b.length; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1
      cur[j] = Math.min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + cost)
    }
    prev = cur
  }
  return prev[b.length]
}

function similarity(a: string, b: string): number {
  const max = Math.max(a.length, b.length)
  if (max === 0) return 1
  return 1 - levenshtein(a, b) / max
}

export function suggestRoutes(
  pathname: string,
  { orgId, limit = 3, threshold = 0.55 }: { orgId?: string | null; limit?: number; threshold?: number } = {},
): RouteSuggestion[] {
  const requested = pathname.replace(/\/+$/, "").toLowerCase() || "/"
  const lastSeg = requested.split("/").filter(Boolean).pop() ?? ""

  const candidates: RouteSuggestion[] = [...GLOBAL_ROUTES]
  if (orgId) {
    for (const r of ORG_ROUTES) candidates.push({ path: `/organization/${orgId}${r.suffix}`, label: r.label })
  }

  const scored = candidates
    .map((c) => {
      const path = c.path.toLowerCase()
      const candLast = path.split("/").filter(Boolean).pop() ?? ""
      let score = similarity(requested, path)
      // Segment-level match is a strong signal: `/members` vs `/organization/x/members`.
      if (lastSeg && candLast) score = Math.max(score, similarity(lastSeg, candLast) * 0.9)
      if (lastSeg && candLast === lastSeg) score = Math.max(score, 0.95)
      return { ...c, score }
    })
    .filter((c) => c.score >= threshold && c.path !== requested)
    .sort((a, b) => b.score - a.score)

  // De-dupe by label so the global and org "Services" don't both show up.
  const seen = new Set<string>()
  const out: RouteSuggestion[] = []
  for (const s of scored) {
    if (seen.has(s.label)) continue
    seen.add(s.label)
    out.push({ path: s.path, label: s.label })
    if (out.length >= limit) break
  }
  return out
}
