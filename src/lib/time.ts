import { formatDistanceToNow } from "date-fns"

/** "3 minutes ago"; "never" for a missing timestamp, "unknown" for an unparsable one. */
export function timeAgo(iso?: string | null): string {
  if (!iso) return "never"
  try {
    return formatDistanceToNow(new Date(iso), { addSuffix: true })
  } catch {
    return "unknown"
  }
}

/** Locale date + time, or "" for a missing/unparsable timestamp. */
export function absoluteTime(iso?: string | null): string {
  if (!iso) return ""
  const date = new Date(iso)
  return Number.isNaN(date.getTime()) ? "" : date.toLocaleString()
}
