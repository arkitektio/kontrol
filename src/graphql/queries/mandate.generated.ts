import type * as Types from '../../api/types';
import type { DocumentNode } from 'graphql';
import { ListMandateFragmentDoc } from '../fragments/mandate.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type MandatesQueryVariables = Types.Exact<{
  filters?: Types.InputMaybe<Types.ManagementMandateFilter>;
  pagination?: Types.InputMaybe<Types.OffsetPaginationInput>;
}>;

export type MandatesQuery = { __typename?: 'Query', mandates: Array<{ __typename?: 'ManagementMandate', id: string, label: string, keyPrefix: string, claimant: Types.MandateClaimant, origin: Types.MandateOrigin, agentIdentifier?: string | null, maxClients?: number | null, allowMesh: boolean, createdAt: any, expiresAt?: any | null, revokedAt?: any | null, revocationReason?: Types.MandateRevocation | null, lastUsedAt?: any | null, isLive: boolean, subject: { __typename?: 'ManagementMandatePin', identifier?: string | null, version?: string | null, deviceId?: string | null, scopes?: Array<string> | null }, grantor: { __typename?: 'ManagementUser', id: string, username: string }, hub: { __typename?: 'ManagementHub', id: string, name: string }, clients: Array<{ __typename?: 'ManagementClient', id: string }> }> };

export const MandatesDocument = {"kind":"Document", "definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Mandates"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filters"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ManagementMandateFilter"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pagination"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"OffsetPaginationInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"mandates"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filters"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filters"}}},{"kind":"Argument","name":{"kind":"Name","value":"pagination"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pagination"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ListMandate"}}]}}]}},...ListMandateFragmentDoc.definitions]} as unknown as DocumentNode;

/**
 * __useMandatesQuery__
 *
 * To run a query within a React component, call `useMandatesQuery` and pass it any options that fit your needs.
 * When your component renders, `useMandatesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMandatesQuery({
 *   variables: {
 *      filters: // value for 'filters'
 *      pagination: // value for 'pagination'
 *   },
 * });
 */
export function useMandatesQuery(baseOptions?: Apollo.QueryHookOptions<MandatesQuery, MandatesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MandatesQuery, MandatesQueryVariables>(MandatesDocument, options);
      }
export function useMandatesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MandatesQuery, MandatesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MandatesQuery, MandatesQueryVariables>(MandatesDocument, options);
        }
// @ts-ignore
export function useMandatesSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<MandatesQuery, MandatesQueryVariables>): Apollo.UseSuspenseQueryResult<MandatesQuery, MandatesQueryVariables>;
export function useMandatesSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<MandatesQuery, MandatesQueryVariables>): Apollo.UseSuspenseQueryResult<MandatesQuery | undefined, MandatesQueryVariables>;
export function useMandatesSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<MandatesQuery, MandatesQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<MandatesQuery, MandatesQueryVariables>(MandatesDocument, options);
        }
export type MandatesQueryHookResult = ReturnType<typeof useMandatesQuery>;
export type MandatesLazyQueryHookResult = ReturnType<typeof useMandatesLazyQuery>;
export type MandatesSuspenseQueryHookResult = ReturnType<typeof useMandatesSuspenseQuery>;
export type MandatesQueryResult = Apollo.QueryResult<MandatesQuery, MandatesQueryVariables>;