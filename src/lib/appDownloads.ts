import type { Platform } from "./platform"

/**
 * Where to get the apps kontrol knows by their URL scheme, per platform.
 *
 * An organization's link apps only carry one install link each (see
 * `./deeplinks`); for the Arkitekt apps kontrol knows better and offers the
 * build for the visitor's system instead. Nothing here names a version: a
 * release asset whose file name carries the version is looked up in the repo's
 * latest release when the page needs it, and until then (or if GitHub can't be
 * reached) the button opens that latest release's page.
 */

export type DownloadSource =
  | { kind: "direct"; url: string }
  /** The asset of the repo's latest release whose name matches. */
  | { kind: "latest-asset"; repo: string; match: RegExp }
  /** Not a file: a page that explains how to get it. */
  | { kind: "page"; url: string }

export type AppDownload = {
  platform: Platform
  /** The app as it is called on this platform (Orkestrator vs its phone edition). */
  appName: string
  label: string
  source: DownloadSource
  note?: string
  learnMoreUrl: string
}

const ORKESTRATOR_REPO = "arkitektio/orkestrator"
const POKKET_REPO = "arkitektio/pokket"
const ORKESTRATOR_DOCS = "https://arkitekt.live/docs/guides/apps/orkestrator"
const POKKET_DOCS = "https://arkitekt.live/docs/guides/apps/pokket"

const orkestratorDesktop: AppDownload[] = [
  {
    platform: "macos",
    appName: "Orkestrator",
    label: "Download for macOS",
    source: { kind: "latest-asset", repo: ORKESTRATOR_REPO, match: /^orkestrator-[\d.]+\.dmg$/i },
    note: "Apple silicon",
    learnMoreUrl: ORKESTRATOR_DOCS,
  },
  {
    platform: "windows",
    appName: "Orkestrator",
    label: "Download for Windows",
    source: { kind: "latest-asset", repo: ORKESTRATOR_REPO, match: /^orkestrator-[\d.]+-setup\.exe$/i },
    learnMoreUrl: ORKESTRATOR_DOCS,
  },
  {
    platform: "linux",
    appName: "Orkestrator",
    label: "Download AppImage",
    source: { kind: "latest-asset", repo: ORKESTRATOR_REPO, match: /^orkestrator-[\d.]+\.AppImage$/i },
    note: "Most distributions",
    learnMoreUrl: ORKESTRATOR_DOCS,
  },
  {
    platform: "linux",
    appName: "Orkestrator",
    label: "Download .deb",
    source: { kind: "latest-asset", repo: ORKESTRATOR_REPO, match: /^orkestrator_[\d.]+_amd64\.deb$/i },
    note: "Debian, Ubuntu",
    learnMoreUrl: ORKESTRATOR_DOCS,
  },
]

// The phone edition of Orkestrator. It answers both `pokket://` and
// `orkestrator://`, so it is what an orkestrator link opens on a phone.
const pokketMobile: AppDownload[] = [
  {
    platform: "android",
    appName: "Orkestrator (pokket)",
    label: "Download APK",
    source: { kind: "direct", url: `https://github.com/${POKKET_REPO}/releases/latest/download/pokket.apk` },
    note: "Allow installs from your browser when asked",
    learnMoreUrl: POKKET_DOCS,
  },
  {
    platform: "ios",
    appName: "Orkestrator (pokket)",
    label: "Get it on TestFlight",
    source: { kind: "page", url: POKKET_DOCS },
    note: "Ask an admin to add you as a tester",
    learnMoreUrl: POKKET_DOCS,
  },
]

const CATALOG: Record<string, readonly AppDownload[]> = {
  orkestrator: [...orkestratorDesktop, ...pokketMobile],
  pokket: pokketMobile,
}

/** The known downloads for an app's URL scheme, or null if kontrol doesn't know it. */
export function knownDownloads(protocol: string): readonly AppDownload[] | null {
  return CATALOG[protocol] ?? null
}

/** Where a download points before (or without) a lookup. */
export function initialUrl(source: DownloadSource): string {
  return source.kind === "latest-asset" ? `https://github.com/${source.repo}/releases/latest` : source.url
}

type ReleaseAsset = { name: string; browser_download_url: string }

const latestAssets = new Map<string, Promise<readonly ReleaseAsset[]>>()

function fetchLatestAssets(repo: string): Promise<readonly ReleaseAsset[]> {
  let pending = latestAssets.get(repo)
  if (!pending) {
    pending = fetch(`https://api.github.com/repos/${repo}/releases/latest`, {
      headers: { Accept: "application/vnd.github+json" },
    })
      .then((response) => (response.ok ? response.json() : { assets: [] }))
      .then((release: { assets?: ReleaseAsset[] }) => release.assets ?? [])
      .catch(() => [])
    latestAssets.set(repo, pending)
  }
  return pending
}

/**
 * The file a download points at: for a release asset, the matching file of the
 * latest release, else that release's page. Only ever an https GitHub address.
 */
export async function resolveDownloadUrl(source: DownloadSource): Promise<string> {
  if (source.kind !== "latest-asset") return source.url
  const assets = await fetchLatestAssets(source.repo)
  const asset = assets.find((candidate) => source.match.test(candidate.name))
  const url = asset?.browser_download_url
  return url && url.startsWith(`https://github.com/${source.repo}/releases/download/`) ? url : initialUrl(source)
}
