import type * as Types from '../../api/types';
import type { DocumentNode } from 'graphql';
import { IonscaleAuthKeyFragmentDoc } from '../fragments/auth_key.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type IonscaleAuthKeyQueryVariables = Types.Exact<{
  filters?: Types.InputMaybe<Types.ManagementIonscaleAuthKeyFilter>;
  pagination?: Types.InputMaybe<Types.OffsetPaginationInput>;
  ordering?: Types.InputMaybe<Array<Types.ManagementIonscaleAuthKeyOrdering> | Types.ManagementIonscaleAuthKeyOrdering>;
}>;

export type IonscaleAuthKeyQuery = { __typename?: 'Query', ionscaleAuthKeys: Array<{ __typename?: 'ManagementIonscaleAuthKey', id: string, key?: string | null, createdAt: any, ephemeral: boolean, tags: Array<string>, creator: { __typename?: 'ManagementUser', id: string, email?: string | null } }> };

export type GetAuthKeyQueryVariables = Types.Exact<{
  id: Types.Scalars['ID']['input'];
}>;

export type GetAuthKeyQuery = { __typename?: 'Query', ionscaleAuthKey: { __typename?: 'ManagementIonscaleAuthKey', id: string, key?: string | null, createdAt: any, ephemeral: boolean, tags: Array<string>, creator: { __typename?: 'ManagementUser', id: string, email?: string | null } } };

export const IonscaleAuthKeyDocument = {"kind":"Document", "definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"IonscaleAuthKey"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filters"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ManagementIonscaleAuthKeyFilter"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pagination"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"OffsetPaginationInput"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"ordering"}},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ManagementIonscaleAuthKeyOrdering"}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ionscaleAuthKeys"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filters"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filters"}}},{"kind":"Argument","name":{"kind":"Name","value":"pagination"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pagination"}}},{"kind":"Argument","name":{"kind":"Name","value":"ordering"},"value":{"kind":"Variable","name":{"kind":"Name","value":"ordering"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"IonscaleAuthKey"}}]}}]}},...IonscaleAuthKeyFragmentDoc.definitions]} as unknown as DocumentNode;

/**
 * __useIonscaleAuthKeyQuery__
 *
 * To run a query within a React component, call `useIonscaleAuthKeyQuery` and pass it any options that fit your needs.
 * When your component renders, `useIonscaleAuthKeyQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useIonscaleAuthKeyQuery({
 *   variables: {
 *      filters: // value for 'filters'
 *      pagination: // value for 'pagination'
 *      ordering: // value for 'ordering'
 *   },
 * });
 */
export function useIonscaleAuthKeyQuery(baseOptions?: Apollo.QueryHookOptions<IonscaleAuthKeyQuery, IonscaleAuthKeyQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<IonscaleAuthKeyQuery, IonscaleAuthKeyQueryVariables>(IonscaleAuthKeyDocument, options);
      }
export function useIonscaleAuthKeyLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<IonscaleAuthKeyQuery, IonscaleAuthKeyQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<IonscaleAuthKeyQuery, IonscaleAuthKeyQueryVariables>(IonscaleAuthKeyDocument, options);
        }
// @ts-ignore
export function useIonscaleAuthKeySuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<IonscaleAuthKeyQuery, IonscaleAuthKeyQueryVariables>): Apollo.UseSuspenseQueryResult<IonscaleAuthKeyQuery, IonscaleAuthKeyQueryVariables>;
export function useIonscaleAuthKeySuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<IonscaleAuthKeyQuery, IonscaleAuthKeyQueryVariables>): Apollo.UseSuspenseQueryResult<IonscaleAuthKeyQuery | undefined, IonscaleAuthKeyQueryVariables>;
export function useIonscaleAuthKeySuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<IonscaleAuthKeyQuery, IonscaleAuthKeyQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<IonscaleAuthKeyQuery, IonscaleAuthKeyQueryVariables>(IonscaleAuthKeyDocument, options);
        }
export type IonscaleAuthKeyQueryHookResult = ReturnType<typeof useIonscaleAuthKeyQuery>;
export type IonscaleAuthKeyLazyQueryHookResult = ReturnType<typeof useIonscaleAuthKeyLazyQuery>;
export type IonscaleAuthKeySuspenseQueryHookResult = ReturnType<typeof useIonscaleAuthKeySuspenseQuery>;
export type IonscaleAuthKeyQueryResult = Apollo.QueryResult<IonscaleAuthKeyQuery, IonscaleAuthKeyQueryVariables>;
export const GetAuthKeyDocument = {"kind":"Document", "definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetAuthKey"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ionscaleAuthKey"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"IonscaleAuthKey"}}]}}]}},...IonscaleAuthKeyFragmentDoc.definitions]} as unknown as DocumentNode;

/**
 * __useGetAuthKeyQuery__
 *
 * To run a query within a React component, call `useGetAuthKeyQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAuthKeyQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAuthKeyQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetAuthKeyQuery(baseOptions: Apollo.QueryHookOptions<GetAuthKeyQuery, GetAuthKeyQueryVariables> & ({ variables: GetAuthKeyQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAuthKeyQuery, GetAuthKeyQueryVariables>(GetAuthKeyDocument, options);
      }
export function useGetAuthKeyLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAuthKeyQuery, GetAuthKeyQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAuthKeyQuery, GetAuthKeyQueryVariables>(GetAuthKeyDocument, options);
        }
// @ts-ignore
export function useGetAuthKeySuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetAuthKeyQuery, GetAuthKeyQueryVariables>): Apollo.UseSuspenseQueryResult<GetAuthKeyQuery, GetAuthKeyQueryVariables>;
export function useGetAuthKeySuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetAuthKeyQuery, GetAuthKeyQueryVariables>): Apollo.UseSuspenseQueryResult<GetAuthKeyQuery | undefined, GetAuthKeyQueryVariables>;
export function useGetAuthKeySuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetAuthKeyQuery, GetAuthKeyQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetAuthKeyQuery, GetAuthKeyQueryVariables>(GetAuthKeyDocument, options);
        }
export type GetAuthKeyQueryHookResult = ReturnType<typeof useGetAuthKeyQuery>;
export type GetAuthKeyLazyQueryHookResult = ReturnType<typeof useGetAuthKeyLazyQuery>;
export type GetAuthKeySuspenseQueryHookResult = ReturnType<typeof useGetAuthKeySuspenseQuery>;
export type GetAuthKeyQueryResult = Apollo.QueryResult<GetAuthKeyQuery, GetAuthKeyQueryVariables>;