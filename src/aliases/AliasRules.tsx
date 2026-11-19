import { useState } from "react"
import { type AliasRuleFragment, type InstanceAliasFragment } from "@/graphql/fragments/alias.generated"
import { useDeleteAliasRuleMutation } from "@/graphql/mutations/alias.generated"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card"
import { Badge } from "../components/ui/badge"
import { Button } from "../components/ui/button"
import { ConfirmActionDialog } from "../components/ConfirmActionDialog"
import { AdminOnly } from "../components/AdminOnly"
import { ListFilter, Trash2 } from "lucide-react"
import { toast } from "sonner"
import { toastError } from "@/lib/errors"
import { CreateAliasRuleDialog } from "./CreateAliasRuleDialog"
import { RULE_SUBJECT_LABELS, type RuleSubjectKind } from "./aliasRuleSubjects"

/** Which subject a rule names (exactly one is set), and how to show it. */
function ruleSubject(rule: AliasRuleFragment): { kind: RuleSubjectKind; name: string } {
  if (rule.client) return { kind: "client", name: rule.client.name }
  if (rule.app) return { kind: "app", name: rule.app.name || String(rule.app.identifier) }
  if (rule.user) return { kind: "user", name: rule.user.username }
  if (rule.role) return { kind: "role", name: rule.role.identifier }
  // The subject was deleted or is not visible to us.
  return { kind: "client", name: "Unknown" }
}

function DeleteAliasRuleButton({ rule, label }: { rule: AliasRuleFragment; label: string }) {
  const [open, setOpen] = useState(false)
  const [deleteAliasRule] = useDeleteAliasRuleMutation()

  const handleDelete = async () => {
    try {
      await deleteAliasRule({
        variables: { input: { id: rule.id } },
        refetchQueries: ["DetailInstanceAlias"],
        awaitRefetchQueries: true,
      })
      toast.success("Rule deleted")
    } catch (err) {
      toastError(err, "Couldn't delete the rule")
      return false
    }
  }

  return (
    <>
      <Button variant="ghost" size="sm" onClick={() => setOpen(true)} aria-label={`Delete rule for ${label}`}>
        <Trash2 className="h-4 w-4" />
      </Button>
      <ConfirmActionDialog
        open={open}
        onOpenChange={setOpen}
        title={<>Delete the rule for {label}?</>}
        description="These clients get the alias as everyone else does again."
        confirmLabel="Delete rule"
        pendingLabel="Deleting..."
        destructive
        onConfirm={handleDelete}
      />
    </>
  )
}

export function AliasRules({ alias }: { alias: InstanceAliasFragment }) {
  return (
    <Card>
      <CardHeader>
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="space-y-1">
            <CardTitle className="flex items-center gap-2">
              <ListFilter className="h-4 w-4" />
              Rules
            </CardTitle>
            <CardDescription>
              Disable or re-rank this alias for some clients. The most specific rule wins (client, then app, then
              user, then role). Rules decide routing, not access.
            </CardDescription>
          </div>
          <AdminOnly orgId={alias.organization.id}>
            <CreateAliasRuleDialog aliasId={alias.id} organizationId={alias.organization.id} />
          </AdminOnly>
        </div>
      </CardHeader>
      <CardContent>
        {alias.rules.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            {alias.enabled
              ? `No rules: every client gets this alias at priority ${alias.effectivePriority}.`
              : "No rules. This alias is disabled, so no client is handed it."}
          </p>
        ) : (
          <div className="divide-y rounded-md border">
            {alias.rules.map((rule) => {
              const subject = ruleSubject(rule)
              const label = `${RULE_SUBJECT_LABELS[subject.kind].toLowerCase()} ${subject.name}`
              return (
                <div key={rule.id} className="flex items-center justify-between gap-3 p-3">
                  <div className="flex min-w-0 items-center gap-2">
                    <Badge variant="outline" className="text-xs">
                      {RULE_SUBJECT_LABELS[subject.kind]}
                    </Badge>
                    <span className="truncate font-medium">{subject.name}</span>
                  </div>
                  <div className="flex shrink-0 items-center gap-2">
                    {rule.effect === "disable" ? (
                      <Badge variant="destructive" className="text-xs">
                        disabled
                      </Badge>
                    ) : (
                      <Badge variant="secondary" className="text-xs font-mono">
                        priority {rule.priority}
                      </Badge>
                    )}
                    <AdminOnly orgId={alias.organization.id}>
                      <DeleteAliasRuleButton rule={rule} label={label} />
                    </AdminOnly>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
