import { useState } from "react"
import { Link, useParams } from "react-router-dom"
import { useListDevicesQuery } from "@/graphql/queries/device.generated"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { Badge } from "../components/ui/badge"
import { PageHeader } from "../components/PageHeader"
import { Laptop, Smartphone, Tablet } from "lucide-react"
import { DeviceContextMenu } from "./DeviceContextMenu"
import { SearchInput } from "../components/SearchInput"
import { LoadMore } from "../components/LoadMore"
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "../components/ui/empty"
import { toastError } from "@/lib/errors"

import { QueryError } from "@/components/status"

import { ListPageSkeleton } from "@/components/skeletons"

const PAGE_SIZE = 24

export default function Devices() {
  // Also mounted at the top-level /devices route, where there is no orgId: links
  // then use each device's own organization instead of /organization/undefined/….
  const { orgId } = useParams<{ orgId: string }>()
  const [search, setSearch] = useState("")
  // Length of the list when a "Load more" came back empty — nothing further to fetch.
  const [exhaustedAt, setExhaustedAt] = useState<number | null>(null)
  const [loadingMore, setLoadingMore] = useState(false)
  const { data, previousData, loading, error, refetch, fetchMore } = useListDevicesQuery({
    variables: {
      filters: {
        organization: orgId,
        search: search || undefined,
      },
      pagination: { limit: PAGE_SIZE, offset: 0 },
    },
  })

  // Keep the previous page on screen while a new search is in flight, so the
  // search box doesn't unmount under the user's cursor.
  const current = data ?? previousData
  if (loading && !current) return <ListPageSkeleton columns={4} count={8} />
  if (error && !current) return <QueryError error={error} onRetry={() => refetch()} />

  const devices = current?.devices || []
  // Every page so far came back full, so there may be another one.
  const hasMore = devices.length > 0 && devices.length % PAGE_SIZE === 0 && exhaustedAt !== devices.length

  const loadMore = async () => {
    setLoadingMore(true)
    try {
      const { data: more } = await fetchMore({
        variables: { pagination: { limit: PAGE_SIZE, offset: devices.length } },
        updateQuery: (prev, { fetchMoreResult }) =>
          fetchMoreResult
            ? { ...prev, devices: [...prev.devices, ...fetchMoreResult.devices] }
            : prev,
      })
      if (more.devices.length === 0) setExhaustedAt(devices.length)
    } catch (e) {
      toastError(e, "Couldn't load more devices")
    } finally {
      setLoadingMore(false)
    }
  }

  const deviceHref = (device: { id: string; organization: { id: string } }) =>
    `/organization/${orgId ?? device.organization.id}/devices/${device.id}`

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

      <SearchInput
        value={search}
        onChange={(v) => {
          setSearch(v)
          setExhaustedAt(null)
        }}
        placeholder="Search devices…"
      />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {devices.map((device) => (
          <DeviceContextMenu key={device.id} device={device}>
            <Link to={deviceHref(device)}>
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
                         {device.deviceId}
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
      </div>

      {devices.length === 0 ? (
        <Empty className="border">
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <Smartphone />
            </EmptyMedia>
            <EmptyTitle>{search ? "No matching devices" : "No devices yet"}</EmptyTitle>
            <EmptyDescription>
              {search
                ? `Nothing matches “${search}”. Try a different name.`
                : "Devices appear here once an app registers from them."}
            </EmptyDescription>
          </EmptyHeader>
        </Empty>
      ) : (
        <LoadMore hasMore={hasMore} loading={loadingMore} onLoadMore={loadMore} />
      )}
    </div>
  )
}
