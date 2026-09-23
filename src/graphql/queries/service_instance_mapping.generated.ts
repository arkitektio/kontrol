import type * as Types from '../../api/types';
import type { DocumentNode } from 'graphql';
import { ListServiceInstanceMappingFragmentDoc } from '../fragments/serviceinstancemapping.generated';
import { ListServiceInstanceFragmentDoc } from '../fragments/service_instance.generated';
import { ListClientFragmentDoc } from '../fragments/client.generated';
import { ManifestFragmentDoc } from '../fragments/manifest.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type ListServiceInstanceMappingsQueryVariables = Types.Exact<{
  pagination?: Types.InputMaybe<Types.OffsetPaginationInput>;
  filters?: Types.InputMaybe<Types.ServiceInstanceMappingFilter>;
}>;

export type ListServiceInstanceMappingsQuery = { __typename?: 'Query', serviceInstanceMappings: Array<{ __typename?: 'ManagementServiceInstanceMapping', id: string, key: string, optional: boolean, instance: { __typename?: 'ManagementServiceInstance', id: string, identifier: string, allowedUsers: Array<{ __typename?: 'ManagementUser', id: string }>, release: { __typename?: 'ManagementServiceRelease', id: string, version: string, service: { __typename?: 'ManagementService', id: string, identifier: any, logo?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null } }, organization: { __typename?: 'ManagementOrganization', id: string } }, client: { __typename?: 'ManagementClient', id: string, name: string, kind: Types.ClientKind, lastReportedAt?: any | null, organization?: { __typename?: 'ManagementOrganization', id: string } | null, user?: { __typename?: 'ManagementUser', id: string, username: string } | null, logo?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null, device?: { __typename?: 'ManagementDevice', id: string, name?: string | null } | null, release?: { __typename?: 'ManagementRelease', version: any, logo?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null, app: { __typename?: 'ManagementApp', id: string, identifier: any, logo?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null } } | null, manifest?: { __typename?: 'ManagementStagingManifest', identifier: string, version: string, requirements: Array<{ __typename?: 'ManagementStagingRequirement', key: string, description?: string | null }> } | null } }> };

export type GetServiceInstanceMappingQueryVariables = Types.Exact<{
  id: Types.Scalars['ID']['input'];
}>;

export type GetServiceInstanceMappingQuery = { __typename?: 'Query', serviceInstanceMapping: { __typename?: 'ManagementServiceInstanceMapping', id: string, key: string, optional: boolean, instance: { __typename?: 'ManagementServiceInstance', id: string, identifier: string, allowedUsers: Array<{ __typename?: 'ManagementUser', id: string }>, release: { __typename?: 'ManagementServiceRelease', id: string, version: string, service: { __typename?: 'ManagementService', id: string, identifier: any, logo?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null } }, organization: { __typename?: 'ManagementOrganization', id: string } }, client: { __typename?: 'ManagementClient', id: string, name: string, kind: Types.ClientKind, lastReportedAt?: any | null, organization?: { __typename?: 'ManagementOrganization', id: string } | null, user?: { __typename?: 'ManagementUser', id: string, username: string } | null, logo?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null, device?: { __typename?: 'ManagementDevice', id: string, name?: string | null } | null, release?: { __typename?: 'ManagementRelease', version: any, logo?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null, app: { __typename?: 'ManagementApp', id: string, identifier: any, logo?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null } } | null, manifest?: { __typename?: 'ManagementStagingManifest', identifier: string, version: string, requirements: Array<{ __typename?: 'ManagementStagingRequirement', key: string, description?: string | null }> } | null } } };

export const ListServiceInstanceMappingsDocument = {"kind":"Document", "definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ListServiceInstanceMappings"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pagination"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"OffsetPaginationInput"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filters"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ServiceInstanceMappingFilter"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"serviceInstanceMappings"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"pagination"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pagination"}}},{"kind":"Argument","name":{"kind":"Name","value":"filters"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filters"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ListServiceInstanceMapping"}}]}}]}},...ListServiceInstanceMappingFragmentDoc.definitions,...ListServiceInstanceFragmentDoc.definitions,...ListClientFragmentDoc.definitions,...ManifestFragmentDoc.definitions]} as unknown as DocumentNode;

/**
 * __useListServiceInstanceMappingsQuery__
 *
 * To run a query within a React component, call `useListServiceInstanceMappingsQuery` and pass it any options that fit your needs.
 * When your component renders, `useListServiceInstanceMappingsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useListServiceInstanceMappingsQuery({
 *   variables: {
 *      pagination: // value for 'pagination'
 *      filters: // value for 'filters'
 *   },
 * });
 */
export function useListServiceInstanceMappingsQuery(baseOptions?: Apollo.QueryHookOptions<ListServiceInstanceMappingsQuery, ListServiceInstanceMappingsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ListServiceInstanceMappingsQuery, ListServiceInstanceMappingsQueryVariables>(ListServiceInstanceMappingsDocument, options);
      }
export function useListServiceInstanceMappingsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ListServiceInstanceMappingsQuery, ListServiceInstanceMappingsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ListServiceInstanceMappingsQuery, ListServiceInstanceMappingsQueryVariables>(ListServiceInstanceMappingsDocument, options);
        }
// @ts-ignore
export function useListServiceInstanceMappingsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<ListServiceInstanceMappingsQuery, ListServiceInstanceMappingsQueryVariables>): Apollo.UseSuspenseQueryResult<ListServiceInstanceMappingsQuery, ListServiceInstanceMappingsQueryVariables>;
export function useListServiceInstanceMappingsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<ListServiceInstanceMappingsQuery, ListServiceInstanceMappingsQueryVariables>): Apollo.UseSuspenseQueryResult<ListServiceInstanceMappingsQuery | undefined, ListServiceInstanceMappingsQueryVariables>;
export function useListServiceInstanceMappingsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<ListServiceInstanceMappingsQuery, ListServiceInstanceMappingsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ListServiceInstanceMappingsQuery, ListServiceInstanceMappingsQueryVariables>(ListServiceInstanceMappingsDocument, options);
        }
export type ListServiceInstanceMappingsQueryHookResult = ReturnType<typeof useListServiceInstanceMappingsQuery>;
export type ListServiceInstanceMappingsLazyQueryHookResult = ReturnType<typeof useListServiceInstanceMappingsLazyQuery>;
export type ListServiceInstanceMappingsSuspenseQueryHookResult = ReturnType<typeof useListServiceInstanceMappingsSuspenseQuery>;
export type ListServiceInstanceMappingsQueryResult = Apollo.QueryResult<ListServiceInstanceMappingsQuery, ListServiceInstanceMappingsQueryVariables>;
export const GetServiceInstanceMappingDocument = {"kind":"Document", "definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetServiceInstanceMapping"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"serviceInstanceMapping"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ListServiceInstanceMapping"}}]}}]}},...ListServiceInstanceMappingFragmentDoc.definitions,...ListServiceInstanceFragmentDoc.definitions,...ListClientFragmentDoc.definitions,...ManifestFragmentDoc.definitions]} as unknown as DocumentNode;

/**
 * __useGetServiceInstanceMappingQuery__
 *
 * To run a query within a React component, call `useGetServiceInstanceMappingQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetServiceInstanceMappingQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetServiceInstanceMappingQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetServiceInstanceMappingQuery(baseOptions: Apollo.QueryHookOptions<GetServiceInstanceMappingQuery, GetServiceInstanceMappingQueryVariables> & ({ variables: GetServiceInstanceMappingQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetServiceInstanceMappingQuery, GetServiceInstanceMappingQueryVariables>(GetServiceInstanceMappingDocument, options);
      }
export function useGetServiceInstanceMappingLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetServiceInstanceMappingQuery, GetServiceInstanceMappingQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetServiceInstanceMappingQuery, GetServiceInstanceMappingQueryVariables>(GetServiceInstanceMappingDocument, options);
        }
// @ts-ignore
export function useGetServiceInstanceMappingSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetServiceInstanceMappingQuery, GetServiceInstanceMappingQueryVariables>): Apollo.UseSuspenseQueryResult<GetServiceInstanceMappingQuery, GetServiceInstanceMappingQueryVariables>;
export function useGetServiceInstanceMappingSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetServiceInstanceMappingQuery, GetServiceInstanceMappingQueryVariables>): Apollo.UseSuspenseQueryResult<GetServiceInstanceMappingQuery | undefined, GetServiceInstanceMappingQueryVariables>;
export function useGetServiceInstanceMappingSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetServiceInstanceMappingQuery, GetServiceInstanceMappingQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetServiceInstanceMappingQuery, GetServiceInstanceMappingQueryVariables>(GetServiceInstanceMappingDocument, options);
        }
export type GetServiceInstanceMappingQueryHookResult = ReturnType<typeof useGetServiceInstanceMappingQuery>;
export type GetServiceInstanceMappingLazyQueryHookResult = ReturnType<typeof useGetServiceInstanceMappingLazyQuery>;
export type GetServiceInstanceMappingSuspenseQueryHookResult = ReturnType<typeof useGetServiceInstanceMappingSuspenseQuery>;
export type GetServiceInstanceMappingQueryResult = Apollo.QueryResult<GetServiceInstanceMappingQuery, GetServiceInstanceMappingQueryVariables>;