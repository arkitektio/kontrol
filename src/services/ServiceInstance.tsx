import { useParams, Link } from "react-router-dom"
import { useGetServiceInstanceQuery } from "@/graphql/queries/service_instance.generated"
import { Card, CardContent, CardHeader } from "../components/ui/card"
import { Badge } from "../components/ui/badge"
import { Button } from "../components/ui/button"
import { Separator } from "../components/ui/separator"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../components/ui/tooltip"
import { Plus, ArrowRight } from "lucide-react"
import { Command } from "../components/Command"
import { CreateAliasDialog } from "../aliases/CreateAliasDialog"

import { QueryError, ResourceNotFound } from "@/components/status"

import { DetailPageSkeleton } from "@/components/skeletons"
import { AdminOnly } from "../components/AdminOnly"

export default function ServiceInstance() {
  const params = useParams<{ id: string; instanceId?: string }>()
  const id = params.instanceId || params.id
  const { data, loading, error } = useGetServiceInstanceQuery({
    variables: { id: id! },
    skip: !id,
  })

  if (loading) return <DetailPageSkeleton sections={3} />
  if (error) return <QueryError error={error} resource="instance" />
  if (!data?.serviceInstance) return <ResourceNotFound resource="instance" id={id} />

  const instance = data.serviceInstance

  // There is deliberately no delete here: lok has no mutation to delete a service
  // instance (instances are registered by their hub).

  return (
    <div className="container mx-auto py-10 relative min-h-screen">

        <div className="relative z-10 w-full max-w-3xl space-y-6">
         <CardHeader className="flex flex-row items-center justify-between gap-4 border-b">
              <div className="flex items-center gap-4">
                  
                <div>
                  <h1 className="text-2xl leading-none font-semibold">{instance.identifier}</h1>
                  <p className="text-muted-foreground text-sm font-mono text-xs mt-1">{instance.release.service.identifier} v{instance.release.version}</p>
                </div>
              </div>
              <div className="flex gap-2">
<AdminOnly orgId={instance.organization?.id} note="Only organization admins can add an alias.">
                <CreateAliasDialog
                  instanceId={instance.id}
                  trigger={
                    <Button variant="outline" size="sm">
                      <Plus className="h-4 w-4 mr-2" />
                      Alias
                    </Button>
                  }
                />
                </AdminOnly>
              </div>
        </CardHeader>
        
        <div className="grid grid-cols-1 gap-6">
             <div className="space-y-4">
                 <h3 className="font-semibold text-lg">Aliases</h3>
                  {(instance.aliases && instance.aliases.length > 0) ? (
                        <div className="grid gap-2">
                            {instance.aliases.map(alias => (
                                <Link to={`/instance-aliases/${alias.id}`} key={alias.id}>
                                    <div className="p-3 border rounded-md hover:bg-muted/50 transition-colors flex items-center justify-between">
                                          <div className="flex flex-col">
                                                <code className="text-sm">
                                                    {alias.ssl ? 'https://' : 'http://'}
                                                    {alias.host || alias.layer?.name}
                                                    {alias.port ? `:${alias.port}` : ''}
                                                    {alias.path || ''}
                                                </code>
                                          </div>
                                          <Badge variant="outline" className="text-xs">{alias.kind}</Badge>
                                          <Badge variant="secondary" className="text-xs">{alias.scope || 'No Scope'}</Badge>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    ) : (
                        <div className="text-muted-foreground text-sm italic">No aliases configured.</div>
                    )}
            </div>

            <div className="space-y-4">
                 <h3 className="font-semibold text-lg">Roles</h3>
                 {(instance.roles && instance.roles.length > 0) ? (
                    <TooltipProvider>
                      <div className="flex flex-wrap gap-2">
                          {instance.roles.map(role => (
                              <Tooltip key={role.id}>
                                <TooltipTrigger asChild>
                                  <Link to={`/organization/${instance.organization.id}/roles/${role.id}`}>
                                    <Badge variant="secondary" className="cursor-pointer hover:opacity-80 transition-opacity">
                                        {role.identifier}
                                    </Badge>
                                  </Link>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>{role.description}</p>
                                </TooltipContent>
                              </Tooltip>
                          ))}
                      </div>
                    </TooltipProvider>
                 ) : (
                    <div className="text-muted-foreground text-sm italic">No roles assigned.</div>
                 )}
            </div>

             <div className="space-y-4">
                 <h3 className="font-semibold text-lg">Scopes</h3>
                 {(instance.scopes && instance.scopes.length > 0) ? (
                     <TooltipProvider>
                       <div className="flex flex-wrap gap-2">
                          {instance.scopes.map(scope => (
                              <Tooltip key={scope.id}>
                                <TooltipTrigger asChild>
                                  <Link to={`/organization/${instance.organization.id}/scopes/${scope.id}`}>
                                    <Badge variant="outline" className="cursor-pointer hover:opacity-80 transition-opacity">
                                        {scope.identifier}
                                    </Badge>
                                  </Link>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>{scope.description}</p>
                                </TooltipContent>
                              </Tooltip>
                          ))}
                      </div>
                     </TooltipProvider>
                 ) : (
                    <div className="text-muted-foreground text-sm italic">No scopes assigned.</div>
                 )}
            </div>
            
             <div className="space-y-4">
                 <h3 className="font-semibold text-lg">Details</h3>
                 <Card>
                    <CardContent className="pt-6 grid gap-2">
                        <div className="flex justify-between items-center gap-4">
                            <span className="font-medium">ID</span>
                            <Command label="Copy id">{instance.id}</Command>
                        </div>
                        <div className="flex justify-between">
                            <span className="font-medium">Version</span>
                             <Badge variant="secondary" className="font-mono text-xs">{instance.release.version}</Badge>
                        </div>
                         {instance.device && (
                            <div className="flex justify-between items-center">
                                <span className="font-medium">Device</span>
                                <Link to={`/organization/${instance.organization.id}/devices/${instance.device.id}`} className="flex items-center gap-1 text-sm text-primary hover:underline">
                                    {instance.device.name}
                                    <ArrowRight className="h-3 w-3" />
                                </Link>
                            </div>
                         )}
                         <Separator className="my-2" />
                         <div className="flex justify-between items-center">
                             <span className="font-medium">Service Info</span>
                             <Link to={instance.release.service.id ? `/services/${instance.release.service.id}` : '#'} className="text-sm text-muted-foreground hover:underline">
                                {instance.release.service.name}
                             </Link>
                         </div>
                    </CardContent>
                 </Card>
            </div>
        </div>
      </div>
    </div>
  )
}
