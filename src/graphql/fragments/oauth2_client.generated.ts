
import type { DocumentNode } from 'graphql';
export type Oauth2ClientFragment = { __typename?: 'ManagementOAuth2Client', id: string, name: string, clientId: string };

export const Oauth2ClientFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Oauth2Client"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ManagementOAuth2Client"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"clientId"}}]}}]} as unknown as DocumentNode;