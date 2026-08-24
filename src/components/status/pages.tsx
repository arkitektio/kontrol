import type { ReactNode } from "react"
import {
  ArrowLeft,
  Bug,
  House,
  KeyRound,
  LogIn,
  RefreshCw,
  SearchX,
  ShieldOff,
  Sparkles,
  Unplug,
  UserRound,
  WifiOff,
} from "lucide-react"
import { useContext } from "react"
import { Link, useInRouterContext, useLocation } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { StatusPage, type StatusDetail, type StatusPageProps } from "./StatusPage"
import { suggestRoutes } from "./suggestRoutes"
import { AuthContext } from "@/auth/AuthContext"
import { URLs } from "@/auth/routing"

type Variant = NonNullable<StatusPageProps["variant"]>

/* ------------------------------------------------------------------ helpers */

function BackButton({ fallback = "/home" }: { fallback?: string }) {
  const inRouter = useInRouterContext()
  return (
    <Button
      type="button"
      variant="outline"
      onClick={() => {
        // `idx` is set by react-router's history state; 0 means this is the
        // first entry, so "back" would leave the app.
        const idx = (window.history.state as { idx?: number } | null)?.idx ?? 0
        if (idx > 0 && inRouter) window.history.back()
        else window.location.assign(fallback)
      }}
    >
      <ArrowLeft />
      Go back
    </Button>
  )
}

function HomeButton({ variant = "default" }: { variant?: "default" | "outline" | "secondary" }) {
  // Status pages can render outside the router (top-level error boundary,
  // auth bootstrap), where <Link> would throw — fall back to a plain anchor.
  const inRouter = useInRouterContext()
  return (
    <Button asChild variant={variant}>
      {inRouter ? (
        <Link to="/home">
          <House />
          Home
        </Link>
      ) : (
        <a href="/home">
          <House />
          Home
        </a>
      )}
    </Button>
  )
}

function ReloadButton({ label = "Reload page" }: { label?: string }) {
  return (
    <Button type="button" onClick={() => window.location.reload()}>
      <RefreshCw />
      {label}
    </Button>
  )
}

function loginHref(next?: string) {
  const target = next ?? `${window.location.pathname}${window.location.search}`
  return `${URLs.LOGIN_URL}?next=${encodeURIComponent(target)}`
}

/** Who the caller is, for the "Signed in as" detail row. Safe outside the auth provider. */
function useAccountLabel(): string | null {
  const auth = useContext(AuthContext)?.auth
  if (!auth || typeof auth !== "object") return null
  const authenticated = auth.status === 200 || (auth.status === 401 && auth.meta?.is_authenticated)
  const user = authenticated
    ? (auth.data?.user as { email?: string; username?: string; display?: string } | undefined)
    : undefined
  if (!user) return null
  return user.email || user.username || user.display || null
}

function inflect(resource: string) {
  const lower = resource.toLowerCase()
  const article = /^[aeiou]/.test(lower) ? "an" : "a"
  return { lower, article, title: resource.charAt(0).toUpperCase() + resource.slice(1) }
}

/* ------------------------------------------------------------------- 404 */

export interface NotFoundPageProps {
  /** Human name of the thing that's missing ("hub", "client"). Omit for a route 404. */
  resource?: string
  /** The identifier that was looked up, shown in the details block. */
  id?: string | null
  /** Path that failed — defaults to the current location. */
  path?: string
  /** Active organization id, used to propose org-scoped routes. */
  orgId?: string | null
  variant?: Variant
  actions?: ReactNode
}

/**
 * Page / resource not found. For route 404s it proposes the closest known
 * routes ("did you mean …"); for resource 404s it explains that lok does not
 * distinguish "doesn't exist" from "not visible to you", so the user knows a
 * membership/role might be the real cause.
 */
export function NotFoundPage({ resource, id, path, orgId, variant = "embedded", actions }: NotFoundPageProps) {
  const location = useLocation()
  const account = useAccountLabel()
  const requested = path ?? `${location.pathname}${location.search}`

  if (resource) {
    const r = inflect(resource)
    const details: StatusDetail[] = [
      { label: r.title, value: id ?? "—", mono: true },
      { label: "Page", value: requested, mono: true },
    ]
    if (account) details.push({ label: "Signed in as", value: account })
    return (
      <StatusPage
        variant={variant}
        code={404}
        icon={SearchX}
        title={`${r.title} not found`}
        description={
          <>
            We couldn&apos;t find {r.article} {r.lower}
            {id ? (
              <>
                {" "}
                with the id <code className="rounded bg-muted px-1 py-0.5 font-mono text-[0.85em]">{id}</code>
              </>
            ) : null}{" "}
            that your account can see.
          </>
        }
        hints={[
          <>It may have been deleted or renamed — check the list it belongs to.</>,
          <>
            You might be looking at the wrong organization. Visibility is per membership: switch organizations from
            the account menu in the sidebar.
          </>,
          <>If someone sent you this link, ask them to confirm it and to make sure you are a member with the right role.</>,
        ]}
        actions={
          actions ?? (
            <>
              <BackButton />
              <HomeButton variant="outline" />
            </>
          )
        }
        details={details}
      />
    )
  }

  const suggestions = suggestRoutes(location.pathname, { orgId })
  const details: StatusDetail[] = [{ label: "Requested", value: requested, mono: true }]
  if (account) details.push({ label: "Signed in as", value: account })

  const hints: ReactNode[] = []
  if (suggestions.length > 0) {
    hints.push(
      <>
        Did you mean{" "}
        {suggestions.map((s, i) => (
          <span key={s.path}>
            {i > 0 ? (i === suggestions.length - 1 ? " or " : ", ") : null}
            <Link to={s.path}>{s.label}</Link>
          </span>
        ))}
        ?
      </>,
    )
  }
  hints.push(
    <>Check the address for typos — paths are case-sensitive.</>,
    <>If you followed a link from inside kontrol, the page may have moved; start again from the sidebar.</>,
  )
  if (!account) {
    hints.push(
      <>
        Some pages only exist once you are signed in — <Link to={loginHref()}>sign in</Link> and try again.
      </>,
    )
  }

  return (
    <StatusPage
      variant={variant}
      code={404}
      icon={SearchX}
      title="This page doesn't exist"
      description="The address you opened doesn't match any page in kontrol. It may have moved, or the link may be incomplete."
      hints={hints}
      actions={
        actions ?? (
          <>
            <HomeButton />
            <BackButton />
          </>
        )
      }
      details={details}
    />
  )
}

/* ------------------------------------------------------------------- 403 */

export interface AccessDeniedPageProps {
  resource?: string
  id?: string | null
  /** The raw server message, surfaced in the technical block. */
  message?: string | null
  variant?: Variant
  actions?: ReactNode
}

/**
 * The caller is signed in but the server refused (or hid) the object. lok
 * deliberately answers "not found, or not authorized" for both cases so ids
 * can't be probed across tenants — the copy reflects that honestly.
 */
export function AccessDeniedPage({ resource, id, message, variant = "embedded", actions }: AccessDeniedPageProps) {
  const location = useLocation()
  const account = useAccountLabel()
  const r = resource ? inflect(resource) : null

  const details: StatusDetail[] = []
  if (r) details.push({ label: r.title, value: id ?? "—", mono: true })
  details.push({ label: "Page", value: `${location.pathname}${location.search}`, mono: true })
  if (account) details.push({ label: "Signed in as", value: account })

  return (
    <StatusPage
      variant={variant}
      tone="warning"
      code={403}
      icon={ShieldOff}
      title={r ? `You can't access this ${r.lower}` : "Access denied"}
      description={
        r ? (
          <>
            Either this {r.lower} doesn&apos;t exist, or the account you&apos;re signed in with isn&apos;t allowed to see
            it. For safety the server doesn&apos;t say which.
          </>
        ) : (
          <>Your account isn&apos;t allowed to see this page, or the thing it refers to is hidden from you.</>
        )
      }
      hints={[
        <>
          Access is granted per organization and role. Make sure you&apos;re a member of the organization that owns
          this {r ? r.lower : "resource"} and switch to it from the account menu in the sidebar.
        </>,
        <>
          If you should have access, ask an organization admin to give your membership the right role — they can do
          that under <strong>Members</strong>.
        </>,
        <>
          Using several accounts? <Link to="/account/logout">Sign out</Link> and sign back in with the one that was
          invited.
        </>,
      ]}
      actions={
        actions ?? (
          <>
            <BackButton />
            <HomeButton variant="outline" />
            <Button asChild variant="ghost">
              <Link to="/account/logout">
                <UserRound />
                Switch account
              </Link>
            </Button>
          </>
        )
      }
      details={details}
      technical={message ?? null}
    />
  )
}

/* ------------------------------------------------------------------- 401 */

export function SignInRequiredPage({
  variant = "embedded",
  message,
}: {
  variant?: Variant
  message?: string | null
}) {
  const location = useLocation()
  const next = `${location.pathname}${location.search}`
  return (
    <StatusPage
      variant={variant}
      code={401}
      icon={KeyRound}
      title="Sign in to continue"
      description="This page is only available to signed-in users. Your session may also have expired."
      hints={[
        <>Sign in and you&apos;ll be brought straight back to this page.</>,
        <>If you were signed in a moment ago, your session probably timed out — signing in again is enough.</>,
      ]}
      actions={
        <>
          <Button asChild>
            <Link to={loginHref(next)}>
              <LogIn />
              Sign in
            </Link>
          </Button>
          <HomeButton variant="outline" />
        </>
      }
      details={[{ label: "Page", value: next, mono: true }]}
      technical={message ?? null}
    />
  )
}

/* ------------------------------------------------------------- network */

export interface NetworkErrorPageProps {
  /** HTTP status when the server answered but not with a usable response. */
  statusCode?: number | null
  message?: string | null
  variant?: Variant
  onRetry?: () => void
}

export function NetworkErrorPage({ statusCode, message, variant = "embedded", onRetry }: NetworkErrorPageProps) {
  const offline = typeof navigator !== "undefined" && navigator.onLine === false
  const serverSide = statusCode != null && statusCode >= 500
  const details: StatusDetail[] = [{ label: "Endpoint", value: "/lok/managementgraphql/", mono: true }]
  if (statusCode != null) details.push({ label: "HTTP status", value: String(statusCode), mono: true })
  details.push({ label: "Browser online", value: offline ? "no" : "yes" })

  return (
    <StatusPage
      variant={variant}
      tone="destructive"
      code={statusCode ?? undefined}
      icon={offline ? WifiOff : Unplug}
      title={offline ? "You're offline" : serverSide ? "The server hit an error" : "Can't reach the server"}
      description={
        offline
          ? "Your browser reports no network connection, so kontrol can't talk to the backend."
          : serverSide
            ? "The request reached lok, but it failed while processing it. This is on our side, not yours."
            : "The request to the backend didn't complete. It may be restarting, or something between you and it is blocking the call."
      }
      hints={[
        offline ? <>Reconnect and retry — nothing you did was lost.</> : <>Retry in a few seconds; deploys and restarts are brief.</>,
        <>If it keeps failing, check that the <code>lok</code> service is running and reachable from the gateway.</>,
        <>Copy the details below when reporting the problem — the timestamp helps find the matching server log.</>,
      ]}
      actions={
        <>
          {onRetry ? (
            <Button type="button" onClick={onRetry}>
              <RefreshCw />
              Retry
            </Button>
          ) : (
            <ReloadButton />
          )}
          <HomeButton variant="outline" />
        </>
      }
      details={details}
      technical={message ?? null}
    />
  )
}

/* ------------------------------------------------------------ generic */

export interface UnexpectedErrorPageProps {
  error?: unknown
  title?: ReactNode
  description?: ReactNode
  variant?: Variant
  onRetry?: () => void
  actions?: ReactNode
}

function describeError(error: unknown): { message: string; technical: string | null } {
  if (error instanceof Error) {
    return { message: error.message, technical: error.stack ?? `${error.name}: ${error.message}` }
  }
  if (typeof error === "string") return { message: error, technical: error }
  if (error && typeof error === "object") {
    const obj = error as { message?: unknown; statusText?: unknown; data?: unknown }
    const msg =
      (typeof obj.message === "string" && obj.message) ||
      (typeof obj.statusText === "string" && obj.statusText) ||
      (typeof obj.data === "string" && obj.data) ||
      "Unknown error"
    let technical: string | null = null
    try {
      technical = JSON.stringify(error, null, 2)
    } catch {
      technical = String(error)
    }
    return { message: msg, technical }
  }
  return { message: "Unknown error", technical: null }
}

export function UnexpectedErrorPage({ error, title, description, variant = "embedded", onRetry, actions }: UnexpectedErrorPageProps) {
  const { message, technical } = describeError(error)
  return (
    <StatusPage
      variant={variant}
      tone="destructive"
      icon={Bug}
      title={title ?? "Something went wrong"}
      description={description ?? "An unexpected error occurred while loading this page. Your data is safe — this is a problem in the app, not with your account."}
      hints={[
        <>Try again — many of these errors are transient.</>,
        <>If it happens every time, copy the details below and send them to whoever runs this kontrol instance.</>,
      ]}
      actions={
        actions ?? (
          <>
            {onRetry ? (
              <Button type="button" onClick={onRetry}>
                <RefreshCw />
                Try again
              </Button>
            ) : (
              <ReloadButton />
            )}
            <HomeButton variant="outline" />
          </>
        )
      }
      details={[{ label: "Error", value: message, mono: true }]}
      technical={technical}
    />
  )
}

/* ----------------------------------------------------- stale bundle */

export function UpdateAvailablePage({ variant = "page" }: { variant?: Variant }) {
  return (
    <StatusPage
      variant={variant}
      icon={Sparkles}
      title="kontrol was updated"
      description="A newer version of the app was deployed while this tab was open, so a part of the page couldn't be loaded. Reloading fixes it."
      actions={<ReloadButton label="Reload to update" />}
      hints={[<>Nothing you entered on other pages is affected — only this tab needs a refresh.</>]}
    />
  )
}
