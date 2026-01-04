import { useState, useEffect } from "react"
import { useUpdateAliasMutation, type InstanceAliasFragment } from "../api/graphql"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
} from "../components/ui/sheet"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select"
import { Edit } from "lucide-react"

interface UpdateAliasSheetProps {
  alias: InstanceAliasFragment
  onSuccess?: () => void
}

export const UpdateAliasSheet = ({ alias, onSuccess }: UpdateAliasSheetProps) => {
  const [open, setOpen] = useState(false)
  const [isUpdating, setIsUpdating] = useState(false)
  const [error, setError] = useState<string | null>(null)
  
  const [host, setHost] = useState(alias.host || "")
  const [port, setPort] = useState(alias.port?.toString() || "80")
  const [path, setPath] = useState(alias.path || "")
  const [kind, setKind] = useState(alias.kind || "BACKEND")

  const [updateAlias] = useUpdateAliasMutation()

  useEffect(() => {
    if (open) {
      setHost(alias.host || "")
      setPort(alias.port?.toString() || "80")
      setPath(alias.path || "")
      setKind(alias.kind || "BACKEND")
      setError(null)
    }
  }, [open, alias])

  const handleUpdate = async () => {
    if (!host || !port || !kind) {
      setError("Please fill in all required fields")
      return
    }

    setIsUpdating(true)
    setError(null)
    try {
      await updateAlias({
        variables: { 
          input: { 
            id: alias.id,
            host,
            port: parseInt(port, 10),
            path: path || undefined,
            kind,
          }
        },
        refetchQueries: ['DetailInstanceAlias', 'ListInstanceAlias']
      })
      setOpen(false)
      onSuccess?.()
    } catch (err) {
      console.error("Failed to update alias:", err)
      setError(err instanceof Error ? err.message : "Failed to update alias")
    } finally {
      setIsUpdating(false)
    }
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="sm">
          <Edit className="h-4 w-4 mr-2" />
          Edit
        </Button>
      </SheetTrigger>
      <SheetContent className="sm:max-w-[500px] overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Update Instance Alias</SheetTitle>
          <SheetDescription>
            Modify the endpoint configuration for this alias.
          </SheetDescription>
        </SheetHeader>
        <div className="space-y-4 py-6">
          <div className="space-y-2">
            <Label htmlFor="edit-host">Host *</Label>
            <Input
              id="edit-host"
              placeholder="example.com"
              value={host}
              onChange={(e) => setHost(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="edit-port">Port *</Label>
              <Input
                id="edit-port"
                type="number"
                placeholder="80"
                value={port}
                onChange={(e) => setPort(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-kind">Kind *</Label>
              <Select value={kind} onValueChange={setKind}>
                <SelectTrigger id="edit-kind">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="BACKEND">Backend</SelectItem>
                  <SelectItem value="FRONTEND">Frontend</SelectItem>
                  <SelectItem value="API">API</SelectItem>
                  <SelectItem value="WEBSOCKET">WebSocket</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="edit-path">Path</Label>
            <Input
              id="edit-path"
              placeholder="api/v1"
              value={path}
              onChange={(e) => setPath(e.target.value)}
            />
          </div>

          <div className="p-3 bg-muted rounded text-xs">
            <div className="font-semibold mb-1">Preview URL</div>
            <div className="font-mono break-all">
              {alias.ssl ? "https" : "http"}://{host}{port !== "80" && port !== "443" ? `:${port}` : ""}/{path}
            </div>
          </div>

          {error && (
            <div className="text-sm text-destructive bg-destructive/10 p-2 rounded">
              {error}
            </div>
          )}
        </div>
        <SheetFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleUpdate} disabled={isUpdating}>
            {isUpdating ? "Updating..." : "Update"}
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
