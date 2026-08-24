import type * as Types from '../../api/types';
import type { DocumentNode } from 'graphql';
import { PublicInviteFragmentDoc, DetailInviteFragmentDoc } from '../fragments/invite.generated';
import { OrganizationFragmentDoc } from '../fragments/organization.generated';
import { RoleSetFragmentDoc } from '../fragments/role_set.generated';
import { ListRoleFragmentDoc } from '../fragments/role.generated';
import { OrganizationProfileFragmentDoc } from '../fragments/organization_profile.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type InviteByCodeQueryVariables = Types.Exact<{
  code: Types.Scalars['String']['input'];
}>;

export type InviteByCodeQuery = { __typename?: 'Query', inviteByCode: { __typename?: 'ManagementInvite', id: string, token: string, status: string, public: boolean, createdAt: any, expiresAt?: any | null, createdBy: { __typename?: 'ManagementUser', id: string, username: string, profile: { __typename?: 'ManagementProfile', id: string, avatar?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null } }, createdFor: { __typename?: 'ManagementOrganization', id: string, name?: string | null, description?: string | null, profile?: { __typename?: 'ManagementOrganizationProfile', id: string, avatar?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null } | null } } };

export type GetInviteQueryVariables = Types.Exact<{
  id: Types.Scalars['ID']['input'];
}>;

export type GetInviteQuery = { __typename?: 'Query', invite: { __typename?: 'ManagementInvite', id: string, token: string, status: string, inviteUrl: string, createdAt: any, expiresAt?: any | null, createdBy: { __typename?: 'ManagementUser', id: string, username: string, profile: { __typename?: 'ManagementProfile', id: string, avatar?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null } }, createdFor: { __typename?: 'ManagementOrganization', id: string, name?: string | null, slug: string, amIOwner: boolean, brandHue?: number | null, brandChroma?: number | null, roles: Array<{ __typename?: 'ManagementRole', id: string, identifier: string, description: string }>, roleSets: Array<{ __typename?: 'ManagementRoleSet', id: string, name: string, roles: Array<{ __typename?: 'ManagementRole', id: string, description: string, identifier: string }> }>, memberships: Array<{ __typename?: 'ManagementMembership', id: string, roles: Array<{ __typename?: 'ManagementRole', identifier: string }>, user: { __typename?: 'ManagementUser', id: string, username: string, email?: string | null, profile: { __typename?: 'ManagementProfile', id: string, avatar?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null } } }>, profile?: { __typename?: 'ManagementOrganizationProfile', id: string, name?: string | null, bio?: string | null, avatar?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null, banner?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null } | null, invites: Array<{ __typename?: 'ManagementInvite', id: string, status: string, expiresAt?: any | null, token: string, inviteUrl: string, acceptedBy?: { __typename?: 'ManagementUser', id: string, username: string, profile: { __typename?: 'ManagementProfile', id: string, avatar?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null } } | null }> }, acceptedBy?: { __typename?: 'ManagementUser', id: string, username: string, profile: { __typename?: 'ManagementProfile', id: string, avatar?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null } } | null, createdMemberships: Array<{ __typename?: 'ManagementMembership', id: string, roles: Array<{ __typename?: 'ManagementRole', identifier: string, id: string }>, user: { __typename?: 'ManagementUser', id: string, username: string, email?: string | null, profile: { __typename?: 'ManagementProfile', id: string, avatar?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null } } }> } };

export const InviteByCodeDocument = {"kind":"Document", "definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"InviteByCode"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"code"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"inviteByCode"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"inviteCode"},"value":{"kind":"Variable","name":{"kind":"Name","value":"code"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PublicInvite"}}]}}]}},...PublicInviteFragmentDoc.definitions]} as unknown as DocumentNode;

/**
 * __useInviteByCodeQuery__
 *
 * To run a query within a React component, call `useInviteByCodeQuery` and pass it any options that fit your needs.
 * When your component renders, `useInviteByCodeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useInviteByCodeQuery({
 *   variables: {
 *      code: // value for 'code'
 *   },
 * });
 */
export function useInviteByCodeQuery(baseOptions: Apollo.QueryHookOptions<InviteByCodeQuery, InviteByCodeQueryVariables> & ({ variables: InviteByCodeQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<InviteByCodeQuery, InviteByCodeQueryVariables>(InviteByCodeDocument, options);
      }
export function useInviteByCodeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<InviteByCodeQuery, InviteByCodeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<InviteByCodeQuery, InviteByCodeQueryVariables>(InviteByCodeDocument, options);
        }
// @ts-ignore
export function useInviteByCodeSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<InviteByCodeQuery, InviteByCodeQueryVariables>): Apollo.UseSuspenseQueryResult<InviteByCodeQuery, InviteByCodeQueryVariables>;
export function useInviteByCodeSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<InviteByCodeQuery, InviteByCodeQueryVariables>): Apollo.UseSuspenseQueryResult<InviteByCodeQuery | undefined, InviteByCodeQueryVariables>;
export function useInviteByCodeSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<InviteByCodeQuery, InviteByCodeQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<InviteByCodeQuery, InviteByCodeQueryVariables>(InviteByCodeDocument, options);
        }
export type InviteByCodeQueryHookResult = ReturnType<typeof useInviteByCodeQuery>;
export type InviteByCodeLazyQueryHookResult = ReturnType<typeof useInviteByCodeLazyQuery>;
export type InviteByCodeSuspenseQueryHookResult = ReturnType<typeof useInviteByCodeSuspenseQuery>;
export type InviteByCodeQueryResult = Apollo.QueryResult<InviteByCodeQuery, InviteByCodeQueryVariables>;
export const GetInviteDocument = {"kind":"Document", "definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetInvite"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"invite"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"DetailInvite"}}]}}]}},...DetailInviteFragmentDoc.definitions,...OrganizationFragmentDoc.definitions,...RoleSetFragmentDoc.definitions,...ListRoleFragmentDoc.definitions,...OrganizationProfileFragmentDoc.definitions]} as unknown as DocumentNode;

/**
 * __useGetInviteQuery__
 *
 * To run a query within a React component, call `useGetInviteQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetInviteQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetInviteQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetInviteQuery(baseOptions: Apollo.QueryHookOptions<GetInviteQuery, GetInviteQueryVariables> & ({ variables: GetInviteQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetInviteQuery, GetInviteQueryVariables>(GetInviteDocument, options);
      }
export function useGetInviteLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetInviteQuery, GetInviteQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetInviteQuery, GetInviteQueryVariables>(GetInviteDocument, options);
        }
// @ts-ignore
export function useGetInviteSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetInviteQuery, GetInviteQueryVariables>): Apollo.UseSuspenseQueryResult<GetInviteQuery, GetInviteQueryVariables>;
export function useGetInviteSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetInviteQuery, GetInviteQueryVariables>): Apollo.UseSuspenseQueryResult<GetInviteQuery | undefined, GetInviteQueryVariables>;
export function useGetInviteSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetInviteQuery, GetInviteQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetInviteQuery, GetInviteQueryVariables>(GetInviteDocument, options);
        }
export type GetInviteQueryHookResult = ReturnType<typeof useGetInviteQuery>;
export type GetInviteLazyQueryHookResult = ReturnType<typeof useGetInviteLazyQuery>;
export type GetInviteSuspenseQueryHookResult = ReturnType<typeof useGetInviteSuspenseQuery>;
export type GetInviteQueryResult = Apollo.QueryResult<GetInviteQuery, GetInviteQueryVariables>;