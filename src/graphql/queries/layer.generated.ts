import type * as Types from '../../api/types';
import type { DocumentNode } from 'graphql';
import { ListLayerFragmentDoc, LayerFragmentDoc } from '../fragments/layer.generated';
import { ListInstanceAliasFragmentDoc } from '../fragments/alias.generated';
import { MachineFragmentDoc } from '../fragments/machine.generated';
import { ListIonscaleAuthKeyFragmentDoc } from '../fragments/auth_key.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type LayersQueryVariables = Types.Exact<{
  filters?: Types.InputMaybe<Types.ManagementLayerFilter>;
  pagination?: Types.InputMaybe<Types.OffsetPaginationInput>;
  ordering?: Types.InputMaybe<Array<Types.ManagementLayerOrdering> | Types.ManagementLayerOrdering>;
}>;

export type LayersQuery = { __typename?: 'Query', layers: Array<{ __typename?: 'ManagementLayer', id: string, name: string, description?: string | null, logo?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null }> };

export type DetailLayerQueryVariables = Types.Exact<{
  id: Types.Scalars['ID']['input'];
}>;

export type DetailLayerQuery = { __typename?: 'Query', layer: { __typename?: 'ManagementLayer', id: string, name: string, description?: string | null, magicDnsEnabled: boolean, httpsEnabled: boolean, logo?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null, aliases: Array<{ __typename?: 'ManagementInstanceAlias', id: string, host?: string | null, port?: number | null, ssl: boolean, path?: string | null, challenge: string, kind: string, resolvedHost?: string | null, scope: string, layer?: { __typename?: 'ManagementLayer', id: string, name: string } | null, instance: { __typename?: 'ManagementServiceInstance', id: string, identifier: string, release: { __typename?: 'ManagementServiceRelease', version: string, service: { __typename?: 'ManagementService', id: string, identifier: any } } } }>, machines: Array<{ __typename?: 'ManagementMachine', id: string, localId: string, name: string, ipv4?: string | null, ipv6?: string | null, connected: boolean, ephemeral: boolean, lastSeen?: any | null, tags: Array<string>, magicDnsName?: string | null, os?: string | null, keyExpiry?: any | null, authorized?: boolean | null, isExternal?: boolean | null }>, authKeys: Array<{ __typename?: 'ManagementIonscaleAuthKey', id: string, key?: string | null, createdAt: any, ephemeral: boolean, tags: Array<string>, creator: { __typename?: 'ManagementUser', id: string, email?: string | null } }> } };

export const LayersDocument = {"kind":"Document", "definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Layers"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filters"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ManagementLayerFilter"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pagination"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"OffsetPaginationInput"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"ordering"}},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ManagementLayerOrdering"}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"layers"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filters"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filters"}}},{"kind":"Argument","name":{"kind":"Name","value":"pagination"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pagination"}}},{"kind":"Argument","name":{"kind":"Name","value":"ordering"},"value":{"kind":"Variable","name":{"kind":"Name","value":"ordering"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ListLayer"}}]}}]}},...ListLayerFragmentDoc.definitions]} as unknown as DocumentNode;

/**
 * __useLayersQuery__
 *
 * To run a query within a React component, call `useLayersQuery` and pass it any options that fit your needs.
 * When your component renders, `useLayersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useLayersQuery({
 *   variables: {
 *      filters: // value for 'filters'
 *      pagination: // value for 'pagination'
 *      ordering: // value for 'ordering'
 *   },
 * });
 */
export function useLayersQuery(baseOptions?: Apollo.QueryHookOptions<LayersQuery, LayersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<LayersQuery, LayersQueryVariables>(LayersDocument, options);
      }
export function useLayersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<LayersQuery, LayersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<LayersQuery, LayersQueryVariables>(LayersDocument, options);
        }
// @ts-ignore
export function useLayersSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<LayersQuery, LayersQueryVariables>): Apollo.UseSuspenseQueryResult<LayersQuery, LayersQueryVariables>;
export function useLayersSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<LayersQuery, LayersQueryVariables>): Apollo.UseSuspenseQueryResult<LayersQuery | undefined, LayersQueryVariables>;
export function useLayersSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<LayersQuery, LayersQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<LayersQuery, LayersQueryVariables>(LayersDocument, options);
        }
export type LayersQueryHookResult = ReturnType<typeof useLayersQuery>;
export type LayersLazyQueryHookResult = ReturnType<typeof useLayersLazyQuery>;
export type LayersSuspenseQueryHookResult = ReturnType<typeof useLayersSuspenseQuery>;
export type LayersQueryResult = Apollo.QueryResult<LayersQuery, LayersQueryVariables>;
export const DetailLayerDocument = {"kind":"Document", "definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"DetailLayer"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"layer"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Layer"}}]}}]}},...LayerFragmentDoc.definitions,...ListInstanceAliasFragmentDoc.definitions,...MachineFragmentDoc.definitions,...ListIonscaleAuthKeyFragmentDoc.definitions]} as unknown as DocumentNode;

/**
 * __useDetailLayerQuery__
 *
 * To run a query within a React component, call `useDetailLayerQuery` and pass it any options that fit your needs.
 * When your component renders, `useDetailLayerQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useDetailLayerQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDetailLayerQuery(baseOptions: Apollo.QueryHookOptions<DetailLayerQuery, DetailLayerQueryVariables> & ({ variables: DetailLayerQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<DetailLayerQuery, DetailLayerQueryVariables>(DetailLayerDocument, options);
      }
export function useDetailLayerLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<DetailLayerQuery, DetailLayerQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<DetailLayerQuery, DetailLayerQueryVariables>(DetailLayerDocument, options);
        }
// @ts-ignore
export function useDetailLayerSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<DetailLayerQuery, DetailLayerQueryVariables>): Apollo.UseSuspenseQueryResult<DetailLayerQuery, DetailLayerQueryVariables>;
export function useDetailLayerSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<DetailLayerQuery, DetailLayerQueryVariables>): Apollo.UseSuspenseQueryResult<DetailLayerQuery | undefined, DetailLayerQueryVariables>;
export function useDetailLayerSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<DetailLayerQuery, DetailLayerQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<DetailLayerQuery, DetailLayerQueryVariables>(DetailLayerDocument, options);
        }
export type DetailLayerQueryHookResult = ReturnType<typeof useDetailLayerQuery>;
export type DetailLayerLazyQueryHookResult = ReturnType<typeof useDetailLayerLazyQuery>;
export type DetailLayerSuspenseQueryHookResult = ReturnType<typeof useDetailLayerSuspenseQuery>;
export type DetailLayerQueryResult = Apollo.QueryResult<DetailLayerQuery, DetailLayerQueryVariables>;