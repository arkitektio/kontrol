import { useState } from "react"
import { CheckCircle2, ExternalLink, Github, RotateCcw, Trash2 } from "lucide-react"
import { useNavigate } from "react-router-dom"
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
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import type { DetailBugReportFragment } from "@/graphql/fragments/bug_report.generated"
import {
  useDeleteBugReportMutation,
  useForwardBugReportMutation,
  useResolveBugReportMutation,
  useUnresolveBugReportMutation,
} from "@/graphql/mutations/bug_report.generated"
import { toastError } from "@/lib/errors"
import { bugReportIssueUrl } from "./issue"

/**
 * What an owner or admin does with a report: close it (with a note), reopen
 * it, pass it on to the tracker of the app it came from, or delete it.
 *
 * Forwarding files nothing by itself: it opens the app's issue page prefilled
 * from the report, and afterwards asks for the link of the issue that was
 * created, so the report says where it went.
 */
export function BugReportTriage({ report }: { report: DetailBugReportFragment }) {
  const navigate = useNavigate()
  const [resolveOpen, setResolveOpen] = useState(false)
  const [forwardOpen, setForwardOpen] = useState(false)
  const [deleteOpen, setDeleteOpen] = useState(false)
  const [note, setNote] = useState("")
  const [issueLink, setIssueLink] = useState("")

  const evictLists = {
    update: (cache: { evict: (o: { id: string; fieldName: string }) => unknown; gc: () => unknown }) => {
      // The lists are filtered root fields (open / resolved): the cache cannot
      // know a report moved from one to the other.
      cache.evict({ id: "ROOT_QUERY", fieldName: "bugReports" })
      cache.gc()
    },
  }
  const [resolve, { loading: resolving }] = useResolveBugReportMutation(evictLists)
  const [unresolve, { loading: reopening }] = useUnresolveBugReportMutation(evictLists)
  const [forward, { loading: forwarding }] = useForwardBugReportMutation(evictLists)
  const [remove, { loading: deleting }] = useDeleteBugReportMutation(evictLists)

  const issueUrl = bugReportIssueUrl(report)

  const onResolve = async () => {
    try {
      await resolve({ variables: { id: report.id, note: note.trim() || null } })
      setResolveOpen(false)
      setNote("")
    } catch (e) {
      toastError(e, "Couldn't resolve the report")
    }
  }

  const onReopen = async () => {
    try {
      await unresolve({ variables: { id: report.id } })
    } catch (e) {
      toastError(e, "Couldn't reopen the report")
    }
  }

  const startForward = () => {
    if (!issueUrl) return
    window.open(issueUrl, "_blank", "noopener")
    setIssueLink(report.forwardedUrl ?? "")
    setForwardOpen(true)
  }

  const onForwarded = async () => {
    try {
      await forward({ variables: { id: report.id, url: issueLink.trim() || null } })
      setForwardOpen(false)
    } catch (e) {
      toastError(e, "Couldn't mark the report as forwarded")
    }
  }

  const onDelete = async () => {
    try {
      await remove({ variables: { id: report.id } })
      toast.success("Bug report deleted")
      navigate(`/organization/${report.organization.id}/bug-reports`)
    } catch (e) {
      toastError(e, "Couldn't delete the report")
    }
  }

  return (
    <>
      <div className="flex flex-wrap items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={startForward}
          disabled={!issueUrl}
          title={issueUrl ? undefined : "This app did not declare where its issues go"}
        >
          <Github className="mr-2 h-4 w-4" />
          {report.forwardedAt ? "Forward again" : "Forward to GitHub"}
        </Button>
        {report.forwardedUrl ? (
          <Button variant="outline" size="sm" asChild>
            <a href={report.forwardedUrl} target="_blank" rel="noreferrer noopener">
              <ExternalLink className="mr-2 h-4 w-4" />
              Open the issue
            </a>
          </Button>
        ) : null}
        {report.isResolved ? (
          <Button variant="outline" size="sm" onClick={onReopen} disabled={reopening}>
            <RotateCcw className="mr-2 h-4 w-4" />
            Reopen
          </Button>
        ) : (
          <Button size="sm" onClick={() => setResolveOpen(true)}>
            <CheckCircle2 className="mr-2 h-4 w-4" />
            Resolve
          </Button>
        )}
        <Button variant="ghost" size="sm" onClick={() => setDeleteOpen(true)}>
          <Trash2 className="mr-2 h-4 w-4" />
          Delete
        </Button>
      </div>

      <Dialog open={resolveOpen} onOpenChange={setResolveOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Resolve this report</DialogTitle>
            <DialogDescription>It leaves the list of open reports. It can be reopened.</DialogDescription>
          </DialogHeader>
          <div className="space-y-2">
            <Label htmlFor="bug-report-note">Note (optional)</Label>
            <Textarea
              id="bug-report-note"
              placeholder="e.g. fixed in 6.0.2"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              rows={3}
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setResolveOpen(false)}>
              Cancel
            </Button>
            <Button onClick={onResolve} disabled={resolving}>
              {resolving ? "Resolving…" : "Resolve"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={forwardOpen} onOpenChange={setForwardOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Did you file the issue?</DialogTitle>
            <DialogDescription>
              The app's issue page opened in a new tab, filled in from this report. The screenshot does not
              travel with it: attach it there by hand if it is needed. Once the issue exists, paste its link
              here so the report says where it went.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-2">
            <Label htmlFor="bug-report-issue">Link to the issue (optional)</Label>
            <Input
              id="bug-report-issue"
              placeholder="https://github.com/…/issues/…"
              value={issueLink}
              onChange={(e) => setIssueLink(e.target.value)}
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setForwardOpen(false)}>
              Not filed
            </Button>
            <Button onClick={onForwarded} disabled={forwarding}>
              {forwarding ? "Saving…" : "Mark as forwarded"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={deleteOpen} onOpenChange={setDeleteOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete this report?</DialogTitle>
            <DialogDescription>
              The report, its screenshot and everything the app recorded with it are removed. This cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={onDelete} disabled={deleting}>
              {deleting ? "Deleting…" : "Delete"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
