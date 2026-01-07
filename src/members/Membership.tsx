import { useParams } from "react-router-dom"
import { useGetMembershipQuery, useUpdateMembershipMutation } from "../api/graphql"
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "../components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar"
import { Badge } from "../components/ui/badge"
import { Button } from "../components/ui/button"
import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../components/ui/dialog"
import { Checkbox } from "../components/ui/checkbox"
import { Label } from "../components/ui/label"
import { Pencil } from "lucide-react"

export default function Membership() {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { orgId, id } = useParams<{ orgId: string, id: string }>()
    const [isEditing, setIsEditing] = useState(false)
    const [selectedRoles, setSelectedRoles] = useState<string[]>([])
    
    const { data, loading, error } = useGetMembershipQuery({
        variables: { id: id! }
    })

    const [updateMembership] = useUpdateMembershipMutation({
        refetchQueries: ["GetMembership"]
    })

    if (loading) return <div>Loading...</div>
    if (error) return <div>Error: {error.message}</div>
    if (!data?.membership) return <div>Membership not found</div>

    const membership = data.membership

    const handleEditClick = () => {
        setSelectedRoles(membership.roles.map(r => r.id))
        setIsEditing(true)
    }

    const handleSaveRoles = () => {
        updateMembership({
            variables: {
                input: {
                    id: membership.id,
                    roles: selectedRoles
                }
            }
        }).then(() => {
            setIsEditing(false)
        })
    }
    
    // @ts-expect-error roles is missing in organization type but present in query
    const availableRoles = membership.organization?.roles || []

    return (
        <div className="container mx-auto py-10 max-w-2xl">
            <Card>
                <CardHeader>
                    <div className="flex items-center gap-4">
                        <Avatar className="h-16 w-16">
                            <AvatarImage src={membership.user?.profile?.avatar?.presignedUrl || undefined} />
                            <AvatarFallback>{membership.user?.username.substring(0, 2).toUpperCase()}</AvatarFallback>
                        </Avatar>
                        <div>
                            <CardTitle className="text-2xl">{membership.user?.username}</CardTitle>
                            <CardDescription>{membership.user?.email}</CardDescription>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div>
                        <div className="flex items-center justify-between mb-2">
                            <h3 className="font-semibold">Roles</h3>
                            <Dialog open={isEditing} onOpenChange={setIsEditing}>
                                <DialogTrigger asChild>
                                    <Button variant="outline" size="sm" onClick={handleEditClick}>
                                        <Pencil className="w-4 h-4 mr-2" />
                                        Edit Roles
                                    </Button>
                                </DialogTrigger>
                                <DialogContent>
                                    <DialogHeader>
                                        <DialogTitle>Edit Roles</DialogTitle>
                                        <DialogDescription>
                                            Select the roles for {membership.user?.username}
                                        </DialogDescription>
                                    </DialogHeader>
                                    <div className="grid gap-4 py-4">
                                        {availableRoles.map((role: { id: string, identifier: string, description?: string | null }) => (
                                            <div className="flex items-start space-x-3 space-y-0" key={role.id}>
                                                <Checkbox 
                                                    id={role.id} 
                                                    checked={selectedRoles.includes(role.id)}
                                                    onCheckedChange={(checked) => {
                                                        if (checked) {
                                                            setSelectedRoles([...selectedRoles, role.id])
                                                        } else {
                                                            setSelectedRoles(selectedRoles.filter(id => id !== role.id))
                                                        }
                                                    }}
                                                />
                                                <div className="grid gap-1.5 leading-none">
                                                    <Label htmlFor={role.id} className="font-medium cursor-pointer">
                                                        {role.identifier}
                                                    </Label>
                                                    {role.description && (
                                                        <p className="text-sm text-muted-foreground">
                                                            {role.description}
                                                        </p>
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <DialogFooter>
                                        <Button variant="outline" onClick={() => setIsEditing(false)}>Cancel</Button>
                                        <Button onClick={handleSaveRoles}>Save Changes</Button>
                                    </DialogFooter>
                                </DialogContent>
                            </Dialog>
                        </div>
                        <div className="flex flex-wrap gap-2">
                             {membership.roles.map(r => (
                                 <Badge key={r.id} variant="secondary">
                                    {r.identifier}
                                 </Badge>
                             ))}
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
