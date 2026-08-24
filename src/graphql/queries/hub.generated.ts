import type * as Types from '../../api/types';
import type { DocumentNode } from 'graphql';
import { ListHubFragmentDoc, HubFragmentDoc } from '../fragments/hub.generated';
import { ListServiceInstanceFragmentDoc } from '../fragments/service_instance.generated';
import { ListClientFragmentDoc } from '../fragments/client.generated';
import { ManifestFragmentDoc } from '../fragments/manifest.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type HubsQueryVariables = Types.Exact<{
  filters?: Types.InputMaybe<Types.ManagementHubFilter>;
  ordering?: Types.InputMaybe<Array<Types.ManagementHubOrdering> | Types.ManagementHubOrdering>;
  pagination?: Types.InputMaybe<Types.OffsetPaginationInput>;
}>;

export type HubsQuery = { __typename?: 'Query', hubs: Array<{ __typename?: 'ManagementHub', id: string, name: string, organization: { __typename?: 'ManagementOrganization', id: string, name?: string | null }, instances: Array<{ __typename?: 'ManagementServiceInstance', id: string, identifier: string, release: { __typename?: 'ManagementServiceRelease', id: string, version: string, service: { __typename?: 'ManagementService', id: string, identifier: any, logo?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null } }, organization: { __typename?: 'ManagementOrganization', id: string } }>, clients: Array<{ __typename?: 'ManagementClient', id: string, name: string, kind: Types.ClientKind, lastReportedAt?: any | null, organization?: { __typename?: 'ManagementOrganization', id: string } | null, user?: { __typename?: 'ManagementUser', id: string, username: string } | null, logo?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null, device?: { __typename?: 'ManagementDevice', id: string, name?: string | null } | null, release?: { __typename?: 'ManagementRelease', version: any, logo?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null, app: { __typename?: 'ManagementApp', id: string, identifier: any, logo?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null } } | null, manifest?: { __typename?: 'ManagementStagingManifest', identifier: string, version: string, requirements: Array<{ __typename?: 'ManagementStagingRequirement', key: string, description?: string | null }> } | null }> }> };

export type GetHubQueryVariables = Types.Exact<{
  id: Types.Scalars['ID']['input'];
}>;

export type GetHubQuery = { __typename?: 'Query', hub: { __typename?: 'ManagementHub', id: string, name: string, organization: { __typename?: 'ManagementOrganization', id: string, name?: string | null }, instances: Array<{ __typename?: 'ManagementServiceInstance', id: string, identifier: string, release: { __typename?: 'ManagementServiceRelease', id: string, version: string, service: { __typename?: 'ManagementService', id: string, identifier: any, logo?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null } }, organization: { __typename?: 'ManagementOrganization', id: string } }>, clients: Array<{ __typename?: 'ManagementClient', id: string, name: string, kind: Types.ClientKind, lastReportedAt?: any | null, organization?: { __typename?: 'ManagementOrganization', id: string } | null, user?: { __typename?: 'ManagementUser', id: string, username: string } | null, logo?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null, device?: { __typename?: 'ManagementDevice', id: string, name?: string | null } | null, release?: { __typename?: 'ManagementRelease', version: any, logo?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null, app: { __typename?: 'ManagementApp', id: string, identifier: any, logo?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null } } | null, manifest?: { __typename?: 'ManagementStagingManifest', identifier: string, version: string, requirements: Array<{ __typename?: 'ManagementStagingRequirement', key: string, description?: string | null }> } | null }> } };

export const HubsDocument = {"kind":"Document", "definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Hubs"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filters"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ManagementHubFilter"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"ordering"}},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ManagementHubOrdering"}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pagination"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"OffsetPaginationInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"hubs"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filters"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filters"}}},{"kind":"Argument","name":{"kind":"Name","value":"ordering"},"value":{"kind":"Variable","name":{"kind":"Name","value":"ordering"}}},{"kind":"Argument","name":{"kind":"Name","value":"pagination"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pagination"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ListHub"}}]}}]}},...ListHubFragmentDoc.definitions,...ListServiceInstanceFragmentDoc.definitions,...ListClientFragmentDoc.definitions,...ManifestFragmentDoc.definitions]} as unknown as DocumentNode;

/**
 * __useHubsQuery__
 *
 * To run a query within a React component, call `useHubsQuery` and pass it any options that fit your needs.
 * When your component renders, `useHubsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useHubsQuery({
 *   variables: {
 *      filters: // value for 'filters'
 *      ordering: // value for 'ordering'
 *      pagination: // value for 'pagination'
 *   },
 * });
 */
export function useHubsQuery(baseOptions?: Apollo.QueryHookOptions<HubsQuery, HubsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<HubsQuery, HubsQueryVariables>(HubsDocument, options);
      }
export function useHubsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<HubsQuery, HubsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<HubsQuery, HubsQueryVariables>(HubsDocument, options);
        }
// @ts-ignore
export function useHubsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<HubsQuery, HubsQueryVariables>): Apollo.UseSuspenseQueryResult<HubsQuery, HubsQueryVariables>;
export function useHubsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<HubsQuery, HubsQueryVariables>): Apollo.UseSuspenseQueryResult<HubsQuery | undefined, HubsQueryVariables>;
export function useHubsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<HubsQuery, HubsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<HubsQuery, HubsQueryVariables>(HubsDocument, options);
        }
export type HubsQueryHookResult = ReturnType<typeof useHubsQuery>;
export type HubsLazyQueryHookResult = ReturnType<typeof useHubsLazyQuery>;
export type HubsSuspenseQueryHookResult = ReturnType<typeof useHubsSuspenseQuery>;
export type HubsQueryResult = Apollo.QueryResult<HubsQuery, HubsQueryVariables>;
export const GetHubDocument = {"kind":"Document", "definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetHub"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"hub"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Hub"}}]}}]}},...HubFragmentDoc.definitions,...ListServiceInstanceFragmentDoc.definitions,...ListClientFragmentDoc.definitions,...ManifestFragmentDoc.definitions]} as unknown as DocumentNode;

/**
 * __useGetHubQuery__
 *
 * To run a query within a React component, call `useGetHubQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetHubQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetHubQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetHubQuery(baseOptions: Apollo.QueryHookOptions<GetHubQuery, GetHubQueryVariables> & ({ variables: GetHubQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetHubQuery, GetHubQueryVariables>(GetHubDocument, options);
      }
export function useGetHubLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetHubQuery, GetHubQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetHubQuery, GetHubQueryVariables>(GetHubDocument, options);
        }
// @ts-ignore
export function useGetHubSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetHubQuery, GetHubQueryVariables>): Apollo.UseSuspenseQueryResult<GetHubQuery, GetHubQueryVariables>;
export function useGetHubSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetHubQuery, GetHubQueryVariables>): Apollo.UseSuspenseQueryResult<GetHubQuery | undefined, GetHubQueryVariables>;
export function useGetHubSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetHubQuery, GetHubQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetHubQuery, GetHubQueryVariables>(GetHubDocument, options);
        }
export type GetHubQueryHookResult = ReturnType<typeof useGetHubQuery>;
export type GetHubLazyQueryHookResult = ReturnType<typeof useGetHubLazyQuery>;
export type GetHubSuspenseQueryHookResult = ReturnType<typeof useGetHubSuspenseQuery>;
export type GetHubQueryResult = Apollo.QueryResult<GetHubQuery, GetHubQueryVariables>;