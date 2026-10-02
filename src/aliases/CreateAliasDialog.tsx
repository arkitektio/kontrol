import { useState } from "react"
import { useListServiceInstancesQuery } from "@/graphql/queries/service_instance.generated"
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

interface CreateAliasDialogProps {
  onSuccess?: () => void
}

export const CreateAliasDialog = ({ onSuccess }: CreateAliasDialogProps) => {
  const [open, setOpen] = useState(false)
  const [isCreating, setIsCreating] = useState(false)
  const [error, setError] = useState<string | null>(null)
  
  const [serviceInstanceId, setServiceInstanceId] = useState("")
  const [host, setHost] = useState("")
  const [port, setPort] = useState("80")
  const [path, setPath] = useState("")
  const [kind, setKind] = useState("absolute")

  const { data: instancesData } = useListServiceInstancesQuery({})
  const [createAlias] = useCreateAliasMutation()

  const handleCreate = async () => {
    const isMesh = kind === "mesh"
    if (!serviceInstanceId || (!host && !isMesh) || !port || !kind) {
      setError("Please fill in all required fields")
      return
    }

    setIsCreating(true)
    setError(null)
    try {
      await createAlias({
        variables: { 
          input: { 
            instance: serviceInstanceId,
            host: isMesh ? undefined : host,
            port: parseInt(port, 10),
            path: path || undefined,
            kind,
          }
        },
        refetchQueries: ['ListInstanceAlias', 'DetailInstanceAlias']
      })
      setOpen(false)
      resetForm()
      onSuccess?.()
    } catch (err) {
      console.error("Failed to create alias:", err)
      setError(err instanceof Error ? err.message : "Failed to create alias")
    } finally {
      setIsCreating(false)
    }
  }

  const resetForm = () => {
    setServiceInstanceId("")
    setHost("")
    setPort("80")
    setPath("")
    setKind("absolute")
    setError(null)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Create Alias
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Create Instance Alias</DialogTitle>
          <DialogDescription>
            Create a new endpoint alias for a service instance.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
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
            <div className="text-sm text-destructive bg-destructive/10 p-2 rounded">
              {error}
            </div>
          )}
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleCreate} disabled={isCreating}>
            {isCreating ? "Creating..." : "Create"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
