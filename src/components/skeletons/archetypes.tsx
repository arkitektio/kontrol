import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { cn } from "@/lib/utils"
import {
  SkeletonHeading,
  SkeletonListCard,
  SkeletonPageHeader,
  SkeletonRows,
  SkeletonStatCard,
  SkeletonTallCard,
} from "./Bones"

/**
 * Content-shaped loading states, one per page archetype. The sibling of
 * `@/components/status` — same idea, same `variant` axis, same single barrel.
 *
 * A skeleton must reproduce **the page's own wrapper**, not the layout's slot.
 * DetailLayout gives every page `flex flex-1 flex-col gap-4 p-4 pt-0` and the
 * page then adds its own padding inside that. If the skeleton skips it, content
 * jumps sideways the moment the real page swaps in, which reads as a bug rather
 * than as polish. That is what `variant="page"` supplies; `variant="embedded"`
 * omits it, for skeletons standing in for a section inside an already-rendered
 * page.
 */

export type SkeletonVariant = "page" | "embedded"

// Tailwind v4 scans source text, so grid classes must appear as whole literal
// strings — never assembled by interpolation, or the CSS is never generated.
const GRID_COLS = {
  2: "grid gap-4 md:grid-cols-2",
  3: "grid gap-4 md:grid-cols-2 lg:grid-cols-3",
  4: "grid gap-4 md:grid-cols-2 lg:grid-cols-4",
} as const

const CARDS = {
  list: SkeletonListCard,
  tall: SkeletonTallCard,
  stat: SkeletonStatCard,
} as const

/**
 * List/index pages: a header over a grid of cards. Covers Clients, Services,
 * Devices, Apps, Hubs, Releases, Memberships and friends.
 *
 * `header="pageHeader"` matches the 15 pages built on `PageHeader` (wrapper
 * `gap-8 p-6`); `header="heading"` matches the older `h2 text-3xl` pages
 * (wrapper `gap-4 p-4 pt-0`).
 */
export function ListPageSkeleton({
  header = "pageHeader",
  columns = 4,
  count = 6,
  card = "list",
  actions = false,
  variant = "page",
  className,
}: {
  header?: "pageHeader" | "heading" | "none"
  columns?: 2 | 3 | 4
  count?: number
  card?: keyof typeof CARDS
  actions?: boolean
  variant?: SkeletonVariant
  className?: string
}) {
  const CardShape = CARDS[card]
  const wrapper =
    variant === "embedded"
      ? undefined
      : header === "heading"
        ? "flex flex-1 flex-col gap-4 p-4 pt-0"
        : "flex flex-1 flex-col gap-8 p-6"

  return (
    <div className={cn(wrapper, className)}>
      {header === "pageHeader" ? <SkeletonPageHeader actions={actions} /> : null}
      {header === "heading" ? <SkeletonHeading /> : null}
      <div className={GRID_COLS[columns]}>
        {Array.from({ length: count }, (_, i) => (
          <CardShape key={i} />
        ))}
      </div>
    </div>
  )
}

/**
 * Detail pages: an avatar/title hero over N titled sections of bordered rows.
 * Matches the `container mx-auto py-10 space-y-6` family.
 */
export function DetailPageSkeleton({
  sections = 2,
  rows = 3,
  variant = "page",
  className,
}: {
  sections?: number
  rows?: number
  variant?: SkeletonVariant
  className?: string
}) {
  return (
    <div className={cn(variant === "page" && "container mx-auto space-y-6 py-10", className)}>
      <Card>
        <CardHeader className="flex flex-row items-center gap-4">
          <Skeleton className="size-16 shrink-0 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-8 w-56" />
            <Skeleton className="h-4 w-40" />
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {Array.from({ length: sections }, (_, i) => (
            <div key={i} className="space-y-2">
              <Skeleton className="h-5 w-28" />
              <SkeletonRows count={rows} />
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}

/**
 * A hero card over a grid of solid panels. This is `src/mesh/Machine.tsx` and
 * `src/mesh/AuthKey.tsx` generalised — those two pages already hand-rolled this
 * exact shape and are the house style everything else here follows.
 */
export function DetailCardSkeleton({
  panels = 2,
  columns = 2,
  panelHeight = "lg",
  variant = "page",
  className,
}: {
  panels?: number
  columns?: 2 | 3
  panelHeight?: "md" | "lg"
  variant?: SkeletonVariant
  className?: string
}) {
  return (
    <div className={cn(variant === "page" && "flex flex-1 flex-col gap-6 p-6", className)}>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Skeleton className="h-16 w-16 shrink-0 rounded-lg" />
            <div className="space-y-1">
              <Skeleton className="h-8 w-64" />
              <Skeleton className="h-4 w-48" />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className={GRID_COLS[columns]}>
            {Array.from({ length: panels }, (_, i) => (
              <Skeleton key={i} className={panelHeight === "lg" ? "h-40 w-full" : "h-24 w-full"} />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

/**
 * A stack of sibling cards under a heading. Two flavours: the account/settings
 * pages (`max-w-4xl mx-auto space-y-6` under a plain title) and the org pages
 * that pair `PageHeader` with stacked cards rather than a grid — Invites,
 * DangerZone, ReportPage, MyMembership.
 */
export function SettingsStackSkeleton({
  header = "title",
  cards = 3,
  rows = 3,
  variant = "page",
  className,
}: {
  header?: "pageHeader" | "title" | "none"
  cards?: number
  rows?: number
  variant?: SkeletonVariant
  className?: string
}) {
  const wrapper =
    variant === "embedded"
      ? undefined
      : header === "pageHeader"
        ? "flex flex-1 flex-col gap-8 p-6"
        : "mx-auto max-w-4xl space-y-6"

  return (
    <div className={cn(wrapper, className)}>
      {header === "pageHeader" ? <SkeletonPageHeader /> : null}
      {header === "title" ? <Skeleton className="h-9 w-64" /> : null}
      {Array.from({ length: cards }, (_, i) => (
        <Card key={i}>
          <CardHeader className="space-y-2">
            <Skeleton className="h-5 w-40" />
            <Skeleton className="h-4 w-72" />
          </CardHeader>
          <CardContent>
            <SkeletonRows count={rows} />
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

/** A section inside an already-rendered page (Hub sub-pages, Permissions). */
export function SectionSkeleton({
  rows = 3,
  columns = 3,
}: {
  rows?: number
  columns?: 2 | 3 | 4
}) {
  return (
    <section className="space-y-3">
      <Skeleton className="h-4 w-32" />
      <div className={GRID_COLS[columns]}>
        {Array.from({ length: rows }, (_, i) => (
          <SkeletonListCard key={i} />
        ))}
      </div>
    </section>
  )
}

/**
 * The two-pane consent card shared byte-for-byte by /configure, /hubconfigure
 * and /meshconfigure. These are embedded in a host application that passes
 * `?brand-hue=&theme=`, so the loading state has to look like the card that is
 * coming — not like a spinner, and certainly not like a full-screen Arkitekt
 * logo dropped into someone else's page.
 */
export function ConfigureCardSkeleton() {
  return (
    <div className="w-full max-w-3xl">
      <Card className="w-full gap-0 overflow-hidden border p-0 shadow-lg">
        <div className="grid md:grid-cols-[minmax(0,0.85fr)_minmax(0,1.3fr)]">
          <div className="bg-muted/30 flex flex-col gap-4 border-b p-6 md:border-r md:border-b-0">
            <Skeleton className="h-16 w-16 rounded-2xl" />
            <div className="space-y-2">
              <Skeleton className="h-5 w-32" />
              <Skeleton className="h-4 w-24" />
            </div>
          </div>
          <div className="space-y-5 p-6">
            <div className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-4/5" />
            </div>
            <div className="flex flex-wrap gap-2">
              <Skeleton className="h-6 w-24 rounded-full" />
              <Skeleton className="h-6 w-20 rounded-full" />
              <Skeleton className="h-6 w-28 rounded-full" />
            </div>
            <SkeletonRows count={2} />
            <div className="flex gap-3">
              <Skeleton className="h-10 flex-1" />
              <Skeleton className="h-10 w-28" />
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}

/** A single narrow centred card — auth forms, invite preview. */
export function CenteredCardSkeleton({ rows = 3 }: { rows?: number }) {
  return (
    <div className="flex w-full justify-center">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-2">
          <Skeleton className="h-6 w-40" />
          <Skeleton className="h-4 w-56" />
        </CardHeader>
        <CardContent className="space-y-4">
          {Array.from({ length: rows }, (_, i) => (
            <Skeleton key={i} className="h-10 w-full" />
          ))}
        </CardContent>
      </Card>
    </div>
  )
}

/**
 * The signed-out auth forms (login, signup), which are NOT in a card — they sit
 * directly on the page background, centred by LandingLayout's `center` prop. So
 * this reproduces only the form's own wrapper: a capped measure, a centred
 * heading pair, labelled fields with their descriptions, and the submit button.
 *
 * Two fields, not three: signup's confirm-password field starts folded and only
 * unfolds once a password has been entered, so a third field here would settle
 * into an empty gap.
 */
export function AuthFormSkeleton({ fields = 2 }: { fields?: number }) {
  return (
    <div className="w-full max-w-sm space-y-8">
      <div className="flex flex-col items-center space-y-2">
        <Skeleton className="h-8 w-52" />
        <Skeleton className="h-4 w-64" />
      </div>

      <div className="space-y-4">
        {Array.from({ length: fields }, (_, i) => (
          <div key={i} className="space-y-2">
            <Skeleton className="h-3.5 w-20" />
            <Skeleton className="h-9 w-full" />
            <Skeleton className="h-3 w-2/5" />
          </div>
        ))}
        <Skeleton className="mt-2 h-10 w-full" />
      </div>

      <div className="flex justify-center">
        <Skeleton className="h-3.5 w-48" />
      </div>
    </div>
  )
}

/** Banner + overlapping avatar, for Profile and OrganizationProfile. */
export function ProfilePageSkeleton() {
  return (
    <div className="container mx-auto space-y-6 py-0">
      <Skeleton className="h-64 w-full rounded-xl" />
      <div className="-mt-20 flex items-end gap-6 px-6">
        <Skeleton className="h-40 w-40 shrink-0 rounded-full" />
        <div className="space-y-2 pb-4">
          <Skeleton className="h-10 w-64" />
          <Skeleton className="h-4 w-40" />
        </div>
      </div>
      <div className="container mx-auto max-w-4xl space-y-6 px-6">
        <div className="grid gap-6 md:grid-cols-2">
          <Skeleton className="h-40 w-full rounded-xl" />
          <Skeleton className="h-40 w-full rounded-xl" />
        </div>
      </div>
    </div>
  )
}

/**
 * The organization overview at rest: its row of three stat tiles. The blocks
 * above them (join requests, apps needing attention) only exist while something
 * is waiting, so they are not part of the skeleton.
 */
export function DashboardSkeleton() {
  return (
    <div className="flex flex-1 flex-col gap-6 p-6">
      <SkeletonPageHeader actions />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Skeleton className="h-24 w-full rounded-xl" />
        <Skeleton className="h-24 w-full rounded-xl" />
        <Skeleton className="h-24 w-full rounded-xl" />
      </div>
    </div>
  )
}
