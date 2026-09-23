import type * as Types from '../../api/types';
import type { DocumentNode } from 'graphql';
import { ListReportFragmentDoc, TimelineReportFragmentDoc } from '../fragments/report.generated';
import { ListInstanceAliasFragmentDoc } from '../fragments/alias.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type LatestClientReportQueryVariables = Types.Exact<{
  id: Types.Scalars['ID']['input'];
}>;

export type LatestClientReportQuery = { __typename?: 'Query', client: { __typename?: 'ManagementClient', id: string, name: string, lastReportedAt?: any | null, functional: boolean, release?: { __typename?: 'ManagementRelease', version: any, app: { __typename?: 'ManagementApp', identifier: any, logo?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null } } | null, device?: { __typename?: 'ManagementDevice', id: string, name?: string | null } | null, latestReport?: { __typename?: 'ManagementReport', id: string, functional: boolean, createdAt: any, isResolved: boolean, resolvedAt?: any | null, resolutionNote?: string | null, resolvedBy?: { __typename?: 'ManagementUser', id: string, username: string } | null, entries: Array<{ __typename?: 'ManagementReportEntry', key: string, valid: boolean, reason?: string | null, alias?: { __typename?: 'ManagementInstanceAlias', id: string, host?: string | null, port?: number | null, ssl: boolean, path?: string | null, challenge: string, kind: string, resolvedHost?: string | null, scope: string, layer?: { __typename?: 'ManagementLayer', id: string, name: string } | null, instance: { __typename?: 'ManagementServiceInstance', id: string, identifier: string, release: { __typename?: 'ManagementServiceRelease', version: string, service: { __typename?: 'ManagementService', id: string, identifier: any } } } } | null }> } | null, lastHealthyReport?: { __typename?: 'ManagementReport', id: string, functional: boolean, createdAt: any, isResolved: boolean, resolvedAt?: any | null, resolutionNote?: string | null, resolvedBy?: { __typename?: 'ManagementUser', id: string, username: string } | null, entries: Array<{ __typename?: 'ManagementReportEntry', key: string, valid: boolean, reason?: string | null, alias?: { __typename?: 'ManagementInstanceAlias', id: string, host?: string | null, port?: number | null, ssl: boolean, path?: string | null, challenge: string, kind: string, resolvedHost?: string | null, scope: string, layer?: { __typename?: 'ManagementLayer', id: string, name: string } | null, instance: { __typename?: 'ManagementServiceInstance', id: string, identifier: string, release: { __typename?: 'ManagementServiceRelease', version: string, service: { __typename?: 'ManagementService', id: string, identifier: any } } } } | null }> } | null, reports: Array<{ __typename?: 'ManagementReport', id: string, functional: boolean, createdAt: any, isResolved: boolean }> } };

export const LatestClientReportDocument = {"kind":"Document", "definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"LatestClientReport"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"client"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"lastReportedAt"}},{"kind":"Field","name":{"kind":"Name","value":"functional"}},{"kind":"Field","name":{"kind":"Name","value":"release"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"app"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"identifier"}},{"kind":"Field","name":{"kind":"Name","value":"logo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"presignedUrl"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"device"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"latestReport"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ListReport"}}]}},{"kind":"Field","name":{"kind":"Name","value":"lastHealthyReport"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ListReport"}}]}},{"kind":"Field","name":{"kind":"Name","value":"reports"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"TimelineReport"}}]}}]}}]}},...ListReportFragmentDoc.definitions,...ListInstanceAliasFragmentDoc.definitions,...TimelineReportFragmentDoc.definitions]} as unknown as DocumentNode;

/**
 * __useLatestClientReportQuery__
 *
 * To run a query within a React component, call `useLatestClientReportQuery` and pass it any options that fit your needs.
 * When your component renders, `useLatestClientReportQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useLatestClientReportQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useLatestClientReportQuery(baseOptions: Apollo.QueryHookOptions<LatestClientReportQuery, LatestClientReportQueryVariables> & ({ variables: LatestClientReportQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<LatestClientReportQuery, LatestClientReportQueryVariables>(LatestClientReportDocument, options);
      }
export function useLatestClientReportLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<LatestClientReportQuery, LatestClientReportQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<LatestClientReportQuery, LatestClientReportQueryVariables>(LatestClientReportDocument, options);
        }
// @ts-ignore
export function useLatestClientReportSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<LatestClientReportQuery, LatestClientReportQueryVariables>): Apollo.UseSuspenseQueryResult<LatestClientReportQuery, LatestClientReportQueryVariables>;
export function useLatestClientReportSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<LatestClientReportQuery, LatestClientReportQueryVariables>): Apollo.UseSuspenseQueryResult<LatestClientReportQuery | undefined, LatestClientReportQueryVariables>;
export function useLatestClientReportSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<LatestClientReportQuery, LatestClientReportQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<LatestClientReportQuery, LatestClientReportQueryVariables>(LatestClientReportDocument, options);
        }
export type LatestClientReportQueryHookResult = ReturnType<typeof useLatestClientReportQuery>;
export type LatestClientReportLazyQueryHookResult = ReturnType<typeof useLatestClientReportLazyQuery>;
export type LatestClientReportSuspenseQueryHookResult = ReturnType<typeof useLatestClientReportSuspenseQuery>;
export type LatestClientReportQueryResult = Apollo.QueryResult<LatestClientReportQuery, LatestClientReportQueryVariables>;