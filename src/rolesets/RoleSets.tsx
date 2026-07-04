import { useState } from "react"
import { useParams } from "react-router-dom"
import {
  useOrganizationRoleSetsQuery,
  useCreateRoleSetMutation,
  useUpdateRoleSetMutation,
  useDeleteRoleSetMutation,
} from "../api/graphql"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { Button } from "../components/ui/button"
import { Badge } from "../components/ui/badge"
import { Checkbox } from "../components/ui/checkbox"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import { PageHeader } from "../components/PageHeader"
import { Plus, Tags, Pencil, Trash2 } from "lucide-react"
import { toast } from "sonner"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../components/ui/dialog"

type RoleSet = { id: string; name: string; roles: { id: string; identifier: string }[] }

export default function RoleSets() {
  const { orgId } = useParams<{ orgId: string }>()
  const { data, loading, error } = useOrganizationRoleSetsQuery({
    variables: { id: orgId! },
    skip: !orgId,
  })

  const [createRoleSet] = useCreateRoleSetMutation({ refetchQueries: ["OrganizationRoleSets"] })
  const [updateRoleSet] = useUpdateRoleSetMutation({ refetchQueries: ["OrganizationRoleSets"] })
  const [deleteRoleSet] = useDeleteRoleSetMutation({ refetchQueries: ["OrganizationRoleSets"] })

  // Dialog state: `editing` holds the role set being edited, or null when creating.
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editing, setEditing] = useState<RoleSet | null>(null)
  const [name, setName] = useState("")
  const [selectedRoleIds, setSelectedRoleIds] = useState<string[]>([])
  const [saving, setSaving] = useState(false)

  if (loading) return <div className="p-4">Loading...</div>
  if (error) return <div className="p-4">Error: {error.message}</div>
  if (!data?.organization) return <div className="p-4">Organization not found</div>

  const org = data.organization
  const availableRoles = org.roles || []
  const roleSets = org.roleSets || []

  if (!org.amIOwner) {
    return (
      <div className="flex flex-1 flex-col gap-8 p-6">
        <PageHeader
          icon={Tags}
          title="Role Sets"
          description="Only the organization owner can manage role sets."
        />
      </div>
    )
  }

  const openCreate = () => {
    setEditing(null)
    setName("")
    setSelectedRoleIds([])
    setDialogOpen(true)
  }

  const openEdit = (rs: RoleSet) => {
    setEditing(rs)
    setName(rs.name)
    setSelectedRoleIds(rs.roles.map((r) => r.id))
    setDialogOpen(true)
  }

  const toggleRole = (id: string, checked: boolean) => {
    setSelectedRoleIds((prev) => (checked ? [...prev, id] : prev.filter((x) => x !== id)))
  }

  const handleSave = async () => {
    if (!name.trim() || !orgId) return
    setSaving(true)
    try {
      if (editing) {
        await updateRoleSet({
          variables: { input: { id: editing.id, name: name.trim(), roles: selectedRoleIds } },
        })
        toast.success("Role set updated")
      } else {
        await createRoleSet({
          variables: { input: { name: name.trim(), organization: orgId, roles: selectedRoleIds } },
        })
        toast.success("Role set created")
      }
      setDialogOpen(false)
    } catch (e: any) {
      toast.error("Failed to save role set: " + e.message)
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (rs: RoleSet) => {
    if (!confirm(`Delete role set "${rs.name}"? The roles themselves are not affected.`)) return
    try {
      await deleteRoleSet({ variables: { input: { id: rs.id } } })
      toast.success("Role set deleted")
    } catch (e: any) {
      toast.error("Failed to delete role set: " + e.message)
    }
  }

  return (
    <div className="flex flex-1 flex-col gap-8 p-6">
      <PageHeader
        icon={Tags}
        title="Role Sets"
        description="Bundle roles together to apply them to invites or members in one click."
        actions={
          <Button onClick={openCreate}>
            <Plus className="h-4 w-4 mr-2" />
            New Role Set
          </Button>
        }
      />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {roleSets.map((rs) => (
          <Card key={rs.id} className="h-full">
            <CardHeader className="flex flex-row items-start justify-between gap-2 space-y-0">
              <CardTitle className="text-base font-medium truncate">{rs.name}</CardTitle>
              <div className="flex gap-1 shrink-0">
                <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => openEdit(rs)}>
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-destructive"
                  onClick={() => handleDelete(rs)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {rs.roles.length > 0 ? (
                <div className="flex flex-wrap gap-1">
                  {rs.roles.map((r) => (
                    <Badge key={r.id} variant="secondary">
                      {r.identifier}
                    </Badge>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground italic">No roles in this set.</p>
              )}
            </CardContent>
          </Card>
        ))}
        {roleSets.length === 0 && (
          <div className="col-span-full text-center text-muted-foreground py-8">
            No role sets yet. Create one to bundle roles together.
          </div>
        )}
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editing ? "Edit Role Set" : "Create Role Set"}</DialogTitle>
            <DialogDescription>
              Pick the roles to bundle together. Applying the set grants all of them at once.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-2">
            <div className="grid gap-2">
              <Label htmlFor="rs-name">Name</Label>
              <Input
                id="rs-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Full Access"
              />
            </div>
            <div className="grid gap-2">
              <Label>Roles</Label>
              <div className="grid gap-2 max-h-64 overflow-y-auto">
                {availableRoles.map((role) => (
                  <label key={role.id} className="flex items-start gap-3 cursor-pointer">
                    <Checkbox
                      checked={selectedRoleIds.includes(role.id)}
                      onCheckedChange={(checked) => toggleRole(role.id, checked === true)}
                    />
                    <div className="leading-none space-y-1">
                      <span className="text-sm font-medium">{role.identifier}</span>
                      {role.description && (
                        <p className="text-sm text-muted-foreground">{role.description}</p>
                      )}
                    </div>
                  </label>
                ))}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave} disabled={saving || !name.trim()}>
              {saving ? "Saving..." : editing ? "Save Changes" : "Create Role Set"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
