import type * as Types from '../../api/types';
import type { DocumentNode } from 'graphql';
import { ListRoleFragmentDoc } from '../fragments/role.generated';
import { RoleSetFragmentDoc } from '../fragments/role_set.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type OrganizationRoleSetsQueryVariables = Types.Exact<{
  id: Types.Scalars['ID']['input'];
}>;

export type OrganizationRoleSetsQuery = { __typename?: 'Query', organization: { __typename?: 'ManagementOrganization', id: string, name?: string | null, amIOwner: boolean, roles: Array<{ __typename?: 'ManagementRole', id: string, description: string, identifier: string }>, roleSets: Array<{ __typename?: 'ManagementRoleSet', id: string, name: string, roles: Array<{ __typename?: 'ManagementRole', id: string, description: string, identifier: string }> }> } };

export const OrganizationRoleSetsDocument = {"kind":"Document", "definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"OrganizationRoleSets"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"organization"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"amIOwner"}},{"kind":"Field","name":{"kind":"Name","value":"roles"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ListRole"}}]}},{"kind":"Field","name":{"kind":"Name","value":"roleSets"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"RoleSet"}}]}}]}}]}},...ListRoleFragmentDoc.definitions,...RoleSetFragmentDoc.definitions]} as unknown as DocumentNode;

/**
 * __useOrganizationRoleSetsQuery__
 *
 * To run a query within a React component, call `useOrganizationRoleSetsQuery` and pass it any options that fit your needs.
 * When your component renders, `useOrganizationRoleSetsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useOrganizationRoleSetsQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useOrganizationRoleSetsQuery(baseOptions: Apollo.QueryHookOptions<OrganizationRoleSetsQuery, OrganizationRoleSetsQueryVariables> & ({ variables: OrganizationRoleSetsQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<OrganizationRoleSetsQuery, OrganizationRoleSetsQueryVariables>(OrganizationRoleSetsDocument, options);
      }
export function useOrganizationRoleSetsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<OrganizationRoleSetsQuery, OrganizationRoleSetsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<OrganizationRoleSetsQuery, OrganizationRoleSetsQueryVariables>(OrganizationRoleSetsDocument, options);
        }
// @ts-ignore
export function useOrganizationRoleSetsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<OrganizationRoleSetsQuery, OrganizationRoleSetsQueryVariables>): Apollo.UseSuspenseQueryResult<OrganizationRoleSetsQuery, OrganizationRoleSetsQueryVariables>;
export function useOrganizationRoleSetsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<OrganizationRoleSetsQuery, OrganizationRoleSetsQueryVariables>): Apollo.UseSuspenseQueryResult<OrganizationRoleSetsQuery | undefined, OrganizationRoleSetsQueryVariables>;
export function useOrganizationRoleSetsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<OrganizationRoleSetsQuery, OrganizationRoleSetsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<OrganizationRoleSetsQuery, OrganizationRoleSetsQueryVariables>(OrganizationRoleSetsDocument, options);
        }
export type OrganizationRoleSetsQueryHookResult = ReturnType<typeof useOrganizationRoleSetsQuery>;
export type OrganizationRoleSetsLazyQueryHookResult = ReturnType<typeof useOrganizationRoleSetsLazyQuery>;
export type OrganizationRoleSetsSuspenseQueryHookResult = ReturnType<typeof useOrganizationRoleSetsSuspenseQuery>;
export type OrganizationRoleSetsQueryResult = Apollo.QueryResult<OrganizationRoleSetsQuery, OrganizationRoleSetsQueryVariables>;