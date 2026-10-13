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
import { timeAgo } from "./lib/time"
import { Pen, Camera, Loader2 } from "lucide-react"
import { toast } from "sonner"
import { toastError } from "@/lib/errors"
import { ConfirmActionDialog } from "./components/ConfirmActionDialog"

import { QueryError, ResourceNotFound } from "@/components/status"

import { ProfilePageSkeleton } from "@/components/skeletons"

/** "Expires in 2 days" / "Expired 3 hours ago" / "No expiry". */
function inviteExpiry(expiresAt?: string | null): string {
  if (!expiresAt) return "No expiry"
  const expired = new Date(expiresAt).getTime() < Date.now()
  return `${expired ? "Expired" : "Expires"} ${timeAgo(expiresAt)}`
}

export default function OrganizationProfile() {
  const { orgId } = useParams<{ orgId: string }>()
  const [inviteOpen, setInviteOpen] = useState(false)
  
  const upload = useMediaUpload()
  const [updateProfile, { loading: updating }] = useUpdateOrganizationProfileMutation()
  const [createProfile, { loading: creating }] = useCreateOrganizationProfileMutation()
  const [cancelInvite] = useCancelInviteMutation()

  const { data, loading, error, refetch } = useOrganizationQuery({
    variables: { id: orgId! },
    skip: !orgId,
  })

  // Local state for editing fields
  const [isEditing, setIsEditing] = useState(false)
  const [editName, setEditName] = useState("")
  const [cancelTarget, setCancelTarget] = useState<string | null>(null)
  const [uploading, setUploading] = useState<"avatar" | "banner" | null>(null)

  const avatarInputRef = useRef<HTMLInputElement>(null)
  const bannerInputRef = useRef<HTMLInputElement>(null)

  if (loading) return <ProfilePageSkeleton />
  if (error) return <QueryError error={error} resource="organization" onRetry={() => refetch()} />
  if (!data?.organization) return <ResourceNotFound resource="organization" id={orgId} />

  const org = data.organization
  const profile = org.profile
  // `name` is optional on the backend; the handle is always there.
  const displayName = org.name || org.slug
  // lok: the profile is owner/admin-editable, but only the owner may create invites.
  const canEdit = org.amIOwner || org.amIAdmin

  const handleCreateProfile = async () => {
    if (creating) return;
    try {
        await createProfile({
            variables: {
                input: {
                    organization: org.id,
                    name: displayName,
                }
            }
        });
        toast.success("Organization profile created");
        refetch();
    } catch (e) {
        toastError(e, "Couldn't create the organization profile");
    }
  };

  const handleAvatarSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    // If no profile, create one first? Or assume profile exists if we allow clicking?
    // We only render the file inputs if profile exists.
    if (!profile || uploading) return;

    setUploading("avatar");
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
        toastError(e, "Couldn't upload the avatar");
    } finally {
        setUploading(null);
    }
    e.target.value = "";
  };

  const handleBannerSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!profile || uploading) return;

    setUploading("banner");
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
        toastError(e, "Couldn't upload the cover image");
    } finally {
        setUploading(null);
    }
    e.target.value = "";
  };


  const handleSave = async () => {
      const trimmedName = editName.trim()
      if (!profile || !trimmedName || updating) return;
      try {
          await updateProfile({
              variables: {
                  input: {
                      id: profile.id,
                      name: trimmedName,
                  }
              }
          })
          setIsEditing(false)
          toast.success("Profile updated")
          refetch();
      } catch (e) {
          toastError(e, "Couldn't update the profile")
      }
  }

  const handleCancelInvite = async (inviteId: string) => {
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
      } catch (e) {
          toastError(e, "Couldn't cancel the invite")
          return false
      }
  }

  const startEditing = () => {
      if (!profile) return;
      setEditName(profile.name || displayName)
      setIsEditing(true)
  }

  return (
    <div className="container mx-auto py-0 space-y-6">
       {/* Profile Hero Section */}
       <div className="relative mb-10 group/banner">
            <div className="h-48 w-full bg-gradient-to-r from-indigo-600/15 via-fuchsia-500/15 to-pink-500/15 dark:from-indigo-500/10 dark:via-fuchsia-500/10 dark:to-pink-500/10 border-b border-border/40 rounded-b-lg overflow-hidden relative">
                    {profile?.banner && (
                        <img 
                            src={profile.banner.presignedUrl} 
                            alt="Banner" 
                            className="w-full h-full object-cover"
                        />
                    )}
                    {profile && canEdit && (
                        <button
                            type="button"
                            aria-label="Change cover image"
                            aria-busy={uploading === "banner"}
                            disabled={uploading !== null}
                            onClick={() => bannerInputRef.current?.click()}
                            className={`absolute inset-0 bg-black/10 group-hover/banner:opacity-100 focus-visible:opacity-100 transition-opacity flex items-center justify-center cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset ${uploading === "banner" ? "opacity-100" : "opacity-0"}`}
                        >
                            <div className="bg-black/50 text-white px-3 py-1 rounded-full flex items-center gap-2 backdrop-blur-sm">
                                {uploading === "banner" ? <Loader2 className="w-4 h-4 animate-spin" /> : <Camera className="w-4 h-4" />}
                                <span className="text-xs font-medium">{uploading === "banner" ? "Uploading..." : "Change Cover"}</span>
                            </div>
                        </button>
                    )}
            </div>
            <input ref={bannerInputRef} type="file" accept="image/png,image/jpeg,image/gif,image/webp,image/avif" className="hidden" aria-hidden tabIndex={-1} onChange={handleBannerSelect} />


        <div className="container mx-auto px-6 -mt-20 flex flex-row gap-6 items-end relative z-10">
          <div className="relative group/avatar w-40 h-40">
            <div className="relative w-40 h-40 rounded-full ring-4 ring-background shadow-xl overflow-hidden bg-muted flex items-center justify-center text-4xl font-semibold select-none bg-white dark:bg-zinc-950">
              <Avatar className="h-full w-full">
                <AvatarImage src={profile?.avatar?.presignedUrl || undefined} className="object-cover" />
                <AvatarFallback className="text-4xl">{displayName.substring(0, 2).toUpperCase()}</AvatarFallback>
              </Avatar>
               {profile && canEdit && (
                <button
                    type="button"
                    aria-label="Change organization avatar"
                    aria-busy={uploading === "avatar"}
                    disabled={uploading !== null}
                    onClick={() => avatarInputRef.current?.click()}
                    className={`absolute inset-0 rounded-full bg-black/50 group-hover/avatar:opacity-100 focus-visible:opacity-100 transition-opacity flex items-center justify-center text-white cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${uploading === "avatar" ? "opacity-100" : "opacity-0"}`}
                >
                     {uploading === "avatar" ? <Loader2 className="w-6 h-6 animate-spin" /> : <Camera className="w-6 h-6" />}
                </button>
               )}
            </div>
             <input ref={avatarInputRef} type="file" accept="image/png,image/jpeg,image/gif,image/webp,image/avif" className="hidden" aria-hidden tabIndex={-1} onChange={handleAvatarSelect} />
          </div>
          
          <div className="flex-1 pb-4 space-y-2 mb-2">
            {!profile ? (
                <div className="flex flex-col gap-2 items-start h-full justify-end">
                    <h1 className="text-4xl font-bold tracking-tight text-foreground">{displayName}</h1>
                    {canEdit && (
                        <Button onClick={handleCreateProfile} size="sm" disabled={creating}>
                            {creating ? "Creating..." : `Create ${displayName} Profile`}
                        </Button>
                    )}
                </div>
            ) : isEditing ? (
                 <form
                    className="flex flex-col gap-2 max-w-xl bg-card p-4 rounded-lg border shadow-lg absolute top-10 left-0 z-50 w-full"
                    onSubmit={(e) => { e.preventDefault(); handleSave() }}
                 >
                    <div className="space-y-2">
                        <Label htmlFor="org-profile-name">Display Name</Label>
                        <Input 
                            id="org-profile-name"
                            value={editName} 
                            onChange={(e) => setEditName(e.target.value)} 
                            className="text-lg font-bold"
                            aria-invalid={!editName.trim() || undefined}
                        />
                        {!editName.trim() && (
                            <p className="text-sm text-destructive">The display name can't be empty.</p>
                        )}
                    </div>

                    <div className="flex justify-end gap-2 pt-2">
                        <Button type="button" variant="ghost" onClick={() => setIsEditing(false)} disabled={updating}>Cancel</Button>
                        <Button type="submit" disabled={updating || !editName.trim()}>
                            {updating ? "Saving..." : "Save Changes"}
                        </Button>
                    </div>
                 </form>
            ) : (
                <div className="group flex flex-col justify-end h-full">
                    <div className="flex items-center gap-2">
                         <h1 className="text-4xl font-bold tracking-tight text-foreground">
                            {profile.name || displayName}
                        </h1>
                        {canEdit && (
                            <Button variant="ghost" size="icon" onClick={startEditing} aria-label="Edit display name" className="h-8 w-8 text-muted-foreground hover:text-foreground">
                                <Pen className="w-4 h-4" />
                            </Button>
                        )}
                    </div>
                    {profile.bio && (
                        <p className="text-muted-foreground text-lg max-w-2xl mt-1">
                            {profile.bio}
                        </p>
                    )}
                     <p className="text-sm text-muted-foreground mt-1 flex items-center gap-2">
                        @{org.slug}
                        <span className="w-1 h-1 rounded-full bg-muted-foreground/50" />
                        <span>{org.memberships.length} {org.memberships.length === 1 ? "member" : "members"}</span>
                    </p>
                </div>
            )}
           
          </div>
          {org.amIOwner && (
            <div className="pb-6">
                  <Button variant="outline" onClick={() => setInviteOpen(true)}>
                      Invite Member
                  </Button>
                  <CreateInviteDialog open={inviteOpen} onOpenChange={setInviteOpen} organizationId={org.id} availableRoles={org.roles} roleSets={org.roleSets} />
            </div>
          )}
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
                            <Link key={membership.id} to={`/organization/${org.id}/members/${membership.id}`} className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors">
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
                            </Link>
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
                        <div
                        key={i.id}
                        className="p-3 rounded-lg border bg-card text-card-foreground shadow-sm"
                        >
                        <div className="flex items-start justify-between gap-4 mb-2">
                            <div className="space-y-1 overflow-hidden">
                                <div className="text-xs font-medium text-muted-foreground uppercase">
                                    INVITE LINK
                                </div>
                                <Link
                                    to={`/organization/${org.id}/invites/${i.id}`}
                                    className="block font-mono text-xs bg-muted p-1 rounded truncate hover:underline"
                                >
                                    {i.inviteUrl}
                                </Link>
                            </div>
                            <div className="flex flex-col items-end gap-2">
                                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary">
                                    {i.status}
                                </span>
                                {i.status === "PENDING" && canEdit && (
                                     <Button 
                                        variant="ghost" 
                                        size="sm" 
                                        className="h-6 text-destructive hover:text-destructive hover:bg-destructive/10 px-2"
                                        onClick={() => setCancelTarget(i.id)}
                                     >
                                        Cancel
                                    </Button>
                                )}
                            </div>
                        </div>
                        <div className="flex items-center justify-between pt-2 border-t text-xs text-muted-foreground">
                            <span>
                                {inviteExpiry(i.expiresAt)}
                            </span>
                            {i.acceptedBy && (
                            <span>
                                Accepted by <span className="font-medium">{i.acceptedBy.username}</span>
                            </span>
                            )}
                        </div>
                        </div>
                    ))}
                    </CardContent>
                </Card>
            )}
        </div>
      </div>

      {/* One page-level confirm for all invite cards. */}
      <ConfirmActionDialog
        open={cancelTarget !== null}
        onOpenChange={(open) => !open && setCancelTarget(null)}
        title="Cancel this invite?"
        description="The invite link will stop working. People who already joined keep their membership."
        confirmLabel="Cancel invite"
        pendingLabel="Canceling..."
        destructive
        onConfirm={() => cancelTarget && handleCancelInvite(cancelTarget)}
      />
    </div>
  )
}
