import type * as Types from '../../api/types';
import type { DocumentNode } from 'graphql';
import { ListKommunityPartnerFragmentDoc, KommunityPartnerFragmentDoc } from '../fragments/partner.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type ListKommunityPartnerQueryVariables = Types.Exact<{
  pagination?: Types.InputMaybe<Types.OffsetPaginationInput>;
  filters?: Types.InputMaybe<Types.ManagementKommunityPartnerFilter>;
  ordering?: Types.InputMaybe<Array<Types.ManagementKommunityPartnerOrdering> | Types.ManagementKommunityPartnerOrdering>;
}>;

export type ListKommunityPartnerQuery = { __typename?: 'Query', kommunityPartners: Array<{ __typename?: 'ManagementKommunityPartner', id: string, identifier: string, name: string, description?: string | null, shortDescription?: string | null, logoUrl?: string | null, imageUrl?: string | null, authUrl?: string | null, websiteUrl?: string | null, partnerKind: string, kommunityKind: string, autoConfigure: boolean }> };

export type GetKommunityPartnerQueryVariables = Types.Exact<{
  id: Types.Scalars['ID']['input'];
}>;

export type GetKommunityPartnerQuery = { __typename?: 'Query', kommunityPartner: { __typename?: 'ManagementKommunityPartner', id: string, identifier: string, name: string, description?: string | null, shortDescription?: string | null, logoUrl?: string | null, imageUrl?: string | null, authUrl?: string | null, websiteUrl?: string | null, licenseAgreement?: string | null, partnerKind: string, kommunityKind: string, autoConfigure: boolean } };

export const ListKommunityPartnerDocument = {"kind":"Document", "definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ListKommunityPartner"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pagination"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"OffsetPaginationInput"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filters"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ManagementKommunityPartnerFilter"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"ordering"}},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ManagementKommunityPartnerOrdering"}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"kommunityPartners"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"pagination"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pagination"}}},{"kind":"Argument","name":{"kind":"Name","value":"filters"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filters"}}},{"kind":"Argument","name":{"kind":"Name","value":"ordering"},"value":{"kind":"Variable","name":{"kind":"Name","value":"ordering"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ListKommunityPartner"}}]}}]}},...ListKommunityPartnerFragmentDoc.definitions]} as unknown as DocumentNode;

/**
 * __useListKommunityPartnerQuery__
 *
 * To run a query within a React component, call `useListKommunityPartnerQuery` and pass it any options that fit your needs.
 * When your component renders, `useListKommunityPartnerQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useListKommunityPartnerQuery({
 *   variables: {
 *      pagination: // value for 'pagination'
 *      filters: // value for 'filters'
 *      ordering: // value for 'ordering'
 *   },
 * });
 */
export function useListKommunityPartnerQuery(baseOptions?: Apollo.QueryHookOptions<ListKommunityPartnerQuery, ListKommunityPartnerQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ListKommunityPartnerQuery, ListKommunityPartnerQueryVariables>(ListKommunityPartnerDocument, options);
      }
export function useListKommunityPartnerLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ListKommunityPartnerQuery, ListKommunityPartnerQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ListKommunityPartnerQuery, ListKommunityPartnerQueryVariables>(ListKommunityPartnerDocument, options);
        }
// @ts-ignore
export function useListKommunityPartnerSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<ListKommunityPartnerQuery, ListKommunityPartnerQueryVariables>): Apollo.UseSuspenseQueryResult<ListKommunityPartnerQuery, ListKommunityPartnerQueryVariables>;
export function useListKommunityPartnerSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<ListKommunityPartnerQuery, ListKommunityPartnerQueryVariables>): Apollo.UseSuspenseQueryResult<ListKommunityPartnerQuery | undefined, ListKommunityPartnerQueryVariables>;
export function useListKommunityPartnerSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<ListKommunityPartnerQuery, ListKommunityPartnerQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ListKommunityPartnerQuery, ListKommunityPartnerQueryVariables>(ListKommunityPartnerDocument, options);
        }
export type ListKommunityPartnerQueryHookResult = ReturnType<typeof useListKommunityPartnerQuery>;
export type ListKommunityPartnerLazyQueryHookResult = ReturnType<typeof useListKommunityPartnerLazyQuery>;
export type ListKommunityPartnerSuspenseQueryHookResult = ReturnType<typeof useListKommunityPartnerSuspenseQuery>;
export type ListKommunityPartnerQueryResult = Apollo.QueryResult<ListKommunityPartnerQuery, ListKommunityPartnerQueryVariables>;
export const GetKommunityPartnerDocument = {"kind":"Document", "definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetKommunityPartner"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"kommunityPartner"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"KommunityPartner"}}]}}]}},...KommunityPartnerFragmentDoc.definitions]} as unknown as DocumentNode;

/**
 * __useGetKommunityPartnerQuery__
 *
 * To run a query within a React component, call `useGetKommunityPartnerQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetKommunityPartnerQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetKommunityPartnerQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetKommunityPartnerQuery(baseOptions: Apollo.QueryHookOptions<GetKommunityPartnerQuery, GetKommunityPartnerQueryVariables> & ({ variables: GetKommunityPartnerQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetKommunityPartnerQuery, GetKommunityPartnerQueryVariables>(GetKommunityPartnerDocument, options);
      }
export function useGetKommunityPartnerLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetKommunityPartnerQuery, GetKommunityPartnerQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetKommunityPartnerQuery, GetKommunityPartnerQueryVariables>(GetKommunityPartnerDocument, options);
        }
// @ts-ignore
export function useGetKommunityPartnerSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetKommunityPartnerQuery, GetKommunityPartnerQueryVariables>): Apollo.UseSuspenseQueryResult<GetKommunityPartnerQuery, GetKommunityPartnerQueryVariables>;
export function useGetKommunityPartnerSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetKommunityPartnerQuery, GetKommunityPartnerQueryVariables>): Apollo.UseSuspenseQueryResult<GetKommunityPartnerQuery | undefined, GetKommunityPartnerQueryVariables>;
export function useGetKommunityPartnerSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetKommunityPartnerQuery, GetKommunityPartnerQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetKommunityPartnerQuery, GetKommunityPartnerQueryVariables>(GetKommunityPartnerDocument, options);
        }
export type GetKommunityPartnerQueryHookResult = ReturnType<typeof useGetKommunityPartnerQuery>;
export type GetKommunityPartnerLazyQueryHookResult = ReturnType<typeof useGetKommunityPartnerLazyQuery>;
export type GetKommunityPartnerSuspenseQueryHookResult = ReturnType<typeof useGetKommunityPartnerSuspenseQuery>;
export type GetKommunityPartnerQueryResult = Apollo.QueryResult<GetKommunityPartnerQuery, GetKommunityPartnerQueryVariables>;