import type * as Types from '../../api/types';
import type { DocumentNode } from 'graphql';
import { MembershipFragmentDoc } from '../fragments/membership.generated';
import { RoleRequestFragmentDoc } from '../fragments/role_request.generated';
import { ListRoleFragmentDoc } from '../fragments/role.generated';
import { ListOrganizationFragmentDoc } from '../fragments/organization.generated';
import { RoleSetFragmentDoc } from '../fragments/role_set.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type UpdateMembershipMutationVariables = Types.Exact<{
  input: Types.UpdateMembershipInput;
}>;

export type UpdateMembershipMutation = { __typename?: 'Mutation', updateMembership: { __typename?: 'ManagementMembership', id: string, isOwner: boolean, brandHue?: number | null, brandChroma?: number | null, allowNotifications: boolean, hasNotificationChannel: boolean, roles: Array<{ __typename?: 'ManagementRole', identifier: string, id: string }>, roleRequests: Array<{ __typename?: 'ManagementRoleRequest', id: string, status: string, reason?: string | null, createdAt: any, respondedAt?: any | null, role: { __typename?: 'ManagementRole', id: string, description: string, identifier: string }, membership: { __typename?: 'ManagementMembership', id: string, user: { __typename?: 'ManagementUser', id: string, username: string, profile: { __typename?: 'ManagementProfile', id: string, avatar?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null } } } }>, user: { __typename?: 'ManagementUser', id: string, username: string, email?: string | null, profile: { __typename?: 'ManagementProfile', id: string, avatar?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null } }, organization: { __typename?: 'ManagementOrganization', id: string, name?: string | null, slug: string, brandHue?: number | null, brandChroma?: number | null, amIAdmin: boolean, roles: Array<{ __typename?: 'ManagementRole', id: string, identifier: string, description: string }>, roleSets: Array<{ __typename?: 'ManagementRoleSet', id: string, name: string, roles: Array<{ __typename?: 'ManagementRole', id: string, description: string, identifier: string }> }> } } };

export type DeleteMembershipMutationVariables = Types.Exact<{
  input: Types.DeleteMembershipInput;
}>;

export type DeleteMembershipMutation = { __typename?: 'Mutation', deleteMembership: string };

export type SetMembershipBrandHueMutationVariables = Types.Exact<{
  input: Types.SetMembershipBrandHueInput;
}>;

export type SetMembershipBrandHueMutation = { __typename?: 'Mutation', setMembershipBrandHue: { __typename?: 'ManagementMembership', id: string, isOwner: boolean, brandHue?: number | null, brandChroma?: number | null, allowNotifications: boolean, hasNotificationChannel: boolean, roles: Array<{ __typename?: 'ManagementRole', identifier: string, id: string }>, roleRequests: Array<{ __typename?: 'ManagementRoleRequest', id: string, status: string, reason?: string | null, createdAt: any, respondedAt?: any | null, role: { __typename?: 'ManagementRole', id: string, description: string, identifier: string }, membership: { __typename?: 'ManagementMembership', id: string, user: { __typename?: 'ManagementUser', id: string, username: string, profile: { __typename?: 'ManagementProfile', id: string, avatar?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null } } } }>, user: { __typename?: 'ManagementUser', id: string, username: string, email?: string | null, profile: { __typename?: 'ManagementProfile', id: string, avatar?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null } }, organization: { __typename?: 'ManagementOrganization', id: string, name?: string | null, slug: string, brandHue?: number | null, brandChroma?: number | null, amIAdmin: boolean, roles: Array<{ __typename?: 'ManagementRole', id: string, identifier: string, description: string }>, roleSets: Array<{ __typename?: 'ManagementRoleSet', id: string, name: string, roles: Array<{ __typename?: 'ManagementRole', id: string, description: string, identifier: string }> }> } } };

export const UpdateMembershipDocument = {"kind":"Document", "definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateMembership"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateMembershipInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateMembership"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Membership"}}]}}]}},...MembershipFragmentDoc.definitions,...RoleRequestFragmentDoc.definitions,...ListRoleFragmentDoc.definitions,...ListOrganizationFragmentDoc.definitions,...RoleSetFragmentDoc.definitions]} as unknown as DocumentNode;
export type UpdateMembershipMutationFn = Apollo.MutationFunction<UpdateMembershipMutation, UpdateMembershipMutationVariables>;

/**
 * __useUpdateMembershipMutation__
 *
 * To run a mutation, you first call `useUpdateMembershipMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateMembershipMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateMembershipMutation, { data, loading, error }] = useUpdateMembershipMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateMembershipMutation(baseOptions?: Apollo.MutationHookOptions<UpdateMembershipMutation, UpdateMembershipMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateMembershipMutation, UpdateMembershipMutationVariables>(UpdateMembershipDocument, options);
      }
export type UpdateMembershipMutationHookResult = ReturnType<typeof useUpdateMembershipMutation>;
export type UpdateMembershipMutationResult = Apollo.MutationResult<UpdateMembershipMutation>;
export type UpdateMembershipMutationOptions = Apollo.BaseMutationOptions<UpdateMembershipMutation, UpdateMembershipMutationVariables>;
export const DeleteMembershipDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteMembership"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"DeleteMembershipInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteMembership"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}]}]}}]} as unknown as DocumentNode;
export type DeleteMembershipMutationFn = Apollo.MutationFunction<DeleteMembershipMutation, DeleteMembershipMutationVariables>;

/**
 * __useDeleteMembershipMutation__
 *
 * To run a mutation, you first call `useDeleteMembershipMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteMembershipMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteMembershipMutation, { data, loading, error }] = useDeleteMembershipMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useDeleteMembershipMutation(baseOptions?: Apollo.MutationHookOptions<DeleteMembershipMutation, DeleteMembershipMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteMembershipMutation, DeleteMembershipMutationVariables>(DeleteMembershipDocument, options);
      }
export type DeleteMembershipMutationHookResult = ReturnType<typeof useDeleteMembershipMutation>;
export type DeleteMembershipMutationResult = Apollo.MutationResult<DeleteMembershipMutation>;
export type DeleteMembershipMutationOptions = Apollo.BaseMutationOptions<DeleteMembershipMutation, DeleteMembershipMutationVariables>;
export const SetMembershipBrandHueDocument = {"kind":"Document", "definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"SetMembershipBrandHue"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"SetMembershipBrandHueInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"setMembershipBrandHue"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Membership"}}]}}]}},...MembershipFragmentDoc.definitions,...RoleRequestFragmentDoc.definitions,...ListRoleFragmentDoc.definitions,...ListOrganizationFragmentDoc.definitions,...RoleSetFragmentDoc.definitions]} as unknown as DocumentNode;
export type SetMembershipBrandHueMutationFn = Apollo.MutationFunction<SetMembershipBrandHueMutation, SetMembershipBrandHueMutationVariables>;

/**
 * __useSetMembershipBrandHueMutation__
 *
 * To run a mutation, you first call `useSetMembershipBrandHueMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSetMembershipBrandHueMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [setMembershipBrandHueMutation, { data, loading, error }] = useSetMembershipBrandHueMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSetMembershipBrandHueMutation(baseOptions?: Apollo.MutationHookOptions<SetMembershipBrandHueMutation, SetMembershipBrandHueMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SetMembershipBrandHueMutation, SetMembershipBrandHueMutationVariables>(SetMembershipBrandHueDocument, options);
      }
export type SetMembershipBrandHueMutationHookResult = ReturnType<typeof useSetMembershipBrandHueMutation>;
export type SetMembershipBrandHueMutationResult = Apollo.MutationResult<SetMembershipBrandHueMutation>;
export type SetMembershipBrandHueMutationOptions = Apollo.BaseMutationOptions<SetMembershipBrandHueMutation, SetMembershipBrandHueMutationVariables>;