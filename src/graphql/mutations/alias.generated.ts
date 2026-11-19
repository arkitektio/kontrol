import type * as Types from '../../api/types';
import type { DocumentNode } from 'graphql';
import { InstanceAliasFragmentDoc, AliasRuleFragmentDoc } from '../fragments/alias.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type CreateAliasMutationVariables = Types.Exact<{
  input: Types.CreateAliasInput;
}>;

export type CreateAliasMutation = { __typename?: 'Mutation', createAlias: { __typename?: 'ManagementInstanceAlias', id: string, host?: string | null, port?: number | null, ssl: boolean, path?: string | null, challenge: string, kind: string, resolvedHost?: string | null, scope: string, reach: string, priority?: number | null, enabled: boolean, effectivePriority: number, layer?: { __typename?: 'ManagementLayer', id: string, name: string } | null, instance: { __typename?: 'ManagementServiceInstance', id: string }, organization: { __typename?: 'ManagementOrganization', id: string }, rules: Array<{ __typename?: 'ManagementAliasRule', id: string, effect: string, priority?: number | null, createdAt: any, app?: { __typename?: 'ManagementApp', id: string, name: string, identifier: any } | null, client?: { __typename?: 'ManagementClient', id: string, name: string } | null, user?: { __typename?: 'ManagementUser', id: string, username: string } | null, role?: { __typename?: 'ManagementRole', id: string, identifier: string } | null }> } };

export type DeleteAliasMutationVariables = Types.Exact<{
  input: Types.DeleteAliasInput;
}>;

export type DeleteAliasMutation = { __typename?: 'Mutation', deleteAlias: string };

export type UpdateAliasMutationVariables = Types.Exact<{
  input: Types.UpdateAliasInput;
}>;

export type UpdateAliasMutation = { __typename?: 'Mutation', updateAlias: { __typename?: 'ManagementInstanceAlias', id: string, host?: string | null, port?: number | null, ssl: boolean, path?: string | null, challenge: string, kind: string, resolvedHost?: string | null, scope: string, reach: string, priority?: number | null, enabled: boolean, effectivePriority: number, layer?: { __typename?: 'ManagementLayer', id: string, name: string } | null, instance: { __typename?: 'ManagementServiceInstance', id: string }, organization: { __typename?: 'ManagementOrganization', id: string }, rules: Array<{ __typename?: 'ManagementAliasRule', id: string, effect: string, priority?: number | null, createdAt: any, app?: { __typename?: 'ManagementApp', id: string, name: string, identifier: any } | null, client?: { __typename?: 'ManagementClient', id: string, name: string } | null, user?: { __typename?: 'ManagementUser', id: string, username: string } | null, role?: { __typename?: 'ManagementRole', id: string, identifier: string } | null }> } };

export type CreateAliasRuleMutationVariables = Types.Exact<{
  input: Types.CreateAliasRuleInput;
}>;

export type CreateAliasRuleMutation = { __typename?: 'Mutation', createAliasRule: { __typename?: 'ManagementAliasRule', id: string, effect: string, priority?: number | null, createdAt: any, app?: { __typename?: 'ManagementApp', id: string, name: string, identifier: any } | null, client?: { __typename?: 'ManagementClient', id: string, name: string } | null, user?: { __typename?: 'ManagementUser', id: string, username: string } | null, role?: { __typename?: 'ManagementRole', id: string, identifier: string } | null } };

export type DeleteAliasRuleMutationVariables = Types.Exact<{
  input: Types.DeleteAliasRuleInput;
}>;

export type DeleteAliasRuleMutation = { __typename?: 'Mutation', deleteAliasRule: string };

export const CreateAliasDocument = {"kind":"Document", "definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateAlias"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateAliasInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createAlias"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"InstanceAlias"}}]}}]}},...InstanceAliasFragmentDoc.definitions,...AliasRuleFragmentDoc.definitions]} as unknown as DocumentNode;
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
export const UpdateAliasDocument = {"kind":"Document", "definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateAlias"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateAliasInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateAlias"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"InstanceAlias"}}]}}]}},...InstanceAliasFragmentDoc.definitions,...AliasRuleFragmentDoc.definitions]} as unknown as DocumentNode;
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
export const CreateAliasRuleDocument = {"kind":"Document", "definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateAliasRule"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateAliasRuleInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createAliasRule"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AliasRule"}}]}}]}},...AliasRuleFragmentDoc.definitions]} as unknown as DocumentNode;
export type CreateAliasRuleMutationFn = Apollo.MutationFunction<CreateAliasRuleMutation, CreateAliasRuleMutationVariables>;

/**
 * __useCreateAliasRuleMutation__
 *
 * To run a mutation, you first call `useCreateAliasRuleMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateAliasRuleMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createAliasRuleMutation, { data, loading, error }] = useCreateAliasRuleMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateAliasRuleMutation(baseOptions?: Apollo.MutationHookOptions<CreateAliasRuleMutation, CreateAliasRuleMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateAliasRuleMutation, CreateAliasRuleMutationVariables>(CreateAliasRuleDocument, options);
      }
export type CreateAliasRuleMutationHookResult = ReturnType<typeof useCreateAliasRuleMutation>;
export type CreateAliasRuleMutationResult = Apollo.MutationResult<CreateAliasRuleMutation>;
export type CreateAliasRuleMutationOptions = Apollo.BaseMutationOptions<CreateAliasRuleMutation, CreateAliasRuleMutationVariables>;
export const DeleteAliasRuleDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteAliasRule"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"DeleteAliasRuleInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteAliasRule"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}]}]}}]} as unknown as DocumentNode;
export type DeleteAliasRuleMutationFn = Apollo.MutationFunction<DeleteAliasRuleMutation, DeleteAliasRuleMutationVariables>;

/**
 * __useDeleteAliasRuleMutation__
 *
 * To run a mutation, you first call `useDeleteAliasRuleMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteAliasRuleMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteAliasRuleMutation, { data, loading, error }] = useDeleteAliasRuleMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useDeleteAliasRuleMutation(baseOptions?: Apollo.MutationHookOptions<DeleteAliasRuleMutation, DeleteAliasRuleMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteAliasRuleMutation, DeleteAliasRuleMutationVariables>(DeleteAliasRuleDocument, options);
      }
export type DeleteAliasRuleMutationHookResult = ReturnType<typeof useDeleteAliasRuleMutation>;
export type DeleteAliasRuleMutationResult = Apollo.MutationResult<DeleteAliasRuleMutation>;
export type DeleteAliasRuleMutationOptions = Apollo.BaseMutationOptions<DeleteAliasRuleMutation, DeleteAliasRuleMutationVariables>;