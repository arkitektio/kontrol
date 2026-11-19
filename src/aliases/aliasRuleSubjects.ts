export type RuleSubjectKind = "client" | "app" | "user" | "role"

export const RULE_SUBJECT_LABELS: Record<RuleSubjectKind, string> = {
  client: "Client",
  app: "App",
  user: "User",
  role: "Role",
}
