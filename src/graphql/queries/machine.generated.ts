import type * as Types from '../../api/types';
import type { DocumentNode } from 'graphql';
import { MachineFragmentDoc } from '../fragments/machine.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type DetailMachineQueryVariables = Types.Exact<{
  id: Types.Scalars['ID']['input'];
}>;

export type DetailMachineQuery = { __typename?: 'Query', machine?: { __typename?: 'ManagementMachine', id: string, localId: string, name: string, ipv4?: string | null, ipv6?: string | null, connected: boolean, ephemeral: boolean, lastSeen?: any | null, tags: Array<string>, magicDnsName?: string | null, os?: string | null, keyExpiry?: any | null, authorized?: boolean | null, isExternal?: boolean | null } | null };

export const DetailMachineDocument = {"kind":"Document", "definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"DetailMachine"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"machine"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Machine"}}]}}]}},...MachineFragmentDoc.definitions]} as unknown as DocumentNode;

/**
 * __useDetailMachineQuery__
 *
 * To run a query within a React component, call `useDetailMachineQuery` and pass it any options that fit your needs.
 * When your component renders, `useDetailMachineQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useDetailMachineQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDetailMachineQuery(baseOptions: Apollo.QueryHookOptions<DetailMachineQuery, DetailMachineQueryVariables> & ({ variables: DetailMachineQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<DetailMachineQuery, DetailMachineQueryVariables>(DetailMachineDocument, options);
      }
export function useDetailMachineLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<DetailMachineQuery, DetailMachineQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<DetailMachineQuery, DetailMachineQueryVariables>(DetailMachineDocument, options);
        }
// @ts-ignore
export function useDetailMachineSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<DetailMachineQuery, DetailMachineQueryVariables>): Apollo.UseSuspenseQueryResult<DetailMachineQuery, DetailMachineQueryVariables>;
export function useDetailMachineSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<DetailMachineQuery, DetailMachineQueryVariables>): Apollo.UseSuspenseQueryResult<DetailMachineQuery | undefined, DetailMachineQueryVariables>;
export function useDetailMachineSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<DetailMachineQuery, DetailMachineQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<DetailMachineQuery, DetailMachineQueryVariables>(DetailMachineDocument, options);
        }
export type DetailMachineQueryHookResult = ReturnType<typeof useDetailMachineQuery>;
export type DetailMachineLazyQueryHookResult = ReturnType<typeof useDetailMachineLazyQuery>;
export type DetailMachineSuspenseQueryHookResult = ReturnType<typeof useDetailMachineSuspenseQuery>;
export type DetailMachineQueryResult = Apollo.QueryResult<DetailMachineQuery, DetailMachineQueryVariables>;