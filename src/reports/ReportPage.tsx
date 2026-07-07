import { PageHeader } from "@/components/PageHeader"
import { cn } from "@/lib/utils"
import { formatDistanceToNow } from "date-fns"
import { Activity, AlertTriangle, CheckCircle2, HeartPulse } from "lucide-react"
import { useParams } from "react-router-dom"
import { useLatestClientReportQuery } from "../api/graphql"
import { UsedAliasFlow, type AliasFlowEntry } from "../clients/ClientUsedAliasFlow"

function timeAgo(iso?: string | null): string {
    if (!iso) return "never"
    try {
        return formatDistanceToNow(new Date(iso), { addSuffix: true })
    } catch {
        return "unknown"
    }
}

export default function ReportPage() {
    const { id } = useParams<{ id: string }>()
    const { data, loading, error } = useLatestClientReportQuery({
        variables: { id: id! },
        skip: !id,
    })

    if (loading) return <div className="p-6">Loading...</div>
    if (error) return <div className="p-6">Error: {error.message}</div>
    if (!data?.client) return <div className="p-6">Client not found</div>

    const client = data.client
    const report = client.latestReport
    const healthy = client.lastHealthyReport

    if (!report) {
        return (
            <div className="flex flex-1 flex-col gap-8 p-6">
                <PageHeader
                    icon={Activity}
                    title={`${client.name} — latest report`}
                    description="This client has not reported in yet."
                />
                <div className="text-sm text-muted-foreground">
                    No report has been received from this client, so there is nothing to visualize.
                </div>
            </div>
        )
    }

    const entries: AliasFlowEntry[] = (report.entries ?? []).map((e) => ({
        key: e.key,
        valid: e.valid,
        reason: e.reason,
        alias: e.alias ?? null,
    }))
    const invalid = entries.filter((e) => !e.valid)
    const isFunctional = report.functional && invalid.length === 0

    return (
        <div className="flex flex-1 flex-col gap-8 p-6">
            <PageHeader
                icon={Activity}
                title={`${client.name} — latest report`}
                description={`Reported ${timeAgo(report.createdAt)} · ${entries.length} requirement${entries.length === 1 ? "" : "s"} reported`}
            />

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
                {invalid.length > 0 && (
                    <span className="inline-flex items-center gap-1.5 rounded-md border border-red-500/40 px-2.5 py-1 text-sm text-red-600 dark:text-red-400">
                        <AlertTriangle className="h-4 w-4" />
                        {invalid.length} unreachable service{invalid.length === 1 ? "" : "s"}
                    </span>
                )}
                <span className="inline-flex items-center gap-1.5 rounded-md border border-border px-2.5 py-1 text-sm text-muted-foreground">
                    <HeartPulse className="h-4 w-4" />
                    {healthy
                        ? `Last healthy ${timeAgo(healthy.createdAt)}`
                        : "Never reported healthy"}
                </span>
            </div>

            {/* Which services failed */}
            {invalid.length > 0 && (
                <div className="grid gap-2">
                    {invalid.map((e) => (
                        <div key={e.key} className="rounded-md border border-red-500/40 p-2">
                            <div className="font-mono text-sm font-medium text-red-600 dark:text-red-400">{e.key}</div>
                            {e.reason && <div className="text-xs text-muted-foreground">{e.reason}</div>}
                        </div>
                    ))}
                </div>
            )}

            {/* Graph-centric view: client → requirement → resolved alias, coloured by reachability */}
            <div className="h-[60vh] w-full rounded-md border">
                {entries.length > 0 ? (
                    <UsedAliasFlow
                        head={{
                            label: client.name,
                            badge: report.functional ? "functional" : "non-functional",
                            sublabel: `reported ${timeAgo(report.createdAt)}`,
                            tone: isFunctional ? "healthy" : "unhealthy",
                        }}
                        entries={entries}
                    />
                ) : (
                    <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
                        This report contains no requirement entries.
                    </div>
                )}
            </div>
        </div>
    )
}
