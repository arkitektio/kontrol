import type * as Types from '../../api/types';
import type { DocumentNode } from 'graphql';
import { ListMandateFragmentDoc } from '../fragments/mandate.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type IssueMandateKeyMutationVariables = Types.Exact<{
  input: Types.IssueMandateKeyInput;
}>;

export type IssueMandateKeyMutation = { __typename?: 'Mutation', issueMandateKey: { __typename?: 'ManagementIssuedMandateKey', key: string, mandate: { __typename?: 'ManagementMandate', id: string, label: string, keyPrefix: string, claimant: Types.MandateClaimant, origin: Types.MandateOrigin, agentIdentifier?: string | null, maxClients?: number | null, allowMesh: boolean, createdAt: any, expiresAt?: any | null, revokedAt?: any | null, revocationReason?: Types.MandateRevocation | null, lastUsedAt?: any | null, isLive: boolean, subject: { __typename?: 'ManagementMandatePin', identifier?: string | null, version?: string | null, deviceId?: string | null, scopes?: Array<string> | null }, grantor: { __typename?: 'ManagementUser', id: string, username: string }, hub: { __typename?: 'ManagementHub', id: string, name: string }, clients: Array<{ __typename?: 'ManagementClient', id: string }> } } };

export type RevokeMandateMutationVariables = Types.Exact<{
  input: Types.RevokeMandateInput;
}>;

export type RevokeMandateMutation = { __typename?: 'Mutation', revokeMandate: { __typename?: 'ManagementMandate', id: string, label: string, keyPrefix: string, claimant: Types.MandateClaimant, origin: Types.MandateOrigin, agentIdentifier?: string | null, maxClients?: number | null, allowMesh: boolean, createdAt: any, expiresAt?: any | null, revokedAt?: any | null, revocationReason?: Types.MandateRevocation | null, lastUsedAt?: any | null, isLive: boolean, subject: { __typename?: 'ManagementMandatePin', identifier?: string | null, version?: string | null, deviceId?: string | null, scopes?: Array<string> | null }, grantor: { __typename?: 'ManagementUser', id: string, username: string }, hub: { __typename?: 'ManagementHub', id: string, name: string }, clients: Array<{ __typename?: 'ManagementClient', id: string }> } };

export const IssueMandateKeyDocument = {"kind":"Document", "definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"IssueMandateKey"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"IssueMandateKeyInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"issueMandateKey"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"mandate"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ListMandate"}}]}}]}}]}},...ListMandateFragmentDoc.definitions]} as unknown as DocumentNode;
export type IssueMandateKeyMutationFn = Apollo.MutationFunction<IssueMandateKeyMutation, IssueMandateKeyMutationVariables>;

/**
 * __useIssueMandateKeyMutation__
 *
 * To run a mutation, you first call `useIssueMandateKeyMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useIssueMandateKeyMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [issueMandateKeyMutation, { data, loading, error }] = useIssueMandateKeyMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useIssueMandateKeyMutation(baseOptions?: Apollo.MutationHookOptions<IssueMandateKeyMutation, IssueMandateKeyMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<IssueMandateKeyMutation, IssueMandateKeyMutationVariables>(IssueMandateKeyDocument, options);
      }
export type IssueMandateKeyMutationHookResult = ReturnType<typeof useIssueMandateKeyMutation>;
export type IssueMandateKeyMutationResult = Apollo.MutationResult<IssueMandateKeyMutation>;
export type IssueMandateKeyMutationOptions = Apollo.BaseMutationOptions<IssueMandateKeyMutation, IssueMandateKeyMutationVariables>;
export const RevokeMandateDocument = {"kind":"Document", "definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RevokeMandate"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"RevokeMandateInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"revokeMandate"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ListMandate"}}]}}]}},...ListMandateFragmentDoc.definitions]} as unknown as DocumentNode;
export type RevokeMandateMutationFn = Apollo.MutationFunction<RevokeMandateMutation, RevokeMandateMutationVariables>;

/**
 * __useRevokeMandateMutation__
 *
 * To run a mutation, you first call `useRevokeMandateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRevokeMandateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [revokeMandateMutation, { data, loading, error }] = useRevokeMandateMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useRevokeMandateMutation(baseOptions?: Apollo.MutationHookOptions<RevokeMandateMutation, RevokeMandateMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RevokeMandateMutation, RevokeMandateMutationVariables>(RevokeMandateDocument, options);
      }
export type RevokeMandateMutationHookResult = ReturnType<typeof useRevokeMandateMutation>;
export type RevokeMandateMutationResult = Apollo.MutationResult<RevokeMandateMutation>;
export type RevokeMandateMutationOptions = Apollo.BaseMutationOptions<RevokeMandateMutation, RevokeMandateMutationVariables>;