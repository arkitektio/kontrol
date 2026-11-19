/** The port typed into an alias form as a number, or null when it is not a valid TCP port. */
export function parsePort(value: string): number | null {
  const port = Number(value.trim())
  return value.trim() !== "" && Number.isInteger(port) && port >= 1 && port <= 65535 ? port : null
}

export const PORT_ERROR = "Port must be a whole number between 1 and 65535."
export const HOST_ERROR = "Enter a host, e.g. example.com."

/**
 * The priority typed into an alias or rule form: `null` for an empty field, the
 * whole number otherwise, or `undefined` when it is not a whole number.
 */
export function parsePriority(value: string): number | null | undefined {
  const trimmed = value.trim()
  if (trimmed === "") return null
  return /^-?\d+$/.test(trimmed) ? Number(trimmed) : undefined
}

export const PRIORITY_ERROR = "Priority must be a whole number (lower is tried first)."

/** Help text shared by the alias forms. */
export const PRIORITY_HELP =
  "Lower is tried first. Leave empty for the default of the alias's reach (internal 10, loopback 20, lan 30, mesh 40, public 50)."
