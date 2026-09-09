import { matchPath } from "react-router"

/**
 * The set of path patterns the router can actually navigate to.
 *
 * Why a registry rather than importing the route tree where it is needed:
 * `Router.tsx` statically imports the layouts, and the layouts render
 * `RouteBreadcrumbs` — so a component reaching back for `createRoutes()` would
 * close an import cycle, which `scripts/check-chunk-cycles.mjs` fails the build
 * on. Inverting the dependency keeps every edge one-way (Router -> registry,
 * consumer -> registry) and, because the list is derived from the real tree
 * rather than hand-maintained, it cannot drift when a route is renamed.
 *
 * This module must not import app code.
 */

type RouteLike = {
  path?: string
  children?: RouteLike[]
}

let patterns: string[] = []

function joinPath(parent: string, child: string | undefined): string {
  if (child === undefined) return parent // pathless layout route: inherits its parent
  if (child.startsWith("/")) return child // absolute child: ignores the parent prefix
  if (child === "") return parent
  return (parent === "/" ? "" : parent).replace(/\/$/, "") + "/" + child
}

function collect(routes: RouteLike[], parent: string, into: string[]) {
  for (const route of routes) {
    const full = joinPath(parent, route.path)
    // The catch-all is what every dead link already resolves to, so counting it
    // as a match would make every path look navigable.
    if (route.path !== undefined && route.path !== "*") into.push(full)
    if (route.children) collect(route.children, full, into)
  }
}

/** Called by the router once the tree is built. Idempotent. */
export function registerRoutes(routes: RouteLike[]) {
  const collected: string[] = []
  collect(routes, "/", collected)
  patterns = [...new Set(collected)]
}

/**
 * Whether a concrete pathname resolves to a declared route (parameters
 * included, so `/organization/<uuid>` matches `/organization/:orgId`).
 *
 * If the registry was never populated this reports `true` for everything, so
 * the caller falls back to the old "link every crumb" behaviour. That is the
 * safe direction: the alternative failure mode turns EVERY breadcrumb into
 * dead text at once, with nothing raised to say why. In practice the list is
 * always populated — consumers render inside the router, which cannot mount
 * before Router.tsx has built the tree.
 */
export function isNavigablePath(pathname: string): boolean {
  if (patterns.length === 0) return true
  const clean = pathname.split("?")[0].replace(/\/$/, "") || "/"
  return patterns.some((pattern) => matchPath(pattern, clean) !== null)
}

/** Exposed for debugging; the array is a copy so callers cannot mutate it. */
export function navigablePaths(): string[] {
  return [...patterns]
}
