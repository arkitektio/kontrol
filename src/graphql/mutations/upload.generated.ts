import type * as Types from '../../api/types';
import type { DocumentNode } from 'graphql';
import { PresignedPostCredentialsFragmentDoc } from '../fragments/presigned_post.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type RequestMediaUploadMutationVariables = Types.Exact<{
  key: Types.Scalars['String']['input'];
  datalayer: Types.Scalars['String']['input'];
}>;

export type RequestMediaUploadMutation = { __typename?: 'Mutation', requestMediaUpload: { __typename?: 'PresignedPostCredentials', xAmzAlgorithm: string, xAmzCredential: string, xAmzDate: string, xAmzSignature: string, key: string, bucket: string, datalayer: string, policy: string, store: string } };

export const RequestMediaUploadDocument = {"kind":"Document", "definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RequestMediaUpload"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"key"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"datalayer"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"requestMediaUpload"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"key"},"value":{"kind":"Variable","name":{"kind":"Name","value":"key"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"datalayer"},"value":{"kind":"Variable","name":{"kind":"Name","value":"datalayer"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PresignedPostCredentials"}}]}}]}},...PresignedPostCredentialsFragmentDoc.definitions]} as unknown as DocumentNode;
export type RequestMediaUploadMutationFn = Apollo.MutationFunction<RequestMediaUploadMutation, RequestMediaUploadMutationVariables>;

/**
 * __useRequestMediaUploadMutation__
 *
 * To run a mutation, you first call `useRequestMediaUploadMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRequestMediaUploadMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [requestMediaUploadMutation, { data, loading, error }] = useRequestMediaUploadMutation({
 *   variables: {
 *      key: // value for 'key'
 *      datalayer: // value for 'datalayer'
 *   },
 * });
 */
export function useRequestMediaUploadMutation(baseOptions?: Apollo.MutationHookOptions<RequestMediaUploadMutation, RequestMediaUploadMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RequestMediaUploadMutation, RequestMediaUploadMutationVariables>(RequestMediaUploadDocument, options);
      }
export type RequestMediaUploadMutationHookResult = ReturnType<typeof useRequestMediaUploadMutation>;
export type RequestMediaUploadMutationResult = Apollo.MutationResult<RequestMediaUploadMutation>;
export type RequestMediaUploadMutationOptions = Apollo.BaseMutationOptions<RequestMediaUploadMutation, RequestMediaUploadMutationVariables>;