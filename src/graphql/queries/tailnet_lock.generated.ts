import type * as Types from '../../api/types';
import type { DocumentNode } from 'graphql';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type TailnetLockQueryVariables = Types.Exact<{
  id: Types.Scalars['ID']['input'];
}>;

export type TailnetLockQuery = { __typename?: 'Query', layer: { __typename?: 'ManagementLayer', id: string, name: string, tailnetName: string, tailnetLock?: { __typename?: 'ManagementTailnetLockStatus', capabilityEnabled: boolean, authorityActive: boolean, authorityDisabled: boolean, head: string, nodes: Array<{ __typename?: 'ManagementTailnetLockNode', machineId: string, name: string, signed: boolean }> } | null } };

export const TailnetLockDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"TailnetLock"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"layer"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"tailnetName"}},{"kind":"Field","name":{"kind":"Name","value":"tailnetLock"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"capabilityEnabled"}},{"kind":"Field","name":{"kind":"Name","value":"authorityActive"}},{"kind":"Field","name":{"kind":"Name","value":"authorityDisabled"}},{"kind":"Field","name":{"kind":"Name","value":"head"}},{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"machineId"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"signed"}}]}}]}}]}}]}}]} as unknown as DocumentNode;

/**
 * __useTailnetLockQuery__
 *
 * To run a query within a React component, call `useTailnetLockQuery` and pass it any options that fit your needs.
 * When your component renders, `useTailnetLockQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTailnetLockQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useTailnetLockQuery(baseOptions: Apollo.QueryHookOptions<TailnetLockQuery, TailnetLockQueryVariables> & ({ variables: TailnetLockQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<TailnetLockQuery, TailnetLockQueryVariables>(TailnetLockDocument, options);
      }
export function useTailnetLockLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<TailnetLockQuery, TailnetLockQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<TailnetLockQuery, TailnetLockQueryVariables>(TailnetLockDocument, options);
        }
// @ts-ignore
export function useTailnetLockSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<TailnetLockQuery, TailnetLockQueryVariables>): Apollo.UseSuspenseQueryResult<TailnetLockQuery, TailnetLockQueryVariables>;
export function useTailnetLockSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<TailnetLockQuery, TailnetLockQueryVariables>): Apollo.UseSuspenseQueryResult<TailnetLockQuery | undefined, TailnetLockQueryVariables>;
export function useTailnetLockSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<TailnetLockQuery, TailnetLockQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<TailnetLockQuery, TailnetLockQueryVariables>(TailnetLockDocument, options);
        }
export type TailnetLockQueryHookResult = ReturnType<typeof useTailnetLockQuery>;
export type TailnetLockLazyQueryHookResult = ReturnType<typeof useTailnetLockLazyQuery>;
export type TailnetLockSuspenseQueryHookResult = ReturnType<typeof useTailnetLockSuspenseQuery>;
export type TailnetLockQueryResult = Apollo.QueryResult<TailnetLockQuery, TailnetLockQueryVariables>;