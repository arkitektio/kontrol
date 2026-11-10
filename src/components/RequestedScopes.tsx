import { useGrantScopesQuery, type GrantScopesQuery } from "@/graphql/queries/grant_scopes.generated";
import type { ReactNode } from "react";
import { Badge } from "@/components/ui/badge";
import { serviceLabel, type StagedScope } from "@/lib/scopes";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

type GrantScope = GrantScopesQuery["scopes"][number];


/** An offered or staged scope, in the one shape the list renders. */
interface Resolved {
  identifier: string;
  description: string | null;
  isAllScope: boolean;
  /** "" for lok's own and the OIDC scopes. */
  serviceId: string;
  serviceName: string | null;
}

const fromOffered = (scope: GrantScope): Resolved => {
  const service = scope.creatingInstance?.release.service;
  return {
    identifier: scope.identifier,
    description: scope.description,
    isAllScope: scope.isAllScope,
    serviceId: service?.identifier ?? "",
    serviceName: service?.name ?? null,
  };
};

const fromStaged = (scope: StagedScope): Resolved => ({
  identifier: scope.key,
  description: scope.description ?? null,
  isAllScope: Boolean(scope.isAll),
  serviceId: scope.service,
  serviceName: scope.service,
});


// lok makes the OIDC scopes in every organization but gives them no description
// (the server then echoes the key back), so say here what they hand an app.
const OIDC_DESCRIPTIONS: Record<string, string> = {
  openid: "Sign you in and know who you are.",
  profile: "See your name, username and avatar.",
  email: "See your email address.",
  groups: "See which groups you belong to in the organization.",
  roles: "See which roles you hold in the organization.",
};

const describe = (scope: Resolved | undefined, key: string) => {
  if (scope && scope.description && scope.description !== scope.identifier) return scope.description;
  return OIDC_DESCRIPTIONS[key] ?? null;
};


interface Group {
  name: string;
  /** The requested all-scope of this service, if the app asked for one: it covers the rest. */
  all: Resolved | null;
  scopes: { key: string; scope: Resolved }[];
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
  staged,
  missingNote,
}: {
  keys: string[];
  organizationId: string | null | undefined;
  /** Keys the app didn't hold before (a re-authorization): flagged as new. */
  newKeys?: Set<string>;
  /** Scopes accepting will create (a hub's services): resolved like offered ones. */
  staged?: StagedScope[];
  /** Replaces the default "not granted" line for keys nothing resolves. */
  missingNote?: (missing: string[]) => ReactNode;
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

  // What the organization already has wins: a staged scope it already offers is the same scope.
  const byKey = new Map<string, Resolved>((staged ?? []).map((s) => [s.key, fromStaged(s)]));
  for (const scope of offered) byKey.set(scope.identifier, fromOffered(scope));
  const groups = new Map<string, Group>();
  const missing: string[] = [];
  for (const key of unique) {
    const scope = byKey.get(key);
    if (!scope) {
      missing.push(key);
      continue;
    }
    // lok's own and the OIDC scopes have no creating instance.
    const id = scope.serviceId;
    const group = groups.get(id) ?? { name: scope.serviceName ? serviceLabel(scope.serviceName) : "Lok", all: null, scopes: [] };
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

      {missing.length > 0 && missingNote?.(missing)}
      {missing.length > 0 && !missingNote && (
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
