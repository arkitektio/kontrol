import type { LucideIcon } from "lucide-react"
import type { ReactNode } from "react"
import { Separator } from "./ui/separator"

/**
 * The standard title section for organization-scoped pages: an icon in a rounded
 * muted tile, a title, and an optional description — with an optional actions slot
 * on the right (e.g. a create button). Extracted from the Mesh page so every
 * org subpage shares the same header, including the separator beneath it. Render
 * it as the first child of a padded `flex flex-1 flex-col gap-8 p-6` page wrapper
 * so the header, separator, and content share the same rhythm everywhere.
 */
export function PageHeader({
  icon: Icon,
  title,
  description,
  actions,
}: {
  icon: LucideIcon
  title: ReactNode
  description?: ReactNode
  actions?: ReactNode
}) {
  return (
    <>
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-lg bg-muted">
            <Icon className="h-7 w-7" />
          </div>
          <div className="space-y-1">
            <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
            {description ? (
              <p className="text-sm text-muted-foreground">{description}</p>
            ) : null}
          </div>
        </div>
        {actions ? <div className="flex items-center gap-2 shrink-0">{actions}</div> : null}
      </div>
      <Separator />
    </>
  )
}
