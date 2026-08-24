import type * as Types from '../../api/types';
import type { DocumentNode } from 'graphql';
import { RoleRequestFragmentDoc } from '../fragments/role_request.generated';
import { ListRoleFragmentDoc } from '../fragments/role.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type RequestRoleMutationVariables = Types.Exact<{
  input: Types.RequestRoleInput;
}>;

export type RequestRoleMutation = { __typename?: 'Mutation', requestRole: { __typename?: 'ManagementRoleRequest', id: string, status: string, reason?: string | null, createdAt: any, respondedAt?: any | null, role: { __typename?: 'ManagementRole', id: string, description: string, identifier: string }, membership: { __typename?: 'ManagementMembership', id: string, user: { __typename?: 'ManagementUser', id: string, username: string, profile: { __typename?: 'ManagementProfile', id: string, avatar?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null } } } } };

export type ApproveRoleRequestMutationVariables = Types.Exact<{
  input: Types.ResolveRoleRequestInput;
}>;

export type ApproveRoleRequestMutation = { __typename?: 'Mutation', approveRoleRequest: { __typename?: 'ManagementRoleRequest', id: string, status: string, reason?: string | null, createdAt: any, respondedAt?: any | null, role: { __typename?: 'ManagementRole', id: string, description: string, identifier: string }, membership: { __typename?: 'ManagementMembership', id: string, user: { __typename?: 'ManagementUser', id: string, username: string, profile: { __typename?: 'ManagementProfile', id: string, avatar?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null } } } } };

export type DeclineRoleRequestMutationVariables = Types.Exact<{
  input: Types.ResolveRoleRequestInput;
}>;

export type DeclineRoleRequestMutation = { __typename?: 'Mutation', declineRoleRequest: { __typename?: 'ManagementRoleRequest', id: string, status: string, reason?: string | null, createdAt: any, respondedAt?: any | null, role: { __typename?: 'ManagementRole', id: string, description: string, identifier: string }, membership: { __typename?: 'ManagementMembership', id: string, user: { __typename?: 'ManagementUser', id: string, username: string, profile: { __typename?: 'ManagementProfile', id: string, avatar?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null } } } } };

export type CancelRoleRequestMutationVariables = Types.Exact<{
  input: Types.ResolveRoleRequestInput;
}>;

export type CancelRoleRequestMutation = { __typename?: 'Mutation', cancelRoleRequest: string };

export const RequestRoleDocument = {"kind":"Document", "definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RequestRole"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"RequestRoleInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"requestRole"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"RoleRequest"}}]}}]}},...RoleRequestFragmentDoc.definitions,...ListRoleFragmentDoc.definitions]} as unknown as DocumentNode;
export type RequestRoleMutationFn = Apollo.MutationFunction<RequestRoleMutation, RequestRoleMutationVariables>;

/**
 * __useRequestRoleMutation__
 *
 * To run a mutation, you first call `useRequestRoleMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRequestRoleMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [requestRoleMutation, { data, loading, error }] = useRequestRoleMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useRequestRoleMutation(baseOptions?: Apollo.MutationHookOptions<RequestRoleMutation, RequestRoleMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RequestRoleMutation, RequestRoleMutationVariables>(RequestRoleDocument, options);
      }
export type RequestRoleMutationHookResult = ReturnType<typeof useRequestRoleMutation>;
export type RequestRoleMutationResult = Apollo.MutationResult<RequestRoleMutation>;
export type RequestRoleMutationOptions = Apollo.BaseMutationOptions<RequestRoleMutation, RequestRoleMutationVariables>;
export const ApproveRoleRequestDocument = {"kind":"Document", "definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ApproveRoleRequest"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ResolveRoleRequestInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"approveRoleRequest"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"RoleRequest"}}]}}]}},...RoleRequestFragmentDoc.definitions,...ListRoleFragmentDoc.definitions]} as unknown as DocumentNode;
export type ApproveRoleRequestMutationFn = Apollo.MutationFunction<ApproveRoleRequestMutation, ApproveRoleRequestMutationVariables>;

/**
 * __useApproveRoleRequestMutation__
 *
 * To run a mutation, you first call `useApproveRoleRequestMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useApproveRoleRequestMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [approveRoleRequestMutation, { data, loading, error }] = useApproveRoleRequestMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useApproveRoleRequestMutation(baseOptions?: Apollo.MutationHookOptions<ApproveRoleRequestMutation, ApproveRoleRequestMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ApproveRoleRequestMutation, ApproveRoleRequestMutationVariables>(ApproveRoleRequestDocument, options);
      }
export type ApproveRoleRequestMutationHookResult = ReturnType<typeof useApproveRoleRequestMutation>;
export type ApproveRoleRequestMutationResult = Apollo.MutationResult<ApproveRoleRequestMutation>;
export type ApproveRoleRequestMutationOptions = Apollo.BaseMutationOptions<ApproveRoleRequestMutation, ApproveRoleRequestMutationVariables>;
export const DeclineRoleRequestDocument = {"kind":"Document", "definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeclineRoleRequest"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ResolveRoleRequestInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"declineRoleRequest"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"RoleRequest"}}]}}]}},...RoleRequestFragmentDoc.definitions,...ListRoleFragmentDoc.definitions]} as unknown as DocumentNode;
export type DeclineRoleRequestMutationFn = Apollo.MutationFunction<DeclineRoleRequestMutation, DeclineRoleRequestMutationVariables>;

/**
 * __useDeclineRoleRequestMutation__
 *
 * To run a mutation, you first call `useDeclineRoleRequestMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeclineRoleRequestMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [declineRoleRequestMutation, { data, loading, error }] = useDeclineRoleRequestMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useDeclineRoleRequestMutation(baseOptions?: Apollo.MutationHookOptions<DeclineRoleRequestMutation, DeclineRoleRequestMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeclineRoleRequestMutation, DeclineRoleRequestMutationVariables>(DeclineRoleRequestDocument, options);
      }
export type DeclineRoleRequestMutationHookResult = ReturnType<typeof useDeclineRoleRequestMutation>;
export type DeclineRoleRequestMutationResult = Apollo.MutationResult<DeclineRoleRequestMutation>;
export type DeclineRoleRequestMutationOptions = Apollo.BaseMutationOptions<DeclineRoleRequestMutation, DeclineRoleRequestMutationVariables>;
export const CancelRoleRequestDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CancelRoleRequest"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ResolveRoleRequestInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"cancelRoleRequest"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}]}]}}]} as unknown as DocumentNode;
export type CancelRoleRequestMutationFn = Apollo.MutationFunction<CancelRoleRequestMutation, CancelRoleRequestMutationVariables>;

/**
 * __useCancelRoleRequestMutation__
 *
 * To run a mutation, you first call `useCancelRoleRequestMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCancelRoleRequestMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [cancelRoleRequestMutation, { data, loading, error }] = useCancelRoleRequestMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCancelRoleRequestMutation(baseOptions?: Apollo.MutationHookOptions<CancelRoleRequestMutation, CancelRoleRequestMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CancelRoleRequestMutation, CancelRoleRequestMutationVariables>(CancelRoleRequestDocument, options);
      }
export type CancelRoleRequestMutationHookResult = ReturnType<typeof useCancelRoleRequestMutation>;
export type CancelRoleRequestMutationResult = Apollo.MutationResult<CancelRoleRequestMutation>;
export type CancelRoleRequestMutationOptions = Apollo.BaseMutationOptions<CancelRoleRequestMutation, CancelRoleRequestMutationVariables>;