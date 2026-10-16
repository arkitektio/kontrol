import { useEffect, useState } from "react"
import { ChevronDown, Download, ExternalLink, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { initialUrl, knownDownloads, resolveDownloadUrl, type AppDownload } from "@/lib/appDownloads"
import { isMobileDevice, isSafeInstallUrl, type DeeplinkApp } from "@/lib/deeplinks"
import { DESKTOP_PLATFORMS, MOBILE_PLATFORMS, PLATFORM_LABELS, detectPlatform, type Platform } from "@/lib/platform"

/** One download; a release asset swaps to the file itself once it is looked up. */
function DownloadButton({ download, primary }: { download: AppDownload; primary: boolean }) {
  const [url, setUrl] = useState(() => initialUrl(download.source))

  useEffect(() => {
    let current = true
    resolveDownloadUrl(download.source).then((resolved) => {
      if (current) setUrl(resolved)
    })
    return () => {
      current = false
    }
  }, [download.source])

  if (!isSafeInstallUrl(url)) return null
  const page = download.source.kind === "page"
  const Icon = page ? ExternalLink : Download

  return (
    <div className="space-y-1">
      <Button variant={primary ? "default" : "outline"} size={primary ? "default" : "sm"} className="w-full" asChild>
        <a href={url} {...(page ? { target: "_blank", rel: "noopener noreferrer" } : { rel: "noopener" })}>
          <Icon className="h-4 w-4" />
          {download.label}
        </a>
      </Button>
      {download.note && <p className="text-center text-xs text-muted-foreground">{download.note}</p>}
    </div>
  )
}

function LearnMore({ downloads }: { downloads: readonly AppDownload[] }) {
  const pages = [...new Map(downloads.map((download) => [download.learnMoreUrl, download.appName])).entries()]
  return (
    <div className="flex flex-wrap justify-center gap-x-4">
      {pages.map(([url, appName]) => (
        <Button key={url} variant="link" size="sm" className="h-auto p-0" asChild>
          <a href={url} target="_blank" rel="noopener noreferrer">
            <Info className="h-4 w-4" />
            Learn more about {appName}
          </a>
        </Button>
      ))}
    </div>
  )
}

function PlatformGroup({ title, downloads }: { title: string; downloads: readonly AppDownload[] }) {
  const platforms = [...new Set(downloads.map((download) => download.platform))]
  if (platforms.length === 0) return null
  return (
    <div className="space-y-2">
      <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{title}</p>
      {platforms.map((platform) => (
        <div key={platform} className="grid grid-cols-[6rem_1fr] items-start gap-2">
          <span className="pt-1.5 text-sm">{PLATFORM_LABELS[platform]}</span>
          <div className="space-y-2">
            {downloads
              .filter((download) => download.platform === platform)
              .map((download) => (
                <DownloadButton key={download.label} download={download} primary={false} />
              ))}
          </div>
        </div>
      ))}
    </div>
  )
}

/**
 * Where to get the app a link opens. For the apps kontrol knows, the build for
 * the visitor's system comes first (or, when the system can't be told, every
 * build for a phone or a computer, whichever this is), the others below. Any
 * other app gets the organization's install link, if it set one.
 */
export function AppDownloads({ app }: { app: DeeplinkApp }) {
  const [platform] = useState<Platform | null>(() => detectPlatform())
  const [mobile] = useState(() => isMobileDevice())
  const downloads = knownDownloads(app.protocol)

  if (!downloads) {
    return isSafeInstallUrl(app.installUrl) ? (
      <Button variant="outline" className="w-full" asChild>
        <a href={app.installUrl} target="_blank" rel="noopener noreferrer">
          <Download className="h-4 w-4" />
          Get {app.name}
        </a>
      </Button>
    ) : null
  }

  const deviceClass = mobile ? MOBILE_PLATFORMS : DESKTOP_PLATFORMS
  const primary = downloads.filter((download) =>
    platform ? download.platform === platform : deviceClass.includes(download.platform),
  )
  const others = downloads.filter((download) => !primary.includes(download))
  const desktop = others.filter((download) => DESKTOP_PLATFORMS.includes(download.platform))
  const phone = others.filter((download) => MOBILE_PLATFORMS.includes(download.platform))
  const where = platform ? PLATFORM_LABELS[platform] : mobile ? "phones and tablets" : "computers"

  return (
    <div className="space-y-3 rounded-md border p-3">
      <p className="text-center text-sm text-muted-foreground">
        {primary.length > 0
          ? `Don't have it yet? Get ${primary[0].appName}${platform ? ` for ${where}` : ""}:`
          : `${app.name} isn't available for ${where}. It is for:`}
      </p>
      {primary.length > 0 && (
        <div className="space-y-2">
          {primary.map((download) => (
            <DownloadButton key={download.label} download={download} primary />
          ))}
        </div>
      )}
      <LearnMore downloads={primary.length > 0 ? primary : others} />
      {others.length > 0 && (
        <Collapsible defaultOpen={primary.length === 0}>
          <CollapsibleTrigger asChild>
            <Button variant="ghost" size="sm" className="group w-full text-muted-foreground">
              Other platforms
              <ChevronDown className="h-4 w-4 transition-transform group-data-[state=open]:rotate-180" />
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="space-y-4 pt-2">
            <PlatformGroup title="Computer" downloads={desktop} />
            <PlatformGroup title="Phone & tablet" downloads={phone} />
          </CollapsibleContent>
        </Collapsible>
      )}
    </div>
  )
}
