import { useParams, Link } from "react-router-dom"
import { useState, useRef } from "react"
import { useOrganizationQuery } from "@/graphql/queries/organization.generated"
import { useUpdateOrganizationProfileMutation, useCreateOrganizationProfileMutation } from "@/graphql/mutations/organization_profile.generated"
import { useCancelInviteMutation } from "@/graphql/mutations/invite.generated"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "./components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "./components/ui/avatar"
import { Button } from "./components/ui/button"
import { Input } from "./components/ui/input"
import { Label } from "./components/ui/label"
import { CreateInviteDialog } from "./components/CreateInviteDialog"
import { useMediaUpload } from "./hooks/use-upload"
import { Pen, Camera, XCircle } from "lucide-react"
import { toast } from "sonner"

import { QueryError, ResourceNotFound } from "@/components/status"

import { ProfilePageSkeleton } from "@/components/skeletons"

export default function OrganizationProfile() {
  const { orgId } = useParams<{ orgId: string }>()
  const [inviteOpen, setInviteOpen] = useState(false)
  
  const upload = useMediaUpload()
  const [updateProfile] = useUpdateOrganizationProfileMutation()
  const [createProfile] = useCreateOrganizationProfileMutation()
  const [cancelInvite] = useCancelInviteMutation()

  const { data, loading, error, refetch } = useOrganizationQuery({
    variables: { id: orgId! },
    skip: !orgId,
  })

  // Local state for editing fields
  const [isEditing, setIsEditing] = useState(false)
  const [editName, setEditName] = useState("")

  const avatarInputRef = useRef<HTMLInputElement>(null)
  const bannerInputRef = useRef<HTMLInputElement>(null)

  if (loading) return <ProfilePageSkeleton />
  if (error) return <QueryError error={error} resource="organization" onRetry={() => refetch()} />
  if (!data?.organization) return <ResourceNotFound resource="organization" id={orgId} />

  const org = data.organization
  const profile = org.profile

  const handleCreateProfile = async () => {
    try {
        await createProfile({
            variables: {
                input: {
                    organization: org.id,
                    name: org.name,
                }
            }
        });
        toast.success("Organization profile created!");
        refetch();
    } catch (e: any) {
        toast.error("Failed to create profile: " + e.message);
    }
  };

  const handleAvatarSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    // If no profile, create one first? Or assume profile exists if we allow clicking?
    // We only render the file inputs if profile exists.
    if (!profile) return;

    try {
        const key = await upload(file);
        await updateProfile({
            variables: {
                input: {
                    id: profile.id,
                    avatar: key,
                }
            }
        });
        toast.success("Avatar updated");
        refetch();
    } catch (e) {
         toast.error("Failed to upload avatar");
        console.error("Failed to upload avatar", e)
    }
    e.target.value = "";
  };

  const handleBannerSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!profile) return;

    try {
        const key = await upload(file);
        await updateProfile({
            variables: {
                input: {
                    id: profile.id,
                    banner: key,
                }
            }
        });
        toast.success("Banner updated");
        refetch();
    } catch (e) {
        toast.error("Failed to upload banner");
        console.error("Failed to upload banner", e)
    }
    e.target.value = "";
  };


  const handleSave = async () => {
      if (!profile) return;
      try {
          await updateProfile({
              variables: {
                  input: {
                      id: profile.id,
                      name: editName,
                  }
              }
          })
          setIsEditing(false)
          toast.success("Profile updated")
          refetch();
      } catch (e: any) {
          toast.error("Failed to update profile: " + e.message)
      }
  }

  const handleCancelInvite = async (inviteId: string) => {
      if (!confirm("Are you sure you want to cancel this invite?")) return

      try {
          await cancelInvite({
              variables: {
                  input: {
                      id: inviteId,
                  }
              }
          })
          toast.success("Invite canceled")
          refetch()
      } catch (e: any) {
          toast.error("Failed to cancel invite: " + e.message)
      }
  }

  const startEditing = () => {
      if (!profile) return;
      setEditName(profile.name || org.name)
      setIsEditing(true)
  }

  return (
    <div className="container mx-auto py-0 space-y-6">
       {/* Profile Hero Section */}
       <div className="relative mb-10 group/banner">
            <div className={`h-48 w-full bg-gradient-to-r from-indigo-600/15 via-fuchsia-500/15 to-pink-500/15 dark:from-indigo-500/10 dark:via-fuchsia-500/10 dark:to-pink-500/10 border-b border-border/40 rounded-b-lg overflow-hidden relative  ${profile ? "cursor-pointer" : ""}`} onClick={() => profile && bannerInputRef.current?.click()}>
                    {profile?.banner && (
                        <img 
                            src={profile.banner.presignedUrl} 
                            alt="Banner" 
                            className="w-full h-full object-cover"
                        />
                    )}
                    {profile && (
                        <div className="absolute inset-0 bg-black/10 opacity-0 group-hover/banner:opacity-100 transition-opacity flex items-center justify-center">
                            <div className="bg-black/50 text-white px-3 py-1 rounded-full flex items-center gap-2 backdrop-blur-sm">
                                <Camera className="w-4 h-4" />
                                <span className="text-xs font-medium">Change Cover</span>
                            </div>
                        </div>
                    )}
            </div>
            <input ref={bannerInputRef} type="file" accept="image/*" className="hidden" onChange={handleBannerSelect} />


        <div className="container mx-auto px-6 -mt-20 flex flex-row gap-6 items-end relative z-10">
          <div className="relative group/avatar w-40 h-40">
            <div className="w-40 h-40 rounded-full ring-4 ring-background shadow-xl overflow-hidden bg-muted flex items-center justify-center text-4xl font-semibold select-none bg-white dark:bg-zinc-950 cursor-pointer" onClick={() => profile && avatarInputRef.current?.click()}>
              <Avatar className="h-full w-full">
                <AvatarImage src={profile?.avatar?.presignedUrl || undefined} className="object-cover" />
                <AvatarFallback className="text-4xl">{org.name.substring(0, 2).toUpperCase()}</AvatarFallback>
              </Avatar>
               {profile && (
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover/avatar:opacity-100 transition-opacity flex items-center justify-center text-white">
                     <Camera className="w-6 h-6" />
                </div>
               )}
            </div>
             <input ref={avatarInputRef} type="file" accept="image/*" className="hidden" onChange={handleAvatarSelect} />
          </div>
          
          <div className="flex-1 pb-4 space-y-2 mb-2">
            {!profile ? (
                <div className="flex flex-col gap-2 items-start h-full justify-end">
                    <h1 className="text-4xl font-bold tracking-tight text-foreground">{org.name}</h1>
                    <Button onClick={handleCreateProfile} size="sm">
                        Create {org.name} Profile
                    </Button>
                </div>
            ) : isEditing ? (
                 <div className="flex flex-col gap-2 max-w-xl bg-card p-4 rounded-lg border shadow-lg absolute top-10 left-0 z-50 w-full">
                    <div className="space-y-2">
                        <Label>Display Name</Label>
                        <Input 
                            value={editName} 
                            onChange={(e) => setEditName(e.target.value)} 
                            className="text-lg font-bold"
                        />
                    </div>

                    <div className="flex justify-end gap-2 pt-2">
                        <Button variant="ghost" onClick={() => setIsEditing(false)}>Cancel</Button>
                        <Button onClick={handleSave}>Save Changes</Button>
                    </div>
                 </div>
            ) : (
                <div className="group flex flex-col justify-end h-full">
                    <div className="flex items-center gap-2">
                         <h1 className="text-4xl font-bold tracking-tight text-foreground">
                            {profile.name || org.name}
                        </h1>
                        <Button variant="ghost" size="icon" onClick={startEditing} className="opacity-0 group-hover:opacity-100 transition-opacity h-8 w-8">
                            <Pen className="w-4 h-4" />
                        </Button>
                    </div>
                    {profile.bio && (
                        <p className="text-muted-foreground text-lg max-w-2xl mt-1">
                            {profile.bio}
                        </p>
                    )}
                     <p className="text-sm text-muted-foreground mt-1 flex items-center gap-2">
                        @{org.slug}
                        <span className="w-1 h-1 rounded-full bg-muted-foreground/50" />
                        <span>{org.memberships.length} members</span>
                    </p>
                </div>
            )}
           
          </div>
          <div className="pb-6">
                <Button variant="outline" onClick={() => setInviteOpen(true)}>
                    Invite Member
                </Button>
                <CreateInviteDialog open={inviteOpen} onOpenChange={setInviteOpen} organizationId={org.id} availableRoles={org.roles} />
          </div>
        </div>
      </div>

      <div className="px-6 space-y-6">
        <div className="grid gap-6 md:grid-cols-2">
            <Card>
                <CardHeader>
                    <CardTitle>Members</CardTitle>
                    <CardDescription>
                        People with access to this organization
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid gap-4">
                        {org.memberships.map(membership => (
                            <div key={membership.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors">
                                <Avatar className="h-10 w-10 border">
                                    <AvatarImage src={membership.user.profile?.avatar?.presignedUrl || undefined} />
                                    <AvatarFallback>{membership.user.username.substring(0, 2).toUpperCase()}</AvatarFallback>
                                </Avatar>
                                <div className="flex-1">
                                    <div className="font-medium">{membership.user.username}</div> 
                                    <div className="text-xs text-muted-foreground">
                                        {membership.user.email}
                                    </div>
                                </div>
                                <div className="flex gap-1">
                                    {membership.roles.map(r => (
                                        <span key={r.identifier} className="text-xs bg-secondary text-secondary-foreground px-2 py-1 rounded-md">
                                            {r.identifier}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>

            {(org.invites?.length || 0) > 0 && (
                <Card>
                    <CardHeader>
                    <CardTitle>Active Invites</CardTitle>
                    <CardDescription>
                        Pending invitations
                    </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3">
                    {org.invites?.map(i => (
                        <Link
                        to={`/invites/${i.id}`}
                        key={i.id}
                        className="block p-3 rounded-lg border bg-card text-card-foreground shadow-sm hover:border-primary/50 transition-colors"
                        >
                        <div className="flex items-start justify-between gap-4 mb-2">
                            <div className="space-y-1 overflow-hidden">
                                <div className="text-xs font-medium text-muted-foreground uppercase">
                                    INVITE LINK
                                </div>
                                <div className="font-mono text-xs bg-muted p-1 rounded truncate">
                                    {i.inviteUrl}
                                </div>
                            </div>
                            <div className="flex flex-col items-end gap-2">
                                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary">
                                    {i.status}
                                </span>
                                {i.status === "PENDING" && (
                                     <Button 
                                        variant="ghost" 
                                        size="sm" 
                                        className="h-6 text-destructive hover:text-destructive hover:bg-destructive/10 px-2"
                                        onClick={(e) => {
                                            e.preventDefault()
                                            e.stopPropagation()
                                            handleCancelInvite(i.id)
                                        }}
                                     >
                                        Cancel
                                    </Button>
                                )}
                            </div>
                        </div>
                        <div className="flex items-center justify-between pt-2 border-t text-xs text-muted-foreground">
                            <span>
                                Expires in 2 days
                            </span>
                            {i.acceptedBy && (
                            <span>
                                Accepted by <span className="font-medium">{i.acceptedBy.username}</span>
                            </span>
                            )}
                        </div>
                        </Link>
                    ))}
                    </CardContent>
                </Card>
            )}
        </div>
      </div>
    </div>
  )
}
