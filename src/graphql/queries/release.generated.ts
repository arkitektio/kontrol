import type * as Types from '../../api/types';
import type { DocumentNode } from 'graphql';
import { ListReleaseFragmentDoc, DetailReleaseFragmentDoc } from '../fragments/release.generated';
import { ListAppFragmentDoc } from '../fragments/app.generated';
import { ListClientFragmentDoc } from '../fragments/client.generated';
import { ManifestFragmentDoc } from '../fragments/manifest.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type ReleasesQueryVariables = Types.Exact<{ [key: string]: never; }>;

export type ReleasesQuery = { __typename?: 'Query', releases: Array<{ __typename?: 'ManagementRelease', id: string, version: any, logo?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null, app: { __typename?: 'ManagementApp', id: string, identifier: any, logo?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null } }> };

export type DetailReleaseQueryVariables = Types.Exact<{
  id: Types.Scalars['ID']['input'];
}>;

export type DetailReleaseQuery = { __typename?: 'Query', release: { __typename?: 'ManagementRelease', id: string, version: any, logo?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null, app: { __typename?: 'ManagementApp', id: string, identifier: any, logo?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null }, clients: Array<{ __typename?: 'ManagementClient', id: string, name: string, kind: Types.ClientKind, lastReportedAt?: any | null, organization?: { __typename?: 'ManagementOrganization', id: string } | null, user?: { __typename?: 'ManagementUser', id: string, username: string } | null, logo?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null, device?: { __typename?: 'ManagementDevice', id: string, name?: string | null } | null, release?: { __typename?: 'ManagementRelease', version: any, logo?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null, app: { __typename?: 'ManagementApp', id: string, identifier: any, logo?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null } } | null, manifest?: { __typename?: 'ManagementStagingManifest', identifier: string, version: string, requirements: Array<{ __typename?: 'ManagementStagingRequirement', key: string, description?: string | null }> } | null }> } };

export const ReleasesDocument = {"kind":"Document", "definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Releases"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"releases"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ListRelease"}}]}}]}},...ListReleaseFragmentDoc.definitions,...ListAppFragmentDoc.definitions]} as unknown as DocumentNode;

/**
 * __useReleasesQuery__
 *
 * To run a query within a React component, call `useReleasesQuery` and pass it any options that fit your needs.
 * When your component renders, `useReleasesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useReleasesQuery({
 *   variables: {
 *   },
 * });
 */
export function useReleasesQuery(baseOptions?: Apollo.QueryHookOptions<ReleasesQuery, ReleasesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ReleasesQuery, ReleasesQueryVariables>(ReleasesDocument, options);
      }
export function useReleasesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ReleasesQuery, ReleasesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ReleasesQuery, ReleasesQueryVariables>(ReleasesDocument, options);
        }
// @ts-ignore
export function useReleasesSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<ReleasesQuery, ReleasesQueryVariables>): Apollo.UseSuspenseQueryResult<ReleasesQuery, ReleasesQueryVariables>;
export function useReleasesSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<ReleasesQuery, ReleasesQueryVariables>): Apollo.UseSuspenseQueryResult<ReleasesQuery | undefined, ReleasesQueryVariables>;
export function useReleasesSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<ReleasesQuery, ReleasesQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ReleasesQuery, ReleasesQueryVariables>(ReleasesDocument, options);
        }
export type ReleasesQueryHookResult = ReturnType<typeof useReleasesQuery>;
export type ReleasesLazyQueryHookResult = ReturnType<typeof useReleasesLazyQuery>;
export type ReleasesSuspenseQueryHookResult = ReturnType<typeof useReleasesSuspenseQuery>;
export type ReleasesQueryResult = Apollo.QueryResult<ReleasesQuery, ReleasesQueryVariables>;
export const DetailReleaseDocument = {"kind":"Document", "definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"DetailRelease"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"release"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"DetailRelease"}}]}}]}},...DetailReleaseFragmentDoc.definitions,...ListAppFragmentDoc.definitions,...ListClientFragmentDoc.definitions,...ManifestFragmentDoc.definitions]} as unknown as DocumentNode;

/**
 * __useDetailReleaseQuery__
 *
 * To run a query within a React component, call `useDetailReleaseQuery` and pass it any options that fit your needs.
 * When your component renders, `useDetailReleaseQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useDetailReleaseQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDetailReleaseQuery(baseOptions: Apollo.QueryHookOptions<DetailReleaseQuery, DetailReleaseQueryVariables> & ({ variables: DetailReleaseQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<DetailReleaseQuery, DetailReleaseQueryVariables>(DetailReleaseDocument, options);
      }
export function useDetailReleaseLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<DetailReleaseQuery, DetailReleaseQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<DetailReleaseQuery, DetailReleaseQueryVariables>(DetailReleaseDocument, options);
        }
// @ts-ignore
export function useDetailReleaseSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<DetailReleaseQuery, DetailReleaseQueryVariables>): Apollo.UseSuspenseQueryResult<DetailReleaseQuery, DetailReleaseQueryVariables>;
export function useDetailReleaseSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<DetailReleaseQuery, DetailReleaseQueryVariables>): Apollo.UseSuspenseQueryResult<DetailReleaseQuery | undefined, DetailReleaseQueryVariables>;
export function useDetailReleaseSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<DetailReleaseQuery, DetailReleaseQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<DetailReleaseQuery, DetailReleaseQueryVariables>(DetailReleaseDocument, options);
        }
export type DetailReleaseQueryHookResult = ReturnType<typeof useDetailReleaseQuery>;
export type DetailReleaseLazyQueryHookResult = ReturnType<typeof useDetailReleaseLazyQuery>;
export type DetailReleaseSuspenseQueryHookResult = ReturnType<typeof useDetailReleaseSuspenseQuery>;
export type DetailReleaseQueryResult = Apollo.QueryResult<DetailReleaseQuery, DetailReleaseQueryVariables>;