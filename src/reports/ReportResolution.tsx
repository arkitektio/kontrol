import { useState } from "react"
import type { ApolloCache } from "@apollo/client"
import { formatDistanceToNow } from "date-fns"
import { CheckCircle2, RotateCcw, ShieldCheck } from "lucide-react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  useResolveReportMutation,
  useUnresolveReportMutation,
} from "@/graphql/mutations/report.generated"
import type { ListReportFragment } from "@/graphql/fragments/report.generated"

function timeAgo(iso?: string | null): string {
  if (!iso) return "unknown"
  try {
    return formatDistanceToNow(new Date(iso), { addSuffix: true })
  } catch {
    return "unknown"
  }
}

/**
 * Acknowledging a report is triage, not repair: the backend deliberately leaves
 * `client.functional` alone, so what the client actually said stays on the
 * record. What it changes is attention — resolving a client's latest report
 * takes it off the dashboard's "apps reporting problems" list until the client
 * reports again. The copy here has to carry that distinction, or people will
 * read the button as "mark this app healthy".
 */
export function ResolveReportAction({ report }: { report: ListReportFragment }) {
  const [open, setOpen] = useState(false)
  const [note, setNote] = useState("")
  // Resolving returns only the ManagementReport, which Apollo normalises by id —
  // enough to update this page, but the dashboard's action list is a *filtered
  // root field* (`clients(filters: {functional: false, latestReportResolved:
  // false})`) and the cache has no way to know that list changed. Without this
  // eviction the client is still listed when you navigate back. Evicting the
  // root field rather than naming queries covers all four useClientsQuery call
  // sites (dashboard, Home, Clients, HubClients) whatever filters they pass.
  const evictClientLists = (cache: ApolloCache<unknown>) => {
    cache.evict({ id: "ROOT_QUERY", fieldName: "clients" })
    cache.gc()
  }

  const [resolve, { loading: resolving }] = useResolveReportMutation({ update: evictClientLists })
  const [unresolve, { loading: reopening }] = useUnresolveReportMutation({ update: evictClientLists })

  const onResolve = async () => {
    try {
      await resolve({ variables: { id: report.id, note: note.trim() || null } })
      toast.success("Report marked as resolved")
      setOpen(false)
      setNote("")
    } catch (e) {
      toast.error("Could not resolve report: " + (e as Error).message)
    }
  }

  const onReopen = async () => {
    try {
      await unresolve({ variables: { id: report.id } })
      toast.success("Report reopened")
    } catch (e) {
      toast.error("Could not reopen report: " + (e as Error).message)
    }
  }

  if (report.isResolved) {
    return (
      <div className="flex flex-wrap items-start justify-between gap-4 rounded-lg border border-green-500/40 bg-green-500/5 p-4">
        <div className="flex items-start gap-3">
          <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-green-600 dark:text-green-400" />
          <div className="space-y-1">
            <div className="text-sm font-medium text-green-700 dark:text-green-400">
              Resolved{report.resolvedBy ? ` by ${report.resolvedBy.username}` : ""} {timeAgo(report.resolvedAt)}
            </div>
            {report.resolutionNote ? (
              <p className="text-muted-foreground text-sm italic">“{report.resolutionNote}”</p>
            ) : (
              <p className="text-muted-foreground text-sm">No note was left.</p>
            )}
            <p className="text-muted-foreground text-xs">
              This client is off the dashboard's action list until it reports again.
            </p>
          </div>
        </div>
        <Button variant="outline" size="sm" onClick={onReopen} disabled={reopening}>
          <RotateCcw className="mr-2 h-4 w-4" />
          Reopen
        </Button>
      </div>
    )
  }

  return (
    <>
      <Button size="sm" onClick={() => setOpen(true)}>
        <CheckCircle2 className="mr-2 h-4 w-4" />
        Mark as resolved
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Mark this report as resolved</DialogTitle>
            <DialogDescription>
              This records that you have triaged the report and takes the client off the
              dashboard's action list. It does not change what the client reported — if the
              client reports a problem again, it comes straight back.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-2">
            <Label htmlFor="resolution-note">Note (optional)</Label>
            <Textarea
              id="resolution-note"
              placeholder="e.g. known — waiting on a DNS change"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              rows={3}
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button onClick={onResolve} disabled={resolving}>
              {resolving ? "Resolving…" : "Mark as resolved"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
