import type * as Types from '../../api/types';
import type { DocumentNode } from 'graphql';
import { HubFragmentDoc } from '../fragments/hub.generated';
import { ListServiceInstanceFragmentDoc } from '../fragments/service_instance.generated';
import { ListClientFragmentDoc } from '../fragments/client.generated';
import { ManifestFragmentDoc, HubManifestFragmentDoc, ServiceManifestFragmentDoc } from '../fragments/manifest.generated';
import { HubDeviceCodeFragmentDoc } from '../fragments/hub_device_code.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type AcceptHubDeviceCodeMutationVariables = Types.Exact<{
  input: Types.AcceptHubDeviceCodeInput;
}>;

export type AcceptHubDeviceCodeMutation = { __typename?: 'Mutation', acceptHubDeviceCode: { __typename?: 'ManagementHub', id: string, name: string, organization: { __typename?: 'ManagementOrganization', id: string, name?: string | null }, instances: Array<{ __typename?: 'ManagementServiceInstance', id: string, identifier: string, release: { __typename?: 'ManagementServiceRelease', id: string, version: string, service: { __typename?: 'ManagementService', id: string, identifier: any, logo?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null } }, organization: { __typename?: 'ManagementOrganization', id: string } }>, clients: Array<{ __typename?: 'ManagementClient', id: string, name: string, kind: Types.ClientKind, lastReportedAt?: any | null, organization?: { __typename?: 'ManagementOrganization', id: string } | null, user?: { __typename?: 'ManagementUser', id: string, username: string } | null, logo?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null, device?: { __typename?: 'ManagementDevice', id: string, name?: string | null } | null, release?: { __typename?: 'ManagementRelease', version: any, logo?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null, app: { __typename?: 'ManagementApp', id: string, identifier: any, logo?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null } } | null, manifest?: { __typename?: 'ManagementStagingManifest', identifier: string, version: string, requirements: Array<{ __typename?: 'ManagementStagingRequirement', key: string, description?: string | null }> } | null }> } };

export type DeclineHubDeviceCodeMutationVariables = Types.Exact<{
  input: Types.DeclineHubDeviceCodeInput;
}>;

export type DeclineHubDeviceCodeMutation = { __typename?: 'Mutation', declineHubDeviceCode: { __typename?: 'ManagementHubDeviceCode', id: string, code: string, manifest?: { __typename?: 'ManagementHubManifest', identifier: string, instances: Array<{ __typename?: 'ManagementStagingInstanceRequest', description?: string | null, identifier: string, manifest: { __typename?: 'ManagementStagingServiceManifest', identifier: string, version: string, logo?: string | null, description?: string | null, roles?: Array<{ __typename?: 'StagingRole', key: string, description?: string | null }> | null, scopes?: Array<{ __typename?: 'StagingScope', key: string, description?: string | null }> | null, publicSources?: Array<{ __typename?: 'ManagementStagingPublicSource', kind: string, url: string }> | null }, aliases?: Array<{ __typename?: 'StagingAlias', id: string, name?: string | null, kind: string, scope: string, ssl: boolean, host?: string | null, port?: number | null, path?: string | null, public: boolean }> | null }>, clients: Array<{ __typename?: 'ManagementStagingClientRequest', description?: string | null, identifier: string, manifest: { __typename?: 'ManagementStagingManifest', identifier: string, version: string, requirements: Array<{ __typename?: 'ManagementStagingRequirement', key: string, description?: string | null }> } }> } | null } };

export const AcceptHubDeviceCodeDocument = {"kind":"Document", "definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AcceptHubDeviceCode"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"AcceptHubDeviceCodeInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"acceptHubDeviceCode"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Hub"}}]}}]}},...HubFragmentDoc.definitions,...ListServiceInstanceFragmentDoc.definitions,...ListClientFragmentDoc.definitions,...ManifestFragmentDoc.definitions]} as unknown as DocumentNode;
export type AcceptHubDeviceCodeMutationFn = Apollo.MutationFunction<AcceptHubDeviceCodeMutation, AcceptHubDeviceCodeMutationVariables>;

/**
 * __useAcceptHubDeviceCodeMutation__
 *
 * To run a mutation, you first call `useAcceptHubDeviceCodeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAcceptHubDeviceCodeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [acceptHubDeviceCodeMutation, { data, loading, error }] = useAcceptHubDeviceCodeMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useAcceptHubDeviceCodeMutation(baseOptions?: Apollo.MutationHookOptions<AcceptHubDeviceCodeMutation, AcceptHubDeviceCodeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AcceptHubDeviceCodeMutation, AcceptHubDeviceCodeMutationVariables>(AcceptHubDeviceCodeDocument, options);
      }
export type AcceptHubDeviceCodeMutationHookResult = ReturnType<typeof useAcceptHubDeviceCodeMutation>;
export type AcceptHubDeviceCodeMutationResult = Apollo.MutationResult<AcceptHubDeviceCodeMutation>;
export type AcceptHubDeviceCodeMutationOptions = Apollo.BaseMutationOptions<AcceptHubDeviceCodeMutation, AcceptHubDeviceCodeMutationVariables>;
export const DeclineHubDeviceCodeDocument = {"kind":"Document", "definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeclineHubDeviceCode"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"DeclineHubDeviceCodeInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"declineHubDeviceCode"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"HubDeviceCode"}}]}}]}},...HubDeviceCodeFragmentDoc.definitions,...HubManifestFragmentDoc.definitions,...ServiceManifestFragmentDoc.definitions,...ManifestFragmentDoc.definitions]} as unknown as DocumentNode;
export type DeclineHubDeviceCodeMutationFn = Apollo.MutationFunction<DeclineHubDeviceCodeMutation, DeclineHubDeviceCodeMutationVariables>;

/**
 * __useDeclineHubDeviceCodeMutation__
 *
 * To run a mutation, you first call `useDeclineHubDeviceCodeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeclineHubDeviceCodeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [declineHubDeviceCodeMutation, { data, loading, error }] = useDeclineHubDeviceCodeMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useDeclineHubDeviceCodeMutation(baseOptions?: Apollo.MutationHookOptions<DeclineHubDeviceCodeMutation, DeclineHubDeviceCodeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeclineHubDeviceCodeMutation, DeclineHubDeviceCodeMutationVariables>(DeclineHubDeviceCodeDocument, options);
      }
export type DeclineHubDeviceCodeMutationHookResult = ReturnType<typeof useDeclineHubDeviceCodeMutation>;
export type DeclineHubDeviceCodeMutationResult = Apollo.MutationResult<DeclineHubDeviceCodeMutation>;
export type DeclineHubDeviceCodeMutationOptions = Apollo.BaseMutationOptions<DeclineHubDeviceCodeMutation, DeclineHubDeviceCodeMutationVariables>;