import type { ApolloError } from "@apollo/client"

/**
 * lok answers every object-level authorization failure with this exact text
 * (see lok `api/management/authz.py` / `karakter/authz.py`) so that ids can't
 * be probed across tenants. We match on it to show the access-denied page
 * instead of a generic error.
 */
const DENIED_RE = /not found,? or you are not authori[sz]ed/i
const AUTH_REQUIRED_RE = /(authentication required|not authenticated|login required|must be logged in)/i

export type QueryErrorKind = "denied" | "unauthenticated" | "network" | "unknown"

export interface ClassifiedError {
  kind: QueryErrorKind
  /** Joined human message(s). */
  message: string
  /** HTTP status of the failed transport, when known. */
  statusCode: number | null
}

type MaybeApolloError = Partial<ApolloError> & { message?: string }

export function classifyApolloError(error: unknown): ClassifiedError {
  const err = (error ?? {}) as MaybeApolloError
  const gqlErrors = err.graphQLErrors ?? []
  const messages = gqlErrors.map((e) => e.message).filter(Boolean)
  const message = messages.length > 0 ? messages.join("\n") : err.message || "Unknown error"

  const net = err.networkError as (Error & { statusCode?: number; result?: unknown }) | null | undefined
  const statusCode = net && typeof net.statusCode === "number" ? net.statusCode : null

  if (statusCode === 401 || statusCode === 403) {
    return { kind: statusCode === 401 ? "unauthenticated" : "denied", message, statusCode }
  }
  if (net) return { kind: "network", message: net.message || message, statusCode }
  if (messages.some((m) => DENIED_RE.test(m))) return { kind: "denied", message, statusCode }
  if (messages.some((m) => AUTH_REQUIRED_RE.test(m))) return { kind: "unauthenticated", message, statusCode }
  return { kind: "unknown", message, statusCode }
}

export function isDeniedError(error: unknown): boolean {
  return classifyApolloError(error).kind === "denied"
}
