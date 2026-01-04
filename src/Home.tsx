import { Link } from "react-router-dom"
import { useClientsQuery, Ordering } from "./api/graphql"
import { Card, CardContent, CardHeader, CardTitle } from "./components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "./components/ui/avatar"
import { Badge } from "./components/ui/badge"
import { AlertCircle } from "lucide-react"

export default function Home() {
  const { data, loading, error } = useClientsQuery({
    variables: {
      filters: {
        functional: false
      },
      order: {
        createdAt: Ordering.Desc
      },
      pagination: {
        limit: 12
      }
    }
  })

  if (loading) {
      return <div className="p-4">Loading...</div>
  }

  if (error) {
      return <div className="p-4">Error: {error.message}</div>
  }

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Non-Functional Clients</h2>
          <p className="text-sm text-muted-foreground">Latest clients that require attention</p>
        </div>
      </div>
      {data?.clients && data.clients.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <AlertCircle className="h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold">No non-functional clients</h3>
          <p className="text-sm text-muted-foreground">All your clients are working properly!</p>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {data?.clients.map((client) => (
            <Link key={client.id} to={`/clients/${client.id}`}>
              <Card className="hover:bg-muted/50 transition-colors cursor-pointer h-full border-destructive/50">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <div className="flex flex-col gap-1">
                    <CardTitle className="text-sm font-medium">
                      {client.name}
                    </CardTitle>
                    <div className="flex items-center gap-1">
                      <Badge variant="destructive" className="text-[10px] px-1 py-0">
                        Non-functional
                      </Badge>
                      <Badge variant="outline" className="text-[10px] px-1 py-0">
                        {client.kind}
                      </Badge>
                    </div>
                  </div>
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={client.logo?.presignedUrl || undefined} />
                    <AvatarFallback>{client.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                  </Avatar>
                </CardHeader>
                <CardContent>
                  <div className="text-xs text-muted-foreground">
                    {client.release?.version && `v${client.release.version}`}
                    {client.user && ` • @${client.user.username}`}
                  </div>
                  {client.device && (
                    <div className="text-xs text-muted-foreground mt-1">
                      Device: {client.device.name}
                    </div>
                  )}
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
