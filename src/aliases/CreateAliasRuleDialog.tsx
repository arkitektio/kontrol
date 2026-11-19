import { useEffect, useState } from "react"
import { useCreateAliasRuleMutation } from "@/graphql/mutations/alias.generated"
import { useAppsQuery } from "@/graphql/queries/app.generated"
import { useClientsQuery } from "@/graphql/queries/client.generated"
import { useMembershipsQuery } from "@/graphql/queries/memberships.generated"
import { useRolesQuery } from "@/graphql/queries/roles.generated"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
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
import { Popover, PopoverContent, PopoverTrigger } from "../components/ui/popover"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../components/ui/command"
import { Check, ChevronsUpDown, Plus } from "lucide-react"
import { toast } from "sonner"
import { toastError } from "@/lib/errors"
import { cn } from "@/lib/utils"
import { PRIORITY_ERROR, parsePriority } from "./aliasValidation"
import { RULE_SUBJECT_LABELS, type RuleSubjectKind } from "./aliasRuleSubjects"

const PICKER_LIMIT = 30

interface SubjectOption {
  id: string
  label: string
  detail?: string | null
}

/**
 * A server-searched combobox over the subjects a rule can name. Clients, users
 * (through their memberships) and roles are the alias's organization's; apps are
 * global.
 */
function SubjectPicker({
  kind,
  organizationId,
  value,
  onChange,
}: {
  kind: RuleSubjectKind
  organizationId: string
  value: SubjectOption | null
  onChange: (option: SubjectOption) => void
}) {
  const [open, setOpen] = useState(false)
  const [input, setInput] = useState("")
  const [search, setSearch] = useState("")

  useEffect(() => {
    const timer = setTimeout(() => setSearch(input.trim()), 200)
    return () => clearTimeout(timer)
  }, [input])

  const pagination = { limit: PICKER_LIMIT, offset: 0 }
  const searchFilter = search || undefined

  const apps = useAppsQuery({
    variables: { filters: { search: searchFilter }, pagination },
    skip: !open || kind !== "app",
  })
  const clients = useClientsQuery({
    variables: { filters: { organization: organizationId, search: searchFilter }, pagination },
    skip: !open || kind !== "client",
  })
  const memberships = useMembershipsQuery({
    variables: { filters: { organization: organizationId, search: searchFilter }, pagination },
    skip: !open || kind !== "user",
  })
  const roles = useRolesQuery({
    variables: { filters: { organization: organizationId, search: searchFilter }, pagination },
    skip: !open || kind !== "role",
  })

  let options: SubjectOption[] = []
  let loading = false
  switch (kind) {
    case "app":
      loading = apps.loading
      options = (apps.data ?? apps.previousData)?.apps.map((app) => ({ id: app.id, label: String(app.identifier) })) ?? []
      break
    case "client":
      loading = clients.loading
      options =
        (clients.data ?? clients.previousData)?.clients.map((client) => ({
          id: client.id,
          label: client.name,
          detail: [client.release?.app?.identifier, client.user?.username].filter(Boolean).join(" · "),
        })) ?? []
      break
    case "user": {
      loading = memberships.loading
      // One user can only hold one membership per organization, but dedupe anyway.
      const seen = new Set<string>()
      options = []
      for (const membership of (memberships.data ?? memberships.previousData)?.memberships ?? []) {
        if (seen.has(membership.user.id)) continue
        seen.add(membership.user.id)
        options.push({ id: membership.user.id, label: membership.user.username })
      }
      break
    }
    case "role":
      loading = roles.loading
      options =
        (roles.data ?? roles.previousData)?.roles.map((role) => ({
          id: role.id,
          label: role.identifier,
          detail: role.description,
        })) ?? []
      break
  }

  const noun = RULE_SUBJECT_LABELS[kind].toLowerCase()

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button id="rule-subject" variant="outline" role="combobox" className="w-full justify-between font-normal">
          <span className={cn("truncate", !value && "text-muted-foreground")}>
            {value ? value.label : `Select a ${noun}`}
          </span>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0" align="start">
        {/* Filtering happens on the server, so cmdk must not filter again. */}
        <Command shouldFilter={false}>
          <CommandInput placeholder={`Search ${noun}s...`} value={input} onValueChange={setInput} />
          <CommandList>
            <CommandEmpty>{loading ? "Loading..." : `No ${noun}s found.`}</CommandEmpty>
            <CommandGroup>
              {options.map((option) => (
                <CommandItem
                  key={option.id}
                  // cmdk keys items by value: keep it unique when two share a name.
                  value={`${option.label} ${option.id}`}
                  onSelect={() => {
                    onChange(option)
                    setOpen(false)
                  }}
                >
                  <Check className={cn("mr-2 h-4 w-4", value?.id === option.id ? "opacity-100" : "opacity-0")} />
                  <div className="min-w-0">
                    <div className="truncate">{option.label}</div>
                    {option.detail && <div className="truncate text-xs text-muted-foreground">{option.detail}</div>}
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

interface CreateAliasRuleDialogProps {
  aliasId: string
  organizationId: string
}

export const CreateAliasRuleDialog = ({ aliasId, organizationId }: CreateAliasRuleDialogProps) => {
  const [open, setOpen] = useState(false)
  const [isCreating, setIsCreating] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [effect, setEffect] = useState<"disable" | "priority">("disable")
  const [priority, setPriority] = useState("")
  const [subjectKind, setSubjectKind] = useState<RuleSubjectKind>("client")
  const [subject, setSubject] = useState<SubjectOption | null>(null)

  const [createAliasRule] = useCreateAliasRuleMutation()

  const resetForm = () => {
    setEffect("disable")
    setPriority("")
    setSubjectKind("client")
    setSubject(null)
    setError(null)
  }

  const handleOpenChange = (next: boolean) => {
    if (isCreating) return
    if (next) resetForm()
    setOpen(next)
  }

  const handleCreate = async () => {
    if (isCreating) return
    if (!subject) {
      setError(`Select a ${RULE_SUBJECT_LABELS[subjectKind].toLowerCase()}.`)
      return
    }
    let priorityNumber: number | null = null
    if (effect === "priority") {
      const parsed = parsePriority(priority)
      if (parsed === undefined) {
        setError(PRIORITY_ERROR)
        return
      }
      if (parsed === null) {
        setError("Enter the priority these clients get the alias at.")
        return
      }
      priorityNumber = parsed
    }

    setIsCreating(true)
    setError(null)
    try {
      await createAliasRule({
        variables: {
          input: {
            alias: aliasId,
            effect,
            priority: effect === "priority" ? priorityNumber : undefined,
            // Exactly one subject.
            [subjectKind]: subject.id,
          },
        },
        refetchQueries: ["DetailInstanceAlias"],
        awaitRefetchQueries: true,
      })
      toast.success("Rule added")
      setOpen(false)
    } catch (err) {
      toastError(err, "Couldn't add the rule")
    } finally {
      setIsCreating(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Plus className="h-4 w-4 mr-2" />
          Add rule
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <form
          onSubmit={(e) => {
            e.preventDefault()
            handleCreate()
          }}
        >
          <DialogHeader>
            <DialogTitle>Add alias rule</DialogTitle>
            <DialogDescription>
              Disable or re-rank this alias for some clients. The most specific rule wins (client, then app, then
              user, then role). Rules decide routing, not access.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="rule-effect">Effect *</Label>
                <Select value={effect} onValueChange={(v) => setEffect(v as "disable" | "priority")}>
                  <SelectTrigger id="rule-effect">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="disable">Disable (not handed out)</SelectItem>
                    <SelectItem value="priority">Priority (re-rank)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {effect === "priority" && (
                <div className="space-y-2">
                  <Label htmlFor="rule-priority">Priority *</Label>
                  <Input
                    id="rule-priority"
                    type="number"
                    step={1}
                    placeholder="e.g. 5"
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                  />
                </div>
              )}
            </div>
            {effect === "priority" && (
              <p className="text-xs text-muted-foreground">Lower is tried first.</p>
            )}

            <div className="grid grid-cols-[minmax(0,1fr)_minmax(0,2fr)] gap-4">
              <div className="space-y-2">
                <Label htmlFor="rule-subject-kind">Applies to *</Label>
                <Select
                  value={subjectKind}
                  onValueChange={(v) => {
                    setSubjectKind(v as RuleSubjectKind)
                    // A picked subject belongs to the old kind.
                    setSubject(null)
                  }}
                >
                  <SelectTrigger id="rule-subject-kind">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="client">Client</SelectItem>
                    <SelectItem value="app">App</SelectItem>
                    <SelectItem value="user">User</SelectItem>
                    <SelectItem value="role">Role</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="rule-subject">{RULE_SUBJECT_LABELS[subjectKind]} *</Label>
                <SubjectPicker
                  key={subjectKind}
                  kind={subjectKind}
                  organizationId={organizationId}
                  value={subject}
                  onChange={setSubject}
                />
              </div>
            </div>
            <p className="text-xs text-muted-foreground">
              {subjectKind === "client" && "This one client."}
              {subjectKind === "app" && "Every client of this app."}
              {subjectKind === "user" && "Every client of this user."}
              {subjectKind === "role" && "Every client of a member holding this role."}
            </p>

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
              {isCreating ? "Adding..." : "Add rule"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
