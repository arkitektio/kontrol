import { Link, useParams } from "react-router-dom"
import { useLayersQuery, useDetailLayerQuery } from "@/graphql/queries/layer.generated"
import { useTailnetLockQuery } from "@/graphql/queries/tailnet_lock.generated"
import { useOrganizationQuery } from "@/graphql/queries/organization.generated"
import { useCreateIonscaleAuthKeyMutation, useUpdateIonscaleLayerMutation } from "@/graphql/mutations/layer.generated"
import { Card } from "../components/ui/card"
import { Button } from "../components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "../components/ui/alert"
import { PageHeader } from "../components/PageHeader"
import { Network, Key, Plus, Monitor, Info, Globe, ShieldCheck } from "lucide-react"
import { useEffect, useState } from "react"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import { Switch } from "../components/ui/switch"
import { Checkbox } from "../components/ui/checkbox"
import { Badge } from "../components/ui/badge"
import { toast } from "sonner"
import { toastError } from "@/lib/errors"
import { timeAgo } from "@/lib/time"
import { useIsOrgAdmin } from "@/hooks/useIsOrgAdmin"
import { Command } from "../components/Command"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import { QueryError, ResourceNotFound } from "@/components/status"

import { ListPageSkeleton } from "@/components/skeletons"

// Explains the machine-vs-device distinction the user asked to surface.
function MachinesVsDevicesNote() {
  return (
    <Alert className="mb-4">
      <Info className="h-4 w-4" />
      <AlertTitle>Machines are not the same as devices</AlertTitle>
      <AlertDescription>
        A <strong>machine</strong> is any host that has joined this mesh with an auth
        key — a server, a laptop, a container. A <strong>device</strong> is something
        registered with your organization in Arkitekt. They often line up (a device
        is frequently running on one machine), but they are distinct: a machine can
        join the mesh without ever being a device, and a single device may span
        several machines. This page lists machines on the network, not devices.
      </AlertDescription>
    </Alert>
  )
}

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

/**
 * The coordination server machines log in to, from lok's discovery document
 * (the management API does not expose it). Null until loaded, or if it fails.
 */
function useMeshCoordUrl(enabled: boolean): string | null {
  const [url, setUrl] = useState<string | null>(null)
  useEffect(() => {
    if (!enabled || url) return
    let cancelled = false
    fetch("/lok/.well-known/fakts")
      .then((r) => (r.ok ? r.json() : null))
      .then((doc) => {
        if (!cancelled && doc?.mesh_coord_url) setUrl(doc.mesh_coord_url)
      })
      .catch(() => undefined)
    return () => {
      cancelled = true
    }
  }, [enabled, url])
  return url
}

function MeshDetail({ orgId, meshId }: { orgId: string; meshId: string }) {
  // Machines join and drop off on their own; keep the list current while open.
  const { data, loading, error } = useDetailLayerQuery({
    variables: { id: meshId },
    skip: !meshId,
    pollInterval: 30_000,
  })

  const [createAuthKey, { loading: creatingKey }] = useCreateIonscaleAuthKeyMutation({
    refetchQueries: ["DetailLayer"],
  })

  const [updateLayer, { loading: updatingDns }] = useUpdateIonscaleLayerMutation({
    refetchQueries: ["DetailLayer"],
  })

  const [createKeyDialogOpen, setCreateKeyDialogOpen] = useState(false)
  const [newKeyEphemeral, setNewKeyEphemeral] = useState(false)
  const [newKeyTags, setNewKeyTags] = useState("")
  // The key just minted, shown once in the dialog with the command to use it.
  const [createdKey, setCreatedKey] = useState<string | null>(null)
  const coordUrl = useMeshCoordUrl(createKeyDialogOpen)

  // Changing the mesh and minting keys take the owner or admin role.
  const { isAdmin, loading: adminLoading } = useIsOrgAdmin(orgId)
  const readOnly = !adminLoading && !isAdmin

  if (loading && !data) return <ListPageSkeleton columns={3} count={6} />
  if (error && !data) return <QueryError error={error} resource="mesh" />
  if (!data?.layer) return <ResourceNotFound resource="mesh" id={meshId} />

  const mesh = data.layer

  const handleCreateKey = async () => {
    try {
      const result = await createAuthKey({
        variables: {
          input: {
            layerId: mesh.id,
            ephemeral: newKeyEphemeral,
            tags: newKeyTags.split(",").map((t) => t.trim()).filter((t) => t.length > 0),
          },
        },
      })
      setNewKeyEphemeral(false)
      setNewKeyTags("")
      const key = result.data?.createIonscaleAuthKey?.key
      if (key) {
        setCreatedKey(key)
      } else {
        setCreateKeyDialogOpen(false)
        toast.success("Auth key created")
      }
    } catch (e) {
      toastError(e, "Couldn't create the auth key")
    }
  }

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

  return (
    <>
      {/* Header */}
      <PageHeader
        icon={Network}
        title="Mesh"
        description="The private WireGuard network for this organization. Clients opt in to join it."
      />

      <TailnetLockSummary orgId={orgId} meshId={meshId} />

      {/* Network settings */}
      <section className="space-y-3">
        <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground flex items-center gap-2">
          <Globe className="h-4 w-4" /> Network settings
        </h3>
        {readOnly && (
          <p className="text-xs text-muted-foreground">
            Only organization admins can change these settings or create auth keys.
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
      </section>

      {/* Machines */}
      <section className="space-y-3">
        <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground flex items-center gap-2">
          <Monitor className="h-4 w-4" /> Machines
        </h3>
        <MachinesVsDevicesNote />
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {mesh.machines?.map((machine: any) => (
            <Link key={machine.id} to={`/organization/${orgId}/mesh/machines/${machine.id}`} className="block">
              <Card className="p-4 hover:bg-muted/50 transition-colors">
                <div className="flex items-center justify-between gap-2">
                  <div className="font-medium truncate">{machine.name}</div>
                  <Badge variant={machine.connected ? "default" : "secondary"} className="text-xs shrink-0">
                    {machine.connected ? "Connected" : "Offline"}
                  </Badge>
                </div>
                {machine.magicDnsName && (
                  <div className="text-xs font-mono text-muted-foreground truncate" title={machine.magicDnsName}>
                    {machine.magicDnsName}
                  </div>
                )}
                <div className="text-xs text-muted-foreground">{machine.ipv4}</div>
                <div className="text-xs text-muted-foreground">{machine.ipv6}</div>
                {!machine.connected && machine.lastSeen && (
                  <div className="text-xs text-muted-foreground">Last seen {timeAgo(machine.lastSeen)}</div>
                )}
              </Card>
            </Link>
          ))}
          {(!mesh.machines || mesh.machines.length === 0) && (
            <div className="text-sm text-muted-foreground">
              No machines have joined the mesh yet. Create an auth key below and run the command it
              gives you on a machine; it appears here on its own.
            </div>
          )}
        </div>
      </section>

      {/* Auth Keys */}
      <section className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground flex items-center gap-2">
              <Key className="h-4 w-4" /> Auth Keys
            </h3>
            {isAdmin && (
            <Dialog
              open={createKeyDialogOpen}
              onOpenChange={(open) => {
                setCreateKeyDialogOpen(open)
                if (!open) setCreatedKey(null)
              }}
            >
              <DialogTrigger asChild>
                <Button size="sm">
                  <Plus className="mr-2 h-4 w-4" />
                  Create Auth Key
                </Button>
              </DialogTrigger>
              {createdKey ? (
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Auth key created</DialogTitle>
                  <DialogDescription>
                    Run this on the machine that should join the mesh. The key stays
                    available on this page for you and the other admins.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-3 py-2">
                  <Command>{`tailscale up --login-server ${coordUrl ?? "<coordination server URL>"} --authkey ${createdKey}`}</Command>
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground">The key on its own:</p>
                    <Command label="Copy auth key">{createdKey}</Command>
                  </div>
                </div>
                <DialogFooter>
                  <Button onClick={() => { setCreateKeyDialogOpen(false); setCreatedKey(null) }}>Done</Button>
                </DialogFooter>
              </DialogContent>
              ) : (
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create Auth Key</DialogTitle>
                  <DialogDescription>
                    An auth key lets a machine join this mesh. You get the command to run on
                    that machine in the next step.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-1 gap-2 sm:grid-cols-4 sm:items-center sm:gap-4">
                    <Label htmlFor="tags" className="sm:text-right">
                      Tags
                    </Label>
                    <Input
                      id="tags"
                      placeholder="tag:value, tag2"
                      value={newKeyTags}
                      onChange={(e) => setNewKeyTags(e.target.value)}
                      className="sm:col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-1 gap-2 sm:grid-cols-4 sm:items-center sm:gap-4">
                    <Label htmlFor="ephemeral" className="sm:text-right">
                      Ephemeral
                    </Label>
                    <div className="sm:col-span-3 flex items-center space-x-2">
                      <Checkbox
                        id="ephemeral"
                        checked={newKeyEphemeral}
                        onCheckedChange={(checked) => setNewKeyEphemeral(checked === true)}
                      />
                      <label htmlFor="ephemeral" className="text-sm font-medium leading-none">
                        Ephemeral keys are automatically removed when offline.
                      </label>
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="secondary" onClick={() => setCreateKeyDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleCreateKey} disabled={creatingKey}>
                    {creatingKey ? "Creating..." : "Create"}
                  </Button>
                </DialogFooter>
              </DialogContent>
              )}
            </Dialog>
            )}
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {mesh.authKeys?.map((key: any) => (
              <Link key={key.id} to={`/organization/${orgId}/mesh/authkeys/${key.id}`} className="block">
                <Card className="p-4 hover:bg-muted/50 transition-colors">
                  <div className="flex items-center gap-2 mb-2">
                    <Key className="h-4 w-4 text-muted-foreground shrink-0" />
                    {/* lok only returns the key to its creator and to admins. */}
                    <div className="font-medium truncate">{key.key ?? "Hidden key"}</div>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {key.ephemeral && <Badge variant="outline" className="text-xs">Ephemeral</Badge>}
                    {key.tags?.map((tag: string) => (
                      <Badge key={tag} variant="secondary" className="text-xs">{tag}</Badge>
                    ))}
                  </div>
                </Card>
              </Link>
            ))}
            {(!mesh.authKeys || mesh.authKeys.length === 0) && (
              <div className="text-sm text-muted-foreground">No auth keys yet.</div>
            )}
          </div>
      </section>
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
