import type * as Types from '../../api/types';
import type { DocumentNode } from 'graphql';
import { OrganizationFragmentDoc } from '../fragments/organization.generated';
import { RoleSetFragmentDoc } from '../fragments/role_set.generated';
import { ListRoleFragmentDoc } from '../fragments/role.generated';
import { OrganizationProfileFragmentDoc } from '../fragments/organization_profile.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type CreateOrganizationMutationVariables = Types.Exact<{
  input: Types.CreateOrganizationInput;
}>;

export type CreateOrganizationMutation = { __typename?: 'Mutation', createOrganization: { __typename?: 'ManagementOrganization', id: string, name?: string | null, slug: string, amIOwner: boolean, brandHue?: number | null, brandChroma?: number | null, accessTokenLifetime?: number | null, roles: Array<{ __typename?: 'ManagementRole', id: string, identifier: string, description: string }>, roleSets: Array<{ __typename?: 'ManagementRoleSet', id: string, name: string, roles: Array<{ __typename?: 'ManagementRole', id: string, description: string, identifier: string }> }>, memberships: Array<{ __typename?: 'ManagementMembership', id: string, roles: Array<{ __typename?: 'ManagementRole', identifier: string }>, user: { __typename?: 'ManagementUser', id: string, username: string, email?: string | null, profile: { __typename?: 'ManagementProfile', id: string, avatar?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null } } }>, profile?: { __typename?: 'ManagementOrganizationProfile', id: string, name?: string | null, bio?: string | null, avatar?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null, banner?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null } | null, invites: Array<{ __typename?: 'ManagementInvite', id: string, status: string, expiresAt?: any | null, token: string, inviteUrl: string, acceptedBy?: { __typename?: 'ManagementUser', id: string, username: string, profile: { __typename?: 'ManagementProfile', id: string, avatar?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null } } | null }> } };

export type UpdateOrganizationMutationVariables = Types.Exact<{
  input: Types.UpdateOrganizationInput;
}>;

export type UpdateOrganizationMutation = { __typename?: 'Mutation', updateOrganization: { __typename?: 'ManagementOrganization', id: string, name?: string | null, slug: string, amIOwner: boolean, brandHue?: number | null, brandChroma?: number | null, accessTokenLifetime?: number | null, roles: Array<{ __typename?: 'ManagementRole', id: string, identifier: string, description: string }>, roleSets: Array<{ __typename?: 'ManagementRoleSet', id: string, name: string, roles: Array<{ __typename?: 'ManagementRole', id: string, description: string, identifier: string }> }>, memberships: Array<{ __typename?: 'ManagementMembership', id: string, roles: Array<{ __typename?: 'ManagementRole', identifier: string }>, user: { __typename?: 'ManagementUser', id: string, username: string, email?: string | null, profile: { __typename?: 'ManagementProfile', id: string, avatar?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null } } }>, profile?: { __typename?: 'ManagementOrganizationProfile', id: string, name?: string | null, bio?: string | null, avatar?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null, banner?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null } | null, invites: Array<{ __typename?: 'ManagementInvite', id: string, status: string, expiresAt?: any | null, token: string, inviteUrl: string, acceptedBy?: { __typename?: 'ManagementUser', id: string, username: string, profile: { __typename?: 'ManagementProfile', id: string, avatar?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null } } | null }> } };

export type DeleteOrganizationMutationVariables = Types.Exact<{
  input: Types.DeleteOrganizationInput;
}>;

export type DeleteOrganizationMutation = { __typename?: 'Mutation', deleteOrganization: string };

export type ChangeOrganizationOwnerMutationVariables = Types.Exact<{
  input: Types.ChangeOrganizationOwnerInput;
}>;

export type ChangeOrganizationOwnerMutation = { __typename?: 'Mutation', changeOrganizationOwner: { __typename?: 'ManagementOrganization', id: string, name?: string | null, slug: string, amIOwner: boolean, brandHue?: number | null, brandChroma?: number | null, accessTokenLifetime?: number | null, roles: Array<{ __typename?: 'ManagementRole', id: string, identifier: string, description: string }>, roleSets: Array<{ __typename?: 'ManagementRoleSet', id: string, name: string, roles: Array<{ __typename?: 'ManagementRole', id: string, description: string, identifier: string }> }>, memberships: Array<{ __typename?: 'ManagementMembership', id: string, roles: Array<{ __typename?: 'ManagementRole', identifier: string }>, user: { __typename?: 'ManagementUser', id: string, username: string, email?: string | null, profile: { __typename?: 'ManagementProfile', id: string, avatar?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null } } }>, profile?: { __typename?: 'ManagementOrganizationProfile', id: string, name?: string | null, bio?: string | null, avatar?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null, banner?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null } | null, invites: Array<{ __typename?: 'ManagementInvite', id: string, status: string, expiresAt?: any | null, token: string, inviteUrl: string, acceptedBy?: { __typename?: 'ManagementUser', id: string, username: string, profile: { __typename?: 'ManagementProfile', id: string, avatar?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null } } | null }> } };

export const CreateOrganizationDocument = {"kind":"Document", "definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateOrganization"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateOrganizationInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createOrganization"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Organization"}}]}}]}},...OrganizationFragmentDoc.definitions,...RoleSetFragmentDoc.definitions,...ListRoleFragmentDoc.definitions,...OrganizationProfileFragmentDoc.definitions]} as unknown as DocumentNode;
export type CreateOrganizationMutationFn = Apollo.MutationFunction<CreateOrganizationMutation, CreateOrganizationMutationVariables>;

/**
 * __useCreateOrganizationMutation__
 *
 * To run a mutation, you first call `useCreateOrganizationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateOrganizationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createOrganizationMutation, { data, loading, error }] = useCreateOrganizationMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateOrganizationMutation(baseOptions?: Apollo.MutationHookOptions<CreateOrganizationMutation, CreateOrganizationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateOrganizationMutation, CreateOrganizationMutationVariables>(CreateOrganizationDocument, options);
      }
export type CreateOrganizationMutationHookResult = ReturnType<typeof useCreateOrganizationMutation>;
export type CreateOrganizationMutationResult = Apollo.MutationResult<CreateOrganizationMutation>;
export type CreateOrganizationMutationOptions = Apollo.BaseMutationOptions<CreateOrganizationMutation, CreateOrganizationMutationVariables>;
export const UpdateOrganizationDocument = {"kind":"Document", "definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateOrganization"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateOrganizationInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateOrganization"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Organization"}}]}}]}},...OrganizationFragmentDoc.definitions,...RoleSetFragmentDoc.definitions,...ListRoleFragmentDoc.definitions,...OrganizationProfileFragmentDoc.definitions]} as unknown as DocumentNode;
export type UpdateOrganizationMutationFn = Apollo.MutationFunction<UpdateOrganizationMutation, UpdateOrganizationMutationVariables>;

/**
 * __useUpdateOrganizationMutation__
 *
 * To run a mutation, you first call `useUpdateOrganizationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateOrganizationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateOrganizationMutation, { data, loading, error }] = useUpdateOrganizationMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateOrganizationMutation(baseOptions?: Apollo.MutationHookOptions<UpdateOrganizationMutation, UpdateOrganizationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateOrganizationMutation, UpdateOrganizationMutationVariables>(UpdateOrganizationDocument, options);
      }
export type UpdateOrganizationMutationHookResult = ReturnType<typeof useUpdateOrganizationMutation>;
export type UpdateOrganizationMutationResult = Apollo.MutationResult<UpdateOrganizationMutation>;
export type UpdateOrganizationMutationOptions = Apollo.BaseMutationOptions<UpdateOrganizationMutation, UpdateOrganizationMutationVariables>;
export const DeleteOrganizationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteOrganization"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"DeleteOrganizationInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteOrganization"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}]}]}}]} as unknown as DocumentNode;
export type DeleteOrganizationMutationFn = Apollo.MutationFunction<DeleteOrganizationMutation, DeleteOrganizationMutationVariables>;

/**
 * __useDeleteOrganizationMutation__
 *
 * To run a mutation, you first call `useDeleteOrganizationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteOrganizationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteOrganizationMutation, { data, loading, error }] = useDeleteOrganizationMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useDeleteOrganizationMutation(baseOptions?: Apollo.MutationHookOptions<DeleteOrganizationMutation, DeleteOrganizationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteOrganizationMutation, DeleteOrganizationMutationVariables>(DeleteOrganizationDocument, options);
      }
export type DeleteOrganizationMutationHookResult = ReturnType<typeof useDeleteOrganizationMutation>;
export type DeleteOrganizationMutationResult = Apollo.MutationResult<DeleteOrganizationMutation>;
export type DeleteOrganizationMutationOptions = Apollo.BaseMutationOptions<DeleteOrganizationMutation, DeleteOrganizationMutationVariables>;
export const ChangeOrganizationOwnerDocument = {"kind":"Document", "definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ChangeOrganizationOwner"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ChangeOrganizationOwnerInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"changeOrganizationOwner"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Organization"}}]}}]}},...OrganizationFragmentDoc.definitions,...RoleSetFragmentDoc.definitions,...ListRoleFragmentDoc.definitions,...OrganizationProfileFragmentDoc.definitions]} as unknown as DocumentNode;
export type ChangeOrganizationOwnerMutationFn = Apollo.MutationFunction<ChangeOrganizationOwnerMutation, ChangeOrganizationOwnerMutationVariables>;

/**
 * __useChangeOrganizationOwnerMutation__
 *
 * To run a mutation, you first call `useChangeOrganizationOwnerMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useChangeOrganizationOwnerMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [changeOrganizationOwnerMutation, { data, loading, error }] = useChangeOrganizationOwnerMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useChangeOrganizationOwnerMutation(baseOptions?: Apollo.MutationHookOptions<ChangeOrganizationOwnerMutation, ChangeOrganizationOwnerMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ChangeOrganizationOwnerMutation, ChangeOrganizationOwnerMutationVariables>(ChangeOrganizationOwnerDocument, options);
      }
export type ChangeOrganizationOwnerMutationHookResult = ReturnType<typeof useChangeOrganizationOwnerMutation>;
export type ChangeOrganizationOwnerMutationResult = Apollo.MutationResult<ChangeOrganizationOwnerMutation>;
export type ChangeOrganizationOwnerMutationOptions = Apollo.BaseMutationOptions<ChangeOrganizationOwnerMutation, ChangeOrganizationOwnerMutationVariables>;