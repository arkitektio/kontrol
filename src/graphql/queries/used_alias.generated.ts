import type * as Types from '../../api/types';
import type { DocumentNode } from 'graphql';
import { ListUsedAliasFragmentDoc, DetailUsedAliasFragmentDoc } from '../fragments/used_alias.generated';
import { ListInstanceAliasFragmentDoc, InstanceAliasFragmentDoc } from '../fragments/alias.generated';
import { ListClientFragmentDoc } from '../fragments/client.generated';
import { ManifestFragmentDoc } from '../fragments/manifest.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type ListUsedAliasesQueryVariables = Types.Exact<{
  pagination?: Types.InputMaybe<Types.OffsetPaginationInput>;
}>;

export type ListUsedAliasesQuery = { __typename?: 'Query', usedAliases: Array<{ __typename?: 'ManagementUsedAlias', id: string, key: string, valid: boolean, reason?: string | null, alias?: { __typename?: 'ManagementInstanceAlias', id: string, host?: string | null, port?: number | null, ssl: boolean, path?: string | null, challenge: string, kind: string, scope: string, layer?: { __typename?: 'ManagementLayer', id: string, name: string } | null, instance: { __typename?: 'ManagementServiceInstance', id: string, identifier: string, release: { __typename?: 'ManagementServiceRelease', version: string, service: { __typename?: 'ManagementService', id: string, identifier: any } } } } | null }> };

export type GetUsedAliasQueryVariables = Types.Exact<{
  id: Types.Scalars['ID']['input'];
}>;

export type GetUsedAliasQuery = { __typename?: 'Query', usedAlias: { __typename?: 'ManagementUsedAlias', id: string, key: string, valid: boolean, reason?: string | null, alias?: { __typename?: 'ManagementInstanceAlias', id: string, host?: string | null, port?: number | null, ssl: boolean, path?: string | null, challenge: string, kind: string, scope: string, layer?: { __typename?: 'ManagementLayer', id: string, name: string } | null, instance: { __typename?: 'ManagementServiceInstance', id: string }, organization: { __typename?: 'ManagementOrganization', id: string } } | null, client: { __typename?: 'ManagementClient', id: string, name: string, kind: Types.ClientKind, lastReportedAt?: any | null, organization?: { __typename?: 'ManagementOrganization', id: string } | null, user?: { __typename?: 'ManagementUser', id: string, username: string } | null, logo?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null, device?: { __typename?: 'ManagementDevice', id: string, name?: string | null } | null, release?: { __typename?: 'ManagementRelease', version: any, logo?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null, app: { __typename?: 'ManagementApp', id: string, identifier: any, logo?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null } } | null, manifest?: { __typename?: 'ManagementStagingManifest', identifier: string, version: string, requirements: Array<{ __typename?: 'ManagementStagingRequirement', key: string, description?: string | null }> } | null } } };

export const ListUsedAliasesDocument = {"kind":"Document", "definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ListUsedAliases"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pagination"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"OffsetPaginationInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"usedAliases"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"pagination"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pagination"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ListUsedAlias"}}]}}]}},...ListUsedAliasFragmentDoc.definitions,...ListInstanceAliasFragmentDoc.definitions]} as unknown as DocumentNode;

/**
 * __useListUsedAliasesQuery__
 *
 * To run a query within a React component, call `useListUsedAliasesQuery` and pass it any options that fit your needs.
 * When your component renders, `useListUsedAliasesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useListUsedAliasesQuery({
 *   variables: {
 *      pagination: // value for 'pagination'
 *   },
 * });
 */
export function useListUsedAliasesQuery(baseOptions?: Apollo.QueryHookOptions<ListUsedAliasesQuery, ListUsedAliasesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ListUsedAliasesQuery, ListUsedAliasesQueryVariables>(ListUsedAliasesDocument, options);
      }
export function useListUsedAliasesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ListUsedAliasesQuery, ListUsedAliasesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ListUsedAliasesQuery, ListUsedAliasesQueryVariables>(ListUsedAliasesDocument, options);
        }
// @ts-ignore
export function useListUsedAliasesSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<ListUsedAliasesQuery, ListUsedAliasesQueryVariables>): Apollo.UseSuspenseQueryResult<ListUsedAliasesQuery, ListUsedAliasesQueryVariables>;
export function useListUsedAliasesSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<ListUsedAliasesQuery, ListUsedAliasesQueryVariables>): Apollo.UseSuspenseQueryResult<ListUsedAliasesQuery | undefined, ListUsedAliasesQueryVariables>;
export function useListUsedAliasesSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<ListUsedAliasesQuery, ListUsedAliasesQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ListUsedAliasesQuery, ListUsedAliasesQueryVariables>(ListUsedAliasesDocument, options);
        }
export type ListUsedAliasesQueryHookResult = ReturnType<typeof useListUsedAliasesQuery>;
export type ListUsedAliasesLazyQueryHookResult = ReturnType<typeof useListUsedAliasesLazyQuery>;
export type ListUsedAliasesSuspenseQueryHookResult = ReturnType<typeof useListUsedAliasesSuspenseQuery>;
export type ListUsedAliasesQueryResult = Apollo.QueryResult<ListUsedAliasesQuery, ListUsedAliasesQueryVariables>;
export const GetUsedAliasDocument = {"kind":"Document", "definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetUsedAlias"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"usedAlias"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"DetailUsedAlias"}}]}}]}},...DetailUsedAliasFragmentDoc.definitions,...InstanceAliasFragmentDoc.definitions,...ListClientFragmentDoc.definitions,...ManifestFragmentDoc.definitions]} as unknown as DocumentNode;

/**
 * __useGetUsedAliasQuery__
 *
 * To run a query within a React component, call `useGetUsedAliasQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUsedAliasQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUsedAliasQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetUsedAliasQuery(baseOptions: Apollo.QueryHookOptions<GetUsedAliasQuery, GetUsedAliasQueryVariables> & ({ variables: GetUsedAliasQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUsedAliasQuery, GetUsedAliasQueryVariables>(GetUsedAliasDocument, options);
      }
export function useGetUsedAliasLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUsedAliasQuery, GetUsedAliasQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUsedAliasQuery, GetUsedAliasQueryVariables>(GetUsedAliasDocument, options);
        }
// @ts-ignore
export function useGetUsedAliasSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetUsedAliasQuery, GetUsedAliasQueryVariables>): Apollo.UseSuspenseQueryResult<GetUsedAliasQuery, GetUsedAliasQueryVariables>;
export function useGetUsedAliasSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetUsedAliasQuery, GetUsedAliasQueryVariables>): Apollo.UseSuspenseQueryResult<GetUsedAliasQuery | undefined, GetUsedAliasQueryVariables>;
export function useGetUsedAliasSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetUsedAliasQuery, GetUsedAliasQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetUsedAliasQuery, GetUsedAliasQueryVariables>(GetUsedAliasDocument, options);
        }
export type GetUsedAliasQueryHookResult = ReturnType<typeof useGetUsedAliasQuery>;
export type GetUsedAliasLazyQueryHookResult = ReturnType<typeof useGetUsedAliasLazyQuery>;
export type GetUsedAliasSuspenseQueryHookResult = ReturnType<typeof useGetUsedAliasSuspenseQuery>;
export type GetUsedAliasQueryResult = Apollo.QueryResult<GetUsedAliasQuery, GetUsedAliasQueryVariables>;