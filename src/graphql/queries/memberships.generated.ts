import type * as Types from '../../api/types';
import type { DocumentNode } from 'graphql';
import { ListMembershipFragmentDoc, MembershipFragmentDoc } from '../fragments/membership.generated';
import { SidebarOrganizationFragmentDoc, ListOrganizationFragmentDoc } from '../fragments/organization.generated';
import { OrganizationProfileFragmentDoc } from '../fragments/organization_profile.generated';
import { ListClientFragmentDoc } from '../fragments/client.generated';
import { ManifestFragmentDoc } from '../fragments/manifest.generated';
import { ListServiceInstanceFragmentDoc } from '../fragments/service_instance.generated';
import { RoleRequestFragmentDoc } from '../fragments/role_request.generated';
import { ListRoleFragmentDoc } from '../fragments/role.generated';
import { RoleSetFragmentDoc } from '../fragments/role_set.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type MembershipsQueryVariables = Types.Exact<{
  filters?: Types.InputMaybe<Types.ManagementMembershipFilter>;
  ordering?: Types.InputMaybe<Array<Types.ManagementMembershipOrdering> | Types.ManagementMembershipOrdering>;
  pagination?: Types.InputMaybe<Types.OffsetPaginationInput>;
}>;

export type MembershipsQuery = { __typename?: 'Query', memberships: Array<{ __typename?: 'ManagementMembership', id: string, brandHue?: number | null, brandChroma?: number | null, roles: Array<{ __typename?: 'ManagementRole', identifier: string, id: string }>, user: { __typename?: 'ManagementUser', id: string, username: string, profile: { __typename?: 'ManagementProfile', id: string, avatar?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null } }, organization: { __typename?: 'ManagementOrganization', id: string, name?: string | null, slug: string, profile?: { __typename?: 'ManagementOrganizationProfile', id: string, name?: string | null, bio?: string | null, avatar?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null, banner?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null } | null, memberships: Array<{ __typename?: 'ManagementMembership', id: string, roles: Array<{ __typename?: 'ManagementRole', identifier: string }>, user: { __typename?: 'ManagementUser', id: string, username: string, profile: { __typename?: 'ManagementProfile', id: string, avatar?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null } } }>, latestClients: Array<{ __typename?: 'ManagementClient', id: string, name: string, kind: Types.ClientKind, lastReportedAt?: any | null, organization?: { __typename?: 'ManagementOrganization', id: string } | null, user?: { __typename?: 'ManagementUser', id: string, username: string } | null, logo?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null, device?: { __typename?: 'ManagementDevice', id: string, name?: string | null } | null, release?: { __typename?: 'ManagementRelease', version: any, logo?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null, app: { __typename?: 'ManagementApp', id: string, identifier: any, logo?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null } } | null, manifest?: { __typename?: 'ManagementStagingManifest', identifier: string, version: string, requirements: Array<{ __typename?: 'ManagementStagingRequirement', key: string, description?: string | null }> } | null }>, latestServices: Array<{ __typename?: 'ManagementServiceInstance', id: string, identifier: string, allowedUsers: Array<{ __typename?: 'ManagementUser', id: string }>, release: { __typename?: 'ManagementServiceRelease', id: string, version: string, service: { __typename?: 'ManagementService', id: string, identifier: any, logo?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null } }, organization: { __typename?: 'ManagementOrganization', id: string } }> } }> };

export type GetMembershipQueryVariables = Types.Exact<{
  id: Types.Scalars['ID']['input'];
}>;

export type GetMembershipQuery = { __typename?: 'Query', membership: { __typename?: 'ManagementMembership', id: string, isOwner: boolean, brandHue?: number | null, brandChroma?: number | null, allowNotifications: boolean, hasNotificationChannel: boolean, roles: Array<{ __typename?: 'ManagementRole', identifier: string, id: string }>, roleRequests: Array<{ __typename?: 'ManagementRoleRequest', id: string, status: string, reason?: string | null, createdAt: any, respondedAt?: any | null, role: { __typename?: 'ManagementRole', id: string, description: string, identifier: string }, membership: { __typename?: 'ManagementMembership', id: string, user: { __typename?: 'ManagementUser', id: string, username: string, profile: { __typename?: 'ManagementProfile', id: string, avatar?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null } } } }>, user: { __typename?: 'ManagementUser', id: string, username: string, email?: string | null, profile: { __typename?: 'ManagementProfile', id: string, avatar?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null } }, organization: { __typename?: 'ManagementOrganization', id: string, name?: string | null, slug: string, brandHue?: number | null, brandChroma?: number | null, amIAdmin: boolean, roles: Array<{ __typename?: 'ManagementRole', id: string, identifier: string, description: string }>, roleSets: Array<{ __typename?: 'ManagementRoleSet', id: string, name: string, roles: Array<{ __typename?: 'ManagementRole', id: string, description: string, identifier: string }> }> } } };

export const MembershipsDocument = {"kind":"Document", "definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Memberships"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filters"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ManagementMembershipFilter"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"ordering"}},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ManagementMembershipOrdering"}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pagination"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"OffsetPaginationInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"memberships"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filters"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filters"}}},{"kind":"Argument","name":{"kind":"Name","value":"ordering"},"value":{"kind":"Variable","name":{"kind":"Name","value":"ordering"}}},{"kind":"Argument","name":{"kind":"Name","value":"pagination"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pagination"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ListMembership"}}]}}]}},...ListMembershipFragmentDoc.definitions,...SidebarOrganizationFragmentDoc.definitions,...OrganizationProfileFragmentDoc.definitions,...ListClientFragmentDoc.definitions,...ManifestFragmentDoc.definitions,...ListServiceInstanceFragmentDoc.definitions]} as unknown as DocumentNode;

/**
 * __useMembershipsQuery__
 *
 * To run a query within a React component, call `useMembershipsQuery` and pass it any options that fit your needs.
 * When your component renders, `useMembershipsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMembershipsQuery({
 *   variables: {
 *      filters: // value for 'filters'
 *      ordering: // value for 'ordering'
 *      pagination: // value for 'pagination'
 *   },
 * });
 */
export function useMembershipsQuery(baseOptions?: Apollo.QueryHookOptions<MembershipsQuery, MembershipsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MembershipsQuery, MembershipsQueryVariables>(MembershipsDocument, options);
      }
export function useMembershipsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MembershipsQuery, MembershipsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MembershipsQuery, MembershipsQueryVariables>(MembershipsDocument, options);
        }
// @ts-ignore
export function useMembershipsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<MembershipsQuery, MembershipsQueryVariables>): Apollo.UseSuspenseQueryResult<MembershipsQuery, MembershipsQueryVariables>;
export function useMembershipsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<MembershipsQuery, MembershipsQueryVariables>): Apollo.UseSuspenseQueryResult<MembershipsQuery | undefined, MembershipsQueryVariables>;
export function useMembershipsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<MembershipsQuery, MembershipsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<MembershipsQuery, MembershipsQueryVariables>(MembershipsDocument, options);
        }
export type MembershipsQueryHookResult = ReturnType<typeof useMembershipsQuery>;
export type MembershipsLazyQueryHookResult = ReturnType<typeof useMembershipsLazyQuery>;
export type MembershipsSuspenseQueryHookResult = ReturnType<typeof useMembershipsSuspenseQuery>;
export type MembershipsQueryResult = Apollo.QueryResult<MembershipsQuery, MembershipsQueryVariables>;
export const GetMembershipDocument = {"kind":"Document", "definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetMembership"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"membership"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Membership"}}]}}]}},...MembershipFragmentDoc.definitions,...RoleRequestFragmentDoc.definitions,...ListRoleFragmentDoc.definitions,...ListOrganizationFragmentDoc.definitions,...RoleSetFragmentDoc.definitions]} as unknown as DocumentNode;

/**
 * __useGetMembershipQuery__
 *
 * To run a query within a React component, call `useGetMembershipQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMembershipQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMembershipQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetMembershipQuery(baseOptions: Apollo.QueryHookOptions<GetMembershipQuery, GetMembershipQueryVariables> & ({ variables: GetMembershipQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetMembershipQuery, GetMembershipQueryVariables>(GetMembershipDocument, options);
      }
export function useGetMembershipLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMembershipQuery, GetMembershipQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetMembershipQuery, GetMembershipQueryVariables>(GetMembershipDocument, options);
        }
// @ts-ignore
export function useGetMembershipSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetMembershipQuery, GetMembershipQueryVariables>): Apollo.UseSuspenseQueryResult<GetMembershipQuery, GetMembershipQueryVariables>;
export function useGetMembershipSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetMembershipQuery, GetMembershipQueryVariables>): Apollo.UseSuspenseQueryResult<GetMembershipQuery | undefined, GetMembershipQueryVariables>;
export function useGetMembershipSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetMembershipQuery, GetMembershipQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetMembershipQuery, GetMembershipQueryVariables>(GetMembershipDocument, options);
        }
export type GetMembershipQueryHookResult = ReturnType<typeof useGetMembershipQuery>;
export type GetMembershipLazyQueryHookResult = ReturnType<typeof useGetMembershipLazyQuery>;
export type GetMembershipSuspenseQueryHookResult = ReturnType<typeof useGetMembershipSuspenseQuery>;
export type GetMembershipQueryResult = Apollo.QueryResult<GetMembershipQuery, GetMembershipQueryVariables>;