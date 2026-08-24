import type * as Types from '../../api/types';
import type { DocumentNode } from 'graphql';
import { DetailDeviceGroupFragmentDoc, ListDeviceGroupFragmentDoc } from '../fragments/device_group.generated';
import { ListDeviceFragmentDoc, DeviceFragmentDoc } from '../fragments/device.generated';
import { ListClientFragmentDoc } from '../fragments/client.generated';
import { ManifestFragmentDoc } from '../fragments/manifest.generated';
import { ListServiceInstanceFragmentDoc } from '../fragments/service_instance.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type CreateDeviceGroupMutationVariables = Types.Exact<{
  input: Types.CreateDeviceGroupInput;
}>;

export type CreateDeviceGroupMutation = { __typename?: 'Mutation', createDeviceGroup: { __typename?: 'ManagementDeviceGroup', id: string, name: string, devices: Array<{ __typename?: 'ManagementDevice', id: string, name?: string | null, nodeId: string, deviceGroups: Array<{ __typename?: 'ManagementDeviceGroup', id: string, name: string }> }> } };

export type DeleteDeviceGroupMutationVariables = Types.Exact<{
  input: Types.DeleteDeviceGroupInput;
}>;

export type DeleteDeviceGroupMutation = { __typename?: 'Mutation', deleteDeviceGroup: string };

export type AddDeviceToGroupMutationVariables = Types.Exact<{
  input: Types.AddDeviceToGroupInput;
}>;

export type AddDeviceToGroupMutation = { __typename?: 'Mutation', addDeviceToGroup: { __typename?: 'ManagementDevice', id: string, name?: string | null, nodeId: string, clients: Array<{ __typename?: 'ManagementClient', id: string, name: string, kind: Types.ClientKind, lastReportedAt?: any | null, organization?: { __typename?: 'ManagementOrganization', id: string } | null, user?: { __typename?: 'ManagementUser', id: string, username: string } | null, logo?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null, device?: { __typename?: 'ManagementDevice', id: string, name?: string | null } | null, release?: { __typename?: 'ManagementRelease', version: any, logo?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null, app: { __typename?: 'ManagementApp', id: string, identifier: any, logo?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null } } | null, manifest?: { __typename?: 'ManagementStagingManifest', identifier: string, version: string, requirements: Array<{ __typename?: 'ManagementStagingRequirement', key: string, description?: string | null }> } | null }>, deviceGroups: Array<{ __typename?: 'ManagementDeviceGroup', id: string, name: string }>, serviceInstances: Array<{ __typename?: 'ManagementServiceInstance', id: string, identifier: string, release: { __typename?: 'ManagementServiceRelease', id: string, version: string, service: { __typename?: 'ManagementService', id: string, identifier: any, logo?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null } }, organization: { __typename?: 'ManagementOrganization', id: string } }> } };

export type RemoveDeviceFromGroupMutationVariables = Types.Exact<{
  input: Types.RemoveDeviceFromGroupInput;
}>;

export type RemoveDeviceFromGroupMutation = { __typename?: 'Mutation', removeDeviceFromGroup: { __typename?: 'ManagementDevice', id: string, name?: string | null, nodeId: string, clients: Array<{ __typename?: 'ManagementClient', id: string, name: string, kind: Types.ClientKind, lastReportedAt?: any | null, organization?: { __typename?: 'ManagementOrganization', id: string } | null, user?: { __typename?: 'ManagementUser', id: string, username: string } | null, logo?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null, device?: { __typename?: 'ManagementDevice', id: string, name?: string | null } | null, release?: { __typename?: 'ManagementRelease', version: any, logo?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null, app: { __typename?: 'ManagementApp', id: string, identifier: any, logo?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null } } | null, manifest?: { __typename?: 'ManagementStagingManifest', identifier: string, version: string, requirements: Array<{ __typename?: 'ManagementStagingRequirement', key: string, description?: string | null }> } | null }>, deviceGroups: Array<{ __typename?: 'ManagementDeviceGroup', id: string, name: string }>, serviceInstances: Array<{ __typename?: 'ManagementServiceInstance', id: string, identifier: string, release: { __typename?: 'ManagementServiceRelease', id: string, version: string, service: { __typename?: 'ManagementService', id: string, identifier: any, logo?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null } }, organization: { __typename?: 'ManagementOrganization', id: string } }> } };

export const CreateDeviceGroupDocument = {"kind":"Document", "definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateDeviceGroup"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateDeviceGroupInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createDeviceGroup"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"DetailDeviceGroup"}}]}}]}},...DetailDeviceGroupFragmentDoc.definitions,...ListDeviceFragmentDoc.definitions,...ListDeviceGroupFragmentDoc.definitions]} as unknown as DocumentNode;
export type CreateDeviceGroupMutationFn = Apollo.MutationFunction<CreateDeviceGroupMutation, CreateDeviceGroupMutationVariables>;

/**
 * __useCreateDeviceGroupMutation__
 *
 * To run a mutation, you first call `useCreateDeviceGroupMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateDeviceGroupMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createDeviceGroupMutation, { data, loading, error }] = useCreateDeviceGroupMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateDeviceGroupMutation(baseOptions?: Apollo.MutationHookOptions<CreateDeviceGroupMutation, CreateDeviceGroupMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateDeviceGroupMutation, CreateDeviceGroupMutationVariables>(CreateDeviceGroupDocument, options);
      }
export type CreateDeviceGroupMutationHookResult = ReturnType<typeof useCreateDeviceGroupMutation>;
export type CreateDeviceGroupMutationResult = Apollo.MutationResult<CreateDeviceGroupMutation>;
export type CreateDeviceGroupMutationOptions = Apollo.BaseMutationOptions<CreateDeviceGroupMutation, CreateDeviceGroupMutationVariables>;
export const DeleteDeviceGroupDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteDeviceGroup"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"DeleteDeviceGroupInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteDeviceGroup"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}]}]}}]} as unknown as DocumentNode;
export type DeleteDeviceGroupMutationFn = Apollo.MutationFunction<DeleteDeviceGroupMutation, DeleteDeviceGroupMutationVariables>;

/**
 * __useDeleteDeviceGroupMutation__
 *
 * To run a mutation, you first call `useDeleteDeviceGroupMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteDeviceGroupMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteDeviceGroupMutation, { data, loading, error }] = useDeleteDeviceGroupMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useDeleteDeviceGroupMutation(baseOptions?: Apollo.MutationHookOptions<DeleteDeviceGroupMutation, DeleteDeviceGroupMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteDeviceGroupMutation, DeleteDeviceGroupMutationVariables>(DeleteDeviceGroupDocument, options);
      }
export type DeleteDeviceGroupMutationHookResult = ReturnType<typeof useDeleteDeviceGroupMutation>;
export type DeleteDeviceGroupMutationResult = Apollo.MutationResult<DeleteDeviceGroupMutation>;
export type DeleteDeviceGroupMutationOptions = Apollo.BaseMutationOptions<DeleteDeviceGroupMutation, DeleteDeviceGroupMutationVariables>;
export const AddDeviceToGroupDocument = {"kind":"Document", "definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AddDeviceToGroup"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"AddDeviceToGroupInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addDeviceToGroup"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Device"}}]}}]}},...DeviceFragmentDoc.definitions,...ListClientFragmentDoc.definitions,...ManifestFragmentDoc.definitions,...ListDeviceGroupFragmentDoc.definitions,...ListServiceInstanceFragmentDoc.definitions]} as unknown as DocumentNode;
export type AddDeviceToGroupMutationFn = Apollo.MutationFunction<AddDeviceToGroupMutation, AddDeviceToGroupMutationVariables>;

/**
 * __useAddDeviceToGroupMutation__
 *
 * To run a mutation, you first call `useAddDeviceToGroupMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddDeviceToGroupMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addDeviceToGroupMutation, { data, loading, error }] = useAddDeviceToGroupMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useAddDeviceToGroupMutation(baseOptions?: Apollo.MutationHookOptions<AddDeviceToGroupMutation, AddDeviceToGroupMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddDeviceToGroupMutation, AddDeviceToGroupMutationVariables>(AddDeviceToGroupDocument, options);
      }
export type AddDeviceToGroupMutationHookResult = ReturnType<typeof useAddDeviceToGroupMutation>;
export type AddDeviceToGroupMutationResult = Apollo.MutationResult<AddDeviceToGroupMutation>;
export type AddDeviceToGroupMutationOptions = Apollo.BaseMutationOptions<AddDeviceToGroupMutation, AddDeviceToGroupMutationVariables>;
export const RemoveDeviceFromGroupDocument = {"kind":"Document", "definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RemoveDeviceFromGroup"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"RemoveDeviceFromGroupInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"removeDeviceFromGroup"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Device"}}]}}]}},...DeviceFragmentDoc.definitions,...ListClientFragmentDoc.definitions,...ManifestFragmentDoc.definitions,...ListDeviceGroupFragmentDoc.definitions,...ListServiceInstanceFragmentDoc.definitions]} as unknown as DocumentNode;
export type RemoveDeviceFromGroupMutationFn = Apollo.MutationFunction<RemoveDeviceFromGroupMutation, RemoveDeviceFromGroupMutationVariables>;

/**
 * __useRemoveDeviceFromGroupMutation__
 *
 * To run a mutation, you first call `useRemoveDeviceFromGroupMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveDeviceFromGroupMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeDeviceFromGroupMutation, { data, loading, error }] = useRemoveDeviceFromGroupMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useRemoveDeviceFromGroupMutation(baseOptions?: Apollo.MutationHookOptions<RemoveDeviceFromGroupMutation, RemoveDeviceFromGroupMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RemoveDeviceFromGroupMutation, RemoveDeviceFromGroupMutationVariables>(RemoveDeviceFromGroupDocument, options);
      }
export type RemoveDeviceFromGroupMutationHookResult = ReturnType<typeof useRemoveDeviceFromGroupMutation>;
export type RemoveDeviceFromGroupMutationResult = Apollo.MutationResult<RemoveDeviceFromGroupMutation>;
export type RemoveDeviceFromGroupMutationOptions = Apollo.BaseMutationOptions<RemoveDeviceFromGroupMutation, RemoveDeviceFromGroupMutationVariables>;