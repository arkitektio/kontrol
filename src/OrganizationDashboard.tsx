import { useParams, Link } from "react-router-dom"
import { useSidebarOrganizationQuery, useListKommunityPartnerQuery } from "./api/graphql"
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

  const { data: partnersData } = useListKommunityPartnerQuery({
    variables: { pagination: { limit: 4 } }
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

        {!hasServices && (
           <div className="space-y-6">
               <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-8 flex flex-col items-center text-center space-y-4 bg-gradient-to-br from-primary/5 to-secondary/5">
                    <Boxes className="w-12 h-12 text-primary opacity-80" />
                    <h2 className="text-2xl font-bold tracking-tight">No Active Compositions? No Problem.</h2>
                    <p className="text-muted-foreground max-w-[600px]">
                        To get started quickly, check out our Kommunity Partners. They offer pre-configured environments and services to help you instantiate your first composition and get up and running in no time.
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full mt-6 text-left">
                        {partnersData?.kommunityPartners?.map(partner => (
                             <Card key={partner.id} className="flex flex-col bg-background overflow-hidden hover:shadow-md transition-shadow">
                                <CardHeader className="flex-row gap-4 items-center space-y-0">
                                     <div className="w-12 h-12 flex-shrink-0 bg-muted/50 rounded-lg p-2 flex items-center justify-center border">
                                        {partner.logoUrl ? (
                                            <img src={partner.logoUrl} alt={partner.name} className="w-full h-full object-contain" />
                                        ) : (
                                            <span className="text-xl font-bold">{partner.name.charAt(0)}</span>
                                        )}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <CardTitle className="text-base truncate" title={partner.name}>{partner.name}</CardTitle>
                                         <p className="text-xs text-muted-foreground line-clamp-2 mt-1" title={partner.description || ""}>
                                            {partner.description}
                                        </p>
                                    </div>
                                </CardHeader>
                                <CardContent className="pt-0 mt-auto">
                                    <Button asChild size="sm" className="w-full gap-2">
                                        <a href={partner.authUrl} target="_blank" rel="noopener noreferrer">
                                            Connect <ArrowRight className="w-3 h-3" />
                                        </a>
                                    </Button>
                                </CardContent>
                            </Card>
                        ))}
                    </div>

                    <Button asChild variant="outline" className="mt-4">
                        <Link to="/partners">
                            View All Partners <ArrowRight className="ml-2 w-4 h-4" />
                        </Link>
                    </Button>
               </div>
               
               <Card className="border-dashed bg-muted/30">
                   <CardHeader>
                       <CardTitle className="flex items-center gap-2">
                           <Server className="w-5 h-5" />
                           My Data is Mine
                       </CardTitle>
                       <CardDescription>
                           Prefer to keep everything on your own infrastructure? You can self-host your own Arkitekt instance.
                       </CardDescription>
                   </CardHeader>
                   <CardContent className="space-y-4">
                       <p className="text-sm text-muted-foreground">
                           Learn how to set up your own server and connect it to your organization.
                       </p>
                       <Button variant="outline" asChild>
                           <a href="https://arkitekt.live/docs/hosting" target="_blank" rel="noopener noreferrer">
                               Read the Self-Hosting Guide
                           </a>
                       </Button>
                   </CardContent>
               </Card>
           </div>
        )}
        
        <div className="flex flex-col gap-6">

            <div className="space-y-4">
                <h2 className="text-xl font-semibold">Services</h2>
                {hasServices ? (
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                         {latestServices.map(service => (
                            <ServiceInstanceCard key={service.id} instance={service} />
                        ))}
                      </div>
                      <Button variant="outline" asChild>
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

            <div className="space-y-4">
                <h2 className="text-xl font-semibold flex items-center justify-between">
                    <span>Kommunity Partners</span>
                    <Button variant="link" asChild className="p-0 h-auto font-normal text-muted-foreground hover:text-foreground">
                        <Link to="/partners">View all</Link>
                    </Button>
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {partnersData?.kommunityPartners?.map(partner => (
                         <Card key={partner.id} className="flex flex-col">
                            <CardHeader className="flex-row gap-4 items-center space-y-0 pb-2">
                                {partner.logoUrl && <img src={partner.logoUrl} alt={partner.name} className="w-10 h-10 object-contain" />}
                                <CardTitle className="text-base">{partner.name}</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-2 flex-1 flex flex-col justify-end pt-0">
                                <Button asChild size="sm" variant="secondary" className="w-full mt-2">
                                    <Link to={`/partners/${partner.id}`}>Connect</Link>
                                </Button>
                            </CardContent>
                        </Card>
                    ))}
                     {(!partnersData?.kommunityPartners || partnersData.kommunityPartners.length === 0) && (
                        <div className="col-span-full p-4 border border-dashed rounded-lg text-center text-muted-foreground">
                            No partners available at the moment.
                        </div>
                    )}
                </div>
            </div>
        </div>
    </div>
  )
}
