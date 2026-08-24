
import type { DocumentNode } from 'graphql';

export type DetailDeviceGroupFragment = { __typename?: 'ManagementDeviceGroup', id: string, name: string, devices: Array<{ __typename?: 'ManagementDevice', id: string, name?: string | null, nodeId: string, deviceGroups: Array<{ __typename?: 'ManagementDeviceGroup', id: string, name: string }> }> };

export type ListDeviceGroupFragment = { __typename?: 'ManagementDeviceGroup', id: string, name: string };

export const ListDeviceGroupFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ListDeviceGroup"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ManagementDeviceGroup"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]} as unknown as DocumentNode;
export const DetailDeviceGroupFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"DetailDeviceGroup"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ManagementDeviceGroup"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"devices"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ListDevice"}}]}}]}}]} as unknown as DocumentNode;