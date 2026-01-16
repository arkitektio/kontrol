import { useParams } from "react-router-dom"
import { useGetAuthKeyQuery } from "../api/graphql"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../components/ui/card"
import { Badge } from "../components/ui/badge"
import { Skeleton } from "../components/ui/skeleton"
import { Key, Tag, Calendar, User } from "lucide-react"

export default function AuthKey() {
  const { id } = useParams<{ id: string }>()
  
  const { data, loading, error } = useGetAuthKeyQuery({
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
             <Skeleton className="h-24 w-full" />
             <Skeleton className="h-24 w-full" />
             <Skeleton className="h-24 w-full" />
          </div>
        </CardContent>
      </Card>
    </div>
  )

  if (error) return <div className="p-4">Error: {error.message}</div>
  if (!data?.ionscaleAuthKey) return <div className="p-4">Auth Key not found</div>

  const authKey = data.ionscaleAuthKey

  return (
    <div className="container mx-auto py-10 space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-muted">
                <Key className="h-8 w-8" />
            </div>
            <div className="space-y-1">
              <CardTitle className="text-2xl flex items-center gap-2">
                {authKey.key}
                {authKey.ephemeral && (
                    <Badge variant="outline">Ephemeral</Badge>
                )}
              </CardTitle>
              <CardDescription>
                 Created at {authKey.createdAt ? new Date(authKey.createdAt).toLocaleString() : "Unknown"}
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
             <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                 <Card className="p-4 flex items-center gap-4">
                     <User className="h-5 w-5 text-muted-foreground" />
                     <div className="space-y-1">
                         <p className="text-sm font-medium leading-none">Creator</p>
                         <p className="text-sm text-muted-foreground">
                             {authKey.creator?.email || "Unknown"}
                         </p>
                     </div>
                 </Card>
                 {authKey.tags && authKey.tags.length > 0 && (
                     <Card className="p-4 flex md:col-span-2 lg:col-span-2 flex-col gap-2">
                         <div className="flex items-center gap-4 mb-2">
                             <Tag className="h-5 w-5 text-muted-foreground" />
                             <p className="text-sm font-medium leading-none">Tags</p>
                         </div>
                         <div className="flex flex-wrap gap-2">
                             {authKey.tags.map((tag: any) => (
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
