import { Link, useParams } from "react-router-dom"
import { Ordering, useClientsQuery } from "../api/graphql"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar"
import { Badge } from "../components/ui/badge"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { ClientLabel } from "../components/ClientLabel"
import { clientInitials } from "../lib/clientLabel"

export default function Clients() {
  const { orgId } = useParams<{ orgId: string }>()
  

  const { data, loading, error } = useClientsQuery({variables: {
      ordering: [{ lastReportedAt: Ordering.Desc }],
      filters: {
        organization: orgId || undefined
      },
      pagination: { limit: 5 }
    }})

  if (loading) return <div className="p-4">Loading...</div>
  if (error) return <div className="p-4">Error: {error.message}</div>

  // Filter clients by organization if orgId is present
  // Note: Ideally this should be done on the backend, but the current filter type doesn't seem to support it directly
  const clients = data?.clients
  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Clients</h2>
      </div>

      {clients && clients.length > 0 && (
        <div className="w-full">
          <h3 className="text-lg font-semibold mb-4">Recent Clients</h3>
          <Carousel
            opts={{
              align: "start",
            }}
            className="w-full max-w-full"
          >
            <CarouselContent>
              {clients.map((client) => (
                <CarouselItem key={client.id} className="md:basis-1/2 lg:basis-1/3 xl:basis-1/4">
                  <div className="p-1">
                    <Link to={`/organization/${orgId}/clients/${client.id}`}>
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
                              <div className="text-xs text-muted-foreground">
                                Last reported: {new Date(client.lastReportedAt || "").toLocaleDateString()}
                              </div>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      )}

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {clients?.map((client) => (
          <Link key={client.id} to={`/organization/${orgId}/clients/${client.id}`}>
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
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
