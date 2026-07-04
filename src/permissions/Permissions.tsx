import { Link, useParams } from "react-router-dom"
import { useRolesQuery, useScopesQuery } from "../api/graphql"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { Shield, Lock, Users, AppWindow } from "lucide-react"

export default function Permissions() {
  const { orgId } = useParams<{ orgId: string }>()

  const { data: rolesData, loading: rolesLoading, error: rolesError } = useRolesQuery({
    variables: { filters: { organization: orgId || undefined } },
  })
  const { data: scopesData, loading: scopesLoading, error: scopesError } = useScopesQuery({
    variables: { filters: { organization: orgId || undefined } },
  })

  const roles = rolesData?.roles || []
  const scopes = scopesData?.scopes || []

  return (
    <div className="flex flex-1 flex-col gap-6 p-4 pt-0">
      <div className="space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Permissions</h2>
        <p className="text-muted-foreground max-w-3xl">
          Permissions come in two flavours. <strong>Roles</strong> describe what a{" "}
          <em>member</em> is allowed to do, and <strong>Scopes</strong> describe what an{" "}
          <em>app or client</em> is allowed to access.
        </p>
      </div>

      {/* Difference explainer */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="bg-muted/30">
          <CardHeader className="flex flex-row items-center gap-3 space-y-0">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-muted">
              <Users className="h-4 w-4" />
            </div>
            <CardTitle className="text-base">Roles — for people</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            A role is a set of permissions assigned to a member through their membership. Roles
            define what a person can do inside the organization (for example{" "}
            <span className="font-mono">admin</span> or <span className="font-mono">editor</span>).
          </CardContent>
        </Card>
        <Card className="bg-muted/30">
          <CardHeader className="flex flex-row items-center gap-3 space-y-0">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-muted">
              <AppWindow className="h-4 w-4" />
            </div>
            <CardTitle className="text-base">Scopes — for apps</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            A scope is a capability granted to a client or app when it connects. Scopes define the
            access level an application requests during authorization — they gate what a connected
            app can reach, not what a person can do.
          </CardContent>
        </Card>
      </div>

      {/* Roles */}
      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <Shield className="h-5 w-5 text-muted-foreground" />
          <h3 className="text-xl font-semibold tracking-tight">Roles</h3>
        </div>
        {rolesError ? (
          <div className="text-sm text-destructive">Error: {rolesError.message}</div>
        ) : rolesLoading ? (
          <div className="text-sm text-muted-foreground">Loading...</div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {roles.map((role) => (
              <Link key={role.id} to={`/organization/${orgId}/roles/${role.id}`}>
                <Card className="hover:bg-muted/50 transition-colors cursor-pointer h-full">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium truncate">{role.identifier}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-xs text-muted-foreground">{role.description}</div>
                  </CardContent>
                </Card>
              </Link>
            ))}
            {roles.length === 0 && (
              <div className="col-span-full text-sm text-muted-foreground">No roles found.</div>
            )}
          </div>
        )}
      </section>

      {/* Scopes */}
      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <Lock className="h-5 w-5 text-muted-foreground" />
          <h3 className="text-xl font-semibold tracking-tight">Scopes</h3>
        </div>
        {scopesError ? (
          <div className="text-sm text-destructive">Error: {scopesError.message}</div>
        ) : scopesLoading ? (
          <div className="text-sm text-muted-foreground">Loading...</div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {scopes.map((scope) => (
              <Link key={scope.id} to={`/organization/${orgId}/scopes/${scope.id}`}>
                <Card className="hover:bg-muted/50 transition-colors cursor-pointer h-full">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium truncate">{scope.identifier}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-xs text-muted-foreground">{scope.description}</div>
                  </CardContent>
                </Card>
              </Link>
            ))}
            {scopes.length === 0 && (
              <div className="col-span-full text-sm text-muted-foreground">No scopes found.</div>
            )}
          </div>
        )}
      </section>
    </div>
  )
}
