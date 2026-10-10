import type * as Types from '../../api/types';
import type { DocumentNode } from 'graphql';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type RequestMembershipMutationVariables = Types.Exact<{
  input: Types.RequestMembershipInput;
}>;

export type RequestMembershipMutation = { __typename?: 'Mutation', requestMembership: boolean };

export type ApproveMembershipRequestMutationVariables = Types.Exact<{
  input: Types.ApproveMembershipRequestInput;
}>;

export type ApproveMembershipRequestMutation = { __typename?: 'Mutation', approveMembershipRequest: { __typename?: 'ManagementMembership', id: string } };

export type DeclineMembershipRequestMutationVariables = Types.Exact<{
  input: Types.DeclineMembershipRequestInput;
}>;

export type DeclineMembershipRequestMutation = { __typename?: 'Mutation', declineMembershipRequest: { __typename?: 'ManagementMembershipRequest', id: string, status: string } };

export const RequestMembershipDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RequestMembership"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"RequestMembershipInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"requestMembership"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}]}]}}]} as unknown as DocumentNode;
export type RequestMembershipMutationFn = Apollo.MutationFunction<RequestMembershipMutation, RequestMembershipMutationVariables>;

/**
 * __useRequestMembershipMutation__
 *
 * To run a mutation, you first call `useRequestMembershipMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRequestMembershipMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [requestMembershipMutation, { data, loading, error }] = useRequestMembershipMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useRequestMembershipMutation(baseOptions?: Apollo.MutationHookOptions<RequestMembershipMutation, RequestMembershipMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RequestMembershipMutation, RequestMembershipMutationVariables>(RequestMembershipDocument, options);
      }
export type RequestMembershipMutationHookResult = ReturnType<typeof useRequestMembershipMutation>;
export type RequestMembershipMutationResult = Apollo.MutationResult<RequestMembershipMutation>;
export type RequestMembershipMutationOptions = Apollo.BaseMutationOptions<RequestMembershipMutation, RequestMembershipMutationVariables>;
export const ApproveMembershipRequestDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ApproveMembershipRequest"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ApproveMembershipRequestInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"approveMembershipRequest"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode;
export type ApproveMembershipRequestMutationFn = Apollo.MutationFunction<ApproveMembershipRequestMutation, ApproveMembershipRequestMutationVariables>;

/**
 * __useApproveMembershipRequestMutation__
 *
 * To run a mutation, you first call `useApproveMembershipRequestMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useApproveMembershipRequestMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [approveMembershipRequestMutation, { data, loading, error }] = useApproveMembershipRequestMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useApproveMembershipRequestMutation(baseOptions?: Apollo.MutationHookOptions<ApproveMembershipRequestMutation, ApproveMembershipRequestMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ApproveMembershipRequestMutation, ApproveMembershipRequestMutationVariables>(ApproveMembershipRequestDocument, options);
      }
export type ApproveMembershipRequestMutationHookResult = ReturnType<typeof useApproveMembershipRequestMutation>;
export type ApproveMembershipRequestMutationResult = Apollo.MutationResult<ApproveMembershipRequestMutation>;
export type ApproveMembershipRequestMutationOptions = Apollo.BaseMutationOptions<ApproveMembershipRequestMutation, ApproveMembershipRequestMutationVariables>;
export const DeclineMembershipRequestDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeclineMembershipRequest"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"DeclineMembershipRequestInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"declineMembershipRequest"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]}}]} as unknown as DocumentNode;
export type DeclineMembershipRequestMutationFn = Apollo.MutationFunction<DeclineMembershipRequestMutation, DeclineMembershipRequestMutationVariables>;

/**
 * __useDeclineMembershipRequestMutation__
 *
 * To run a mutation, you first call `useDeclineMembershipRequestMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeclineMembershipRequestMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [declineMembershipRequestMutation, { data, loading, error }] = useDeclineMembershipRequestMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useDeclineMembershipRequestMutation(baseOptions?: Apollo.MutationHookOptions<DeclineMembershipRequestMutation, DeclineMembershipRequestMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeclineMembershipRequestMutation, DeclineMembershipRequestMutationVariables>(DeclineMembershipRequestDocument, options);
      }
export type DeclineMembershipRequestMutationHookResult = ReturnType<typeof useDeclineMembershipRequestMutation>;
export type DeclineMembershipRequestMutationResult = Apollo.MutationResult<DeclineMembershipRequestMutation>;
export type DeclineMembershipRequestMutationOptions = Apollo.BaseMutationOptions<DeclineMembershipRequestMutation, DeclineMembershipRequestMutationVariables>;