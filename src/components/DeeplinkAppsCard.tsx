import { useEffect, useState } from "react"
import { useUpdateOrganizationMutation } from "@/graphql/mutations/organization.generated"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { Badge } from "./ui/badge"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Switch } from "./ui/switch"
import { ArrowUp, Link2, X } from "lucide-react"
import { toast } from "sonner"
import { toastError } from "@/lib/errors"
import {
  MAX_DEEPLINK_APPS,
  isAllowedProtocolName,
  isSafeInstallUrl,
  normalizeInstallUrl,
  normalizeProtocol,
  type DeeplinkApp,
} from "@/lib/deeplinks"

type Draft = { protocol: string; name: string; installUrl: string; mobile: boolean }

const toDrafts = (apps: readonly DeeplinkApp[]): Draft[] =>
  apps.map((app) => ({
    protocol: app.protocol,
    name: app.name,
    installUrl: app.installUrl ?? "",
    mobile: app.mobile,
  }))

/**
 * Owner-only card for the apps this organization's links may open.
 *
 * `/deeplink/<handle>/<protocol>/…` only forwards to an app on this list;
 * `/smartlink/<handle>/…` names no protocol and opens the first app — on a
 * phone or tablet the first one marked as available on mobile — which is why
 * the order is editable. The install link is what the link page offers someone
 * who does not have the app yet. An empty list switches link forwarding off.
 *
 * lok is the authority on what is accepted (karakter/deeplinks.py); the checks
 * here only save a round trip for the obvious mistakes.
 */
export function DeeplinkAppsCard({
  organizationId,
  slug,
  deeplinkApps,
  publicLinkPreview,
}: {
  organizationId: string
  slug?: string | null
  deeplinkApps: readonly DeeplinkApp[]
  publicLinkPreview: boolean
}) {
  const [apps, setApps] = useState<Draft[]>(() => toDrafts(deeplinkApps))
  const [draft, setDraft] = useState("")

  // Adopt the stored list once it loads (or changes elsewhere).
  const savedKey = JSON.stringify(toDrafts(deeplinkApps))
  useEffect(() => {
    setApps(JSON.parse(savedKey))
  }, [savedKey])

  const [save, { loading }] = useUpdateOrganizationMutation({
    refetchQueries: ["Organization"],
  })

  const candidate = normalizeProtocol(draft)
  const draftProblem = !candidate
    ? null
    : !isAllowedProtocolName(candidate)
      ? "Use an app's URL scheme, such as orkestrator. Web schemes like https are not allowed."
      : apps.some((app) => app.protocol === candidate)
        ? "Already on the list."
        : apps.length >= MAX_DEEPLINK_APPS
          ? `At most ${MAX_DEEPLINK_APPS} apps.`
          : null

  const add = () => {
    if (!candidate || draftProblem) return
    setApps([
      ...apps,
      { protocol: candidate, name: candidate[0].toUpperCase() + candidate.slice(1), installUrl: "", mobile: false },
    ])
    setDraft("")
  }

  const update = (protocol: string, change: Partial<Draft>) =>
    setApps(apps.map((app) => (app.protocol === protocol ? { ...app, ...change } : app)))

  const badInstallUrl = (app: Draft) => {
    const url = normalizeInstallUrl(app.installUrl)
    return url !== null && !isSafeInstallUrl(url)
  }

  const unchanged = JSON.stringify(apps) === savedKey
  const invalid = apps.some(badInstallUrl)

  // Saved on its own, right away: it is a visibility switch, not part of the list.
  const togglePreview = async (next: boolean) => {
    try {
      await save({ variables: { input: { id: organizationId, publicLinkPreview: next } } })
      toast.success(next ? "The organization is now shown on its links" : "The organization is no longer shown on its links")
    } catch (e) {
      toastError(e, "Couldn't update the link preview")
    }
  }

  const handleSave = async () => {
    if (unchanged || invalid) return
    try {
      await save({
        variables: {
          input: {
            id: organizationId,
            deeplinkApps: apps.map((app) => ({
              protocol: app.protocol,
              name: app.name.trim() || null,
              installUrl: normalizeInstallUrl(app.installUrl),
              mobile: app.mobile,
            })),
          },
        },
      })
      toast.success("Link apps updated")
    } catch (e) {
      toastError(e, "Couldn't update the link apps")
    }
  }

  const origin = window.location.origin
  const mobileDefault = apps.find((app) => app.mobile)

  return (
    <Card>
      <CardHeader className="flex flex-row items-center gap-3 space-y-0">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
          <Link2 className="h-5 w-5" />
        </div>
        <div className="space-y-1">
          <CardTitle className="text-lg">Link apps</CardTitle>
          <CardDescription>
            The apps that links shared in this organization may open. Someone following a link
            is asked to log in, to join the organization, and is shown where to install the app.
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {apps.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            No apps: links for this organization are not forwarded.
          </p>
        ) : (
          <ul className="space-y-4">
            {apps.map((app, index) => (
              <li key={app.protocol} className="space-y-3 rounded-lg border p-3">
                <div className="flex flex-wrap items-center gap-2">
                  <code className="rounded bg-muted px-2 py-1 text-sm">{app.protocol}://</code>
                  {index === 0 && <Badge variant="secondary">Default</Badge>}
                  {app === mobileDefault && <Badge variant="secondary">Mobile default</Badge>}
                  <div className="ml-auto flex gap-1">
                    {index > 0 && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setApps([app, ...apps.filter((other) => other !== app)])}
                      >
                        <ArrowUp className="h-4 w-4" />
                        Move first
                      </Button>
                    )}
                    <Button
                      variant="ghost"
                      size="sm"
                      aria-label={`Remove ${app.protocol}`}
                      onClick={() => setApps(apps.filter((other) => other !== app))}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="space-y-1">
                    <Label htmlFor={`deeplink-name-${app.protocol}`}>Name</Label>
                    <Input
                      id={`deeplink-name-${app.protocol}`}
                      maxLength={60}
                      value={app.name}
                      onChange={(e) => update(app.protocol, { name: e.target.value })}
                    />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor={`deeplink-install-${app.protocol}`}>Where to install it</Label>
                    <Input
                      id={`deeplink-install-${app.protocol}`}
                      placeholder="arkitekt.live/docs/use/install"
                      value={app.installUrl}
                      onChange={(e) => update(app.protocol, { installUrl: e.target.value })}
                    />
                    {badInstallUrl(app) && (
                      <p className="text-sm text-destructive">Use an https address.</p>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Switch
                    id={`deeplink-mobile-${app.protocol}`}
                    checked={app.mobile}
                    onCheckedChange={(mobile) => update(app.protocol, { mobile })}
                  />
                  <Label htmlFor={`deeplink-mobile-${app.protocol}`}>Available on mobile</Label>
                </div>
              </li>
            ))}
          </ul>
        )}

        <div className="space-y-2">
          <Label htmlFor="org-deeplink-protocol">Register an app</Label>
          <div className="flex gap-2">
            <Input
              id="org-deeplink-protocol"
              className="w-full sm:w-72"
              placeholder="Its URL scheme, e.g. orkestrator"
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") add()
              }}
            />
            <Button variant="outline" onClick={add} disabled={!candidate || Boolean(draftProblem)}>
              Add
            </Button>
          </div>
          {draftProblem && <p className="text-sm text-destructive">{draftProblem}</p>}
        </div>

        {slug ? (
          <div className="space-y-1 text-sm text-muted-foreground">
            <p>
              Deeplink:{" "}
              <code className="break-all">
                {origin}/deeplink/{slug}/{apps[0]?.protocol ?? "<protocol>"}/&lt;path&gt;
              </code>
            </p>
            <p>
              Smartlink (opens the default; on a phone, the mobile default):{" "}
              <code className="break-all">
                {origin}/smartlink/{slug}/&lt;hub&gt;/&lt;identifier&gt;/&lt;object&gt;
              </code>
            </p>
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">
            Links are addressed by the organization's handle. Set one above to use them.
          </p>
        )}

        <Button onClick={handleSave} disabled={loading || unchanged || invalid}>
          {loading ? "Saving..." : "Save apps"}
        </Button>

        <div className="flex items-start gap-3 border-t pt-4">
          <Switch
            id="org-public-link-preview"
            checked={publicLinkPreview}
            disabled={loading}
            onCheckedChange={togglePreview}
          />
          <div className="space-y-1">
            <Label htmlFor="org-public-link-preview">Show this organization on its links</Label>
            <p className="text-sm text-muted-foreground">
              Off, someone who opens a link learns nothing about where it leads until they are a
              member. On, anyone holding a link sees this organization's name, description and
              logo, even without an account. Members who opted in on their profile are also
              shown as the person who shared it, when the link carries{" "}
              <code>?user_id=&lt;their id&gt;</code>.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
