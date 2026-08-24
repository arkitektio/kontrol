import type * as Types from '../../api/types';
import type { DocumentNode } from 'graphql';
import { HubFragmentDoc } from '../fragments/hub.generated';
import { ListServiceInstanceFragmentDoc } from '../fragments/service_instance.generated';
import { ListClientFragmentDoc } from '../fragments/client.generated';
import { ManifestFragmentDoc } from '../fragments/manifest.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type UpdateHubMutationVariables = Types.Exact<{
  input: Types.UpdateHubInput;
}>;

export type UpdateHubMutation = { __typename?: 'Mutation', updateHub: { __typename?: 'ManagementHub', id: string, name: string, organization: { __typename?: 'ManagementOrganization', id: string, name?: string | null }, instances: Array<{ __typename?: 'ManagementServiceInstance', id: string, identifier: string, release: { __typename?: 'ManagementServiceRelease', id: string, version: string, service: { __typename?: 'ManagementService', id: string, identifier: any, logo?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null } }, organization: { __typename?: 'ManagementOrganization', id: string } }>, clients: Array<{ __typename?: 'ManagementClient', id: string, name: string, kind: Types.ClientKind, lastReportedAt?: any | null, organization?: { __typename?: 'ManagementOrganization', id: string } | null, user?: { __typename?: 'ManagementUser', id: string, username: string } | null, logo?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null, device?: { __typename?: 'ManagementDevice', id: string, name?: string | null } | null, release?: { __typename?: 'ManagementRelease', version: any, logo?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null, app: { __typename?: 'ManagementApp', id: string, identifier: any, logo?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null } } | null, manifest?: { __typename?: 'ManagementStagingManifest', identifier: string, version: string, requirements: Array<{ __typename?: 'ManagementStagingRequirement', key: string, description?: string | null }> } | null }> } };

export type DeleteHubMutationVariables = Types.Exact<{
  input: Types.DeleteHubInput;
}>;

export type DeleteHubMutation = { __typename?: 'Mutation', deleteHub: string };

export const UpdateHubDocument = {"kind":"Document", "definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateHub"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateHubInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateHub"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Hub"}}]}}]}},...HubFragmentDoc.definitions,...ListServiceInstanceFragmentDoc.definitions,...ListClientFragmentDoc.definitions,...ManifestFragmentDoc.definitions]} as unknown as DocumentNode;
export type UpdateHubMutationFn = Apollo.MutationFunction<UpdateHubMutation, UpdateHubMutationVariables>;

/**
 * __useUpdateHubMutation__
 *
 * To run a mutation, you first call `useUpdateHubMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateHubMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateHubMutation, { data, loading, error }] = useUpdateHubMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateHubMutation(baseOptions?: Apollo.MutationHookOptions<UpdateHubMutation, UpdateHubMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateHubMutation, UpdateHubMutationVariables>(UpdateHubDocument, options);
      }
export type UpdateHubMutationHookResult = ReturnType<typeof useUpdateHubMutation>;
export type UpdateHubMutationResult = Apollo.MutationResult<UpdateHubMutation>;
export type UpdateHubMutationOptions = Apollo.BaseMutationOptions<UpdateHubMutation, UpdateHubMutationVariables>;
export const DeleteHubDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteHub"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"DeleteHubInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteHub"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}]}]}}]} as unknown as DocumentNode;
export type DeleteHubMutationFn = Apollo.MutationFunction<DeleteHubMutation, DeleteHubMutationVariables>;

/**
 * __useDeleteHubMutation__
 *
 * To run a mutation, you first call `useDeleteHubMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteHubMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteHubMutation, { data, loading, error }] = useDeleteHubMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useDeleteHubMutation(baseOptions?: Apollo.MutationHookOptions<DeleteHubMutation, DeleteHubMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteHubMutation, DeleteHubMutationVariables>(DeleteHubDocument, options);
      }
export type DeleteHubMutationHookResult = ReturnType<typeof useDeleteHubMutation>;
export type DeleteHubMutationResult = Apollo.MutationResult<DeleteHubMutation>;
export type DeleteHubMutationOptions = Apollo.BaseMutationOptions<DeleteHubMutation, DeleteHubMutationVariables>;