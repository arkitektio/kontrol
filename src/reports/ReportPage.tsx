import {
  Activity,
  AlertTriangle,
  ArrowDownRight,
  ArrowUpRight,
  CheckCircle2,
  HeartPulse,
  Lock,
  Server,
  Unlock,
} from "lucide-react"
import { useParams } from "react-router-dom"

import { ClientLabel } from "@/components/ClientLabel"
import { PageHeader } from "@/components/PageHeader"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { QueryError, ResourceNotFound } from "@/components/status"
import { SettingsStackSkeleton } from "@/components/skeletons"
import { clientLabel } from "@/lib/clientLabel"
import { cn } from "@/lib/utils"
import { absoluteTime, timeAgo } from "@/lib/time"
import { useLatestClientReportQuery } from "@/graphql/queries/report.generated"
import type { ListReportFragment } from "@/graphql/fragments/report.generated"
import { UsedAliasFlow, type AliasFlowEntry } from "../clients/ClientUsedAliasFlow"
import { ResolveReportAction } from "./ReportResolution"

type Entry = ListReportFragment["entries"][number]

/**
 * Renders the address a client actually tried to reach, reassembled from the
 * alias parts. Seeing `https://mikro.lab:8080/graphql` is what makes a failure
 * diagnosable — the requirement key alone never was.
 */
function aliasUrl(alias: Entry["alias"]): string | null {
    if (!alias) return null
    const scheme = alias.ssl ? "https" : "http"
    const host = alias.host ?? "?"
    const port = alias.port ? `:${alias.port}` : ""
    const path = alias.path ? (alias.path.startsWith("/") ? alias.path : `/${alias.path}`) : ""
    return `${scheme}://${host}${port}${path}`
}

/** One failing requirement, with everything needed to chase it down. */
function FailureRow({ entry }: { entry: Entry }) {
    const url = aliasUrl(entry.alias)
    return (
        <div className="rounded-md border border-red-500/40 bg-red-500/5 p-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="font-mono text-sm font-medium text-red-600 dark:text-red-400">{entry.key}</span>
                {entry.alias?.instance?.release?.service?.identifier && (
                    <Badge variant="outline" className="font-mono text-xs">
                        {String(entry.alias.instance.release.service.identifier)}
                        {entry.alias.instance.release.version ? ` @ ${entry.alias.instance.release.version}` : ""}
                    </Badge>
                )}
            </div>

            {url ? (
                <div className="mt-2 flex flex-wrap items-center gap-2 text-xs">
                    <span className="text-muted-foreground inline-flex items-center gap-1">
                        {entry.alias?.ssl ? <Lock className="h-3 w-3" /> : <Unlock className="h-3 w-3" />}
                    </span>
                    <code className="bg-muted rounded px-1.5 py-0.5 font-mono">{url}</code>
                    {entry.alias?.layer?.name && (
                        <span className="text-muted-foreground">via {entry.alias.layer.name}</span>
                    )}
                    {entry.alias?.kind && (
                        <span className="text-muted-foreground">· {entry.alias.kind}</span>
                    )}
                </div>
            ) : (
                <div className="text-muted-foreground mt-2 text-xs">
                    No alias was resolved for this requirement — the client had nothing to connect to.
                </div>
            )}

            {entry.reason && (
                <div className="text-muted-foreground mt-2 text-xs">
                    <span className="font-medium">Reason:</span> {entry.reason}
                </div>
            )}
        </div>
    )
}

/**
 * A compact strip of the client's retained reports, oldest → newest, so a
 * one-off blip reads differently from a sustained outage at a glance.
 */
function ReportTimeline({
    reports,
    currentId,
}: {
    reports: { id: string; functional: boolean; createdAt: unknown; isResolved: boolean }[]
    currentId: string
}) {
    if (reports.length < 2) return null
    const ordered = [...reports].reverse()
    return (
        <div className="space-y-2">
            <div className="text-muted-foreground text-xs font-medium tracking-wide uppercase">
                Recent reports
            </div>
            <div className="flex flex-wrap items-end gap-1.5">
                {ordered.map((r) => (
                    <div
                        key={r.id}
                        title={`${r.functional ? "Healthy" : "Reporting issues"} — ${absoluteTime(r.createdAt as string)}${r.isResolved ? " (resolved)" : ""}`}
                        className={cn(
                            "h-8 w-6 rounded-sm border transition-colors",
                            r.functional
                                ? "border-green-500/40 bg-green-500/30"
                                : r.isResolved
                                    ? "border-amber-500/40 bg-amber-500/25"
                                    : "border-red-500/40 bg-red-500/30",
                            r.id === currentId && "ring-foreground/40 ring-2 ring-offset-1",
                        )}
                    />
                ))}
            </div>
            <div className="text-muted-foreground flex gap-4 text-xs">
                <span className="inline-flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-sm bg-green-500/60" /> healthy
                </span>
                <span className="inline-flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-sm bg-red-500/60" /> issues
                </span>
                <span className="inline-flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-sm bg-amber-500/60" /> issues, resolved
                </span>
                <span>oldest → newest</span>
            </div>
        </div>
    )
}

/**
 * The delta against the last known-good report.
 *
 * Deliberately NOT a repeat of the failure list. Because the baseline is a
 * report the client called healthy, "broken now" is already on screen above —
 * what this adds is *which* of those were fine in the known-good state
 * (a genuine regression, so something changed in the environment) versus which
 * requirements did not exist back then (so the app itself changed), plus the
 * ones that have since gone away entirely.
 */
function ChangedSinceHealthy({
    report,
    healthy,
}: {
    report: ListReportFragment
    healthy: ListReportFragment
}) {
    const now = new Map(report.entries.map((e) => [e.key, e]))
    const then = new Map(healthy.entries.map((e) => [e.key, e]))

    const regressed = report.entries.filter((e) => !e.valid && then.get(e.key)?.valid === true)
    const brokenAndNew = report.entries.filter((e) => !e.valid && !then.has(e.key))
    const disappeared = healthy.entries.filter((e) => !now.has(e.key))
    const added = report.entries.filter((e) => e.valid && !then.has(e.key))

    if (!regressed.length && !brokenAndNew.length && !disappeared.length && !added.length) return null

    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-base">
                    Changed since last healthy
                    <span className="text-muted-foreground ml-2 text-sm font-normal">
                        degraded for {timeAgo(healthy.createdAt as string).replace(/^about /, "").replace(/ ago$/, "")}
                    </span>
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
                {regressed.map((e) => (
                    <div key={e.key} className="flex items-center gap-2 text-sm">
                        <ArrowDownRight className="h-4 w-4 shrink-0 text-red-600 dark:text-red-400" />
                        <span className="font-mono">{e.key}</span>
                        <span className="text-muted-foreground">was reachable then — the environment changed</span>
                    </div>
                ))}
                {brokenAndNew.map((e) => (
                    <div key={e.key} className="flex items-center gap-2 text-sm">
                        <AlertTriangle className="h-4 w-4 shrink-0 text-amber-600 dark:text-amber-400" />
                        <span className="font-mono">{e.key}</span>
                        <span className="text-muted-foreground">is a new requirement and has never worked</span>
                    </div>
                ))}
                {added.map((e) => (
                    <div key={e.key} className="flex items-center gap-2 text-sm">
                        <ArrowUpRight className="h-4 w-4 shrink-0 text-green-600 dark:text-green-400" />
                        <span className="font-mono">{e.key}</span>
                        <span className="text-muted-foreground">is new since then and is reachable</span>
                    </div>
                ))}
                {disappeared.map((e) => (
                    <div key={e.key} className="text-muted-foreground flex items-center gap-2 text-sm">
                        <ArrowUpRight className="h-4 w-4 shrink-0 rotate-90" />
                        <span className="font-mono">{e.key}</span>
                        <span>is no longer required</span>
                    </div>
                ))}
            </CardContent>
        </Card>
    )
}

export default function ReportPage() {
    const { id } = useParams<{ id: string }>()
    const { data, loading, error } = useLatestClientReportQuery({
        variables: { id: id! },
        skip: !id,
    })

    if (loading) return <SettingsStackSkeleton header="pageHeader" cards={2} rows={4} />
    if (error) return <QueryError error={error} resource="client" />
    if (!data?.client) return <ResourceNotFound resource="client" id={id} />

    const client = data.client
    const report = client.latestReport
    const healthy = client.lastHealthyReport

    const header = (
        <PageHeader
            icon={Activity}
            title={
                <span className="flex items-center gap-2">
                    <ClientLabel client={client} />
                    <span className="text-muted-foreground font-normal">— latest report</span>
                </span>
            }
            description={
                report
                    ? `Reported ${timeAgo(report.createdAt as string)} · ${absoluteTime(report.createdAt as string)}`
                    : "This client has not reported in yet."
            }
            actions={report && !report.isResolved ? <ResolveReportAction report={report} /> : undefined}
        />
    )

    if (!report) {
        return (
            <div className="flex flex-1 flex-col gap-8 p-6">
                {header}
                <div className="text-muted-foreground text-sm">
                    No report has been received from this client, so there is nothing to visualize.
                </div>
            </div>
        )
    }

    const entries: AliasFlowEntry[] = report.entries.map((e) => ({
        key: e.key,
        valid: e.valid,
        reason: e.reason,
        alias: e.alias ?? null,
    }))
    const invalid = report.entries.filter((e) => !e.valid)
    const isFunctional = report.functional && invalid.length === 0

    return (
        <div className="flex flex-1 flex-col gap-8 p-6">
            {header}

            {/* Health roll-up */}
            <div className="flex flex-wrap items-center gap-3">
                <span
                    className={cn(
                        "inline-flex items-center gap-1.5 rounded-md border px-2.5 py-1 text-sm font-medium",
                        isFunctional
                            ? "border-green-500/40 text-green-600 dark:text-green-400"
                            : "border-red-500/40 text-red-600 dark:text-red-400",
                    )}
                >
                    {isFunctional ? <CheckCircle2 className="h-4 w-4" /> : <AlertTriangle className="h-4 w-4" />}
                    {isFunctional ? "Functional" : "Reporting issues"}
                </span>
                <span className="text-muted-foreground inline-flex items-center gap-1.5 rounded-md border px-2.5 py-1 text-sm">
                    <Server className="h-4 w-4" />
                    {report.entries.length - invalid.length}/{report.entries.length} requirements reachable
                </span>
                <span className="text-muted-foreground inline-flex items-center gap-1.5 rounded-md border px-2.5 py-1 text-sm">
                    <HeartPulse className="h-4 w-4" />
                    {healthy ? `Last healthy ${timeAgo(healthy.createdAt as string)}` : "Never reported healthy"}
                </span>
            </div>

            {report.isResolved && <ResolveReportAction report={report} />}

            <ReportTimeline reports={client.reports} currentId={report.id} />

            {invalid.length > 0 && (
                <div className="space-y-3">
                    <Separator />
                    <div className="text-sm font-medium">
                        {invalid.length} unreachable service{invalid.length === 1 ? "" : "s"}
                    </div>
                    <div className="grid gap-2">
                        {invalid.map((e) => (
                            <FailureRow key={e.key} entry={e} />
                        ))}
                    </div>
                </div>
            )}

            {healthy && healthy.id !== report.id && (
                <ChangedSinceHealthy report={report} healthy={healthy} />
            )}

            {/* Graph-centric view: client → requirement → resolved alias, coloured by reachability */}
            <div className="h-[440px] w-full rounded-md border">
                {entries.length > 0 ? (
                    <UsedAliasFlow
                        head={{
                            label: clientLabel(client),
                            tone: isFunctional ? "healthy" : "unhealthy",
                        }}
                        entries={entries}
                    />
                ) : (
                    <div className="text-muted-foreground flex h-full items-center justify-center text-sm">
                        This report contains no requirement entries.
                    </div>
                )}
            </div>
        </div>
    )
}
