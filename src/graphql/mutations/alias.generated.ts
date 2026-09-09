import type * as Types from '../../api/types';
import type { DocumentNode } from 'graphql';
import { InstanceAliasFragmentDoc } from '../fragments/alias.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type CreateAliasMutationVariables = Types.Exact<{
  input: Types.CreateAliasInput;
}>;

export type CreateAliasMutation = { __typename?: 'Mutation', createAlias: { __typename?: 'ManagementInstanceAlias', id: string, host?: string | null, port?: number | null, ssl: boolean, path?: string | null, challenge: string, kind: string, scope: string, layer?: { __typename?: 'ManagementLayer', id: string, name: string } | null, instance: { __typename?: 'ManagementServiceInstance', id: string }, organization: { __typename?: 'ManagementOrganization', id: string } } };

export type DeleteAliasMutationVariables = Types.Exact<{
  input: Types.DeleteAliasInput;
}>;

export type DeleteAliasMutation = { __typename?: 'Mutation', deleteAlias: string };

export type UpdateAliasMutationVariables = Types.Exact<{
  input: Types.UpdateAliasInput;
}>;

export type UpdateAliasMutation = { __typename?: 'Mutation', updateAlias: { __typename?: 'ManagementInstanceAlias', id: string, host?: string | null, port?: number | null, ssl: boolean, path?: string | null, challenge: string, kind: string, scope: string, layer?: { __typename?: 'ManagementLayer', id: string, name: string } | null, instance: { __typename?: 'ManagementServiceInstance', id: string }, organization: { __typename?: 'ManagementOrganization', id: string } } };

export const CreateAliasDocument = {"kind":"Document", "definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateAlias"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateAliasInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createAlias"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"InstanceAlias"}}]}}]}},...InstanceAliasFragmentDoc.definitions]} as unknown as DocumentNode;
export type CreateAliasMutationFn = Apollo.MutationFunction<CreateAliasMutation, CreateAliasMutationVariables>;

/**
 * __useCreateAliasMutation__
 *
 * To run a mutation, you first call `useCreateAliasMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateAliasMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createAliasMutation, { data, loading, error }] = useCreateAliasMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateAliasMutation(baseOptions?: Apollo.MutationHookOptions<CreateAliasMutation, CreateAliasMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateAliasMutation, CreateAliasMutationVariables>(CreateAliasDocument, options);
      }
export type CreateAliasMutationHookResult = ReturnType<typeof useCreateAliasMutation>;
export type CreateAliasMutationResult = Apollo.MutationResult<CreateAliasMutation>;
export type CreateAliasMutationOptions = Apollo.BaseMutationOptions<CreateAliasMutation, CreateAliasMutationVariables>;
export const DeleteAliasDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteAlias"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"DeleteAliasInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteAlias"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}]}]}}]} as unknown as DocumentNode;
export type DeleteAliasMutationFn = Apollo.MutationFunction<DeleteAliasMutation, DeleteAliasMutationVariables>;

/**
 * __useDeleteAliasMutation__
 *
 * To run a mutation, you first call `useDeleteAliasMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteAliasMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteAliasMutation, { data, loading, error }] = useDeleteAliasMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useDeleteAliasMutation(baseOptions?: Apollo.MutationHookOptions<DeleteAliasMutation, DeleteAliasMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteAliasMutation, DeleteAliasMutationVariables>(DeleteAliasDocument, options);
      }
export type DeleteAliasMutationHookResult = ReturnType<typeof useDeleteAliasMutation>;
export type DeleteAliasMutationResult = Apollo.MutationResult<DeleteAliasMutation>;
export type DeleteAliasMutationOptions = Apollo.BaseMutationOptions<DeleteAliasMutation, DeleteAliasMutationVariables>;
export const UpdateAliasDocument = {"kind":"Document", "definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateAlias"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateAliasInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateAlias"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"InstanceAlias"}}]}}]}},...InstanceAliasFragmentDoc.definitions]} as unknown as DocumentNode;
export type UpdateAliasMutationFn = Apollo.MutationFunction<UpdateAliasMutation, UpdateAliasMutationVariables>;

/**
 * __useUpdateAliasMutation__
 *
 * To run a mutation, you first call `useUpdateAliasMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateAliasMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateAliasMutation, { data, loading, error }] = useUpdateAliasMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateAliasMutation(baseOptions?: Apollo.MutationHookOptions<UpdateAliasMutation, UpdateAliasMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateAliasMutation, UpdateAliasMutationVariables>(UpdateAliasDocument, options);
      }
export type UpdateAliasMutationHookResult = ReturnType<typeof useUpdateAliasMutation>;
export type UpdateAliasMutationResult = Apollo.MutationResult<UpdateAliasMutation>;
export type UpdateAliasMutationOptions = Apollo.BaseMutationOptions<UpdateAliasMutation, UpdateAliasMutationVariables>;