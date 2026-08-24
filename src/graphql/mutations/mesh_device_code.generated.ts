import type * as Types from '../../api/types';
import type { DocumentNode } from 'graphql';
import { MeshDeviceCodeFragmentDoc } from '../fragments/mesh_device_code.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type AcceptMeshDeviceCodeMutationVariables = Types.Exact<{
  input: Types.AcceptMeshDeviceCodeInput;
}>;

export type AcceptMeshDeviceCodeMutation = { __typename?: 'Mutation', acceptMeshDeviceCode: { __typename?: 'ManagementMeshDeviceCode', id: string, code: string, requestedMachineName?: string | null, machineName?: string | null, description?: string | null, denied: boolean } };

export type DeclineMeshDeviceCodeMutationVariables = Types.Exact<{
  input: Types.DeclineMeshDeviceCodeInput;
}>;

export type DeclineMeshDeviceCodeMutation = { __typename?: 'Mutation', declineMeshDeviceCode: { __typename?: 'ManagementMeshDeviceCode', id: string, code: string, requestedMachineName?: string | null, machineName?: string | null, description?: string | null, denied: boolean } };

export const AcceptMeshDeviceCodeDocument = {"kind":"Document", "definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AcceptMeshDeviceCode"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"AcceptMeshDeviceCodeInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"acceptMeshDeviceCode"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MeshDeviceCode"}}]}}]}},...MeshDeviceCodeFragmentDoc.definitions]} as unknown as DocumentNode;
export type AcceptMeshDeviceCodeMutationFn = Apollo.MutationFunction<AcceptMeshDeviceCodeMutation, AcceptMeshDeviceCodeMutationVariables>;

/**
 * __useAcceptMeshDeviceCodeMutation__
 *
 * To run a mutation, you first call `useAcceptMeshDeviceCodeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAcceptMeshDeviceCodeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [acceptMeshDeviceCodeMutation, { data, loading, error }] = useAcceptMeshDeviceCodeMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useAcceptMeshDeviceCodeMutation(baseOptions?: Apollo.MutationHookOptions<AcceptMeshDeviceCodeMutation, AcceptMeshDeviceCodeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AcceptMeshDeviceCodeMutation, AcceptMeshDeviceCodeMutationVariables>(AcceptMeshDeviceCodeDocument, options);
      }
export type AcceptMeshDeviceCodeMutationHookResult = ReturnType<typeof useAcceptMeshDeviceCodeMutation>;
export type AcceptMeshDeviceCodeMutationResult = Apollo.MutationResult<AcceptMeshDeviceCodeMutation>;
export type AcceptMeshDeviceCodeMutationOptions = Apollo.BaseMutationOptions<AcceptMeshDeviceCodeMutation, AcceptMeshDeviceCodeMutationVariables>;
export const DeclineMeshDeviceCodeDocument = {"kind":"Document", "definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeclineMeshDeviceCode"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"DeclineMeshDeviceCodeInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"declineMeshDeviceCode"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MeshDeviceCode"}}]}}]}},...MeshDeviceCodeFragmentDoc.definitions]} as unknown as DocumentNode;
export type DeclineMeshDeviceCodeMutationFn = Apollo.MutationFunction<DeclineMeshDeviceCodeMutation, DeclineMeshDeviceCodeMutationVariables>;

/**
 * __useDeclineMeshDeviceCodeMutation__
 *
 * To run a mutation, you first call `useDeclineMeshDeviceCodeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeclineMeshDeviceCodeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [declineMeshDeviceCodeMutation, { data, loading, error }] = useDeclineMeshDeviceCodeMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useDeclineMeshDeviceCodeMutation(baseOptions?: Apollo.MutationHookOptions<DeclineMeshDeviceCodeMutation, DeclineMeshDeviceCodeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeclineMeshDeviceCodeMutation, DeclineMeshDeviceCodeMutationVariables>(DeclineMeshDeviceCodeDocument, options);
      }
export type DeclineMeshDeviceCodeMutationHookResult = ReturnType<typeof useDeclineMeshDeviceCodeMutation>;
export type DeclineMeshDeviceCodeMutationResult = Apollo.MutationResult<DeclineMeshDeviceCodeMutation>;
export type DeclineMeshDeviceCodeMutationOptions = Apollo.BaseMutationOptions<DeclineMeshDeviceCodeMutation, DeclineMeshDeviceCodeMutationVariables>;