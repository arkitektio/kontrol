import { toast } from "sonner"

/** The most useful message in an Apollo / fetch / allauth error, for showing to a user. */
export function errorMessage(error: unknown): string {
  if (!error) return "Unknown error"
  if (typeof error === "string") return error
  const e = error as { graphQLErrors?: { message: string }[]; errors?: { message: string }[]; message?: string }
  const first = e.graphQLErrors?.[0]?.message ?? e.errors?.[0]?.message
  return first ?? e.message ?? String(error)
}

/**
 * Report a failed user action: a toast with what failed and why, plus the console.
 * Use in every catch of a user-triggered mutation instead of a bare console.error.
 */
export function toastError(error: unknown, action: string) {
  console.error(action, error)
  toast.error(action, { description: errorMessage(error) })
}
