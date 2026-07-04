import { useEffect, useState } from "react"
import { useUpdateOrganizationMutation } from "@/api/graphql"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Pencil } from "lucide-react"
import { toast } from "sonner"

/**
 * Owner-only card for renaming the organization. Only the display `name` changes —
 * the `slug` (used in URLs and as a stable identifier) is deliberately never sent,
 * so it stays the same. updateOrganization leaves the slug untouched unless a slug
 * is explicitly provided.
 */
export function RenameOrganizationCard({
  organizationId,
  name,
  slug,
}: {
  organizationId: string
  name?: string | null
  slug?: string | null
}) {
  const [value, setValue] = useState(name ?? "")

  // Adopt the saved name once it loads (or changes elsewhere).
  useEffect(() => {
    setValue(name ?? "")
  }, [name])

  const [save, { loading }] = useUpdateOrganizationMutation({
    refetchQueries: ["Organization", "SidebarOrganization", "Me"],
  })

  const trimmed = value.trim()
  const unchanged = trimmed === (name ?? "")

  const handleSave = async () => {
    if (!trimmed || unchanged) return
    try {
      await save({ variables: { input: { id: organizationId, name: trimmed } } })
      toast.success("Organization renamed")
    } catch (e: any) {
      toast.error("Failed to rename organization: " + e.message)
    }
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center gap-3 space-y-0">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
          <Pencil className="h-5 w-5" />
        </div>
        <div className="space-y-1">
          <CardTitle className="text-lg">Organization name</CardTitle>
          <CardDescription>
            Change the display name. The handle <span className="font-mono">@{slug}</span> stays the
            same.
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="org-name">Name</Label>
          <Input
            id="org-name"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Organization name"
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSave()
            }}
          />
        </div>
        <Button onClick={handleSave} disabled={loading || !trimmed || unchanged}>
          {loading ? "Saving..." : "Save name"}
        </Button>
      </CardContent>
    </Card>
  )
}
