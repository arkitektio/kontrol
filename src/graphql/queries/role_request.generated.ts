import type * as Types from '../../api/types';
import type { DocumentNode } from 'graphql';
import { RoleRequestFragmentDoc } from '../fragments/role_request.generated';
import { ListRoleFragmentDoc } from '../fragments/role.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type RoleRequestsQueryVariables = Types.Exact<{
  filters?: Types.InputMaybe<Types.ManagementRoleRequestFilter>;
  ordering?: Types.InputMaybe<Array<Types.ManagementRoleRequestOrdering> | Types.ManagementRoleRequestOrdering>;
  pagination?: Types.InputMaybe<Types.OffsetPaginationInput>;
}>;

export type RoleRequestsQuery = { __typename?: 'Query', roleRequests: Array<{ __typename?: 'ManagementRoleRequest', id: string, status: string, reason?: string | null, createdAt: any, respondedAt?: any | null, role: { __typename?: 'ManagementRole', id: string, description: string, identifier: string }, membership: { __typename?: 'ManagementMembership', id: string, user: { __typename?: 'ManagementUser', id: string, username: string, profile: { __typename?: 'ManagementProfile', id: string, avatar?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null } } } }> };

export const RoleRequestsDocument = {"kind":"Document", "definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"RoleRequests"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filters"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ManagementRoleRequestFilter"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"ordering"}},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ManagementRoleRequestOrdering"}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pagination"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"OffsetPaginationInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"roleRequests"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filters"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filters"}}},{"kind":"Argument","name":{"kind":"Name","value":"ordering"},"value":{"kind":"Variable","name":{"kind":"Name","value":"ordering"}}},{"kind":"Argument","name":{"kind":"Name","value":"pagination"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pagination"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"RoleRequest"}}]}}]}},...RoleRequestFragmentDoc.definitions,...ListRoleFragmentDoc.definitions]} as unknown as DocumentNode;

/**
 * __useRoleRequestsQuery__
 *
 * To run a query within a React component, call `useRoleRequestsQuery` and pass it any options that fit your needs.
 * When your component renders, `useRoleRequestsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useRoleRequestsQuery({
 *   variables: {
 *      filters: // value for 'filters'
 *      ordering: // value for 'ordering'
 *      pagination: // value for 'pagination'
 *   },
 * });
 */
export function useRoleRequestsQuery(baseOptions?: Apollo.QueryHookOptions<RoleRequestsQuery, RoleRequestsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<RoleRequestsQuery, RoleRequestsQueryVariables>(RoleRequestsDocument, options);
      }
export function useRoleRequestsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<RoleRequestsQuery, RoleRequestsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<RoleRequestsQuery, RoleRequestsQueryVariables>(RoleRequestsDocument, options);
        }
// @ts-ignore
export function useRoleRequestsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<RoleRequestsQuery, RoleRequestsQueryVariables>): Apollo.UseSuspenseQueryResult<RoleRequestsQuery, RoleRequestsQueryVariables>;
export function useRoleRequestsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<RoleRequestsQuery, RoleRequestsQueryVariables>): Apollo.UseSuspenseQueryResult<RoleRequestsQuery | undefined, RoleRequestsQueryVariables>;
export function useRoleRequestsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<RoleRequestsQuery, RoleRequestsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<RoleRequestsQuery, RoleRequestsQueryVariables>(RoleRequestsDocument, options);
        }
export type RoleRequestsQueryHookResult = ReturnType<typeof useRoleRequestsQuery>;
export type RoleRequestsLazyQueryHookResult = ReturnType<typeof useRoleRequestsLazyQuery>;
export type RoleRequestsSuspenseQueryHookResult = ReturnType<typeof useRoleRequestsSuspenseQuery>;
export type RoleRequestsQueryResult = Apollo.QueryResult<RoleRequestsQuery, RoleRequestsQueryVariables>;