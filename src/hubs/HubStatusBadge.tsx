import { Badge } from "@/components/ui/badge"

/** Liveness of a hub from its health callback: offline once it misses three reports. */
export function HubStatusBadge({ online, healthy }: { online: boolean; healthy?: boolean | null }) {
  const [label, dot] = !online
    ? ["Offline", "bg-muted-foreground"]
    : healthy === false
      ? ["Unhealthy", "bg-destructive"]
      : ["Online", "bg-green-500"]
  return (
    <Badge variant="outline" className="text-xs gap-1.5">
      <span className={`h-2 w-2 rounded-full ${dot}`} aria-hidden />
      {label}
    </Badge>
  )
}
