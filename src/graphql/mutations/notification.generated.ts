import type * as Types from '../../api/types';
import type { DocumentNode } from 'graphql';
import { MembershipFragmentDoc } from '../fragments/membership.generated';
import { RoleRequestFragmentDoc } from '../fragments/role_request.generated';
import { ListRoleFragmentDoc } from '../fragments/role.generated';
import { ListOrganizationFragmentDoc } from '../fragments/organization.generated';
import { RoleSetFragmentDoc } from '../fragments/role_set.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type SetMembershipNotificationsMutationVariables = Types.Exact<{
  input: Types.SetMembershipNotificationsInput;
}>;

export type SetMembershipNotificationsMutation = { __typename?: 'Mutation', setMembershipNotifications: { __typename?: 'ManagementMembership', id: string, brandHue?: number | null, brandChroma?: number | null, allowNotifications: boolean, hasNotificationChannel: boolean, roles: Array<{ __typename?: 'ManagementRole', identifier: string, id: string }>, roleRequests: Array<{ __typename?: 'ManagementRoleRequest', id: string, status: string, reason?: string | null, createdAt: any, respondedAt?: any | null, role: { __typename?: 'ManagementRole', id: string, description: string, identifier: string }, membership: { __typename?: 'ManagementMembership', id: string, user: { __typename?: 'ManagementUser', id: string, username: string, profile: { __typename?: 'ManagementProfile', id: string, avatar?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null } } } }>, user: { __typename?: 'ManagementUser', id: string, username: string, email?: string | null, profile: { __typename?: 'ManagementProfile', id: string, avatar?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null } }, organization: { __typename?: 'ManagementOrganization', id: string, name?: string | null, slug: string, brandHue?: number | null, brandChroma?: number | null, amIAdmin: boolean, roles: Array<{ __typename?: 'ManagementRole', id: string, identifier: string, description: string }>, roleSets: Array<{ __typename?: 'ManagementRoleSet', id: string, name: string, roles: Array<{ __typename?: 'ManagementRole', id: string, description: string, identifier: string }> }> } } };

export type NotifyMemberMutationVariables = Types.Exact<{
  input: Types.NotifyMemberInput;
}>;

export type NotifyMemberMutation = { __typename?: 'Mutation', notifyMember: { __typename?: 'ManagementNotificationResult', delivered: number, attempted: number, membership: { __typename?: 'ManagementMembership', id: string, brandHue?: number | null, brandChroma?: number | null, allowNotifications: boolean, hasNotificationChannel: boolean, roles: Array<{ __typename?: 'ManagementRole', identifier: string, id: string }>, roleRequests: Array<{ __typename?: 'ManagementRoleRequest', id: string, status: string, reason?: string | null, createdAt: any, respondedAt?: any | null, role: { __typename?: 'ManagementRole', id: string, description: string, identifier: string }, membership: { __typename?: 'ManagementMembership', id: string, user: { __typename?: 'ManagementUser', id: string, username: string, profile: { __typename?: 'ManagementProfile', id: string, avatar?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null } } } }>, user: { __typename?: 'ManagementUser', id: string, username: string, email?: string | null, profile: { __typename?: 'ManagementProfile', id: string, avatar?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null } }, organization: { __typename?: 'ManagementOrganization', id: string, name?: string | null, slug: string, brandHue?: number | null, brandChroma?: number | null, amIAdmin: boolean, roles: Array<{ __typename?: 'ManagementRole', id: string, identifier: string, description: string }>, roleSets: Array<{ __typename?: 'ManagementRoleSet', id: string, name: string, roles: Array<{ __typename?: 'ManagementRole', id: string, description: string, identifier: string }> }> } } } };

export const SetMembershipNotificationsDocument = {"kind":"Document", "definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"SetMembershipNotifications"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"SetMembershipNotificationsInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"setMembershipNotifications"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Membership"}}]}}]}},...MembershipFragmentDoc.definitions,...RoleRequestFragmentDoc.definitions,...ListRoleFragmentDoc.definitions,...ListOrganizationFragmentDoc.definitions,...RoleSetFragmentDoc.definitions]} as unknown as DocumentNode;
export type SetMembershipNotificationsMutationFn = Apollo.MutationFunction<SetMembershipNotificationsMutation, SetMembershipNotificationsMutationVariables>;

/**
 * __useSetMembershipNotificationsMutation__
 *
 * To run a mutation, you first call `useSetMembershipNotificationsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSetMembershipNotificationsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [setMembershipNotificationsMutation, { data, loading, error }] = useSetMembershipNotificationsMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSetMembershipNotificationsMutation(baseOptions?: Apollo.MutationHookOptions<SetMembershipNotificationsMutation, SetMembershipNotificationsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SetMembershipNotificationsMutation, SetMembershipNotificationsMutationVariables>(SetMembershipNotificationsDocument, options);
      }
export type SetMembershipNotificationsMutationHookResult = ReturnType<typeof useSetMembershipNotificationsMutation>;
export type SetMembershipNotificationsMutationResult = Apollo.MutationResult<SetMembershipNotificationsMutation>;
export type SetMembershipNotificationsMutationOptions = Apollo.BaseMutationOptions<SetMembershipNotificationsMutation, SetMembershipNotificationsMutationVariables>;
export const NotifyMemberDocument = {"kind":"Document", "definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"NotifyMember"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"NotifyMemberInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"notifyMember"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"delivered"}},{"kind":"Field","name":{"kind":"Name","value":"attempted"}},{"kind":"Field","name":{"kind":"Name","value":"membership"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Membership"}}]}}]}}]}},...MembershipFragmentDoc.definitions,...RoleRequestFragmentDoc.definitions,...ListRoleFragmentDoc.definitions,...ListOrganizationFragmentDoc.definitions,...RoleSetFragmentDoc.definitions]} as unknown as DocumentNode;
export type NotifyMemberMutationFn = Apollo.MutationFunction<NotifyMemberMutation, NotifyMemberMutationVariables>;

/**
 * __useNotifyMemberMutation__
 *
 * To run a mutation, you first call `useNotifyMemberMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useNotifyMemberMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [notifyMemberMutation, { data, loading, error }] = useNotifyMemberMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useNotifyMemberMutation(baseOptions?: Apollo.MutationHookOptions<NotifyMemberMutation, NotifyMemberMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<NotifyMemberMutation, NotifyMemberMutationVariables>(NotifyMemberDocument, options);
      }
export type NotifyMemberMutationHookResult = ReturnType<typeof useNotifyMemberMutation>;
export type NotifyMemberMutationResult = Apollo.MutationResult<NotifyMemberMutation>;
export type NotifyMemberMutationOptions = Apollo.BaseMutationOptions<NotifyMemberMutation, NotifyMemberMutationVariables>;