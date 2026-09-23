import { useState } from "react"
import { Link, useParams } from "react-router-dom"
import { Ordering } from "@/api/types"
import { useClientsQuery } from "@/graphql/queries/client.generated"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar"
import { Badge } from "../components/ui/badge"
import { ClientLabel } from "../components/ClientLabel"
import { clientInitials } from "../lib/clientLabel"
import { PageHeader } from "../components/PageHeader"
import { SearchInput } from "../components/SearchInput"
import { LoadMore } from "../components/LoadMore"
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "../components/ui/empty"
import { Package } from "lucide-react"
import { toastError } from "@/lib/errors"
import { absoluteTime, timeAgo } from "@/lib/time"

import { QueryError } from "@/components/status"

import { ListPageSkeleton } from "@/components/skeletons"

const PAGE_SIZE = 24

export default function Clients() {
  const { orgId } = useParams<{ orgId: string }>()
  const [search, setSearch] = useState("")
  // Length of the list when a "Load more" came back empty — nothing further to fetch.
  const [exhaustedAt, setExhaustedAt] = useState<number | null>(null)
  const [loadingMore, setLoadingMore] = useState(false)

  // Organization and search are both filtered server-side (ManagementClientFilter).
  const { data, previousData, loading, error, refetch, fetchMore } = useClientsQuery({
    variables: {
      ordering: [{ lastReportedAt: Ordering.Desc }],
      filters: {
        organization: orgId || undefined,
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

  const clients = current?.clients ?? []
  // Every page so far came back full, so there may be another one.
  const hasMore = clients.length > 0 && clients.length % PAGE_SIZE === 0 && exhaustedAt !== clients.length

  const loadMore = async () => {
    setLoadingMore(true)
    try {
      const { data: more } = await fetchMore({
        variables: { pagination: { limit: PAGE_SIZE, offset: clients.length } },
        updateQuery: (prev, { fetchMoreResult }) =>
          fetchMoreResult
            ? { ...prev, clients: [...prev.clients, ...fetchMoreResult.clients] }
            : prev,
      })
      if (more.clients.length === 0) setExhaustedAt(clients.length)
    } catch (e) {
      toastError(e, "Couldn't load more clients")
    } finally {
      setLoadingMore(false)
    }
  }

  return (
    <div className="flex flex-1 flex-col gap-8 p-6">
      <PageHeader
        icon={Package}
        title="Clients"
        description="Apps and services connected to this organization."
      />

      <SearchInput
        value={search}
        onChange={(v) => {
          setSearch(v)
          setExhaustedAt(null)
        }}
        placeholder="Search clients…"
      />

      {clients.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {clients.map((client) => (
            <Link key={client.id} to={`/organization/${client.organization?.id ?? orgId}/clients/${client.id}`}>
              <Card className="hover:bg-muted/50 transition-colors cursor-pointer h-full">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium truncate">
                    <ClientLabel client={client} />
                  </CardTitle>
                  <Avatar className="h-8 w-8">
                      <AvatarImage src={client.logo?.presignedUrl || undefined} />
                      <AvatarFallback>{clientInitials(client)}</AvatarFallback>
                  </Avatar>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col gap-2">
                      <div className="flex items-center gap-2">
                          <Badge variant="outline">{client.kind}</Badge>
                          <span className="text-xs text-muted-foreground">by {client.user?.username}</span>
                      </div>
                      <div className="text-xs text-muted-foreground" title={absoluteTime(client.lastReportedAt)}>
                        {client.lastReportedAt
                          ? `Last reported ${timeAgo(client.lastReportedAt)}`
                          : "Never reported"}
                      </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      ) : (
        <Empty className="border">
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <Package />
            </EmptyMedia>
            <EmptyTitle>{search ? "No matching clients" : "No clients yet"}</EmptyTitle>
            <EmptyDescription>
              {search
                ? `Nothing matches “${search}”. Try a different name.`
                : "Clients appear here once an app is approved for this organization."}
            </EmptyDescription>
          </EmptyHeader>
        </Empty>
      )}

      <LoadMore hasMore={hasMore} loading={loadingMore} onLoadMore={loadMore} />
    </div>
  )
}
