import { useState } from "react"
import { Link } from "react-router-dom"
import { useListServiceInstanceMappingsQuery } from "@/graphql/queries/service_instance_mapping.generated"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { ClientLabel } from "../components/ClientLabel"
import { PageHeader } from "../components/PageHeader"
import { SearchInput } from "../components/SearchInput"
import { ListEmpty } from "../components/ListEmpty"
import { matchesSearch } from "../components/matchesSearch"
import { clientLabel } from "../lib/clientLabel"
import { Cable } from "lucide-react"

import { QueryError } from "@/components/status"

import { ListPageSkeleton } from "@/components/skeletons"

export default function ServiceInstanceMappings() {
  const [search, setSearch] = useState("")
  const { data, loading, error, refetch } = useListServiceInstanceMappingsQuery({})

  if (loading) return <ListPageSkeleton columns={4} count={8} />
  if (error) return <QueryError error={error} onRetry={() => refetch()} />

  const mappings = (data?.serviceInstanceMappings ?? []).filter((m) =>
    matchesSearch(search, m.key, m.instance.identifier, clientLabel(m.client)),
  )

  return (
    <div className="flex flex-1 flex-col gap-8 p-6">
      <PageHeader icon={Cable} title="Mappings" description="Which service instance each client uses for a key." />
      <SearchInput value={search} onChange={setSearch} placeholder="Search mappings…" delay={150} />
      {mappings.length === 0 ? (
        <ListEmpty
          icon={Cable}
          search={search}
          title="No mappings yet"
          description="Mappings appear here once a client is bound to a service instance."
        />
      ) : (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {mappings.map((mapping) => (
          <Link key={mapping.id} to={`/service-instance-mappings/${mapping.id}`}>
            <Card className="hover:bg-muted/50 transition-colors cursor-pointer h-full">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {mapping.key}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-xs text-muted-foreground flex items-center gap-1">
                  Client: <ClientLabel client={mapping.client} />
                </div>
                <div className="text-xs text-muted-foreground">
                  Instance: {mapping.instance.identifier}
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
      )}
    </div>
  )
}
