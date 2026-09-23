import { Link, useParams } from "react-router-dom"
import { AlertCircle, CheckCircle2, ShieldCheck } from "lucide-react"

import { ClientCard } from "@/components/ClientCard"
import { PageHeader } from "@/components/PageHeader"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { QueryError, ResourceNotFound } from "@/components/status"
import { SettingsStackSkeleton } from "@/components/skeletons"
import { useActiveOrganization } from "@/hooks/useActiveOrganization"
import { useIsOrgAdmin } from "@/hooks/useIsOrgAdmin"
import { useClientsQuery } from "@/graphql/queries/client.generated"
import { Ordering } from "@/api/types"

import { RoleRequestInbox } from "./RoleRequestInbox"

/**
 * The organization's admin desk: everything that is waiting on a decision from
 * someone privileged, in one place.
 *
 * Gated on `amIAdmin`, which lok resolves as `is_owner_or_admin` — so the page is
 * visible to an admin *or* the owner, exactly the bar the approve/decline
 * mutations enforce server-side. (Until now the role-request inbox lived on the
 * Members page behind an owner-only check, so admins could approve a request
 * they had no way to see.) The gate here is a courtesy: the server refuses the
 * mutations regardless of what the SPA renders.
 */
export default function AdminPage() {
  const { orgId } = useParams<{ orgId: string }>()
  // Both hooks read the Me query the shell already ran, so the gate and the org's
  // name cost no round trip of their own. `loading` matters: without it the denied
  // state flashes at a legitimate admin before their memberships arrive.
  const { isAdmin: mayAdminister, loading } = useIsOrgAdmin(orgId)
  const { organizations } = useActiveOrganization()
  const org = organizations.find((o) => o.id === orgId) ?? null

  // Same action list the dashboard shows: apps this org owns that are reporting
  // problems and have not been triaged yet. It sits here too because triaging one
  // is an admin's job, and this is the page they'll be on.
  const {
    data: unhealthyData,
    error: unhealthyError,
    refetch: refetchUnhealthy,
  } = useClientsQuery({
    variables: {
      filters: { organization: orgId, functional: false, latestReportResolved: false },
      ordering: [{ createdAt: Ordering.Desc }],
      pagination: { limit: 8 },
    },
    skip: !orgId || !mayAdminister,
  })

  if (loading) return <SettingsStackSkeleton header="pageHeader" cards={2} rows={3} />
  if (!org) return <ResourceNotFound resource="organization" id={orgId} />

  // A plain member gets the page's own header carrying the explanation, matching
  // how RoleSets and DangerZone turn away non-owners — a full StatusPage would
  // stack a second heading under this one and bury the sentence that matters.
  if (!mayAdminister) {
    return (
      <div className="flex flex-1 flex-col gap-8 p-6">
        <PageHeader
          icon={ShieldCheck}
          title="Admin"
          description="Only this organization's owner, or a member holding its admin role, can review role requests."
        />
        <Button variant="outline" className="self-start" asChild>
          <Link to={`/organization/${org.id}`}>Back to overview</Link>
        </Button>
      </div>
    )
  }

  const unhealthyClients = unhealthyData?.clients ?? []

  return (
    <div className="flex flex-1 flex-col gap-8 p-6">
      <PageHeader
        icon={ShieldCheck}
        title="Admin"
        description={`Requests and reports waiting on an admin of ${org.name || org.slug}`}
      />

      <RoleRequestInbox organizationId={org.id} />

      {/* Without this an error would fall through to the green "nothing to triage" card. */}
      {unhealthyError ? (
        <QueryError
          compact
          error={unhealthyError}
          resource="app reports"
          onRetry={() => refetchUnhealthy()}
        />
      ) : unhealthyClients.length > 0 ? (
        <Card className="border-destructive/30 bg-destructive/5">
          <CardHeader className="flex flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="bg-destructive/10 flex h-10 w-10 items-center justify-center rounded-lg">
                <AlertCircle className="text-destructive h-5 w-5" />
              </div>
              <div className="space-y-1">
                <CardTitle className="text-lg">Apps needing attention</CardTitle>
                <CardDescription>
                  {unhealthyClients.length} {unhealthyClients.length === 1 ? "app is" : "apps are"}{" "}
                  reporting problems and haven't been triaged. Open one to see its report and mark
                  it resolved.
                </CardDescription>
              </div>
            </div>
            <Button variant="outline" size="sm" asChild>
              <Link to={`/organization/${org.id}/clients`}>View all</Link>
            </Button>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {unhealthyClients.map((client) => (
                <ClientCard key={client.id} client={client} />
              ))}
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card className="border-green-500/20 bg-green-500/5">
          <CardHeader className="flex flex-row items-center gap-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-500/10">
              <CheckCircle2 className="h-5 w-5 text-green-500" />
            </div>
            <div className="space-y-1">
              <CardTitle className="text-lg">No app reports to triage</CardTitle>
              <CardDescription>
                Every connected app is either reporting in fine or already triaged.
              </CardDescription>
            </div>
          </CardHeader>
        </Card>
      )}
    </div>
  )
}
