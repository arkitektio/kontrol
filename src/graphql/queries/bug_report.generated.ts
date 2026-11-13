import type * as Types from '../../api/types';
import type { DocumentNode } from 'graphql';
import { ListBugReportFragmentDoc, DetailBugReportFragmentDoc } from '../fragments/bug_report.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type BugReportsQueryVariables = Types.Exact<{
  filters?: Types.InputMaybe<Types.ManagementBugReportFilter>;
  pagination?: Types.InputMaybe<Types.OffsetPaginationInput>;
}>;

export type BugReportsQuery = { __typename?: 'Query', bugReports: Array<{ __typename?: 'ManagementBugReport', id: string, title: string, route?: string | null, appVersion?: string | null, createdAt: any, isResolved: boolean, forwardedAt?: any | null, hasScreenshot: boolean, organization: { __typename?: 'ManagementOrganization', id: string }, reporter?: { __typename?: 'ManagementUser', id: string, username: string } | null, client?: { __typename?: 'ManagementClient', id: string, device?: { __typename?: 'ManagementDevice', id: string, name?: string | null } | null } | null, release?: { __typename?: 'ManagementRelease', id: string, version: any, app: { __typename?: 'ManagementApp', id: string, identifier: any } } | null }> };

export type DetailBugReportQueryVariables = Types.Exact<{
  id: Types.Scalars['ID']['input'];
}>;

export type DetailBugReportQuery = { __typename?: 'Query', bugReport: { __typename?: 'ManagementBugReport', description: string, expected?: string | null, platform?: string | null, diagnostics: any, screenshot?: string | null, resolvedAt?: any | null, resolutionNote?: string | null, forwardedUrl?: string | null, githubRepo?: string | null, githubIssueNumber?: number | null, githubIssueState?: string | null, screenshotPublished: boolean, id: string, title: string, route?: string | null, appVersion?: string | null, createdAt: any, isResolved: boolean, forwardedAt?: any | null, hasScreenshot: boolean, resolvedBy?: { __typename?: 'ManagementUser', id: string, username: string } | null, forwardedBy?: { __typename?: 'ManagementUser', id: string, username: string } | null, client?: { __typename?: 'ManagementClient', id: string, issueUrl?: string | null, device?: { __typename?: 'ManagementDevice', id: string, name?: string | null } | null } | null, organization: { __typename?: 'ManagementOrganization', id: string }, reporter?: { __typename?: 'ManagementUser', id: string, username: string } | null, release?: { __typename?: 'ManagementRelease', id: string, version: any, app: { __typename?: 'ManagementApp', id: string, identifier: any } } | null } };

export type BugReportGithubForwardingQueryVariables = Types.Exact<{
  id: Types.Scalars['ID']['input'];
}>;

export type BugReportGithubForwardingQuery = { __typename?: 'Query', bugReport: { __typename?: 'ManagementBugReport', id: string, githubForwarding: { __typename?: 'ManagementGithubForwarding', available: boolean, repo?: string | null, reason?: string | null, title: string, body: string } } };

export const BugReportsDocument = {"kind":"Document", "definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"BugReports"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filters"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ManagementBugReportFilter"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pagination"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"OffsetPaginationInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"bugReports"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filters"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filters"}}},{"kind":"Argument","name":{"kind":"Name","value":"pagination"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pagination"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ListBugReport"}}]}}]}},...ListBugReportFragmentDoc.definitions]} as unknown as DocumentNode;

/**
 * __useBugReportsQuery__
 *
 * To run a query within a React component, call `useBugReportsQuery` and pass it any options that fit your needs.
 * When your component renders, `useBugReportsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useBugReportsQuery({
 *   variables: {
 *      filters: // value for 'filters'
 *      pagination: // value for 'pagination'
 *   },
 * });
 */
export function useBugReportsQuery(baseOptions?: Apollo.QueryHookOptions<BugReportsQuery, BugReportsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<BugReportsQuery, BugReportsQueryVariables>(BugReportsDocument, options);
      }
export function useBugReportsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<BugReportsQuery, BugReportsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<BugReportsQuery, BugReportsQueryVariables>(BugReportsDocument, options);
        }
// @ts-ignore
export function useBugReportsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<BugReportsQuery, BugReportsQueryVariables>): Apollo.UseSuspenseQueryResult<BugReportsQuery, BugReportsQueryVariables>;
export function useBugReportsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<BugReportsQuery, BugReportsQueryVariables>): Apollo.UseSuspenseQueryResult<BugReportsQuery | undefined, BugReportsQueryVariables>;
export function useBugReportsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<BugReportsQuery, BugReportsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<BugReportsQuery, BugReportsQueryVariables>(BugReportsDocument, options);
        }
export type BugReportsQueryHookResult = ReturnType<typeof useBugReportsQuery>;
export type BugReportsLazyQueryHookResult = ReturnType<typeof useBugReportsLazyQuery>;
export type BugReportsSuspenseQueryHookResult = ReturnType<typeof useBugReportsSuspenseQuery>;
export type BugReportsQueryResult = Apollo.QueryResult<BugReportsQuery, BugReportsQueryVariables>;
export const DetailBugReportDocument = {"kind":"Document", "definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"DetailBugReport"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"bugReport"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"DetailBugReport"}}]}}]}},...DetailBugReportFragmentDoc.definitions,...ListBugReportFragmentDoc.definitions]} as unknown as DocumentNode;

/**
 * __useDetailBugReportQuery__
 *
 * To run a query within a React component, call `useDetailBugReportQuery` and pass it any options that fit your needs.
 * When your component renders, `useDetailBugReportQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useDetailBugReportQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDetailBugReportQuery(baseOptions: Apollo.QueryHookOptions<DetailBugReportQuery, DetailBugReportQueryVariables> & ({ variables: DetailBugReportQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<DetailBugReportQuery, DetailBugReportQueryVariables>(DetailBugReportDocument, options);
      }
export function useDetailBugReportLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<DetailBugReportQuery, DetailBugReportQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<DetailBugReportQuery, DetailBugReportQueryVariables>(DetailBugReportDocument, options);
        }
// @ts-ignore
export function useDetailBugReportSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<DetailBugReportQuery, DetailBugReportQueryVariables>): Apollo.UseSuspenseQueryResult<DetailBugReportQuery, DetailBugReportQueryVariables>;
export function useDetailBugReportSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<DetailBugReportQuery, DetailBugReportQueryVariables>): Apollo.UseSuspenseQueryResult<DetailBugReportQuery | undefined, DetailBugReportQueryVariables>;
export function useDetailBugReportSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<DetailBugReportQuery, DetailBugReportQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<DetailBugReportQuery, DetailBugReportQueryVariables>(DetailBugReportDocument, options);
        }
export type DetailBugReportQueryHookResult = ReturnType<typeof useDetailBugReportQuery>;
export type DetailBugReportLazyQueryHookResult = ReturnType<typeof useDetailBugReportLazyQuery>;
export type DetailBugReportSuspenseQueryHookResult = ReturnType<typeof useDetailBugReportSuspenseQuery>;
export type DetailBugReportQueryResult = Apollo.QueryResult<DetailBugReportQuery, DetailBugReportQueryVariables>;
export const BugReportGithubForwardingDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"BugReportGithubForwarding"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"bugReport"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"githubForwarding"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"available"}},{"kind":"Field","name":{"kind":"Name","value":"repo"}},{"kind":"Field","name":{"kind":"Name","value":"reason"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"body"}}]}}]}}]}}]} as unknown as DocumentNode;

/**
 * __useBugReportGithubForwardingQuery__
 *
 * To run a query within a React component, call `useBugReportGithubForwardingQuery` and pass it any options that fit your needs.
 * When your component renders, `useBugReportGithubForwardingQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useBugReportGithubForwardingQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useBugReportGithubForwardingQuery(baseOptions: Apollo.QueryHookOptions<BugReportGithubForwardingQuery, BugReportGithubForwardingQueryVariables> & ({ variables: BugReportGithubForwardingQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<BugReportGithubForwardingQuery, BugReportGithubForwardingQueryVariables>(BugReportGithubForwardingDocument, options);
      }
export function useBugReportGithubForwardingLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<BugReportGithubForwardingQuery, BugReportGithubForwardingQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<BugReportGithubForwardingQuery, BugReportGithubForwardingQueryVariables>(BugReportGithubForwardingDocument, options);
        }
// @ts-ignore
export function useBugReportGithubForwardingSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<BugReportGithubForwardingQuery, BugReportGithubForwardingQueryVariables>): Apollo.UseSuspenseQueryResult<BugReportGithubForwardingQuery, BugReportGithubForwardingQueryVariables>;
export function useBugReportGithubForwardingSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<BugReportGithubForwardingQuery, BugReportGithubForwardingQueryVariables>): Apollo.UseSuspenseQueryResult<BugReportGithubForwardingQuery | undefined, BugReportGithubForwardingQueryVariables>;
export function useBugReportGithubForwardingSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<BugReportGithubForwardingQuery, BugReportGithubForwardingQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<BugReportGithubForwardingQuery, BugReportGithubForwardingQueryVariables>(BugReportGithubForwardingDocument, options);
        }
export type BugReportGithubForwardingQueryHookResult = ReturnType<typeof useBugReportGithubForwardingQuery>;
export type BugReportGithubForwardingLazyQueryHookResult = ReturnType<typeof useBugReportGithubForwardingLazyQuery>;
export type BugReportGithubForwardingSuspenseQueryHookResult = ReturnType<typeof useBugReportGithubForwardingSuspenseQuery>;
export type BugReportGithubForwardingQueryResult = Apollo.QueryResult<BugReportGithubForwardingQuery, BugReportGithubForwardingQueryVariables>;