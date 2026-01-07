import { useParams } from "react-router-dom"
import { useGetRoleQuery } from "../api/graphql"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { ServiceInstanceCard } from "../components/ServiceInstanceCard"

export default function Role() {
  const { id } = useParams<{ id: string }>()
  const { data, loading, error } = useGetRoleQuery({
    variables: { id: id! },
    skip: !id,
  })

  if (loading) return <div className="p-4">Loading...</div>
  if (error) return <div className="p-4">Error: {error.message}</div>
  if (!data?.role) return <div className="p-4">Role not found</div>

  const role = data.role

  return (
    <div className="container mx-auto py-10 space-y-6">
        <CardHeader className="flex flex-row items-center justify-between gap-4 border-b">
              <div>
                <CardTitle className="text-2xl">{role.identifier || "Unnamed Role"}</CardTitle>
                <div className="flex items-center gap-2 mt-1">
                    <span className="text-muted-foreground">{role.description}</span>
                </div>
              </div>
        </CardHeader>
        
        <div className="space-y-6">
            {role.creatingInstance && (
                <div className="space-y-4">
                     <h3 className="font-semibold text-lg">Creating Instance</h3>
                     <ServiceInstanceCard instance={role.creatingInstance} />
                </div>
            )}
            
             <div className="space-y-4">
                 <h3 className="font-semibold text-lg">Details</h3>
                 <Card>
                    <CardContent className="pt-6 grid gap-2">
                        <div className="flex justify-between">
                            <span className="font-medium">ID</span>
                            <span className="text-muted-foreground font-mono text-sm">{role.id}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="font-medium">Identifier</span>
                            <span className="text-muted-foreground font-mono text-sm">{role.identifier}</span>
                        </div>
                    </CardContent>
                 </Card>
            </div>

            {role.usedBy && role.usedBy.length > 0 && (
                <div className="space-y-4">
                     <h3 className="font-semibold text-lg">Used By Service Instances ({role.usedBy.length})</h3>
                     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {role.usedBy.map(instance => (
                            <ServiceInstanceCard key={instance.id} instance={instance} />
                        ))}
                     </div>
                </div>
            )}
        </div>
    </div>
  )
}
