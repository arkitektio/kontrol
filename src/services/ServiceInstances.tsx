import { useState } from "react"
import { useParams } from "react-router-dom"
import { useListServiceInstancesQuery } from "@/graphql/queries/service_instance.generated"
import { ServiceInstanceCard } from "../components/ServiceInstanceCard"
import { PageHeader } from "../components/PageHeader"
import { SearchInput } from "../components/SearchInput"
import { ListEmpty } from "../components/ListEmpty"
import { Container } from "lucide-react"

import { QueryError } from "@/components/status"

import { ListPageSkeleton } from "@/components/skeletons"

export default function ServiceInstances() {
  const { orgId } = useParams<{ orgId: string }>()
  const [search, setSearch] = useState("")
  
  const { data, previousData, loading, error, refetch } = useListServiceInstancesQuery({
      variables: {
          filters: {
              organization: orgId || undefined,
              search: search || undefined,
          }
      }
  })

  // Keep the previous results on screen while a new search is in flight, so the
  // search box doesn't unmount under the user's cursor.
  const current = data ?? previousData
  if (loading && !current) return <ListPageSkeleton columns={3} count={6} card="tall" />
  if (error && !current) return <QueryError error={error} onRetry={() => refetch()} />

  const instances = current?.serviceInstances || []

  return (
    <div className="flex flex-1 flex-col gap-8 p-6">
      <PageHeader
        icon={Container}
        title="Service Instances"
        description="Running instances of services, registered by this organization's hubs."
      />
      <SearchInput value={search} onChange={setSearch} placeholder="Search service instances…" />

      {instances.length === 0 ? (
        <ListEmpty
          icon={Container}
          search={search}
          title="No service instances yet"
          description="Instances appear here once a hub registers the services it runs."
        />
      ) : (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {instances.map((instance) => (
             <ServiceInstanceCard key={instance.id} instance={instance} />
        ))}
      </div>
      )}
    </div>
  )
}
