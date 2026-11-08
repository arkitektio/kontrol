import { toast } from "sonner"
import { classifyApolloError } from "@/components/status/classifyError"

/**
 * Text that only ever comes out of a server bug (a Python exception leaking through
 * GraphQL), never out of a deliberate validation message. Showing it verbatim tells a
 * user nothing they can act on — e.g. "CreateInviteInput.__init__() missing 1 required
 * keyword-only argument: 'organization'".
 */
const INTERNAL_RE =
  /(__\w+__\(\)|missing \d+ required|unexpected keyword argument|object has no attribute|Traceback \(most recent|KeyError|TypeError|AttributeError|IntegrityError|DoesNotExist|NoneType)/

const SERVER_FAULT = "Something went wrong on the server. Try again, or copy the details for whoever runs it."

/** Every message in an Apollo / fetch / allauth error, raw, joined — for logs and "Copy details". */
export function errorDetails(error: unknown): string {
  if (!error) return "Unknown error"
  if (typeof error === "string") return error
  const e = error as {
    graphQLErrors?: { message: string }[]
    errors?: { message: string }[]
    networkError?: { message?: string; statusCode?: number } | null
    message?: string
  }
  const messages = (e.graphQLErrors?.length ? e.graphQLErrors : e.errors ?? []).map((m) => m.message).filter(Boolean)
  if (messages.length) return messages.join("\n")
  const net = e.networkError
  if (net?.message) return net.statusCode ? `${net.message} (HTTP ${net.statusCode})` : net.message
  return e.message || "Unknown error"
}

/** The most useful message in an Apollo / fetch / allauth error, phrased for a user. */
export function errorMessage(error: unknown): string {
  if (!error) return "Unknown error"
  if (typeof error === "string") return INTERNAL_RE.test(error) ? SERVER_FAULT : error

  const allauth = (error as { errors?: { message: string }[] }).errors
  if (!(error as { graphQLErrors?: unknown }).graphQLErrors && allauth?.length) {
    return allauth.map((m) => m.message).join("\n")
  }

  const classified = classifyApolloError(error)
  switch (classified.kind) {
    case "denied":
      return "You don't have access to this, or it no longer exists."
    case "unauthenticated":
      return "Your session has ended. Sign in again and retry."
    case "network":
      if (classified.statusCode && classified.statusCode >= 500) return SERVER_FAULT
      return "Couldn't reach the server. Check your connection and try again."
  }
  return INTERNAL_RE.test(classified.message) ? SERVER_FAULT : classified.message
}

async function copyDetails(details: string) {
  if (!navigator.clipboard) {
    toast.error("Clipboard is unavailable in this context")
    return
  }
  try {
    await navigator.clipboard.writeText(details)
    toast.success("Error details copied")
  } catch {
    toast.error("Couldn't copy the error details")
  }
}

/**
 * Report a failed user action: a toast with what failed and why, plus the console.
 * Use in every catch of a user-triggered mutation instead of a bare console.error.
 * When the friendly text hides the server's own message, the toast offers to copy it.
 */
export function toastError(error: unknown, action: string) {
  console.error(action, error)
  const message = errorMessage(error)
  const details = errorDetails(error)
  toast.error(action, {
    description: message,
    action: details !== message ? { label: "Copy details", onClick: () => void copyDetails(`${action}\n${details}`) } : undefined,
  })
}
