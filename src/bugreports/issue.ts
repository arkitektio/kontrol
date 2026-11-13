import type { DetailBugReportFragment } from "@/graphql/fragments/bug_report.generated"

/** A GitHub request line much longer than this is refused; the body is cut to fit. */
const BODY_LIMIT = 5500

type Diagnostics = {
  pinned?: { title?: string; message?: string; technical?: string }
  errors?: { at?: number; title?: string; message?: string; technical?: string; route?: string | null }[]
  requests?: { at?: number; service?: string; kind?: string; operation?: string; status?: number | null; message?: string; variables?: unknown }[]
  steps?: { at?: number; kind?: string; label?: string }[]
  console?: { at?: number; level?: string; text?: string; count?: number }[]
  mainLog?: string[]
  queries?: unknown[]
  hardware?: string[]
  environment?: Record<string, unknown>
}

/** What the reporting app recorded, read defensively: its shape is the app's, not lok's. */
export function readDiagnostics(value: unknown): Diagnostics {
  return value && typeof value === "object" && !Array.isArray(value) ? (value as Diagnostics) : {}
}

export const clock = (at?: number) => (typeof at === "number" ? new Date(at).toISOString().slice(11, 19) : "")

const fence = (text: string) => ["```", text.replace(/```/g, "'''"), "```"]

/** A filed report as the body of an issue: what was written, where, and the errors behind it. */
export function bugReportIssueBody(report: DetailBugReportFragment): string {
  const d = readDiagnostics(report.diagnostics)
  const lines: string[] = ["### What happened?", report.description, ""]
  if (report.expected) lines.push("### What was expected?", report.expected, "")
  lines.push(
    "### Environment",
    `- App version: \`${report.appVersion ?? "unknown"}\``,
    `- OS: \`${report.platform ?? "unknown"}\``,
    `- Page: \`${report.route ?? "unknown"}\``,
    `- Reported: ${String(report.createdAt)}`,
    "",
  )
  if (d.pinned) {
    lines.push("### The error this report is about", `${d.pinned.title ? `${d.pinned.title}: ` : ""}${d.pinned.message ?? ""}`)
    if (d.pinned.technical) lines.push(...fence(d.pinned.technical))
    lines.push("")
  }
  if (d.errors?.length) {
    lines.push("### Recent errors")
    for (const error of [...d.errors].reverse()) {
      lines.push(`- ${clock(error.at)} ${error.title ? `${error.title}: ` : ""}${error.message ?? ""}`)
      if (error.technical) lines.push(...fence(error.technical))
    }
    lines.push("")
  }
  if (d.requests?.length) {
    lines.push("### Failed requests")
    for (const request of [...d.requests].reverse()) {
      const status = request.status != null ? ` HTTP ${request.status}` : ""
      lines.push(`- ${clock(request.at)} ${request.service ?? ""} ${request.kind ?? ""} \`${request.operation ?? ""}\`${status}: ${(request.message ?? "").split("\n")[0]}`)
    }
    lines.push("")
  }
  if (d.steps?.length) {
    lines.push("### Steps before the report", ...d.steps.map((step) => `- ${clock(step.at)} ${step.kind ?? ""} ${step.label ?? ""}`), "")
  }
  const text = lines.join("\n").trim()
  return text.length <= BODY_LIMIT ? text : `${text.slice(0, BODY_LIMIT)}\n\n_Cut to fit; the full report is in lok._`
}

/**
 * Where a report is forwarded to: the issue tracker of the app it was filed
 * from (the client's `issueUrl`), prefilled. Null when the app declared none.
 */
export function bugReportIssueUrl(report: DetailBugReportFragment): string | null {
  const base = report.client?.issueUrl
  if (!base) return null
  const params = new URLSearchParams()
  params.set("title", report.title)
  params.set("body", bugReportIssueBody(report))
  params.set("labels", "bug,user-reported")
  return `${base}${base.includes("?") ? "&" : "?"}${params.toString()}`
}
