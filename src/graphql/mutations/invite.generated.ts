import type * as Types from '../../api/types';
import type { DocumentNode } from 'graphql';
import { InviteFragmentDoc } from '../fragments/invite.generated';
import { OrganizationFragmentDoc } from '../fragments/organization.generated';
import { RoleSetFragmentDoc } from '../fragments/role_set.generated';
import { ListRoleFragmentDoc } from '../fragments/role.generated';
import { OrganizationProfileFragmentDoc } from '../fragments/organization_profile.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type CreateInviteMutationVariables = Types.Exact<{
  input: Types.CreateInviteInput;
}>;

export type CreateInviteMutation = { __typename?: 'Mutation', createInvite: { __typename?: 'ManagementInvite', id: string, token: string, public: boolean, status: string, inviteUrl: string, createdAt: any, expiresAt?: any | null, createdBy: { __typename?: 'ManagementUser', id: string, username: string, profile: { __typename?: 'ManagementProfile', id: string, avatar?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null } }, createdFor: { __typename?: 'ManagementOrganization', id: string, name?: string | null, slug: string, description?: string | null, requireDeviceAuth?: boolean | null, amIOwner: boolean, amIAdmin: boolean, brandHue?: number | null, brandChroma?: number | null, accessTokenLifetime?: number | null, roles: Array<{ __typename?: 'ManagementRole', id: string, identifier: string, description: string }>, roleSets: Array<{ __typename?: 'ManagementRoleSet', id: string, name: string, roles: Array<{ __typename?: 'ManagementRole', id: string, description: string, identifier: string }> }>, memberships: Array<{ __typename?: 'ManagementMembership', id: string, roles: Array<{ __typename?: 'ManagementRole', identifier: string }>, user: { __typename?: 'ManagementUser', id: string, username: string, email?: string | null, profile: { __typename?: 'ManagementProfile', id: string, avatar?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null } } }>, profile?: { __typename?: 'ManagementOrganizationProfile', id: string, name?: string | null, bio?: string | null, avatar?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null, banner?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null } | null, invites: Array<{ __typename?: 'ManagementInvite', id: string, status: string, expiresAt?: any | null, token: string, inviteUrl: string, acceptedBy?: { __typename?: 'ManagementUser', id: string, username: string, profile: { __typename?: 'ManagementProfile', id: string, avatar?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null } } | null }> }, acceptedBy?: { __typename?: 'ManagementUser', id: string, username: string, profile: { __typename?: 'ManagementProfile', id: string, avatar?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null } } | null } };

export type AcceptInviteMutationVariables = Types.Exact<{
  input: Types.AcceptInviteInput;
}>;

export type AcceptInviteMutation = { __typename?: 'Mutation', acceptInvite: { __typename?: 'ManagementMembership', organization: { __typename?: 'ManagementOrganization', id: string, name?: string | null, slug: string, description?: string | null, requireDeviceAuth?: boolean | null, amIOwner: boolean, amIAdmin: boolean, brandHue?: number | null, brandChroma?: number | null, accessTokenLifetime?: number | null, roles: Array<{ __typename?: 'ManagementRole', id: string, identifier: string, description: string }>, roleSets: Array<{ __typename?: 'ManagementRoleSet', id: string, name: string, roles: Array<{ __typename?: 'ManagementRole', id: string, description: string, identifier: string }> }>, memberships: Array<{ __typename?: 'ManagementMembership', id: string, roles: Array<{ __typename?: 'ManagementRole', identifier: string }>, user: { __typename?: 'ManagementUser', id: string, username: string, email?: string | null, profile: { __typename?: 'ManagementProfile', id: string, avatar?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null } } }>, profile?: { __typename?: 'ManagementOrganizationProfile', id: string, name?: string | null, bio?: string | null, avatar?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null, banner?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null } | null, invites: Array<{ __typename?: 'ManagementInvite', id: string, status: string, expiresAt?: any | null, token: string, inviteUrl: string, acceptedBy?: { __typename?: 'ManagementUser', id: string, username: string, profile: { __typename?: 'ManagementProfile', id: string, avatar?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null } } | null }> } } };

export type DeclineInviteMutationVariables = Types.Exact<{
  input: Types.DeclineInviteInput;
}>;

export type DeclineInviteMutation = { __typename?: 'Mutation', declineInvite: { __typename?: 'ManagementInvite', id: string, token: string, public: boolean, status: string, inviteUrl: string, createdAt: any, expiresAt?: any | null, createdBy: { __typename?: 'ManagementUser', id: string, username: string, profile: { __typename?: 'ManagementProfile', id: string, avatar?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null } }, createdFor: { __typename?: 'ManagementOrganization', id: string, name?: string | null, slug: string, description?: string | null, requireDeviceAuth?: boolean | null, amIOwner: boolean, amIAdmin: boolean, brandHue?: number | null, brandChroma?: number | null, accessTokenLifetime?: number | null, roles: Array<{ __typename?: 'ManagementRole', id: string, identifier: string, description: string }>, roleSets: Array<{ __typename?: 'ManagementRoleSet', id: string, name: string, roles: Array<{ __typename?: 'ManagementRole', id: string, description: string, identifier: string }> }>, memberships: Array<{ __typename?: 'ManagementMembership', id: string, roles: Array<{ __typename?: 'ManagementRole', identifier: string }>, user: { __typename?: 'ManagementUser', id: string, username: string, email?: string | null, profile: { __typename?: 'ManagementProfile', id: string, avatar?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null } } }>, profile?: { __typename?: 'ManagementOrganizationProfile', id: string, name?: string | null, bio?: string | null, avatar?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null, banner?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null } | null, invites: Array<{ __typename?: 'ManagementInvite', id: string, status: string, expiresAt?: any | null, token: string, inviteUrl: string, acceptedBy?: { __typename?: 'ManagementUser', id: string, username: string, profile: { __typename?: 'ManagementProfile', id: string, avatar?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null } } | null }> }, acceptedBy?: { __typename?: 'ManagementUser', id: string, username: string, profile: { __typename?: 'ManagementProfile', id: string, avatar?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null } } | null } };

export type CancelInviteMutationVariables = Types.Exact<{
  input: Types.CancelInviteInput;
}>;

export type CancelInviteMutation = { __typename?: 'Mutation', cancelInvite: { __typename?: 'ManagementInvite', id: string, token: string, public: boolean, status: string, inviteUrl: string, createdAt: any, expiresAt?: any | null, createdBy: { __typename?: 'ManagementUser', id: string, username: string, profile: { __typename?: 'ManagementProfile', id: string, avatar?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null } }, createdFor: { __typename?: 'ManagementOrganization', id: string, name?: string | null, slug: string, description?: string | null, requireDeviceAuth?: boolean | null, amIOwner: boolean, amIAdmin: boolean, brandHue?: number | null, brandChroma?: number | null, accessTokenLifetime?: number | null, roles: Array<{ __typename?: 'ManagementRole', id: string, identifier: string, description: string }>, roleSets: Array<{ __typename?: 'ManagementRoleSet', id: string, name: string, roles: Array<{ __typename?: 'ManagementRole', id: string, description: string, identifier: string }> }>, memberships: Array<{ __typename?: 'ManagementMembership', id: string, roles: Array<{ __typename?: 'ManagementRole', identifier: string }>, user: { __typename?: 'ManagementUser', id: string, username: string, email?: string | null, profile: { __typename?: 'ManagementProfile', id: string, avatar?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null } } }>, profile?: { __typename?: 'ManagementOrganizationProfile', id: string, name?: string | null, bio?: string | null, avatar?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null, banner?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null } | null, invites: Array<{ __typename?: 'ManagementInvite', id: string, status: string, expiresAt?: any | null, token: string, inviteUrl: string, acceptedBy?: { __typename?: 'ManagementUser', id: string, username: string, profile: { __typename?: 'ManagementProfile', id: string, avatar?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null } } | null }> }, acceptedBy?: { __typename?: 'ManagementUser', id: string, username: string, profile: { __typename?: 'ManagementProfile', id: string, avatar?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null } } | null } };

export const CreateInviteDocument = {"kind":"Document", "definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateInvite"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateInviteInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createInvite"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Invite"}}]}}]}},...InviteFragmentDoc.definitions,...OrganizationFragmentDoc.definitions,...RoleSetFragmentDoc.definitions,...ListRoleFragmentDoc.definitions,...OrganizationProfileFragmentDoc.definitions]} as unknown as DocumentNode;
export type CreateInviteMutationFn = Apollo.MutationFunction<CreateInviteMutation, CreateInviteMutationVariables>;

/**
 * __useCreateInviteMutation__
 *
 * To run a mutation, you first call `useCreateInviteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateInviteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createInviteMutation, { data, loading, error }] = useCreateInviteMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateInviteMutation(baseOptions?: Apollo.MutationHookOptions<CreateInviteMutation, CreateInviteMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateInviteMutation, CreateInviteMutationVariables>(CreateInviteDocument, options);
      }
export type CreateInviteMutationHookResult = ReturnType<typeof useCreateInviteMutation>;
export type CreateInviteMutationResult = Apollo.MutationResult<CreateInviteMutation>;
export type CreateInviteMutationOptions = Apollo.BaseMutationOptions<CreateInviteMutation, CreateInviteMutationVariables>;
export const AcceptInviteDocument = {"kind":"Document", "definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AcceptInvite"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"AcceptInviteInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"acceptInvite"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"organization"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Organization"}}]}}]}}]}},...OrganizationFragmentDoc.definitions,...RoleSetFragmentDoc.definitions,...ListRoleFragmentDoc.definitions,...OrganizationProfileFragmentDoc.definitions]} as unknown as DocumentNode;
export type AcceptInviteMutationFn = Apollo.MutationFunction<AcceptInviteMutation, AcceptInviteMutationVariables>;

/**
 * __useAcceptInviteMutation__
 *
 * To run a mutation, you first call `useAcceptInviteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAcceptInviteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [acceptInviteMutation, { data, loading, error }] = useAcceptInviteMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useAcceptInviteMutation(baseOptions?: Apollo.MutationHookOptions<AcceptInviteMutation, AcceptInviteMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AcceptInviteMutation, AcceptInviteMutationVariables>(AcceptInviteDocument, options);
      }
export type AcceptInviteMutationHookResult = ReturnType<typeof useAcceptInviteMutation>;
export type AcceptInviteMutationResult = Apollo.MutationResult<AcceptInviteMutation>;
export type AcceptInviteMutationOptions = Apollo.BaseMutationOptions<AcceptInviteMutation, AcceptInviteMutationVariables>;
export const DeclineInviteDocument = {"kind":"Document", "definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeclineInvite"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"DeclineInviteInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"declineInvite"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Invite"}}]}}]}},...InviteFragmentDoc.definitions,...OrganizationFragmentDoc.definitions,...RoleSetFragmentDoc.definitions,...ListRoleFragmentDoc.definitions,...OrganizationProfileFragmentDoc.definitions]} as unknown as DocumentNode;
export type DeclineInviteMutationFn = Apollo.MutationFunction<DeclineInviteMutation, DeclineInviteMutationVariables>;

/**
 * __useDeclineInviteMutation__
 *
 * To run a mutation, you first call `useDeclineInviteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeclineInviteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [declineInviteMutation, { data, loading, error }] = useDeclineInviteMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useDeclineInviteMutation(baseOptions?: Apollo.MutationHookOptions<DeclineInviteMutation, DeclineInviteMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeclineInviteMutation, DeclineInviteMutationVariables>(DeclineInviteDocument, options);
      }
export type DeclineInviteMutationHookResult = ReturnType<typeof useDeclineInviteMutation>;
export type DeclineInviteMutationResult = Apollo.MutationResult<DeclineInviteMutation>;
export type DeclineInviteMutationOptions = Apollo.BaseMutationOptions<DeclineInviteMutation, DeclineInviteMutationVariables>;
export const CancelInviteDocument = {"kind":"Document", "definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CancelInvite"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CancelInviteInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"cancelInvite"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Invite"}}]}}]}},...InviteFragmentDoc.definitions,...OrganizationFragmentDoc.definitions,...RoleSetFragmentDoc.definitions,...ListRoleFragmentDoc.definitions,...OrganizationProfileFragmentDoc.definitions]} as unknown as DocumentNode;
export type CancelInviteMutationFn = Apollo.MutationFunction<CancelInviteMutation, CancelInviteMutationVariables>;

/**
 * __useCancelInviteMutation__
 *
 * To run a mutation, you first call `useCancelInviteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCancelInviteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [cancelInviteMutation, { data, loading, error }] = useCancelInviteMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCancelInviteMutation(baseOptions?: Apollo.MutationHookOptions<CancelInviteMutation, CancelInviteMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CancelInviteMutation, CancelInviteMutationVariables>(CancelInviteDocument, options);
      }
export type CancelInviteMutationHookResult = ReturnType<typeof useCancelInviteMutation>;
export type CancelInviteMutationResult = Apollo.MutationResult<CancelInviteMutation>;
export type CancelInviteMutationOptions = Apollo.BaseMutationOptions<CancelInviteMutation, CancelInviteMutationVariables>;