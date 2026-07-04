import { useState } from "react"
import { useParams, Link } from "react-router-dom"
import { useListDeviceGroupsQuery, useCreateDeviceGroupMutation, useDeleteDeviceGroupMutation } from "../api/graphql"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { Button } from "../components/ui/button"
import { PageHeader } from "../components/PageHeader"
import { Plus, Boxes } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"

export default function DeviceGroups() {
  const { orgId } = useParams<{ orgId: string }>()
  const [createDialogOpen, setCreateDialogOpen] = useState(false)
  const [groupName, setGroupName] = useState("")
  const [isCreating, setIsCreating] = useState(false)
  const [createError, setCreateError] = useState<string | null>(null)
  
  const { data, loading, error } = useListDeviceGroupsQuery({
    variables: {
        filters: {
            organization: orgId
        }
    }
  })
  const [createDeviceGroup] = useCreateDeviceGroupMutation()

  const deviceGroups = data?.deviceGroups || []

  const handleCreateGroup = async () => {
    if (!groupName.trim() || !orgId) return

    setIsCreating(true)
    setCreateError(null)
    try {
      await createDeviceGroup({
        variables: { 
          input: { 
            name: groupName,
            organization: orgId
          }
        },
        refetchQueries: ['ListDeviceGroups']
      })
      setGroupName("")
      setCreateDialogOpen(false)
    } catch (err) {
      console.error("Failed to create device group:", err)
      setCreateError(err instanceof Error ? err.message : "Failed to create device group")
      setIsCreating(false)
    }
  }

  if (loading) return <div className="p-4">Loading...</div>
  if (error) return <div className="p-4">Error: {error.message}</div>

  return (
    <div className="flex flex-1 flex-col gap-8 p-6">
      <PageHeader
        icon={Boxes}
        title="Device Groups"
        description="Organize devices into groups."
        actions={
        <Dialog open={createDialogOpen} onOpenChange={setCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              New Group
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create Device Group</DialogTitle>
              <DialogDescription>
                Create a new group to organize your devices.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={groupName}
                  onChange={(e) => setGroupName(e.target.value)}
                  placeholder="e.g. Production Devices"
                />
              </div>
              {createError && (
                <p className="text-sm text-destructive">{createError}</p>
              )}
            </div>
            <div className="flex justify-end">
              <Button onClick={handleCreateGroup} disabled={isCreating}>
                {isCreating ? "Creating..." : "Create Group"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
        }
      />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {deviceGroups.map((group) => (
          <Link key={group.id} to={`/organization/${orgId}/devices/groups/${group.id}`}>
            <Card className="hover:bg-muted/50 transition-colors cursor-pointer h-full">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium truncate">
                  {group.name}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-xs text-muted-foreground">
                  {group.devices?.length || 0} devices
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
        {deviceGroups.length === 0 && (
            <div className="col-span-4 text-center text-muted-foreground">
                No device groups found.
            </div>
        )}
      </div>
    </div>
  )
}
