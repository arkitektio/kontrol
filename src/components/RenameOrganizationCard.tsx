import { useState } from "react"
import { useUpdateOrganizationMutation } from "@/graphql/mutations/organization.generated"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Switch } from "./ui/switch"
import { Textarea } from "./ui/textarea"
import { Pencil } from "lucide-react"
import { toast } from "sonner"
import { toastError } from "@/lib/errors"
import { SLUG_REGEX } from "@/lib/slug"

/**
 * Owner-only card for the organization's details: display name, description,
 * handle (slug) and whether new clients must present a device id (device auth).
 *
 * Only fields that actually changed are sent — updateOrganization leaves anything
 * it isn't given untouched, so in particular the slug (used in URLs and as a
 * stable identifier) is never re-sent implicitly. lok normalises and validates the
 * handle; a taken one comes back as "The handle 'x' is already taken. Try 'y'."
 */
export function RenameOrganizationCard({
  organizationId,
  name,
  slug,
  description,
  requireDeviceAuth,
}: {
  organizationId: string
  name?: string | null
  slug?: string | null
  description?: string | null
  requireDeviceAuth?: boolean | null
}) {
  const [nameValue, setNameValue] = useState(name ?? "")
  const [slugValue, setSlugValue] = useState(slug ?? "")
  const [descriptionValue, setDescriptionValue] = useState(description ?? "")
  const [deviceAuthValue, setDeviceAuthValue] = useState(Boolean(requireDeviceAuth))

  // Adopt the saved values once they load (or change elsewhere) — adjusted
  // during render rather than in an effect, so there's no stale first paint.
  const savedKey = JSON.stringify([name, slug, description, requireDeviceAuth])
  const [adoptedKey, setAdoptedKey] = useState(savedKey)
  if (adoptedKey !== savedKey) {
    setAdoptedKey(savedKey)
    setNameValue(name ?? "")
    setSlugValue(slug ?? "")
    setDescriptionValue(description ?? "")
    setDeviceAuthValue(Boolean(requireDeviceAuth))
  }

  const [save, { loading }] = useUpdateOrganizationMutation({
    refetchQueries: ["Organization", "SidebarOrganization", "Me"],
  })

  const trimmedName = nameValue.trim()
  const trimmedSlug = slugValue.trim()
  const trimmedDescription = descriptionValue.trim()

  const nameChanged = trimmedName !== (name ?? "")
  const slugChanged = trimmedSlug !== (slug ?? "")
  const descriptionChanged = trimmedDescription !== (description ?? "")
  const deviceAuthChanged = deviceAuthValue !== Boolean(requireDeviceAuth)
  const unchanged = !nameChanged && !slugChanged && !descriptionChanged && !deviceAuthChanged

  const slugInvalid = slugChanged && !SLUG_REGEX.test(trimmedSlug)
  const invalid = (nameChanged && !trimmedName) || slugInvalid

  const handleSave = async () => {
    if (unchanged || invalid) return
    try {
      await save({
        variables: {
          input: {
            id: organizationId,
            ...(nameChanged ? { name: trimmedName } : {}),
            ...(slugChanged ? { slug: trimmedSlug } : {}),
            ...(descriptionChanged ? { description: trimmedDescription } : {}),
            ...(deviceAuthChanged ? { requireDeviceAuth: deviceAuthValue } : {}),
          },
        },
      })
      toast.success("Organization updated")
    } catch (e) {
      toastError(e, "Couldn't update the organization")
    }
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center gap-3 space-y-0">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
          <Pencil className="h-5 w-5" />
        </div>
        <div className="space-y-1">
          <CardTitle className="text-lg">Organization details</CardTitle>
          <CardDescription>
            Name, handle and description, and whether apps must identify their device.
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="org-name">Name</Label>
          <Input
            id="org-name"
            value={nameValue}
            onChange={(e) => setNameValue(e.target.value)}
            placeholder="Organization name"
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSave()
            }}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="org-slug">Handle</Label>
          <Input
            id="org-slug"
            value={slugValue}
            onChange={(e) => setSlugValue(e.target.value.toLowerCase())}
            placeholder="my-organization"
            className="font-mono"
            aria-invalid={slugInvalid || undefined}
            aria-describedby="org-slug-help"
          />
          <p
            id="org-slug-help"
            className={slugInvalid ? "text-sm text-destructive" : "text-sm text-muted-foreground"}
          >
            {slugInvalid
              ? "Lowercase letters, numbers and single hyphens only (e.g. 'my-organization')."
              : "Used in URLs and as a stable identifier. Changing it can break links others have saved."}
          </p>
        </div>
        <div className="space-y-2">
          <Label htmlFor="org-description">Description</Label>
          <Textarea
            id="org-description"
            value={descriptionValue}
            onChange={(e) => setDescriptionValue(e.target.value)}
            placeholder="What this organization is for"
            className="resize-none min-h-[80px]"
          />
        </div>
        <div className="flex items-start justify-between gap-4 rounded-lg border p-3">
          <div className="space-y-1">
            <Label htmlFor="org-require-device-auth">Require device authorization</Label>
            <p className="text-sm text-muted-foreground">
              Apps connecting to this organization must identify the device they run on
              (their manifest has to carry a device id); apps without one are refused.
            </p>
          </div>
          <Switch
            id="org-require-device-auth"
            checked={deviceAuthValue}
            onCheckedChange={setDeviceAuthValue}
          />
        </div>
        <Button onClick={handleSave} disabled={loading || unchanged || invalid}>
          {loading ? "Saving..." : "Save changes"}
        </Button>
      </CardContent>
    </Card>
  )
}
