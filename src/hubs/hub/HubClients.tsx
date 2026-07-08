import { Link, useParams } from "react-router-dom"
import { useClientsQuery } from "../../api/graphql"
import { ClientLabel } from "../../components/ClientLabel"
import { Card, CardHeader, CardTitle, CardDescription } from "../../components/ui/card"
import { Badge } from "../../components/ui/badge"
import { Box } from "lucide-react"

export default function HubClients() {
  const { orgId, name } = useParams<{ orgId: string; name: string }>()
  const { data, loading, error } = useClientsQuery({
    variables: { filters: { organization: orgId, hub: name } },
    skip: !name,
  })

  const clients = data?.clients ?? []

  if (loading) return <div className="text-sm text-muted-foreground">Loading...</div>
  if (error) return <div className="text-sm text-destructive">Error: {error.message}</div>

  return (
    <section className="space-y-3">
      <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground flex items-center gap-2">
        <Box className="h-4 w-4" /> Clients
      </h3>
      {clients.length === 0 ? (
        <div className="rounded-lg border border-dashed p-6 text-center text-sm text-muted-foreground">
          This hub has no clients yet.
        </div>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {clients.map((client) => (
            <Link key={client.id} to={`/organization/${orgId}/clients/${client.id}`} className="block">
              <Card className="hover:bg-muted/50 transition-colors">
                <CardHeader className="py-3">
                  <div className="flex items-center justify-between gap-2">
                    <CardTitle className="text-base truncate"><ClientLabel client={client} /></CardTitle>
                    <Badge variant="secondary" className="text-xs shrink-0">{client.kind}</Badge>
                  </div>
                  <CardDescription className="text-xs">
                    {client.user && `User: ${client.user.username}`}
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
