import type * as Types from '../../api/types';
import type { DocumentNode } from 'graphql';
import { OrganizationProfileFragmentDoc } from '../fragments/organization_profile.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type CreateOrganizationProfileMutationVariables = Types.Exact<{
  input: Types.CreateOrganizationProfileInput;
}>;

export type CreateOrganizationProfileMutation = { __typename?: 'Mutation', createOrganizationProfile: { __typename?: 'ManagementOrganizationProfile', id: string, name?: string | null, bio?: string | null, avatar?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null, banner?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null } };

export type UpdateOrganizationProfileMutationVariables = Types.Exact<{
  input: Types.UpdateOrganizationProfileInput;
}>;

export type UpdateOrganizationProfileMutation = { __typename?: 'Mutation', updateOrganizationProfile: { __typename?: 'ManagementOrganizationProfile', id: string, name?: string | null, bio?: string | null, avatar?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null, banner?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null } };

export type DeleteOrganizationProfileMutationVariables = Types.Exact<{
  input: Types.DeleteOrganizationProfileInput;
}>;

export type DeleteOrganizationProfileMutation = { __typename?: 'Mutation', deleteOrganizationProfile: string };

export const CreateOrganizationProfileDocument = {"kind":"Document", "definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateOrganizationProfile"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateOrganizationProfileInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createOrganizationProfile"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"OrganizationProfile"}}]}}]}},...OrganizationProfileFragmentDoc.definitions]} as unknown as DocumentNode;
export type CreateOrganizationProfileMutationFn = Apollo.MutationFunction<CreateOrganizationProfileMutation, CreateOrganizationProfileMutationVariables>;

/**
 * __useCreateOrganizationProfileMutation__
 *
 * To run a mutation, you first call `useCreateOrganizationProfileMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateOrganizationProfileMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createOrganizationProfileMutation, { data, loading, error }] = useCreateOrganizationProfileMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateOrganizationProfileMutation(baseOptions?: Apollo.MutationHookOptions<CreateOrganizationProfileMutation, CreateOrganizationProfileMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateOrganizationProfileMutation, CreateOrganizationProfileMutationVariables>(CreateOrganizationProfileDocument, options);
      }
export type CreateOrganizationProfileMutationHookResult = ReturnType<typeof useCreateOrganizationProfileMutation>;
export type CreateOrganizationProfileMutationResult = Apollo.MutationResult<CreateOrganizationProfileMutation>;
export type CreateOrganizationProfileMutationOptions = Apollo.BaseMutationOptions<CreateOrganizationProfileMutation, CreateOrganizationProfileMutationVariables>;
export const UpdateOrganizationProfileDocument = {"kind":"Document", "definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateOrganizationProfile"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateOrganizationProfileInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateOrganizationProfile"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"OrganizationProfile"}}]}}]}},...OrganizationProfileFragmentDoc.definitions]} as unknown as DocumentNode;
export type UpdateOrganizationProfileMutationFn = Apollo.MutationFunction<UpdateOrganizationProfileMutation, UpdateOrganizationProfileMutationVariables>;

/**
 * __useUpdateOrganizationProfileMutation__
 *
 * To run a mutation, you first call `useUpdateOrganizationProfileMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateOrganizationProfileMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateOrganizationProfileMutation, { data, loading, error }] = useUpdateOrganizationProfileMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateOrganizationProfileMutation(baseOptions?: Apollo.MutationHookOptions<UpdateOrganizationProfileMutation, UpdateOrganizationProfileMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateOrganizationProfileMutation, UpdateOrganizationProfileMutationVariables>(UpdateOrganizationProfileDocument, options);
      }
export type UpdateOrganizationProfileMutationHookResult = ReturnType<typeof useUpdateOrganizationProfileMutation>;
export type UpdateOrganizationProfileMutationResult = Apollo.MutationResult<UpdateOrganizationProfileMutation>;
export type UpdateOrganizationProfileMutationOptions = Apollo.BaseMutationOptions<UpdateOrganizationProfileMutation, UpdateOrganizationProfileMutationVariables>;
export const DeleteOrganizationProfileDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteOrganizationProfile"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"DeleteOrganizationProfileInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteOrganizationProfile"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}]}]}}]} as unknown as DocumentNode;
export type DeleteOrganizationProfileMutationFn = Apollo.MutationFunction<DeleteOrganizationProfileMutation, DeleteOrganizationProfileMutationVariables>;

/**
 * __useDeleteOrganizationProfileMutation__
 *
 * To run a mutation, you first call `useDeleteOrganizationProfileMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteOrganizationProfileMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteOrganizationProfileMutation, { data, loading, error }] = useDeleteOrganizationProfileMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useDeleteOrganizationProfileMutation(baseOptions?: Apollo.MutationHookOptions<DeleteOrganizationProfileMutation, DeleteOrganizationProfileMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteOrganizationProfileMutation, DeleteOrganizationProfileMutationVariables>(DeleteOrganizationProfileDocument, options);
      }
export type DeleteOrganizationProfileMutationHookResult = ReturnType<typeof useDeleteOrganizationProfileMutation>;
export type DeleteOrganizationProfileMutationResult = Apollo.MutationResult<DeleteOrganizationProfileMutation>;
export type DeleteOrganizationProfileMutationOptions = Apollo.BaseMutationOptions<DeleteOrganizationProfileMutation, DeleteOrganizationProfileMutationVariables>;