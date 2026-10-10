import type * as Types from '../../api/types';
import type { DocumentNode } from 'graphql';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type OrganizationDeeplinksQueryVariables = Types.Exact<{
  id: Types.Scalars['ID']['input'];
}>;

export type OrganizationDeeplinksQuery = { __typename?: 'Query', organization: { __typename?: 'ManagementOrganization', id: string, slug: string, name?: string | null, deeplinkApps: Array<{ __typename?: 'ManagementDeeplinkApp', protocol: string, name: string, installUrl?: string | null, mobile: boolean }> } };

export type LinkPreviewQueryVariables = Types.Exact<{
  organization: Types.Scalars['String']['input'];
  user?: Types.InputMaybe<Types.Scalars['ID']['input']>;
}>;

export type LinkPreviewQuery = { __typename?: 'Query', linkPreview: { __typename?: 'ManagementLinkPreview', organization?: { __typename?: 'ManagementLinkPreviewOrganization', slug: string, name?: string | null, description?: string | null, avatar?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null } | null, inviter?: { __typename?: 'ManagementLinkPreviewUser', name: string, avatar?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null } | null } };

export const OrganizationDeeplinksDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"OrganizationDeeplinks"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"organization"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"deeplinkApps"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"protocol"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"installUrl"}},{"kind":"Field","name":{"kind":"Name","value":"mobile"}}]}}]}}]}}]} as unknown as DocumentNode;

/**
 * __useOrganizationDeeplinksQuery__
 *
 * To run a query within a React component, call `useOrganizationDeeplinksQuery` and pass it any options that fit your needs.
 * When your component renders, `useOrganizationDeeplinksQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useOrganizationDeeplinksQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useOrganizationDeeplinksQuery(baseOptions: Apollo.QueryHookOptions<OrganizationDeeplinksQuery, OrganizationDeeplinksQueryVariables> & ({ variables: OrganizationDeeplinksQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<OrganizationDeeplinksQuery, OrganizationDeeplinksQueryVariables>(OrganizationDeeplinksDocument, options);
      }
export function useOrganizationDeeplinksLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<OrganizationDeeplinksQuery, OrganizationDeeplinksQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<OrganizationDeeplinksQuery, OrganizationDeeplinksQueryVariables>(OrganizationDeeplinksDocument, options);
        }
// @ts-ignore
export function useOrganizationDeeplinksSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<OrganizationDeeplinksQuery, OrganizationDeeplinksQueryVariables>): Apollo.UseSuspenseQueryResult<OrganizationDeeplinksQuery, OrganizationDeeplinksQueryVariables>;
export function useOrganizationDeeplinksSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<OrganizationDeeplinksQuery, OrganizationDeeplinksQueryVariables>): Apollo.UseSuspenseQueryResult<OrganizationDeeplinksQuery | undefined, OrganizationDeeplinksQueryVariables>;
export function useOrganizationDeeplinksSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<OrganizationDeeplinksQuery, OrganizationDeeplinksQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<OrganizationDeeplinksQuery, OrganizationDeeplinksQueryVariables>(OrganizationDeeplinksDocument, options);
        }
export type OrganizationDeeplinksQueryHookResult = ReturnType<typeof useOrganizationDeeplinksQuery>;
export type OrganizationDeeplinksLazyQueryHookResult = ReturnType<typeof useOrganizationDeeplinksLazyQuery>;
export type OrganizationDeeplinksSuspenseQueryHookResult = ReturnType<typeof useOrganizationDeeplinksSuspenseQuery>;
export type OrganizationDeeplinksQueryResult = Apollo.QueryResult<OrganizationDeeplinksQuery, OrganizationDeeplinksQueryVariables>;
export const LinkPreviewDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"LinkPreview"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"organization"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"user"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"linkPreview"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"organization"},"value":{"kind":"Variable","name":{"kind":"Name","value":"organization"}}},{"kind":"Argument","name":{"kind":"Name","value":"user"},"value":{"kind":"Variable","name":{"kind":"Name","value":"user"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"organization"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"presignedUrl"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"inviter"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"presignedUrl"}}]}}]}}]}}]}}]} as unknown as DocumentNode;

/**
 * __useLinkPreviewQuery__
 *
 * To run a query within a React component, call `useLinkPreviewQuery` and pass it any options that fit your needs.
 * When your component renders, `useLinkPreviewQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useLinkPreviewQuery({
 *   variables: {
 *      organization: // value for 'organization'
 *      user: // value for 'user'
 *   },
 * });
 */
export function useLinkPreviewQuery(baseOptions: Apollo.QueryHookOptions<LinkPreviewQuery, LinkPreviewQueryVariables> & ({ variables: LinkPreviewQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<LinkPreviewQuery, LinkPreviewQueryVariables>(LinkPreviewDocument, options);
      }
export function useLinkPreviewLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<LinkPreviewQuery, LinkPreviewQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<LinkPreviewQuery, LinkPreviewQueryVariables>(LinkPreviewDocument, options);
        }
// @ts-ignore
export function useLinkPreviewSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<LinkPreviewQuery, LinkPreviewQueryVariables>): Apollo.UseSuspenseQueryResult<LinkPreviewQuery, LinkPreviewQueryVariables>;
export function useLinkPreviewSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<LinkPreviewQuery, LinkPreviewQueryVariables>): Apollo.UseSuspenseQueryResult<LinkPreviewQuery | undefined, LinkPreviewQueryVariables>;
export function useLinkPreviewSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<LinkPreviewQuery, LinkPreviewQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<LinkPreviewQuery, LinkPreviewQueryVariables>(LinkPreviewDocument, options);
        }
export type LinkPreviewQueryHookResult = ReturnType<typeof useLinkPreviewQuery>;
export type LinkPreviewLazyQueryHookResult = ReturnType<typeof useLinkPreviewLazyQuery>;
export type LinkPreviewSuspenseQueryHookResult = ReturnType<typeof useLinkPreviewSuspenseQuery>;
export type LinkPreviewQueryResult = Apollo.QueryResult<LinkPreviewQuery, LinkPreviewQueryVariables>;