import type { GrantScopesQuery } from "@/graphql/queries/grant_scopes.generated";

type GrantScope = GrantScopesQuery["scopes"][number];

/** A scope that doesn't exist yet but will once the request is accepted (a hub's own service declares it). */
export interface StagedScope {
  key: string;
  description?: string | null;
  /** The declaring service's identifier (`live.arkitekt.rekuest`). */
  service: string;
  isAll?: boolean;
}

// Services often register with their reverse-DNS identifier as the name
// (`live.arkitekt.mikro`): show the last segment, capitalized.
export const serviceLabel = (name: string) => {
  const last = name.includes(".") ? name.split(".").pop()! : name;
  return last.charAt(0).toUpperCase() + last.slice(1);
};

/**
 * Which of ``keys`` neither the organization offers nor ``staged`` will create.
 * ``null`` while that can't be told (no organization yet, still loading, or the
 * caller may not list the organization's scopes).
 */
export function unresolvedScopes(
  keys: string[],
  offered: Pick<GrantScope, "identifier">[] | undefined,
  staged: StagedScope[] = [],
): string[] | null {
  if (!offered || offered.length === 0) return null;
  const known = new Set([...offered.map((s) => s.identifier), ...staged.map((s) => s.key)]);
  return [...new Set(keys)].filter((k) => !known.has(k));
}
