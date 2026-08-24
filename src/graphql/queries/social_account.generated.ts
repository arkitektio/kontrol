import type * as Types from '../../api/types';
import type { DocumentNode } from 'graphql';
import { DetailSocialAccountFragmentDoc, OrcidSocialAccountFragmentDoc, BaseSocialAccountFragmentDoc, GithubSocialAccountFragmentDoc, GooglebSocialAccountFragmentDoc } from '../fragments/social_account.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetSocialAccountQueryVariables = Types.Exact<{
  id: Types.Scalars['ID']['input'];
}>;

export type GetSocialAccountQuery = { __typename?: 'Query', socialAccount:
    | { __typename: 'ManagementGenericAccount', id: string, provider: string }
    | { __typename: 'ManagementGithubAccount', id: string, provider: string }
    | { __typename: 'ManagementGoogleAccount', id: string, provider: string }
    | { __typename: 'ManagementOrcidAccount', id: string, provider: string, identifier?: { __typename?: 'ManagementOrcidIdentifier', uri: string, path: string, host: string } | null, person?: { __typename?: 'ManagementOrcidPerson', researcherUrls: Array<string>, addresses: Array<string> } | null }
   };

export const GetSocialAccountDocument = {"kind":"Document", "definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetSocialAccount"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"socialAccount"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"DetailSocialAccount"}}]}}]}},...DetailSocialAccountFragmentDoc.definitions,...OrcidSocialAccountFragmentDoc.definitions,...BaseSocialAccountFragmentDoc.definitions,...GithubSocialAccountFragmentDoc.definitions,...GooglebSocialAccountFragmentDoc.definitions]} as unknown as DocumentNode;

/**
 * __useGetSocialAccountQuery__
 *
 * To run a query within a React component, call `useGetSocialAccountQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetSocialAccountQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetSocialAccountQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetSocialAccountQuery(baseOptions: Apollo.QueryHookOptions<GetSocialAccountQuery, GetSocialAccountQueryVariables> & ({ variables: GetSocialAccountQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetSocialAccountQuery, GetSocialAccountQueryVariables>(GetSocialAccountDocument, options);
      }
export function useGetSocialAccountLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetSocialAccountQuery, GetSocialAccountQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetSocialAccountQuery, GetSocialAccountQueryVariables>(GetSocialAccountDocument, options);
        }
// @ts-ignore
export function useGetSocialAccountSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetSocialAccountQuery, GetSocialAccountQueryVariables>): Apollo.UseSuspenseQueryResult<GetSocialAccountQuery, GetSocialAccountQueryVariables>;
export function useGetSocialAccountSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetSocialAccountQuery, GetSocialAccountQueryVariables>): Apollo.UseSuspenseQueryResult<GetSocialAccountQuery | undefined, GetSocialAccountQueryVariables>;
export function useGetSocialAccountSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetSocialAccountQuery, GetSocialAccountQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetSocialAccountQuery, GetSocialAccountQueryVariables>(GetSocialAccountDocument, options);
        }
export type GetSocialAccountQueryHookResult = ReturnType<typeof useGetSocialAccountQuery>;
export type GetSocialAccountLazyQueryHookResult = ReturnType<typeof useGetSocialAccountLazyQuery>;
export type GetSocialAccountSuspenseQueryHookResult = ReturnType<typeof useGetSocialAccountSuspenseQuery>;
export type GetSocialAccountQueryResult = Apollo.QueryResult<GetSocialAccountQuery, GetSocialAccountQueryVariables>;