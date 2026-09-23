import { Loader2 } from "lucide-react"
import { Button } from "./ui/button"

/**
 * "Load more" footer for offset-paginated lists. Renders nothing once the last
 * page came back short (`hasMore` false).
 */
export function LoadMore({
  hasMore,
  loading,
  onLoadMore,
}: {
  hasMore: boolean
  loading?: boolean
  onLoadMore: () => void
}) {
  if (!hasMore) return null
  return (
    <div className="flex justify-center">
      <Button variant="outline" onClick={onLoadMore} disabled={loading}>
        {loading ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : null}
        {loading ? "Loading…" : "Load more"}
      </Button>
    </div>
  )
}
