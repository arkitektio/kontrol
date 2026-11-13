import type * as Types from '../../api/types';
import type { DocumentNode } from 'graphql';
import { DetailBugReportFragmentDoc, ListBugReportFragmentDoc } from '../fragments/bug_report.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type ResolveBugReportMutationVariables = Types.Exact<{
  id: Types.Scalars['ID']['input'];
  note?: Types.InputMaybe<Types.Scalars['String']['input']>;
}>;

export type ResolveBugReportMutation = { __typename?: 'Mutation', resolveBugReport: { __typename?: 'ManagementBugReport', description: string, expected?: string | null, platform?: string | null, diagnostics: any, screenshot?: string | null, resolvedAt?: any | null, resolutionNote?: string | null, forwardedUrl?: string | null, id: string, title: string, route?: string | null, appVersion?: string | null, createdAt: any, isResolved: boolean, forwardedAt?: any | null, hasScreenshot: boolean, resolvedBy?: { __typename?: 'ManagementUser', id: string, username: string } | null, forwardedBy?: { __typename?: 'ManagementUser', id: string, username: string } | null, client?: { __typename?: 'ManagementClient', id: string, issueUrl?: string | null, device?: { __typename?: 'ManagementDevice', id: string, name?: string | null } | null } | null, organization: { __typename?: 'ManagementOrganization', id: string }, reporter?: { __typename?: 'ManagementUser', id: string, username: string } | null, release?: { __typename?: 'ManagementRelease', id: string, version: any, app: { __typename?: 'ManagementApp', id: string, identifier: any } } | null } };

export type UnresolveBugReportMutationVariables = Types.Exact<{
  id: Types.Scalars['ID']['input'];
}>;

export type UnresolveBugReportMutation = { __typename?: 'Mutation', unresolveBugReport: { __typename?: 'ManagementBugReport', description: string, expected?: string | null, platform?: string | null, diagnostics: any, screenshot?: string | null, resolvedAt?: any | null, resolutionNote?: string | null, forwardedUrl?: string | null, id: string, title: string, route?: string | null, appVersion?: string | null, createdAt: any, isResolved: boolean, forwardedAt?: any | null, hasScreenshot: boolean, resolvedBy?: { __typename?: 'ManagementUser', id: string, username: string } | null, forwardedBy?: { __typename?: 'ManagementUser', id: string, username: string } | null, client?: { __typename?: 'ManagementClient', id: string, issueUrl?: string | null, device?: { __typename?: 'ManagementDevice', id: string, name?: string | null } | null } | null, organization: { __typename?: 'ManagementOrganization', id: string }, reporter?: { __typename?: 'ManagementUser', id: string, username: string } | null, release?: { __typename?: 'ManagementRelease', id: string, version: any, app: { __typename?: 'ManagementApp', id: string, identifier: any } } | null } };

export type ForwardBugReportMutationVariables = Types.Exact<{
  id: Types.Scalars['ID']['input'];
  url?: Types.InputMaybe<Types.Scalars['String']['input']>;
  forwarded?: Types.Scalars['Boolean']['input'];
}>;

export type ForwardBugReportMutation = { __typename?: 'Mutation', forwardBugReport: { __typename?: 'ManagementBugReport', description: string, expected?: string | null, platform?: string | null, diagnostics: any, screenshot?: string | null, resolvedAt?: any | null, resolutionNote?: string | null, forwardedUrl?: string | null, id: string, title: string, route?: string | null, appVersion?: string | null, createdAt: any, isResolved: boolean, forwardedAt?: any | null, hasScreenshot: boolean, resolvedBy?: { __typename?: 'ManagementUser', id: string, username: string } | null, forwardedBy?: { __typename?: 'ManagementUser', id: string, username: string } | null, client?: { __typename?: 'ManagementClient', id: string, issueUrl?: string | null, device?: { __typename?: 'ManagementDevice', id: string, name?: string | null } | null } | null, organization: { __typename?: 'ManagementOrganization', id: string }, reporter?: { __typename?: 'ManagementUser', id: string, username: string } | null, release?: { __typename?: 'ManagementRelease', id: string, version: any, app: { __typename?: 'ManagementApp', id: string, identifier: any } } | null } };

export type DeleteBugReportMutationVariables = Types.Exact<{
  id: Types.Scalars['ID']['input'];
}>;

export type DeleteBugReportMutation = { __typename?: 'Mutation', deleteBugReport: string };

export const ResolveBugReportDocument = {"kind":"Document", "definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ResolveBugReport"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"note"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"resolveBugReport"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"note"},"value":{"kind":"Variable","name":{"kind":"Name","value":"note"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"DetailBugReport"}}]}}]}},...DetailBugReportFragmentDoc.definitions,...ListBugReportFragmentDoc.definitions]} as unknown as DocumentNode;
export type ResolveBugReportMutationFn = Apollo.MutationFunction<ResolveBugReportMutation, ResolveBugReportMutationVariables>;

/**
 * __useResolveBugReportMutation__
 *
 * To run a mutation, you first call `useResolveBugReportMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useResolveBugReportMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [resolveBugReportMutation, { data, loading, error }] = useResolveBugReportMutation({
 *   variables: {
 *      id: // value for 'id'
 *      note: // value for 'note'
 *   },
 * });
 */
export function useResolveBugReportMutation(baseOptions?: Apollo.MutationHookOptions<ResolveBugReportMutation, ResolveBugReportMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ResolveBugReportMutation, ResolveBugReportMutationVariables>(ResolveBugReportDocument, options);
      }
export type ResolveBugReportMutationHookResult = ReturnType<typeof useResolveBugReportMutation>;
export type ResolveBugReportMutationResult = Apollo.MutationResult<ResolveBugReportMutation>;
export type ResolveBugReportMutationOptions = Apollo.BaseMutationOptions<ResolveBugReportMutation, ResolveBugReportMutationVariables>;
export const UnresolveBugReportDocument = {"kind":"Document", "definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UnresolveBugReport"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"unresolveBugReport"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"DetailBugReport"}}]}}]}},...DetailBugReportFragmentDoc.definitions,...ListBugReportFragmentDoc.definitions]} as unknown as DocumentNode;
export type UnresolveBugReportMutationFn = Apollo.MutationFunction<UnresolveBugReportMutation, UnresolveBugReportMutationVariables>;

/**
 * __useUnresolveBugReportMutation__
 *
 * To run a mutation, you first call `useUnresolveBugReportMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUnresolveBugReportMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [unresolveBugReportMutation, { data, loading, error }] = useUnresolveBugReportMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useUnresolveBugReportMutation(baseOptions?: Apollo.MutationHookOptions<UnresolveBugReportMutation, UnresolveBugReportMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UnresolveBugReportMutation, UnresolveBugReportMutationVariables>(UnresolveBugReportDocument, options);
      }
export type UnresolveBugReportMutationHookResult = ReturnType<typeof useUnresolveBugReportMutation>;
export type UnresolveBugReportMutationResult = Apollo.MutationResult<UnresolveBugReportMutation>;
export type UnresolveBugReportMutationOptions = Apollo.BaseMutationOptions<UnresolveBugReportMutation, UnresolveBugReportMutationVariables>;
export const ForwardBugReportDocument = {"kind":"Document", "definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ForwardBugReport"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"url"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"forwarded"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}},"defaultValue":{"kind":"BooleanValue","value":true}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"forwardBugReport"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"url"},"value":{"kind":"Variable","name":{"kind":"Name","value":"url"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"forwarded"},"value":{"kind":"Variable","name":{"kind":"Name","value":"forwarded"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"DetailBugReport"}}]}}]}},...DetailBugReportFragmentDoc.definitions,...ListBugReportFragmentDoc.definitions]} as unknown as DocumentNode;
export type ForwardBugReportMutationFn = Apollo.MutationFunction<ForwardBugReportMutation, ForwardBugReportMutationVariables>;

/**
 * __useForwardBugReportMutation__
 *
 * To run a mutation, you first call `useForwardBugReportMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useForwardBugReportMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [forwardBugReportMutation, { data, loading, error }] = useForwardBugReportMutation({
 *   variables: {
 *      id: // value for 'id'
 *      url: // value for 'url'
 *      forwarded: // value for 'forwarded'
 *   },
 * });
 */
export function useForwardBugReportMutation(baseOptions?: Apollo.MutationHookOptions<ForwardBugReportMutation, ForwardBugReportMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ForwardBugReportMutation, ForwardBugReportMutationVariables>(ForwardBugReportDocument, options);
      }
export type ForwardBugReportMutationHookResult = ReturnType<typeof useForwardBugReportMutation>;
export type ForwardBugReportMutationResult = Apollo.MutationResult<ForwardBugReportMutation>;
export type ForwardBugReportMutationOptions = Apollo.BaseMutationOptions<ForwardBugReportMutation, ForwardBugReportMutationVariables>;
export const DeleteBugReportDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteBugReport"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteBugReport"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}}]}]}}]} as unknown as DocumentNode;
export type DeleteBugReportMutationFn = Apollo.MutationFunction<DeleteBugReportMutation, DeleteBugReportMutationVariables>;

/**
 * __useDeleteBugReportMutation__
 *
 * To run a mutation, you first call `useDeleteBugReportMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteBugReportMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteBugReportMutation, { data, loading, error }] = useDeleteBugReportMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteBugReportMutation(baseOptions?: Apollo.MutationHookOptions<DeleteBugReportMutation, DeleteBugReportMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteBugReportMutation, DeleteBugReportMutationVariables>(DeleteBugReportDocument, options);
      }
export type DeleteBugReportMutationHookResult = ReturnType<typeof useDeleteBugReportMutation>;
export type DeleteBugReportMutationResult = Apollo.MutationResult<DeleteBugReportMutation>;
export type DeleteBugReportMutationOptions = Apollo.BaseMutationOptions<DeleteBugReportMutation, DeleteBugReportMutationVariables>;