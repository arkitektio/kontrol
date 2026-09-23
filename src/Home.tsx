import { Link } from "react-router-dom"
import { useMeQuery } from "@/graphql/queries/me.generated"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./components/ui/card"
import { Button } from "./components/ui/button"
import { ArrowRight, Building, Plus, User } from "lucide-react"
import { LoadingScreen } from "./components/LoadingScreen"
import { QueryError } from "@/components/status"
import { lazy, Suspense, useState } from "react"

// Pulls in react-hook-form + zod; only needed once the user opens it.
const CreateOrganizationDialog = lazy(() =>
    import("./components/CreateOrganizationDialog").then((m) => ({ default: m.CreateOrganizationDialog })),
)

/**
 * Where signing in lands you: every organization you belong to, and a way to
 * make another one.
 *
 * This used to bounce straight into your "active" org and only render for
 * people with no memberships, which meant anyone in more than one org had no
 * screen that showed all of them — switching was a sidebar-only affair. The
 * landing page now forwards signed-in visitors here, so this is the one place
 * that has to answer "what do I have access to?".
 */
export default function Home() {
    const [createOrgOpen, setCreateOrgOpen] = useState(false)
    const [dialogMounted, setDialogMounted] = useState(false)
    const openCreateOrg = () => { setDialogMounted(true); setCreateOrgOpen(true) }

    const { data, loading, error } = useMeQuery()

    if (loading) return <LoadingScreen />
    if (error) return <QueryError error={error} resource="profile" />

    const user = data?.me
    const memberships = user?.memberships ?? []

    const createDialog = dialogMounted && (
        <Suspense fallback={null}>
            <CreateOrganizationDialog open={createOrgOpen} onOpenChange={setCreateOrgOpen} />
        </Suspense>
    )

    return (
        <div className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-8 p-8">
            <div className="flex flex-wrap items-end justify-between gap-4">
                <div className="flex flex-col gap-2">
                    <h1 className="text-4xl font-bold tracking-tight">
                        {user?.firstName || user?.username}
                    </h1>
                    <p className="text-muted-foreground text-xl">
                        {memberships.length === 0
                            ? "You're not a member of any organization yet."
                            : "Your organizations"}
                    </p>
                </div>

                {memberships.length > 0 && (
                    <Button variant="outline" onClick={openCreateOrg}>
                        <Plus className="mr-2 h-4 w-4" /> New organization
                    </Button>
                )}
            </div>

            {memberships.length === 0 ? (
                <Card className="bg-primary/5 border-primary/20">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Building className="text-primary h-5 w-5" />
                            Create your organization
                        </CardTitle>
                        <CardDescription>
                            Organizations hold your instruments, services and the people you work
                            with. You need one to get started.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Button onClick={openCreateOrg}>
                            <Plus className="mr-2 h-4 w-4" /> Create organization
                        </Button>
                        <p className="text-muted-foreground mt-4 text-sm">
                            Joining someone else's organization? Open the invite link they sent you.
                        </p>
                    </CardContent>
                </Card>
            ) : (
                <div className="grid gap-4 sm:grid-cols-2">
                    {memberships.map((m) => (
                        <Link key={m.organization.id} to={`/organization/${m.organization.id}`}>
                            <Card className="hover:border-primary/40 h-full transition-colors">
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <Building className="text-muted-foreground h-5 w-5 shrink-0" />
                                        <span className="truncate">{m.organization.name || m.organization.slug}</span>
                                        <ArrowRight className="text-muted-foreground ml-auto h-4 w-4 shrink-0" />
                                    </CardTitle>
                                    <CardDescription>@{m.organization.slug}</CardDescription>
                                </CardHeader>
                            </Card>
                        </Link>
                    ))}
                </div>
            )}

            {(!user?.firstName || !user?.lastName) && (
                <Card>
                    <CardHeader>
                        <div className="flex items-center gap-4">
                            <div className="bg-muted rounded-full p-2">
                                <User className="h-6 w-6" />
                            </div>
                            <div>
                                <CardTitle>Complete your profile</CardTitle>
                                <CardDescription>
                                    Add your name so others can identify you.
                                </CardDescription>
                            </div>
                            <Button className="ml-auto" variant="outline" asChild>
                                <Link to="/profile">Edit profile</Link>
                            </Button>
                        </div>
                    </CardHeader>
                </Card>
            )}

            {createDialog}
        </div>
    )
}
