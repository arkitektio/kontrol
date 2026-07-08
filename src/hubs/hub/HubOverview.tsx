import { Link, useParams, useNavigate } from "react-router-dom"
import {
  useGetHubQuery,
  useDeleteHubMutation,
  useUpdateHubMutation,
  HubsDocument,
} from "../../api/graphql"
import { Card, CardHeader, CardTitle, CardDescription } from "../../components/ui/card"
import { Badge } from "../../components/ui/badge"
import { Button } from "../../components/ui/button"
import { Layers, Server, Box, Ticket, ArrowRight, Pencil, Trash2 } from "lucide-react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
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

export default function HubOverview() {
  const { orgId, name } = useParams<{ orgId: string; name: string }>()
  const navigate = useNavigate()
  const { data } = useGetHubQuery({ variables: { id: name! }, skip: !name })
  const hub = data?.hub

  const [deleteHub] = useDeleteHubMutation({
    refetchQueries: [{ query: HubsDocument, variables: { filters: { organization: orgId || undefined } } }],
  })
  const [updateHub] = useUpdateHubMutation()
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
      to: `${base}/redeem-tokens`,
      icon: Ticket,
      label: "Redeem Tokens",
      description: "One-time tokens to attach development clients.",
    },
  ]

  const handleDelete = async () => {
    try {
      await deleteHub({ variables: { input: { id: hub.id } } })
      navigate(`/organization/${orgId}/hubs`)
    } catch (e) {
      console.error("Error deleting hub:", e)
    }
  }

  const handleUpdate = async () => {
    if (!newName.trim()) return
    try {
      await updateHub({ variables: { input: { id: hub.id, name: newName.trim() } } })
      setUpdateDialogOpen(false)
      navigate(`/organization/${orgId}/hubs/${encodeURIComponent(newName.trim())}`)
    } catch (e) {
      console.error("Error updating hub:", e)
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
            <div className="flex gap-2 pt-1">
              <Badge variant="outline">
                {hub.instances.length} {hub.instances.length === 1 ? "Service" : "Services"}
              </Badge>
              <Badge variant="outline">
                {hub.clients.length} {hub.clients.length === 1 ? "Client" : "Clients"}
              </Badge>
            </div>
          </div>
        </div>
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
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Hub Name</Label>
                  <Input
                    id="name"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    placeholder="Enter hub name"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setUpdateDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleUpdate} disabled={!newName.trim()}>
                  Rename
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive" size="sm">
                <Trash2 className="h-4 w-4 mr-2" />
                Delete
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Delete Hub</AlertDialogTitle>
                <AlertDialogDescription>
                  Are you sure you want to delete this hub? This action cannot be undone. All associated service
                  instances and clients will be removed from this hub.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>

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
