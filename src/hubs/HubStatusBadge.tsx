import { Badge } from "@/components/ui/badge"

/**
 * Liveness of a hub. `online`: its own health callback (offline once it misses three
 * reports). `reachable`: lok's own probe of its public aliases, which only counts an
 * answer signed with the instance's key — so a hosted hub that never reports itself
 * still shows up, and an impostor at its address does not.
 */
export function HubStatusBadge({
  online,
  healthy,
  reachable,
}: {
  online: boolean
  healthy?: boolean | null
  reachable?: boolean | null
}) {
  const [label, dot, title] = online
    ? healthy === false
      ? ["Unhealthy", "bg-destructive", "The hub reported itself unhealthy."]
      : ["Online", "bg-green-500", "The hub reports its health to lok."]
    : reachable
      ? ["Reachable", "bg-green-500", "The hub does not report itself, but lok verified its public endpoints (signed challenge)."]
      : ["Offline", "bg-muted-foreground", "Neither reported by the hub nor verified by lok recently."]
  return (
    <Badge variant="outline" className="text-xs gap-1.5" title={title}>
      <span className={`h-2 w-2 rounded-full ${dot}`} aria-hidden />
      {label}
    </Badge>
  )
}
