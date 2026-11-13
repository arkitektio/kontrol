import { useState } from "react"
import { CheckCircle2, ExternalLink, Github, RotateCcw, Trash2 } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
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
  useFileBugReportIssueMutation,
  useForwardBugReportMutation,
  useResolveBugReportMutation,
  useUnresolveBugReportMutation,
} from "@/graphql/mutations/bug_report.generated"
import { useBugReportGithubForwardingLazyQuery } from "@/graphql/queries/bug_report.generated"
import { toastError } from "@/lib/errors"
import { bugReportIssueUrl } from "./issue"

/**
 * What an owner or admin does with a report: close it (with a note), reopen
 * it, pass it on to the tracker of the app it came from, or delete it.
 *
 * Forwarding goes one of two ways. Where lok's GitHub App is installed on the
 * app's repository, lok proposes the issue, the admin reviews and edits it (the
 * repository is usually public) and lok opens it; GitHub closing the issue later
 * resolves the report. Elsewhere it opens the app's issue page prefilled from
 * the report, and afterwards asks for the link of the issue that was created,
 * so the report says where it went.
 */
export function BugReportTriage({ report }: { report: DetailBugReportFragment }) {
  const navigate = useNavigate()
  const [resolveOpen, setResolveOpen] = useState(false)
  const [forwardOpen, setForwardOpen] = useState(false)
  const [deleteOpen, setDeleteOpen] = useState(false)
  const [note, setNote] = useState("")
  const [issueLink, setIssueLink] = useState("")
  const [reviewOpen, setReviewOpen] = useState(false)
  const [fallbackOpen, setFallbackOpen] = useState(false)
  const [fallbackReason, setFallbackReason] = useState<string | null>(null)
  const [issueTitle, setIssueTitle] = useState("")
  const [issueBody, setIssueBody] = useState("")
  const [issueRepo, setIssueRepo] = useState<string | null>(null)
  const [withScreenshot, setWithScreenshot] = useState(false)

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
  const [fileIssue, { loading: filing }] = useFileBugReportIssueMutation(evictLists)
  const [loadForwarding, { loading: checking }] = useBugReportGithubForwardingLazyQuery({ fetchPolicy: "network-only" })

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

  // Ask lok whether it can open the issue itself; otherwise offer the prefilled page.
  const beginForward = async () => {
    try {
      const { data, error } = await loadForwarding({ variables: { id: report.id } })
      if (error) throw error
      const forwarding = data?.bugReport.githubForwarding
      if (forwarding?.available) {
        setIssueRepo(forwarding.repo ?? null)
        setIssueTitle(forwarding.title)
        setIssueBody(forwarding.body)
        setWithScreenshot(false)
        setReviewOpen(true)
        return
      }
      setFallbackReason(forwarding?.reason ?? null)
    } catch (e) {
      setFallbackReason(e instanceof Error ? e.message : null)
    }
    // The prefilled page has to open from a click of its own, or it is blocked as a popup.
    setFallbackOpen(true)
  }

  const onFileIssue = async () => {
    try {
      const { data } = await fileIssue({
        variables: {
          id: report.id,
          title: issueTitle.trim(),
          body: issueBody,
          includeScreenshot: withScreenshot,
          again: Boolean(report.githubIssueNumber),
        },
      })
      setReviewOpen(false)
      const url = data?.fileBugReportIssue.forwardedUrl
      toast.success("Issue opened on GitHub", url ? { action: { label: "Open", onClick: () => window.open(url, "_blank", "noopener") } } : undefined)
    } catch (e) {
      toastError(e, "Couldn't open the issue")
    }
  }

  const startForward = () => {
    if (!issueUrl) return
    setFallbackOpen(false)
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
          onClick={beginForward}
          disabled={!issueUrl || checking}
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

      <Dialog open={reviewOpen} onOpenChange={setReviewOpen}>
        <DialogContent className="sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>Open an issue{issueRepo ? ` in ${issueRepo}` : ""}</DialogTitle>
            <DialogDescription>
              lok opens this issue through its GitHub App. The repository is likely public: read it through and take out
              anything the organization would not publish (names, addresses, request data). When the issue is closed on
              GitHub, this report is resolved.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="bug-report-issue-title">Title</Label>
              <Input id="bug-report-issue-title" value={issueTitle} onChange={(e) => setIssueTitle(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="bug-report-issue-body">Body (Markdown)</Label>
              <Textarea
                id="bug-report-issue-body"
                value={issueBody}
                onChange={(e) => setIssueBody(e.target.value)}
                rows={14}
                className="max-h-[50vh] font-mono text-xs"
              />
            </div>
            {report.hasScreenshot ? (
              <div className="flex items-start space-x-2">
                <Checkbox
                  id="bug-report-issue-screenshot"
                  checked={withScreenshot}
                  onCheckedChange={(checked) => setWithScreenshot(checked === true)}
                />
                <label htmlFor="bug-report-issue-screenshot" className="text-sm leading-snug">
                  Include the screenshot. It becomes readable without signing in, by anyone who can see the issue, until
                  the report is deleted or the forward is taken back.
                </label>
              </div>
            ) : null}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setReviewOpen(false)}>
              Cancel
            </Button>
            <Button onClick={onFileIssue} disabled={filing || !issueTitle.trim() || !issueBody.trim()}>
              {filing ? "Opening…" : "Open the issue"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={fallbackOpen} onOpenChange={setFallbackOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Forward by hand</DialogTitle>
            <DialogDescription>
              {fallbackReason ?? "lok cannot open the issue itself."} The app's issue page opens in a new tab instead,
              filled in from this report.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setFallbackOpen(false)}>
              Cancel
            </Button>
            <Button onClick={startForward}>
              <ExternalLink className="mr-2 h-4 w-4" />
              Open the issue page
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
