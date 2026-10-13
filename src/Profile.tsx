import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useMeQuery } from "@/graphql/queries/me.generated"
import { useUpdateProfileMutation, useCreateProfileMutation } from "@/graphql/mutations/profile.generated"
import { ProfilePageSkeleton } from "@/components/skeletons"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea"; 
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useMediaUpload } from "@/hooks/use-upload";
import { Pen, Camera, Image as ImageIcon, Loader2 } from "lucide-react";
import { useState, useRef } from "react";
import { toast } from "sonner";
import { toastError } from "@/lib/errors";

import { QueryError, ResourceNotFound } from "@/components/status";

export default function Profile() {
  const { data, loading, error, refetch } = useMeQuery();
  const [updateProfile, { loading: updating }] = useUpdateProfileMutation();
  const [createProfile, { loading: creating }] = useCreateProfileMutation();
  const upload = useMediaUpload();

  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState("");
  const [editBio, setEditBio] = useState("");
  const [uploading, setUploading] = useState<"avatar" | "banner" | null>(null);
  
  const avatarInputRef = useRef<HTMLInputElement>(null);
  const bannerInputRef = useRef<HTMLInputElement>(null);

  if (loading) {
    return <ProfilePageSkeleton />
    ;
  }

  const user = data?.me;

  if (error && !user) {
    return <QueryError error={error} resource="profile" onRetry={() => refetch()} />;
  }

  if (!user) {
    return <ResourceNotFound resource="user" />;
  }

  const profile = user.profile;

  const handleCreateProfile = async () => {
      if (creating) return;
      try {
          await createProfile({
              variables: {
                  input: {
                      user: user.id,
                      name: user.username || "New Profile",
                      bio: ""
                  }
              }
          });
          toast.success("Profile created");
          refetch();
      } catch (e) {
          toastError(e, "Couldn't create your profile");
      }
  };

  if (!profile) {
      return (
          <div className="container max-w-3xl py-12 text-center">
              <Card>
                  <CardHeader>
                      <CardTitle>Welcome, {user.username}!</CardTitle>
                      <CardDescription>You don't have a profile yet.</CardDescription>
                  </CardHeader>
                  <CardContent>
                      <Button onClick={handleCreateProfile} disabled={creating}>
                          {creating ? "Creating..." : "Create Profile"}
                      </Button>
                  </CardContent>
              </Card>
          </div>
      )
  }

  const handleAvatarSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || uploading) return;
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
    if (!file || uploading) return;
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
        toastError(e, "Couldn't upload the banner");
    } finally {
        setUploading(null);
    }
    e.target.value = "";
  };

  const startEditing = () => {
      setEditName(profile.name || "");
      setEditBio(profile.bio || "");
      setIsEditing(true);
  };

  const saveProfile = async () => {
      if (updating) return;
      try {
          await updateProfile({
              variables: {
                  input: {
                      id: profile.id,
                      name: editName,
                      bio: editBio
                  }
              }
          });
          setIsEditing(false);
          toast.success("Profile updated");
          refetch();
      } catch (e) {
          toastError(e, "Couldn't update your profile");
      }
  };


  return (
    <div className="container mx-auto py-0 space-y-6">
        {/* Hero Section */}
       <div className="relative mb-20 group/banner">
            {/* Banner */}
            <div className="h-64 w-full bg-muted border-b border-border/40 rounded-b-lg overflow-hidden relative">
                 {profile.banner?.presignedUrl ? (
                     <img src={profile.banner.presignedUrl} alt="Banner" className="w-full h-full object-cover" />
                 ) : (
                    <div className="w-full h-full bg-gradient-to-r from-blue-500/20 to-purple-500/20" />
                 )}
                 
                 {/* Banner Edit Button */}
                 <div className={`absolute top-4 right-4 group-hover/banner:opacity-100 focus-within:opacity-100 transition-opacity ${uploading === "banner" ? "opacity-100" : "opacity-0"}`}>
                      <Button type="button" variant="secondary" size="sm" aria-label="Change banner image" disabled={uploading !== null} onClick={() => bannerInputRef.current?.click()}>
                          {uploading === "banner" ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <ImageIcon className="w-4 h-4 mr-2" />}
                          {uploading === "banner" ? "Uploading..." : "Change Banner"}
                      </Button>
                 </div>
            </div>

            {/* Avatar & Info Overlay */}
            <div className="container mx-auto px-6 absolute -bottom-16 left-0 flex flex-row gap-6 items-end w-full">
                {/* Avatar */}
                <button type="button" aria-label="Change avatar" aria-busy={uploading === "avatar"} disabled={uploading !== null} className="relative group/avatar w-40 h-40 cursor-pointer rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2" onClick={() => avatarInputRef.current?.click()}>
                    <div className="w-40 h-40 rounded-full ring-4 ring-background shadow-xl overflow-hidden bg-muted flex items-center justify-center text-4xl font-semibold select-none bg-white dark:bg-zinc-950">
                        <Avatar className="h-full w-full">
                            <AvatarImage src={profile.avatar?.presignedUrl || undefined} className="object-cover" />
                            <AvatarFallback className="text-4xl">{user.username.substring(0, 2).toUpperCase()}</AvatarFallback>
                        </Avatar>
                    </div>
                    {/* Overlay */}
                    <div className={`absolute inset-0 rounded-full group-hover/avatar:opacity-100 group-focus-visible/avatar:opacity-100 transition-opacity bg-black/50 flex items-center justify-center text-xs text-white font-medium backdrop-blur-sm z-10 ${uploading === "avatar" ? "opacity-100" : "opacity-0"}`}>
                        {uploading === "avatar" ? <Loader2 className="w-6 h-6 animate-spin" /> : <Camera className="w-6 h-6 mb-1" />}
                    </div>
                 </button>

                 {/* Basic Info (Name) */}
                 <div className="flex-1 pb-4 mb-2">
                      <h1 className="text-4xl font-bold tracking-tight text-foreground drop-shadow-md">
                          {profile.name || user.username}
                      </h1>
                      <p className="text-muted-foreground font-medium">@{user.username}</p>
                 </div>
            </div>
            
             {/* Hidden Inputs */}
            <input ref={avatarInputRef} type="file" accept="image/png,image/jpeg,image/gif,image/webp,image/avif" className="hidden" aria-hidden tabIndex={-1} onChange={handleAvatarSelect} />
            <input ref={bannerInputRef} type="file" accept="image/png,image/jpeg,image/gif,image/webp,image/avif" className="hidden" aria-hidden tabIndex={-1} onChange={handleBannerSelect} />
       </div>


      <div className="container max-w-4xl px-6 space-y-6">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
                <div>
                    <CardTitle>About</CardTitle>
                    <CardDescription>Personal information and bio</CardDescription>
                </div>
                {!isEditing ? (
                    <Button variant="outline" size="sm" onClick={startEditing}>
                        <Pen className="w-4 h-4 mr-2" />
                        Edit Profile
                    </Button>
                ) : (
                    <div className="flex gap-2">
                        <Button type="button" variant="ghost" size="sm" onClick={() => setIsEditing(false)} disabled={updating}>Cancel</Button>
                        <Button type="submit" form="profile-form" size="sm" disabled={updating}>
                            {updating ? "Saving..." : "Save Changes"}
                        </Button>
                    </div>
                )}
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
             {isEditing ? (
                 <form id="profile-form" className="space-y-4" onSubmit={(e) => { e.preventDefault(); saveProfile(); }}>
                     <div className="space-y-2">
                         <label htmlFor="profile-name" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Display Name</label>
                         <Input id="profile-name" value={editName} onChange={(e) => setEditName(e.target.value)} placeholder="Display Name" />
                     </div>
                     <div className="space-y-2">
                         <label htmlFor="profile-bio" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Bio</label>
                         <Textarea id="profile-bio" value={editBio} onChange={(e) => setEditBio(e.target.value)} placeholder="Tell us about yourself" className="resize-none min-h-[100px]" />
                     </div>
                 </form>
             ) : (
                 <div className="space-y-4">
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                         <div>
                             <h4 className="text-sm font-medium text-muted-foreground mb-1">Display Name</h4>
                             <p className="text-sm font-medium">{profile.name}</p>
                         </div>
                         <div>
                             <h4 className="text-sm font-medium text-muted-foreground mb-1">Username</h4>
                             <p className="text-sm font-medium">@{user.username}</p>
                         </div>
                         <div>
                             <h4 className="text-sm font-medium text-muted-foreground mb-1">Email</h4>
                             <p className="text-sm font-medium">{user.email}</p>
                         </div>
                     </div>
                     <div>
                         <h4 className="text-sm font-medium text-muted-foreground mb-1">Bio</h4>
                         <p className="text-sm whitespace-pre-wrap">{profile.bio || "No bio set."}</p>
                     </div>
                 </div>
             )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Shared links</CardTitle>
            <CardDescription>Whether links you share may say who they are from</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-start gap-3">
              <Switch
                id="profile-public-link-preview"
                checked={profile.publicLinkPreview}
                disabled={updating}
                onCheckedChange={async (next) => {
                  try {
                    await updateProfile({ variables: { input: { id: profile.id, publicLinkPreview: next } } });
                    toast.success(next ? "Your links now show your name" : "Your links no longer show your name");
                  } catch (e) {
                    toastError(e, "Couldn't update your link preview");
                  }
                }}
              />
              <div className="space-y-1">
                <Label htmlFor="profile-public-link-preview">Show my name and picture on links I share</Label>
                <p className="text-sm text-muted-foreground">
                  Off, a link you share never says who sent it. On, a link that carries{" "}
                  <code>?user_id={user.id}</code> shows your display name and picture to whoever
                  opens it, even without an account. This only happens for organizations that
                  chose to be shown on their links, and only while you are a member of them.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
