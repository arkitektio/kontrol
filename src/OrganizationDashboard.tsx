import { useParams, Link } from "react-router-dom"
import {
  useSidebarOrganizationQuery,
  useCompositionsQuery,
  useClientsQuery,
  Ordering,
} from "./api/graphql"
import { Button } from "./components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "./components/ui/card"
import { ArrowRight, Layers, AlertCircle, CheckCircle2, LayoutDashboard, UserPlus, Plug } from "lucide-react"

// A little personality for the members tile — a nudge that scales with the crew size.
function funnyMemberLine(count: number): string {
  if (count <= 1) return "Just you so far — invite someone to get the party started."
  if (count === 2) return "Two's good, but three's a party."
  if (count === 3) return "Three? Let's make it four."
  if (count === 4) return "Four and counting — a proper little crew."
  if (count <= 6) return `${count} strong. The band keeps growing.`
  if (count <= 12) return `${count} of you now — a real team.`
  return `${count} members. This is a movement.`
}
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
            {!isLonely && (
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
            <p className="text-sm text-muted-foreground">{funnyMemberLine(memberCount)}</p>
            <Button variant={isLonely ? "default" : "outline"} size="sm" asChild className="w-full">
              <Link to={`/organization/${orgId}/invites`}>Invite others</Link>
            </Button>
          </CardContent>
        </Card>

        {/* Hubs — stat tile mirroring Members: count + quick links, or a connect CTA
            when the org has none (links to the same connect-hub page as the sidebar). */}
        <Card className={`lg:col-span-2`}>
          <CardHeader className="pb-2">
            <CardDescription className="flex items-center gap-2">
              <Layers className="h-4 w-4" /> {compositions.length === 1 ? "Hub" : "Hubs"}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {hasCompositions ? (
              <div className="flex flex-col gap-2">
                {/* One hub per org is the norm, so just list the hub(s) — no count. */}
                {compositions.slice(0, 4).map(hub => (
                  <Link
                    key={hub.id}
                    to={`/organization/${orgId}/compositions/${hub.id}`}
                    className="flex items-center gap-2 font-medium hover:underline"
                  >
                    <Layers className="h-4 w-4 shrink-0 text-muted-foreground" />
                    <span className="truncate">{hub.name}</span>
                  </Link>
                ))}
                {compositions.length > 4 && (
                  <Link
                    to={`/organization/${orgId}/compositions`}
                    className="text-xs text-muted-foreground hover:underline"
                  >
                    +{compositions.length - 4} more
                  </Link>
                )}
              </div>
            ) : (
              <>
                <p className="text-sm text-muted-foreground">
                  No hub yet. Connect one to deploy a pre-configured stack in minutes.
                </p>
                <Button size="sm" asChild className="w-full">
                  <Link to={`/organization/${orgId}/connect-hub`}>
                    <Plug className="h-4 w-4 mr-2" /> Connect a hub
                  </Link>
                </Button>
              </>
            )}
          </CardContent>
        </Card>

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
