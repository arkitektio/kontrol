import type * as Types from '../../api/types';
import type { DocumentNode } from 'graphql';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type EnableTailnetLockMutationVariables = Types.Exact<{
  input: Types.TailnetLockInput;
}>;

export type EnableTailnetLockMutation = { __typename?: 'Mutation', enableTailnetLock: { __typename?: 'ManagementLayer', id: string } };

export type DisableTailnetLockMutationVariables = Types.Exact<{
  input: Types.TailnetLockInput;
}>;

export type DisableTailnetLockMutation = { __typename?: 'Mutation', disableTailnetLock: { __typename?: 'ManagementLayer', id: string } };

export const EnableTailnetLockDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"EnableTailnetLock"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"TailnetLockInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"enableTailnetLock"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode;
export type EnableTailnetLockMutationFn = Apollo.MutationFunction<EnableTailnetLockMutation, EnableTailnetLockMutationVariables>;

/**
 * __useEnableTailnetLockMutation__
 *
 * To run a mutation, you first call `useEnableTailnetLockMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEnableTailnetLockMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [enableTailnetLockMutation, { data, loading, error }] = useEnableTailnetLockMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useEnableTailnetLockMutation(baseOptions?: Apollo.MutationHookOptions<EnableTailnetLockMutation, EnableTailnetLockMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<EnableTailnetLockMutation, EnableTailnetLockMutationVariables>(EnableTailnetLockDocument, options);
      }
export type EnableTailnetLockMutationHookResult = ReturnType<typeof useEnableTailnetLockMutation>;
export type EnableTailnetLockMutationResult = Apollo.MutationResult<EnableTailnetLockMutation>;
export type EnableTailnetLockMutationOptions = Apollo.BaseMutationOptions<EnableTailnetLockMutation, EnableTailnetLockMutationVariables>;
export const DisableTailnetLockDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DisableTailnetLock"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"TailnetLockInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"disableTailnetLock"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode;
export type DisableTailnetLockMutationFn = Apollo.MutationFunction<DisableTailnetLockMutation, DisableTailnetLockMutationVariables>;

/**
 * __useDisableTailnetLockMutation__
 *
 * To run a mutation, you first call `useDisableTailnetLockMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDisableTailnetLockMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [disableTailnetLockMutation, { data, loading, error }] = useDisableTailnetLockMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useDisableTailnetLockMutation(baseOptions?: Apollo.MutationHookOptions<DisableTailnetLockMutation, DisableTailnetLockMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DisableTailnetLockMutation, DisableTailnetLockMutationVariables>(DisableTailnetLockDocument, options);
      }
export type DisableTailnetLockMutationHookResult = ReturnType<typeof useDisableTailnetLockMutation>;
export type DisableTailnetLockMutationResult = Apollo.MutationResult<DisableTailnetLockMutation>;
export type DisableTailnetLockMutationOptions = Apollo.BaseMutationOptions<DisableTailnetLockMutation, DisableTailnetLockMutationVariables>;