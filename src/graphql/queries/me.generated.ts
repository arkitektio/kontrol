import type * as Types from '../../api/types';
import type { DocumentNode } from 'graphql';
import { MeUserFragmentDoc } from '../fragments/user.generated';
import { ProfileFragmentDoc } from '../fragments/profile.generated';
import { MembershipFragmentDoc } from '../fragments/membership.generated';
import { RoleRequestFragmentDoc } from '../fragments/role_request.generated';
import { ListRoleFragmentDoc } from '../fragments/role.generated';
import { ListOrganizationFragmentDoc } from '../fragments/organization.generated';
import { RoleSetFragmentDoc } from '../fragments/role_set.generated';
import { ListSocialAccountFragmentDoc } from '../fragments/social_account.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type MeQueryVariables = Types.Exact<{ [key: string]: never; }>;

export type MeQuery = { __typename?: 'Query', me: { __typename?: 'ManagementUser', id: string, username: string, email?: string | null, firstName?: string | null, lastName?: string | null, avatar?: string | null, profile: { __typename?: 'ManagementProfile', id: string, name?: string | null, bio?: string | null, avatar?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null, banner?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null }, memberships: Array<{ __typename?: 'ManagementMembership', id: string, isOwner: boolean, brandHue?: number | null, brandChroma?: number | null, allowNotifications: boolean, hasNotificationChannel: boolean, roles: Array<{ __typename?: 'ManagementRole', identifier: string, id: string }>, roleRequests: Array<{ __typename?: 'ManagementRoleRequest', id: string, status: string, reason?: string | null, createdAt: any, respondedAt?: any | null, role: { __typename?: 'ManagementRole', id: string, description: string, identifier: string }, membership: { __typename?: 'ManagementMembership', id: string, user: { __typename?: 'ManagementUser', id: string, username: string, profile: { __typename?: 'ManagementProfile', id: string, avatar?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null } } } }>, user: { __typename?: 'ManagementUser', id: string, username: string, email?: string | null, profile: { __typename?: 'ManagementProfile', id: string, avatar?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null } }, organization: { __typename?: 'ManagementOrganization', id: string, name?: string | null, slug: string, brandHue?: number | null, brandChroma?: number | null, amIAdmin: boolean, roles: Array<{ __typename?: 'ManagementRole', id: string, identifier: string, description: string }>, roleSets: Array<{ __typename?: 'ManagementRoleSet', id: string, name: string, roles: Array<{ __typename?: 'ManagementRole', id: string, description: string, identifier: string }> }> } }>, socialAccounts: Array<
      | { __typename: 'ManagementGenericAccount', id: string, provider: string }
      | { __typename: 'ManagementGithubAccount', id: string, provider: string }
      | { __typename: 'ManagementGoogleAccount', id: string, provider: string }
      | { __typename: 'ManagementOrcidAccount', id: string, provider: string }
    > } };

export const MeDocument = {"kind":"Document", "definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Me"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"me"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MeUser"}}]}}]}},...MeUserFragmentDoc.definitions,...ProfileFragmentDoc.definitions,...MembershipFragmentDoc.definitions,...RoleRequestFragmentDoc.definitions,...ListRoleFragmentDoc.definitions,...ListOrganizationFragmentDoc.definitions,...RoleSetFragmentDoc.definitions,...ListSocialAccountFragmentDoc.definitions]} as unknown as DocumentNode;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, options);
      }
export function useMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, options);
        }
// @ts-ignore
export function useMeSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<MeQuery, MeQueryVariables>): Apollo.UseSuspenseQueryResult<MeQuery, MeQueryVariables>;
export function useMeSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<MeQuery, MeQueryVariables>): Apollo.UseSuspenseQueryResult<MeQuery | undefined, MeQueryVariables>;
export function useMeSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<MeQuery, MeQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<MeQuery, MeQueryVariables>(MeDocument, options);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeSuspenseQueryHookResult = ReturnType<typeof useMeSuspenseQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;