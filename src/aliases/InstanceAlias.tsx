import { useParams, Link, useNavigate } from "react-router-dom"
import { useDetailInstanceAliasQuery } from "../api/graphql"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../components/ui/card"
import { Badge } from "../components/ui/badge"
import { Globe, Lock, Server, ExternalLink, Shield } from "lucide-react"
import { Button } from "../components/ui/button"
import { Separator } from "../components/ui/separator"
import { UpdateAliasSheet } from "./UpdateAliasSheet"
import { DeleteAliasDialog } from "./DeleteAliasDialog"

export default function InstanceAlias() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { data, loading, error } = useDetailInstanceAliasQuery({
    variables: { id: id! },
    skip: !id,
  })

  if (loading) return <div className="p-4">Loading...</div>
  if (error) return <div className="p-4">Error: {error.message}</div>
  if (!data?.instanceAlias) return <div className="p-4">Instance alias not found</div>

  const alias = data.instanceAlias

  const buildFullUrl = () => {
    if (!alias.host || alias.host === "") {
      const protocol = window.location.protocol;
      const hostname = window.location.hostname;
      const port = window.location.port ? `:${window.location.port}` : "";
      const path = alias.path || "";
      return `${protocol}//${hostname}${port}/${path}`;
    }
    return `${alias.ssl ? "https" : "http"}://${alias.host}${alias.port ? `:${alias.port}` : ""}${alias.path ? `/${alias.path}` : ""}`;
  }

  const fullUrl = buildFullUrl();

  return (
    <div className="container mx-auto py-10 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Instance Alias</h1>
          <p className="text-muted-foreground mt-1">Service endpoint configuration</p>
        </div>
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
              navigate("/instance-aliases")
            }}
          />
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                {alias.ssl ? (
                  <Lock className="h-5 w-5 text-green-500" />
                ) : (
                  <Globe className="h-5 w-5 text-muted-foreground" />
                )}
                <CardTitle className="text-2xl">
                  {alias.host || "[Relative Alias]"}
                </CardTitle>
              </div>
              <CardDescription className="font-mono">
                {fullUrl}
              </CardDescription>
            </div>
            <a href={fullUrl} target="_blank" rel="noopener noreferrer">
              <Button variant="outline" size="sm">
                <ExternalLink className="h-4 w-4 mr-2" />
                Open
              </Button>
            </a>
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
                  <span className="font-mono">{alias.host || "Relative"}</span>
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
                  <span className="font-mono text-xs break-all">{alias.challenge}</span>
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
                <div className="text-sm text-muted-foreground font-mono">
                  {alias.instance?.id}
                </div>
              </div>
              <Link to={`/service-instances/${alias.instance?.id}`}>
                <Button variant="outline" size="sm">
                  View Instance
                  <ExternalLink className="h-3 w-3 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
