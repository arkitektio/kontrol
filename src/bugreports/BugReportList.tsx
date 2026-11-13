import { useState } from "react"
import { Link } from "react-router-dom"

import { LoadMore } from "@/components/LoadMore"
import { SearchInput } from "@/components/SearchInput"
import { QueryError } from "@/components/status"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { useBugReportsQuery } from "@/graphql/queries/bug_report.generated"
import { toastError } from "@/lib/errors"
import { absoluteTime, timeAgo } from "@/lib/time"

const PAGE_SIZE = 25

type Show = "open" | "resolved" | "all"

export type BugReportScope = {
  organization?: string
  client?: string
  release?: string
  app?: string
}

/**
 * Bug reports people filed from inside a client, newest first, narrowed to an
 * organization, a client, a release or an app. Owners and admins get every
 * report of their organizations, anyone else the ones they filed: the server
 * decides, so this is one list for both.
 */
export function BugReportList({
  scope,
  search = false,
  hideWhenEmpty = false,
  title,
}: {
  scope: BugReportScope
  /** Show the search field. */
  search?: boolean
  /** Render nothing while there is nothing to list (a section of another page). */
  hideWhenEmpty?: boolean
  title?: string
}) {
  const [show, setShow] = useState<Show>("open")
  const [term, setTerm] = useState("")
  const [exhaustedAt, setExhaustedAt] = useState<number | null>(null)
  const [loadingMore, setLoadingMore] = useState(false)

  const { data, previousData, loading, error, refetch, fetchMore } = useBugReportsQuery({
    variables: {
      filters: {
        ...scope,
        ...(show === "all" ? {} : { resolved: show === "resolved" }),
        search: term.trim() || undefined,
      },
      pagination: { limit: PAGE_SIZE, offset: 0 },
    },
    fetchPolicy: "cache-and-network",
  })

  const current = data ?? previousData
  if (error && !current) return <QueryError error={error} onRetry={() => refetch()} resource="bug reports" />
  if (loading && !current) return null

  const reports = current?.bugReports ?? []
  const untouched = show === "open" && !term.trim()
  if (hideWhenEmpty && untouched && reports.length === 0) return null

  const hasMore = reports.length > 0 && reports.length % PAGE_SIZE === 0 && exhaustedAt !== reports.length
  const loadMore = async () => {
    setLoadingMore(true)
    try {
      const { data: more } = await fetchMore({
        variables: { pagination: { limit: PAGE_SIZE, offset: reports.length } },
        updateQuery: (prev, { fetchMoreResult }) =>
          fetchMoreResult ? { ...prev, bugReports: [...prev.bugReports, ...fetchMoreResult.bugReports] } : prev,
      })
      if (more.bugReports.length === 0) setExhaustedAt(reports.length)
    } catch (e) {
      toastError(e, "Couldn't load more bug reports")
    } finally {
      setLoadingMore(false)
    }
  }

  return (
    <section className="space-y-4">
      <div className="flex flex-wrap items-center gap-3">
        {title ? <h3 className="font-semibold">{title}</h3> : null}
        {search ? (
          <SearchInput
            value={term}
            onChange={(v) => {
              setTerm(v)
              setExhaustedAt(null)
            }}
            placeholder="Search bug reports…"
          />
        ) : null}
        <span className="flex-1" />
        <ToggleGroup
          type="single"
          size="sm"
          variant="outline"
          value={show}
          onValueChange={(value) => {
            if (!value) return
            setShow(value as Show)
            setExhaustedAt(null)
          }}
        >
          <ToggleGroupItem value="open">Open</ToggleGroupItem>
          <ToggleGroupItem value="resolved">Resolved</ToggleGroupItem>
          <ToggleGroupItem value="all">All</ToggleGroupItem>
        </ToggleGroup>
      </div>

      {reports.length === 0 ? (
        <p className="text-sm text-muted-foreground">
          {term.trim() ? "No report matches." : show === "resolved" ? "No resolved reports." : "No open bug reports."}
        </p>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Report</TableHead>
              <TableHead>App</TableHead>
              <TableHead>Device</TableHead>
              <TableHead>Reported by</TableHead>
              <TableHead>When</TableHead>
              <TableHead>State</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {reports.map((report) => (
              <TableRow key={report.id}>
                <TableCell className="max-w-[28rem]">
                  <Link
                    to={`/organization/${report.organization.id}/bug-reports/${report.id}`}
                    className="font-medium hover:underline"
                  >
                    {report.title}
                  </Link>
                  {report.route ? (
                    <div className="truncate font-mono text-xs text-muted-foreground">{report.route}</div>
                  ) : null}
                </TableCell>
                <TableCell className="whitespace-nowrap">
                  {report.release
                    ? `${String(report.release.app.identifier)} ${String(report.release.version)}`
                    : (report.appVersion ?? "")}
                </TableCell>
                <TableCell className="whitespace-nowrap">{report.client?.device?.name ?? ""}</TableCell>
                <TableCell className="whitespace-nowrap">{report.reporter?.username ?? ""}</TableCell>
                <TableCell className="whitespace-nowrap text-muted-foreground" title={absoluteTime(report.createdAt)}>
                  {timeAgo(report.createdAt)}
                </TableCell>
                <TableCell className="whitespace-nowrap">
                  <Badge variant={report.isResolved ? "secondary" : "outline"}>
                    {report.isResolved ? "Resolved" : "Open"}
                  </Badge>
                  {report.forwardedAt ? (
                    <Badge variant="secondary" className="ml-1">
                      Forwarded
                    </Badge>
                  ) : null}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}

      <LoadMore hasMore={hasMore} loading={loadingMore} onLoadMore={loadMore} />
    </section>
  )
}
