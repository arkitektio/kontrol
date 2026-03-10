import { Suspense, lazy } from "react"
import { useParams } from "react-router-dom"
import { useDetailClientQuery } from "../api/graphql"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar"
import { Badge } from "../components/ui/badge"
import { Link } from "react-router-dom"
import { ClientUsedAliasFlow } from "./ClientUsedAliasFlow"
import { useIsMobile } from "@/hooks/use-mobile"
import { cn } from "@/lib/utils"

const AutoLogo = lazy(() => import("@/components/AutoLogo"))

export default function Client() {
    const isMobile = useIsMobile()
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
                {!isMobile ? (
                    <div className="fixed top-0 right-0 h-screen w-[40vw] z-0 pointer-events-none opacity-100">
                             <div className="absolute inset-0 bg-gradient-to-r from-background to-transparent z-10 py-10" />
                             <Suspense fallback={null}>
                                 <AutoLogo manifest={client.manifest} theme="dark" size={9}/>
                             </Suspense>
                    </div>
                ) : null}


        <div className="relative z-10 max-w-[30vw] space-y-6">
            <CardHeader className="flex flex-row items-center gap-4">

            
              <Avatar className="h-16 w-16">
                <AvatarImage src={client.logo?.presignedUrl || undefined} alt={client.name} />
                <AvatarFallback>{client.name.substring(0, 2).toUpperCase()}</AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="text-2xl flex flex-row items-center gap-2">{client.name || "Unnamed Client"}{client.functional && (
                    
                <div className="bg-green-300 rounded rounded-full h-4 w-4 animate animate-pulse my-auto" />

                
            )}
</CardTitle>
                <div className="flex items-center gap-2 mt-1">
                    <Badge variant="outline">{client.organization.name}</Badge>
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
