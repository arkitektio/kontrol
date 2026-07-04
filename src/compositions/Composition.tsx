import { useParams, useNavigate, NavLink, Outlet } from "react-router-dom"
import { useGetCompositionQuery, useDeleteCompositionMutation, useUpdateCompositionMutation, CompositionsDocument } from "../api/graphql"
import { Badge } from "../components/ui/badge"
import { Button } from "../components/ui/button"
import { Layers, Trash2, Pencil } from "lucide-react"
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
import { cn } from "@/lib/utils"

export default function Composition() {
  const { orgId, name } = useParams<{ orgId: string; name: string }>()
  const navigate = useNavigate()

  const { data, loading, error } = useGetCompositionQuery({
    variables: { id: name! },
    skip: !name,
  })

  const [deleteComposition] = useDeleteCompositionMutation({
    refetchQueries: [{ query: CompositionsDocument, variables: { filters: { organization: orgId || undefined } } }],
  })
  const [updateComposition] = useUpdateCompositionMutation()

  const [updateDialogOpen, setUpdateDialogOpen] = useState(false)
  const [newName, setNewName] = useState("")

  if (loading) return <div className="p-4">Loading...</div>
  if (error) return <div className="p-4">Error: {error.message}</div>
  if (!data?.composition) return <div className="p-4">Hub not found</div>

  const composition = data.composition
  const base = `/organization/${orgId}/compositions/${name}`

  const tabs = [
    { to: base, label: "Overview", end: true },
    { to: `${base}/services`, label: "Services" },
    { to: `${base}/clients`, label: "Clients" },
    { to: `${base}/redeem-tokens`, label: "Redeem Tokens" },
  ]

  const handleDelete = async () => {
    try {
      await deleteComposition({ variables: { input: { id: composition.id } } })
      navigate(`/organization/${orgId}/compositions`)
    } catch (e) {
      console.error("Error deleting composition:", e)
    }
  }

  const handleUpdate = async () => {
    if (!newName.trim()) return
    try {
      await updateComposition({ variables: { input: { id: composition.id, name: newName.trim() } } })
      setUpdateDialogOpen(false)
      navigate(`/organization/${orgId}/compositions/${encodeURIComponent(newName.trim())}`)
    } catch (e) {
      console.error("Error updating composition:", e)
    }
  }

  return (
    <div className="flex flex-1 flex-col gap-6 p-6">
      {/* Header */}
      <div className="flex flex-row items-start justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-muted">
            <Layers className="h-7 w-7" />
          </div>
          <div className="space-y-1">
            <h1 className="text-2xl font-bold tracking-tight">{composition.name}</h1>
            <p className="text-sm text-muted-foreground">{composition.organization.name}</p>
            <div className="flex gap-2 pt-1">
              <Badge variant="outline">
                {composition.instances.length} {composition.instances.length === 1 ? "Service" : "Services"}
              </Badge>
              <Badge variant="outline">
                {composition.clients.length} {composition.clients.length === 1 ? "Client" : "Clients"}
              </Badge>
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          <Dialog open={updateDialogOpen} onOpenChange={setUpdateDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm" onClick={() => setNewName(composition.name)}>
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

      {/* Sub-page navigation */}
      <nav className="flex gap-1 border-b">
        {tabs.map((tab) => (
          <NavLink
            key={tab.to}
            to={tab.to}
            end={tab.end}
            className={({ isActive }) =>
              cn(
                "px-3 py-2 text-sm font-medium border-b-2 -mb-px transition-colors",
                isActive
                  ? "border-primary text-foreground"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              )
            }
          >
            {tab.label}
          </NavLink>
        ))}
      </nav>

      {/* Active sub-page */}
      <Outlet />
    </div>
  )
}
