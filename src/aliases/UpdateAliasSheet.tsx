import { useState, useEffect } from "react"
import { useUpdateAliasMutation } from "@/graphql/mutations/alias.generated"
import { type InstanceAliasFragment } from "@/graphql/fragments/alias.generated"
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
import { toast } from "sonner"
import { toastError } from "@/lib/errors"
import { HOST_ERROR, PORT_ERROR, parsePort } from "./aliasValidation"

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
  const [kind, setKind] = useState(alias.kind || "absolute")

  const [updateAlias] = useUpdateAliasMutation()

  useEffect(() => {
    if (open) {
      setHost(alias.host || "")
      setPort(alias.port?.toString() || "80")
      setPath(alias.path || "")
      setKind(alias.kind || "absolute")
      setError(null)
    }
  }, [open, alias])

  const handleUpdate = async () => {
    if (isUpdating) return
    const isMesh = kind === "mesh"
    const portNumber = parsePort(port)
    if (!isMesh && !host.trim()) {
      setError(HOST_ERROR)
      return
    }
    if (portNumber === null) {
      setError(PORT_ERROR)
      return
    }

    setIsUpdating(true)
    setError(null)
    try {
      await updateAlias({
        variables: { 
          input: { 
            id: alias.id,
            host: isMesh ? undefined : host.trim(),
            port: portNumber,
            path: path.trim() || undefined,
            kind,
          }
        },
        // The response updates the cached alias (and with it any list); the detail
        // page is the one mounted, so wait for it before closing.
        refetchQueries: ['DetailInstanceAlias'],
        awaitRefetchQueries: true,
      })
      toast.success("Alias updated")
      setOpen(false)
      onSuccess?.()
    } catch (err) {
      toastError(err, "Couldn't update the alias")
    } finally {
      setIsUpdating(false)
    }
  }

  return (
    <Sheet open={open} onOpenChange={(next) => !isUpdating && setOpen(next)}>
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
        <form
          className="flex flex-1 flex-col"
          onSubmit={(e) => {
            e.preventDefault()
            handleUpdate()
          }}
        >
        <div className="space-y-4 py-6">
          {kind !== "mesh" && (
            <div className="space-y-2">
              <Label htmlFor="edit-host">Host *</Label>
              <Input
                id="edit-host"
                placeholder="example.com"
                value={host}
                onChange={(e) => setHost(e.target.value)}
              />
            </div>
          )}

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
                  <SelectItem value="absolute">Absolute</SelectItem>
                  <SelectItem value="mesh">Mesh (hub's MagicDNS name)</SelectItem>
                  <SelectItem value="docker">Docker (only from the hub's own docker network)</SelectItem>
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
              {alias.ssl ? "https" : "http"}://{kind === "mesh" ? alias.resolvedHost || "[hub MagicDNS name]" : host}{port !== "80" && port !== "443" ? `:${port}` : ""}/{path}
            </div>
          </div>

          {error && (
            <div className="text-sm text-destructive bg-destructive/10 p-2 rounded" role="alert">
              {error}
            </div>
          )}
        </div>
        <SheetFooter>
          <Button type="button" variant="outline" onClick={() => setOpen(false)} disabled={isUpdating}>
            Cancel
          </Button>
          <Button type="submit" disabled={isUpdating}>
            {isUpdating ? "Updating..." : "Update"}
          </Button>
        </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  )
}
