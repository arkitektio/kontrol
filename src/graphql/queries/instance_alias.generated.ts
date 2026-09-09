import type * as Types from '../../api/types';
import type { DocumentNode } from 'graphql';
import { ListInstanceAliasFragmentDoc, InstanceAliasFragmentDoc } from '../fragments/alias.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type ListInstanceAliasQueryVariables = Types.Exact<{
  filters?: Types.InputMaybe<Types.ManagementInstanceAliasFilter>;
  pagination?: Types.InputMaybe<Types.OffsetPaginationInput>;
  ordering?: Types.InputMaybe<Array<Types.ManagementInstanceAliasOrdering> | Types.ManagementInstanceAliasOrdering>;
}>;

export type ListInstanceAliasQuery = { __typename?: 'Query', instanceAliases: Array<{ __typename?: 'ManagementInstanceAlias', id: string, host?: string | null, port?: number | null, ssl: boolean, path?: string | null, challenge: string, kind: string, scope: string, layer?: { __typename?: 'ManagementLayer', id: string, name: string } | null, instance: { __typename?: 'ManagementServiceInstance', id: string, identifier: string, release: { __typename?: 'ManagementServiceRelease', version: string, service: { __typename?: 'ManagementService', id: string, identifier: any } } } }> };

export type DetailInstanceAliasQueryVariables = Types.Exact<{
  id: Types.Scalars['ID']['input'];
}>;

export type DetailInstanceAliasQuery = { __typename?: 'Query', instanceAlias: { __typename?: 'ManagementInstanceAlias', id: string, host?: string | null, port?: number | null, ssl: boolean, path?: string | null, challenge: string, kind: string, scope: string, layer?: { __typename?: 'ManagementLayer', id: string, name: string } | null, instance: { __typename?: 'ManagementServiceInstance', id: string }, organization: { __typename?: 'ManagementOrganization', id: string } } };

export const ListInstanceAliasDocument = {"kind":"Document", "definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ListInstanceAlias"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filters"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ManagementInstanceAliasFilter"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pagination"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"OffsetPaginationInput"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"ordering"}},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ManagementInstanceAliasOrdering"}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"instanceAliases"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filters"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filters"}}},{"kind":"Argument","name":{"kind":"Name","value":"pagination"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pagination"}}},{"kind":"Argument","name":{"kind":"Name","value":"ordering"},"value":{"kind":"Variable","name":{"kind":"Name","value":"ordering"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ListInstanceAlias"}}]}}]}},...ListInstanceAliasFragmentDoc.definitions]} as unknown as DocumentNode;

/**
 * __useListInstanceAliasQuery__
 *
 * To run a query within a React component, call `useListInstanceAliasQuery` and pass it any options that fit your needs.
 * When your component renders, `useListInstanceAliasQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useListInstanceAliasQuery({
 *   variables: {
 *      filters: // value for 'filters'
 *      pagination: // value for 'pagination'
 *      ordering: // value for 'ordering'
 *   },
 * });
 */
export function useListInstanceAliasQuery(baseOptions?: Apollo.QueryHookOptions<ListInstanceAliasQuery, ListInstanceAliasQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ListInstanceAliasQuery, ListInstanceAliasQueryVariables>(ListInstanceAliasDocument, options);
      }
export function useListInstanceAliasLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ListInstanceAliasQuery, ListInstanceAliasQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ListInstanceAliasQuery, ListInstanceAliasQueryVariables>(ListInstanceAliasDocument, options);
        }
// @ts-ignore
export function useListInstanceAliasSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<ListInstanceAliasQuery, ListInstanceAliasQueryVariables>): Apollo.UseSuspenseQueryResult<ListInstanceAliasQuery, ListInstanceAliasQueryVariables>;
export function useListInstanceAliasSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<ListInstanceAliasQuery, ListInstanceAliasQueryVariables>): Apollo.UseSuspenseQueryResult<ListInstanceAliasQuery | undefined, ListInstanceAliasQueryVariables>;
export function useListInstanceAliasSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<ListInstanceAliasQuery, ListInstanceAliasQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ListInstanceAliasQuery, ListInstanceAliasQueryVariables>(ListInstanceAliasDocument, options);
        }
export type ListInstanceAliasQueryHookResult = ReturnType<typeof useListInstanceAliasQuery>;
export type ListInstanceAliasLazyQueryHookResult = ReturnType<typeof useListInstanceAliasLazyQuery>;
export type ListInstanceAliasSuspenseQueryHookResult = ReturnType<typeof useListInstanceAliasSuspenseQuery>;
export type ListInstanceAliasQueryResult = Apollo.QueryResult<ListInstanceAliasQuery, ListInstanceAliasQueryVariables>;
export const DetailInstanceAliasDocument = {"kind":"Document", "definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"DetailInstanceAlias"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"instanceAlias"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"InstanceAlias"}}]}}]}},...InstanceAliasFragmentDoc.definitions]} as unknown as DocumentNode;

/**
 * __useDetailInstanceAliasQuery__
 *
 * To run a query within a React component, call `useDetailInstanceAliasQuery` and pass it any options that fit your needs.
 * When your component renders, `useDetailInstanceAliasQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useDetailInstanceAliasQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDetailInstanceAliasQuery(baseOptions: Apollo.QueryHookOptions<DetailInstanceAliasQuery, DetailInstanceAliasQueryVariables> & ({ variables: DetailInstanceAliasQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<DetailInstanceAliasQuery, DetailInstanceAliasQueryVariables>(DetailInstanceAliasDocument, options);
      }
export function useDetailInstanceAliasLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<DetailInstanceAliasQuery, DetailInstanceAliasQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<DetailInstanceAliasQuery, DetailInstanceAliasQueryVariables>(DetailInstanceAliasDocument, options);
        }
// @ts-ignore
export function useDetailInstanceAliasSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<DetailInstanceAliasQuery, DetailInstanceAliasQueryVariables>): Apollo.UseSuspenseQueryResult<DetailInstanceAliasQuery, DetailInstanceAliasQueryVariables>;
export function useDetailInstanceAliasSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<DetailInstanceAliasQuery, DetailInstanceAliasQueryVariables>): Apollo.UseSuspenseQueryResult<DetailInstanceAliasQuery | undefined, DetailInstanceAliasQueryVariables>;
export function useDetailInstanceAliasSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<DetailInstanceAliasQuery, DetailInstanceAliasQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<DetailInstanceAliasQuery, DetailInstanceAliasQueryVariables>(DetailInstanceAliasDocument, options);
        }
export type DetailInstanceAliasQueryHookResult = ReturnType<typeof useDetailInstanceAliasQuery>;
export type DetailInstanceAliasLazyQueryHookResult = ReturnType<typeof useDetailInstanceAliasLazyQuery>;
export type DetailInstanceAliasSuspenseQueryHookResult = ReturnType<typeof useDetailInstanceAliasSuspenseQuery>;
export type DetailInstanceAliasQueryResult = Apollo.QueryResult<DetailInstanceAliasQuery, DetailInstanceAliasQueryVariables>;