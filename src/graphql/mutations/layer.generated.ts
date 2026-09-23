import type * as Types from '../../api/types';
import type { DocumentNode } from 'graphql';
import { LayerFragmentDoc } from '../fragments/layer.generated';
import { ListInstanceAliasFragmentDoc } from '../fragments/alias.generated';
import { MachineFragmentDoc } from '../fragments/machine.generated';
import { ListIonscaleAuthKeyFragmentDoc, IonscaleAuthKeyFragmentDoc } from '../fragments/auth_key.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type CreateIonscaleLayerMutationVariables = Types.Exact<{
  input: Types.CreateIonscaleLayerInput;
}>;

export type CreateIonscaleLayerMutation = { __typename?: 'Mutation', createIonscaleLayer: { __typename?: 'ManagementLayer', id: string, name: string, description?: string | null, magicDnsEnabled: boolean, httpsEnabled: boolean, logo?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null, aliases: Array<{ __typename?: 'ManagementInstanceAlias', id: string, host?: string | null, port?: number | null, ssl: boolean, path?: string | null, challenge: string, kind: string, resolvedHost?: string | null, scope: string, layer?: { __typename?: 'ManagementLayer', id: string, name: string } | null, instance: { __typename?: 'ManagementServiceInstance', id: string, identifier: string, release: { __typename?: 'ManagementServiceRelease', version: string, service: { __typename?: 'ManagementService', id: string, identifier: any } } } }>, machines: Array<{ __typename?: 'ManagementMachine', id: string, localId: string, name: string, ipv4?: string | null, ipv6?: string | null, connected: boolean, ephemeral: boolean, lastSeen?: any | null, tags: Array<string>, magicDnsName?: string | null, os?: string | null, keyExpiry?: any | null, authorized?: boolean | null, isExternal?: boolean | null }>, authKeys: Array<{ __typename?: 'ManagementIonscaleAuthKey', id: string, key?: string | null, createdAt: any, ephemeral: boolean, tags: Array<string>, creator: { __typename?: 'ManagementUser', id: string, email?: string | null } }> } };

export type UpdateIonscaleLayerMutationVariables = Types.Exact<{
  input: Types.UpdateIonscaleLayerInput;
}>;

export type UpdateIonscaleLayerMutation = { __typename?: 'Mutation', updateIonscaleLayer: { __typename?: 'ManagementLayer', id: string, name: string, description?: string | null, magicDnsEnabled: boolean, httpsEnabled: boolean, logo?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null, aliases: Array<{ __typename?: 'ManagementInstanceAlias', id: string, host?: string | null, port?: number | null, ssl: boolean, path?: string | null, challenge: string, kind: string, resolvedHost?: string | null, scope: string, layer?: { __typename?: 'ManagementLayer', id: string, name: string } | null, instance: { __typename?: 'ManagementServiceInstance', id: string, identifier: string, release: { __typename?: 'ManagementServiceRelease', version: string, service: { __typename?: 'ManagementService', id: string, identifier: any } } } }>, machines: Array<{ __typename?: 'ManagementMachine', id: string, localId: string, name: string, ipv4?: string | null, ipv6?: string | null, connected: boolean, ephemeral: boolean, lastSeen?: any | null, tags: Array<string>, magicDnsName?: string | null, os?: string | null, keyExpiry?: any | null, authorized?: boolean | null, isExternal?: boolean | null }>, authKeys: Array<{ __typename?: 'ManagementIonscaleAuthKey', id: string, key?: string | null, createdAt: any, ephemeral: boolean, tags: Array<string>, creator: { __typename?: 'ManagementUser', id: string, email?: string | null } }> } };

export type DeleteIonscaleLayerMutationVariables = Types.Exact<{
  input: Types.DeleteIonscaleLayerInput;
}>;

export type DeleteIonscaleLayerMutation = { __typename?: 'Mutation', deleteIonscaleLayer: string };

export type CreateIonscaleAuthKeyMutationVariables = Types.Exact<{
  input: Types.CreateIonscaleAuthKeyInput;
}>;

export type CreateIonscaleAuthKeyMutation = { __typename?: 'Mutation', createIonscaleAuthKey: { __typename?: 'ManagementIonscaleAuthKey', id: string, key?: string | null, createdAt: any, ephemeral: boolean, tags: Array<string>, creator: { __typename?: 'ManagementUser', id: string, email?: string | null } } };

export const CreateIonscaleLayerDocument = {"kind":"Document", "definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateIonscaleLayer"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateIonscaleLayerInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createIonscaleLayer"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Layer"}}]}}]}},...LayerFragmentDoc.definitions,...ListInstanceAliasFragmentDoc.definitions,...MachineFragmentDoc.definitions,...ListIonscaleAuthKeyFragmentDoc.definitions]} as unknown as DocumentNode;
export type CreateIonscaleLayerMutationFn = Apollo.MutationFunction<CreateIonscaleLayerMutation, CreateIonscaleLayerMutationVariables>;

/**
 * __useCreateIonscaleLayerMutation__
 *
 * To run a mutation, you first call `useCreateIonscaleLayerMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateIonscaleLayerMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createIonscaleLayerMutation, { data, loading, error }] = useCreateIonscaleLayerMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateIonscaleLayerMutation(baseOptions?: Apollo.MutationHookOptions<CreateIonscaleLayerMutation, CreateIonscaleLayerMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateIonscaleLayerMutation, CreateIonscaleLayerMutationVariables>(CreateIonscaleLayerDocument, options);
      }
export type CreateIonscaleLayerMutationHookResult = ReturnType<typeof useCreateIonscaleLayerMutation>;
export type CreateIonscaleLayerMutationResult = Apollo.MutationResult<CreateIonscaleLayerMutation>;
export type CreateIonscaleLayerMutationOptions = Apollo.BaseMutationOptions<CreateIonscaleLayerMutation, CreateIonscaleLayerMutationVariables>;
export const UpdateIonscaleLayerDocument = {"kind":"Document", "definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateIonscaleLayer"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateIonscaleLayerInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateIonscaleLayer"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Layer"}}]}}]}},...LayerFragmentDoc.definitions,...ListInstanceAliasFragmentDoc.definitions,...MachineFragmentDoc.definitions,...ListIonscaleAuthKeyFragmentDoc.definitions]} as unknown as DocumentNode;
export type UpdateIonscaleLayerMutationFn = Apollo.MutationFunction<UpdateIonscaleLayerMutation, UpdateIonscaleLayerMutationVariables>;

/**
 * __useUpdateIonscaleLayerMutation__
 *
 * To run a mutation, you first call `useUpdateIonscaleLayerMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateIonscaleLayerMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateIonscaleLayerMutation, { data, loading, error }] = useUpdateIonscaleLayerMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateIonscaleLayerMutation(baseOptions?: Apollo.MutationHookOptions<UpdateIonscaleLayerMutation, UpdateIonscaleLayerMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateIonscaleLayerMutation, UpdateIonscaleLayerMutationVariables>(UpdateIonscaleLayerDocument, options);
      }
export type UpdateIonscaleLayerMutationHookResult = ReturnType<typeof useUpdateIonscaleLayerMutation>;
export type UpdateIonscaleLayerMutationResult = Apollo.MutationResult<UpdateIonscaleLayerMutation>;
export type UpdateIonscaleLayerMutationOptions = Apollo.BaseMutationOptions<UpdateIonscaleLayerMutation, UpdateIonscaleLayerMutationVariables>;
export const DeleteIonscaleLayerDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteIonscaleLayer"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"DeleteIonscaleLayerInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteIonscaleLayer"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}]}]}}]} as unknown as DocumentNode;
export type DeleteIonscaleLayerMutationFn = Apollo.MutationFunction<DeleteIonscaleLayerMutation, DeleteIonscaleLayerMutationVariables>;

/**
 * __useDeleteIonscaleLayerMutation__
 *
 * To run a mutation, you first call `useDeleteIonscaleLayerMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteIonscaleLayerMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteIonscaleLayerMutation, { data, loading, error }] = useDeleteIonscaleLayerMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useDeleteIonscaleLayerMutation(baseOptions?: Apollo.MutationHookOptions<DeleteIonscaleLayerMutation, DeleteIonscaleLayerMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteIonscaleLayerMutation, DeleteIonscaleLayerMutationVariables>(DeleteIonscaleLayerDocument, options);
      }
export type DeleteIonscaleLayerMutationHookResult = ReturnType<typeof useDeleteIonscaleLayerMutation>;
export type DeleteIonscaleLayerMutationResult = Apollo.MutationResult<DeleteIonscaleLayerMutation>;
export type DeleteIonscaleLayerMutationOptions = Apollo.BaseMutationOptions<DeleteIonscaleLayerMutation, DeleteIonscaleLayerMutationVariables>;
export const CreateIonscaleAuthKeyDocument = {"kind":"Document", "definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateIonscaleAuthKey"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateIonscaleAuthKeyInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createIonscaleAuthKey"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"IonscaleAuthKey"}}]}}]}},...IonscaleAuthKeyFragmentDoc.definitions]} as unknown as DocumentNode;
export type CreateIonscaleAuthKeyMutationFn = Apollo.MutationFunction<CreateIonscaleAuthKeyMutation, CreateIonscaleAuthKeyMutationVariables>;

/**
 * __useCreateIonscaleAuthKeyMutation__
 *
 * To run a mutation, you first call `useCreateIonscaleAuthKeyMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateIonscaleAuthKeyMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createIonscaleAuthKeyMutation, { data, loading, error }] = useCreateIonscaleAuthKeyMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateIonscaleAuthKeyMutation(baseOptions?: Apollo.MutationHookOptions<CreateIonscaleAuthKeyMutation, CreateIonscaleAuthKeyMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateIonscaleAuthKeyMutation, CreateIonscaleAuthKeyMutationVariables>(CreateIonscaleAuthKeyDocument, options);
      }
export type CreateIonscaleAuthKeyMutationHookResult = ReturnType<typeof useCreateIonscaleAuthKeyMutation>;
export type CreateIonscaleAuthKeyMutationResult = Apollo.MutationResult<CreateIonscaleAuthKeyMutation>;
export type CreateIonscaleAuthKeyMutationOptions = Apollo.BaseMutationOptions<CreateIonscaleAuthKeyMutation, CreateIonscaleAuthKeyMutationVariables>;