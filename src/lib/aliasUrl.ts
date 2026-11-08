/** The fields every alias fragment carries that make up its address. */
export interface AliasAddress {
  kind?: string | null
  ssl?: boolean | null
  host?: string | null
  resolvedHost?: string | null
  port?: number | string | null
  path?: string | null
}

/** "" for no path, else exactly one leading slash: `api/v1` and `/api/v1` both give `/api/v1`. */
export function aliasPath(path?: string | null): string {
  const trimmed = (path ?? "").replace(/^\/+/, "")
  return trimmed ? `/${trimmed}` : ""
}

/**
 * An alias as a URL. A mesh alias's host is its hub's MagicDNS name, which lok
 * resolves live (`resolvedHost`); `fallbackHost` is shown when there is no host
 * at all (e.g. a layer name, or "[hub not on the mesh]").
 */
export function aliasUrl(alias: AliasAddress, fallbackHost = ""): string {
  const host = (alias.kind === "mesh" ? alias.resolvedHost : alias.host) || fallbackHost
  const port = alias.port ? `:${alias.port}` : ""
  return `${alias.ssl ? "https" : "http"}://${host}${port}${aliasPath(alias.path)}`
}
