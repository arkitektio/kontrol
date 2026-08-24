import type * as Types from '../../api/types';
import type { DocumentNode } from 'graphql';
import { ListRoleFragmentDoc, RoleFragmentDoc } from '../fragments/role.generated';
import { ListServiceInstanceFragmentDoc } from '../fragments/service_instance.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type RolesQueryVariables = Types.Exact<{
  filters?: Types.InputMaybe<Types.ManagementRoleFilter>;
  ordering?: Types.InputMaybe<Array<Types.ManagementRoleOrdering> | Types.ManagementRoleOrdering>;
  pagination?: Types.InputMaybe<Types.OffsetPaginationInput>;
}>;

export type RolesQuery = { __typename?: 'Query', roles: Array<{ __typename?: 'ManagementRole', id: string, description: string, identifier: string }> };

export type GetRoleQueryVariables = Types.Exact<{
  id: Types.Scalars['ID']['input'];
}>;

export type GetRoleQuery = { __typename?: 'Query', role: { __typename?: 'ManagementRole', id: string, identifier: string, description: string, creatingInstance?: { __typename?: 'ManagementServiceInstance', id: string, identifier: string, release: { __typename?: 'ManagementServiceRelease', id: string, version: string, service: { __typename?: 'ManagementService', id: string, identifier: any, logo?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null } }, organization: { __typename?: 'ManagementOrganization', id: string } } | null, organization: { __typename?: 'ManagementOrganization', id: string }, usedBy: Array<{ __typename?: 'ManagementServiceInstance', id: string, identifier: string, release: { __typename?: 'ManagementServiceRelease', id: string, version: string, service: { __typename?: 'ManagementService', id: string, identifier: any, logo?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null } }, organization: { __typename?: 'ManagementOrganization', id: string } }> } };

export const RolesDocument = {"kind":"Document", "definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Roles"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filters"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ManagementRoleFilter"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"ordering"}},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ManagementRoleOrdering"}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pagination"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"OffsetPaginationInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"roles"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filters"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filters"}}},{"kind":"Argument","name":{"kind":"Name","value":"ordering"},"value":{"kind":"Variable","name":{"kind":"Name","value":"ordering"}}},{"kind":"Argument","name":{"kind":"Name","value":"pagination"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pagination"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ListRole"}}]}}]}},...ListRoleFragmentDoc.definitions]} as unknown as DocumentNode;

/**
 * __useRolesQuery__
 *
 * To run a query within a React component, call `useRolesQuery` and pass it any options that fit your needs.
 * When your component renders, `useRolesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useRolesQuery({
 *   variables: {
 *      filters: // value for 'filters'
 *      ordering: // value for 'ordering'
 *      pagination: // value for 'pagination'
 *   },
 * });
 */
export function useRolesQuery(baseOptions?: Apollo.QueryHookOptions<RolesQuery, RolesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<RolesQuery, RolesQueryVariables>(RolesDocument, options);
      }
export function useRolesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<RolesQuery, RolesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<RolesQuery, RolesQueryVariables>(RolesDocument, options);
        }
// @ts-ignore
export function useRolesSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<RolesQuery, RolesQueryVariables>): Apollo.UseSuspenseQueryResult<RolesQuery, RolesQueryVariables>;
export function useRolesSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<RolesQuery, RolesQueryVariables>): Apollo.UseSuspenseQueryResult<RolesQuery | undefined, RolesQueryVariables>;
export function useRolesSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<RolesQuery, RolesQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<RolesQuery, RolesQueryVariables>(RolesDocument, options);
        }
export type RolesQueryHookResult = ReturnType<typeof useRolesQuery>;
export type RolesLazyQueryHookResult = ReturnType<typeof useRolesLazyQuery>;
export type RolesSuspenseQueryHookResult = ReturnType<typeof useRolesSuspenseQuery>;
export type RolesQueryResult = Apollo.QueryResult<RolesQuery, RolesQueryVariables>;
export const GetRoleDocument = {"kind":"Document", "definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetRole"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"role"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Role"}}]}}]}},...RoleFragmentDoc.definitions,...ListServiceInstanceFragmentDoc.definitions]} as unknown as DocumentNode;

/**
 * __useGetRoleQuery__
 *
 * To run a query within a React component, call `useGetRoleQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetRoleQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetRoleQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetRoleQuery(baseOptions: Apollo.QueryHookOptions<GetRoleQuery, GetRoleQueryVariables> & ({ variables: GetRoleQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetRoleQuery, GetRoleQueryVariables>(GetRoleDocument, options);
      }
export function useGetRoleLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetRoleQuery, GetRoleQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetRoleQuery, GetRoleQueryVariables>(GetRoleDocument, options);
        }
// @ts-ignore
export function useGetRoleSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetRoleQuery, GetRoleQueryVariables>): Apollo.UseSuspenseQueryResult<GetRoleQuery, GetRoleQueryVariables>;
export function useGetRoleSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetRoleQuery, GetRoleQueryVariables>): Apollo.UseSuspenseQueryResult<GetRoleQuery | undefined, GetRoleQueryVariables>;
export function useGetRoleSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetRoleQuery, GetRoleQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetRoleQuery, GetRoleQueryVariables>(GetRoleDocument, options);
        }
export type GetRoleQueryHookResult = ReturnType<typeof useGetRoleQuery>;
export type GetRoleLazyQueryHookResult = ReturnType<typeof useGetRoleLazyQuery>;
export type GetRoleSuspenseQueryHookResult = ReturnType<typeof useGetRoleSuspenseQuery>;
export type GetRoleQueryResult = Apollo.QueryResult<GetRoleQuery, GetRoleQueryVariables>;