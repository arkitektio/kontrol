import { useState, type ReactNode } from "react"
import { useListDeviceGroupsQuery } from "@/graphql/queries/device_group.generated"
import { useAddDeviceToGroupMutation, useRemoveDeviceFromGroupMutation } from "@/graphql/mutations/device_group.generated"
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
import { toastError } from "@/lib/errors"

interface DeviceContextMenuProps {
  device: {
    id: string
    name?: string | null
    organization: { id: string }
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
  // One menu per device card: only ask for the groups once this one has been opened.
  const [opened, setOpened] = useState(false)
  const { data: groupsData, loading: groupsLoading } = useListDeviceGroupsQuery({
    variables: { filters: { organization: device.organization.id } },
    skip: !opened,
  })
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
      toastError(err, "Couldn't add the device to the group")
    }
  }

  const handleRemove = async (groupId: string, groupName: string) => {
    try {
      await removeDeviceFromGroup({
        variables: { input: { device: device.id, deviceGroup: groupId } },
        refetchQueries: REFETCH,
        // The response lists the device's remaining groups, not the one it left.
        update: (cache) => {
          cache.evict({
            id: cache.identify({ __typename: "ManagementDeviceGroup", id: groupId }),
            fieldName: "devices",
          })
        },
      })
      toast.success(`Removed ${deviceLabel} from ${groupName}`)
      onChanged?.()
    } catch (err) {
      toastError(err, "Couldn't remove the device from the group")
    }
  }

  return (
    <ContextMenu onOpenChange={(open) => open && setOpened(true)}>
      <ContextMenuTrigger asChild>{children}</ContextMenuTrigger>
      <ContextMenuContent className="w-56">
        <ContextMenuSub>
          <ContextMenuSubTrigger>
            <FolderPlus className="h-4 w-4 mr-2" />
            Add to group
          </ContextMenuSubTrigger>
          <ContextMenuSubContent className="w-48">
            {groupsLoading && !groupsData ? (
              <ContextMenuItem disabled>Loading…</ContextMenuItem>
            ) : availableGroups.length === 0 ? (
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
