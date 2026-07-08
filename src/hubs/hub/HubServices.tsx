import { Link, useParams } from "react-router-dom"
import { useListServiceInstancesQuery } from "../../api/graphql"
import { Card, CardHeader, CardTitle, CardDescription } from "../../components/ui/card"
import { Badge } from "../../components/ui/badge"
import { Server } from "lucide-react"

export default function HubServices() {
  const { orgId, name } = useParams<{ orgId: string; name: string }>()
  const { data, loading, error } = useListServiceInstancesQuery({
    variables: { filters: { organization: orgId, hub: name } },
    skip: !name,
  })

  const instances = data?.serviceInstances ?? []

  if (loading) return <div className="text-sm text-muted-foreground">Loading...</div>
  if (error) return <div className="text-sm text-destructive">Error: {error.message}</div>

  return (
    <section className="space-y-3">
      <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground flex items-center gap-2">
        <Server className="h-4 w-4" /> Service Instances
      </h3>
      {instances.length === 0 ? (
        <div className="rounded-lg border border-dashed p-6 text-center text-sm text-muted-foreground">
          This hub has no services configured yet.
        </div>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {instances.map((instance) => (
            <Link key={instance.id} to={`/organization/${orgId}/service-instances/${instance.id}`} className="block">
              <Card className="hover:bg-muted/50 transition-colors">
                <CardHeader className="py-3">
                  <div className="flex items-center justify-between gap-2">
                    <CardTitle className="text-base truncate">{instance.identifier}</CardTitle>
                    <Badge variant="secondary" className="text-xs shrink-0">v{instance.release.version}</Badge>
                  </div>
                  <CardDescription className="text-xs">
                    {instance.release.service.identifier}
                  </CardDescription>
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </section>
  )
}
