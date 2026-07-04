import { Link, useParams } from "react-router-dom"
import { useCompositionsQuery, useListKommunityPartnerQuery } from "../api/graphql"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { Badge } from "../components/ui/badge"
import { Button } from "../components/ui/button"
import { PageHeader } from "../components/PageHeader"
import { Layers, ArrowRight, Server } from "lucide-react"

export default function Compositions() {
  const { orgId } = useParams<{ orgId: string }>()

  const { data, loading, error } = useCompositionsQuery({
    variables: { filters: { organization: orgId || undefined } },
    skip: !orgId
  })

  const { data: partnersData } = useListKommunityPartnerQuery({
    variables: { pagination: { limit: 6 } }
  })

  if (loading) return <div className="p-4">Loading...</div>
  if (error) return <div className="p-4">Error: {error.message}</div>

  const compositions = data?.compositions || []
  const partners = partnersData?.kommunityPartners || []

  return (
    <div className="flex flex-1 flex-col gap-8 p-6">
      <PageHeader
        icon={Layers}
        title="Hubs"
        description="Pre-configured stacks of services and clients for this organization."
      />

      {compositions.length === 0 ? (
        <div className="space-y-0">
          {/* Hero */}
          <div className="rounded-t-xl border border-b-0 bg-gradient-to-b from-primary/8 to-background px-8 pt-16 pb-10 flex flex-col items-center text-center">
            <div className="w-14 h-14 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-5">
              <Layers className="w-7 h-7 text-primary" />
            </div>
            <h3 className="text-2xl font-bold tracking-tight mb-2">No hubs yet</h3>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-md">
              Connect a Kommunity Partner to deploy a pre-configured stack in minutes,
              or self-host your own Arkitekt instance.
            </p>
          </div>

          {/* Partner cards */}
          <div className="border border-b-0 bg-muted/30 px-8 py-6 space-y-4">
            <div className="flex items-center justify-between">
              <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                Kommunity Partners
              </p>
              <Button variant="ghost" size="sm" asChild className="text-xs h-7 px-2">
                <Link to={`/organization/${orgId}/partners`}>
                  View all <ArrowRight className="ml-1 w-3 h-3" />
                </Link>
              </Button>
            </div>

            {partners.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {partners.map(partner => (
                  <Link
                    key={partner.id}
                    to={`/organization/${orgId}/partners/${partner.id}`}
                    className="flex items-center gap-3 p-3 rounded-lg bg-background border hover:border-primary/40 hover:shadow-sm transition-all group"
                  >
                    <div className="w-10 h-10 flex-shrink-0 rounded-lg bg-muted flex items-center justify-center overflow-hidden border">
                      {partner.logoUrl
                        ? <img src={partner.logoUrl} alt={partner.name} className="w-full h-full object-contain p-1" />
                        : <span className="text-sm font-bold text-muted-foreground">{partner.name.charAt(0)}</span>
                      }
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{partner.name}</p>
                      <p className="text-xs text-muted-foreground truncate">
                        {partner.shortDescription || partner.description}
                      </p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0" />
                  </Link>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">No partners available yet.</p>
            )}
          </div>

          {/* Self-host footer */}
          <div className="rounded-b-xl border px-8 py-4 flex items-center justify-between bg-muted/10">
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <Server className="w-4 h-4 flex-shrink-0" />
              <span>Prefer to run your own infrastructure?</span>
            </div>
            <Button variant="ghost" size="sm" asChild className="text-xs h-7 px-3 flex-shrink-0">
              <a href="https://arkitekt.live/docs/hosting" target="_blank" rel="noopener noreferrer">
                Self-hosting guide <ArrowRight className="ml-1 w-3 h-3" />
              </a>
            </Button>
          </div>
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
