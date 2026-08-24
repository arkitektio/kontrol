import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

/**
 * The low-level shapes the archetypes are assembled from. Internal to this
 * module — pages import the archetypes, never these.
 *
 * Two constraints govern everything in here:
 *
 * 1. **Deterministic.** These render at build time (scripts/prerender.mjs uses
 *    react-dom/static) and again on hydration, so every width is a literal
 *    class. No Math.random, no Date.now. `SidebarMenuSkeleton` in ui/sidebar.tsx
 *    randomises its widths, which is exactly why it is unused.
 * 2. **Dependency-light.** RouteSkeleton is reachable from DetailLayout, which
 *    Router.tsx imports statically, so this whole tree lands in the entry chunk.
 *    Only Skeleton/Card/Separator are allowed — no lucide icons, no Avatar.
 *    (The PageHeader icon is already a plain muted tile, so a Skeleton matches it
 *    exactly; an Avatar is just a rounded-full box.)
 */

/** Mirrors `src/components/PageHeader.tsx` measurement for measurement. */
export function SkeletonPageHeader({ actions = false }: { actions?: boolean }) {
  return (
    <>
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Skeleton className="h-14 w-14 shrink-0 rounded-lg" />
          <div className="space-y-2">
            <Skeleton className="h-7 w-48" />
            <Skeleton className="h-4 w-72" />
          </div>
        </div>
        {actions ? <Skeleton className="h-9 w-32 shrink-0" /> : null}
      </div>
      <Separator />
    </>
  )
}

/** The `h2 text-3xl` heading the older list pages use instead of PageHeader. */
export function SkeletonHeading() {
  return (
    <div className="flex items-center justify-between space-y-2">
      <Skeleton className="h-9 w-56" />
    </div>
  )
}

/**
 * The card the list pages inline: a title/avatar row over a badge and one or two
 * muted lines. Content-height (`h-full`), like the real one.
 */
export function SkeletonListCard() {
  return (
    <Card className="h-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="size-8 shrink-0 rounded-full" />
      </CardHeader>
      <CardContent className="space-y-2">
        <Skeleton className="h-5 w-20 rounded-full" />
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-2/3" />
      </CardContent>
    </Card>
  )
}

/** Matches the fixed `h-40` ClientCard / ServiceInstanceCard. */
export function SkeletonTallCard() {
  return <Skeleton className="h-40 w-full rounded-xl" />
}

/** A labelled figure, for dashboard stat tiles. */
export function SkeletonStatCard() {
  return (
    <Card className="h-full">
      <CardContent className="space-y-3">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-8 w-16" />
      </CardContent>
    </Card>
  )
}

/** The `grid gap-2` bordered rows detail pages use inside each section. */
export function SkeletonRows({ count = 3 }: { count?: number }) {
  return (
    <div className="grid gap-2">
      {Array.from({ length: count }, (_, i) => (
        <div key={i} className="flex items-center justify-between rounded-md border p-3">
          <Skeleton className="h-4 w-40" />
          <Skeleton className="h-4 w-24" />
        </div>
      ))}
    </div>
  )
}
