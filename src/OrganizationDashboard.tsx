import { useParams, Link } from "react-router-dom"
import { useSidebarOrganizationQuery } from "@/graphql/queries/organization.generated"
import { useHubsQuery } from "@/graphql/queries/hub.generated"
import { useClientsQuery } from "@/graphql/queries/client.generated"
import { Ordering } from "@/api/types"
import { Button } from "./components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "./components/ui/card"
import { AlertCircle, AppWindow, ChevronRight, Layers, LayoutDashboard, UserPlus, Users, type LucideIcon } from "lucide-react"

import { DashboardSkeleton } from "@/components/skeletons"
import { ClientLabel } from "./components/ClientLabel"
import { PageHeader } from "./components/PageHeader"
import { JoinRequestsCard } from "./components/JoinRequestsCard"

import { QueryError, ResourceNotFound } from "@/components/status"

/**
 * One tile of the overview's stat row: a label, the one fact worth knowing, and
 * the whole tile is the link to the page behind it. `highlight` marks the tile
 * that is the next thing to do (e.g. connecting a first hub).
 */
function StatTile({
  to,
  icon: Icon,
  label,
  value,
  highlight = false,
}: {
  to: string
  icon: LucideIcon
  label: string
  value: React.ReactNode
  highlight?: boolean
}) {
  return (
    <Link to={to} className="group">
      <Card
        className={`flex h-full flex-row items-center justify-between gap-4 p-5 transition-shadow group-hover:shadow-md ${
          highlight ? "border-primary/30 bg-primary/5" : ""
        }`}
      >
        <div className="min-w-0 space-y-1">
          <p className="flex items-center gap-2 text-sm text-muted-foreground">
            <Icon className="h-4 w-4" /> {label}
          </p>
          <p className="truncate text-xl font-semibold tabular-nums">{value}</p>
        </div>
        <ChevronRight className="h-5 w-5 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
      </Card>
    </Link>
  )
}

export default function OrganizationDashboard() {
  const { orgId } = useParams<{ orgId: string }>()

  const { data, loading, error } = useSidebarOrganizationQuery({
    variables: { id: orgId! },
    skip: !orgId,
  })

  const { data: hubsData } = useHubsQuery({
    variables: { filters: { organization: orgId || undefined } },
    skip: !orgId,
  })

  // Action items: apps that cannot reach a service they were granted, and have
  // not been triaged yet. Deliberately not `functional: false` — an app also calls
  // itself non-functional when it asks for a service nobody deployed or mapped,
  // which is an ordinary state. Resolving a client's latest report clears it from
  // here; the next report the client sends puts it straight back (lok resets
  // Client.latest_report_resolved on every incoming report).
  const { data: unhealthyData } = useClientsQuery({
    variables: {
      filters: { organization: orgId, needsAttention: true, latestReportResolved: false },
      ordering: [{ createdAt: Ordering.Desc }],
      pagination: { limit: 8 },
    },
    skip: !orgId,
  })

  if (loading) return <DashboardSkeleton />
  if (error) return <QueryError error={error} resource="organization" />
  if (!data?.organization) return <ResourceNotFound resource="organization" id={orgId} />

  const org = data.organization
  const hubs = hubsData?.hubs || []
  const unhealthyClients = unhealthyData?.clients || []

  const hasClients = (org.latestClients || []).length > 0
  const hasUnhealthy = unhealthyClients.length > 0
  // memberships is a complete list (no pagination on the field), so its length is a
  // real total.
  const memberCount = (org.memberships ?? []).length
  // Sole member (i.e. it's just the owner) — the invite button becomes the primary action.
  const isLonely = memberCount <= 1
  const base = `/organization/${orgId}`

  return (
    <div className="flex flex-1 flex-col gap-6 p-6">
      <PageHeader
        icon={LayoutDashboard}
        title="Overview"
        description={`Managing ${org.name}`}
        actions={
          <Button variant={isLonely ? "default" : "outline"} size="sm" asChild>
            <Link to={`${base}/invites`}>
              <UserPlus className="h-4 w-4" /> Invite others
            </Link>
          </Button>
        }
      />

      {/* What is waiting on someone. Each block only exists while it has something
          in it, so a quiet organization is just the row of tiles below. */}

      {/* People asking to join — admins only */}
      <JoinRequestsCard organizationId={org.id} />

      {/* Apps that cannot reach a granted service, not yet triaged */}
      {hasUnhealthy && (
        <Card className="border-destructive/30 bg-destructive/5">
          <CardHeader className="flex flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <AlertCircle className="h-5 w-5 shrink-0 text-destructive" />
              <div className="space-y-1">
                <CardTitle className="text-lg">Needs attention</CardTitle>
                <CardDescription>
                  {unhealthyClients.length} {unhealthyClients.length === 1 ? "app" : "apps"} cannot reach a
                  service {unhealthyClients.length === 1 ? "it was" : "they were"} granted.
                </CardDescription>
              </div>
            </div>
            <Button variant="outline" size="sm" asChild>
              <Link to={`${base}/clients`}>View all</Link>
            </Button>
          </CardHeader>
          <CardContent className="space-y-2">
            {unhealthyClients.map(client => (
              <Link
                key={client.id}
                to={`${base}/clients/${client.id}`}
                className="flex items-center justify-between gap-4 rounded-lg border bg-background p-3 hover:shadow-sm"
              >
                <ClientLabel client={client} className="flex-wrap" />
                <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground" />
              </Link>
            ))}
          </CardContent>
        </Card>
      )}

      {/* The organization at a glance; every tile leads to its page. */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatTile to={`${base}/members`} icon={Users} label="Members" value={memberCount} />
        {hubs.length === 0 ? (
          <StatTile to={`${base}/connect-hub`} icon={Layers} label="Hub" value="Connect a hub" highlight />
        ) : hubs.length === 1 ? (
          <StatTile to={`${base}/hubs/${hubs[0].id}`} icon={Layers} label="Hub" value={hubs[0].name} />
        ) : (
          <StatTile to={`${base}/hubs`} icon={Layers} label="Hubs" value={hubs.length} />
        )}
        <StatTile
          to={`${base}/clients`}
          icon={AppWindow}
          label="Apps"
          value={
            hasUnhealthy
              ? `${unhealthyClients.length} need${unhealthyClients.length === 1 ? "s" : ""} attention`
              : hasClients
                ? "All healthy"
                : "None connected yet"
          }
        />
      </div>
    </div>
  )
}
