import type * as Types from '../../api/types';
import type { DocumentNode } from 'graphql';
import { ListAppFragmentDoc, DetailAppFragmentDoc } from '../fragments/app.generated';
import { ListReleaseFragmentDoc } from '../fragments/release.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type AppsQueryVariables = Types.Exact<{
  filters?: Types.InputMaybe<Types.AppFilter>;
  pagination?: Types.InputMaybe<Types.OffsetPaginationInput>;
}>;

export type AppsQuery = { __typename?: 'Query', apps: Array<{ __typename?: 'ManagementApp', id: string, identifier: any, logo?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null }> };

export type DetailAppQueryVariables = Types.Exact<{
  id: Types.Scalars['ID']['input'];
}>;

export type DetailAppQuery = { __typename?: 'Query', app: { __typename?: 'ManagementApp', id: string, identifier: any, logo?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null, releases: Array<{ __typename?: 'ManagementRelease', id: string, version: any, logo?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null, app: { __typename?: 'ManagementApp', id: string, identifier: any, logo?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null } }> } };

export const AppsDocument = {"kind":"Document", "definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Apps"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filters"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"AppFilter"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pagination"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"OffsetPaginationInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"apps"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filters"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filters"}}},{"kind":"Argument","name":{"kind":"Name","value":"pagination"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pagination"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ListApp"}}]}}]}},...ListAppFragmentDoc.definitions]} as unknown as DocumentNode;

/**
 * __useAppsQuery__
 *
 * To run a query within a React component, call `useAppsQuery` and pass it any options that fit your needs.
 * When your component renders, `useAppsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAppsQuery({
 *   variables: {
 *      filters: // value for 'filters'
 *      pagination: // value for 'pagination'
 *   },
 * });
 */
export function useAppsQuery(baseOptions?: Apollo.QueryHookOptions<AppsQuery, AppsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AppsQuery, AppsQueryVariables>(AppsDocument, options);
      }
export function useAppsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AppsQuery, AppsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AppsQuery, AppsQueryVariables>(AppsDocument, options);
        }
// @ts-ignore
export function useAppsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<AppsQuery, AppsQueryVariables>): Apollo.UseSuspenseQueryResult<AppsQuery, AppsQueryVariables>;
export function useAppsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<AppsQuery, AppsQueryVariables>): Apollo.UseSuspenseQueryResult<AppsQuery | undefined, AppsQueryVariables>;
export function useAppsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<AppsQuery, AppsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<AppsQuery, AppsQueryVariables>(AppsDocument, options);
        }
export type AppsQueryHookResult = ReturnType<typeof useAppsQuery>;
export type AppsLazyQueryHookResult = ReturnType<typeof useAppsLazyQuery>;
export type AppsSuspenseQueryHookResult = ReturnType<typeof useAppsSuspenseQuery>;
export type AppsQueryResult = Apollo.QueryResult<AppsQuery, AppsQueryVariables>;
export const DetailAppDocument = {"kind":"Document", "definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"DetailApp"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"app"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"DetailApp"}}]}}]}},...DetailAppFragmentDoc.definitions,...ListReleaseFragmentDoc.definitions,...ListAppFragmentDoc.definitions]} as unknown as DocumentNode;

/**
 * __useDetailAppQuery__
 *
 * To run a query within a React component, call `useDetailAppQuery` and pass it any options that fit your needs.
 * When your component renders, `useDetailAppQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useDetailAppQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDetailAppQuery(baseOptions: Apollo.QueryHookOptions<DetailAppQuery, DetailAppQueryVariables> & ({ variables: DetailAppQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<DetailAppQuery, DetailAppQueryVariables>(DetailAppDocument, options);
      }
export function useDetailAppLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<DetailAppQuery, DetailAppQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<DetailAppQuery, DetailAppQueryVariables>(DetailAppDocument, options);
        }
// @ts-ignore
export function useDetailAppSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<DetailAppQuery, DetailAppQueryVariables>): Apollo.UseSuspenseQueryResult<DetailAppQuery, DetailAppQueryVariables>;
export function useDetailAppSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<DetailAppQuery, DetailAppQueryVariables>): Apollo.UseSuspenseQueryResult<DetailAppQuery | undefined, DetailAppQueryVariables>;
export function useDetailAppSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<DetailAppQuery, DetailAppQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<DetailAppQuery, DetailAppQueryVariables>(DetailAppDocument, options);
        }
export type DetailAppQueryHookResult = ReturnType<typeof useDetailAppQuery>;
export type DetailAppLazyQueryHookResult = ReturnType<typeof useDetailAppLazyQuery>;
export type DetailAppSuspenseQueryHookResult = ReturnType<typeof useDetailAppSuspenseQuery>;
export type DetailAppQueryResult = Apollo.QueryResult<DetailAppQuery, DetailAppQueryVariables>;