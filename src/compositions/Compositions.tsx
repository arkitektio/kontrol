import { Link, useParams } from "react-router-dom"
import { useCompositionsQuery, useListKommunityPartnerQuery } from "../api/graphql"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../components/ui/card"
import { Badge } from "../components/ui/badge"
import { Button } from "../components/ui/button"
import { Layers, ArrowRight, Server } from "lucide-react"

export default function Compositions() {
  const { orgId } = useParams<{ orgId: string }>()

  const { data, loading, error } = useCompositionsQuery({
    variables: {
      filters: {
        organization: orgId || undefined
      }
    },
    skip: !orgId
  })

  const { data: partnersData } = useListKommunityPartnerQuery({
    variables: { pagination: { limit: 4 } }
  })

  if (loading) return <div className="p-4">Loading...</div>
  if (error) return <div className="p-4">Error: {error.message}</div>

  const compositions = data?.compositions || []
  const partners = partnersData?.kommunityPartners || []

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Compositions</h2>
      </div>

      {compositions.length === 0 ? (
        <div className="space-y-6">
          <div className="rounded-lg border bg-card shadow-sm p-8 flex flex-col items-center text-center space-y-4 bg-gradient-to-br from-primary/5 to-secondary/5">
            <Layers className="w-12 h-12 text-primary opacity-80" />
            <h3 className="text-2xl font-bold tracking-tight">No compositions yet</h3>
            <p className="text-muted-foreground max-w-[560px]">
              A composition bundles a set of services into a deployable unit for your organization.
              Connect a Kommunity Partner to get a pre-configured one instantly, or self-host your own.
            </p>

            {partners.length > 0 && (
              <div className="w-full mt-4 space-y-3">
                <p className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                  Available Kommunity Partners
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-left">
                  {partners.map(partner => (
                    <Card key={partner.id} className="flex flex-col bg-background overflow-hidden hover:shadow-md transition-shadow">
                      {partner.imageUrl && (
                        <img src={partner.imageUrl} alt={partner.name} className="h-24 w-full object-cover" />
                      )}
                      <CardHeader className="flex-row gap-3 items-center space-y-0 pb-2">
                        <div className="w-10 h-10 flex-shrink-0 bg-muted/50 rounded-lg p-1.5 flex items-center justify-center border">
                          {partner.logoUrl ? (
                            <img src={partner.logoUrl} alt={partner.name} className="w-full h-full object-contain" />
                          ) : (
                            <span className="text-base font-bold">{partner.name.charAt(0)}</span>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <CardTitle className="text-sm truncate">{partner.name}</CardTitle>
                          <p className="text-xs text-muted-foreground line-clamp-2 mt-0.5">
                            {partner.shortDescription || partner.description}
                          </p>
                        </div>
                      </CardHeader>
                      <CardContent className="pt-0 mt-auto">
                        <Button asChild size="sm" className="w-full gap-1.5">
                          <Link to={`/organization/${orgId}/partners/${partner.id}`}>
                            Connect <ArrowRight className="w-3 h-3" />
                          </Link>
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                <Button asChild variant="outline" size="sm">
                  <Link to={`/organization/${orgId}/partners`}>
                    View all partners <ArrowRight className="ml-1.5 w-3 h-3" />
                  </Link>
                </Button>
              </div>
            )}
          </div>

          <Card className="border-dashed bg-muted/30">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Server className="w-5 h-5" />
                Prefer to self-host?
              </CardTitle>
              <CardDescription>
                Deploy your own Arkitekt instance and connect it to this organization for full control over your infrastructure.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" asChild>
                <a href="https://arkitekt.live/docs/hosting" target="_blank" rel="noopener noreferrer">
                  Read the self-hosting guide <ArrowRight className="ml-1.5 w-3 h-3" />
                </a>
              </Button>
            </CardContent>
          </Card>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {compositions.map((composition) => (
            <Link key={composition.name} to={`/organization/${orgId}/compositions/${composition.id}`}>
              <Card className="hover:bg-muted/50 transition-colors cursor-pointer h-full">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <div className="flex items-center gap-2">
                    <Layers className="h-4 w-4 text-muted-foreground" />
                    <CardTitle className="text-sm font-medium">
                      {composition.name}
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center gap-2 flex-wrap">
                      <Badge variant="outline" className="text-xs">
                        {composition.instances.length} {composition.instances.length === 1 ? 'Service' : 'Services'}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {composition.clients.length} {composition.clients.length === 1 ? 'Client' : 'Clients'}
                      </Badge>
                    </div>

                    {composition.instances.length > 0 && (
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">Services:</p>
                        <div className="flex flex-col gap-1">
                          {composition.instances.slice(0, 3).map((instance, idx) => (
                            <p key={idx} className="text-xs font-medium truncate">
                              • {instance.identifier}
                            </p>
                          ))}
                          {composition.instances.length > 3 && (
                            <p className="text-xs text-muted-foreground">
                              +{composition.instances.length - 3} more
                            </p>
                          )}
                        </div>
                      </div>
                    )}
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
