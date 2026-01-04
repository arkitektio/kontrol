import { useParams, Link } from "react-router-dom"
import { useGetServiceInstanceQuery } from "../api/graphql"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar"
import { Badge } from "../components/ui/badge"
import { Button } from "../components/ui/button"
import { ServiceInstanceMappingFlow } from "./ServiceInstanceMappingFlow"
import { Separator } from "../components/ui/separator"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../components/ui/alert-dialog"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import { Switch } from "../components/ui/switch"
import { Trash2, Plus } from "lucide-react"
import { useState } from "react"
import { AliasChallenge } from "./AliasChallenge"

export default function ServiceInstance() {
  const { id } = useParams<{ id: string }>()
  const { data, loading, error } = useGetServiceInstanceQuery({
    variables: { id: id! },
    skip: !id,
  })
  const [createAliasOpen, setCreateAliasOpen] = useState(false)
  const [aliasHost, setAliasHost] = useState("")
  const [aliasPort, setAliasPort] = useState("")
  const [aliasPath, setAliasPath] = useState("")
  const [aliasSsl, setAliasSsl] = useState(true)
  const [aliasKind, setAliasKind] = useState("")

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>
  if (!data?.serviceInstance) return <div>Instance not found</div>

  const instance = data.serviceInstance

  const handleDelete = () => {
    // TODO: Implement delete mutation
    console.log("Delete instance:", id)
  }

  const handleCreateAlias = () => {
    // TODO: Implement create alias mutation
    console.log("Create alias:", { aliasHost, aliasPort, aliasPath, aliasSsl, aliasKind })
    setCreateAliasOpen(false)
  }

  return (
    <div className="container mx-auto py-10 relative min-h-screen">
        {/* Background Flow */}
        <div className="fixed top-0 right-0 h-screen w-[40vw] z-0 pointer-events-none opacity-100">
             <div className="absolute inset-0 bg-gradient-to-r from-background to-transparent z-10" />
             <ServiceInstanceMappingFlow mappings={instance.mappings} />
        </div>

        <div className="relative z-10 max-w-2xl space-y-6">
            <CardHeader className="flex flex-row items-center gap-4">
                <Avatar className="h-16 w-16">
                    <AvatarImage src={instance.logo?.presignedUrl || undefined} />
                    <AvatarFallback>{instance.identifier.substring(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
              <div className="flex-1">
                <CardTitle className="text-2xl">{instance.identifier}</CardTitle>
                <CardDescription className="font-mono text-sm">{instance.identifier}</CardDescription>
                <div className="flex items-center gap-2 mt-2">
                  <Badge variant="outline">{instance.release.service.identifier}</Badge>
                  <Badge variant="outline">v{instance.release.version}</Badge>
                </div>
              </div>
              <div className="flex gap-2">
                <Dialog open={createAliasOpen} onOpenChange={setCreateAliasOpen}>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="icon">
                      <Plus className="h-4 w-4" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Create Alias</DialogTitle>
                      <DialogDescription>
                        Add a new alias for this service instance.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid gap-2">
                        <Label htmlFor="kind">Kind</Label>
                        <Input
                          id="kind"
                          value={aliasKind}
                          onChange={(e) => setAliasKind(e.target.value)}
                          placeholder="e.g., primary, backup"
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="host">Host</Label>
                        <Input
                          id="host"
                          value={aliasHost}
                          onChange={(e) => setAliasHost(e.target.value)}
                          placeholder="example.com"
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="port">Port (optional)</Label>
                        <Input
                          id="port"
                          type="number"
                          value={aliasPort}
                          onChange={(e) => setAliasPort(e.target.value)}
                          placeholder="8080"
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="path">Path (optional)</Label>
                        <Input
                          id="path"
                          value={aliasPath}
                          onChange={(e) => setAliasPath(e.target.value)}
                          placeholder="/api/v1"
                        />
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch
                          id="ssl"
                          checked={aliasSsl}
                          onCheckedChange={setAliasSsl}
                        />
                        <Label htmlFor="ssl">Use SSL (HTTPS)</Label>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setCreateAliasOpen(false)}>
                        Cancel
                      </Button>
                      <Button onClick={handleCreateAlias}>Create</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>

                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="destructive" size="icon">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Delete Service Instance</AlertDialogTitle>
                      <AlertDialogDescription>
                        Are you sure you want to delete this service instance? This action cannot be undone.
                        All associated aliases and mappings will be removed.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                        Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
                <div>
                    <h3 className="font-semibold mb-2 text-sm text-muted-foreground uppercase tracking-wide">Provides Service</h3>
                    <Link to={`/service-releases/${instance.release.id}`}>
                        <div className="p-3 border rounded-md hover:bg-muted/50 transition-colors flex items-center gap-3">
                            <Avatar className="h-10 w-10">
                                <AvatarImage src={instance.release.service.logo?.presignedUrl || undefined} />
                                <AvatarFallback>{instance.release.service.identifier.substring(0, 2).toUpperCase()}</AvatarFallback>
                            </Avatar>
                            <div>
                                <div className="font-medium">{instance.release.service.name}</div>
                                <div className="text-xs text-muted-foreground font-mono">{instance.release.service.identifier}</div>
                                <div className="text-xs text-muted-foreground">v{instance.release.version}</div>
                            </div>
                        </div>
                    </Link>
                </div>

                {(instance.aliases && instance.aliases.length > 0) && (
                    <>
                        <Separator />
                        <div>
                            <h3 className="font-semibold mb-3 text-sm text-muted-foreground uppercase tracking-wide">Aliases</h3>
                            <div className="grid gap-2">
                                {instance.aliases.map(alias => (
                                    <Link to={`/instance-aliases/${alias.id}`} key={alias.id} className="p-3 border rounded-md space-y-2">
                                        <div className="flex items-center gap-2">
                                            <Badge variant="outline" className="text-xs">{alias.kind}</Badge>
                                            <code className="text-xs">
                                                {alias.ssl ? 'https://' : 'http://'}
                                                {alias.host || alias.layer?.name}
                                                {alias.port ? `:${alias.port}` : ''}
                                                {alias.path || ''}
                                            </code>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </>
                )}
            </CardContent>
        </div>
    </div>
  )
}
