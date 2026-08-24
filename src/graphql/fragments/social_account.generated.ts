
import type { DocumentNode } from 'graphql';
export type BaseSocialAccount_ManagementGenericAccount_Fragment = { __typename: 'ManagementGenericAccount', id: string, provider: string };

export type BaseSocialAccount_ManagementGithubAccount_Fragment = { __typename: 'ManagementGithubAccount', id: string, provider: string };

export type BaseSocialAccount_ManagementGoogleAccount_Fragment = { __typename: 'ManagementGoogleAccount', id: string, provider: string };

export type BaseSocialAccount_ManagementOrcidAccount_Fragment = { __typename: 'ManagementOrcidAccount', id: string, provider: string };

export type BaseSocialAccountFragment =
  | BaseSocialAccount_ManagementGenericAccount_Fragment
  | BaseSocialAccount_ManagementGithubAccount_Fragment
  | BaseSocialAccount_ManagementGoogleAccount_Fragment
  | BaseSocialAccount_ManagementOrcidAccount_Fragment
;

export type OrcidSocialAccountFragment = { __typename: 'ManagementOrcidAccount', id: string, provider: string, identifier?: { __typename?: 'ManagementOrcidIdentifier', uri: string, path: string, host: string } | null, person?: { __typename?: 'ManagementOrcidPerson', researcherUrls: Array<string>, addresses: Array<string> } | null };

export type GithubSocialAccountFragment = { __typename: 'ManagementGithubAccount', id: string, provider: string };

export type GooglebSocialAccountFragment = { __typename: 'ManagementGoogleAccount', id: string, provider: string };

export type DetailSocialAccount_ManagementGenericAccount_Fragment = { __typename: 'ManagementGenericAccount', id: string, provider: string };

export type DetailSocialAccount_ManagementGithubAccount_Fragment = { __typename: 'ManagementGithubAccount', id: string, provider: string };

export type DetailSocialAccount_ManagementGoogleAccount_Fragment = { __typename: 'ManagementGoogleAccount', id: string, provider: string };

export type DetailSocialAccount_ManagementOrcidAccount_Fragment = { __typename: 'ManagementOrcidAccount', id: string, provider: string, identifier?: { __typename?: 'ManagementOrcidIdentifier', uri: string, path: string, host: string } | null, person?: { __typename?: 'ManagementOrcidPerson', researcherUrls: Array<string>, addresses: Array<string> } | null };

export type DetailSocialAccountFragment =
  | DetailSocialAccount_ManagementGenericAccount_Fragment
  | DetailSocialAccount_ManagementGithubAccount_Fragment
  | DetailSocialAccount_ManagementGoogleAccount_Fragment
  | DetailSocialAccount_ManagementOrcidAccount_Fragment
;

export type ListSocialAccount_ManagementGenericAccount_Fragment = { __typename: 'ManagementGenericAccount', id: string, provider: string };

export type ListSocialAccount_ManagementGithubAccount_Fragment = { __typename: 'ManagementGithubAccount', id: string, provider: string };

export type ListSocialAccount_ManagementGoogleAccount_Fragment = { __typename: 'ManagementGoogleAccount', id: string, provider: string };

export type ListSocialAccount_ManagementOrcidAccount_Fragment = { __typename: 'ManagementOrcidAccount', id: string, provider: string };

export type ListSocialAccountFragment =
  | ListSocialAccount_ManagementGenericAccount_Fragment
  | ListSocialAccount_ManagementGithubAccount_Fragment
  | ListSocialAccount_ManagementGoogleAccount_Fragment
  | ListSocialAccount_ManagementOrcidAccount_Fragment
;

export const BaseSocialAccountFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"BaseSocialAccount"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ManagementSocialAccount"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"provider"}},{"kind":"Field","name":{"kind":"Name","value":"__typename"}}]}}]} as unknown as DocumentNode;
export const OrcidSocialAccountFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"OrcidSocialAccount"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ManagementOrcidAccount"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"BaseSocialAccount"}},{"kind":"Field","name":{"kind":"Name","value":"identifier"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"uri"}},{"kind":"Field","name":{"kind":"Name","value":"path"}},{"kind":"Field","name":{"kind":"Name","value":"host"}}]}},{"kind":"Field","name":{"kind":"Name","value":"person"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"researcherUrls"}},{"kind":"Field","name":{"kind":"Name","value":"addresses"}}]}}]}}]} as unknown as DocumentNode;
export const GithubSocialAccountFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"GithubSocialAccount"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ManagementGithubAccount"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"BaseSocialAccount"}}]}}]} as unknown as DocumentNode;
export const GooglebSocialAccountFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"GooglebSocialAccount"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ManagementGoogleAccount"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"BaseSocialAccount"}}]}}]} as unknown as DocumentNode;
export const DetailSocialAccountFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"DetailSocialAccount"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ManagementSocialAccount"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"provider"}},{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"OrcidSocialAccount"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"GithubSocialAccount"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"GooglebSocialAccount"}}]}}]} as unknown as DocumentNode;
export const ListSocialAccountFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ListSocialAccount"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ManagementSocialAccount"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"provider"}},{"kind":"Field","name":{"kind":"Name","value":"__typename"}}]}}]} as unknown as DocumentNode;