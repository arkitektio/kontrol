/** The port typed into an alias form as a number, or null when it is not a valid TCP port. */
export function parsePort(value: string): number | null {
  const port = Number(value.trim())
  return value.trim() !== "" && Number.isInteger(port) && port >= 1 && port <= 65535 ? port : null
}

export const PORT_ERROR = "Port must be a whole number between 1 and 65535."
export const HOST_ERROR = "Enter a host, e.g. example.com."
