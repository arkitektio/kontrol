import type * as Types from '../../api/types';
import type { DocumentNode } from 'graphql';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type MembershipRequestsQueryVariables = Types.Exact<{
  id: Types.Scalars['ID']['input'];
}>;

export type MembershipRequestsQuery = { __typename?: 'Query', organization: { __typename?: 'ManagementOrganization', id: string, membershipRequests: Array<{ __typename?: 'ManagementMembershipRequest', id: string, reason?: string | null, createdAt: any, user: { __typename?: 'ManagementUser', id: string, username: string, profile: { __typename?: 'ManagementProfile', id: string, name?: string | null, avatar?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null } } }> } };

export const MembershipRequestsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"MembershipRequests"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"organization"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"membershipRequests"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"reason"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"profile"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"presignedUrl"}}]}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode;

/**
 * __useMembershipRequestsQuery__
 *
 * To run a query within a React component, call `useMembershipRequestsQuery` and pass it any options that fit your needs.
 * When your component renders, `useMembershipRequestsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMembershipRequestsQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useMembershipRequestsQuery(baseOptions: Apollo.QueryHookOptions<MembershipRequestsQuery, MembershipRequestsQueryVariables> & ({ variables: MembershipRequestsQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MembershipRequestsQuery, MembershipRequestsQueryVariables>(MembershipRequestsDocument, options);
      }
export function useMembershipRequestsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MembershipRequestsQuery, MembershipRequestsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MembershipRequestsQuery, MembershipRequestsQueryVariables>(MembershipRequestsDocument, options);
        }
// @ts-ignore
export function useMembershipRequestsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<MembershipRequestsQuery, MembershipRequestsQueryVariables>): Apollo.UseSuspenseQueryResult<MembershipRequestsQuery, MembershipRequestsQueryVariables>;
export function useMembershipRequestsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<MembershipRequestsQuery, MembershipRequestsQueryVariables>): Apollo.UseSuspenseQueryResult<MembershipRequestsQuery | undefined, MembershipRequestsQueryVariables>;
export function useMembershipRequestsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<MembershipRequestsQuery, MembershipRequestsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<MembershipRequestsQuery, MembershipRequestsQueryVariables>(MembershipRequestsDocument, options);
        }
export type MembershipRequestsQueryHookResult = ReturnType<typeof useMembershipRequestsQuery>;
export type MembershipRequestsLazyQueryHookResult = ReturnType<typeof useMembershipRequestsLazyQuery>;
export type MembershipRequestsSuspenseQueryHookResult = ReturnType<typeof useMembershipRequestsSuspenseQuery>;
export type MembershipRequestsQueryResult = Apollo.QueryResult<MembershipRequestsQuery, MembershipRequestsQueryVariables>;