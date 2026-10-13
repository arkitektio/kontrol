import { useState, type ReactNode } from "react"
import { GetServiceInstanceDocument, useListServiceInstancesQuery } from "@/graphql/queries/service_instance.generated"
import { useCreateAliasMutation } from "@/graphql/mutations/alias.generated"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "../components/ui/dialog"
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
import { Plus } from "lucide-react"
import { toast } from "sonner"
import { toastError } from "@/lib/errors"
import { HOST_ERROR, PORT_ERROR, parsePort } from "./aliasValidation"

interface CreateAliasDialogProps {
  /** Create the alias for this instance instead of asking which one. */
  instanceId?: string
  /** Replaces the default "Create Alias" button. */
  trigger?: ReactNode
  onSuccess?: () => void
}

export const CreateAliasDialog = ({ instanceId, trigger, onSuccess }: CreateAliasDialogProps) => {
  const [open, setOpen] = useState(false)
  const [isCreating, setIsCreating] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [serviceInstanceId, setServiceInstanceId] = useState("")
  const [host, setHost] = useState("")
  const [port, setPort] = useState("80")
  const [path, setPath] = useState("")
  const [kind, setKind] = useState("absolute")

  const { data: instancesData } = useListServiceInstancesQuery({ skip: !open || Boolean(instanceId) })
  const [createAlias] = useCreateAliasMutation()

  const resetForm = () => {
    setServiceInstanceId("")
    setHost("")
    setPort("80")
    setPath("")
    setKind("absolute")
    setError(null)
  }

  const handleOpenChange = (next: boolean) => {
    if (isCreating) return
    if (next) resetForm()
    setOpen(next)
  }

  const handleCreate = async () => {
    if (isCreating) return
    const isMesh = kind === "mesh"
    const instance = instanceId ?? serviceInstanceId
    const portNumber = parsePort(port)
    if (!instance) {
      setError("Select a service instance.")
      return
    }
    if (!isMesh && !host.trim()) {
      setError(HOST_ERROR)
      return
    }
    if (portNumber === null) {
      setError(PORT_ERROR)
      return
    }

    setIsCreating(true)
    setError(null)
    try {
      await createAlias({
        variables: {
          input: {
            instance,
            host: isMesh ? undefined : host.trim(),
            port: portNumber,
            path: path.trim() || undefined,
            kind,
          }
        },
        // From an instance page the alias list is not mounted: refresh the instance
        // and drop the cached list so it is fetched fresh on its next visit.
        refetchQueries: instanceId
          ? [{ query: GetServiceInstanceDocument, variables: { id: instanceId } }]
          : ['ListInstanceAlias'],
        awaitRefetchQueries: true,
        update: (cache) => {
          if (instanceId) cache.evict({ id: "ROOT_QUERY", fieldName: "instanceAliases" })
        },
      })
      toast.success("Alias created")
      setOpen(false)
      onSuccess?.()
    } catch (err) {
      toastError(err, "Couldn't create the alias")
    } finally {
      setIsCreating(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        {trigger ?? (
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Create Alias
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <form
          onSubmit={(e) => {
            e.preventDefault()
            handleCreate()
          }}
        >
        <DialogHeader>
          <DialogTitle>Create Instance Alias</DialogTitle>
          <DialogDescription>
            {instanceId
              ? "Add a new endpoint alias for this service instance."
              : "Create a new endpoint alias for a service instance."}
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          {!instanceId && (
            <div className="space-y-2">
              <Label htmlFor="service-instance">Service Instance *</Label>
              <Select value={serviceInstanceId} onValueChange={setServiceInstanceId}>
                <SelectTrigger id="service-instance">
                  <SelectValue placeholder="Select a service instance" />
                </SelectTrigger>
                <SelectContent>
                  {instancesData?.serviceInstances.map(instance => (
                    <SelectItem key={instance.id} value={instance.id}>
                      {instance.identifier} ({instance.release?.service?.identifier})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          {kind === "mesh" ? (
            <p className="text-xs text-muted-foreground">
              A mesh alias has no fixed host: it resolves to the hub node's MagicDNS name on the
              organization's mesh, so only clients on the mesh can reach it.
            </p>
          ) : (
            <div className="space-y-2">
              <Label htmlFor="host">Host *</Label>
              <Input
                id="host"
                placeholder="example.com"
                value={host}
                onChange={(e) => setHost(e.target.value)}
              />
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="port">Port *</Label>
              <Input
                id="port"
                type="number"
                placeholder="80"
                value={port}
                onChange={(e) => setPort(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="kind">Kind *</Label>
              <Select value={kind} onValueChange={setKind}>
                <SelectTrigger id="kind">
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
            <Label htmlFor="path">Path</Label>
            <Input
              id="path"
              placeholder="api/v1"
              value={path}
              onChange={(e) => setPath(e.target.value)}
            />
          </div>

          {error && (
            <div className="text-sm text-destructive bg-destructive/10 p-2 rounded" role="alert">
              {error}
            </div>
          )}
        </div>
        <DialogFooter>
          <Button type="button" variant="outline" onClick={() => handleOpenChange(false)} disabled={isCreating}>
            Cancel
          </Button>
          <Button type="submit" disabled={isCreating}>
            {isCreating ? "Creating..." : "Create"}
          </Button>
        </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
