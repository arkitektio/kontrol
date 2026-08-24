import type * as Types from '../../api/types';
import type { DocumentNode } from 'graphql';
import { RoleSetFragmentDoc } from '../fragments/role_set.generated';
import { ListRoleFragmentDoc } from '../fragments/role.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type CreateRoleSetMutationVariables = Types.Exact<{
  input: Types.CreateRoleSetInput;
}>;

export type CreateRoleSetMutation = { __typename?: 'Mutation', createRoleSet: { __typename?: 'ManagementRoleSet', id: string, name: string, roles: Array<{ __typename?: 'ManagementRole', id: string, description: string, identifier: string }> } };

export type UpdateRoleSetMutationVariables = Types.Exact<{
  input: Types.UpdateRoleSetInput;
}>;

export type UpdateRoleSetMutation = { __typename?: 'Mutation', updateRoleSet: { __typename?: 'ManagementRoleSet', id: string, name: string, roles: Array<{ __typename?: 'ManagementRole', id: string, description: string, identifier: string }> } };

export type DeleteRoleSetMutationVariables = Types.Exact<{
  input: Types.DeleteRoleSetInput;
}>;

export type DeleteRoleSetMutation = { __typename?: 'Mutation', deleteRoleSet: string };

export const CreateRoleSetDocument = {"kind":"Document", "definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateRoleSet"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateRoleSetInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createRoleSet"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"RoleSet"}}]}}]}},...RoleSetFragmentDoc.definitions,...ListRoleFragmentDoc.definitions]} as unknown as DocumentNode;
export type CreateRoleSetMutationFn = Apollo.MutationFunction<CreateRoleSetMutation, CreateRoleSetMutationVariables>;

/**
 * __useCreateRoleSetMutation__
 *
 * To run a mutation, you first call `useCreateRoleSetMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateRoleSetMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createRoleSetMutation, { data, loading, error }] = useCreateRoleSetMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateRoleSetMutation(baseOptions?: Apollo.MutationHookOptions<CreateRoleSetMutation, CreateRoleSetMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateRoleSetMutation, CreateRoleSetMutationVariables>(CreateRoleSetDocument, options);
      }
export type CreateRoleSetMutationHookResult = ReturnType<typeof useCreateRoleSetMutation>;
export type CreateRoleSetMutationResult = Apollo.MutationResult<CreateRoleSetMutation>;
export type CreateRoleSetMutationOptions = Apollo.BaseMutationOptions<CreateRoleSetMutation, CreateRoleSetMutationVariables>;
export const UpdateRoleSetDocument = {"kind":"Document", "definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateRoleSet"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateRoleSetInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateRoleSet"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"RoleSet"}}]}}]}},...RoleSetFragmentDoc.definitions,...ListRoleFragmentDoc.definitions]} as unknown as DocumentNode;
export type UpdateRoleSetMutationFn = Apollo.MutationFunction<UpdateRoleSetMutation, UpdateRoleSetMutationVariables>;

/**
 * __useUpdateRoleSetMutation__
 *
 * To run a mutation, you first call `useUpdateRoleSetMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateRoleSetMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateRoleSetMutation, { data, loading, error }] = useUpdateRoleSetMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateRoleSetMutation(baseOptions?: Apollo.MutationHookOptions<UpdateRoleSetMutation, UpdateRoleSetMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateRoleSetMutation, UpdateRoleSetMutationVariables>(UpdateRoleSetDocument, options);
      }
export type UpdateRoleSetMutationHookResult = ReturnType<typeof useUpdateRoleSetMutation>;
export type UpdateRoleSetMutationResult = Apollo.MutationResult<UpdateRoleSetMutation>;
export type UpdateRoleSetMutationOptions = Apollo.BaseMutationOptions<UpdateRoleSetMutation, UpdateRoleSetMutationVariables>;
export const DeleteRoleSetDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteRoleSet"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"DeleteRoleSetInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteRoleSet"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}]}]}}]} as unknown as DocumentNode;
export type DeleteRoleSetMutationFn = Apollo.MutationFunction<DeleteRoleSetMutation, DeleteRoleSetMutationVariables>;

/**
 * __useDeleteRoleSetMutation__
 *
 * To run a mutation, you first call `useDeleteRoleSetMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteRoleSetMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteRoleSetMutation, { data, loading, error }] = useDeleteRoleSetMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useDeleteRoleSetMutation(baseOptions?: Apollo.MutationHookOptions<DeleteRoleSetMutation, DeleteRoleSetMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteRoleSetMutation, DeleteRoleSetMutationVariables>(DeleteRoleSetDocument, options);
      }
export type DeleteRoleSetMutationHookResult = ReturnType<typeof useDeleteRoleSetMutation>;
export type DeleteRoleSetMutationResult = Apollo.MutationResult<DeleteRoleSetMutation>;
export type DeleteRoleSetMutationOptions = Apollo.BaseMutationOptions<DeleteRoleSetMutation, DeleteRoleSetMutationVariables>;