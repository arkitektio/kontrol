import type * as Types from '../../api/types';
import type { DocumentNode } from 'graphql';
import { OrganizationFragmentDoc, SidebarOrganizationFragmentDoc, ListOrganizationFragmentDoc } from '../fragments/organization.generated';
import { RoleSetFragmentDoc } from '../fragments/role_set.generated';
import { ListRoleFragmentDoc } from '../fragments/role.generated';
import { OrganizationProfileFragmentDoc } from '../fragments/organization_profile.generated';
import { ListClientFragmentDoc } from '../fragments/client.generated';
import { ManifestFragmentDoc } from '../fragments/manifest.generated';
import { ListServiceInstanceFragmentDoc } from '../fragments/service_instance.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type OrganizationQueryVariables = Types.Exact<{
  id: Types.Scalars['ID']['input'];
}>;

export type OrganizationQuery = { __typename?: 'Query', organization: { __typename?: 'ManagementOrganization', id: string, name?: string | null, slug: string, description?: string | null, requireDeviceAuth?: boolean | null, amIOwner: boolean, amIAdmin: boolean, brandHue?: number | null, brandChroma?: number | null, accessTokenLifetime?: number | null, roles: Array<{ __typename?: 'ManagementRole', id: string, identifier: string, description: string }>, roleSets: Array<{ __typename?: 'ManagementRoleSet', id: string, name: string, roles: Array<{ __typename?: 'ManagementRole', id: string, description: string, identifier: string }> }>, memberships: Array<{ __typename?: 'ManagementMembership', id: string, roles: Array<{ __typename?: 'ManagementRole', identifier: string }>, user: { __typename?: 'ManagementUser', id: string, username: string, email?: string | null, profile: { __typename?: 'ManagementProfile', id: string, avatar?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null } } }>, profile?: { __typename?: 'ManagementOrganizationProfile', id: string, name?: string | null, bio?: string | null, avatar?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null, banner?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null } | null, invites: Array<{ __typename?: 'ManagementInvite', id: string, status: string, expiresAt?: any | null, token: string, inviteUrl: string, acceptedBy?: { __typename?: 'ManagementUser', id: string, username: string, profile: { __typename?: 'ManagementProfile', id: string, avatar?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null } } | null }> } };

export type SidebarOrganizationQueryVariables = Types.Exact<{
  id: Types.Scalars['ID']['input'];
}>;

export type SidebarOrganizationQuery = { __typename?: 'Query', organization: { __typename?: 'ManagementOrganization', id: string, name?: string | null, slug: string, profile?: { __typename?: 'ManagementOrganizationProfile', id: string, name?: string | null, bio?: string | null, avatar?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null, banner?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null } | null, memberships: Array<{ __typename?: 'ManagementMembership', id: string, roles: Array<{ __typename?: 'ManagementRole', identifier: string }>, user: { __typename?: 'ManagementUser', id: string, username: string, profile: { __typename?: 'ManagementProfile', id: string, avatar?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null } } }>, latestClients: Array<{ __typename?: 'ManagementClient', id: string, name: string, kind: Types.ClientKind, lastReportedAt?: any | null, organization?: { __typename?: 'ManagementOrganization', id: string } | null, user?: { __typename?: 'ManagementUser', id: string, username: string } | null, logo?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null, device?: { __typename?: 'ManagementDevice', id: string, name?: string | null } | null, release?: { __typename?: 'ManagementRelease', version: any, logo?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null, app: { __typename?: 'ManagementApp', id: string, identifier: any, logo?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null } } | null, manifest?: { __typename?: 'ManagementStagingManifest', identifier: string, version: string, requirements: Array<{ __typename?: 'ManagementStagingRequirement', key: string, description?: string | null }> } | null }>, latestServices: Array<{ __typename?: 'ManagementServiceInstance', id: string, identifier: string, allowedUsers: Array<{ __typename?: 'ManagementUser', id: string }>, release: { __typename?: 'ManagementServiceRelease', id: string, version: string, service: { __typename?: 'ManagementService', id: string, identifier: any, logo?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null } }, organization: { __typename?: 'ManagementOrganization', id: string } }> } };

export type ListOrganizationsQueryVariables = Types.Exact<{
  filters?: Types.InputMaybe<Types.OrganizationFilter>;
  pagination?: Types.InputMaybe<Types.OffsetPaginationInput>;
}>;

export type ListOrganizationsQuery = { __typename?: 'Query', organizations: Array<{ __typename?: 'ManagementOrganization', id: string, name?: string | null, slug: string, brandHue?: number | null, brandChroma?: number | null, amIAdmin: boolean }> };

export type OrganizationOptionsQueryVariables = Types.Exact<{
  search?: Types.InputMaybe<Types.Scalars['String']['input']>;
  values?: Types.InputMaybe<Array<Types.Scalars['ID']['input']> | Types.Scalars['ID']['input']>;
}>;

export type OrganizationOptionsQuery = { __typename?: 'Query', options: Array<{ __typename?: 'ManagementOrganization', value: string, label?: string | null }> };

export const OrganizationDocument = {"kind":"Document", "definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Organization"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"organization"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Organization"}}]}}]}},...OrganizationFragmentDoc.definitions,...RoleSetFragmentDoc.definitions,...ListRoleFragmentDoc.definitions,...OrganizationProfileFragmentDoc.definitions]} as unknown as DocumentNode;

/**
 * __useOrganizationQuery__
 *
 * To run a query within a React component, call `useOrganizationQuery` and pass it any options that fit your needs.
 * When your component renders, `useOrganizationQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useOrganizationQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useOrganizationQuery(baseOptions: Apollo.QueryHookOptions<OrganizationQuery, OrganizationQueryVariables> & ({ variables: OrganizationQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<OrganizationQuery, OrganizationQueryVariables>(OrganizationDocument, options);
      }
export function useOrganizationLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<OrganizationQuery, OrganizationQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<OrganizationQuery, OrganizationQueryVariables>(OrganizationDocument, options);
        }
// @ts-ignore
export function useOrganizationSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<OrganizationQuery, OrganizationQueryVariables>): Apollo.UseSuspenseQueryResult<OrganizationQuery, OrganizationQueryVariables>;
export function useOrganizationSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<OrganizationQuery, OrganizationQueryVariables>): Apollo.UseSuspenseQueryResult<OrganizationQuery | undefined, OrganizationQueryVariables>;
export function useOrganizationSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<OrganizationQuery, OrganizationQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<OrganizationQuery, OrganizationQueryVariables>(OrganizationDocument, options);
        }
export type OrganizationQueryHookResult = ReturnType<typeof useOrganizationQuery>;
export type OrganizationLazyQueryHookResult = ReturnType<typeof useOrganizationLazyQuery>;
export type OrganizationSuspenseQueryHookResult = ReturnType<typeof useOrganizationSuspenseQuery>;
export type OrganizationQueryResult = Apollo.QueryResult<OrganizationQuery, OrganizationQueryVariables>;
export const SidebarOrganizationDocument = {"kind":"Document", "definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"SidebarOrganization"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"organization"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"SidebarOrganization"}}]}}]}},...SidebarOrganizationFragmentDoc.definitions,...OrganizationProfileFragmentDoc.definitions,...ListClientFragmentDoc.definitions,...ManifestFragmentDoc.definitions,...ListServiceInstanceFragmentDoc.definitions]} as unknown as DocumentNode;

/**
 * __useSidebarOrganizationQuery__
 *
 * To run a query within a React component, call `useSidebarOrganizationQuery` and pass it any options that fit your needs.
 * When your component renders, `useSidebarOrganizationQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSidebarOrganizationQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useSidebarOrganizationQuery(baseOptions: Apollo.QueryHookOptions<SidebarOrganizationQuery, SidebarOrganizationQueryVariables> & ({ variables: SidebarOrganizationQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SidebarOrganizationQuery, SidebarOrganizationQueryVariables>(SidebarOrganizationDocument, options);
      }
export function useSidebarOrganizationLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SidebarOrganizationQuery, SidebarOrganizationQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SidebarOrganizationQuery, SidebarOrganizationQueryVariables>(SidebarOrganizationDocument, options);
        }
// @ts-ignore
export function useSidebarOrganizationSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<SidebarOrganizationQuery, SidebarOrganizationQueryVariables>): Apollo.UseSuspenseQueryResult<SidebarOrganizationQuery, SidebarOrganizationQueryVariables>;
export function useSidebarOrganizationSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<SidebarOrganizationQuery, SidebarOrganizationQueryVariables>): Apollo.UseSuspenseQueryResult<SidebarOrganizationQuery | undefined, SidebarOrganizationQueryVariables>;
export function useSidebarOrganizationSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<SidebarOrganizationQuery, SidebarOrganizationQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<SidebarOrganizationQuery, SidebarOrganizationQueryVariables>(SidebarOrganizationDocument, options);
        }
export type SidebarOrganizationQueryHookResult = ReturnType<typeof useSidebarOrganizationQuery>;
export type SidebarOrganizationLazyQueryHookResult = ReturnType<typeof useSidebarOrganizationLazyQuery>;
export type SidebarOrganizationSuspenseQueryHookResult = ReturnType<typeof useSidebarOrganizationSuspenseQuery>;
export type SidebarOrganizationQueryResult = Apollo.QueryResult<SidebarOrganizationQuery, SidebarOrganizationQueryVariables>;
export const ListOrganizationsDocument = {"kind":"Document", "definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ListOrganizations"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filters"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"OrganizationFilter"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pagination"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"OffsetPaginationInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"organizations"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filters"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filters"}}},{"kind":"Argument","name":{"kind":"Name","value":"pagination"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pagination"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ListOrganization"}}]}}]}},...ListOrganizationFragmentDoc.definitions]} as unknown as DocumentNode;

/**
 * __useListOrganizationsQuery__
 *
 * To run a query within a React component, call `useListOrganizationsQuery` and pass it any options that fit your needs.
 * When your component renders, `useListOrganizationsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useListOrganizationsQuery({
 *   variables: {
 *      filters: // value for 'filters'
 *      pagination: // value for 'pagination'
 *   },
 * });
 */
export function useListOrganizationsQuery(baseOptions?: Apollo.QueryHookOptions<ListOrganizationsQuery, ListOrganizationsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ListOrganizationsQuery, ListOrganizationsQueryVariables>(ListOrganizationsDocument, options);
      }
export function useListOrganizationsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ListOrganizationsQuery, ListOrganizationsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ListOrganizationsQuery, ListOrganizationsQueryVariables>(ListOrganizationsDocument, options);
        }
// @ts-ignore
export function useListOrganizationsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<ListOrganizationsQuery, ListOrganizationsQueryVariables>): Apollo.UseSuspenseQueryResult<ListOrganizationsQuery, ListOrganizationsQueryVariables>;
export function useListOrganizationsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<ListOrganizationsQuery, ListOrganizationsQueryVariables>): Apollo.UseSuspenseQueryResult<ListOrganizationsQuery | undefined, ListOrganizationsQueryVariables>;
export function useListOrganizationsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<ListOrganizationsQuery, ListOrganizationsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ListOrganizationsQuery, ListOrganizationsQueryVariables>(ListOrganizationsDocument, options);
        }
export type ListOrganizationsQueryHookResult = ReturnType<typeof useListOrganizationsQuery>;
export type ListOrganizationsLazyQueryHookResult = ReturnType<typeof useListOrganizationsLazyQuery>;
export type ListOrganizationsSuspenseQueryHookResult = ReturnType<typeof useListOrganizationsSuspenseQuery>;
export type ListOrganizationsQueryResult = Apollo.QueryResult<ListOrganizationsQuery, ListOrganizationsQueryVariables>;
export const OrganizationOptionsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"OrganizationOptions"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"search"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"values"}},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"options"},"name":{"kind":"Name","value":"organizations"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filters"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"search"},"value":{"kind":"Variable","name":{"kind":"Name","value":"search"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"ids"},"value":{"kind":"Variable","name":{"kind":"Name","value":"values"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"value"},"name":{"kind":"Name","value":"id"}},{"kind":"Field","alias":{"kind":"Name","value":"label"},"name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode;

/**
 * __useOrganizationOptionsQuery__
 *
 * To run a query within a React component, call `useOrganizationOptionsQuery` and pass it any options that fit your needs.
 * When your component renders, `useOrganizationOptionsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useOrganizationOptionsQuery({
 *   variables: {
 *      search: // value for 'search'
 *      values: // value for 'values'
 *   },
 * });
 */
export function useOrganizationOptionsQuery(baseOptions?: Apollo.QueryHookOptions<OrganizationOptionsQuery, OrganizationOptionsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<OrganizationOptionsQuery, OrganizationOptionsQueryVariables>(OrganizationOptionsDocument, options);
      }
export function useOrganizationOptionsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<OrganizationOptionsQuery, OrganizationOptionsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<OrganizationOptionsQuery, OrganizationOptionsQueryVariables>(OrganizationOptionsDocument, options);
        }
// @ts-ignore
export function useOrganizationOptionsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<OrganizationOptionsQuery, OrganizationOptionsQueryVariables>): Apollo.UseSuspenseQueryResult<OrganizationOptionsQuery, OrganizationOptionsQueryVariables>;
export function useOrganizationOptionsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<OrganizationOptionsQuery, OrganizationOptionsQueryVariables>): Apollo.UseSuspenseQueryResult<OrganizationOptionsQuery | undefined, OrganizationOptionsQueryVariables>;
export function useOrganizationOptionsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<OrganizationOptionsQuery, OrganizationOptionsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<OrganizationOptionsQuery, OrganizationOptionsQueryVariables>(OrganizationOptionsDocument, options);
        }
export type OrganizationOptionsQueryHookResult = ReturnType<typeof useOrganizationOptionsQuery>;
export type OrganizationOptionsLazyQueryHookResult = ReturnType<typeof useOrganizationOptionsLazyQuery>;
export type OrganizationOptionsSuspenseQueryHookResult = ReturnType<typeof useOrganizationOptionsSuspenseQuery>;
export type OrganizationOptionsQueryResult = Apollo.QueryResult<OrganizationOptionsQuery, OrganizationOptionsQueryVariables>;