import { Link } from "react-router-dom"
import { useListServiceInstanceMappingsQuery } from "../api/graphql"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { ClientLabel } from "../components/ClientLabel"

export default function ServiceInstanceMappings() {
  const { data, loading, error } = useListServiceInstanceMappingsQuery({})

  if (loading) return <div className="p-4">Loading...</div>
  if (error) return <div className="p-4">Error: {error.message}</div>

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Mappings</h2>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {data?.serviceInstanceMappings.map((mapping) => (
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
    </div>
  )
}
