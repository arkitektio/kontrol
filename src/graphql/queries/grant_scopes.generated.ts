import type * as Types from '../../api/types';
import type { DocumentNode } from 'graphql';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GrantScopesQueryVariables = Types.Exact<{
  organization: Types.Scalars['ID']['input'];
}>;

export type GrantScopesQuery = { __typename?: 'Query', scopes: Array<{ __typename?: 'ManagementScope', id: string, identifier: string, description: string, isAllScope: boolean, creatingInstance?: { __typename?: 'ManagementServiceInstance', id: string, release: { __typename?: 'ManagementServiceRelease', id: string, service: { __typename?: 'ManagementService', id: string, name: string, identifier: any } } } | null }> };

export const GrantScopesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GrantScopes"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"organization"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"scopes"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filters"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"organization"},"value":{"kind":"Variable","name":{"kind":"Name","value":"organization"}}}]}},{"kind":"Argument","name":{"kind":"Name","value":"pagination"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"limit"},"value":{"kind":"IntValue","value":"1000"}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"identifier"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"isAllScope"}},{"kind":"Field","name":{"kind":"Name","value":"creatingInstance"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"release"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"service"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"identifier"}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode;

/**
 * __useGrantScopesQuery__
 *
 * To run a query within a React component, call `useGrantScopesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGrantScopesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGrantScopesQuery({
 *   variables: {
 *      organization: // value for 'organization'
 *   },
 * });
 */
export function useGrantScopesQuery(baseOptions: Apollo.QueryHookOptions<GrantScopesQuery, GrantScopesQueryVariables> & ({ variables: GrantScopesQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GrantScopesQuery, GrantScopesQueryVariables>(GrantScopesDocument, options);
      }
export function useGrantScopesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GrantScopesQuery, GrantScopesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GrantScopesQuery, GrantScopesQueryVariables>(GrantScopesDocument, options);
        }
// @ts-ignore
export function useGrantScopesSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GrantScopesQuery, GrantScopesQueryVariables>): Apollo.UseSuspenseQueryResult<GrantScopesQuery, GrantScopesQueryVariables>;
export function useGrantScopesSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GrantScopesQuery, GrantScopesQueryVariables>): Apollo.UseSuspenseQueryResult<GrantScopesQuery | undefined, GrantScopesQueryVariables>;
export function useGrantScopesSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GrantScopesQuery, GrantScopesQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GrantScopesQuery, GrantScopesQueryVariables>(GrantScopesDocument, options);
        }
export type GrantScopesQueryHookResult = ReturnType<typeof useGrantScopesQuery>;
export type GrantScopesLazyQueryHookResult = ReturnType<typeof useGrantScopesLazyQuery>;
export type GrantScopesSuspenseQueryHookResult = ReturnType<typeof useGrantScopesSuspenseQuery>;
export type GrantScopesQueryResult = Apollo.QueryResult<GrantScopesQuery, GrantScopesQueryVariables>;