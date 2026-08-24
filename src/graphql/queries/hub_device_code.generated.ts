import type * as Types from '../../api/types';
import type { DocumentNode } from 'graphql';
import { HubDeviceCodeFragmentDoc } from '../fragments/hub_device_code.generated';
import { HubManifestFragmentDoc, ServiceManifestFragmentDoc, ManifestFragmentDoc } from '../fragments/manifest.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type HubDeviceCodeByCodeQueryVariables = Types.Exact<{
  code: Types.Scalars['String']['input'];
}>;

export type HubDeviceCodeByCodeQuery = { __typename?: 'Query', hubDeviceCodeByCode: { __typename?: 'ManagementHubDeviceCode', id: string, code: string, manifest?: { __typename?: 'ManagementHubManifest', identifier: string, instances: Array<{ __typename?: 'ManagementStagingInstanceRequest', description?: string | null, identifier: string, manifest: { __typename?: 'ManagementStagingServiceManifest', identifier: string, version: string, logo?: string | null, description?: string | null, roles?: Array<{ __typename?: 'StagingRole', key: string, description?: string | null }> | null, scopes?: Array<{ __typename?: 'StagingScope', key: string, description?: string | null }> | null, publicSources?: Array<{ __typename?: 'ManagementStagingPublicSource', kind: string, url: string }> | null }, aliases?: Array<{ __typename?: 'StagingAlias', id: string, name?: string | null, kind: string, scope: string, ssl: boolean, host?: string | null, port?: number | null, path?: string | null, public: boolean }> | null }>, clients: Array<{ __typename?: 'ManagementStagingClientRequest', description?: string | null, identifier: string, manifest: { __typename?: 'ManagementStagingManifest', identifier: string, version: string, requirements: Array<{ __typename?: 'ManagementStagingRequirement', key: string, description?: string | null }> } }> } | null } };

export const HubDeviceCodeByCodeDocument = {"kind":"Document", "definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"HubDeviceCodeByCode"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"code"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"hubDeviceCodeByCode"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"code"},"value":{"kind":"Variable","name":{"kind":"Name","value":"code"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"HubDeviceCode"}}]}}]}},...HubDeviceCodeFragmentDoc.definitions,...HubManifestFragmentDoc.definitions,...ServiceManifestFragmentDoc.definitions,...ManifestFragmentDoc.definitions]} as unknown as DocumentNode;

/**
 * __useHubDeviceCodeByCodeQuery__
 *
 * To run a query within a React component, call `useHubDeviceCodeByCodeQuery` and pass it any options that fit your needs.
 * When your component renders, `useHubDeviceCodeByCodeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useHubDeviceCodeByCodeQuery({
 *   variables: {
 *      code: // value for 'code'
 *   },
 * });
 */
export function useHubDeviceCodeByCodeQuery(baseOptions: Apollo.QueryHookOptions<HubDeviceCodeByCodeQuery, HubDeviceCodeByCodeQueryVariables> & ({ variables: HubDeviceCodeByCodeQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<HubDeviceCodeByCodeQuery, HubDeviceCodeByCodeQueryVariables>(HubDeviceCodeByCodeDocument, options);
      }
export function useHubDeviceCodeByCodeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<HubDeviceCodeByCodeQuery, HubDeviceCodeByCodeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<HubDeviceCodeByCodeQuery, HubDeviceCodeByCodeQueryVariables>(HubDeviceCodeByCodeDocument, options);
        }
// @ts-ignore
export function useHubDeviceCodeByCodeSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<HubDeviceCodeByCodeQuery, HubDeviceCodeByCodeQueryVariables>): Apollo.UseSuspenseQueryResult<HubDeviceCodeByCodeQuery, HubDeviceCodeByCodeQueryVariables>;
export function useHubDeviceCodeByCodeSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<HubDeviceCodeByCodeQuery, HubDeviceCodeByCodeQueryVariables>): Apollo.UseSuspenseQueryResult<HubDeviceCodeByCodeQuery | undefined, HubDeviceCodeByCodeQueryVariables>;
export function useHubDeviceCodeByCodeSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<HubDeviceCodeByCodeQuery, HubDeviceCodeByCodeQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<HubDeviceCodeByCodeQuery, HubDeviceCodeByCodeQueryVariables>(HubDeviceCodeByCodeDocument, options);
        }
export type HubDeviceCodeByCodeQueryHookResult = ReturnType<typeof useHubDeviceCodeByCodeQuery>;
export type HubDeviceCodeByCodeLazyQueryHookResult = ReturnType<typeof useHubDeviceCodeByCodeLazyQuery>;
export type HubDeviceCodeByCodeSuspenseQueryHookResult = ReturnType<typeof useHubDeviceCodeByCodeSuspenseQuery>;
export type HubDeviceCodeByCodeQueryResult = Apollo.QueryResult<HubDeviceCodeByCodeQuery, HubDeviceCodeByCodeQueryVariables>;