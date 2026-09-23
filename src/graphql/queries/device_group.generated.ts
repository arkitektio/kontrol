import type * as Types from '../../api/types';
import type { DocumentNode } from 'graphql';
import { ListDeviceGroupFragmentDoc, DetailDeviceGroupFragmentDoc } from '../fragments/device_group.generated';
import { ListDeviceFragmentDoc } from '../fragments/device.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type ListDeviceGroupsQueryVariables = Types.Exact<{
  pagination?: Types.InputMaybe<Types.OffsetPaginationInput>;
  filters?: Types.InputMaybe<Types.ManagementDeviceGroupFilter>;
  ordering?: Types.InputMaybe<Array<Types.ManagementDeviceGroupOrdering> | Types.ManagementDeviceGroupOrdering>;
}>;

export type ListDeviceGroupsQuery = { __typename?: 'Query', deviceGroups: Array<{ __typename?: 'ManagementDeviceGroup', id: string, name: string, devices: Array<{ __typename?: 'ManagementDevice', id: string }> }> };

export type GetDeviceGroupQueryVariables = Types.Exact<{
  id: Types.Scalars['ID']['input'];
}>;

export type GetDeviceGroupQuery = { __typename?: 'Query', deviceGroup: { __typename?: 'ManagementDeviceGroup', id: string, name: string, devices: Array<{ __typename?: 'ManagementDevice', id: string, name?: string | null, nodeId: string, deviceId: string, organization: { __typename?: 'ManagementOrganization', id: string }, clients: Array<{ __typename?: 'ManagementClient', id: string }>, deviceGroups: Array<{ __typename?: 'ManagementDeviceGroup', id: string, name: string, devices: Array<{ __typename?: 'ManagementDevice', id: string }> }> }> } };

export const ListDeviceGroupsDocument = {"kind":"Document", "definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ListDeviceGroups"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pagination"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"OffsetPaginationInput"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filters"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ManagementDeviceGroupFilter"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"ordering"}},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ManagementDeviceGroupOrdering"}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deviceGroups"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"pagination"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pagination"}}},{"kind":"Argument","name":{"kind":"Name","value":"filters"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filters"}}},{"kind":"Argument","name":{"kind":"Name","value":"ordering"},"value":{"kind":"Variable","name":{"kind":"Name","value":"ordering"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ListDeviceGroup"}}]}}]}},...ListDeviceGroupFragmentDoc.definitions]} as unknown as DocumentNode;

/**
 * __useListDeviceGroupsQuery__
 *
 * To run a query within a React component, call `useListDeviceGroupsQuery` and pass it any options that fit your needs.
 * When your component renders, `useListDeviceGroupsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useListDeviceGroupsQuery({
 *   variables: {
 *      pagination: // value for 'pagination'
 *      filters: // value for 'filters'
 *      ordering: // value for 'ordering'
 *   },
 * });
 */
export function useListDeviceGroupsQuery(baseOptions?: Apollo.QueryHookOptions<ListDeviceGroupsQuery, ListDeviceGroupsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ListDeviceGroupsQuery, ListDeviceGroupsQueryVariables>(ListDeviceGroupsDocument, options);
      }
export function useListDeviceGroupsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ListDeviceGroupsQuery, ListDeviceGroupsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ListDeviceGroupsQuery, ListDeviceGroupsQueryVariables>(ListDeviceGroupsDocument, options);
        }
// @ts-ignore
export function useListDeviceGroupsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<ListDeviceGroupsQuery, ListDeviceGroupsQueryVariables>): Apollo.UseSuspenseQueryResult<ListDeviceGroupsQuery, ListDeviceGroupsQueryVariables>;
export function useListDeviceGroupsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<ListDeviceGroupsQuery, ListDeviceGroupsQueryVariables>): Apollo.UseSuspenseQueryResult<ListDeviceGroupsQuery | undefined, ListDeviceGroupsQueryVariables>;
export function useListDeviceGroupsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<ListDeviceGroupsQuery, ListDeviceGroupsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ListDeviceGroupsQuery, ListDeviceGroupsQueryVariables>(ListDeviceGroupsDocument, options);
        }
export type ListDeviceGroupsQueryHookResult = ReturnType<typeof useListDeviceGroupsQuery>;
export type ListDeviceGroupsLazyQueryHookResult = ReturnType<typeof useListDeviceGroupsLazyQuery>;
export type ListDeviceGroupsSuspenseQueryHookResult = ReturnType<typeof useListDeviceGroupsSuspenseQuery>;
export type ListDeviceGroupsQueryResult = Apollo.QueryResult<ListDeviceGroupsQuery, ListDeviceGroupsQueryVariables>;
export const GetDeviceGroupDocument = {"kind":"Document", "definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetDeviceGroup"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deviceGroup"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"DetailDeviceGroup"}}]}}]}},...DetailDeviceGroupFragmentDoc.definitions,...ListDeviceFragmentDoc.definitions,...ListDeviceGroupFragmentDoc.definitions]} as unknown as DocumentNode;

/**
 * __useGetDeviceGroupQuery__
 *
 * To run a query within a React component, call `useGetDeviceGroupQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetDeviceGroupQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetDeviceGroupQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetDeviceGroupQuery(baseOptions: Apollo.QueryHookOptions<GetDeviceGroupQuery, GetDeviceGroupQueryVariables> & ({ variables: GetDeviceGroupQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetDeviceGroupQuery, GetDeviceGroupQueryVariables>(GetDeviceGroupDocument, options);
      }
export function useGetDeviceGroupLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetDeviceGroupQuery, GetDeviceGroupQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetDeviceGroupQuery, GetDeviceGroupQueryVariables>(GetDeviceGroupDocument, options);
        }
// @ts-ignore
export function useGetDeviceGroupSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetDeviceGroupQuery, GetDeviceGroupQueryVariables>): Apollo.UseSuspenseQueryResult<GetDeviceGroupQuery, GetDeviceGroupQueryVariables>;
export function useGetDeviceGroupSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetDeviceGroupQuery, GetDeviceGroupQueryVariables>): Apollo.UseSuspenseQueryResult<GetDeviceGroupQuery | undefined, GetDeviceGroupQueryVariables>;
export function useGetDeviceGroupSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetDeviceGroupQuery, GetDeviceGroupQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetDeviceGroupQuery, GetDeviceGroupQueryVariables>(GetDeviceGroupDocument, options);
        }
export type GetDeviceGroupQueryHookResult = ReturnType<typeof useGetDeviceGroupQuery>;
export type GetDeviceGroupLazyQueryHookResult = ReturnType<typeof useGetDeviceGroupLazyQuery>;
export type GetDeviceGroupSuspenseQueryHookResult = ReturnType<typeof useGetDeviceGroupSuspenseQuery>;
export type GetDeviceGroupQueryResult = Apollo.QueryResult<GetDeviceGroupQuery, GetDeviceGroupQueryVariables>;