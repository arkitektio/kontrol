import { Link, Navigate } from "react-router-dom"
import { useClientsQuery, useMeQuery, Ordering } from "./api/graphql"
import { ClientLabel } from "@/components/ClientLabel"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "./components/ui/card"
import { Button } from "./components/ui/button"
import { AlertCircle, CheckCircle2, User, Building, ArrowRight, Plus } from "lucide-react"
import { CreateOrganizationDialog } from "./components/CreateOrganizationDialog"
import { useActiveOrganization } from "./hooks/useActiveOrganization"
import { LoadingScreen } from "./components/LoadingScreen"
import { useState } from "react"

export default function Home() {
    const [createOrgOpen, setCreateOrgOpen] = useState(false)

    // Land authenticated users in their active organization — the org view is
    // the app's home. Only users with no memberships stay on this page.
    const { activeOrgId, loading: orgsLoading } = useActiveOrganization()

    // Parallel queries
    const { data: userData, loading: userLoading, error: userError } = useMeQuery()
    const { data: clientsData, loading: clientsLoading, error: clientsError } = useClientsQuery({
        variables: {
            filters: { functional: false },
            ordering: [{ createdAt: Ordering.Desc }],
            pagination: { limit: 5 }
        }
    })

    if (userLoading || clientsLoading || orgsLoading) return <LoadingScreen />
    if (userError) return <div className="p-8">Error loading profile: {userError.message}</div>

    // Have an org? Go straight to it. Otherwise fall through to the create-org prompt.
    if (activeOrgId) return <Navigate to={`/organization/${activeOrgId}`} replace />

    const user = userData?.me
    const issues = clientsData?.clients || []
    const hasIssues = issues.length > 0
    const hasOrgs = (user?.memberships?.length || 0) > 0
    
    // Calculate greeting based on time of day
    const hour = new Date().getHours()
    let greeting = "Good evening"
    if (hour < 12) greeting = "Good morning"
    else if (hour < 18) greeting = "Good afternoon"

    return (
        <div className="flex flex-1 flex-col gap-8 p-8 max-w-5xl mx-auto w-full">
            {/* Greeting Section */}
            <div className="flex flex-col gap-2">
                <h1 className="text-4xl font-bold tracking-tight">
                    {greeting}, {user?.firstName || user?.username}
                </h1>
                <p className="text-xl text-muted-foreground">
                    Here's what's happening with your deployments today.
                </p>
            </div>

            {/* Status Section */}
            <div className="grid gap-6 md:grid-cols-2">
                <Card className={hasIssues ? "border-destructive/20 bg-destructive/5" : "border-green-500/20 bg-green-500/5"}>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            {hasIssues ? (
                                <>
                                    <AlertCircle className="text-destructive h-5 w-5" />
                                    <span className="text-destructive">Attention Needed</span>
                                </>
                            ) : (
                                <>
                                    <CheckCircle2 className="text-green-500 h-5 w-5" />
                                    <span className="text-green-600">All Systems Operational</span>
                                </>
                            )}
                        </CardTitle>
                        <CardDescription>
                            {hasIssues 
                                ? `${issues.length} clients are reported as non-functional.` 
                                : "All your connected clients are functioning correctly."}
                        </CardDescription>
                    </CardHeader>
                    {hasIssues && (
                        <CardContent>
                             <div className="space-y-2">
                                {issues.slice(0, 3).map(client => (
                                    <div key={client.id} className="flex items-center justify-between p-2 bg-background/50 rounded-md border">
                                        <div className="flex items-center gap-2">
                                            <div className="w-2 h-2 rounded-full bg-destructive animate-pulse" />
                                            <ClientLabel client={client} className="font-medium text-sm" />
                                        </div>
                                        <Link to={`/organization/${client.organization.id}/clients/${client.id}`} className="text-xs text-muted-foreground hover:underline">
                                            View
                                        </Link>
                                    </div>
                                ))}
                                {issues.length > 3 && (
                                    <Link to="/clients?status=non-functional" className="text-xs text-muted-foreground hover:underline block pt-2">
                                        + {issues.length - 3} more issues
                                    </Link>
                                )}
                             </div>
                        </CardContent>
                    )}
                </Card>

                {/* Quick Actions / Getting Started */}
                <div className="flex flex-col gap-4">
                     {!hasOrgs ? (
                        <Card className="bg-primary/5 border-primary/20">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Building className="h-5 w-5 text-primary" />
                                    Create your Organization
                                </CardTitle>
                                <CardDescription>
                                    Organizations allow you to manage teams, projects and deployments.
                                </CardDescription>
                            </CardHeader>
                            <CardFooter>
                                <Button className="w-full" onClick={() => setCreateOrgOpen(true)}>
                                    <Plus className="mr-2 h-4 w-4" /> Create Organization
                                </Button>
                                <CreateOrganizationDialog open={createOrgOpen} onOpenChange={setCreateOrgOpen} />
                            </CardFooter>
                        </Card>
                     ) : (
                         <Card>
                            <CardHeader>
                                <CardTitle>Your Organizations</CardTitle>
                                <CardDescription>Accessed recently</CardDescription>
                            </CardHeader>
                            <CardContent className="grid gap-2">
                                {user?.memberships.slice(0, 3).map(m => (
                                    <Link key={m.organization.id} to={`/organization/${m.organization.id}`}>
                                        <Button variant="outline" className="w-full justify-start h-auto py-3">
                                            <Building className="mr-2 h-4 w-4 text-muted-foreground" />
                                            <div className="flex flex-col items-start">
                                                <span className="font-semibold">{m.organization.name}</span>
                                                <span className="text-xs text-muted-foreground">@{m.organization.slug}</span>
                                            </div>
                                            <ArrowRight className="ml-auto h-4 w-4 text-muted-foreground" />
                                        </Button>
                                    </Link>
                                ))}
                            </CardContent>
                            <CardFooter>
                                 <Button variant="ghost" className="w-full" onClick={() => setCreateOrgOpen(true)}>
                                    <Plus className="mr-2 h-4 w-4" /> New Organization
                                </Button>
                                <CreateOrganizationDialog open={createOrgOpen} onOpenChange={setCreateOrgOpen} />
                            </CardFooter>
                         </Card>
                     )}
                </div>
            </div>

            {/* Profile Check */}
            {(!user?.firstName || !user?.lastName) && (
                 <Card>
                    <CardHeader>
                         <div className="flex items-center gap-4">
                            <div className="p-2 bg-muted rounded-full">
                                <User className="h-6 w-6" />
                            </div>
                            <div>
                                <CardTitle>Complete your Profile</CardTitle>
                                <CardDescription>
                                    Add your name and details to help others identify you.
                                </CardDescription>
                            </div>
                            <Button className="ml-auto" variant="outline" asChild>
                                <Link to="/profile">Edit Profile</Link>
                            </Button>
                         </div>
                    </CardHeader>
                 </Card>
            )}

        </div>
    )
}
