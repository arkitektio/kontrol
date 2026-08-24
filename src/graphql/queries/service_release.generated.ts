import type * as Types from '../../api/types';
import type { DocumentNode } from 'graphql';
import { ListServiceReleaseFragmentDoc, ServiceReleaseFragmentDoc } from '../fragments/service_release.generated';
import { ListServiceInstanceFragmentDoc } from '../fragments/service_instance.generated';
import { ServiceFragmentDoc } from '../fragments/service.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type ServiceReleasesQueryVariables = Types.Exact<{ [key: string]: never; }>;

export type ServiceReleasesQuery = { __typename?: 'Query', serviceReleases: Array<{ __typename?: 'ManagementServiceRelease', id: string, version: string, instances: Array<{ __typename?: 'ManagementServiceInstance', id: string, identifier: string, release: { __typename?: 'ManagementServiceRelease', id: string, version: string, service: { __typename?: 'ManagementService', id: string, identifier: any, logo?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null } }, organization: { __typename?: 'ManagementOrganization', id: string } }> }> };

export type DetailServiceReleaseQueryVariables = Types.Exact<{
  id: Types.Scalars['ID']['input'];
}>;

export type DetailServiceReleaseQuery = { __typename?: 'Query', serviceRelease: { __typename?: 'ManagementServiceRelease', id: string, version: string, service: { __typename?: 'ManagementService', identifier: any, id: string, name: string, description?: string | null, logo?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null, releases: Array<{ __typename?: 'ManagementServiceRelease', id: string, version: string, instances: Array<{ __typename?: 'ManagementServiceInstance', id: string, identifier: string, release: { __typename?: 'ManagementServiceRelease', id: string, version: string, service: { __typename?: 'ManagementService', id: string, identifier: any, logo?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null } }, organization: { __typename?: 'ManagementOrganization', id: string } }> }> } } };

export const ServiceReleasesDocument = {"kind":"Document", "definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ServiceReleases"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"serviceReleases"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ListServiceRelease"}}]}}]}},...ListServiceReleaseFragmentDoc.definitions,...ListServiceInstanceFragmentDoc.definitions]} as unknown as DocumentNode;

/**
 * __useServiceReleasesQuery__
 *
 * To run a query within a React component, call `useServiceReleasesQuery` and pass it any options that fit your needs.
 * When your component renders, `useServiceReleasesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useServiceReleasesQuery({
 *   variables: {
 *   },
 * });
 */
export function useServiceReleasesQuery(baseOptions?: Apollo.QueryHookOptions<ServiceReleasesQuery, ServiceReleasesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ServiceReleasesQuery, ServiceReleasesQueryVariables>(ServiceReleasesDocument, options);
      }
export function useServiceReleasesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ServiceReleasesQuery, ServiceReleasesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ServiceReleasesQuery, ServiceReleasesQueryVariables>(ServiceReleasesDocument, options);
        }
// @ts-ignore
export function useServiceReleasesSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<ServiceReleasesQuery, ServiceReleasesQueryVariables>): Apollo.UseSuspenseQueryResult<ServiceReleasesQuery, ServiceReleasesQueryVariables>;
export function useServiceReleasesSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<ServiceReleasesQuery, ServiceReleasesQueryVariables>): Apollo.UseSuspenseQueryResult<ServiceReleasesQuery | undefined, ServiceReleasesQueryVariables>;
export function useServiceReleasesSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<ServiceReleasesQuery, ServiceReleasesQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ServiceReleasesQuery, ServiceReleasesQueryVariables>(ServiceReleasesDocument, options);
        }
export type ServiceReleasesQueryHookResult = ReturnType<typeof useServiceReleasesQuery>;
export type ServiceReleasesLazyQueryHookResult = ReturnType<typeof useServiceReleasesLazyQuery>;
export type ServiceReleasesSuspenseQueryHookResult = ReturnType<typeof useServiceReleasesSuspenseQuery>;
export type ServiceReleasesQueryResult = Apollo.QueryResult<ServiceReleasesQuery, ServiceReleasesQueryVariables>;
export const DetailServiceReleaseDocument = {"kind":"Document", "definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"DetailServiceRelease"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"serviceRelease"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ServiceRelease"}}]}}]}},...ServiceReleaseFragmentDoc.definitions,...ServiceFragmentDoc.definitions,...ListServiceReleaseFragmentDoc.definitions,...ListServiceInstanceFragmentDoc.definitions]} as unknown as DocumentNode;

/**
 * __useDetailServiceReleaseQuery__
 *
 * To run a query within a React component, call `useDetailServiceReleaseQuery` and pass it any options that fit your needs.
 * When your component renders, `useDetailServiceReleaseQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useDetailServiceReleaseQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDetailServiceReleaseQuery(baseOptions: Apollo.QueryHookOptions<DetailServiceReleaseQuery, DetailServiceReleaseQueryVariables> & ({ variables: DetailServiceReleaseQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<DetailServiceReleaseQuery, DetailServiceReleaseQueryVariables>(DetailServiceReleaseDocument, options);
      }
export function useDetailServiceReleaseLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<DetailServiceReleaseQuery, DetailServiceReleaseQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<DetailServiceReleaseQuery, DetailServiceReleaseQueryVariables>(DetailServiceReleaseDocument, options);
        }
// @ts-ignore
export function useDetailServiceReleaseSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<DetailServiceReleaseQuery, DetailServiceReleaseQueryVariables>): Apollo.UseSuspenseQueryResult<DetailServiceReleaseQuery, DetailServiceReleaseQueryVariables>;
export function useDetailServiceReleaseSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<DetailServiceReleaseQuery, DetailServiceReleaseQueryVariables>): Apollo.UseSuspenseQueryResult<DetailServiceReleaseQuery | undefined, DetailServiceReleaseQueryVariables>;
export function useDetailServiceReleaseSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<DetailServiceReleaseQuery, DetailServiceReleaseQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<DetailServiceReleaseQuery, DetailServiceReleaseQueryVariables>(DetailServiceReleaseDocument, options);
        }
export type DetailServiceReleaseQueryHookResult = ReturnType<typeof useDetailServiceReleaseQuery>;
export type DetailServiceReleaseLazyQueryHookResult = ReturnType<typeof useDetailServiceReleaseLazyQuery>;
export type DetailServiceReleaseSuspenseQueryHookResult = ReturnType<typeof useDetailServiceReleaseSuspenseQuery>;
export type DetailServiceReleaseQueryResult = Apollo.QueryResult<DetailServiceReleaseQuery, DetailServiceReleaseQueryVariables>;