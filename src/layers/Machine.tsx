import { useNavigate, useParams } from "react-router-dom"
import { useDetailMachineQuery } from "../api/graphql"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../components/ui/card"
import { Badge } from "../components/ui/badge"
import { Skeleton } from "../components/ui/skeleton"
import { Monitor, Calendar, Tag, Activity } from "lucide-react"

export default function Machine() {
  const { orgId, layerId, id } = useParams<{ orgId: string; layerId: string; id: string }>()
  
  const { data, loading, error } = useDetailMachineQuery({
    variables: { 
      id: id! 
    },
    skip: !id,
  })

  if (loading) return (
    <div className="container mx-auto py-10 space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Skeleton className="h-16 w-16 rounded-lg" />
            <div className="space-y-1">
              <Skeleton className="h-8 w-64" />
              <Skeleton className="h-4 w-48" />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card className="p-4 flex items-center gap-4">
              <Skeleton className="h-5 w-5 rounded-full" />
              <div className="space-y-1">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-4 w-32" />
              </div>
            </Card>
            <Card className="p-4 flex flex-col gap-2">
               <div className="flex items-center gap-4 mb-2">
                 <Skeleton className="h-5 w-5 rounded-full" />
                 <Skeleton className="h-4 w-10" />
               </div>
               <div className="flex flex-wrap gap-2">
                 <Skeleton className="h-5 w-16" />
                 <Skeleton className="h-5 w-20" />
                 <Skeleton className="h-5 w-14" />
               </div>
            </Card>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  if (error) return <div className="p-4">Error: {error.message}</div>
  if (!data?.machine) return <div className="p-4">Machine not found</div>

  const machine = data.machine

  return (
    <div className="container mx-auto py-10 space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-muted">
                <Monitor className="h-8 w-8" />
            </div>
            <div className="space-y-1">
              <CardTitle className="text-2xl flex items-center gap-2">
                {machine.name}
                <Badge variant={machine.connected ? "default" : "secondary"}>
                    {machine.connected ? "Connected" : "Disconnected"}
                </Badge>
                {machine.ephemeral && (
                    <Badge variant="outline">Ephemeral</Badge>
                )}
              </CardTitle>
              <CardDescription>
                {machine.ipv4} • {machine.ipv6}
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
             <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                 <Card className="p-4 flex items-center gap-4">
                     <Activity className="h-5 w-5 text-muted-foreground" />
                     <div className="space-y-1">
                         <p className="text-sm font-medium leading-none">Last Seen</p>
                         <p className="text-sm text-muted-foreground">
                             {machine.lastSeen ? new Date(machine.lastSeen).toLocaleString() : "Never"}
                         </p>
                     </div>
                 </Card>
                 {machine.tags && machine.tags.length > 0 && (
                     <Card className="p-4 flex md:col-span-2 lg:col-span-2 flex-col gap-2">
                         <div className="flex items-center gap-4 mb-2">
                             <Tag className="h-5 w-5 text-muted-foreground" />
                             <p className="text-sm font-medium leading-none">Tags</p>
                         </div>
                         <div className="flex flex-wrap gap-2">
                             {machine.tags.map(tag => (
                                 <Badge key={tag} variant="secondary">{tag}</Badge>
                             ))}
                         </div>
                     </Card>
                 )}
             </div>
        </CardContent>
      </Card>
    </div>
  )
}
