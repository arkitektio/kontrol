import type { LucideIcon } from "lucide-react"
import type { ReactNode } from "react"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "./ui/empty"

/**
 * Empty state for a searchable list page. With an active `search` it says nothing
 * matched (the list isn't empty, the filter is); otherwise it shows `title` /
 * `description` and an optional call to action.
 */
export function ListEmpty({
  icon: Icon,
  title,
  description,
  search,
  action,
}: {
  icon: LucideIcon
  title: ReactNode
  description?: ReactNode
  search?: string
  action?: ReactNode
}) {
  const searching = Boolean(search?.trim())
  return (
    <Empty className="border">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <Icon />
        </EmptyMedia>
        <EmptyTitle>{searching ? "No matches" : title}</EmptyTitle>
        <EmptyDescription>
          {searching ? `Nothing matches “${search?.trim()}”. Try a different search.` : description}
        </EmptyDescription>
      </EmptyHeader>
      {!searching && action ? <EmptyContent>{action}</EmptyContent> : null}
    </Empty>
  )
}
