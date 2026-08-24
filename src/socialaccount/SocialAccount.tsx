import { useGetSocialAccountQuery } from "@/graphql/queries/social_account.generated"
import { useParams } from "react-router-dom"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

import { QueryError, ResourceNotFound } from "@/components/status"

import { SettingsStackSkeleton } from "@/components/skeletons"

export default function SocialAccount() {
    const { id } = useParams<{ id: string }>()
    const { data, loading, error } = useGetSocialAccountQuery({
        variables: { id: id! },
        skip: !id
    })

    if (loading) return <SettingsStackSkeleton cards={2} rows={3} />
    if (error) return <QueryError error={error} resource="social account" />
    if (!data?.socialAccount) return <ResourceNotFound resource="social account" id={id} />

    const account = data.socialAccount

    return (
        <div className="flex flex-col gap-4 p-4">
             <div className="flex items-center justify-between">
                <div className="grid gap-1">
                    <h1 className="text-2xl font-bold tracking-tight">{account.provider} Account</h1>
                    <p className="text-muted-foreground">
                        Details about your connected {account.provider} account. 
                    </p>
                </div>
            </div>
            
            <Card>
                <CardHeader>
                    <CardTitle>Details</CardTitle>
                    <CardDescription>ID: {account.id}</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-2">
                        <div className="flex items-center gap-2">
                            <Badge variant="outline">{account.__typename}</Badge>
                        </div>
                        
                        {account.__typename === "ManagementOrcidAccount" && (
                            <div className="mt-4 border rounded p-3 bg-muted/50">
                                <h3 className="font-semibold mb-2">ORCID Details</h3>
                                {account.identifier?.uri && <p><strong>URI:</strong> {account.identifier.uri}</p>}
                                {account.identifier?.path && <p><strong>Path:</strong> {account.identifier.path}</p>}
                                {account.identifier?.host && <p><strong>Host:</strong> {account.identifier.host}</p>}
                            </div>
                        )}
                         {/* Add other provider details as needed */}
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
