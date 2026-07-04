import { Link, useParams } from "react-router-dom"
import { useListDevicesQuery } from "../api/graphql"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { Badge } from "../components/ui/badge"
import { PageHeader } from "../components/PageHeader"
import { Laptop, Smartphone, Tablet } from "lucide-react"
import { DeviceContextMenu } from "./DeviceContextMenu"

export default function Devices() {
  const { orgId } = useParams<{ orgId: string }>()
  const { data, loading, error } = useListDevicesQuery({
    variables: {
      filters: {
        organization: orgId
      }
    }
  })

  if (loading) return <div className="p-4">Loading...</div>
  if (error) return <div className="p-4">Error: {error.message}</div>

  const devices = data?.devices || []

  // Helper function to get device icon
  const getDeviceIcon = (name: string | undefined | null) => {
    const lowerName = name?.toLowerCase() || ""
    if (lowerName.includes("phone") || lowerName.includes("mobile")) {
      return <Smartphone className="h-5 w-5" />
    } else if (lowerName.includes("tablet") || lowerName.includes("ipad")) {
      return <Tablet className="h-5 w-5" />
    }
    return <Laptop className="h-5 w-5" />
  }

  return (
    <div className="flex flex-1 flex-col gap-8 p-6">
      <PageHeader
        icon={Smartphone}
        title="Devices"
        description="Hardware registered with this organization."
      />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {devices.map((device) => (
          <DeviceContextMenu key={device.id} device={device}>
            <Link to={`/organization/${orgId}/devices/${device.id}`}>
              <Card className="hover:bg-muted/50 transition-colors cursor-pointer h-full">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium truncate">
                    {device.name}
                  </CardTitle>
                  <div className="text-muted-foreground">
                      {getDeviceIcon(device.name)}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col gap-2">
                      <div className="text-xs text-muted-foreground font-mono truncate">
                         {device.nodeId}
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {device.deviceGroups.length > 0 ? (
                          device.deviceGroups.map((group) => (
                            <Badge key={group.id} variant="outline" className="w-fit">
                              {group.name}
                            </Badge>
                          ))
                        ) : (
                          <span className="text-xs text-muted-foreground italic">No groups</span>
                        )}
                      </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </DeviceContextMenu>
        ))}
        {devices.length === 0 && (
             <div className="col-span-4 text-center text-muted-foreground">
                 No devices found.
             </div>
        )}
      </div>
    </div>
  )
}
