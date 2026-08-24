import { useState, type ReactNode } from "react"
import type { LucideIcon } from "lucide-react"
import { Check, Copy } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

export type StatusTone = "neutral" | "warning" | "destructive"

export interface StatusDetail {
  label: string
  value: ReactNode
  /** Render the value in a monospace font (ids, paths, error messages). */
  mono?: boolean
}

export interface StatusPageProps {
  /** Big watermark label behind the content, e.g. "404". */
  code?: string | number
  icon: LucideIcon
  title: ReactNode
  description?: ReactNode
  tone?: StatusTone
  /** Short "what you can try" bullets. */
  hints?: ReactNode[]
  /** Primary/secondary buttons rendered under the description. */
  actions?: ReactNode
  /** Key/value facts about the failure (path, id, account, time, ...). */
  details?: StatusDetail[]
  /** Raw technical payload (stack, graphql errors) shown in a collapsible block. */
  technical?: string | null
  /**
   * `page` fills the viewport (used as the root router error element, outside
   * any layout). `embedded` sits inside a layout's content area. `compact`
   * is a slim inline card for sub-sections of a page.
   */
  variant?: "page" | "embedded" | "compact"
  className?: string
}

const toneStyles: Record<StatusTone, { tile: string; watermark: string }> = {
  neutral: {
    tile: "bg-primary/10 text-primary",
    watermark: "text-primary/[0.06] dark:text-primary/10",
  },
  warning: {
    tile: "bg-amber-500/15 text-amber-600 dark:text-amber-400",
    watermark: "text-amber-500/[0.07] dark:text-amber-400/10",
  },
  destructive: {
    tile: "bg-destructive/10 text-destructive",
    watermark: "text-destructive/[0.06] dark:text-destructive/10",
  },
}

function renderDetailValue(value: ReactNode): string {
  if (value == null || typeof value === "boolean") return ""
  if (typeof value === "string" || typeof value === "number") return String(value)
  return "[element]"
}

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false)
  return (
    <Button
      type="button"
      variant="ghost"
      size="sm"
      className="h-7 gap-1.5 px-2 text-xs text-muted-foreground"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(text)
          setCopied(true)
          setTimeout(() => setCopied(false), 1500)
        } catch {
          /* clipboard unavailable (insecure context) — nothing to do */
        }
      }}
    >
      {copied ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
      {copied ? "Copied" : "Copy details"}
    </Button>
  )
}

/**
 * The shared chrome for every "something is off" screen in kontrol: 404s,
 * access-denied, sign-in-required, network failures and unexpected errors.
 * It is deliberately dependency-light (no router, no apollo, no auth) so it can
 * be rendered from the root error boundary where no providers exist; the
 * concrete pages in `./pages.tsx` gather context and feed it in.
 */
export function StatusPage({
  code,
  icon: Icon,
  title,
  description,
  tone = "neutral",
  hints,
  actions,
  details,
  technical,
  variant = "embedded",
  className,
}: StatusPageProps) {
  const styles = toneStyles[tone]

  if (variant === "compact") {
    return (
      <div
        role="alert"
        className={cn(
          "flex w-full items-start gap-3 rounded-lg border bg-card/60 p-4 text-sm",
          className,
        )}
      >
        <div className={cn("flex size-9 shrink-0 items-center justify-center rounded-md", styles.tile)}>
          <Icon className="size-4.5" />
        </div>
        <div className="min-w-0 flex-1 space-y-1">
          <div className="font-medium leading-tight">{title}</div>
          {description ? <div className="text-muted-foreground">{description}</div> : null}
          {details && details.length > 0 ? (
            <dl className="mt-2 grid grid-cols-[auto_1fr] gap-x-3 gap-y-0.5 text-xs">
              {details.map((d) => (
                <div key={d.label} className="contents">
                  <dt className="text-muted-foreground">{d.label}</dt>
                  <dd className={cn("truncate", d.mono && "font-mono")}>{d.value}</dd>
                </div>
              ))}
            </dl>
          ) : null}
          {actions ? <div className="flex flex-wrap gap-2 pt-2">{actions}</div> : null}
        </div>
      </div>
    )
  }

  const copyText = [
    typeof title === "string" ? title : undefined,
    ...(details ?? []).map((d) => `${d.label}: ${renderDetailValue(d.value)}`),
    `URL: ${typeof window !== "undefined" ? window.location.href : ""}`,
    `Time: ${new Date().toISOString()}`,
    technical ? `\n${technical}` : undefined,
  ]
    .filter(Boolean)
    .join("\n")

  return (
    <div
      className={cn(
        "relative flex w-full flex-1 flex-col items-center justify-center overflow-hidden px-4 py-12",
        variant === "page" && "min-h-screen bg-background text-foreground",
        className,
      )}
    >
      {code != null ? (
        <div
          aria-hidden="true"
          className={cn(
            "pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 select-none text-center font-black leading-none tracking-tighter",
            "text-[min(38vw,22rem)]",
            styles.watermark,
          )}
        >
          {code}
        </div>
      ) : null}

      <div className="relative flex w-full max-w-xl flex-col items-center gap-6 text-center">
        <div className={cn("flex size-16 items-center justify-center rounded-2xl", styles.tile)}>
          <Icon className="size-8" />
        </div>

        <div className="space-y-2">
          {code != null ? (
            <div className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              Error {code}
            </div>
          ) : null}
          <h1 className="text-balance text-2xl font-semibold tracking-tight sm:text-3xl">{title}</h1>
          {description ? (
            <p className="text-balance text-sm leading-relaxed text-muted-foreground sm:text-base">
              {description}
            </p>
          ) : null}
        </div>

        {actions ? <div className="flex flex-wrap items-center justify-center gap-2">{actions}</div> : null}

        {hints && hints.length > 0 ? (
          <div className="w-full rounded-lg border bg-card/60 p-4 text-left text-sm backdrop-blur-sm">
            <div className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              What you can try
            </div>
            <ul className="space-y-1.5">
              {hints.map((hint, i) => (
                <li key={i} className="flex gap-2">
                  <span aria-hidden="true" className="mt-[0.55em] size-1.5 shrink-0 rounded-full bg-primary/60" />
                  <span className="min-w-0 [&_a]:underline [&_a]:underline-offset-4 [&_a:hover]:text-primary [&_code]:rounded [&_code]:bg-muted [&_code]:px-1 [&_code]:py-0.5 [&_code]:font-mono [&_code]:text-xs">
                    {hint}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        {(details && details.length > 0) || technical ? (
          <div className="w-full rounded-lg border bg-card/60 text-left text-sm backdrop-blur-sm">
            <div className="flex items-center justify-between border-b px-4 py-2">
              <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Details</div>
              <CopyButton text={copyText} />
            </div>
            {details && details.length > 0 ? (
              <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1.5 px-4 py-3">
                {details.map((d) => (
                  <div key={d.label} className="contents">
                    <dt className="whitespace-nowrap text-muted-foreground">{d.label}</dt>
                    <dd className={cn("min-w-0 break-all", d.mono && "font-mono text-xs leading-5")}>{d.value}</dd>
                  </div>
                ))}
              </dl>
            ) : null}
            {technical ? (
              <details className="group border-t">
                <summary className="cursor-pointer select-none px-4 py-2 text-xs font-medium text-muted-foreground hover:text-foreground">
                  Technical details
                </summary>
                <pre className="max-h-72 overflow-auto whitespace-pre-wrap break-all border-t bg-muted/40 px-4 py-3 font-mono text-xs leading-5">
                  {technical}
                </pre>
              </details>
            ) : null}
          </div>
        ) : null}
      </div>
    </div>
  )
}
