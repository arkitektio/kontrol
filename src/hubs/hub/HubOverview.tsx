import { Link, useParams, useNavigate } from "react-router-dom"
import { useGetHubQuery, HubsDocument } from "@/graphql/queries/hub.generated"
import { useDeleteHubMutation, useUpdateHubMutation } from "@/graphql/mutations/hub.generated"
import { toastError } from "@/lib/errors"
import { toast } from "sonner"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../../components/ui/card"
import { Badge } from "../../components/ui/badge"
import { Button } from "../../components/ui/button"
import { Layers, Server, Box, KeyRound, ArrowRight, Pencil, Trash2, Activity, Network } from "lucide-react"
import { ConfirmActionDialog } from "@/components/ConfirmActionDialog"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import { formatDistanceToNow } from "date-fns"
import { HubStatusBadge } from "../HubStatusBadge"
import { AdminOnly } from "../../components/AdminOnly"

export default function HubOverview() {
  const { orgId, name } = useParams<{ orgId: string; name: string }>()
  const navigate = useNavigate()
  // Health is pushed by the hub once a minute; keep the page current while it is open.
  const { data } = useGetHubQuery({ variables: { id: name! }, skip: !name, pollInterval: 30_000 })
  const hub = data?.hub

  const [deleteHub] = useDeleteHubMutation({
    refetchQueries: [{ query: HubsDocument, variables: { filters: { organization: orgId || undefined } } }],
    // The sidebar and the dashboard keep their own hub lists.
    update: (cache) => {
      cache.evict({ id: "ROOT_QUERY", fieldName: "hubs" })
      cache.gc()
    },
  })
  const [updateHub, { loading: renaming }] = useUpdateHubMutation()
  const [deleteOpen, setDeleteOpen] = useState(false)
  const [updateDialogOpen, setUpdateDialogOpen] = useState(false)
  const [newName, setNewName] = useState("")

  if (!hub) return null

  const base = `/organization/${orgId}/hubs/${name}`
  const sections = [
    {
      to: `${base}/services`,
      icon: Server,
      label: "Services",
      count: hub.instances.length,
      description: "Service instances deployed in this hub.",
    },
    {
      to: `${base}/clients`,
      icon: Box,
      label: "Clients",
      count: hub.clients.length,
      description: "Apps and clients connected to this hub.",
    },
    {
      to: `${base}/mandates`,
      icon: KeyRound,
      label: "Mandates",
      description: "Keys that log apps in without a browser.",
    },
  ]

  const handleDelete = async () => {
    try {
      await deleteHub({ variables: { input: { id: hub.id } } })
      toast.success(`Deleted ${hub.name}`)
      navigate(`/organization/${orgId}/hubs`)
    } catch (e) {
      toastError(e, "Couldn't delete the hub")
      return false
    }
  }

  const handleUpdate = async () => {
    if (!newName.trim()) return
    try {
      await updateHub({ variables: { input: { id: hub.id, name: newName.trim() } } })
      // The hub is addressed by id, so the URL stays; the mutation returns the
      // hub, which updates the cached name everywhere.
      setUpdateDialogOpen(false)
      toast.success("Hub renamed")
    } catch (e) {
      toastError(e, "Couldn't rename the hub")
    }
  }

  return (
    <div className="space-y-6">
      {/* Hub header — only on the overview page */}
      <div className="flex flex-row items-start justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-muted">
            <Layers className="h-7 w-7" />
          </div>
          <div className="space-y-1">
            <h1 className="text-2xl font-bold tracking-tight">{hub.name}</h1>
            <p className="text-sm text-muted-foreground">{hub.organization.name}</p>
            <div className="flex gap-2 pt-1 flex-wrap">
              <HubStatusBadge online={hub.online} healthy={hub.lastHealthy} />
              <Badge variant="outline">
                {hub.instances.length} {hub.instances.length === 1 ? "Service" : "Services"}
              </Badge>
              <Badge variant="outline">
                {hub.clients.length} {hub.clients.length === 1 ? "Client" : "Clients"}
              </Badge>
            </div>
          </div>
        </div>
        <AdminOnly orgId={orgId} note="Only organization admins can rename or delete a hub.">
        <div className="flex gap-2">
          <Dialog open={updateDialogOpen} onOpenChange={setUpdateDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm" onClick={() => setNewName(hub.name)}>
                <Pencil className="h-4 w-4 mr-2" />
                Rename
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Rename Hub</DialogTitle>
                <DialogDescription>Enter a new name for this hub.</DialogDescription>
              </DialogHeader>
              <form
                id="rename-hub"
                className="grid gap-4 py-4"
                onSubmit={(e) => {
                  e.preventDefault()
                  handleUpdate()
                }}
              >
                <div className="grid gap-2">
                  <Label htmlFor="name">Hub Name</Label>
                  <Input
                    id="name"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    placeholder="Enter hub name"
                    autoFocus
                  />
                </div>
              </form>
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setUpdateDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" form="rename-hub" disabled={renaming || !newName.trim() || newName.trim() === hub.name}>
                  {renaming ? "Renaming..." : "Rename"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <Button variant="destructive" size="sm" onClick={() => setDeleteOpen(true)}>
            <Trash2 className="h-4 w-4 mr-2" />
            Delete
          </Button>
          <ConfirmActionDialog
            open={deleteOpen}
            onOpenChange={setDeleteOpen}
            title={`Delete ${hub.name}?`}
            description="This cannot be undone. The hub's service instances and clients are removed with it, its apps stop working, and its node leaves the mesh."
            confirmLabel="Delete hub"
            pendingLabel="Deleting..."
            destructive
            onConfirm={handleDelete}
          />
        </div>
        </AdminOnly>
      </div>

      <HubHealthCard hub={hub} />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {sections.map((section) => (
          <Link key={section.to} to={section.to} className="block">
            <Card className="hover:bg-muted/50 transition-colors h-full">
              <CardHeader className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-muted">
                    <section.icon className="h-4 w-4" />
                  </div>
                  {section.count !== undefined && (
                    <span className="text-2xl font-bold tabular-nums">{section.count}</span>
                  )}
                </div>
                <CardTitle className="text-base flex items-center gap-1">
                  {section.label}
                  <ArrowRight className="h-3.5 w-3.5 text-muted-foreground" />
                </CardTitle>
                <CardDescription className="text-xs">{section.description}</CardDescription>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}


type HubHealth = NonNullable<ReturnType<typeof useGetHubQuery>["data"]>["hub"]

/** What the hub last said about itself on its health callback (/f/hubhealth/). */
function HubHealthCard({ hub }: { hub: HubHealth }) {
  const latest = hub.healthSnapshots[0]
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-base flex items-center gap-2">
          <Activity className="h-4 w-4" />
          Health
        </CardTitle>
        <CardDescription className="text-xs">
          {hub.lastSeenAt
            ? `Last reported ${formatDistanceToNow(new Date(hub.lastSeenAt), { addSuffix: true })}${hub.version ? ` · version ${hub.version}` : ""}`
            : "This hub has not reported its health yet. A running hub server reports once a minute; this page updates on its own."}
        </CardDescription>
      </CardHeader>
      {hub.lastSeenAt && (
        <CardContent className="space-y-3 text-sm">
          <div className="flex items-center gap-2">
            <Network className="h-4 w-4 text-muted-foreground" />
            <span className="text-muted-foreground">Mesh:</span>
            {hub.meshConnected == null ? (
              <span className="text-muted-foreground">not reported (the hub server did not say)</span>
            ) : hub.meshConnected ? (
              <span className="font-mono">{hub.meshHost || "connected"}</span>
            ) : (
              <span>not connected — apps cannot reach it over the mesh until the hub server rejoins</span>
            )}
          </div>
          {latest && latest.instances.length > 0 && (
            <div className="space-y-1">
              {latest.instances.map((instance) => (
                <div key={instance.identifier} className="flex items-center gap-2">
                  <span className={`h-2 w-2 rounded-full ${instance.healthy ? "bg-green-500" : "bg-destructive"}`} aria-hidden />
                  <span className="font-mono text-xs truncate">{instance.identifier}</span>
                  {instance.reason && <span className="text-xs text-muted-foreground truncate" title={instance.reason}>{instance.reason}</span>}
                </div>
              ))}
            </div>
          )}
        </CardContent>
      )}
    </Card>
  )
}
