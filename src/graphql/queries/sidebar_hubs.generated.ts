import type * as Types from '../../api/types';
import type { DocumentNode } from 'graphql';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type SidebarHubsQueryVariables = Types.Exact<{
  filters?: Types.InputMaybe<Types.ManagementHubFilter>;
}>;

export type SidebarHubsQuery = { __typename?: 'Query', hubs: Array<{ __typename?: 'ManagementHub', id: string, name: string }> };

export const SidebarHubsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"SidebarHubs"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filters"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ManagementHubFilter"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"hubs"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filters"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filters"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode;

/**
 * __useSidebarHubsQuery__
 *
 * To run a query within a React component, call `useSidebarHubsQuery` and pass it any options that fit your needs.
 * When your component renders, `useSidebarHubsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSidebarHubsQuery({
 *   variables: {
 *      filters: // value for 'filters'
 *   },
 * });
 */
export function useSidebarHubsQuery(baseOptions?: Apollo.QueryHookOptions<SidebarHubsQuery, SidebarHubsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SidebarHubsQuery, SidebarHubsQueryVariables>(SidebarHubsDocument, options);
      }
export function useSidebarHubsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SidebarHubsQuery, SidebarHubsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SidebarHubsQuery, SidebarHubsQueryVariables>(SidebarHubsDocument, options);
        }
// @ts-ignore
export function useSidebarHubsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<SidebarHubsQuery, SidebarHubsQueryVariables>): Apollo.UseSuspenseQueryResult<SidebarHubsQuery, SidebarHubsQueryVariables>;
export function useSidebarHubsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<SidebarHubsQuery, SidebarHubsQueryVariables>): Apollo.UseSuspenseQueryResult<SidebarHubsQuery | undefined, SidebarHubsQueryVariables>;
export function useSidebarHubsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<SidebarHubsQuery, SidebarHubsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<SidebarHubsQuery, SidebarHubsQueryVariables>(SidebarHubsDocument, options);
        }
export type SidebarHubsQueryHookResult = ReturnType<typeof useSidebarHubsQuery>;
export type SidebarHubsLazyQueryHookResult = ReturnType<typeof useSidebarHubsLazyQuery>;
export type SidebarHubsSuspenseQueryHookResult = ReturnType<typeof useSidebarHubsSuspenseQuery>;
export type SidebarHubsQueryResult = Apollo.QueryResult<SidebarHubsQuery, SidebarHubsQueryVariables>;