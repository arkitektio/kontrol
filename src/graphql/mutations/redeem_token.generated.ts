import type * as Types from '../../api/types';
import type { DocumentNode } from 'graphql';
import { DetailRedeemTokenFragmentDoc, ListRedeemTokenFragmentDoc } from '../fragments/redeem_token.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type CreateRedeemTokenMutationVariables = Types.Exact<{
  input: Types.CreateRedeemTokenInput;
}>;

export type CreateRedeemTokenMutation = { __typename?: 'Mutation', createRedeemToken: { __typename?: 'ManagementRedeemToken', id: string, token?: string | null, createdAt: any, expiresAt?: any | null, hub: { __typename?: 'ManagementHub', id: string, name: string, organization: { __typename?: 'ManagementOrganization', id: string, name?: string | null } }, user: { __typename?: 'ManagementUser', id: string, email?: string | null }, client?: { __typename?: 'ManagementClient', id: string, release?: { __typename?: 'ManagementRelease', version: any, app: { __typename?: 'ManagementApp', identifier: any } } | null } | null } };

export const CreateRedeemTokenDocument = {"kind":"Document", "definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateRedeemToken"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateRedeemTokenInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createRedeemToken"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"DetailRedeemToken"}}]}}]}},...DetailRedeemTokenFragmentDoc.definitions,...ListRedeemTokenFragmentDoc.definitions]} as unknown as DocumentNode;
export type CreateRedeemTokenMutationFn = Apollo.MutationFunction<CreateRedeemTokenMutation, CreateRedeemTokenMutationVariables>;

/**
 * __useCreateRedeemTokenMutation__
 *
 * To run a mutation, you first call `useCreateRedeemTokenMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateRedeemTokenMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createRedeemTokenMutation, { data, loading, error }] = useCreateRedeemTokenMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateRedeemTokenMutation(baseOptions?: Apollo.MutationHookOptions<CreateRedeemTokenMutation, CreateRedeemTokenMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateRedeemTokenMutation, CreateRedeemTokenMutationVariables>(CreateRedeemTokenDocument, options);
      }
export type CreateRedeemTokenMutationHookResult = ReturnType<typeof useCreateRedeemTokenMutation>;
export type CreateRedeemTokenMutationResult = Apollo.MutationResult<CreateRedeemTokenMutation>;
export type CreateRedeemTokenMutationOptions = Apollo.BaseMutationOptions<CreateRedeemTokenMutation, CreateRedeemTokenMutationVariables>;