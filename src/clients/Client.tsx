import { useParams } from "react-router-dom"
import { useDetailClientQuery } from "../api/graphql"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar"
import { Badge } from "../components/ui/badge"
import { Link } from "react-router-dom"
import { ClientUsedAliasFlow } from "./ClientUsedAliasFlow"

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
        {/* Background Flow */}
        <div className="fixed top-0 right-0 h-screen w-[40vw] z-0 pointer-events-none ">
             <div className="absolute inset-0 bg-gradient-to-r from-background to-transparent z-10 w-10" />
             <ClientUsedAliasFlow client={client || []} />
        </div>

        <div className="relative z-10 max-w-[30vw] space-y-6">
            <CardHeader className="flex flex-row items-center gap-4">
              <Avatar className="h-16 w-16">
                <AvatarImage src={client.logo?.presignedUrl || undefined} alt={client.name} />
                <AvatarFallback>{client.name.substring(0, 2).toUpperCase()}</AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="text-2xl">{client.name || "Unnamed Client"}</CardTitle>
                <div className="flex items-center gap-2 mt-1">
                    <Badge variant="outline">{client.kind}</Badge>
                    <span className="text-muted-foreground">by {client.user?.username}</span>
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
                    <h3 className="font-semibold mb-2">Used Aliases</h3>
                    <div className="grid gap-2">
                        {client.usedAliases?.map(usedAlias => (
                            <div key={usedAlias.id} className="p-2 border rounded-md">
                                <div className="font-medium">{usedAlias.key}</div>
                                {usedAlias.alias && (
                                    <code className="text-xs text-muted-foreground">
                                        {usedAlias.alias.ssl ? 'https://' : 'http://'}
                                        {usedAlias.alias.host || usedAlias.alias.layer.name}
                                        {usedAlias.alias.port ? `:${usedAlias.alias.port}` : ''}
                                        {usedAlias.alias.path || ''}
                                    </code>
                                )}
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
