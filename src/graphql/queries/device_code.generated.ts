import type * as Types from '../../api/types';
import type { DocumentNode } from 'graphql';
import { DeviceCodeFragmentDoc } from '../fragments/device_code.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type DeviceCodeByCodeQueryVariables = Types.Exact<{
  code: Types.Scalars['String']['input'];
}>;

export type DeviceCodeByCodeQuery = { __typename?: 'Query', deviceCodeByCode: { __typename?: 'ManagementDeviceCode', id: string, code: string, stagingKind: string, requestAuthKey: boolean, stagingManifest?: { __typename?: 'ManagementStagingManifest', identifier: string, version: string, hasNodeId: boolean, logo?: string | null, description?: string | null, repoUrl?: string | null, scopes: Array<string>, requirements: Array<{ __typename?: 'ManagementStagingRequirement', key: string, service: string, optional: boolean, description?: string | null }>, publicSources?: Array<{ __typename?: 'ManagementStagingPublicSource', kind: string, url: string }> | null } | null, client?: { __typename?: 'ManagementClient', id: string, kind: Types.ClientKind, name: string, release?: { __typename?: 'ManagementRelease', version: any, scopes: Array<string>, app: { __typename?: 'ManagementApp', identifier: any } } | null } | null, priorAuthorizations: Array<{ __typename?: 'ManagementPriorAuthorization', version: string, scopes: Array<string>, authorizedAt: any, lastSeenAt?: any | null, accessState: Types.PriorAccessState, hub: { __typename?: 'ManagementHub', id: string, name: string, organization: { __typename?: 'ManagementOrganization', id: string, name?: string | null } }, client: { __typename?: 'ManagementClient', id: string, name: string } }> } };

export type ValidateDeviceCodeQueryVariables = Types.Exact<{
  deviceCode: Types.Scalars['ID']['input'];
  hub: Types.Scalars['ID']['input'];
  code: Types.Scalars['String']['input'];
}>;

export type ValidateDeviceCodeQuery = { __typename?: 'Query', validateDeviceCode: { __typename?: 'ValidationResult', valid: boolean, reason?: string | null, existingDevice?: { __typename?: 'ManagementDevice', id: string, name?: string | null } | null, mappings: Array<{ __typename?: 'PotentialMapping', key: string, serviceInstance?: { __typename?: 'ManagementServiceInstance', id: string, identifier: string } | null }> } };

export const DeviceCodeByCodeDocument = {"kind":"Document", "definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"DeviceCodeByCode"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"code"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deviceCodeByCode"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"deviceCode"},"value":{"kind":"Variable","name":{"kind":"Name","value":"code"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"DeviceCode"}}]}}]}},...DeviceCodeFragmentDoc.definitions]} as unknown as DocumentNode;

/**
 * __useDeviceCodeByCodeQuery__
 *
 * To run a query within a React component, call `useDeviceCodeByCodeQuery` and pass it any options that fit your needs.
 * When your component renders, `useDeviceCodeByCodeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useDeviceCodeByCodeQuery({
 *   variables: {
 *      code: // value for 'code'
 *   },
 * });
 */
export function useDeviceCodeByCodeQuery(baseOptions: Apollo.QueryHookOptions<DeviceCodeByCodeQuery, DeviceCodeByCodeQueryVariables> & ({ variables: DeviceCodeByCodeQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<DeviceCodeByCodeQuery, DeviceCodeByCodeQueryVariables>(DeviceCodeByCodeDocument, options);
      }
export function useDeviceCodeByCodeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<DeviceCodeByCodeQuery, DeviceCodeByCodeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<DeviceCodeByCodeQuery, DeviceCodeByCodeQueryVariables>(DeviceCodeByCodeDocument, options);
        }
// @ts-ignore
export function useDeviceCodeByCodeSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<DeviceCodeByCodeQuery, DeviceCodeByCodeQueryVariables>): Apollo.UseSuspenseQueryResult<DeviceCodeByCodeQuery, DeviceCodeByCodeQueryVariables>;
export function useDeviceCodeByCodeSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<DeviceCodeByCodeQuery, DeviceCodeByCodeQueryVariables>): Apollo.UseSuspenseQueryResult<DeviceCodeByCodeQuery | undefined, DeviceCodeByCodeQueryVariables>;
export function useDeviceCodeByCodeSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<DeviceCodeByCodeQuery, DeviceCodeByCodeQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<DeviceCodeByCodeQuery, DeviceCodeByCodeQueryVariables>(DeviceCodeByCodeDocument, options);
        }
export type DeviceCodeByCodeQueryHookResult = ReturnType<typeof useDeviceCodeByCodeQuery>;
export type DeviceCodeByCodeLazyQueryHookResult = ReturnType<typeof useDeviceCodeByCodeLazyQuery>;
export type DeviceCodeByCodeSuspenseQueryHookResult = ReturnType<typeof useDeviceCodeByCodeSuspenseQuery>;
export type DeviceCodeByCodeQueryResult = Apollo.QueryResult<DeviceCodeByCodeQuery, DeviceCodeByCodeQueryVariables>;
export const ValidateDeviceCodeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ValidateDeviceCode"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"deviceCode"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"hub"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"code"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"validateDeviceCode"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"deviceCode"},"value":{"kind":"Variable","name":{"kind":"Name","value":"deviceCode"}}},{"kind":"Argument","name":{"kind":"Name","value":"hub"},"value":{"kind":"Variable","name":{"kind":"Name","value":"hub"}}},{"kind":"Argument","name":{"kind":"Name","value":"code"},"value":{"kind":"Variable","name":{"kind":"Name","value":"code"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"valid"}},{"kind":"Field","name":{"kind":"Name","value":"reason"}},{"kind":"Field","name":{"kind":"Name","value":"existingDevice"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"mappings"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"serviceInstance"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"identifier"}}]}}]}}]}}]}}]} as unknown as DocumentNode;

/**
 * __useValidateDeviceCodeQuery__
 *
 * To run a query within a React component, call `useValidateDeviceCodeQuery` and pass it any options that fit your needs.
 * When your component renders, `useValidateDeviceCodeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useValidateDeviceCodeQuery({
 *   variables: {
 *      deviceCode: // value for 'deviceCode'
 *      hub: // value for 'hub'
 *      code: // value for 'code'
 *   },
 * });
 */
export function useValidateDeviceCodeQuery(baseOptions: Apollo.QueryHookOptions<ValidateDeviceCodeQuery, ValidateDeviceCodeQueryVariables> & ({ variables: ValidateDeviceCodeQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ValidateDeviceCodeQuery, ValidateDeviceCodeQueryVariables>(ValidateDeviceCodeDocument, options);
      }
export function useValidateDeviceCodeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ValidateDeviceCodeQuery, ValidateDeviceCodeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ValidateDeviceCodeQuery, ValidateDeviceCodeQueryVariables>(ValidateDeviceCodeDocument, options);
        }
// @ts-ignore
export function useValidateDeviceCodeSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<ValidateDeviceCodeQuery, ValidateDeviceCodeQueryVariables>): Apollo.UseSuspenseQueryResult<ValidateDeviceCodeQuery, ValidateDeviceCodeQueryVariables>;
export function useValidateDeviceCodeSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<ValidateDeviceCodeQuery, ValidateDeviceCodeQueryVariables>): Apollo.UseSuspenseQueryResult<ValidateDeviceCodeQuery | undefined, ValidateDeviceCodeQueryVariables>;
export function useValidateDeviceCodeSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<ValidateDeviceCodeQuery, ValidateDeviceCodeQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ValidateDeviceCodeQuery, ValidateDeviceCodeQueryVariables>(ValidateDeviceCodeDocument, options);
        }
export type ValidateDeviceCodeQueryHookResult = ReturnType<typeof useValidateDeviceCodeQuery>;
export type ValidateDeviceCodeLazyQueryHookResult = ReturnType<typeof useValidateDeviceCodeLazyQuery>;
export type ValidateDeviceCodeSuspenseQueryHookResult = ReturnType<typeof useValidateDeviceCodeSuspenseQuery>;
export type ValidateDeviceCodeQueryResult = Apollo.QueryResult<ValidateDeviceCodeQuery, ValidateDeviceCodeQueryVariables>;