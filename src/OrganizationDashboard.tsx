import { useParams, Link } from "react-router-dom"
import { useSidebarOrganizationQuery, useListKommunityPartnerQuery, useCompositionsQuery } from "./api/graphql"
import { Button } from "./components/ui/button"
import { ArrowRight, Server, Layers } from "lucide-react"
import { ClientCard } from "./components/ClientCard"
import { ServiceInstanceCard } from "./components/ServiceInstanceCard"

export default function OrganizationDashboard() {
  const { orgId } = useParams<{ orgId: string }>()

  const { data, loading, error } = useSidebarOrganizationQuery({
    variables: { id: orgId! },
    skip: !orgId,
  })

  const { data: compositionsData } = useCompositionsQuery({
    variables: { filters: { organization: orgId || undefined } },
    skip: !orgId,
  })

  const { data: partnersData } = useListKommunityPartnerQuery({
    variables: { pagination: { limit: 6 } }
  })

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>
  if (!data?.organization) return <div>Organization not found</div>

  const org = data.organization
  const latestClients = org.latestClients || []
  const latestServices = org.latestServices || []
  const compositions = compositionsData?.compositions || []
  const partners = partnersData?.kommunityPartners || []

  const hasCompositions = compositions.length > 0
  const hasClients = latestClients.length > 0
  const hasServices = latestServices.length > 0

  return (
    <div className="container mx-auto py-6 space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">Managing {org.name}</h1>

      {!hasCompositions && (
        <div className="space-y-0">
          {/* Hero */}
          <div className="rounded-t-xl border border-b-0 bg-gradient-to-b from-primary/8 to-background px-8 pt-16 pb-10 flex flex-col items-center text-center">
            <div className="w-14 h-14 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-5">
              <Layers className="w-7 h-7 text-primary" />
            </div>
            <h2 className="text-2xl font-bold tracking-tight mb-2">
              Welcome to {org.name}
            </h2>
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
      )}

      {hasCompositions && (
        <div className="flex flex-col gap-6">
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Services</h2>
            {hasServices ? (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {latestServices.map(service => (
                    <ServiceInstanceCard key={service.id} instance={service} />
                  ))}
                </div>
                <Button variant="outline" asChild>
                  <Link to={`/organization/${orgId}/service-instances`}>View All Services</Link>
                </Button>
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">No services deployed yet.</p>
            )}
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Clients</h2>
            {hasClients ? (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {latestClients.map(client => (
                    <ClientCard key={client.id} client={client} />
                  ))}
                </div>
                <Button variant="outline" asChild>
                  <Link to={`/organization/${orgId}/clients`}>View All Clients</Link>
                </Button>
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">No clients connected yet.</p>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
