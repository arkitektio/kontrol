import type * as Types from '../../api/types';
import type { DocumentNode } from 'graphql';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type RevokeClientSessionsMutationVariables = Types.Exact<{
  input: Types.RevokeClientSessionsInput;
}>;

export type RevokeClientSessionsMutation = { __typename?: 'Mutation', revokeClientSessions: { __typename?: 'ManagementClient', id: string } };

export type RevokeOrganizationSessionsMutationVariables = Types.Exact<{
  input: Types.RevokeOrganizationSessionsInput;
}>;

export type RevokeOrganizationSessionsMutation = { __typename?: 'Mutation', revokeOrganizationSessions: number };

export const RevokeClientSessionsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RevokeClientSessions"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"RevokeClientSessionsInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"revokeClientSessions"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode;
export type RevokeClientSessionsMutationFn = Apollo.MutationFunction<RevokeClientSessionsMutation, RevokeClientSessionsMutationVariables>;

/**
 * __useRevokeClientSessionsMutation__
 *
 * To run a mutation, you first call `useRevokeClientSessionsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRevokeClientSessionsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [revokeClientSessionsMutation, { data, loading, error }] = useRevokeClientSessionsMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useRevokeClientSessionsMutation(baseOptions?: Apollo.MutationHookOptions<RevokeClientSessionsMutation, RevokeClientSessionsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RevokeClientSessionsMutation, RevokeClientSessionsMutationVariables>(RevokeClientSessionsDocument, options);
      }
export type RevokeClientSessionsMutationHookResult = ReturnType<typeof useRevokeClientSessionsMutation>;
export type RevokeClientSessionsMutationResult = Apollo.MutationResult<RevokeClientSessionsMutation>;
export type RevokeClientSessionsMutationOptions = Apollo.BaseMutationOptions<RevokeClientSessionsMutation, RevokeClientSessionsMutationVariables>;
export const RevokeOrganizationSessionsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RevokeOrganizationSessions"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"RevokeOrganizationSessionsInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"revokeOrganizationSessions"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}]}]}}]} as unknown as DocumentNode;
export type RevokeOrganizationSessionsMutationFn = Apollo.MutationFunction<RevokeOrganizationSessionsMutation, RevokeOrganizationSessionsMutationVariables>;

/**
 * __useRevokeOrganizationSessionsMutation__
 *
 * To run a mutation, you first call `useRevokeOrganizationSessionsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRevokeOrganizationSessionsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [revokeOrganizationSessionsMutation, { data, loading, error }] = useRevokeOrganizationSessionsMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useRevokeOrganizationSessionsMutation(baseOptions?: Apollo.MutationHookOptions<RevokeOrganizationSessionsMutation, RevokeOrganizationSessionsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RevokeOrganizationSessionsMutation, RevokeOrganizationSessionsMutationVariables>(RevokeOrganizationSessionsDocument, options);
      }
export type RevokeOrganizationSessionsMutationHookResult = ReturnType<typeof useRevokeOrganizationSessionsMutation>;
export type RevokeOrganizationSessionsMutationResult = Apollo.MutationResult<RevokeOrganizationSessionsMutation>;
export type RevokeOrganizationSessionsMutationOptions = Apollo.BaseMutationOptions<RevokeOrganizationSessionsMutation, RevokeOrganizationSessionsMutationVariables>;