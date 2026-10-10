/**
 * Deep link policy and target building for the /deeplink and /smartlink pages.
 *
 * An organization lists the apps its links may be forwarded to (`deeplinkApps`:
 * a URL scheme, a name, where to install it, and whether it exists on mobile;
 * the first one is the default). The rules mirror
 * `karakter/deeplinks.py` in lok. They are checked again here, right before the
 * browser is pointed at the target, so that a stored value can never turn a
 * link page into a redirect to the web or a `javascript:` navigation.
 */

const PROTOCOL = /^[a-z][a-z0-9+.-]{0,31}$/

const FORBIDDEN = new Set([
  "http",
  "https",
  "javascript",
  "data",
  "file",
  "blob",
  "vbscript",
  "about",
  "ftp",
  "ws",
  "wss",
  "mailto",
  "tel",
])

export const MAX_DEEPLINK_APPS = 10

export type DeeplinkApp = {
  protocol: string
  name: string
  installUrl?: string | null
  mobile: boolean
}

/** Lowercase, trim and drop a pasted `://` — what lok does on save. */
export function normalizeProtocol(raw: string): string {
  return raw.trim().toLowerCase().replace(/:(\/\/)?$/, "")
}

export function isAllowedProtocolName(protocol: string): boolean {
  return PROTOCOL.test(protocol) && !FORBIDDEN.has(protocol)
}

/** The install link as lok stores it: https, with a bare host read as https. */
export function normalizeInstallUrl(raw: string): string | null {
  const trimmed = raw.trim()
  if (!trimmed) return null
  return trimmed.includes("://") ? trimmed : `https://${trimmed}`
}

/** An install link is rendered as an href, so it is held to https here too. */
export function isSafeInstallUrl(url: string | null | undefined): url is string {
  if (!url) return false
  try {
    return new URL(url).protocol === "https:"
  } catch {
    return false
  }
}

/** Phones and tablets: links there open the organization's mobile app. */
export function isMobileDevice(): boolean {
  const hinted = (navigator as { userAgentData?: { mobile?: boolean } }).userAgentData?.mobile
  if (typeof hinted === "boolean") return hinted
  // iPadOS reports itself as a Mac; the touch points give it away.
  return (
    /Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent) ||
    (/Macintosh/.test(navigator.userAgent) && navigator.maxTouchPoints > 1)
  )
}

/** The organization's usable apps, in order. */
function usable(apps: readonly DeeplinkApp[]): DeeplinkApp[] {
  return apps.filter((app) => isAllowedProtocolName(app.protocol))
}

export type LinkTarget = { target: string; app: DeeplinkApp } | { problem: string }

/** The raw (still percent-encoded) path segments of a pathname. */
function segments(pathname: string): string[] {
  return pathname.split("/").filter((segment) => segment.length > 0)
}

/**
 * `/deeplink/<org>/<protocol>/<path…>?<query>#<hash>` →
 * `<protocol>://<path…>?<query>#<hash>`.
 *
 * The path is forwarded as it arrived, encoding included; only the protocol is
 * interpreted, and it must belong to an app the organization allows.
 */
export function buildDeeplinkTarget(
  location: { pathname: string; search: string; hash: string },
  apps: readonly DeeplinkApp[],
): LinkTarget {
  const [, , rawProtocol, ...rest] = segments(location.pathname)
  const protocol = normalizeProtocol(rawProtocol ?? "")
  if (!isAllowedProtocolName(protocol) || rest.length === 0) {
    return { problem: "This link is incomplete or malformed." }
  }
  const app = usable(apps).find((candidate) => candidate.protocol === protocol)
  if (!app) {
    return { problem: `This organization does not allow links that open "${protocol}".` }
  }
  return { app, target: `${protocol}://${rest.join("/")}${location.search}${location.hash}` }
}

/**
 * `/smartlink/<org>/<hub>/<identifier>/<object_id>` →
 * `<default protocol>://smart/<org>/<hub>/<identifier>/<object_id>`.
 *
 * The default is the organization's first app, or on a mobile device its first
 * app that exists on mobile.
 *
 * An identifier may itself contain slashes (`@mikro/image`), written either
 * literally or as `%2F`: everything between the hub and the last segment is the
 * identifier. Each part is one encoded segment in the target.
 */
export function buildSmartlinkTarget(
  location: { pathname: string; search: string },
  apps: readonly DeeplinkApp[],
  mobile: boolean,
): LinkTarget {
  const [, rawOrg, hub, ...rest] = segments(location.pathname)
  let org: string, identifier: string, objectId: string
  try {
    org = decodeURIComponent(rawOrg ?? "")
    identifier = rest.slice(0, -1).map(decodeURIComponent).join("/")
    objectId = decodeURIComponent(rest[rest.length - 1] ?? "")
  } catch {
    return { problem: "This link is incomplete or malformed." }
  }
  if (!org || !/^\d+$/.test(hub ?? "") || !identifier || !objectId) {
    return { problem: "This link is incomplete or malformed." }
  }
  const candidates = usable(apps)
  if (candidates.length === 0) {
    return { problem: "This organization has not set an app to open links with." }
  }
  const app = mobile ? candidates.find((candidate) => candidate.mobile) : candidates[0]
  if (!app) {
    return { problem: "None of this organization's apps is available on mobile. Open the link on a computer." }
  }
  const path = [org, hub, identifier, objectId].map(encodeURIComponent).join("/")
  return { app, target: `${app.protocol}://smart/${path}${location.search}` }
}

/** The parts of a smartlink, for telling the visitor what it points at. */
export function describeSmartlink(pathname: string): { hub: string; identifier: string; objectId: string } | null {
  const [, , hub, ...rest] = segments(pathname)
  try {
    const identifier = rest.slice(0, -1).map(decodeURIComponent).join("/")
    const objectId = decodeURIComponent(rest[rest.length - 1] ?? "")
    return hub && identifier && objectId ? { hub, identifier, objectId } : null
  } catch {
    return null
  }
}

/** The app and path a deeplink names, for telling the visitor what it opens. */
export function describeDeeplink(pathname: string): { protocol: string; path: string } | null {
  const [, , rawProtocol, ...rest] = segments(pathname)
  const protocol = normalizeProtocol(rawProtocol ?? "")
  if (!isAllowedProtocolName(protocol) || rest.length === 0) return null
  try {
    return { protocol, path: rest.map(decodeURIComponent).join("/") }
  } catch {
    return { protocol, path: rest.join("/") }
  }
}
