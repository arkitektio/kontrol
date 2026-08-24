import { ListPageSkeleton } from "./archetypes"

/**
 * The fallback for the route-level <Suspense> inside DetailLayout — what fills
 * the content area while a lazy page chunk is still downloading.
 *
 * Deliberately generic. The boundary lives in the layout, which cannot know
 * whether the incoming route is a list or a detail page, and this state is only
 * visible on a cold load or hard refresh (react-router wraps in-app navigation
 * in startTransition, so an already-mounted boundary keeps the previous page
 * instead of flipping to a fallback). The plurality archetype — a header over a
 * card grid — is the right default; each page then renders its exact archetype
 * from its own Apollo `loading` branch, which is where the real waiting is.
 *
 * If per-route fidelity is ever wanted, the additive upgrade is a
 * `handle: { skeleton: 'detail' }` on each route read here through
 * `useMatches()`; `handle` is currently unused in this codebase.
 */
export function RouteSkeleton() {
  return <ListPageSkeleton count={6} columns={4} />
}
