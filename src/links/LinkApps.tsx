import { useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { ArrowRight, Link2, Plus, Smartphone } from "lucide-react"
import { toast } from "sonner"
import { PageHeader } from "../components/PageHeader"
import { ListEmpty } from "../components/ListEmpty"
import { Command } from "../components/Command"
import { Badge } from "../components/ui/badge"
import { Button } from "../components/ui/button"
import { Card } from "../components/ui/card"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import { Switch } from "../components/ui/switch"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog"
import { QueryError, ResourceNotFound } from "@/components/status"
import { ListPageSkeleton } from "@/components/skeletons"
import { toastError } from "@/lib/errors"
import { MAX_DEEPLINK_APPS, isAllowedProtocolName, normalizeProtocol } from "@/lib/deeplinks"
import { useLinkApps } from "./useLinkApps"

function Step({ n, title, children }: { n: number; title: string; children: React.ReactNode }) {
  return (
    <li className="flex gap-3">
      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-muted text-xs font-medium">
        {n}
      </span>
      <div className="space-y-0.5">
        <p className="text-sm font-medium">{title}</p>
        <p className="text-sm text-muted-foreground">{children}</p>
      </div>
    </li>
  )
}

/**
 * The apps that links shared in this organization may open (owner only).
 * Each app has its own page for the details; this one explains what the links
 * are, lists the apps and shows the link formats to hand out.
 */
export default function LinkApps() {
  const { orgId } = useParams<{ orgId: string }>()
  const navigate = useNavigate()
  const { org, apps, loading, error, refetch, saving, saveApps, setPublicPreview } = useLinkApps(orgId)

  const [addOpen, setAddOpen] = useState(false)
  const [draft, setDraft] = useState("")

  if (loading && !org) return <ListPageSkeleton columns={3} count={3} />
  if (error && !org) return <QueryError error={error} resource="organization" onRetry={() => refetch()} />
  if (!org) return <ResourceNotFound resource="organization" id={orgId} />
  if (!org.amIOwner) {
    return (
      <div className="flex flex-1 flex-col gap-8 p-6">
        <PageHeader
          icon={Link2}
          title="Link apps"
          description="Only the organization's owner decides which apps its links may open."
        />
      </div>
    )
  }

  const base = `/organization/${org.id}/link-apps`
  const origin = window.location.origin
  const mobileDefault = apps.find((app) => app.mobile)

  const candidate = normalizeProtocol(draft)
  const draftProblem = !candidate
    ? null
    : !isAllowedProtocolName(candidate)
      ? "Use the app's own URL scheme, such as orkestrator. Web schemes like https are not allowed."
      : apps.some((app) => app.protocol === candidate)
        ? "This app is already on the list."
        : apps.length >= MAX_DEEPLINK_APPS
          ? `An organization can have at most ${MAX_DEEPLINK_APPS} link apps.`
          : null

  const add = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!candidate || draftProblem || saving) return
    try {
      await saveApps([
        ...apps,
        { protocol: candidate, name: candidate[0].toUpperCase() + candidate.slice(1), installUrl: null, mobile: false },
      ])
      toast.success("App added")
      setAddOpen(false)
      setDraft("")
      // Its own page is where the name and the install link are filled in.
      navigate(`${base}/${candidate}`)
    } catch (err) {
      toastError(err, "Couldn't add the app")
    }
  }

  const togglePreview = async (next: boolean) => {
    try {
      await setPublicPreview(next)
      toast.success(next ? "The organization is now shown on its links" : "The organization is no longer shown on its links")
    } catch (err) {
      toastError(err, "Couldn't update the link preview")
    }
  }

  return (
    <div className="flex flex-1 flex-col gap-8 p-6">
      <PageHeader
        icon={Link2}
        title="Link apps"
        description="Share a web link that opens the right thing in a desktop or mobile app."
        actions={
          <Dialog
            open={addOpen}
            onOpenChange={(open) => {
              setAddOpen(open)
              if (!open) setDraft("")
            }}
          >
            <DialogTrigger asChild>
              <Button size="sm">
                <Plus className="mr-2 h-4 w-4" />
                Add an app
              </Button>
            </DialogTrigger>
            <DialogContent>
              <form onSubmit={add} className="grid gap-4">
                <DialogHeader>
                  <DialogTitle>Add an app</DialogTitle>
                  <DialogDescription>
                    Enter the URL scheme the app registers on the computer or phone: the part before{" "}
                    <code>://</code> in the links it opens. You fill in its name and where to install
                    it on the next page.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-2">
                  <Label htmlFor="link-app-protocol">URL scheme</Label>
                  <Input
                    id="link-app-protocol"
                    placeholder="orkestrator"
                    autoFocus
                    value={draft}
                    onChange={(e) => setDraft(e.target.value)}
                  />
                  {draftProblem && <p className="text-sm text-destructive">{draftProblem}</p>}
                </div>
                <DialogFooter>
                  <Button type="button" variant="outline" onClick={() => setAddOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit" disabled={saving || !candidate || Boolean(draftProblem)}>
                    {saving ? "Adding..." : "Add app"}
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        }
      />

      <section className="space-y-3">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">How a link works</h2>
        <ol className="grid gap-4 md:grid-cols-3">
          <Step n={1} title="Someone opens a link">
            A member shares an ordinary web link to something in this organization, in a chat, a
            paper or an email.
          </Step>
          <Step n={2} title="They are let in first">
            Whoever follows it is asked to sign in and, if they are not a member yet, to request to
            join. Nothing is forwarded to people outside the organization.
          </Step>
          <Step n={3} title="The app opens">
            The link is handed to one of the apps below. Someone who does not have the app is shown
            where to install it.
          </Step>
        </ol>
        <p className="text-sm text-muted-foreground">
          Links only ever open apps on this list, so a link cannot be used to launch something you
          did not choose. With no app listed, links for this organization are switched off.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">Apps</h2>
        {apps.length === 0 ? (
          <ListEmpty
            icon={Link2}
            title="No apps yet"
            description="Links for this organization are not forwarded until you add the app they should open."
            action={
              <Button size="sm" onClick={() => setAddOpen(true)}>
                <Plus className="mr-2 h-4 w-4" />
                Add an app
              </Button>
            }
          />
        ) : (
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {apps.map((app, index) => (
              <Link key={app.protocol} to={`${base}/${app.protocol}`} className="block">
                <Card className="h-full gap-2 p-4 transition-colors hover:bg-muted/50">
                  <div className="flex items-center justify-between gap-2">
                    <div className="truncate font-medium">{app.name}</div>
                    <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground" />
                  </div>
                  <code className="text-xs text-muted-foreground">{app.protocol}://</code>
                  <div className="flex flex-wrap gap-1">
                    {index === 0 && <Badge variant="secondary" className="text-xs">Default</Badge>}
                    {app === mobileDefault && (
                      <Badge variant="secondary" className="text-xs">
                        <Smartphone className="mr-1 h-3 w-3" />
                        Default on phones
                      </Badge>
                    )}
                    {!app.installUrl && <Badge variant="outline" className="text-xs">No install link</Badge>}
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </section>

      {apps.length > 0 && (
        <section className="space-y-3">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">The links to share</h2>
          {org.slug ? (
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <p className="text-sm font-medium">Smart link</p>
                <p className="text-sm text-muted-foreground">
                  Names no app: it opens the default one, or on a phone or tablet the first app
                  marked as available on mobile. Use this unless you need a specific app.
                </p>
                <Command label="Copy smart link format">
                  {`${origin}/smartlink/${org.slug}/<hub>/<identifier>/<object>`}
                </Command>
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium">Deep link</p>
                <p className="text-sm text-muted-foreground">
                  Names the app by its URL scheme and passes the rest of the address on to it
                  unchanged.
                </p>
                <Command label="Copy deep link format">
                  {`${origin}/deeplink/${org.slug}/${apps[0].protocol}/<path>`}
                </Command>
              </div>
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">
              Links are addressed by the organization&apos;s handle, and this organization has none.{" "}
              <Link className="underline" to={`/organization/${org.id}/danger-zone`}>
                Set one in the settings
              </Link>{" "}
              to use them.
            </p>
          )}
          <p className="text-sm text-muted-foreground">
            To let someone join without asking, add <code>?invite=&lt;token&gt;</code> from an{" "}
            <Link className="underline" to={`/organization/${org.id}/invites`}>
              invite
            </Link>{" "}
            you created; it is never passed on to the app. An ordinary invite lets one person join
            with its roles (guest unless you chose others), so only add it to a link you send to
            one person. An invite that shares objects (apps create these from a &quot;Share&quot;
            action) makes nobody a member: whoever accepts can open just those objects, and you
            can take them back at any time.
          </p>
          <p className="text-xs text-muted-foreground">
            Apps usually build these links for you (a &quot;Share&quot; or &quot;Copy link&quot; action); the formats are
            here for when you write one by hand.
          </p>
        </section>
      )}

      <section className="space-y-3">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">What a visitor sees</h2>
        <div className="flex items-start gap-3">
          <Switch
            id="org-public-link-preview"
            checked={org.publicLinkPreview}
            disabled={saving}
            onCheckedChange={togglePreview}
          />
          <div className="space-y-1">
            <Label htmlFor="org-public-link-preview">Show this organization on its links</Label>
            <p className="max-w-2xl text-sm text-muted-foreground">
              Off, someone who opens a link learns nothing about where it leads until they are a
              member. On, anyone holding a link sees this organization&apos;s name, description and
              logo, even without an account. Members who opted in on their profile are also shown as
              the person who shared it, when the link carries <code>?user_id=&lt;their id&gt;</code>.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
