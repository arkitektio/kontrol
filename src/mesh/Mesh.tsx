import { Link, useParams } from "react-router-dom"
import { useLayersQuery, useDetailLayerQuery } from "@/graphql/queries/layer.generated"
import { useTailnetLockQuery } from "@/graphql/queries/tailnet_lock.generated"
import { useOrganizationQuery } from "@/graphql/queries/organization.generated"
import { useUpdateIonscaleLayerMutation } from "@/graphql/mutations/layer.generated"
import type { ListMachineFragment } from "@/graphql/fragments/machine.generated"
import { MachineKind } from "@/api/types"
import { Card } from "../components/ui/card"
import { Button } from "../components/ui/button"
import { PageHeader } from "../components/PageHeader"
import { Network, Key, Monitor, Globe, ShieldCheck, Layers, AppWindow, ChevronDown, Settings2 } from "lucide-react"
import type { LucideIcon } from "lucide-react"
import { Label } from "../components/ui/label"
import { Switch } from "../components/ui/switch"
import { Badge } from "../components/ui/badge"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "../components/ui/collapsible"
import { toast } from "sonner"
import { toastError } from "@/lib/errors"
import { timeAgo } from "@/lib/time"
import { useIsOrgAdmin } from "@/hooks/useIsOrgAdmin"

import { QueryError, ResourceNotFound } from "@/components/status"

import { ListPageSkeleton } from "@/components/skeletons"

/**
 * Entry point into the guided tailnet lock setup, with the current state
 * summarised so the mesh page shows whether anything still needs doing.
 * Deliberately its own query: adding tailnetLock to the Layer fragment would
 * make every layer read hit the control plane.
 */
function TailnetLockSummary({ orgId, meshId }: { orgId: string; meshId: string }) {
  const { data, error } = useTailnetLockQuery({ variables: { id: meshId }, skip: !meshId })
  const lock = data?.layer?.tailnetLock

  const unsigned = lock ? lock.nodes.filter((n) => !n.signed).length : 0

  let status: string
  let cta = "Set up"
  if (error) {
    status = "Couldn't read the lock state from the control plane."
    cta = "Open"
  } else if (!lock) {
    status = "Checking..."
  } else if (!lock.capabilityEnabled) {
    status = "Off — machines are admitted on this control plane's word alone."
  } else if (!lock.authorityActive) {
    status = "Capability granted, but no key authority yet — nothing is locked."
    cta = "Finish setup"
  } else if (unsigned > 0) {
    status = `Locked — ${unsigned} machine${unsigned === 1 ? "" : "s"} awaiting a signature.`
    cta = "Manage"
  } else {
    status = "Locked — every machine's key is signed."
    cta = "Manage"
  }

  return (
    <section className="space-y-3">
      <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground flex items-center gap-2">
        <ShieldCheck className="h-4 w-4" /> Tailnet lock
      </h3>
      <Card className="flex flex-row items-center justify-between gap-4 p-4">
        <p className="text-sm text-muted-foreground">{status}</p>
        <Button variant="outline" size="sm" asChild>
          <Link to={`/organization/${orgId}/mesh/lock`}>{cta}</Link>
        </Button>
      </Card>
    </section>
  )
}

const isSidecarTag = (tag: string) => tag.startsWith("tag:app-") || tag.startsWith("tag:hub-")

/** Online first, then by name: the nodes someone is looking for are usually up. */
const byPresence = (a: ListMachineFragment, b: ListMachineFragment) =>
  Number(b.connected) - Number(a.connected) || a.name.localeCompare(b.name)

/** What a node is called and whose it is, by kind. */
function describeNode(machine: ListMachineFragment): { icon: LucideIcon; title: string; subtitle: string | null } {
  if (machine.kind === MachineKind.App) {
    const where = [machine.user?.username, machine.device?.name].filter(Boolean).join(" · ")
    return {
      icon: AppWindow,
      title: machine.app?.identifier ?? machine.name,
      subtitle: where || (machine.app ? null : "Its app is no longer connected"),
    }
  }
  if (machine.kind === MachineKind.Hub) {
    return {
      icon: Layers,
      title: machine.hub?.name ?? machine.name,
      subtitle: machine.hub ? "Hub server" : "Its hub is no longer connected",
    }
  }
  return { icon: Monitor, title: machine.name, subtitle: null }
}

function NodeCard({ orgId, machine }: { orgId: string; machine: ListMachineFragment }) {
  const { icon: Icon, title, subtitle } = describeNode(machine)
  const address = machine.magicDnsName || machine.ipv4 || machine.ipv6
  const tags = machine.tags.filter((tag) => !isSidecarTag(tag))
  // The node name only adds something when the title is the app or the hub.
  const showNodeName = title !== machine.name

  return (
    <Link to={`/organization/${orgId}/mesh/machines/${machine.id}`} className="block">
      <Card className="h-full gap-3 p-4 transition-colors hover:bg-muted/50">
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-muted">
            <Icon className="h-5 w-5" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="truncate font-medium" title={title}>{title}</div>
            {subtitle && <div className="truncate text-xs text-muted-foreground">{subtitle}</div>}
          </div>
          <div className="flex shrink-0 items-center gap-1.5 pt-0.5 text-xs text-muted-foreground">
            <span
              aria-hidden
              className={`h-2 w-2 rounded-full ${machine.connected ? "bg-green-500" : "bg-muted-foreground/40"}`}
            />
            {machine.connected ? "Online" : machine.lastSeen ? timeAgo(machine.lastSeen) : "Never seen"}
          </div>
        </div>
        <div className="space-y-0.5 text-xs text-muted-foreground">
          {address && <div className="truncate font-mono" title={address}>{address}</div>}
          {machine.magicDnsName && machine.ipv4 && <div className="font-mono">{machine.ipv4}</div>}
          {showNodeName && <div className="truncate">Node {machine.name}</div>}
        </div>
        {(tags.length > 0 || machine.ephemeral || machine.authorized === false) && (
          <div className="flex flex-wrap gap-1">
            {machine.authorized === false && <Badge variant="destructive" className="text-xs">Not authorized</Badge>}
            {machine.ephemeral && <Badge variant="outline" className="text-xs">Ephemeral</Badge>}
            {tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs">{tag}</Badge>
            ))}
          </div>
        )}
      </Card>
    </Link>
  )
}

function NodeSection({
  orgId,
  icon: Icon,
  title,
  description,
  machines,
  empty,
}: {
  orgId: string
  icon: LucideIcon
  title: string
  description: string
  machines: ListMachineFragment[]
  empty?: string
}) {
  if (machines.length === 0 && !empty) return null
  const online = machines.filter((m) => m.connected).length
  return (
    <section className="space-y-3">
      <div className="space-y-1">
        <h2 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
          <Icon className="h-4 w-4" /> {title}
          {machines.length > 0 && (
            <span className="font-normal normal-case tracking-normal">
              · {online} of {machines.length} online
            </span>
          )}
        </h2>
        <p className="text-xs text-muted-foreground">{description}</p>
      </div>
      {machines.length === 0 ? (
        <div className="rounded-lg border border-dashed p-6 text-center text-sm text-muted-foreground">{empty}</div>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {machines.map((machine) => (
            <NodeCard key={machine.id} orgId={orgId} machine={machine} />
          ))}
        </div>
      )}
    </section>
  )
}

function MeshDetail({ orgId, meshId }: { orgId: string; meshId: string }) {
  // Nodes join and drop off on their own; keep the lists current while open.
  const { data, loading, error } = useDetailLayerQuery({
    variables: { id: meshId },
    skip: !meshId,
    pollInterval: 30_000,
  })

  const [updateLayer, { loading: updatingDns }] = useUpdateIonscaleLayerMutation({
    refetchQueries: ["DetailLayer"],
  })

  // Changing the mesh takes the owner or admin role.
  const { isAdmin, loading: adminLoading } = useIsOrgAdmin(orgId)
  const readOnly = !adminLoading && !isAdmin

  if (loading && !data) return <ListPageSkeleton columns={3} count={6} />
  if (error && !data) return <QueryError error={error} resource="mesh" />
  if (!data?.layer) return <ResourceNotFound resource="mesh" id={meshId} />

  const mesh = data.layer

  // Toggling HTTPS/MagicDNS pushes the full desired DNS state to ionscale.
  // HTTPS certs require MagicDNS (the cert domain *is* the MagicDNS name), so
  // turning MagicDNS off also turns HTTPS off. The backend enforces this too.
  const handleDnsChange = async (
    patch: { magicDns?: boolean; httpsCerts?: boolean },
  ) => {
    const magicDns = patch.magicDns ?? mesh.magicDnsEnabled
    const httpsCerts = patch.magicDns === false ? false : patch.httpsCerts ?? mesh.httpsEnabled
    try {
      await updateLayer({
        variables: { input: { id: mesh.id, magicDns, httpsCerts } },
      })
      toast.success("Mesh network settings updated.")
    } catch (e) {
      toastError(e, "Couldn't update the mesh network settings")
    }
  }

  const machines = [...(mesh.machines ?? [])].sort(byPresence)
  const devices = machines.filter((m) => m.kind === MachineKind.Device)
  const hubs = machines.filter((m) => m.kind === MachineKind.Hub)
  const apps = machines.filter((m) => m.kind === MachineKind.App)

  return (
    <>
      <PageHeader
        icon={Network}
        title="Mesh"
        description="The private network of this organization: its machines, its hubs and the apps that reach them."
        actions={
          <Button asChild size="sm" variant="outline">
            <Link to={`/organization/${orgId}/mesh/authkeys`}>
              <Key className="mr-2 h-4 w-4" />
              Auth keys
            </Link>
          </Button>
        }
      />

      <NodeSection
        orgId={orgId}
        icon={Monitor}
        title="Machines"
        description="Whole machines that joined with an auth key or a login: servers, laptops, containers. They reach each other and are reachable by members."
        machines={devices}
        empty="No machine has joined yet. Create an auth key and run the command it gives you on the machine; it appears here on its own."
      />

      <NodeSection
        orgId={orgId}
        icon={Layers}
        title="Hubs"
        description="The node of each hub server. Apps connected to a hub reach it here."
        machines={hubs}
      />

      <NodeSection
        orgId={orgId}
        icon={AppWindow}
        title="Apps"
        description="One node per app installation that was granted mesh access. An app node reaches only its hub; rejecting the app removes it."
        machines={apps}
      />

      <Collapsible className="space-y-3">
        <CollapsibleTrigger className="group flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-muted-foreground hover:text-foreground">
          <Settings2 className="h-4 w-4" /> Network settings
          <ChevronDown className="h-4 w-4 transition-transform group-data-[state=open]:rotate-180" />
        </CollapsibleTrigger>
        <CollapsibleContent className="space-y-4">
          {readOnly && (
            <p className="text-xs text-muted-foreground">
              Only organization admins can change these settings.
            </p>
          )}
        <Card className="p-4 space-y-4">
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-1">
              <Label htmlFor="magic-dns" className="flex items-center gap-2">
                <Globe className="h-4 w-4 text-muted-foreground" /> MagicDNS
              </Label>
              <p className="text-xs text-muted-foreground max-w-md">
                Machines on this mesh reach each other by name instead of raw
                Tailscale IPs.
              </p>
            </div>
            <Switch
              id="magic-dns"
              checked={mesh.magicDnsEnabled}
              disabled={updatingDns || !isAdmin}
              onCheckedChange={(checked) => handleDnsChange({ magicDns: checked })}
            />
          </div>
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-1">
              <Label htmlFor="https-certs" className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-muted-foreground" /> HTTPS certificates
              </Label>
              <p className="text-xs text-muted-foreground max-w-md">
                Provision TLS certificates for services on the mesh. Requires
                MagicDNS.
              </p>
            </div>
            <Switch
              id="https-certs"
              checked={mesh.httpsEnabled}
              disabled={updatingDns || !mesh.magicDnsEnabled || !isAdmin}
              onCheckedChange={(checked) => handleDnsChange({ httpsCerts: checked })}
            />
          </div>
        </Card>
          <TailnetLockSummary orgId={orgId} meshId={meshId} />
        </CollapsibleContent>
      </Collapsible>
    </>
  )
}

export default function Mesh() {
  const { orgId } = useParams<{ orgId: string }>()

  const { data, loading, error } = useLayersQuery({
    variables: { filters: { organization: orgId || undefined } },
    skip: !orgId,
  })

  // Only the owner can enable a mesh (the toggle is on the Settings page).
  const { data: orgData } = useOrganizationQuery({ variables: { id: orgId! }, skip: !orgId })
  const isOwner = Boolean(orgData?.organization?.amIOwner)

  if (loading) return <ListPageSkeleton columns={3} count={6} />
  if (error) return <QueryError error={error} resource="mesh" />

  // The mesh is a per-organization singleton.
  const mesh = data?.layers?.[0]

  return (
    <div className="flex flex-1 flex-col gap-8 p-6">
      {mesh ? (
        <MeshDetail orgId={orgId!} meshId={mesh.id} />
      ) : (
        <div className="flex flex-col items-center gap-4 rounded-lg border border-dashed py-16 text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-muted">
            <Network className="h-7 w-7" />
          </div>
          <div className="space-y-1">
            <h1 className="text-xl font-semibold">Mesh disabled</h1>
            <p className="text-sm text-muted-foreground max-w-sm">
              This organization has no mesh, the private WireGuard network its machines
              can join.{" "}
              {isOwner
                ? "You can enable one in the organization's settings."
                : "Only the organization's owner can enable one: ask them to turn it on in the settings."}
            </p>
          </div>
          {isOwner && (
            <Button asChild variant="outline" size="sm">
              <Link to={`/organization/${orgId}/danger-zone`}>Open settings</Link>
            </Button>
          )}
        </div>
      )}
    </div>
  )
}
