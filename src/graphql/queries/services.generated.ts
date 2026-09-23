import type * as Types from '../../api/types';
import type { DocumentNode } from 'graphql';
import { ListServiceFragmentDoc, ServiceFragmentDoc } from '../fragments/service.generated';
import { ListServiceReleaseFragmentDoc } from '../fragments/service_release.generated';
import { ListServiceInstanceFragmentDoc } from '../fragments/service_instance.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type ListServicesQueryVariables = Types.Exact<{
  pagination?: Types.InputMaybe<Types.OffsetPaginationInput>;
  filters?: Types.InputMaybe<Types.ServiceFilter>;
}>;

export type ListServicesQuery = { __typename?: 'Query', services: Array<{ __typename?: 'ManagementService', identifier: any, id: string, name: string, description?: string | null, logo?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null, releases: Array<{ __typename?: 'ManagementServiceRelease', id: string, version: string, instances: Array<{ __typename?: 'ManagementServiceInstance', id: string, identifier: string, allowedUsers: Array<{ __typename?: 'ManagementUser', id: string }>, release: { __typename?: 'ManagementServiceRelease', id: string, version: string, service: { __typename?: 'ManagementService', id: string, identifier: any, logo?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null } }, organization: { __typename?: 'ManagementOrganization', id: string } }> }> }> };

export type GetServiceQueryVariables = Types.Exact<{
  id: Types.Scalars['ID']['input'];
}>;

export type GetServiceQuery = { __typename?: 'Query', service: { __typename?: 'ManagementService', identifier: any, id: string, name: string, description?: string | null, logo?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null, releases: Array<{ __typename?: 'ManagementServiceRelease', id: string, version: string, instances: Array<{ __typename?: 'ManagementServiceInstance', id: string, identifier: string, allowedUsers: Array<{ __typename?: 'ManagementUser', id: string }>, release: { __typename?: 'ManagementServiceRelease', id: string, version: string, service: { __typename?: 'ManagementService', id: string, identifier: any, logo?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null } }, organization: { __typename?: 'ManagementOrganization', id: string } }> }> } };

export const ListServicesDocument = {"kind":"Document", "definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ListServices"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pagination"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"OffsetPaginationInput"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filters"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ServiceFilter"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"services"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"pagination"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pagination"}}},{"kind":"Argument","name":{"kind":"Name","value":"filters"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filters"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ListService"}}]}}]}},...ListServiceFragmentDoc.definitions,...ListServiceReleaseFragmentDoc.definitions,...ListServiceInstanceFragmentDoc.definitions]} as unknown as DocumentNode;

/**
 * __useListServicesQuery__
 *
 * To run a query within a React component, call `useListServicesQuery` and pass it any options that fit your needs.
 * When your component renders, `useListServicesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useListServicesQuery({
 *   variables: {
 *      pagination: // value for 'pagination'
 *      filters: // value for 'filters'
 *   },
 * });
 */
export function useListServicesQuery(baseOptions?: Apollo.QueryHookOptions<ListServicesQuery, ListServicesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ListServicesQuery, ListServicesQueryVariables>(ListServicesDocument, options);
      }
export function useListServicesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ListServicesQuery, ListServicesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ListServicesQuery, ListServicesQueryVariables>(ListServicesDocument, options);
        }
// @ts-ignore
export function useListServicesSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<ListServicesQuery, ListServicesQueryVariables>): Apollo.UseSuspenseQueryResult<ListServicesQuery, ListServicesQueryVariables>;
export function useListServicesSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<ListServicesQuery, ListServicesQueryVariables>): Apollo.UseSuspenseQueryResult<ListServicesQuery | undefined, ListServicesQueryVariables>;
export function useListServicesSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<ListServicesQuery, ListServicesQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ListServicesQuery, ListServicesQueryVariables>(ListServicesDocument, options);
        }
export type ListServicesQueryHookResult = ReturnType<typeof useListServicesQuery>;
export type ListServicesLazyQueryHookResult = ReturnType<typeof useListServicesLazyQuery>;
export type ListServicesSuspenseQueryHookResult = ReturnType<typeof useListServicesSuspenseQuery>;
export type ListServicesQueryResult = Apollo.QueryResult<ListServicesQuery, ListServicesQueryVariables>;
export const GetServiceDocument = {"kind":"Document", "definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetService"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"service"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Service"}}]}}]}},...ServiceFragmentDoc.definitions,...ListServiceReleaseFragmentDoc.definitions,...ListServiceInstanceFragmentDoc.definitions]} as unknown as DocumentNode;

/**
 * __useGetServiceQuery__
 *
 * To run a query within a React component, call `useGetServiceQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetServiceQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetServiceQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetServiceQuery(baseOptions: Apollo.QueryHookOptions<GetServiceQuery, GetServiceQueryVariables> & ({ variables: GetServiceQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetServiceQuery, GetServiceQueryVariables>(GetServiceDocument, options);
      }
export function useGetServiceLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetServiceQuery, GetServiceQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetServiceQuery, GetServiceQueryVariables>(GetServiceDocument, options);
        }
// @ts-ignore
export function useGetServiceSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetServiceQuery, GetServiceQueryVariables>): Apollo.UseSuspenseQueryResult<GetServiceQuery, GetServiceQueryVariables>;
export function useGetServiceSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetServiceQuery, GetServiceQueryVariables>): Apollo.UseSuspenseQueryResult<GetServiceQuery | undefined, GetServiceQueryVariables>;
export function useGetServiceSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetServiceQuery, GetServiceQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetServiceQuery, GetServiceQueryVariables>(GetServiceDocument, options);
        }
export type GetServiceQueryHookResult = ReturnType<typeof useGetServiceQuery>;
export type GetServiceLazyQueryHookResult = ReturnType<typeof useGetServiceLazyQuery>;
export type GetServiceSuspenseQueryHookResult = ReturnType<typeof useGetServiceSuspenseQuery>;
export type GetServiceQueryResult = Apollo.QueryResult<GetServiceQuery, GetServiceQueryVariables>;