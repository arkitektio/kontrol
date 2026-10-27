import { useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { Link2, Trash2 } from "lucide-react"
import { toast } from "sonner"
import { PageHeader } from "../components/PageHeader"
import { Command } from "../components/Command"
import { ConfirmActionDialog } from "../components/ConfirmActionDialog"
import { Badge } from "../components/ui/badge"
import { Button } from "../components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import { Switch } from "../components/ui/switch"
import { QueryError, ResourceNotFound } from "@/components/status"
import { DetailPageSkeleton } from "@/components/skeletons"
import { toastError } from "@/lib/errors"
import { knownDownloads } from "@/lib/appDownloads"
import { isSafeInstallUrl, normalizeInstallUrl, type DeeplinkApp } from "@/lib/deeplinks"
import { useLinkApps } from "./useLinkApps"

function DetailsForm({
  app,
  saving,
  onSave,
}: {
  app: DeeplinkApp
  saving: boolean
  onSave: (details: Pick<DeeplinkApp, "name" | "installUrl" | "mobile">) => void
}) {
  const [name, setName] = useState(app.name)
  const [installUrl, setInstallUrl] = useState(app.installUrl ?? "")
  const [mobile, setMobile] = useState(app.mobile)

  const normalizedInstallUrl = normalizeInstallUrl(installUrl)
  const badInstallUrl = normalizedInstallUrl !== null && !isSafeInstallUrl(normalizedInstallUrl)
  const unchanged = name === app.name && installUrl === (app.installUrl ?? "") && mobile === app.mobile

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    if (unchanged || badInstallUrl || saving) return
    onSave({ name, installUrl, mobile })
  }

  return (
    <form onSubmit={submit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-1">
          <Label htmlFor="link-app-name">Name</Label>
          <Input id="link-app-name" maxLength={60} value={name} onChange={(e) => setName(e.target.value)} />
          <p className="text-xs text-muted-foreground">Shown on the button that opens the link.</p>
        </div>
        <div className="space-y-1">
          <Label htmlFor="link-app-install">Where to install it</Label>
          <Input
            id="link-app-install"
            placeholder="arkitekt.live/docs/guides/apps/orkestrator"
            value={installUrl}
            onChange={(e) => setInstallUrl(e.target.value)}
          />
          {badInstallUrl ? (
            <p className="text-sm text-destructive">Use an https address.</p>
          ) : knownDownloads(app.protocol) ? (
            <p className="text-xs text-muted-foreground">
              Not used for {app.protocol}://: links offer the latest {app.name} download for the
              visitor&apos;s system instead.
            </p>
          ) : (
            <p className="text-xs text-muted-foreground">
              Offered to someone who does not have the app yet. Without it they are only told
              the app is missing.
            </p>
          )}
        </div>
      </div>
      <div className="flex items-start gap-3">
        <Switch id="link-app-mobile" checked={mobile} onCheckedChange={setMobile} />
        <div className="space-y-1">
          <Label htmlFor="link-app-mobile">Available on mobile</Label>
          <p className="text-xs text-muted-foreground">
            On a phone or tablet a smart link opens the first app that has this switched on.
          </p>
        </div>
      </div>
      <Button type="submit" disabled={saving || unchanged || badInstallUrl}>
        {saving ? "Saving..." : "Save"}
      </Button>
    </form>
  )
}

/** One app that this organization's links may open (owner only). */
export default function LinkApp() {
  const { orgId, protocol } = useParams<{ orgId: string; protocol: string }>()
  const navigate = useNavigate()
  const { org, apps, loading, error, refetch, saving, saveApps } = useLinkApps(orgId)

  const index = apps.findIndex((candidate) => candidate.protocol === protocol)
  const app = index >= 0 ? apps[index] : null

  const [removeOpen, setRemoveOpen] = useState(false)

  if (loading && !org) return <DetailPageSkeleton sections={2} />
  if (error && !org) return <QueryError error={error} resource="organization" onRetry={() => refetch()} />
  if (!org) return <ResourceNotFound resource="organization" id={orgId} />

  const base = `/organization/${org.id}/link-apps`

  if (!org.amIOwner) {
    return (
      <div className="flex flex-1 flex-col gap-8 p-6">
        <PageHeader
          icon={Link2}
          title="Link app"
          description="Only the organization's owner decides which apps its links may open."
        />
      </div>
    )
  }
  if (!app) return <ResourceNotFound resource="link app" id={protocol} />

  const isDefault = index === 0
  const isMobileDefault = apps.find((candidate) => candidate.mobile) === app

  const saveDetails = async (details: Pick<DeeplinkApp, "name" | "installUrl" | "mobile">) => {
    try {
      await saveApps(apps.map((other) => (other === app ? { ...app, ...details } : other)))
      toast.success("App updated")
    } catch (err) {
      toastError(err, "Couldn't update the app")
    }
  }

  const makeDefault = async () => {
    try {
      await saveApps([app, ...apps.filter((other) => other !== app)])
      toast.success(`${app.name} is now the default`)
    } catch (err) {
      toastError(err, "Couldn't change the default app")
    }
  }

  const remove = async () => {
    try {
      await saveApps(apps.filter((other) => other !== app))
      toast.success(`Removed ${app.name}`)
      navigate(base)
    } catch (err) {
      toastError(err, "Couldn't remove the app")
      return false
    }
  }

  return (
    <div className="flex flex-1 flex-col gap-8 p-6">
      <PageHeader
        icon={Link2}
        title={
          <span className="flex flex-wrap items-center gap-2">
            {app.name}
            {isDefault && <Badge variant="secondary">Default</Badge>}
            {isMobileDefault && <Badge variant="secondary">Default on phones</Badge>}
          </span>
        }
        description={
          <>
            Links are handed to this app as <code>{app.protocol}://…</code>
          </>
        }
      />

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Details</CardTitle>
          <CardDescription>What someone following a link is told about this app.</CardDescription>
        </CardHeader>
        <CardContent>
          {/* Keyed on the stored values, so the form starts over when they change. */}
          <DetailsForm
            key={JSON.stringify([app.name, app.installUrl ?? "", app.mobile])}
            app={app}
            saving={saving}
            onSave={saveDetails}
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Links that open it</CardTitle>
          <CardDescription>
            {isDefault
              ? "As the default, this app also opens smart links, which name no app."
              : "A deep link names this app. Smart links open the default app instead."}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {org.id ? (
            <Command label="Copy deep link format">
              {`${window.location.origin}/deeplink/${org.id}/${app.protocol}/<path>`}
            </Command>
          ) : (
            <p className="text-sm text-muted-foreground">
              Links are addressed by the organization&apos;s handle, and this organization has none yet.
            </p>
          )}
          {!isDefault && (
            <Button variant="outline" size="sm" onClick={makeDefault} disabled={saving}>
              Make default
            </Button>
          )}
        </CardContent>
      </Card>

      <div className="flex items-center justify-between gap-4 border-t pt-6">
        <div>
          <p className="text-sm font-medium">Remove this app</p>
          <p className="text-sm text-muted-foreground">
            Links that name it stop working. {apps.length === 1 ? "It is the only app, so all links for this organization are switched off." : ""}
          </p>
        </div>
        <Button variant="destructive" size="sm" onClick={() => setRemoveOpen(true)}>
          <Trash2 className="mr-2 h-4 w-4" />
          Remove
        </Button>
        <ConfirmActionDialog
          open={removeOpen}
          onOpenChange={setRemoveOpen}
          title={`Remove ${app.name}?`}
          description={`Links for this organization will no longer open ${app.protocol}:// addresses.`}
          confirmLabel="Remove app"
          pendingLabel="Removing..."
          destructive
          onConfirm={remove}
        />
      </div>
    </div>
  )
}
