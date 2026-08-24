import type * as Types from '../../api/types';
import type { DocumentNode } from 'graphql';
import { DetailClientFragmentDoc, ListClientFragmentDoc } from '../fragments/client.generated';
import { ListReleaseFragmentDoc } from '../fragments/release.generated';
import { ListAppFragmentDoc } from '../fragments/app.generated';
import { ListServiceInstanceMappingFragmentDoc } from '../fragments/serviceinstancemapping.generated';
import { ListServiceInstanceFragmentDoc } from '../fragments/service_instance.generated';
import { ManifestFragmentDoc } from '../fragments/manifest.generated';
import { ListUsedAliasFragmentDoc } from '../fragments/used_alias.generated';
import { ListInstanceAliasFragmentDoc } from '../fragments/alias.generated';
import { DeviceCodeFragmentDoc } from '../fragments/device_code.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type AcceptDeviceCodeMutationVariables = Types.Exact<{
  input: Types.AcceptDeviceCodeInput;
}>;

export type AcceptDeviceCodeMutation = { __typename?: 'Mutation', acceptDeviceCode: { __typename?: 'ManagementClient', id: string, name: string, lastReportedAt?: any | null, functional: boolean, kind: Types.ClientKind, issueUrl?: string | null, user?: { __typename?: 'ManagementUser', id: string, username: string } | null, organization?: { __typename?: 'ManagementOrganization', id: string, name?: string | null, slug: string } | null, release?: { __typename?: 'ManagementRelease', id: string, version: any, logo?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null, app: { __typename?: 'ManagementApp', id: string, identifier: any, logo?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null } } | null, logo?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null, mappings: Array<{ __typename?: 'ManagementServiceInstanceMapping', id: string, key: string, optional: boolean, instance: { __typename?: 'ManagementServiceInstance', id: string, identifier: string, release: { __typename?: 'ManagementServiceRelease', id: string, version: string, service: { __typename?: 'ManagementService', id: string, identifier: any, logo?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null } }, organization: { __typename?: 'ManagementOrganization', id: string } }, client: { __typename?: 'ManagementClient', id: string, name: string, kind: Types.ClientKind, lastReportedAt?: any | null, organization?: { __typename?: 'ManagementOrganization', id: string } | null, user?: { __typename?: 'ManagementUser', id: string, username: string } | null, logo?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null, device?: { __typename?: 'ManagementDevice', id: string, name?: string | null } | null, release?: { __typename?: 'ManagementRelease', version: any, logo?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null, app: { __typename?: 'ManagementApp', id: string, identifier: any, logo?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null } } | null, manifest?: { __typename?: 'ManagementStagingManifest', identifier: string, version: string, requirements: Array<{ __typename?: 'ManagementStagingRequirement', key: string, description?: string | null }> } | null } }>, usedAliases: Array<{ __typename?: 'ManagementUsedAlias', id: string, key: string, valid: boolean, reason?: string | null, alias?: { __typename?: 'ManagementInstanceAlias', id: string, host?: string | null, port?: number | null, ssl: boolean, path?: string | null, challenge: string, kind: string, scope: string, layer?: { __typename?: 'ManagementLayer', id: string, name: string } | null, instance: { __typename?: 'ManagementServiceInstance', id: string, identifier: string, release: { __typename?: 'ManagementServiceRelease', version: string, service: { __typename?: 'ManagementService', id: string, identifier: any } } } } | null }>, device?: { __typename?: 'ManagementDevice', id: string, name?: string | null } | null, publicSources: Array<{ __typename?: 'ManagementPublicSource', kind: string, url: string }>, manifest?: { __typename?: 'ManagementStagingManifest', identifier: string, version: string, requirements: Array<{ __typename?: 'ManagementStagingRequirement', key: string, description?: string | null }> } | null, scopes: Array<{ __typename?: 'ManagementScope', id: string, identifier: string, description: string }> } };

export type DeclineDeviceCodeMutationVariables = Types.Exact<{
  input: Types.DeclineDeviceCodeInput;
}>;

export type DeclineDeviceCodeMutation = { __typename?: 'Mutation', declineDeviceCode: { __typename?: 'ManagementDeviceCode', id: string, code: string, stagingKind: string, stagingManifest?: { __typename?: 'ManagementStagingManifest', identifier: string, version: string, hasNodeId: boolean, logo?: string | null, description?: string | null, repoUrl?: string | null, scopes: Array<string>, requirements: Array<{ __typename?: 'ManagementStagingRequirement', key: string, service: string, optional: boolean, description?: string | null }>, publicSources?: Array<{ __typename?: 'ManagementStagingPublicSource', kind: string, url: string }> | null } | null, client?: { __typename?: 'ManagementClient', id: string, kind: Types.ClientKind, name: string, release?: { __typename?: 'ManagementRelease', version: any, scopes: Array<string>, app: { __typename?: 'ManagementApp', identifier: any } } | null } | null } };

export const AcceptDeviceCodeDocument = {"kind":"Document", "definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AcceptDeviceCode"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"AcceptDeviceCodeInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"acceptDeviceCode"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"DetailClient"}}]}}]}},...DetailClientFragmentDoc.definitions,...ListReleaseFragmentDoc.definitions,...ListAppFragmentDoc.definitions,...ListServiceInstanceMappingFragmentDoc.definitions,...ListServiceInstanceFragmentDoc.definitions,...ListClientFragmentDoc.definitions,...ManifestFragmentDoc.definitions,...ListUsedAliasFragmentDoc.definitions,...ListInstanceAliasFragmentDoc.definitions]} as unknown as DocumentNode;
export type AcceptDeviceCodeMutationFn = Apollo.MutationFunction<AcceptDeviceCodeMutation, AcceptDeviceCodeMutationVariables>;

/**
 * __useAcceptDeviceCodeMutation__
 *
 * To run a mutation, you first call `useAcceptDeviceCodeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAcceptDeviceCodeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [acceptDeviceCodeMutation, { data, loading, error }] = useAcceptDeviceCodeMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useAcceptDeviceCodeMutation(baseOptions?: Apollo.MutationHookOptions<AcceptDeviceCodeMutation, AcceptDeviceCodeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AcceptDeviceCodeMutation, AcceptDeviceCodeMutationVariables>(AcceptDeviceCodeDocument, options);
      }
export type AcceptDeviceCodeMutationHookResult = ReturnType<typeof useAcceptDeviceCodeMutation>;
export type AcceptDeviceCodeMutationResult = Apollo.MutationResult<AcceptDeviceCodeMutation>;
export type AcceptDeviceCodeMutationOptions = Apollo.BaseMutationOptions<AcceptDeviceCodeMutation, AcceptDeviceCodeMutationVariables>;
export const DeclineDeviceCodeDocument = {"kind":"Document", "definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeclineDeviceCode"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"DeclineDeviceCodeInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"declineDeviceCode"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"DeviceCode"}}]}}]}},...DeviceCodeFragmentDoc.definitions]} as unknown as DocumentNode;
export type DeclineDeviceCodeMutationFn = Apollo.MutationFunction<DeclineDeviceCodeMutation, DeclineDeviceCodeMutationVariables>;

/**
 * __useDeclineDeviceCodeMutation__
 *
 * To run a mutation, you first call `useDeclineDeviceCodeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeclineDeviceCodeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [declineDeviceCodeMutation, { data, loading, error }] = useDeclineDeviceCodeMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useDeclineDeviceCodeMutation(baseOptions?: Apollo.MutationHookOptions<DeclineDeviceCodeMutation, DeclineDeviceCodeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeclineDeviceCodeMutation, DeclineDeviceCodeMutationVariables>(DeclineDeviceCodeDocument, options);
      }
export type DeclineDeviceCodeMutationHookResult = ReturnType<typeof useDeclineDeviceCodeMutation>;
export type DeclineDeviceCodeMutationResult = Apollo.MutationResult<DeclineDeviceCodeMutation>;
export type DeclineDeviceCodeMutationOptions = Apollo.BaseMutationOptions<DeclineDeviceCodeMutation, DeclineDeviceCodeMutationVariables>;