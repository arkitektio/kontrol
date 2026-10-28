import { useGrantScopesQuery, type GrantScopesQuery } from "@/graphql/queries/grant_scopes.generated";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

type GrantScope = GrantScopesQuery["scopes"][number];

// lok makes the OIDC scopes in every organization but gives them no description
// (the server then echoes the key back), so say here what they hand an app.
const OIDC_DESCRIPTIONS: Record<string, string> = {
  openid: "Sign you in and know who you are.",
  profile: "See your name, username and avatar.",
  email: "See your email address.",
  groups: "See which groups you belong to in the organization.",
  roles: "See which roles you hold in the organization.",
};

const describe = (scope: GrantScope | undefined, key: string) => {
  if (scope && scope.description && scope.description !== scope.identifier) return scope.description;
  return OIDC_DESCRIPTIONS[key] ?? null;
};

// Services often register with their reverse-DNS identifier as the name
// (`live.arkitekt.mikro`): show the last segment, capitalized.
const serviceLabel = (name: string) => {
  const last = name.includes(".") ? name.split(".").pop()! : name;
  return last.charAt(0).toUpperCase() + last.slice(1);
};

interface Group {
  name: string;
  /** The requested all-scope of this service, if the app asked for one: it covers the rest. */
  all: GrantScope | null;
  scopes: { key: string; scope: GrantScope }[];
}

/**
 * What an app asks to do, scope by scope, in the words the organization's
 * services (and lok itself) describe them with. Scopes are per organization, so
 * the list re-resolves when the user picks another one; a key the organization
 * doesn't define grants nothing there, and lok skips it rather than refusing.
 */
export function RequestedScopes({
  keys,
  organizationId,
  newKeys,
}: {
  keys: string[];
  organizationId: string | null | undefined;
  /** Keys the app didn't hold before (a re-authorization): flagged as new. */
  newKeys?: Set<string>;
}) {
  const { data, loading } = useGrantScopesQuery({
    variables: { organization: organizationId ?? "" },
    skip: !organizationId,
  });

  const unique = [...new Set(keys)];

  if (!organizationId || (loading && !data)) {
    return organizationId ? (
      <div className="space-y-2">
        {unique.map((k) => <Skeleton key={k} className="h-10 w-full" />)}
      </div>
    ) : (
      <BareKeys keys={unique} newKeys={newKeys} />
    );
  }

  const offered = data?.scopes ?? [];
  // A guest (or a failed lookup) sees no scopes at all: we can't tell what the
  // organization offers then, so show the keys rather than call them all missing.
  if (offered.length === 0) return <BareKeys keys={unique} newKeys={newKeys} />;

  const byKey = new Map(offered.map((s) => [s.identifier, s]));
  const groups = new Map<string, Group>();
  const missing: string[] = [];
  for (const key of unique) {
    const scope = byKey.get(key);
    if (!scope) {
      missing.push(key);
      continue;
    }
    // lok's own and the OIDC scopes have no creating instance.
    const service = scope.creatingInstance?.release.service;
    const id = service?.identifier ?? "";
    const group = groups.get(id) ?? { name: service ? serviceLabel(service.name) : "Lok", all: null, scopes: [] };
    if (scope.isAllScope) group.all = scope;
    else group.scopes.push({ key, scope });
    groups.set(id, group);
  }

  // lok's own (and the OIDC) scopes first, then the services alphabetically.
  const ordered = [...groups.entries()]
    .sort(([a, ga], [b, gb]) => (a === "" ? -1 : b === "" ? 1 : ga.name.localeCompare(gb.name)))
    .map(([id, group]) => ({ id, ...group }));

  return (
    <div className="space-y-3">
      {ordered.map((group) => (
        <div key={group.id}>
          <p className="text-muted-foreground text-xs font-medium">{group.name}</p>
          <ul className="mt-1 list-disc space-y-0.5 pl-5 text-sm">
            {group.all ? (
              // Full access covers whatever else the app asked of this service.
              <ScopeItem
                scopeKey={group.all.identifier}
                description={describe(group.all, group.all.identifier) ?? `Do everything in ${group.name} on your behalf.`}
                bold
                isNew={newKeys?.has(group.all.identifier)}
              />
            ) : (
              group.scopes.map(({ key, scope }) => (
                <ScopeItem key={key} scopeKey={key} description={describe(scope, key)} isNew={newKeys?.has(key)} />
              ))
            )}
          </ul>
        </div>
      ))}

      {missing.length > 0 && (
        <p className="text-muted-foreground text-xs">
          Not offered in this organization, so not granted: <span className="font-mono">{missing.join(", ")}</span>
        </p>
      )}
    </div>
  );
}

/** A scope's description, its key on hover. */
function ScopeItem({
  scopeKey,
  description,
  bold,
  isNew,
}: {
  scopeKey: string;
  description: string | null;
  bold?: boolean;
  isNew?: boolean;
}) {
  return (
    <li title={scopeKey} className={cn(bold && "font-bold")}>
      {description ?? <code>{scopeKey}</code>}
      {isNew && <span className="text-destructive ml-1.5 text-xs font-medium">new</span>}
    </li>
  );
}

function BareKeys({ keys, newKeys }: { keys: string[]; newKeys?: Set<string> }) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {keys.map((k) => (
        <Badge key={k} variant={newKeys?.has(k) ? "destructive" : "secondary"} className="font-mono text-xs">
          {k}
          {newKeys?.has(k) && <span className="font-sans opacity-80">new</span>}
        </Badge>
      ))}
    </div>
  );
}
