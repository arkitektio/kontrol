import type * as Types from '../../api/types';
import type { DocumentNode } from 'graphql';
import { ListReportFragmentDoc } from '../fragments/report.generated';
import { ListInstanceAliasFragmentDoc } from '../fragments/alias.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type ResolveReportMutationVariables = Types.Exact<{
  id: Types.Scalars['ID']['input'];
  note?: Types.InputMaybe<Types.Scalars['String']['input']>;
}>;

export type ResolveReportMutation = { __typename?: 'Mutation', resolveReport: { __typename?: 'ManagementReport', id: string, functional: boolean, createdAt: any, isResolved: boolean, resolvedAt?: any | null, resolutionNote?: string | null, resolvedBy?: { __typename?: 'ManagementUser', id: string, username: string } | null, entries: Array<{ __typename?: 'ManagementReportEntry', key: string, valid: boolean, reason?: string | null, alias?: { __typename?: 'ManagementInstanceAlias', id: string, host?: string | null, port?: number | null, ssl: boolean, path?: string | null, challenge: string, kind: string, resolvedHost?: string | null, scope: string, layer?: { __typename?: 'ManagementLayer', id: string, name: string } | null, instance: { __typename?: 'ManagementServiceInstance', id: string, identifier: string, release: { __typename?: 'ManagementServiceRelease', version: string, service: { __typename?: 'ManagementService', id: string, identifier: any } } } } | null }> } };

export type UnresolveReportMutationVariables = Types.Exact<{
  id: Types.Scalars['ID']['input'];
}>;

export type UnresolveReportMutation = { __typename?: 'Mutation', unresolveReport: { __typename?: 'ManagementReport', id: string, functional: boolean, createdAt: any, isResolved: boolean, resolvedAt?: any | null, resolutionNote?: string | null, resolvedBy?: { __typename?: 'ManagementUser', id: string, username: string } | null, entries: Array<{ __typename?: 'ManagementReportEntry', key: string, valid: boolean, reason?: string | null, alias?: { __typename?: 'ManagementInstanceAlias', id: string, host?: string | null, port?: number | null, ssl: boolean, path?: string | null, challenge: string, kind: string, resolvedHost?: string | null, scope: string, layer?: { __typename?: 'ManagementLayer', id: string, name: string } | null, instance: { __typename?: 'ManagementServiceInstance', id: string, identifier: string, release: { __typename?: 'ManagementServiceRelease', version: string, service: { __typename?: 'ManagementService', id: string, identifier: any } } } } | null }> } };

export const ResolveReportDocument = {"kind":"Document", "definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ResolveReport"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"note"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"resolveReport"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"note"},"value":{"kind":"Variable","name":{"kind":"Name","value":"note"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ListReport"}}]}}]}},...ListReportFragmentDoc.definitions,...ListInstanceAliasFragmentDoc.definitions]} as unknown as DocumentNode;
export type ResolveReportMutationFn = Apollo.MutationFunction<ResolveReportMutation, ResolveReportMutationVariables>;

/**
 * __useResolveReportMutation__
 *
 * To run a mutation, you first call `useResolveReportMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useResolveReportMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [resolveReportMutation, { data, loading, error }] = useResolveReportMutation({
 *   variables: {
 *      id: // value for 'id'
 *      note: // value for 'note'
 *   },
 * });
 */
export function useResolveReportMutation(baseOptions?: Apollo.MutationHookOptions<ResolveReportMutation, ResolveReportMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ResolveReportMutation, ResolveReportMutationVariables>(ResolveReportDocument, options);
      }
export type ResolveReportMutationHookResult = ReturnType<typeof useResolveReportMutation>;
export type ResolveReportMutationResult = Apollo.MutationResult<ResolveReportMutation>;
export type ResolveReportMutationOptions = Apollo.BaseMutationOptions<ResolveReportMutation, ResolveReportMutationVariables>;
export const UnresolveReportDocument = {"kind":"Document", "definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UnresolveReport"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"unresolveReport"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ListReport"}}]}}]}},...ListReportFragmentDoc.definitions,...ListInstanceAliasFragmentDoc.definitions]} as unknown as DocumentNode;
export type UnresolveReportMutationFn = Apollo.MutationFunction<UnresolveReportMutation, UnresolveReportMutationVariables>;

/**
 * __useUnresolveReportMutation__
 *
 * To run a mutation, you first call `useUnresolveReportMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUnresolveReportMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [unresolveReportMutation, { data, loading, error }] = useUnresolveReportMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useUnresolveReportMutation(baseOptions?: Apollo.MutationHookOptions<UnresolveReportMutation, UnresolveReportMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UnresolveReportMutation, UnresolveReportMutationVariables>(UnresolveReportDocument, options);
      }
export type UnresolveReportMutationHookResult = ReturnType<typeof useUnresolveReportMutation>;
export type UnresolveReportMutationResult = Apollo.MutationResult<UnresolveReportMutation>;
export type UnresolveReportMutationOptions = Apollo.BaseMutationOptions<UnresolveReportMutation, UnresolveReportMutationVariables>;