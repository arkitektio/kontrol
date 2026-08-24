import { AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { StatusPage } from "./StatusPage"
import {
  AccessDeniedPage,
  NetworkErrorPage,
  NotFoundPage,
  SignInRequiredPage,
  UnexpectedErrorPage,
} from "./pages"
import { classifyApolloError } from "./classifyError"

export interface QueryErrorProps {
  error: unknown
  /** What was being loaded ("hub", "client") — improves the copy. */
  resource?: string
  /** Identifier that was requested, shown in the details. */
  id?: string | null
  /** Re-run the query (e.g. apollo's `refetch`). */
  onRetry?: () => void
  /** Slim inline card for sub-sections instead of a full content-area page. */
  compact?: boolean
}

/**
 * Render the right status page for a failed Apollo query. Distinguishes
 * access-denied (lok's uniform "not found or not authorized"), sign-in
 * required, transport failures and everything else — each with actionable
 * guidance and copyable details.
 */
export function QueryError({ error, resource, id, onRetry, compact = false }: QueryErrorProps) {
  const classified = classifyApolloError(error)

  if (compact) {
    const title =
      classified.kind === "denied"
        ? `No access to ${resource ? `this ${resource}` : "this data"}`
        : classified.kind === "unauthenticated"
          ? "Sign in required"
          : classified.kind === "network"
            ? "Couldn't reach the server"
            : `Couldn't load ${resource ?? "this section"}`
    return (
      <StatusPage
        variant="compact"
        tone={classified.kind === "denied" ? "warning" : "destructive"}
        icon={AlertCircle}
        title={title}
        description={classified.message}
        details={id ? [{ label: "Id", value: id, mono: true }] : undefined}
        actions={
          onRetry ? (
            <Button type="button" size="sm" variant="outline" onClick={onRetry}>
              Retry
            </Button>
          ) : undefined
        }
      />
    )
  }

  switch (classified.kind) {
    case "denied":
      return <AccessDeniedPage resource={resource} id={id} message={classified.message} />
    case "unauthenticated":
      return <SignInRequiredPage message={classified.message} />
    case "network":
      return <NetworkErrorPage statusCode={classified.statusCode} message={classified.message} onRetry={onRetry} />
    default:
      return (
        <UnexpectedErrorPage
          error={error}
          title={resource ? `Couldn't load this ${resource}` : undefined}
          description={
            <>
              The server returned an error while loading {resource ? `this ${resource}` : "this page"}. The message
              below comes straight from the backend.
            </>
          }
          onRetry={onRetry}
        />
      )
  }
}

/**
 * The query succeeded but returned nothing — the canonical "X not found" for
 * detail pages. Reuses the resource flavour of the 404 page.
 */
export function ResourceNotFound({ resource, id }: { resource: string; id?: string | null }) {
  return <NotFoundPage resource={resource} id={id} />
}
