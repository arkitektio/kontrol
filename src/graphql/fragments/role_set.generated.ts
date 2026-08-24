
import type { DocumentNode } from 'graphql';

export type RoleSetFragment = { __typename?: 'ManagementRoleSet', id: string, name: string, roles: Array<{ __typename?: 'ManagementRole', id: string, description: string, identifier: string }> };

export const RoleSetFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"RoleSet"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ManagementRoleSet"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"roles"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ListRole"}}]}}]}}]} as unknown as DocumentNode;