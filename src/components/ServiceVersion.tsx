import { AlertTriangle, CheckCircle2, HelpCircle, Hammer } from "lucide-react"
import { Badge } from "./ui/badge"
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip"
import { cn } from "@/lib/utils"

/** A service release of no known version: lok keeps `0+local` until the hub reports one. */
export const isLocalVersion = (version?: string | null) => !version || version.includes("+local")

const display = (version: string) => (/^\d/.test(version) ? `v${version}` : version)

/** The version a service instance runs: `v12.1.0`, or "local build" when nobody has said. */
export function ServiceVersionBadge({ version, className }: { version?: string | null; className?: string }) {
  if (isLocalVersion(version)) {
    return (
      <Tooltip>
        <TooltipTrigger asChild>
          <Badge variant="outline" className={cn("text-muted-foreground border-dashed text-xs font-normal", className)}>
            <Hammer /> local build
          </Badge>
        </TooltipTrigger>
        <TooltipContent className="max-w-64">
          No release version is known for this service yet. It is filled in once its hub reports
          which version it runs. Version requirements are not checked until then.
        </TooltipContent>
      </Tooltip>
    )
  }
  return (
    <Badge variant="secondary" className={cn("font-mono text-xs", className)} title={`Runs ${version}`}>
      {display(version!)}
    </Badge>
  )
}

type Check = {
  /** The app's version specifier for this service (`>=12.1,<14`). */
  wants?: string | null
  /** lok's verdict: true / false, null when the running version or the specifier is unknown. */
  satisfied?: boolean | null
  /** What the instance runs, for the explanation. */
  running?: string | null
  className?: string
}

/** Whether the service an app is connected to is within the versions the app was written for.
 *  Advisory: lok hands the instance out either way, so this is a small note, never an error. */
export function VersionCheck({ wants, satisfied, running, className }: Check) {
  if (!wants) return null
  const runs = isLocalVersion(running) ? "an unknown version (local build)" : display(running!)

  const [Icon, tone, label, explain] =
    satisfied === true
      ? [CheckCircle2, "text-green-600 dark:text-green-500", `meets ${wants}`, `Runs ${runs}, within ${wants}.`]
      : satisfied === false
        ? [
            AlertTriangle,
            "text-amber-600 dark:text-amber-400",
            `wants ${wants}, runs ${display(running ?? "?")}`,
            `The app was written for ${wants}, but the service runs ${runs}. It is connected anyway; some features may not work.`,
          ]
        : [HelpCircle, "text-muted-foreground", `wants ${wants}`, `The app was written for ${wants}. The service runs ${runs}, so this can't be checked.`]

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <span className={cn("inline-flex items-center gap-1 text-xs font-mono", tone, className)}>
          <Icon className="h-3 w-3 shrink-0" />
          {label}
        </span>
      </TooltipTrigger>
      <TooltipContent className="max-w-64">{explain}</TooltipContent>
    </Tooltip>
  )
}

/** Count of mappings whose service is outside what the app asked for. */
export const unmetVersions = (mappings: { satisfied?: boolean | null }[] | null | undefined) =>
  (mappings ?? []).filter((m) => m.satisfied === false).length
