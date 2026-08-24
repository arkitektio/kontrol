import type * as Types from '../../api/types';
import type { DocumentNode } from 'graphql';
import { MeshDeviceCodeFragmentDoc } from '../fragments/mesh_device_code.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type MeshDeviceCodeByCodeQueryVariables = Types.Exact<{
  code: Types.Scalars['String']['input'];
}>;

export type MeshDeviceCodeByCodeQuery = { __typename?: 'Query', meshDeviceCodeByCode: { __typename?: 'ManagementMeshDeviceCode', id: string, code: string, requestedMachineName?: string | null, machineName?: string | null, description?: string | null, denied: boolean } };

export const MeshDeviceCodeByCodeDocument = {"kind":"Document", "definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"MeshDeviceCodeByCode"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"code"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"meshDeviceCodeByCode"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"code"},"value":{"kind":"Variable","name":{"kind":"Name","value":"code"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MeshDeviceCode"}}]}}]}},...MeshDeviceCodeFragmentDoc.definitions]} as unknown as DocumentNode;

/**
 * __useMeshDeviceCodeByCodeQuery__
 *
 * To run a query within a React component, call `useMeshDeviceCodeByCodeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeshDeviceCodeByCodeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeshDeviceCodeByCodeQuery({
 *   variables: {
 *      code: // value for 'code'
 *   },
 * });
 */
export function useMeshDeviceCodeByCodeQuery(baseOptions: Apollo.QueryHookOptions<MeshDeviceCodeByCodeQuery, MeshDeviceCodeByCodeQueryVariables> & ({ variables: MeshDeviceCodeByCodeQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MeshDeviceCodeByCodeQuery, MeshDeviceCodeByCodeQueryVariables>(MeshDeviceCodeByCodeDocument, options);
      }
export function useMeshDeviceCodeByCodeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeshDeviceCodeByCodeQuery, MeshDeviceCodeByCodeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MeshDeviceCodeByCodeQuery, MeshDeviceCodeByCodeQueryVariables>(MeshDeviceCodeByCodeDocument, options);
        }
// @ts-ignore
export function useMeshDeviceCodeByCodeSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<MeshDeviceCodeByCodeQuery, MeshDeviceCodeByCodeQueryVariables>): Apollo.UseSuspenseQueryResult<MeshDeviceCodeByCodeQuery, MeshDeviceCodeByCodeQueryVariables>;
export function useMeshDeviceCodeByCodeSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<MeshDeviceCodeByCodeQuery, MeshDeviceCodeByCodeQueryVariables>): Apollo.UseSuspenseQueryResult<MeshDeviceCodeByCodeQuery | undefined, MeshDeviceCodeByCodeQueryVariables>;
export function useMeshDeviceCodeByCodeSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<MeshDeviceCodeByCodeQuery, MeshDeviceCodeByCodeQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<MeshDeviceCodeByCodeQuery, MeshDeviceCodeByCodeQueryVariables>(MeshDeviceCodeByCodeDocument, options);
        }
export type MeshDeviceCodeByCodeQueryHookResult = ReturnType<typeof useMeshDeviceCodeByCodeQuery>;
export type MeshDeviceCodeByCodeLazyQueryHookResult = ReturnType<typeof useMeshDeviceCodeByCodeLazyQuery>;
export type MeshDeviceCodeByCodeSuspenseQueryHookResult = ReturnType<typeof useMeshDeviceCodeByCodeSuspenseQuery>;
export type MeshDeviceCodeByCodeQueryResult = Apollo.QueryResult<MeshDeviceCodeByCodeQuery, MeshDeviceCodeByCodeQueryVariables>;