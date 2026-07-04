import { type ReactNode } from "react"
import {
  useListDeviceGroupsQuery,
  useAddDeviceToGroupMutation,
  useRemoveDeviceFromGroupMutation,
} from "../api/graphql"
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from "../components/ui/context-menu"
import { FolderPlus, FolderMinus } from "lucide-react"
import { toast } from "sonner"

interface DeviceContextMenuProps {
  device: {
    id: string
    name?: string | null
    deviceGroups: { id: string; name: string }[]
  }
  children: ReactNode
  /** Called after a successful add/remove (e.g. to refetch a local query). */
  onChanged?: () => void
}

// Queries that read device-group membership across the various surfaces. We refetch
// all of them because a m2m change to ManagementDeviceGroup.devices cannot be
// inferred by Apollo from the returned ManagementDevice alone.
const REFETCH = ["GetDevice", "GetDeviceGroup", "ListDevices", "ListDeviceGroups"]

export const DeviceContextMenu = ({ device, children, onChanged }: DeviceContextMenuProps) => {
  const { data: groupsData } = useListDeviceGroupsQuery({})
  const [addDeviceToGroup] = useAddDeviceToGroupMutation()
  const [removeDeviceFromGroup] = useRemoveDeviceFromGroupMutation()

  const allGroups = groupsData?.deviceGroups || []
  const currentGroups = device.deviceGroups || []
  const currentIds = new Set(currentGroups.map((g) => g.id))
  const availableGroups = allGroups.filter((g) => !currentIds.has(g.id))

  const deviceLabel = device.name || "Device"

  const handleAdd = async (groupId: string, groupName: string) => {
    try {
      await addDeviceToGroup({
        variables: { input: { device: device.id, deviceGroup: groupId } },
        refetchQueries: REFETCH,
      })
      toast.success(`Added ${deviceLabel} to ${groupName}`)
      onChanged?.()
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to add device to group")
    }
  }

  const handleRemove = async (groupId: string, groupName: string) => {
    try {
      await removeDeviceFromGroup({
        variables: { input: { device: device.id, deviceGroup: groupId } },
        refetchQueries: REFETCH,
      })
      toast.success(`Removed ${deviceLabel} from ${groupName}`)
      onChanged?.()
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to remove device from group")
    }
  }

  return (
    <ContextMenu>
      <ContextMenuTrigger asChild>{children}</ContextMenuTrigger>
      <ContextMenuContent className="w-56">
        <ContextMenuSub>
          <ContextMenuSubTrigger>
            <FolderPlus className="h-4 w-4 mr-2" />
            Add to group
          </ContextMenuSubTrigger>
          <ContextMenuSubContent className="w-48">
            {availableGroups.length === 0 ? (
              <ContextMenuItem disabled>No other groups</ContextMenuItem>
            ) : (
              availableGroups.map((group) => (
                <ContextMenuItem key={group.id} onSelect={() => handleAdd(group.id, group.name)}>
                  {group.name}
                </ContextMenuItem>
              ))
            )}
          </ContextMenuSubContent>
        </ContextMenuSub>

        <ContextMenuSub>
          <ContextMenuSubTrigger disabled={currentGroups.length === 0}>
            <FolderMinus className="h-4 w-4 mr-2" />
            Remove from group
          </ContextMenuSubTrigger>
          <ContextMenuSubContent className="w-48">
            {currentGroups.length === 0 ? (
              <ContextMenuItem disabled>Not in any group</ContextMenuItem>
            ) : (
              currentGroups.map((group) => (
                <ContextMenuItem
                  key={group.id}
                  variant="destructive"
                  onSelect={() => handleRemove(group.id, group.name)}
                >
                  {group.name}
                </ContextMenuItem>
              ))
            )}
          </ContextMenuSubContent>
        </ContextMenuSub>
      </ContextMenuContent>
    </ContextMenu>
  )
}
