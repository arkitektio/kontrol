import { ClientLabel } from "@/components/ClientLabel"
import { clientInitials, clientLabel } from "@/lib/clientLabel"
import { cn } from "@/lib/utils"
import { Activity } from "lucide-react"
import { Link, useParams } from "react-router-dom"
import { useDetailClientQuery } from "../api/graphql"
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar"
import { Badge } from "../components/ui/badge"
import { CardContent, CardHeader, CardTitle } from "../components/ui/card"

export default function Client() {
  const { id } = useParams<{ id: string }>()
  const { data, loading, error } = useDetailClientQuery({
    variables: { id: id! },
    skip: !id,
  })

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>
  if (!data?.client) return <div>Client not found</div>

  const client = data.client

  return (
    <div className="container mx-auto py-10 relative min-h-screen">
        <div className="relative z-10 max-w-[30vw] space-y-6">
            <CardHeader className="flex flex-row items-center gap-4">

            
              <Avatar className="h-16 w-16">
                <AvatarImage src={client.logo?.presignedUrl || undefined} alt={clientLabel(client)} />
                <AvatarFallback>{clientInitials(client)}</AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="text-2xl flex flex-row items-center gap-2"><ClientLabel client={client} />{}
</CardTitle>
                <div className="flex items-center gap-2 mt-1">
                    <Badge variant="outline">{client.organization.name}</Badge>
                    <span className="text-muted-foreground">by {client.user?.username}</span>
                    <Link
                        to={`/organization/${client.organization.id}/clients/${client.id}/report`}
                        className="inline-flex items-center gap-1 text-sm text-primary hover:underline"
                    >
                        <Activity className="h-4 w-4" /> Latest report
                    </Link>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
                {client.release && (
                    <div>
                        <h3 className="font-semibold mb-2">Release</h3>
                        <Link to={`/releases/${client.release.id}`}>
                            <div className="p-2 border rounded-md hover:bg-muted/50 transition-colors flex items-center gap-2">
                                <Avatar className="h-8 w-8">
                                    <AvatarImage src={client.release.logo?.presignedUrl || undefined} />
                                    <AvatarFallback>{client.release.app.identifier.substring(0, 2).toUpperCase()}</AvatarFallback>
                                </Avatar>
                                <div>
                                    <div className="font-medium">{client.release.app.identifier} {client.release.version}</div>
                                    <div className="text-xs text-muted-foreground">{client.release.app.identifier}</div>
                                </div>
                            </div>
                        </Link>
                    </div>
                )}

                
                {client.device && (
                    <Link to={`/devices/${client.device.id}`}>
                        <h3 className="font-semibold mb-2">Device</h3>
                        <div className="p-2 border rounded-md">
                            <div className="font-medium">{client.device.name || "Unnamed Device"}</div>
                        </div>
                    </Link>
                )}

                <div>
                    <h3 className="font-semibold mb-2">Scopes</h3>
                    <div className="grid gap-2">
                        {client.scopes?.map(scope => (
                            <div key={scope.id} className="p-2 border rounded-md">
                                <div className="font-medium"></div>
                                 <Link to={`/organization/${client.organization.id}/scopes/${scope.id}`}>{scope.identifier}
                                </Link>
                                <div className="text-xs text-muted-foreground">
                                    {scope.description}
                                </div>
                            </div>
                        ))}
                        {(!client.usedAliases || client.usedAliases.length === 0) && (
                            <div className="text-sm text-muted-foreground">No aliases used</div>
                        )}
                    </div>
                </div>

                <div>
                    <h3 className="font-semibold mb-2">Connected Services</h3>
                    <div className="grid gap-2">
                        {client.usedAliases?.map(usedAlias => (
                            <div key={usedAlias.id} className={cn("p-2 border rounded-md", usedAlias.valid ? "border-green-500/40" : "border-red-500/40")}>
                                <div className="font-medium">{usedAlias.key}</div>
                                {usedAlias.alias && (
                                    <Link to={`/instance-aliases/${usedAlias.alias.id}`}>
                                    <code className="text-xs text-muted-foreground">
                                        {usedAlias.alias.ssl ? 'https://' : 'http://'}
                                        {usedAlias.alias.host}
                                        {usedAlias.alias.port ? `:${usedAlias.alias.port}` : ''}
                                        {usedAlias.alias.path ? `/${usedAlias.alias.path}` : ''}
                                    </code>
                                    </Link>
                                )}
                                <div className="text-xs text-muted-foreground">
                                    {usedAlias.reason}
                                </div>
                            </div>
                        ))}
                        {(!client.usedAliases || client.usedAliases.length === 0) && (
                            <div className="text-sm text-muted-foreground">No aliases used</div>
                        )}
                    </div>
                </div>
            </CardContent>
        </div>
    </div>
  )
}
