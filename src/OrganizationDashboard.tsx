import { useParams, Link } from "react-router-dom"
import {
  useSidebarOrganizationQuery,
  useListKommunityPartnerQuery,
  useCompositionsQuery,
  useClientsQuery,
  Ordering,
} from "./api/graphql"
import { Button } from "./components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "./components/ui/card"
import { ArrowRight, Server, Layers, AlertCircle, CheckCircle2, LayoutDashboard, UserPlus } from "lucide-react"
import { ClientCard } from "./components/ClientCard"
import { ServiceInstanceCard } from "./components/ServiceInstanceCard"
import { PageHeader } from "./components/PageHeader"
import { Avatar, AvatarFallback, AvatarImage } from "./components/ui/avatar"

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

  // Action items: apps this org owns that are currently reporting problems.
  const { data: unhealthyData } = useClientsQuery({
    variables: {
      filters: { organization: orgId, functional: false },
      ordering: [{ createdAt: Ordering.Desc }],
      pagination: { limit: 8 },
    },
    skip: !orgId,
  })

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>
  if (!data?.organization) return <div>Organization not found</div>

  const org = data.organization
  const latestClients = org.latestClients || []
  const latestServices = org.latestServices || []
  const compositions = compositionsData?.compositions || []
  const partners = partnersData?.kommunityPartners || []
  const unhealthyClients = unhealthyData?.clients || []

  const hasCompositions = compositions.length > 0
  const hasClients = latestClients.length > 0
  const hasServices = latestServices.length > 0
  const hasUnhealthy = unhealthyClients.length > 0
  const members = org.memberships ?? []
  // memberships is a complete list (no pagination on the field), so its length is a
  // real total — unlike latestClients/latestServices which are capped previews.
  const memberCount = members.length
  // Sole member (i.e. it's just the owner) — nudge them to invite teammates.
  const isLonely = memberCount <= 1
  // The health tile only makes sense once there are apps reporting in.
  const showHealth = hasUnhealthy || hasClients

  return (
    <div className="flex flex-1 flex-col gap-6 p-6">
      <PageHeader
        icon={LayoutDashboard}
        title="Overview"
        description={`Managing ${org.name}`}
      />

      {/* Bento grid: tiles vary in width (col-span) so the page reads as a mosaic
          while each tile stays a self-contained card that flows on its own row height. */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-6">

        {/* Health status — wide tile */}
        {showHealth && (
          hasUnhealthy ? (
            <Card className="lg:col-span-4 border-destructive/30 bg-destructive/5">
              <CardHeader className="flex flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-destructive/10">
                    <AlertCircle className="h-5 w-5 text-destructive" />
                  </div>
                  <div className="space-y-1">
                    <CardTitle className="text-lg">Needs attention</CardTitle>
                    <CardDescription>
                      {unhealthyClients.length} {unhealthyClients.length === 1 ? "app is" : "apps are"} reporting
                      problems and may need reconfiguring.
                    </CardDescription>
                  </div>
                </div>
                <Button variant="outline" size="sm" asChild>
                  <Link to={`/organization/${orgId}/clients`}>View all</Link>
                </Button>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {unhealthyClients.map(client => (
                    <ClientCard key={client.id} client={client} />
                  ))}
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card className="lg:col-span-4 border-green-500/20 bg-green-500/5">
              <CardHeader className="flex flex-row items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-500/10">
                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                </div>
                <div className="space-y-1">
                  <CardTitle className="text-lg">All apps healthy</CardTitle>
                  <CardDescription>Every connected app is reporting in and functional.</CardDescription>
                </div>
              </CardHeader>
            </Card>
          )
        )}

        {/* Members — stat tile (member count is a real total) that also carries the
            invite CTA, folding in the "feeling lonely?" nudge for a sole owner. */}
        <Card className={`lg:col-span-2 ${isLonely ? "border-primary/20 bg-primary/5" : ""}`}>
          <CardHeader className="pb-2">
            <CardDescription className="flex items-center gap-2">
              <UserPlus className="h-4 w-4" /> Members
            </CardDescription>
            <CardTitle className="text-4xl font-bold tabular-nums">{memberCount}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {isLonely ? (
              <p className="text-sm text-muted-foreground">
                It's just you so far. Invite teammates so you can collaborate.
              </p>
            ) : (
              <div className="flex items-center -space-x-2">
                {members.slice(0, 6).map(m => (
                  <Avatar key={m.id} className="h-8 w-8 border-2 border-background">
                    <AvatarImage src={m.user.profile?.avatar?.presignedUrl || undefined} />
                    <AvatarFallback className="text-xs">
                      {m.user.username.substring(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                ))}
                {memberCount > 6 && (
                  <span className="pl-3 text-xs text-muted-foreground">+{memberCount - 6}</span>
                )}
              </div>
            )}
            <Button variant={isLonely ? "default" : "outline"} size="sm" asChild className="w-full">
              <Link to={`/organization/${orgId}/invites`}>Invite others</Link>
            </Button>
          </CardContent>
        </Card>

        {/* Onboarding hero (empty org) — full-width tile */}
        {!hasCompositions && (
          <Card className="lg:col-span-6 overflow-hidden gap-0 p-0">
            <div className="bg-gradient-to-b from-primary/8 to-background px-8 pt-12 pb-8 flex flex-col items-center text-center">
              <div className="w-14 h-14 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-5">
                <Layers className="w-7 h-7 text-primary" />
              </div>
              <h2 className="text-2xl font-bold tracking-tight mb-2">Welcome to {org.name}</h2>
              <p className="text-muted-foreground text-sm leading-relaxed max-w-md">
                Connect a Kommunity Partner to deploy a pre-configured stack in minutes,
                or self-host your own Arkitekt instance.
              </p>
            </div>

            <div className="border-t bg-muted/30 px-8 py-6 space-y-4">
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

            <div className="border-t px-8 py-4 flex items-center justify-between bg-muted/10">
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
          </Card>
        )}

        {/* Services — recent preview tile */}
        {hasCompositions && (
          <Card className="lg:col-span-3">
            <CardHeader className="flex flex-row items-center justify-between gap-4">
              <CardTitle className="text-lg">Services</CardTitle>
              {hasServices && (
                <Button variant="ghost" size="sm" asChild className="h-7 px-2 text-xs">
                  <Link to={`/organization/${orgId}/service-instances`}>
                    View all <ArrowRight className="ml-1 w-3 h-3" />
                  </Link>
                </Button>
              )}
            </CardHeader>
            <CardContent>
              {hasServices ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {latestServices.map(service => (
                    <ServiceInstanceCard key={service.id} instance={service} />
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">No services deployed yet.</p>
              )}
            </CardContent>
          </Card>
        )}

        {/* Clients — recent preview tile */}
        {hasCompositions && (
          <Card className="lg:col-span-3">
            <CardHeader className="flex flex-row items-center justify-between gap-4">
              <CardTitle className="text-lg">Clients</CardTitle>
              {hasClients && (
                <Button variant="ghost" size="sm" asChild className="h-7 px-2 text-xs">
                  <Link to={`/organization/${orgId}/clients`}>
                    View all <ArrowRight className="ml-1 w-3 h-3" />
                  </Link>
                </Button>
              )}
            </CardHeader>
            <CardContent>
              {hasClients ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {latestClients.map(client => (
                    <ClientCard key={client.id} client={client} />
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">No clients connected yet.</p>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
