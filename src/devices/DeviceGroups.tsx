import { useState } from "react"
import { useParams, Link } from "react-router-dom"
import { useListDeviceGroupsQuery } from "@/graphql/queries/device_group.generated"
import { useCreateDeviceGroupMutation } from "@/graphql/mutations/device_group.generated"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { Button } from "../components/ui/button"
import { PageHeader } from "../components/PageHeader"
import { Plus, Boxes } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import { ListEmpty } from "../components/ListEmpty"
import { toast } from "sonner"
import { toastError } from "@/lib/errors"

import { QueryError } from "@/components/status"

import { ListPageSkeleton } from "@/components/skeletons"

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

  // Every way of opening the dialog goes through here, so it always starts clean.
  const setCreateOpen = (open: boolean) => {
    if (isCreating) return
    if (open) {
      setGroupName("")
      setCreateError(null)
    }
    setCreateDialogOpen(open)
  }

  const handleCreateGroup = async () => {
    const name = groupName.trim()
    if (!orgId || isCreating) return
    if (!name) {
      setCreateError("Enter a name for the group.")
      return
    }

    setIsCreating(true)
    setCreateError(null)
    try {
      await createDeviceGroup({
        variables: { 
          input: { 
            name,
            organization: orgId
          }
        },
        refetchQueries: ['ListDeviceGroups'],
        awaitRefetchQueries: true,
      })
      toast.success("Device group created")
      setCreateDialogOpen(false)
    } catch (err) {
      toastError(err, "Couldn't create the device group")
    } finally {
      setIsCreating(false)
    }
  }

  if (loading) return <ListPageSkeleton columns={4} count={4} />
  if (error) return <QueryError error={error} />

  return (
    <div className="flex flex-1 flex-col gap-8 p-6">
      <PageHeader
        icon={Boxes}
        title="Device Groups"
        description="Organize devices into groups."
        actions={
        <Dialog open={createDialogOpen} onOpenChange={setCreateOpen}>
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
            <form
              onSubmit={(e) => {
                e.preventDefault()
                handleCreateGroup()
              }}
            >
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    value={groupName}
                    onChange={(e) => {
                      setGroupName(e.target.value)
                      setCreateError(null)
                    }}
                    placeholder="e.g. Production Devices"
                    aria-invalid={Boolean(createError)}
                  />
                </div>
                {createError && (
                  <p className="text-sm text-destructive">{createError}</p>
                )}
              </div>
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setCreateOpen(false)} disabled={isCreating}>
                  Cancel
                </Button>
                <Button type="submit" disabled={isCreating}>
                  {isCreating ? "Creating..." : "Create Group"}
                </Button>
              </DialogFooter>
            </form>
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
                  {group.devices?.length ?? 0} device{group.devices?.length === 1 ? "" : "s"}
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {deviceGroups.length === 0 && (
        <ListEmpty
          icon={Boxes}
          title="No device groups yet"
          description="Create a group to organize devices, e.g. by lab or instrument."
          action={
            <Button onClick={() => setCreateOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              New Group
            </Button>
          }
        />
      )}
    </div>
  )
}
