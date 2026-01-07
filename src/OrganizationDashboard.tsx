import { useParams, Link } from "react-router-dom"
import { useSidebarOrganizationQuery } from "./api/graphql"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "./components/ui/card"
import { Button } from "./components/ui/button"
import { ArrowRight, Terminal, Server, Boxes } from "lucide-react"
import { ClientCard } from "./components/ClientCard"
import { ServiceInstanceCard } from "./components/ServiceInstanceCard"

export default function OrganizationDashboard() {
  const { orgId } = useParams<{ orgId: string }>()
  
  const { data, loading, error } = useSidebarOrganizationQuery({
    variables: { id: orgId! },
    skip: !orgId,
  })

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>
  if (!data?.organization) return <div>Organization not found</div>

  const org = data.organization
  const latestClients = org.latestClients || []
  const latestServices = org.latestServices || []

  const hasClients = latestClients.length > 0
  const hasServices = latestServices.length > 0

  return (
    <div className="container mx-auto py-6 space-y-6">
        <h1 className="text-3xl font-bold tracking-tight">Managing {data.organization.name}</h1>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
             {/* Stats or Quick Links could go here */}
        </div>
        
        <div className="grid gap-6 md:grid-cols-2">
            <div>
                <h2 className="text-xl font-semibold mb-4">Clients</h2>
                {hasClients ? (
                    <div className="space-y-4">
                        {latestClients.map(client => (
                            <ClientCard key={client.id} client={client} />
                        ))}
                         <Button variant="outline" className="w-full" asChild>
                            <Link to={`/organization/${orgId}/clients`}>View All Clients</Link>
                        </Button>
                    </div>
                ) : (
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Terminal className="w-5 h-5" />
                                Connect your first Client
                            </CardTitle>
                            <CardDescription>
                                Clients are applications or scripts that connect to Kontrol.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <p className="text-sm">
                                To connect a python client, install the <code>arkitekt</code> library:
                            </p>
                            <div className="bg-muted p-3 rounded-md font-mono text-sm">
                                pip install arkitekt
                            </div>
                        </CardContent>
                    </Card>
                )}
            </div>

            <div>
                <h2 className="text-xl font-semibold mb-4">Services</h2>
                {hasServices ? (
                    <div className="space-y-4 flex flex-col gap-2">
                         {latestServices.map(service => (
                            <ServiceInstanceCard key={service.id} instance={service} />
                        ))}
                        <Button variant="outline" className="w-full" asChild>
                            <Link to={`/organization/${orgId}/service-instances`}>View All Services</Link>
                        </Button>
                    </div>
                ) : (
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                 <Boxes className="w-5 h-5" />
                                Deploy a Service
                            </CardTitle>
                            <CardDescription>
                                Services provide functionality to your clients.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                             <p className="text-sm text-muted-foreground">
                                You can deploy services (apps) to provide specific capabilities depending on your deployment.
                             </p>
                             <p className="text-sm font-medium">
                                To inspect available composition backbones for deploying apps, please consult your administrator or documentation.
                             </p>
                        </CardContent>
                    </Card>
                )}
            </div>
        </div>
    </div>
  )
}
