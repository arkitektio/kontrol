import type { ReactNode } from "react"
import { Bug } from "lucide-react"
import { Link, useParams } from "react-router-dom"

import { AdminOnly } from "@/components/AdminOnly"
import { PageHeader } from "@/components/PageHeader"
import { DetailPageSkeleton } from "@/components/skeletons"
import { QueryError, ResourceNotFound } from "@/components/status"
import { Badge } from "@/components/ui/badge"
import { useDetailBugReportQuery } from "@/graphql/queries/bug_report.generated"
import { absoluteTime, timeAgo } from "@/lib/time"
import { BugReportTriage } from "./BugReportTriage"
import { clock, readDiagnostics } from "./issue"

function Fact({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="min-w-0">
      <dt className="text-xs text-muted-foreground">{label}</dt>
      <dd className="truncate text-sm">{children}</dd>
    </div>
  )
}

function Part({ title, count, children }: { title: string; count?: number; children: ReactNode }) {
  return (
    <details className="border-b last:border-b-0">
      <summary className="flex cursor-pointer select-none items-baseline gap-2 py-2 text-sm font-medium">
        {title}
        {count != null ? <span className="font-normal text-muted-foreground">{count}</span> : null}
      </summary>
      <div className="pb-3">{children}</div>
    </details>
  )
}

function Pre({ children }: { children: string }) {
  return (
    <pre className="max-h-96 overflow-auto whitespace-pre-wrap break-words rounded bg-muted/40 p-2 font-mono text-[11px] leading-snug">
      {children}
    </pre>
  )
}

/** One bug report: what was written, where it came from, the screenshot and what the app recorded. */
export default function BugReport() {
  const { id, orgId } = useParams<{ id: string; orgId: string }>()
  const { data, loading, error, refetch } = useDetailBugReportQuery({ variables: { id: id! }, skip: !id })

  if (loading && !data) return <DetailPageSkeleton sections={3} />
  if (error && !data) return <QueryError error={error} onRetry={() => refetch()} resource="bug report" />
  if (!data?.bugReport) return <ResourceNotFound resource="bug report" id={id} />

  const report = data.bugReport
  const org = report.organization.id ?? orgId
  const d = readDiagnostics(report.diagnostics)
  // What the app recorded beyond the parts shown by name: kept visible, never dropped.
  const { pinned, errors, requests, steps, console: consoleLines, mainLog, queries, hardware, environment, ...rest } =
    d as Record<string, unknown> & ReturnType<typeof readDiagnostics>
  const other = Object.fromEntries(
    Object.entries(rest).filter(([key]) => !["version", "createdAt", "title", "description", "expected"].includes(key)),
  )

  return (
    <div className="flex flex-1 flex-col gap-8 p-6">
      <PageHeader
        icon={Bug}
        title={
          <span className="flex flex-wrap items-center gap-2">
            {report.title}
            <Badge variant={report.isResolved ? "secondary" : "outline"}>{report.isResolved ? "Resolved" : "Open"}</Badge>
            {report.forwardedAt ? <Badge variant="secondary">Forwarded</Badge> : null}
          </span>
        }
        description={
          <span title={absoluteTime(report.createdAt)}>
            Reported {timeAgo(report.createdAt)}
            {report.reporter ? ` by ${report.reporter.username}` : ""}
          </span>
        }
        actions={
          <AdminOnly orgId={org}>
            <BugReportTriage report={report} />
          </AdminOnly>
        }
      />

      <dl className="grid grid-cols-2 gap-x-6 gap-y-3 md:grid-cols-4">
        <Fact label="App">
          {report.release ? (
            <>
              <Link to={`/apps/${report.release.app.id}`} className="hover:underline">
                {String(report.release.app.identifier)}
              </Link>{" "}
              <Link to={`/releases/${report.release.id}`} className="text-muted-foreground hover:underline">
                {String(report.release.version)}
              </Link>
            </>
          ) : (
            "Unknown"
          )}
        </Fact>
        <Fact label="Client">
          {report.client ? (
            <Link to={`/organization/${org}/clients/${report.client.id}`} className="hover:underline">
              {report.client.device?.name ?? "Open the client"}
            </Link>
          ) : (
            "No longer registered"
          )}
        </Fact>
        <Fact label="Version it says it runs">{report.appVersion ?? "Unknown"}</Fact>
        <Fact label="System">{report.platform ?? "Unknown"}</Fact>
        <Fact label="Page">
          <span className="font-mono text-xs">{report.route ?? "Unknown"}</span>
        </Fact>
      </dl>

      <section className="space-y-1">
        <h2 className="text-sm font-medium">What happened</h2>
        <p className="whitespace-pre-wrap text-sm">{report.description}</p>
      </section>
      {report.expected ? (
        <section className="space-y-1">
          <h2 className="text-sm font-medium">What was expected</h2>
          <p className="whitespace-pre-wrap text-sm">{report.expected}</p>
        </section>
      ) : null}

      {report.isResolved ? (
        <section className="rounded-md border px-3 py-2 text-sm">
          Resolved{report.resolvedBy ? ` by ${report.resolvedBy.username}` : ""} {timeAgo(report.resolvedAt)}
          {report.resolutionNote ? (
            <p className="mt-1 whitespace-pre-wrap text-muted-foreground">{report.resolutionNote}</p>
          ) : null}
        </section>
      ) : null}
      {report.forwardedAt ? (
        <section className="rounded-md border px-3 py-2 text-sm">
          Forwarded to the app's issue tracker{report.forwardedBy ? ` by ${report.forwardedBy.username}` : ""}{" "}
          {timeAgo(report.forwardedAt)}
        </section>
      ) : null}

      {report.screenshot ? (
        <section className="space-y-1">
          <h2 className="text-sm font-medium">Screenshot</h2>
          <img
            src={report.screenshot}
            alt="The window when the report was filed"
            className="max-w-full rounded-md border"
          />
        </section>
      ) : null}

      <section className="space-y-1">
        <h2 className="text-sm font-medium">What the app recorded</h2>
        {pinned ? (
          <div className="rounded-md border border-destructive/30 bg-destructive/5 px-3 py-2">
            <p className="text-sm font-medium">
              {pinned.title ? `${pinned.title}: ` : ""}
              {pinned.message}
            </p>
            {pinned.technical ? <Pre>{pinned.technical}</Pre> : null}
          </div>
        ) : null}
        {errors?.length ? (
          <Part title="Recent errors" count={errors.length}>
            <div className="space-y-2">
              {[...errors].reverse().map((e, i) => (
                <div key={i}>
                  <p className="text-xs">
                    <span className="font-mono text-muted-foreground">{clock(e.at)}</span>{" "}
                    {e.title ? `${e.title}: ` : ""}
                    {e.message}
                    {e.route ? <span className="text-muted-foreground"> on {e.route}</span> : null}
                  </p>
                  {e.technical ? <Pre>{e.technical}</Pre> : null}
                </div>
              ))}
            </div>
          </Part>
        ) : null}
        {requests?.length ? (
          <Part title="Failed requests" count={requests.length}>
            <div className="space-y-2">
              {[...requests].reverse().map((r, i) => (
                <div key={i}>
                  <p className="text-xs">
                    <span className="font-mono text-muted-foreground">{clock(r.at)}</span> {r.service} {r.kind}{" "}
                    <span className="font-mono">{r.operation}</span>
                    {r.status != null ? ` (HTTP ${r.status})` : ""}
                  </p>
                  <Pre>
                    {[r.message ?? "", r.variables !== undefined ? JSON.stringify(r.variables, null, 2) : ""]
                      .filter(Boolean)
                      .join("\n")}
                  </Pre>
                </div>
              ))}
            </div>
          </Part>
        ) : null}
        {steps?.length ? (
          <Part title="Steps before the report" count={steps.length}>
            <Pre>{steps.map((s) => `${clock(s.at)} ${s.kind ?? ""} ${s.label ?? ""}`).join("\n")}</Pre>
          </Part>
        ) : null}
        {queries?.length ? (
          <Part title="The page's queries" count={queries.length}>
            <Pre>{JSON.stringify(queries, null, 2)}</Pre>
          </Part>
        ) : null}
        {consoleLines?.length ? (
          <Part title="Console" count={consoleLines.length}>
            <Pre>
              {consoleLines
                .map((l) => `${clock(l.at)} ${l.level ?? ""} ${l.text ?? ""}${(l.count ?? 1) > 1 ? ` (×${l.count})` : ""}`)
                .join("\n")}
            </Pre>
          </Part>
        ) : null}
        {mainLog?.length ? (
          <Part title="Main process log" count={mainLog.length}>
            <Pre>{mainLog.join("\n")}</Pre>
          </Part>
        ) : null}
        {hardware?.length ? (
          <Part title="Hardware">
            <Pre>{hardware.join("\n")}</Pre>
          </Part>
        ) : null}
        {environment ? (
          <Part title="Environment">
            <Pre>{JSON.stringify(environment, null, 2)}</Pre>
          </Part>
        ) : null}
        {Object.keys(other).length ? (
          <Part title="Other">
            <Pre>{JSON.stringify(other, null, 2)}</Pre>
          </Part>
        ) : null}
      </section>
    </div>
  )
}
