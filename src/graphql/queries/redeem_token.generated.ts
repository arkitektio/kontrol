import type * as Types from '../../api/types';
import type { DocumentNode } from 'graphql';
import { ListRedeemTokenFragmentDoc } from '../fragments/redeem_token.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type RedeemTokensQueryVariables = Types.Exact<{
  filters?: Types.InputMaybe<Types.ManagementRedeemTokenFilter>;
  pagination?: Types.InputMaybe<Types.OffsetPaginationInput>;
}>;

export type RedeemTokensQuery = { __typename?: 'Query', redeemTokens: Array<{ __typename?: 'ManagementRedeemToken', id: string, token?: string | null, createdAt: any, expiresAt?: any | null, hub: { __typename?: 'ManagementHub', id: string, name: string, organization: { __typename?: 'ManagementOrganization', id: string, name?: string | null } }, user: { __typename?: 'ManagementUser', id: string, email?: string | null }, client?: { __typename?: 'ManagementClient', id: string, release?: { __typename?: 'ManagementRelease', version: any, app: { __typename?: 'ManagementApp', identifier: any } } | null } | null }> };

export const RedeemTokensDocument = {"kind":"Document", "definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"RedeemTokens"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filters"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ManagementRedeemTokenFilter"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pagination"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"OffsetPaginationInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"redeemTokens"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filters"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filters"}}},{"kind":"Argument","name":{"kind":"Name","value":"pagination"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pagination"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ListRedeemToken"}}]}}]}},...ListRedeemTokenFragmentDoc.definitions]} as unknown as DocumentNode;

/**
 * __useRedeemTokensQuery__
 *
 * To run a query within a React component, call `useRedeemTokensQuery` and pass it any options that fit your needs.
 * When your component renders, `useRedeemTokensQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useRedeemTokensQuery({
 *   variables: {
 *      filters: // value for 'filters'
 *      pagination: // value for 'pagination'
 *   },
 * });
 */
export function useRedeemTokensQuery(baseOptions?: Apollo.QueryHookOptions<RedeemTokensQuery, RedeemTokensQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<RedeemTokensQuery, RedeemTokensQueryVariables>(RedeemTokensDocument, options);
      }
export function useRedeemTokensLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<RedeemTokensQuery, RedeemTokensQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<RedeemTokensQuery, RedeemTokensQueryVariables>(RedeemTokensDocument, options);
        }
// @ts-ignore
export function useRedeemTokensSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<RedeemTokensQuery, RedeemTokensQueryVariables>): Apollo.UseSuspenseQueryResult<RedeemTokensQuery, RedeemTokensQueryVariables>;
export function useRedeemTokensSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<RedeemTokensQuery, RedeemTokensQueryVariables>): Apollo.UseSuspenseQueryResult<RedeemTokensQuery | undefined, RedeemTokensQueryVariables>;
export function useRedeemTokensSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<RedeemTokensQuery, RedeemTokensQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<RedeemTokensQuery, RedeemTokensQueryVariables>(RedeemTokensDocument, options);
        }
export type RedeemTokensQueryHookResult = ReturnType<typeof useRedeemTokensQuery>;
export type RedeemTokensLazyQueryHookResult = ReturnType<typeof useRedeemTokensLazyQuery>;
export type RedeemTokensSuspenseQueryHookResult = ReturnType<typeof useRedeemTokensSuspenseQuery>;
export type RedeemTokensQueryResult = Apollo.QueryResult<RedeemTokensQuery, RedeemTokensQueryVariables>;