import { aliasPath, aliasUrl } from "@/lib/aliasUrl"
import { useParams, Link, useNavigate } from "react-router-dom"
import { useDetailInstanceAliasQuery } from "@/graphql/queries/instance_alias.generated"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { Badge } from "../components/ui/badge"
import { Globe, Lock, Server, ExternalLink, Shield, ArrowRight } from "lucide-react"
import { Command } from "../components/Command"
import { Button } from "../components/ui/button"
import { Separator } from "../components/ui/separator"
import { UpdateAliasSheet } from "./UpdateAliasSheet"
import { DeleteAliasDialog } from "./DeleteAliasDialog"
import { AdminOnly } from "../components/AdminOnly"

import { QueryError, ResourceNotFound } from "@/components/status"

import { DetailPageSkeleton } from "@/components/skeletons"

export default function InstanceAlias() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { data, loading, error } = useDetailInstanceAliasQuery({
    variables: { id: id! },
    skip: !id,
  })

  if (loading) return <DetailPageSkeleton sections={2} />
  if (error) return <QueryError error={error} resource="instance alias" />
  if (!data?.instanceAlias) return <ResourceNotFound resource="instance alias" id={id} />

  const alias = data.instanceAlias

  const isMesh = alias.kind === "mesh"
  // A mesh alias's host is its hub node's MagicDNS name, resolved live by lok.
  const displayHost = isMesh ? alias.resolvedHost : alias.host

  const buildFullUrl = () => {
    if (isMesh) return aliasUrl(alias, "[hub not on the mesh]")
    if (!alias.host) {
      // A relative alias: served from wherever the client reached lok.
      const port = window.location.port ? `:${window.location.port}` : "";
      return `${window.location.protocol}//${window.location.hostname}${port}${aliasPath(alias.path)}`;
    }
    return aliasUrl(alias)
  }

  const fullUrl = buildFullUrl();

  return (
    <div className="container mx-auto py-10 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Instance Alias</h1>
          <p className="text-muted-foreground mt-1">Service endpoint configuration</p>
        </div>
        <AdminOnly orgId={alias.organization?.id} note="Only organization admins can edit or delete an alias.">
        <div className="flex items-center gap-2">
          <UpdateAliasSheet 
            alias={alias} 
            onSuccess={() => {
              // Refetch will be handled by the mutation
            }} 
          />
          <DeleteAliasDialog 
            aliasId={alias.id}
            aliasUrl={fullUrl}
            onSuccess={() => {
              navigate(
                alias.instance?.id
                  ? `/organization/${alias.organization.id}/service-instances/${alias.instance.id}`
                  : "/instance-aliases",
              )
            }}
          />
        </div>
        </AdminOnly>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div className="min-w-0 space-y-1">
              <div className="flex items-center gap-2">
                {alias.ssl ? (
                  <Lock className="h-5 w-5 text-green-500" />
                ) : (
                  <Globe className="h-5 w-5 text-muted-foreground" />
                )}
                <CardTitle className="text-2xl">
                  {displayHost || (isMesh ? "[Mesh Alias]" : "[Relative Alias]")}
                </CardTitle>
              </div>
              <div className="max-w-xl">
                <Command label="Copy URL">{fullUrl}</Command>
              </div>
            </div>
            <Button variant="outline" size="sm" asChild>
              <a href={fullUrl} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="h-4 w-4 mr-2" />
                Open
              </a>
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <h3 className="font-semibold flex items-center gap-2">
                <Server className="h-4 w-4" />
                Connection Details
              </h3>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Host:</span>
                  <span className="font-mono">{displayHost || (isMesh ? "Hub not on the mesh" : "No host")}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Port:</span>
                  <span className="font-mono">{alias.port || "Default"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Path:</span>
                  <span className="font-mono">/{alias.path || ""}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">SSL:</span>
                  <Badge variant={alias.ssl ? "default" : "secondary"} className="text-xs">
                    {alias.ssl ? "Enabled" : "Disabled"}
                  </Badge>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="font-semibold flex items-center gap-2">
                <Shield className="h-4 w-4" />
                Configuration
              </h3>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Kind:</span>
                  <Badge variant="outline">{alias.kind}</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Layer:</span>
                  <span>{alias.layer?.name || "Unknown"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Challenge:</span>
                  <span className="font-mono text-xs break-all text-right">{alias.challenge}</span>
                </div>
              </div>
            </div>
          </div>

          <Separator />

          <div className="space-y-2">
            <h3 className="font-semibold">Service Instance</h3>
            <div className="flex items-center justify-between p-3 border rounded-md">
              <div className="space-y-1">
                <div className="font-medium">Instance ID</div>
                <div className="text-sm text-muted-foreground font-mono" title="Service instance id">
                  {alias.instance?.id ?? "—"}
                </div>
              </div>
              {alias.instance?.id && (
                <Button variant="outline" size="sm" asChild>
                  <Link to={`/organization/${alias.organization.id}/service-instances/${alias.instance.id}`}>
                    View Instance
                    <ArrowRight className="h-3 w-3 ml-2" />
                  </Link>
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
