import type * as Types from '../../api/types';
import type { DocumentNode } from 'graphql';
import { ListServiceInstanceFragmentDoc, ServiceInstanceFragmentDoc } from '../fragments/service_instance.generated';
import { ListUserFragmentDoc } from '../fragments/user.generated';
import { ProfileFragmentDoc } from '../fragments/profile.generated';
import { ListServiceInstanceMappingFragmentDoc } from '../fragments/serviceinstancemapping.generated';
import { ListClientFragmentDoc } from '../fragments/client.generated';
import { ManifestFragmentDoc } from '../fragments/manifest.generated';
import { ListInstanceAliasFragmentDoc } from '../fragments/alias.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type ListServiceInstancesQueryVariables = Types.Exact<{
  pagination?: Types.InputMaybe<Types.OffsetPaginationInput>;
  filters?: Types.InputMaybe<Types.ManagementServiceInstanceFilter>;
  ordering?: Types.InputMaybe<Array<Types.ManagementServiceInstanceOrdering> | Types.ManagementServiceInstanceOrdering>;
}>;

export type ListServiceInstancesQuery = { __typename?: 'Query', serviceInstances: Array<{ __typename?: 'ManagementServiceInstance', id: string, identifier: string, allowedUsers: Array<{ __typename?: 'ManagementUser', id: string }>, release: { __typename?: 'ManagementServiceRelease', id: string, version: string, service: { __typename?: 'ManagementService', id: string, identifier: any, logo?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null } }, organization: { __typename?: 'ManagementOrganization', id: string } }> };

export type GetServiceInstanceQueryVariables = Types.Exact<{
  id: Types.Scalars['ID']['input'];
}>;

export type GetServiceInstanceQuery = { __typename?: 'Query', serviceInstance: { __typename?: 'ManagementServiceInstance', identifier: string, id: string, release: { __typename?: 'ManagementServiceRelease', id: string, version: string, service: { __typename?: 'ManagementService', identifier: any, id: string, description?: string | null, name: string, logo?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null } }, device?: { __typename?: 'ManagementDevice', id: string, name?: string | null } | null, organization: { __typename?: 'ManagementOrganization', id: string }, allowedUsers: Array<{ __typename?: 'ManagementUser', username: string, firstName?: string | null, lastName?: string | null, email?: string | null, avatar?: string | null, id: string, profile: { __typename?: 'ManagementProfile', id: string, name?: string | null, bio?: string | null, avatar?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null, banner?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null } }>, deniedUsers: Array<{ __typename?: 'ManagementUser', username: string, firstName?: string | null, lastName?: string | null, email?: string | null, avatar?: string | null, id: string, profile: { __typename?: 'ManagementProfile', id: string, name?: string | null, bio?: string | null, avatar?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null, banner?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null } }>, mappings: Array<{ __typename?: 'ManagementServiceInstanceMapping', id: string, key: string, optional: boolean, instance: { __typename?: 'ManagementServiceInstance', id: string, identifier: string, allowedUsers: Array<{ __typename?: 'ManagementUser', id: string }>, release: { __typename?: 'ManagementServiceRelease', id: string, version: string, service: { __typename?: 'ManagementService', id: string, identifier: any, logo?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null } }, organization: { __typename?: 'ManagementOrganization', id: string } }, client: { __typename?: 'ManagementClient', id: string, name: string, kind: Types.ClientKind, lastReportedAt?: any | null, organization?: { __typename?: 'ManagementOrganization', id: string } | null, user?: { __typename?: 'ManagementUser', id: string, username: string } | null, logo?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null, device?: { __typename?: 'ManagementDevice', id: string, name?: string | null } | null, release?: { __typename?: 'ManagementRelease', version: any, logo?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null, app: { __typename?: 'ManagementApp', id: string, identifier: any, logo?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null } } | null, manifest?: { __typename?: 'ManagementStagingManifest', identifier: string, version: string, requirements: Array<{ __typename?: 'ManagementStagingRequirement', key: string, description?: string | null }> } | null } }>, aliases: Array<{ __typename?: 'ManagementInstanceAlias', id: string, host?: string | null, port?: number | null, ssl: boolean, path?: string | null, challenge: string, kind: string, resolvedHost?: string | null, scope: string, layer?: { __typename?: 'ManagementLayer', id: string, name: string } | null, instance: { __typename?: 'ManagementServiceInstance', id: string, identifier: string, release: { __typename?: 'ManagementServiceRelease', version: string, service: { __typename?: 'ManagementService', id: string, identifier: any } } } }>, logo?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null, roles: Array<{ __typename?: 'ManagementRole', id: string, identifier: string, description: string }>, scopes: Array<{ __typename?: 'ManagementScope', id: string, identifier: string, description: string }> } };

export const ListServiceInstancesDocument = {"kind":"Document", "definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ListServiceInstances"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pagination"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"OffsetPaginationInput"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filters"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ManagementServiceInstanceFilter"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"ordering"}},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ManagementServiceInstanceOrdering"}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"serviceInstances"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"pagination"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pagination"}}},{"kind":"Argument","name":{"kind":"Name","value":"filters"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filters"}}},{"kind":"Argument","name":{"kind":"Name","value":"ordering"},"value":{"kind":"Variable","name":{"kind":"Name","value":"ordering"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ListServiceInstance"}}]}}]}},...ListServiceInstanceFragmentDoc.definitions]} as unknown as DocumentNode;

/**
 * __useListServiceInstancesQuery__
 *
 * To run a query within a React component, call `useListServiceInstancesQuery` and pass it any options that fit your needs.
 * When your component renders, `useListServiceInstancesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useListServiceInstancesQuery({
 *   variables: {
 *      pagination: // value for 'pagination'
 *      filters: // value for 'filters'
 *      ordering: // value for 'ordering'
 *   },
 * });
 */
export function useListServiceInstancesQuery(baseOptions?: Apollo.QueryHookOptions<ListServiceInstancesQuery, ListServiceInstancesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ListServiceInstancesQuery, ListServiceInstancesQueryVariables>(ListServiceInstancesDocument, options);
      }
export function useListServiceInstancesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ListServiceInstancesQuery, ListServiceInstancesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ListServiceInstancesQuery, ListServiceInstancesQueryVariables>(ListServiceInstancesDocument, options);
        }
// @ts-ignore
export function useListServiceInstancesSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<ListServiceInstancesQuery, ListServiceInstancesQueryVariables>): Apollo.UseSuspenseQueryResult<ListServiceInstancesQuery, ListServiceInstancesQueryVariables>;
export function useListServiceInstancesSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<ListServiceInstancesQuery, ListServiceInstancesQueryVariables>): Apollo.UseSuspenseQueryResult<ListServiceInstancesQuery | undefined, ListServiceInstancesQueryVariables>;
export function useListServiceInstancesSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<ListServiceInstancesQuery, ListServiceInstancesQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ListServiceInstancesQuery, ListServiceInstancesQueryVariables>(ListServiceInstancesDocument, options);
        }
export type ListServiceInstancesQueryHookResult = ReturnType<typeof useListServiceInstancesQuery>;
export type ListServiceInstancesLazyQueryHookResult = ReturnType<typeof useListServiceInstancesLazyQuery>;
export type ListServiceInstancesSuspenseQueryHookResult = ReturnType<typeof useListServiceInstancesSuspenseQuery>;
export type ListServiceInstancesQueryResult = Apollo.QueryResult<ListServiceInstancesQuery, ListServiceInstancesQueryVariables>;
export const GetServiceInstanceDocument = {"kind":"Document", "definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetServiceInstance"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"serviceInstance"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ServiceInstance"}}]}}]}},...ServiceInstanceFragmentDoc.definitions,...ListUserFragmentDoc.definitions,...ProfileFragmentDoc.definitions,...ListServiceInstanceMappingFragmentDoc.definitions,...ListServiceInstanceFragmentDoc.definitions,...ListClientFragmentDoc.definitions,...ManifestFragmentDoc.definitions,...ListInstanceAliasFragmentDoc.definitions]} as unknown as DocumentNode;

/**
 * __useGetServiceInstanceQuery__
 *
 * To run a query within a React component, call `useGetServiceInstanceQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetServiceInstanceQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetServiceInstanceQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetServiceInstanceQuery(baseOptions: Apollo.QueryHookOptions<GetServiceInstanceQuery, GetServiceInstanceQueryVariables> & ({ variables: GetServiceInstanceQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetServiceInstanceQuery, GetServiceInstanceQueryVariables>(GetServiceInstanceDocument, options);
      }
export function useGetServiceInstanceLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetServiceInstanceQuery, GetServiceInstanceQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetServiceInstanceQuery, GetServiceInstanceQueryVariables>(GetServiceInstanceDocument, options);
        }
// @ts-ignore
export function useGetServiceInstanceSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetServiceInstanceQuery, GetServiceInstanceQueryVariables>): Apollo.UseSuspenseQueryResult<GetServiceInstanceQuery, GetServiceInstanceQueryVariables>;
export function useGetServiceInstanceSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetServiceInstanceQuery, GetServiceInstanceQueryVariables>): Apollo.UseSuspenseQueryResult<GetServiceInstanceQuery | undefined, GetServiceInstanceQueryVariables>;
export function useGetServiceInstanceSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetServiceInstanceQuery, GetServiceInstanceQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetServiceInstanceQuery, GetServiceInstanceQueryVariables>(GetServiceInstanceDocument, options);
        }
export type GetServiceInstanceQueryHookResult = ReturnType<typeof useGetServiceInstanceQuery>;
export type GetServiceInstanceLazyQueryHookResult = ReturnType<typeof useGetServiceInstanceLazyQuery>;
export type GetServiceInstanceSuspenseQueryHookResult = ReturnType<typeof useGetServiceInstanceSuspenseQuery>;
export type GetServiceInstanceQueryResult = Apollo.QueryResult<GetServiceInstanceQuery, GetServiceInstanceQueryVariables>;