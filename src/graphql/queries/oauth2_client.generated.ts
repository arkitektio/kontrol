import type * as Types from '../../api/types';
import type { DocumentNode } from 'graphql';
import { Oauth2ClientFragmentDoc } from '../fragments/oauth2_client.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetOauth2ClientByClientIdQueryVariables = Types.Exact<{
  clientId: Types.Scalars['String']['input'];
}>;

export type GetOauth2ClientByClientIdQuery = { __typename?: 'Query', oauth2ClientByClientId: { __typename?: 'ManagementOAuth2Client', id: string, name: string, clientId: string } };

export const GetOauth2ClientByClientIdDocument = {"kind":"Document", "definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetOauth2ClientByClientId"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"clientId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"oauth2ClientByClientId"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"clientId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"clientId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Oauth2Client"}}]}}]}},...Oauth2ClientFragmentDoc.definitions]} as unknown as DocumentNode;

/**
 * __useGetOauth2ClientByClientIdQuery__
 *
 * To run a query within a React component, call `useGetOauth2ClientByClientIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetOauth2ClientByClientIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetOauth2ClientByClientIdQuery({
 *   variables: {
 *      clientId: // value for 'clientId'
 *   },
 * });
 */
export function useGetOauth2ClientByClientIdQuery(baseOptions: Apollo.QueryHookOptions<GetOauth2ClientByClientIdQuery, GetOauth2ClientByClientIdQueryVariables> & ({ variables: GetOauth2ClientByClientIdQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetOauth2ClientByClientIdQuery, GetOauth2ClientByClientIdQueryVariables>(GetOauth2ClientByClientIdDocument, options);
      }
export function useGetOauth2ClientByClientIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetOauth2ClientByClientIdQuery, GetOauth2ClientByClientIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetOauth2ClientByClientIdQuery, GetOauth2ClientByClientIdQueryVariables>(GetOauth2ClientByClientIdDocument, options);
        }
// @ts-ignore
export function useGetOauth2ClientByClientIdSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetOauth2ClientByClientIdQuery, GetOauth2ClientByClientIdQueryVariables>): Apollo.UseSuspenseQueryResult<GetOauth2ClientByClientIdQuery, GetOauth2ClientByClientIdQueryVariables>;
export function useGetOauth2ClientByClientIdSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetOauth2ClientByClientIdQuery, GetOauth2ClientByClientIdQueryVariables>): Apollo.UseSuspenseQueryResult<GetOauth2ClientByClientIdQuery | undefined, GetOauth2ClientByClientIdQueryVariables>;
export function useGetOauth2ClientByClientIdSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetOauth2ClientByClientIdQuery, GetOauth2ClientByClientIdQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetOauth2ClientByClientIdQuery, GetOauth2ClientByClientIdQueryVariables>(GetOauth2ClientByClientIdDocument, options);
        }
export type GetOauth2ClientByClientIdQueryHookResult = ReturnType<typeof useGetOauth2ClientByClientIdQuery>;
export type GetOauth2ClientByClientIdLazyQueryHookResult = ReturnType<typeof useGetOauth2ClientByClientIdLazyQuery>;
export type GetOauth2ClientByClientIdSuspenseQueryHookResult = ReturnType<typeof useGetOauth2ClientByClientIdSuspenseQuery>;
export type GetOauth2ClientByClientIdQueryResult = Apollo.QueryResult<GetOauth2ClientByClientIdQuery, GetOauth2ClientByClientIdQueryVariables>;