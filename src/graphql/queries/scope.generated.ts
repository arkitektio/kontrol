import type * as Types from '../../api/types';
import type { DocumentNode } from 'graphql';
import { ListScopeFragmentDoc, ScopeFragmentDoc } from '../fragments/scope.generated';
import { ListServiceInstanceFragmentDoc } from '../fragments/service_instance.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type ScopesQueryVariables = Types.Exact<{
  filters?: Types.InputMaybe<Types.ManagementScopeFilter>;
  ordering?: Types.InputMaybe<Array<Types.ManagementScopeOrdering> | Types.ManagementScopeOrdering>;
  pagination?: Types.InputMaybe<Types.OffsetPaginationInput>;
}>;

export type ScopesQuery = { __typename?: 'Query', scopes: Array<{ __typename?: 'ManagementScope', id: string, description: string, identifier: string }> };

export type DeteilScopeQueryVariables = Types.Exact<{
  id: Types.Scalars['ID']['input'];
}>;

export type DeteilScopeQuery = { __typename?: 'Query', scope: { __typename?: 'ManagementScope', id: string, description: string, identifier: string, creatingInstance?: { __typename?: 'ManagementServiceInstance', id: string, identifier: string, allowedUsers: Array<{ __typename?: 'ManagementUser', id: string }>, release: { __typename?: 'ManagementServiceRelease', id: string, version: string, service: { __typename?: 'ManagementService', id: string, identifier: any, logo?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null } }, organization: { __typename?: 'ManagementOrganization', id: string } } | null, organization: { __typename?: 'ManagementOrganization', id: string }, usedBy: Array<{ __typename?: 'ManagementServiceInstance', id: string, identifier: string, allowedUsers: Array<{ __typename?: 'ManagementUser', id: string }>, release: { __typename?: 'ManagementServiceRelease', id: string, version: string, service: { __typename?: 'ManagementService', id: string, identifier: any, logo?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null } }, organization: { __typename?: 'ManagementOrganization', id: string } }> } };

export const ScopesDocument = {"kind":"Document", "definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Scopes"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filters"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ManagementScopeFilter"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"ordering"}},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ManagementScopeOrdering"}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pagination"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"OffsetPaginationInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"scopes"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filters"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filters"}}},{"kind":"Argument","name":{"kind":"Name","value":"ordering"},"value":{"kind":"Variable","name":{"kind":"Name","value":"ordering"}}},{"kind":"Argument","name":{"kind":"Name","value":"pagination"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pagination"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ListScope"}}]}}]}},...ListScopeFragmentDoc.definitions]} as unknown as DocumentNode;

/**
 * __useScopesQuery__
 *
 * To run a query within a React component, call `useScopesQuery` and pass it any options that fit your needs.
 * When your component renders, `useScopesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useScopesQuery({
 *   variables: {
 *      filters: // value for 'filters'
 *      ordering: // value for 'ordering'
 *      pagination: // value for 'pagination'
 *   },
 * });
 */
export function useScopesQuery(baseOptions?: Apollo.QueryHookOptions<ScopesQuery, ScopesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ScopesQuery, ScopesQueryVariables>(ScopesDocument, options);
      }
export function useScopesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ScopesQuery, ScopesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ScopesQuery, ScopesQueryVariables>(ScopesDocument, options);
        }
// @ts-ignore
export function useScopesSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<ScopesQuery, ScopesQueryVariables>): Apollo.UseSuspenseQueryResult<ScopesQuery, ScopesQueryVariables>;
export function useScopesSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<ScopesQuery, ScopesQueryVariables>): Apollo.UseSuspenseQueryResult<ScopesQuery | undefined, ScopesQueryVariables>;
export function useScopesSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<ScopesQuery, ScopesQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ScopesQuery, ScopesQueryVariables>(ScopesDocument, options);
        }
export type ScopesQueryHookResult = ReturnType<typeof useScopesQuery>;
export type ScopesLazyQueryHookResult = ReturnType<typeof useScopesLazyQuery>;
export type ScopesSuspenseQueryHookResult = ReturnType<typeof useScopesSuspenseQuery>;
export type ScopesQueryResult = Apollo.QueryResult<ScopesQuery, ScopesQueryVariables>;
export const DeteilScopeDocument = {"kind":"Document", "definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"DeteilScope"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"scope"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Scope"}}]}}]}},...ScopeFragmentDoc.definitions,...ListServiceInstanceFragmentDoc.definitions]} as unknown as DocumentNode;

/**
 * __useDeteilScopeQuery__
 *
 * To run a query within a React component, call `useDeteilScopeQuery` and pass it any options that fit your needs.
 * When your component renders, `useDeteilScopeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useDeteilScopeQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeteilScopeQuery(baseOptions: Apollo.QueryHookOptions<DeteilScopeQuery, DeteilScopeQueryVariables> & ({ variables: DeteilScopeQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<DeteilScopeQuery, DeteilScopeQueryVariables>(DeteilScopeDocument, options);
      }
export function useDeteilScopeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<DeteilScopeQuery, DeteilScopeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<DeteilScopeQuery, DeteilScopeQueryVariables>(DeteilScopeDocument, options);
        }
// @ts-ignore
export function useDeteilScopeSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<DeteilScopeQuery, DeteilScopeQueryVariables>): Apollo.UseSuspenseQueryResult<DeteilScopeQuery, DeteilScopeQueryVariables>;
export function useDeteilScopeSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<DeteilScopeQuery, DeteilScopeQueryVariables>): Apollo.UseSuspenseQueryResult<DeteilScopeQuery | undefined, DeteilScopeQueryVariables>;
export function useDeteilScopeSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<DeteilScopeQuery, DeteilScopeQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<DeteilScopeQuery, DeteilScopeQueryVariables>(DeteilScopeDocument, options);
        }
export type DeteilScopeQueryHookResult = ReturnType<typeof useDeteilScopeQuery>;
export type DeteilScopeLazyQueryHookResult = ReturnType<typeof useDeteilScopeLazyQuery>;
export type DeteilScopeSuspenseQueryHookResult = ReturnType<typeof useDeteilScopeSuspenseQuery>;
export type DeteilScopeQueryResult = Apollo.QueryResult<DeteilScopeQuery, DeteilScopeQueryVariables>;