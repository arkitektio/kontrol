import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** The App identifier is a unique identifier for an app. It is used to identify the app in the database and in the code. We encourage you to use the reverse domain name notation. E.g. `com.example.myapp` */
  AppIdentifier: { input: any; output: any; }
  /** Date with time (isoformat) */
  DateTime: { input: any; output: any; }
  /** The `ArrayLike` scalasr typsse represents a reference to a store previously created by the user n a datalayer */
  ExtraData: { input: any; output: any; }
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](https://ecma-international.org/wp-content/uploads/ECMA-404_2nd_edition_december_2017.pdf). */
  JSON: { input: any; output: any; }
  /** The Service identifier is a unique identifier for a service. It is used to identify the service in the database and in the code. We encourage you to use the reverse domain name notation. E.g. `com.example.myservice` */
  ServiceIdentifier: { input: any; output: any; }
  /** The `Version` represents a semver version string */
  Version: { input: any; output: any; }
  _Any: { input: any; output: any; }
};

export type AcceptAuthorizeCodeInput = {
  clientId: Scalars['String']['input'];
  nonce?: InputMaybe<Scalars['String']['input']>;
  organization: Scalars['String']['input'];
  redirectUri: Scalars['String']['input'];
  scope: Scalars['String']['input'];
  state: Scalars['String']['input'];
};

export type AcceptCompositionDeviceCodeInput = {
  allowIonscale?: Scalars['Boolean']['input'];
  deviceCode: Scalars['ID']['input'];
  organization: Scalars['ID']['input'];
};

export type AcceptDeviceCodeInput = {
  composition: Scalars['ID']['input'];
  deviceCode: Scalars['ID']['input'];
};

export type AcceptInviteInput = {
  token: Scalars['String']['input'];
};

export type AcceptServiceDeviceCodeInput = {
  deviceCode: Scalars['ID']['input'];
  organization: Scalars['ID']['input'];
};

export type AddDeviceToGroupInput = {
  device: Scalars['ID']['input'];
  deviceGroup: Scalars['ID']['input'];
};

/** App(id, name, identifier, logo) */
export type AppFilter = {
  AND?: InputMaybe<AppFilter>;
  DISTINCT?: InputMaybe<Scalars['Boolean']['input']>;
  NOT?: InputMaybe<AppFilter>;
  OR?: InputMaybe<AppFilter>;
  ids?: InputMaybe<Array<Scalars['ID']['input']>>;
  search?: InputMaybe<Scalars['String']['input']>;
};

export type CancelInviteInput = {
  id: Scalars['ID']['input'];
};

export type CreateAliasInput = {
  host: Scalars['String']['input'];
  kind: Scalars['String']['input'];
  path?: InputMaybe<Scalars['String']['input']>;
  port: Scalars['Int']['input'];
  serviceInstance: Scalars['ID']['input'];
};

export type CreateDeviceGroupInput = {
  name: Scalars['String']['input'];
  organization: Scalars['ID']['input'];
};

export type CreateDeviceInput = {
  deviceId: Scalars['ID']['input'];
  name: Scalars['String']['input'];
  organization: Scalars['ID']['input'];
};

export type CreateInviteInput = {
  expiresInDays?: InputMaybe<Scalars['Int']['input']>;
  organization?: InputMaybe<Scalars['ID']['input']>;
  roles?: InputMaybe<Array<Scalars['String']['input']>>;
};

export type CreateIonscaleAuthKeyInput = {
  /** When enabled, machines authenticated by this key will be automatically removed after going offline. */
  ephemeral?: Scalars['Boolean']['input'];
  /** The ID of the Ionscale layer to create the key for. */
  layerId: Scalars['ID']['input'];
  /** Machines authenticated by this key will be automatically tagged with these tags. */
  tags?: InputMaybe<Array<Scalars['String']['input']>>;
};

export type CreateIonscaleLayerInput = {
  /** The name of the tailnet layer. */
  name?: InputMaybe<Scalars['String']['input']>;
  /** The ID of the organization to create the tailnet layer for. */
  organizationId: Scalars['ID']['input'];
};

export type CreateOrganizationInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  setupKommunityPartners?: Scalars['Boolean']['input'];
};

export type CreateOrganizationProfileInput = {
  name: Scalars['String']['input'];
  organization: Scalars['ID']['input'];
};

export type CreateProfileInput = {
  name: Scalars['String']['input'];
  user: Scalars['ID']['input'];
};

export type DeclineAuthorizeCodeInput = {
  clientId: Scalars['String']['input'];
  redirectUri: Scalars['String']['input'];
  state: Scalars['String']['input'];
};

export type DeclineCompositionDeviceCodeInput = {
  deviceCode: Scalars['ID']['input'];
};

export type DeclineDeviceCodeInput = {
  deviceCode: Scalars['ID']['input'];
};

export type DeclineInviteInput = {
  token: Scalars['String']['input'];
};

export type DeclineServiceDeviceCodeInput = {
  deviceCode: Scalars['ID']['input'];
};

export type DeleteAliasInput = {
  id: Scalars['ID']['input'];
};

export type DeleteCompositionInput = {
  id: Scalars['ID']['input'];
};

export type DeleteDeviceGroupInput = {
  id: Scalars['ID']['input'];
};

export type DeleteDeviceInput = {
  id: Scalars['ID']['input'];
};

export type DeleteIonscaleLayerInput = {
  id: Scalars['ID']['input'];
};

export type DeleteMembershipInput = {
  id: Scalars['ID']['input'];
};

export type DeleteOrganizationInput = {
  id: Scalars['ID']['input'];
};

export type DeleteOrganizationProfileInput = {
  id: Scalars['ID']['input'];
};

export type DeleteProfileInput = {
  id: Scalars['ID']['input'];
};

/** __doc__ */
export type GroupFilter = {
  AND?: InputMaybe<GroupFilter>;
  DISTINCT?: InputMaybe<Scalars['Boolean']['input']>;
  NOT?: InputMaybe<GroupFilter>;
  OR?: InputMaybe<GroupFilter>;
  ids?: InputMaybe<Array<Scalars['ID']['input']>>;
  name?: InputMaybe<StrFilterLookup>;
  search?: InputMaybe<Scalars['String']['input']>;
};

export enum LayerKind {
  Base = 'BASE',
  Ionscale = 'IONSCALE',
  Tailnet = 'TAILNET',
  Vpn = 'VPN'
}

/** An App is the Arkitekt equivalent of a Software Application. It is a collection of `Releases` that can be all part of the same application. E.g the App `Napari` could have the releases `0.1.0` and `0.2.0`. */
export type ManagementApp = {
  __typename?: 'ManagementApp';
  id: Scalars['ID']['output'];
  /** The identifier of the app. This should be a globally unique string that identifies the app. We encourage you to use the reverse domain name notation. E.g. `com.example.myapp` */
  identifier: Scalars['AppIdentifier']['output'];
  /** The logo of the app. This should be a url to a logo that can be used to represent the app. */
  logo?: Maybe<ManagementMediaStore>;
  /** The name of the app */
  name: Scalars['String']['output'];
  /** The releases of the app. A release is a version of the app that can be installed by a user. */
  releases: Array<ManagementRelease>;
};

/**
 * A client is a way of authenticating users with a release.
 *  The strategy of authentication is defined by the kind of client. And allows for different authentication flow.
 *  E.g a client can be a DESKTOP app, that might be used by multiple users, or a WEBSITE that wants to connect to a user's account,
 *  but also a DEVELOPMENT client that is used by a developer to test the app. The client model thinly wraps the oauth2 client model, which is used to authenticate users.
 */
export type ManagementClient = {
  __typename?: 'ManagementClient';
  /** Check if the client is active */
  device?: Maybe<ManagementDevice>;
  /** Is this client functional? A non-functional client cannot be used to authenticate users. */
  functional: Scalars['Boolean']['output'];
  id: Scalars['ID']['output'];
  /** The issue url of the client. This is the url where users can report issues and get more information about the client. */
  issueUrl?: Maybe<Scalars['String']['output']>;
  /** The kind of the client. The kind defines the authentication flow that is used to authenticate users with this client. */
  kind: Scalars['String']['output'];
  /** The last time the client reported in. This is used to determine if the client is active or not. */
  lastReportedAt?: Maybe<Scalars['DateTime']['output']>;
  /** The logo of the release. This should be a url to a logo that can be used to represent the release. */
  logo?: Maybe<ManagementMediaStore>;
  /** Check if the device code is still valid */
  manifest: ManagementStagingManifest;
  /** The mappings of the client. A mapping is a mapping of a service to a service instance. This is used to configure the composition. */
  mappings: Array<ManagementServiceInstanceMapping>;
  /** The name of the client. This is a human readable name of the client. */
  name: Scalars['String']['output'];
  /** The client */
  organization: ManagementOrganization;
  /** Is this client public? If a client is public  */
  public: Scalars['Boolean']['output'];
  /** The public sources of the client. These are the public sources where users can find more information about the client. */
  publicSources: Array<ManagementPublicSource>;
  /** The release that this client belongs to. */
  release: ManagementRelease;
  /** The scopes that are granted to this client. */
  scopes: Array<ManagementScope>;
  /** The configuration of the client. This is the configuration that will be sent to the client. It should never contain sensitive information. */
  token: Scalars['String']['output'];
  /** The aliases that are used by this client. */
  usedAliases: Array<ManagementUsedAlias>;
  /** If the client is a DEVELOPMENT client, which requires no further authentication, this is the user that is authenticated with the client. */
  user?: Maybe<ManagementUser>;
};


/**
 * A client is a way of authenticating users with a release.
 *  The strategy of authentication is defined by the kind of client. And allows for different authentication flow.
 *  E.g a client can be a DESKTOP app, that might be used by multiple users, or a WEBSITE that wants to connect to a user's account,
 *  but also a DEVELOPMENT client that is used by a developer to test the app. The client model thinly wraps the oauth2 client model, which is used to authenticate users.
 */
export type ManagementClientMappingsArgs = {
  filters?: InputMaybe<ServiceInstanceMappingFilter>;
  pagination?: InputMaybe<OffsetPaginationInput>;
};


/**
 * A client is a way of authenticating users with a release.
 *  The strategy of authentication is defined by the kind of client. And allows for different authentication flow.
 *  E.g a client can be a DESKTOP app, that might be used by multiple users, or a WEBSITE that wants to connect to a user's account,
 *  but also a DEVELOPMENT client that is used by a developer to test the app. The client model thinly wraps the oauth2 client model, which is used to authenticate users.
 */
export type ManagementClientScopesArgs = {
  filters?: InputMaybe<ManagementScopeFilter>;
  order?: InputMaybe<ManagementScopeOrder>;
  pagination?: InputMaybe<OffsetPaginationInput>;
};


/**
 * A client is a way of authenticating users with a release.
 *  The strategy of authentication is defined by the kind of client. And allows for different authentication flow.
 *  E.g a client can be a DESKTOP app, that might be used by multiple users, or a WEBSITE that wants to connect to a user's account,
 *  but also a DEVELOPMENT client that is used by a developer to test the app. The client model thinly wraps the oauth2 client model, which is used to authenticate users.
 */
export type ManagementClientUsedAliasesArgs = {
  filters?: InputMaybe<ManagementDeviceFilter>;
  pagination?: InputMaybe<OffsetPaginationInput>;
};

/** Client(id, composition, functional, name, release, oauth2_client, kind, user, organization, membership, redirect_uris, public, token, node, public_sources, tenant, created_at, requirements_hash, logo, last_reported_at, manifest) */
export type ManagementClientFilter = {
  AND?: InputMaybe<ManagementClientFilter>;
  DISTINCT?: InputMaybe<Scalars['Boolean']['input']>;
  NOT?: InputMaybe<ManagementClientFilter>;
  OR?: InputMaybe<ManagementClientFilter>;
  functional?: InputMaybe<Scalars['Boolean']['input']>;
  ids?: InputMaybe<Array<Scalars['ID']['input']>>;
  organization?: InputMaybe<Scalars['ID']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
};

export type ManagementClientOrder = {
  createdAt?: InputMaybe<Ordering>;
  lastReportedAt?: InputMaybe<Ordering>;
  name?: InputMaybe<Ordering>;
};

/** An Organization is a group of users that can work together on a project. */
export type ManagementComChannel = {
  __typename?: 'ManagementComChannel';
  id: Scalars['ID']['output'];
  user: ManagementUser;
};

/** A Composition is a collection of service instances and clients that work together. It represents a deployable configuration for an organization. */
export type ManagementComposition = {
  __typename?: 'ManagementComposition';
  /** The clients that are part of this composition. A client is an application that uses the services in the composition. */
  clients: Array<ManagementClient>;
  /** The user who created this composition */
  creator: ManagementUser;
  /** The description of the composition. This should be a human readable description of the composition. */
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  /** The instances of the composition. A service instance is a configured instance of a service. */
  instances: Array<ManagementServiceInstance>;
  /** The name of the composition */
  name: Scalars['String']['output'];
  /** The organization that owns this composition. */
  organization: ManagementOrganization;
  /** The token used to claim this composition */
  token: Scalars['String']['output'];
};


/** A Composition is a collection of service instances and clients that work together. It represents a deployable configuration for an organization. */
export type ManagementCompositionClientsArgs = {
  filters?: InputMaybe<ManagementClientFilter>;
  order?: InputMaybe<ManagementClientOrder>;
  pagination?: InputMaybe<OffsetPaginationInput>;
};


/** A Composition is a collection of service instances and clients that work together. It represents a deployable configuration for an organization. */
export type ManagementCompositionInstancesArgs = {
  filters?: InputMaybe<ManagementServiceInstanceFilter>;
  order?: InputMaybe<ManagementServiceInstanceOrder>;
  pagination?: InputMaybe<OffsetPaginationInput>;
};

/** A CompositionDeviceCode is used for the device code flow for compositions. */
export type ManagementCompositionDeviceCode = {
  __typename?: 'ManagementCompositionDeviceCode';
  code: Scalars['String']['output'];
  composition?: Maybe<ManagementComposition>;
  createdAt: Scalars['DateTime']['output'];
  denied: Scalars['Boolean']['output'];
  expiresAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  /** The composition manifest for this device code */
  manifest?: Maybe<ManagementCompositionManifest>;
  user?: Maybe<ManagementUser>;
};

/** Composition(id, name, organization, description, creator, token, auth_key) */
export type ManagementCompositionFilter = {
  AND?: InputMaybe<ManagementCompositionFilter>;
  DISTINCT?: InputMaybe<Scalars['Boolean']['input']>;
  NOT?: InputMaybe<ManagementCompositionFilter>;
  OR?: InputMaybe<ManagementCompositionFilter>;
  ids?: InputMaybe<Array<Scalars['ID']['input']>>;
  organization?: InputMaybe<Scalars['ID']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
};

export type ManagementCompositionManifest = {
  __typename?: 'ManagementCompositionManifest';
  clients: Array<ManagementStagingClientRequest>;
  identifier: Scalars['String']['output'];
  instances: Array<ManagementStagingInstanceRequest>;
};

export type ManagementCompositionOrder = {
  createdAt?: InputMaybe<Ordering>;
  lastReportedAt?: InputMaybe<Ordering>;
  name?: InputMaybe<Ordering>;
};

/** ComputeNode(id, node_id, name, organization) */
export type ManagementDevice = {
  __typename?: 'ManagementDevice';
  clients: Array<ManagementClient>;
  /** The device groups that belong to this compute node. */
  deviceGroups: Array<ManagementDeviceGroup>;
  id: Scalars['ID']['output'];
  name?: Maybe<Scalars['String']['output']>;
  nodeId: Scalars['ID']['output'];
  /** The organization that owns this compute node. */
  organization: ManagementOrganization;
  /** The service instances that are associated with this compute node. */
  serviceInstances: Array<ManagementServiceInstance>;
};


/** ComputeNode(id, node_id, name, organization) */
export type ManagementDeviceClientsArgs = {
  filters?: InputMaybe<ManagementClientFilter>;
  order?: InputMaybe<ManagementClientOrder>;
  pagination?: InputMaybe<OffsetPaginationInput>;
};


/** ComputeNode(id, node_id, name, organization) */
export type ManagementDeviceDeviceGroupsArgs = {
  filters?: InputMaybe<ManagementDeviceGroupFilter>;
  order?: InputMaybe<ManagementDeviceGroupOrder>;
  pagination?: InputMaybe<OffsetPaginationInput>;
};


/** ComputeNode(id, node_id, name, organization) */
export type ManagementDeviceServiceInstancesArgs = {
  filters?: InputMaybe<ManagementServiceInstanceFilter>;
  order?: InputMaybe<ManagementServiceInstanceOrder>;
  pagination?: InputMaybe<OffsetPaginationInput>;
};

/** A DeviceCode is used for the device code flow for client authentication. */
export type ManagementDeviceCode = {
  __typename?: 'ManagementDeviceCode';
  client?: Maybe<ManagementClient>;
  code: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  denied: Scalars['Boolean']['output'];
  expiresAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  /** The kind of staging client */
  stagingKind: Scalars['String']['output'];
  /** The staging manifest for this device code */
  stagingManifest?: Maybe<ManagementStagingManifest>;
  /** Whether this device code is for a public client */
  stagingPublic: Scalars['Boolean']['output'];
  user?: Maybe<ManagementUser>;
};

/** ComputeNode(id, node_id, name, organization) */
export type ManagementDeviceFilter = {
  AND?: InputMaybe<ManagementDeviceFilter>;
  DISTINCT?: InputMaybe<Scalars['Boolean']['input']>;
  NOT?: InputMaybe<ManagementDeviceFilter>;
  OR?: InputMaybe<ManagementDeviceFilter>;
  ids?: InputMaybe<Array<Scalars['ID']['input']>>;
  organization?: InputMaybe<Scalars['ID']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
};

/** A DeviceGroup is a group of compute nodes that can be used to run clients. DeviceGroups can be used to group compute nodes by location, hardware type, or any other criteria. */
export type ManagementDeviceGroup = {
  __typename?: 'ManagementDeviceGroup';
  /** The description of the device group. */
  description?: Maybe<Scalars['String']['output']>;
  /** The number of devices in this device group. */
  devices: Array<ManagementDevice>;
  id: Scalars['ID']['output'];
  /** The name of the device group. */
  name: Scalars['String']['output'];
};

/** DeviceGroup(id, name, organization) */
export type ManagementDeviceGroupFilter = {
  AND?: InputMaybe<ManagementDeviceGroupFilter>;
  DISTINCT?: InputMaybe<Scalars['Boolean']['input']>;
  NOT?: InputMaybe<ManagementDeviceGroupFilter>;
  OR?: InputMaybe<ManagementDeviceGroupFilter>;
  ids?: InputMaybe<Array<Scalars['ID']['input']>>;
  organization?: InputMaybe<Scalars['ID']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
};

export type ManagementDeviceGroupOrder = {
  createdAt?: InputMaybe<Ordering>;
  lastReportedAt?: InputMaybe<Ordering>;
  name?: InputMaybe<Ordering>;
};

export type ManagementDeviceOrder = {
  createdAt?: InputMaybe<Ordering>;
  lastReportedAt?: InputMaybe<Ordering>;
  name?: InputMaybe<Ordering>;
};

/**
 *
 * The Generic Account is a Social Account that maps to a generic account. It provides information about the
 * user that is specific to the provider. This includes untyped extra data.
 *
 *
 */
export type ManagementGenericAccount = ManagementSocialAccount & {
  __typename?: 'ManagementGenericAccount';
  extraData: Scalars['ExtraData']['output'];
  id: Scalars['ID']['output'];
  /** The provider of the account. This can be used to determine the type of the account. */
  provider: Scalars['String']['output'];
  /** The unique identifier of the account. This is unique for the provider. */
  uid: Scalars['String']['output'];
};

/**
 *
 * The Github Account is a Social Account that maps to a Github Account. It provides information about the
 * user that is specific to the Github service. This includes the Github Identifier.
 *
 *
 */
export type ManagementGithubAccount = ManagementSocialAccount & {
  __typename?: 'ManagementGithubAccount';
  /** Extra data that is specific to the provider. This is a json field and can be used to store arbitrary data. */
  extraData: Scalars['ExtraData']['output'];
  id: Scalars['ID']['output'];
  identifier: ManagementOrcidIdentifier;
  /** The provider of the account. This can be used to determine the type of the account. */
  provider: Scalars['String']['output'];
  /** The unique identifier of the account. This is unique for the provider. */
  uid: Scalars['String']['output'];
};

/**
 *
 * The Google Account is a Social Account that maps to a Google Account. It provides information about the
 * user that is specific to the Google service.
 *
 *
 */
export type ManagementGoogleAccount = ManagementSocialAccount & {
  __typename?: 'ManagementGoogleAccount';
  extraData: Scalars['ExtraData']['output'];
  id: Scalars['ID']['output'];
  /** The provider of the account. This can be used to determine the type of the account. */
  provider: Scalars['String']['output'];
  /** The unique identifier of the account. This is unique for the provider. */
  uid: Scalars['String']['output'];
};

/**
 *
 * A Group is the base unit of Role Based Access Control. A Group can have many users and many permissions. A user can have many groups. A user with a group that has a permission can perform the action that the permission allows.
 * Groups are propagated to the respecting subservices. Permissions are not. Each subservice has to define its own permissions and mappings to groups.
 *
 */
export type ManagementGroup = {
  __typename?: 'ManagementGroup';
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  profile?: Maybe<ManagementGroupProfile>;
  /** The users that are in the group */
  users: Array<ManagementUser>;
};

/**
 *
 * A Profile of a User. A Profile can be used to display personalied information about a user.
 *
 *
 */
export type ManagementGroupProfile = {
  __typename?: 'ManagementGroupProfile';
  /** The avatar of the group */
  avatar?: Maybe<ManagementMediaStore>;
  /** A short bio of the group */
  bio?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  /** The name of the group */
  name?: Maybe<Scalars['String']['output']>;
};

/** An alias for a service instance. This is used to provide a more user-friendly name for the instance. */
export type ManagementInstanceAlias = {
  __typename?: 'ManagementInstanceAlias';
  /** The challenge of the alias. This is used to verify that the alias is reachable. */
  challenge: Scalars['String']['output'];
  /** The host of the alias, if its a ABSOLUTE alias (e.g. 'example.com'). If not set, the alias is relative to the layer's domain. */
  host?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  /** The instance that this alias belongs to. */
  instance: ManagementServiceInstance;
  /** The kind of alias (relative or absolute). */
  kind: Scalars['String']['output'];
  /** The layer that this alias belongs to. */
  layer?: Maybe<ManagementLayer>;
  /** The name of the alias. */
  name?: Maybe<Scalars['String']['output']>;
  /** The organization that owns this alias (via the instance). */
  organization: ManagementOrganization;
  /** The path of the alias, if its a ABSOLUTE alias (e.g. 'example.com/path'). If not set, the alias is relative to the layer's path. */
  path?: Maybe<Scalars['String']['output']>;
  /** The port of the alias, if its a ABSOLUTE alias (e.g. 'example.com:8080'). If not set, the alias is relative to the layer's port. */
  port?: Maybe<Scalars['Int']['output']>;
  /** The scope of the alias. E.g 'local' means that the alias can only be used within the local network. */
  scope: Scalars['String']['output'];
  /** Is this alias using SSL? If true, the alias will be accessed via https:// instead of http://. */
  ssl: Scalars['Boolean']['output'];
  /** The usages of this alias by clients. */
  usages: Array<ManagementUsedAlias>;
};


/** An alias for a service instance. This is used to provide a more user-friendly name for the instance. */
export type ManagementInstanceAliasUsagesArgs = {
  filters?: InputMaybe<ManagementDeviceFilter>;
  pagination?: InputMaybe<OffsetPaginationInput>;
};

/** An alias for a service instance. This is used to provide a more user-friendly name for the instance. */
export type ManagementInstanceAliasFilter = {
  AND?: InputMaybe<ManagementInstanceAliasFilter>;
  DISTINCT?: InputMaybe<Scalars['Boolean']['input']>;
  NOT?: InputMaybe<ManagementInstanceAliasFilter>;
  OR?: InputMaybe<ManagementInstanceAliasFilter>;
  functional?: InputMaybe<Scalars['Boolean']['input']>;
  ids?: InputMaybe<Array<Scalars['ID']['input']>>;
  search?: InputMaybe<Scalars['String']['input']>;
};

export type ManagementInstanceAliasOrder = {
  createdAt?: InputMaybe<Ordering>;
  name?: InputMaybe<Ordering>;
  updatedAt?: InputMaybe<Ordering>;
};

/** A single-use magic invite link that allows one person to join an organization. */
export type ManagementInvite = {
  __typename?: 'ManagementInvite';
  acceptedBy?: Maybe<ManagementUser>;
  createdAt: Scalars['DateTime']['output'];
  createdBy: ManagementUser;
  createdFor: ManagementOrganization;
  createdMemberships: Array<ManagementMembership>;
  declinedBy?: Maybe<ManagementUser>;
  email?: Maybe<Scalars['String']['output']>;
  expiresAt?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['ID']['output'];
  /** Get the full URL for accepting this invite */
  inviteUrl: Scalars['String']['output'];
  respondedAt?: Maybe<Scalars['DateTime']['output']>;
  roles: Array<ManagementRole>;
  status: Scalars['String']['output'];
  token: Scalars['String']['output'];
  /** Check if the invite is still valid and pending */
  valid: Scalars['Boolean']['output'];
};


/** A single-use magic invite link that allows one person to join an organization. */
export type ManagementInviteCreatedMembershipsArgs = {
  filters?: InputMaybe<ManagementMembershipFilter>;
  order?: InputMaybe<ManagementMembershipOrder>;
  pagination?: InputMaybe<OffsetPaginationInput>;
};


/** A single-use magic invite link that allows one person to join an organization. */
export type ManagementInviteRolesArgs = {
  filters?: InputMaybe<ManagementRoleFilter>;
  order?: InputMaybe<ManagementRoleOrder>;
  pagination?: InputMaybe<OffsetPaginationInput>;
};

/** IonscaleAuthKey(id, composition, layer, key, created_at, creator, ephemeral, tags) */
export type ManagementIonscaleAuthKey = {
  __typename?: 'ManagementIonscaleAuthKey';
  createdAt: Scalars['DateTime']['output'];
  creator: ManagementUser;
  ephemeral: Scalars['Boolean']['output'];
  id: Scalars['ID']['output'];
  key: Scalars['String']['output'];
  layer: ManagementLayer;
  tags: Array<Scalars['String']['output']>;
};

/** IonscaleAuthKey(id, composition, layer, key, created_at, creator, ephemeral, tags) */
export type ManagementIonscaleAuthKeyFilter = {
  AND?: InputMaybe<ManagementIonscaleAuthKeyFilter>;
  DISTINCT?: InputMaybe<Scalars['Boolean']['input']>;
  NOT?: InputMaybe<ManagementIonscaleAuthKeyFilter>;
  OR?: InputMaybe<ManagementIonscaleAuthKeyFilter>;
  ephemeral?: InputMaybe<Scalars['Boolean']['input']>;
  ids?: InputMaybe<Array<Scalars['ID']['input']>>;
  layer?: InputMaybe<Scalars['ID']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
};

export type ManagementIonscaleAuthKeyOrder = {
  createdAt?: InputMaybe<Ordering>;
  ephemeral?: InputMaybe<Ordering>;
};

/** A KommunityPartner represents a pre-configured partner that can provide compositions and services to organizations. Partners can be auto-configured to automatically create compositions for new organizations. */
export type ManagementKommunityPartner = {
  __typename?: 'ManagementKommunityPartner';
  /** Check if this partner applies to the current user based on filter conditions. */
  appliesToMe: Scalars['Boolean']['output'];
  /** The authentication URL of the partner. */
  authUrl?: Maybe<Scalars['String']['output']>;
  /** Whether this partner should automatically create compositions for new organizations. */
  autoConfigure: Scalars['Boolean']['output'];
  /** The description of the partner. */
  description?: Maybe<Scalars['String']['output']>;
  /** Filter conditions that determine which users/organizations this partner applies to. Conditions include: email_domain_equals, email_domain_ends_with, username_equals, username_contains. */
  filterConfig?: Maybe<Scalars['JSON']['output']>;
  id: Scalars['ID']['output'];
  /** The unique identifier of the partner. */
  identifier: Scalars['String']['output'];
  /** The kind of kommunity (e.g., 'open', 'restricted', 'private'). */
  kommunityKind: Scalars['String']['output'];
  /** The logo URL of the partner. */
  logoUrl?: Maybe<Scalars['String']['output']>;
  /** The name of the partner. */
  name: Scalars['String']['output'];
  /** The OAuth2 client associated with this partner, if any. */
  oauthClient?: Maybe<ManagementOAuth2Client>;
  /** The kind of partner (e.g., 'preauthorized', 'oauth2'). */
  partnerKind: Scalars['String']['output'];
  /** The preconfigured composition manifest for this partner, if any. */
  preconfiguredComposition?: Maybe<Scalars['JSON']['output']>;
  /** The website URL of the partner. */
  websiteUrl?: Maybe<Scalars['String']['output']>;
};

/** KommunityPartner(id, name, description, logo_url, website_url, identifier, auth_url, oauth_client, partner_kind, kommunity_kind, auto_configure, preconfigured_composition, filter_config) */
export type ManagementKommunityPartnerFilter = {
  AND?: InputMaybe<ManagementKommunityPartnerFilter>;
  DISTINCT?: InputMaybe<Scalars['Boolean']['input']>;
  NOT?: InputMaybe<ManagementKommunityPartnerFilter>;
  OR?: InputMaybe<ManagementKommunityPartnerFilter>;
  applicableForMe?: InputMaybe<Scalars['Boolean']['input']>;
  autoConfigure?: InputMaybe<Scalars['Boolean']['input']>;
  hasPreconfiguredComposition?: InputMaybe<Scalars['Boolean']['input']>;
  ids?: InputMaybe<Array<Scalars['ID']['input']>>;
  search?: InputMaybe<Scalars['String']['input']>;
};

export type ManagementKommunityPartnerOrder = {
  createdAt?: InputMaybe<Ordering>;
  lastReportedAt?: InputMaybe<Ordering>;
  name?: InputMaybe<Ordering>;
};

/** A Layer is a transport layer that needs to be used to reach an alias. E.g a VPN layer or a Tor layer. */
export type ManagementLayer = {
  __typename?: 'ManagementLayer';
  /** The instances of the service. A service instance is a configured instance of a service. It will be configured by a configuration backend and will be used to send to the client as a configuration. It should never contain sensitive information. */
  aliases: Array<ManagementInstanceAlias>;
  /** The auth keys that are associated with this layer. */
  authKeys: Array<ManagementIonscaleAuthKey>;
  /** The description of the service. This should be a human readable description of the service. */
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  /** The kind of the layer. E.g. `VPN` or `TOR` */
  kind: LayerKind;
  /** The logo of the layer. This should be a url to a logo that can be used to represent the layer. */
  logo?: Maybe<ManagementMediaStore>;
  /** A specific machine associated with this layer (only works for IonscaleLayers) */
  machine?: Maybe<ManagementMachine>;
  /** The machines associated with this layer (only works for IonscaleLayers) */
  machines: Array<ManagementMachine>;
  /** The name of the layer */
  name: Scalars['String']['output'];
  /** The organization that owns this alias. */
  organization: ManagementOrganization;
  /** The tailnet name of the layer. This is only set for Ionscale layers. */
  tailnetName: Scalars['String']['output'];
};


/** A Layer is a transport layer that needs to be used to reach an alias. E.g a VPN layer or a Tor layer. */
export type ManagementLayerAliasesArgs = {
  filters?: InputMaybe<ManagementInstanceAliasFilter>;
  order?: InputMaybe<ManagementInstanceAliasOrder>;
  pagination?: InputMaybe<OffsetPaginationInput>;
};


/** A Layer is a transport layer that needs to be used to reach an alias. E.g a VPN layer or a Tor layer. */
export type ManagementLayerAuthKeysArgs = {
  filters?: InputMaybe<ManagementIonscaleAuthKeyFilter>;
  order?: InputMaybe<ManagementIonscaleAuthKeyOrder>;
  pagination?: InputMaybe<OffsetPaginationInput>;
};


/** A Layer is a transport layer that needs to be used to reach an alias. E.g a VPN layer or a Tor layer. */
export type ManagementLayerMachineArgs = {
  id: Scalars['String']['input'];
};

/** IonscaleLayer(id, name, identifier, organization, logo, description, dns_probe, get_probe, kind, layer_ptr, tailnet_name) */
export type ManagementLayerFilter = {
  AND?: InputMaybe<ManagementLayerFilter>;
  DISTINCT?: InputMaybe<Scalars['Boolean']['input']>;
  NOT?: InputMaybe<ManagementLayerFilter>;
  OR?: InputMaybe<ManagementLayerFilter>;
  ids?: InputMaybe<Array<Scalars['ID']['input']>>;
  organization?: InputMaybe<Scalars['ID']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
};

export type ManagementLayerOrder = {
  createdAt?: InputMaybe<Ordering>;
  lastReportedAt?: InputMaybe<Ordering>;
  name?: InputMaybe<Ordering>;
};

export type ManagementMachine = {
  __typename?: 'ManagementMachine';
  connected: Scalars['Boolean']['output'];
  ephemeral: Scalars['Boolean']['output'];
  id: Scalars['ID']['output'];
  ipv4?: Maybe<Scalars['String']['output']>;
  ipv6?: Maybe<Scalars['String']['output']>;
  lastSeen?: Maybe<Scalars['DateTime']['output']>;
  localId: Scalars['String']['output'];
  name: Scalars['String']['output'];
  tags: Array<Scalars['String']['output']>;
};

/**
 * Small helper around S3-backed stored objects.
 *
 * Provides convenience helpers for generating presigned URLs and
 * uploading content.
 */
export type ManagementMediaStore = {
  __typename?: 'ManagementMediaStore';
  bucket: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  key: Scalars['String']['output'];
  /** The stodre of the image */
  path: Scalars['String']['output'];
  presignedUrl: Scalars['String']['output'];
};


/**
 * Small helper around S3-backed stored objects.
 *
 * Provides convenience helpers for generating presigned URLs and
 * uploading content.
 */
export type ManagementMediaStorePresignedUrlArgs = {
  host?: InputMaybe<Scalars['String']['input']>;
};

/**
 *
 * A Membership is a relation between a User and an Organization. It can have multiple Roles assigned to it.
 *
 */
export type ManagementMembership = {
  __typename?: 'ManagementMembership';
  /** The invite that created this membership */
  createdThrough?: Maybe<ManagementInvite>;
  id: Scalars['ID']['output'];
  organization: ManagementOrganization;
  /** The roles that the user has in the organization */
  roles: Array<ManagementRole>;
  user: ManagementUser;
};


/**
 *
 * A Membership is a relation between a User and an Organization. It can have multiple Roles assigned to it.
 *
 */
export type ManagementMembershipRolesArgs = {
  filters?: InputMaybe<ManagementRoleFilter>;
  order?: InputMaybe<ManagementRoleOrder>;
  pagination?: InputMaybe<OffsetPaginationInput>;
};

/** A Membership of a User in an Organization with a Role */
export type ManagementMembershipFilter = {
  AND?: InputMaybe<ManagementMembershipFilter>;
  DISTINCT?: InputMaybe<Scalars['Boolean']['input']>;
  NOT?: InputMaybe<ManagementMembershipFilter>;
  OR?: InputMaybe<ManagementMembershipFilter>;
  ids?: InputMaybe<Array<Scalars['ID']['input']>>;
  organization?: InputMaybe<Scalars['ID']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
};

export type ManagementMembershipOrder = {
  createdAt?: InputMaybe<Ordering>;
  lastReportedAt?: InputMaybe<Ordering>;
  name?: InputMaybe<Ordering>;
};

/** An Organization is a group of users that can work together on a project. */
export type ManagementOAuth2Client = {
  __typename?: 'ManagementOAuth2Client';
  authorizationGrantType: Scalars['String']['output'];
  clientId: Scalars['String']['output'];
  clientType: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  redirectUris: Scalars['String']['output'];
  skipAuthorization: Scalars['Boolean']['output'];
};

/**
 *
 * An ORCID Account is a Social Account that maps to an ORCID Account. It provides information about the
 * user that is specific to the ORCID service. This includes the ORCID Identifier, the ORCID Preferences and
 * the ORCID Person. The ORCID Person contains information about the user that is specific to the ORCID service.
 * This includes the ORCID Activities, the ORCID Researcher URLs and the ORCID Addresses.
 *
 *
 */
export type ManagementOrcidAccount = ManagementSocialAccount & {
  __typename?: 'ManagementOrcidAccount';
  /** Extra data that is specific to the provider. This is a json field and can be used to store arbitrary data. */
  extraData: Scalars['ExtraData']['output'];
  id: Scalars['ID']['output'];
  /** The ORCID Identifier of the user. The UID of the account is the same as the path of the identifier. */
  identifier: ManagementOrcidIdentifier;
  /** Information about the person that is specific to the ORCID service. */
  person?: Maybe<ManagementOrcidPerson>;
  /** The provider of the account. This can be used to determine the type of the account. */
  provider: Scalars['String']['output'];
  /** The unique identifier of the account. This is unique for the provider. */
  uid: Scalars['String']['output'];
};

/** The ORCID Identifier of a user. This is a unique identifier that is used to identify a user on the ORCID service. It is composed of a uri, a path and a host. */
export type ManagementOrcidIdentifier = {
  __typename?: 'ManagementOrcidIdentifier';
  /** The host of the identifier */
  host: Scalars['String']['output'];
  /** The path of the identifier */
  path: Scalars['String']['output'];
  /** The uri of the identifier */
  uri: Scalars['String']['output'];
};

export type ManagementOrcidPerson = {
  __typename?: 'ManagementOrcidPerson';
  addresses: Array<Scalars['String']['output']>;
  researcherUrls: Array<Scalars['String']['output']>;
};

/** An Organization is a group of users that can work together on a project. */
export type ManagementOrganization = {
  __typename?: 'ManagementOrganization';
  /** The users that are currently active in the organization */
  activeUsers: Array<ManagementUser>;
  /** The clients that belong to this organization */
  clients: Array<ManagementClient>;
  /** A short description of the organization */
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  /** the invites for this organization */
  invites: Array<ManagementInvite>;
  /** the memberships of people */
  memberships: Array<ManagementMembership>;
  /** The name of this organization */
  name?: Maybe<Scalars['String']['output']>;
  /** The profile of the organization */
  profile?: Maybe<ManagementOrganizationProfile>;
  /** The roles that are available in the organization */
  roles: Array<ManagementRole>;
  /** The service instances that belong to this organization */
  serviceInstances: Array<ManagementServiceInstance>;
  slug: Scalars['String']['output'];
  /** The users that are part of the organization */
  users: Array<ManagementUser>;
};


/** An Organization is a group of users that can work together on a project. */
export type ManagementOrganizationActiveUsersArgs = {
  filters?: InputMaybe<UserFilter>;
  pagination?: InputMaybe<OffsetPaginationInput>;
};


/** An Organization is a group of users that can work together on a project. */
export type ManagementOrganizationClientsArgs = {
  filters?: InputMaybe<ManagementClientFilter>;
  order?: InputMaybe<ManagementClientOrder>;
  pagination?: InputMaybe<OffsetPaginationInput>;
};


/** An Organization is a group of users that can work together on a project. */
export type ManagementOrganizationInvitesArgs = {
  filters?: InputMaybe<OrganizationFilter>;
  pagination?: InputMaybe<OffsetPaginationInput>;
};


/** An Organization is a group of users that can work together on a project. */
export type ManagementOrganizationMembershipsArgs = {
  filters?: InputMaybe<ManagementMembershipFilter>;
  order?: InputMaybe<ManagementMembershipOrder>;
  pagination?: InputMaybe<OffsetPaginationInput>;
};


/** An Organization is a group of users that can work together on a project. */
export type ManagementOrganizationServiceInstancesArgs = {
  filters?: InputMaybe<ManagementServiceInstanceFilter>;
  order?: InputMaybe<ManagementServiceInstanceOrder>;
  pagination?: InputMaybe<OffsetPaginationInput>;
};


/** An Organization is a group of users that can work together on a project. */
export type ManagementOrganizationUsersArgs = {
  filters?: InputMaybe<UserFilter>;
  pagination?: InputMaybe<OffsetPaginationInput>;
};

/**
 *
 * A Profile of a User. A Profile can be used to display personalied information about a user.
 *
 *
 */
export type ManagementOrganizationProfile = {
  __typename?: 'ManagementOrganizationProfile';
  /** The avatar of the organization */
  avatar?: Maybe<ManagementMediaStore>;
  /** The banner of the organization */
  banner?: Maybe<ManagementMediaStore>;
  /** A short bio of the user */
  bio?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  /** The name of the user */
  name?: Maybe<Scalars['String']['output']>;
  organization: ManagementOrganization;
};

/**
 *
 * A Profile of a User. A Profile can be used to display personalied information about a user.
 *
 *
 */
export type ManagementProfile = {
  __typename?: 'ManagementProfile';
  /** The avatar of the user */
  avatar?: Maybe<ManagementMediaStore>;
  /** The banner of the user */
  banner?: Maybe<ManagementMediaStore>;
  /** A short bio of the user */
  bio?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  /** The name of the user */
  name?: Maybe<Scalars['String']['output']>;
};

/** A Public Source is a source of information about a client that is publicly available. E.g. a GitHub repository or a website. */
export type ManagementPublicSource = {
  __typename?: 'ManagementPublicSource';
  /** The kind of the public source. E.g. `github` or `website`. */
  kind: Scalars['String']['output'];
  /** The url of the public source. */
  url: Scalars['String']['output'];
};

/**
 * A redeem token is a token that can be used to redeem the rights to create
 * a client. It is used to give the recipient the right to create a client.
 *
 * If the token is not redeemed within the expires_at time, it will be invalid.
 * If the token has been redeemed, but the manifest has changed, the token will be invalid.
 */
export type ManagementRedeemToken = {
  __typename?: 'ManagementRedeemToken';
  /** The client that this redeem token belongs to. */
  client?: Maybe<ManagementClient>;
  id: Scalars['ID']['output'];
  /** The token of the redeem token */
  token: Scalars['String']['output'];
  /** The user that this redeem token belongs to. */
  user: ManagementUser;
};

/** A Release is a version of an app. Releases might change over time. E.g. a release might be updated to fix a bug, and the release might be updated to add a new feature. This is why they are the home for `scopes` and `requirements`, which might change over the release cycle. */
export type ManagementRelease = {
  __typename?: 'ManagementRelease';
  /** The app that this release belongs to. */
  app: ManagementApp;
  /** The clients of the release */
  clients: Array<ManagementClient>;
  id: Scalars['ID']['output'];
  /** The logo of the release. This should be a url to a logo that can be used to represent the release. */
  logo?: Maybe<ManagementMediaStore>;
  /** The name of the release. This should be a string that identifies the release beyond the version number. E.g. `canary`. */
  name: Scalars['String']['output'];
  /** The requirements of the release. Requirements are used to limit the access of a client to a user's data. They represent app-level permissions. */
  requirements: Array<Scalars['String']['output']>;
  /** The scopes of the release. Scopes are used to limit the access of a client to a user's data. They represent app-level permissions. */
  scopes: Array<Scalars['String']['output']>;
  /** The version of the release. This should be a string that identifies the version of the release. We enforce semantic versioning notation. E.g. `0.1.0`. The version is unique per app. */
  version: Scalars['Version']['output'];
};


/** A Release is a version of an app. Releases might change over time. E.g. a release might be updated to fix a bug, and the release might be updated to add a new feature. This is why they are the home for `scopes` and `requirements`, which might change over the release cycle. */
export type ManagementReleaseClientsArgs = {
  filters?: InputMaybe<ManagementClientFilter>;
  order?: InputMaybe<ManagementClientOrder>;
  pagination?: InputMaybe<OffsetPaginationInput>;
};

/** A Role is a set of permissions that can be assigned to a user. It is used to define what a user can do in the system. */
export type ManagementRole = {
  __typename?: 'ManagementRole';
  creatingInstance?: Maybe<ManagementServiceInstance>;
  description: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  identifier: Scalars['String']['output'];
  /** If this role is a built-in role that cannot be deleted (admin) */
  isBuiltin: Scalars['Boolean']['output'];
  /** The memberships that have this role */
  memberships: Array<ManagementMembership>;
  organization: ManagementOrganization;
  /** The service instances that use this role */
  usedBy: Array<ManagementServiceInstance>;
};


/** A Role is a set of permissions that can be assigned to a user. It is used to define what a user can do in the system. */
export type ManagementRoleMembershipsArgs = {
  filters?: InputMaybe<ManagementMembershipFilter>;
  order?: InputMaybe<ManagementMembershipOrder>;
  pagination?: InputMaybe<OffsetPaginationInput>;
};


/** A Role is a set of permissions that can be assigned to a user. It is used to define what a user can do in the system. */
export type ManagementRoleUsedByArgs = {
  filters?: InputMaybe<ManagementServiceInstanceFilter>;
  order?: InputMaybe<ManagementServiceInstanceOrder>;
  pagination?: InputMaybe<OffsetPaginationInput>;
};

/** Role(id, identifier, description, organization, creating_instance, is_builtin) */
export type ManagementRoleFilter = {
  AND?: InputMaybe<ManagementRoleFilter>;
  DISTINCT?: InputMaybe<Scalars['Boolean']['input']>;
  NOT?: InputMaybe<ManagementRoleFilter>;
  OR?: InputMaybe<ManagementRoleFilter>;
  creatingInstance?: InputMaybe<Scalars['ID']['input']>;
  ids?: InputMaybe<Array<Scalars['ID']['input']>>;
  organization?: InputMaybe<Scalars['ID']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
};

export type ManagementRoleOrder = {
  createdAt?: InputMaybe<Ordering>;
  name?: InputMaybe<Ordering>;
  updatedAt?: InputMaybe<Ordering>;
};

/** A Scope represents a permission or capability that can be granted to clients and users. It is used to define what access level a user or client has in the system. */
export type ManagementScope = {
  __typename?: 'ManagementScope';
  creatingInstance?: Maybe<ManagementServiceInstance>;
  description: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  identifier: Scalars['String']['output'];
  /** If this scope is a built-in scope that cannot be deleted (admin) */
  isBuiltin: Scalars['Boolean']['output'];
  /** The memberships that have this scope */
  memberships: Array<ManagementMembership>;
  organization: ManagementOrganization;
  /** The service instances that use this scope */
  usedBy: Array<ManagementServiceInstance>;
};


/** A Scope represents a permission or capability that can be granted to clients and users. It is used to define what access level a user or client has in the system. */
export type ManagementScopeMembershipsArgs = {
  filters?: InputMaybe<ManagementMembershipFilter>;
  order?: InputMaybe<ManagementMembershipOrder>;
  pagination?: InputMaybe<OffsetPaginationInput>;
};


/** A Scope represents a permission or capability that can be granted to clients and users. It is used to define what access level a user or client has in the system. */
export type ManagementScopeUsedByArgs = {
  filters?: InputMaybe<ManagementServiceInstanceFilter>;
  order?: InputMaybe<ManagementServiceInstanceOrder>;
  pagination?: InputMaybe<OffsetPaginationInput>;
};

/** Scope(id, identifier, description, organization, creating_instance, is_builtin) */
export type ManagementScopeFilter = {
  AND?: InputMaybe<ManagementScopeFilter>;
  DISTINCT?: InputMaybe<Scalars['Boolean']['input']>;
  NOT?: InputMaybe<ManagementScopeFilter>;
  OR?: InputMaybe<ManagementScopeFilter>;
  creatingInstance?: InputMaybe<Scalars['ID']['input']>;
  ids?: InputMaybe<Array<Scalars['ID']['input']>>;
  organization?: InputMaybe<Scalars['ID']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
};

export type ManagementScopeOrder = {
  createdAt?: InputMaybe<Ordering>;
  name?: InputMaybe<Ordering>;
  updatedAt?: InputMaybe<Ordering>;
};

/** A Service is a Webservice that a Client might want to access. It is not the configured instance of the service, but the service itself. */
export type ManagementService = {
  __typename?: 'ManagementService';
  /** The description of the service. This should be a human readable description of the service. */
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  /** The identifier of the service. This should be a globally unique string that identifies the service. We encourage you to use the reverse domain name notation. E.g. `com.example.myservice` */
  identifier: Scalars['ServiceIdentifier']['output'];
  /** The logo of the app. This should be a url to a logo that can be used to represent the app. */
  logo?: Maybe<ManagementMediaStore>;
  /** The name of the service */
  name: Scalars['String']['output'];
  /** The releases of the service. A service release is a configured instance of a service. It will be configured by a configuration backend and will be used to send to the client as a configuration. It should never contain sensitive information. */
  releases: Array<ManagementServiceRelease>;
};


/** A Service is a Webservice that a Client might want to access. It is not the configured instance of the service, but the service itself. */
export type ManagementServiceReleasesArgs = {
  filters?: InputMaybe<ServiceInstanceFilter>;
  pagination?: InputMaybe<OffsetPaginationInput>;
};

/** A ServiceDeviceCode is used for the device code flow for service instances. */
export type ManagementServiceDeviceCode = {
  __typename?: 'ManagementServiceDeviceCode';
  code: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  denied: Scalars['Boolean']['output'];
  expiresAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  instance?: Maybe<ManagementServiceInstance>;
  /** The staging aliases for this service device code */
  stagingAliases?: Maybe<Array<StagingAlias>>;
  /** The staging manifest for this service device code */
  stagingManifest?: Maybe<ManagementStagingServiceManifest>;
  user?: Maybe<ManagementUser>;
};

/** A ServiceInstance is a configured instance of a Service. It will be configured by a configuration backend and will be used to send to the client as a configuration. It should never contain sensitive information. */
export type ManagementServiceInstance = {
  __typename?: 'ManagementServiceInstance';
  /** The aliases of the instance. An alias is a way to reach the instance. Clients can use these aliases to check if they can reach the instance. An alias can be an absolute alias (e.g. 'example.com') or a relative alias (e.g. 'example.com/path'). If the alias is relative, it will be relative to the layer's domain, port and path. */
  aliases: Array<ManagementInstanceAlias>;
  /** The groups that are allowed to use this instance. */
  allowedGroups: Array<ManagementGroup>;
  /** The users that are allowed to use this instance. */
  allowedUsers: Array<ManagementUser>;
  /** The groups that are denied to use this instance. */
  deniedGroups: Array<ManagementGroup>;
  /** The users that are denied to use this instance. */
  deniedUsers: Array<ManagementUser>;
  /** The device that this instance is associated with, if any. */
  device?: Maybe<ManagementDevice>;
  id: Scalars['ID']['output'];
  /** The steward of the instance. The steward is the user who is responsible for this instance. */
  identifier: Scalars['String']['output'];
  /** The identifier of the instance. This is a unique string that identifies the instance. It is used to identify the instance in the code and in the database. */
  instanceId: Scalars['String']['output'];
  /** The logo of the app. This should be a url to a logo that can be used to represent the app. */
  logo?: Maybe<ManagementMediaStore>;
  /** The mappings of the composition. A mapping is a mapping of a service to a service instance. This is used to configure the composition. */
  mappings: Array<ManagementServiceInstanceMapping>;
  /** The organization that owns this instance. */
  organization: ManagementOrganization;
  /** The service that this instance belongs to. */
  release: ManagementServiceRelease;
  /** The roles that are associated with this instance. These roles will be assigned to users that are allowed to use this instance. */
  roles: Array<ManagementRole>;
  /** The scopes that are associated with this instance. These scopes will be assigned to users that are allowed to use this instance. */
  scopes: Array<ManagementScope>;
};


/** A ServiceInstance is a configured instance of a Service. It will be configured by a configuration backend and will be used to send to the client as a configuration. It should never contain sensitive information. */
export type ManagementServiceInstanceAliasesArgs = {
  filters?: InputMaybe<ManagementInstanceAliasFilter>;
  order?: InputMaybe<ManagementInstanceAliasOrder>;
  pagination?: InputMaybe<OffsetPaginationInput>;
};


/** A ServiceInstance is a configured instance of a Service. It will be configured by a configuration backend and will be used to send to the client as a configuration. It should never contain sensitive information. */
export type ManagementServiceInstanceAllowedGroupsArgs = {
  filters?: InputMaybe<GroupFilter>;
  pagination?: InputMaybe<OffsetPaginationInput>;
};


/** A ServiceInstance is a configured instance of a Service. It will be configured by a configuration backend and will be used to send to the client as a configuration. It should never contain sensitive information. */
export type ManagementServiceInstanceAllowedUsersArgs = {
  filters?: InputMaybe<UserFilter>;
  pagination?: InputMaybe<OffsetPaginationInput>;
};


/** A ServiceInstance is a configured instance of a Service. It will be configured by a configuration backend and will be used to send to the client as a configuration. It should never contain sensitive information. */
export type ManagementServiceInstanceDeniedGroupsArgs = {
  filters?: InputMaybe<GroupFilter>;
  pagination?: InputMaybe<OffsetPaginationInput>;
};


/** A ServiceInstance is a configured instance of a Service. It will be configured by a configuration backend and will be used to send to the client as a configuration. It should never contain sensitive information. */
export type ManagementServiceInstanceDeniedUsersArgs = {
  filters?: InputMaybe<UserFilter>;
  pagination?: InputMaybe<OffsetPaginationInput>;
};


/** A ServiceInstance is a configured instance of a Service. It will be configured by a configuration backend and will be used to send to the client as a configuration. It should never contain sensitive information. */
export type ManagementServiceInstanceMappingsArgs = {
  filters?: InputMaybe<ServiceInstanceMappingFilter>;
  pagination?: InputMaybe<OffsetPaginationInput>;
};


/** A ServiceInstance is a configured instance of a Service. It will be configured by a configuration backend and will be used to send to the client as a configuration. It should never contain sensitive information. */
export type ManagementServiceInstanceRolesArgs = {
  filters?: InputMaybe<ManagementRoleFilter>;
  order?: InputMaybe<ManagementRoleOrder>;
  pagination?: InputMaybe<OffsetPaginationInput>;
};


/** A ServiceInstance is a configured instance of a Service. It will be configured by a configuration backend and will be used to send to the client as a configuration. It should never contain sensitive information. */
export type ManagementServiceInstanceScopesArgs = {
  filters?: InputMaybe<ManagementScopeFilter>;
  order?: InputMaybe<ManagementScopeOrder>;
  pagination?: InputMaybe<OffsetPaginationInput>;
};

/** ServiceInstance(id, composition, release, logo, instance_id, private_key, steward, organization, device, template, public_key, token) */
export type ManagementServiceInstanceFilter = {
  AND?: InputMaybe<ManagementServiceInstanceFilter>;
  DISTINCT?: InputMaybe<Scalars['Boolean']['input']>;
  NOT?: InputMaybe<ManagementServiceInstanceFilter>;
  OR?: InputMaybe<ManagementServiceInstanceFilter>;
  ids?: InputMaybe<Array<Scalars['ID']['input']>>;
  /** The organization that owns this instance. If null the instance is global. */
  organization?: InputMaybe<Scalars['ID']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
};

/** A ServiceInstance is a configured instance of a Service. It will be configured by a configuration backend and will be used to send to the client as a configuration. It should never contain sensitive information. */
export type ManagementServiceInstanceMapping = {
  __typename?: 'ManagementServiceInstanceMapping';
  /** The client that this instance belongs to. */
  client: ManagementClient;
  id: Scalars['ID']['output'];
  /** The service that this instance belongs to. */
  instance: ManagementServiceInstance;
  /** The key of the instance. This is a unique string that identifies the instance. It is used to identify the instance in the code and in the database. */
  key: Scalars['String']['output'];
  /** Is this mapping optional? If a mapping is optional, you can configure the client without this mapping. */
  optional: Scalars['Boolean']['output'];
};

export type ManagementServiceInstanceOrder = {
  createdAt?: InputMaybe<Ordering>;
  name?: InputMaybe<Ordering>;
  updatedAt?: InputMaybe<Ordering>;
};

/** A ServiceInstance is a configured instance of a Service. It will be configured by a configuration backend and will be used to send to the client as a configuration. It should never contain sensitive information. */
export type ManagementServiceRelease = {
  __typename?: 'ManagementServiceRelease';
  id: Scalars['ID']['output'];
  /** The instances of the service release. A service instance is a configured instance of a service. It will be configured by a configuration backend and will be used to send to the client as a configuration. It should never contain sensitive information. */
  instances: Array<ManagementServiceInstance>;
  /** The service that this instance belongs to. */
  service: ManagementService;
  /** The version of the service release. */
  version: Scalars['String']['output'];
};


/** A ServiceInstance is a configured instance of a Service. It will be configured by a configuration backend and will be used to send to the client as a configuration. It should never contain sensitive information. */
export type ManagementServiceReleaseInstancesArgs = {
  filters?: InputMaybe<ManagementServiceInstanceFilter>;
  order?: InputMaybe<ManagementServiceInstanceOrder>;
  pagination?: InputMaybe<OffsetPaginationInput>;
};

/**
 *
 * A Social Account is an account that is associated with a user. It can be used to authenticate the user with external services. It
 * can be used to store extra data about the user that is specific to the provider. We provide typed access to the extra data for
 * some providers. For others we provide a generic json field that can be used to store arbitrary data. Generic accounts are
 * always available, but typed accounts are only available for some providers.
 *
 */
export type ManagementSocialAccount = {
  /** Extra data that is specific to the provider. This is a json field and can be used to store arbitrary data. */
  extraData: Scalars['ExtraData']['output'];
  id: Scalars['ID']['output'];
  /** The provider of the account. This can be used to determine the type of the account. */
  provider: Scalars['String']['output'];
  /** The unique identifier of the account. This is unique for the provider. */
  uid: Scalars['String']['output'];
};

export type ManagementStagingClientRequest = {
  __typename?: 'ManagementStagingClientRequest';
  description?: Maybe<Scalars['String']['output']>;
  identifier: Scalars['String']['output'];
  manifest: ManagementStagingManifest;
};

export type ManagementStagingInstanceRequest = {
  __typename?: 'ManagementStagingInstanceRequest';
  aliases?: Maybe<Array<StagingAlias>>;
  description?: Maybe<Scalars['String']['output']>;
  identifier: Scalars['String']['output'];
  manifest: ManagementStagingServiceManifest;
};

export type ManagementStagingManifest = {
  __typename?: 'ManagementStagingManifest';
  description?: Maybe<Scalars['String']['output']>;
  identifier: Scalars['String']['output'];
  logo?: Maybe<Scalars['String']['output']>;
  nodeId: Scalars['ID']['output'];
  publicSources?: Maybe<Array<ManagementStagingPublicSource>>;
  repoUrl?: Maybe<Scalars['String']['output']>;
  requirements: Array<ManagementStagingRequirement>;
  scopes: Array<Scalars['String']['output']>;
  url?: Maybe<Scalars['String']['output']>;
  version: Scalars['String']['output'];
};

export type ManagementStagingPublicSource = {
  __typename?: 'ManagementStagingPublicSource';
  kind: Scalars['String']['output'];
  url: Scalars['String']['output'];
};

export type ManagementStagingRequirement = {
  __typename?: 'ManagementStagingRequirement';
  description?: Maybe<Scalars['String']['output']>;
  key: Scalars['String']['output'];
  optional: Scalars['Boolean']['output'];
  service: Scalars['String']['output'];
};

export type ManagementStagingServiceManifest = {
  __typename?: 'ManagementStagingServiceManifest';
  description?: Maybe<Scalars['String']['output']>;
  identifier: Scalars['String']['output'];
  instanceId: Scalars['String']['output'];
  logo?: Maybe<Scalars['String']['output']>;
  nodeId: Scalars['ID']['output'];
  publicSources: Array<ManagementStagingPublicSource>;
  roles?: Maybe<Array<StagingRole>>;
  scopes?: Maybe<Array<StagingScope>>;
  version: Scalars['String']['output'];
};

/** Docstring for UsedAlias */
export type ManagementUsedAlias = {
  __typename?: 'ManagementUsedAlias';
  /** The alias that is used. */
  alias?: Maybe<ManagementInstanceAlias>;
  /** The client that is using the alias. */
  client: ManagementClient;
  id: Scalars['ID']['output'];
  key: Scalars['String']['output'];
  /** If the alias is not valid, the reason why it is not valid. */
  reason?: Maybe<Scalars['String']['output']>;
  /** Is the alias valid for the client? */
  valid: Scalars['Boolean']['output'];
};

/**
 *
 * A User is a person that can log in to the system. They are uniquely identified by their username.
 * And can have an email address associated with them (but don't have to).
 *
 * A user can be assigned to groups and has a profile that can be used to display information about them.
 * Detail information about a user can be found in the profile.
 *
 * All users can have social accounts associated with them. These are used to authenticate the user with external services,
 * such as ORCID or GitHub.
 *
 *
 */
export type ManagementUser = {
  __typename?: 'ManagementUser';
  avatar?: Maybe<Scalars['String']['output']>;
  /** The communication channels that the user has */
  comChannels: Array<ManagementComChannel>;
  email?: Maybe<Scalars['String']['output']>;
  firstName?: Maybe<Scalars['String']['output']>;
  /** The groups this user belongs to. A user will get all permissions granted to each of their groups. */
  groups: Array<ManagementGroup>;
  id: Scalars['ID']['output'];
  lastName?: Maybe<Scalars['String']['output']>;
  /** The memberships of the user in organizations */
  memberships: Array<ManagementMembership>;
  profile: ManagementProfile;
  /** The full name of the user */
  socialAccounts: Array<ManagementSocialAccount>;
  /** Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only. */
  username: Scalars['String']['output'];
};


/**
 *
 * A User is a person that can log in to the system. They are uniquely identified by their username.
 * And can have an email address associated with them (but don't have to).
 *
 * A user can be assigned to groups and has a profile that can be used to display information about them.
 * Detail information about a user can be found in the profile.
 *
 * All users can have social accounts associated with them. These are used to authenticate the user with external services,
 * such as ORCID or GitHub.
 *
 *
 */
export type ManagementUserComChannelsArgs = {
  filters?: InputMaybe<OrganizationFilter>;
  pagination?: InputMaybe<OffsetPaginationInput>;
};


/**
 *
 * A User is a person that can log in to the system. They are uniquely identified by their username.
 * And can have an email address associated with them (but don't have to).
 *
 * A user can be assigned to groups and has a profile that can be used to display information about them.
 * Detail information about a user can be found in the profile.
 *
 * All users can have social accounts associated with them. These are used to authenticate the user with external services,
 * such as ORCID or GitHub.
 *
 *
 */
export type ManagementUserGroupsArgs = {
  filters?: InputMaybe<GroupFilter>;
  pagination?: InputMaybe<OffsetPaginationInput>;
};


/**
 *
 * A User is a person that can log in to the system. They are uniquely identified by their username.
 * And can have an email address associated with them (but don't have to).
 *
 * A user can be assigned to groups and has a profile that can be used to display information about them.
 * Detail information about a user can be found in the profile.
 *
 * All users can have social accounts associated with them. These are used to authenticate the user with external services,
 * such as ORCID or GitHub.
 *
 *
 */
export type ManagementUserMembershipsArgs = {
  filters?: InputMaybe<ManagementMembershipFilter>;
  order?: InputMaybe<ManagementMembershipOrder>;
  pagination?: InputMaybe<OffsetPaginationInput>;
};

export type Mutation = {
  __typename?: 'Mutation';
  acceptAuthorizeCode: Scalars['String']['output'];
  acceptCompositionDeviceCode: ManagementComposition;
  acceptDeviceCode: ManagementClient;
  acceptInvite: ManagementMembership;
  acceptServiceDeviceCode: ManagementServiceInstance;
  addDeviceToGroup: ManagementDevice;
  cancelInvite: ManagementInvite;
  changeOrganizationOwner: ManagementOrganization;
  createAlias: ManagementInstanceAlias;
  createDevice: ManagementDevice;
  createDeviceGroup: ManagementDeviceGroup;
  createInvite: ManagementInvite;
  createIonscaleAuthKey: ManagementIonscaleAuthKey;
  createIonscaleLayer: ManagementLayer;
  createOrganization: ManagementOrganization;
  createOrganizationProfile: ManagementOrganizationProfile;
  createProfile: ManagementProfile;
  declineAuthorizeCode: Scalars['String']['output'];
  declineCompositionDeviceCode: ManagementCompositionDeviceCode;
  declineDeviceCode: ManagementDeviceCode;
  /** Decline an invite to join an organization. */
  declineInvite: ManagementInvite;
  declineServiceDeviceCode: ManagementServiceDeviceCode;
  deleteAlias: Scalars['ID']['output'];
  deleteComposition: Scalars['ID']['output'];
  deleteDevice: Scalars['ID']['output'];
  deleteDeviceGroup: Scalars['ID']['output'];
  deleteIonscaleLayer: Scalars['ID']['output'];
  deleteMembership: Scalars['ID']['output'];
  deleteOrganization: Scalars['ID']['output'];
  deleteOrganizationProfile: Scalars['ID']['output'];
  deleteProfile: Scalars['ID']['output'];
  requestMediaUpload: PresignedPostCredentials;
  updateAlias: ManagementInstanceAlias;
  updateComposition: ManagementComposition;
  updateDevice: ManagementDevice;
  updateIonscaleLayer: ManagementLayer;
  updateMembership: ManagementMembership;
  updateOrganization: ManagementOrganization;
  updateOrganizationProfile: ManagementOrganizationProfile;
  updateProfile: ManagementProfile;
};


export type MutationAcceptAuthorizeCodeArgs = {
  input: AcceptAuthorizeCodeInput;
};


export type MutationAcceptCompositionDeviceCodeArgs = {
  input: AcceptCompositionDeviceCodeInput;
};


export type MutationAcceptDeviceCodeArgs = {
  input: AcceptDeviceCodeInput;
};


export type MutationAcceptInviteArgs = {
  input: AcceptInviteInput;
};


export type MutationAcceptServiceDeviceCodeArgs = {
  input: AcceptServiceDeviceCodeInput;
};


export type MutationAddDeviceToGroupArgs = {
  input: AddDeviceToGroupInput;
};


export type MutationCancelInviteArgs = {
  input: CancelInviteInput;
};


export type MutationChangeOrganizationOwnerArgs = {
  newOwnerId: Scalars['ID']['input'];
  organizationId: Scalars['ID']['input'];
};


export type MutationCreateAliasArgs = {
  input: CreateAliasInput;
};


export type MutationCreateDeviceArgs = {
  input: CreateDeviceInput;
};


export type MutationCreateDeviceGroupArgs = {
  input: CreateDeviceGroupInput;
};


export type MutationCreateInviteArgs = {
  input: CreateInviteInput;
};


export type MutationCreateIonscaleAuthKeyArgs = {
  input: CreateIonscaleAuthKeyInput;
};


export type MutationCreateIonscaleLayerArgs = {
  input: CreateIonscaleLayerInput;
};


export type MutationCreateOrganizationArgs = {
  input: CreateOrganizationInput;
};


export type MutationCreateOrganizationProfileArgs = {
  input: CreateOrganizationProfileInput;
};


export type MutationCreateProfileArgs = {
  input: CreateProfileInput;
};


export type MutationDeclineAuthorizeCodeArgs = {
  input: DeclineAuthorizeCodeInput;
};


export type MutationDeclineCompositionDeviceCodeArgs = {
  input: DeclineCompositionDeviceCodeInput;
};


export type MutationDeclineDeviceCodeArgs = {
  input: DeclineDeviceCodeInput;
};


export type MutationDeclineInviteArgs = {
  input: DeclineInviteInput;
};


export type MutationDeclineServiceDeviceCodeArgs = {
  input: DeclineServiceDeviceCodeInput;
};


export type MutationDeleteAliasArgs = {
  input: DeleteAliasInput;
};


export type MutationDeleteCompositionArgs = {
  input: DeleteCompositionInput;
};


export type MutationDeleteDeviceArgs = {
  input: DeleteDeviceInput;
};


export type MutationDeleteDeviceGroupArgs = {
  input: DeleteDeviceGroupInput;
};


export type MutationDeleteIonscaleLayerArgs = {
  input: DeleteIonscaleLayerInput;
};


export type MutationDeleteMembershipArgs = {
  input: DeleteMembershipInput;
};


export type MutationDeleteOrganizationArgs = {
  input: DeleteOrganizationInput;
};


export type MutationDeleteOrganizationProfileArgs = {
  input: DeleteOrganizationProfileInput;
};


export type MutationDeleteProfileArgs = {
  input: DeleteProfileInput;
};


export type MutationRequestMediaUploadArgs = {
  input: RequestMediaUploadInput;
};


export type MutationUpdateAliasArgs = {
  input: UpdateAliasInput;
};


export type MutationUpdateCompositionArgs = {
  input: UpdateCompositionInput;
};


export type MutationUpdateDeviceArgs = {
  input: UpdateDeviceInput;
};


export type MutationUpdateIonscaleLayerArgs = {
  input: UpdateIonscaleLayerInput;
};


export type MutationUpdateMembershipArgs = {
  input: UpdateMembershipInput;
};


export type MutationUpdateOrganizationArgs = {
  input: UpdateOrganizationInput;
};


export type MutationUpdateOrganizationProfileArgs = {
  input: UpdateOrganizationProfileInput;
};


export type MutationUpdateProfileArgs = {
  input: UpdateProfileInput;
};

export type OffsetPaginationInput = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: Scalars['Int']['input'];
};

export enum Ordering {
  Asc = 'ASC',
  AscNullsFirst = 'ASC_NULLS_FIRST',
  AscNullsLast = 'ASC_NULLS_LAST',
  Desc = 'DESC',
  DescNullsFirst = 'DESC_NULLS_FIRST',
  DescNullsLast = 'DESC_NULLS_LAST'
}

/** __doc__ */
export type OrganizationFilter = {
  AND?: InputMaybe<OrganizationFilter>;
  DISTINCT?: InputMaybe<Scalars['Boolean']['input']>;
  NOT?: InputMaybe<OrganizationFilter>;
  OR?: InputMaybe<OrganizationFilter>;
  ids?: InputMaybe<Array<Scalars['ID']['input']>>;
  name?: InputMaybe<StrFilterLookup>;
  search?: InputMaybe<Scalars['String']['input']>;
};

/** Result of validating a device code against an organization */
export type PotentialMapping = {
  __typename?: 'PotentialMapping';
  key: Scalars['String']['output'];
  reason?: Maybe<Scalars['String']['output']>;
  serviceInstance?: Maybe<ManagementServiceInstance>;
};

/** Temporary Credentials for a file upload that can be used by a Client (e.g. in a python datalayer) */
export type PresignedPostCredentials = {
  __typename?: 'PresignedPostCredentials';
  bucket: Scalars['String']['output'];
  datalayer: Scalars['String']['output'];
  key: Scalars['String']['output'];
  policy: Scalars['String']['output'];
  store: Scalars['String']['output'];
  xAmzAlgorithm: Scalars['String']['output'];
  xAmzCredential: Scalars['String']['output'];
  xAmzDate: Scalars['String']['output'];
  xAmzSignature: Scalars['String']['output'];
};

export type Query = {
  __typename?: 'Query';
  _service: _Service;
  app: ManagementApp;
  apps: Array<ManagementApp>;
  client: ManagementClient;
  clients: Array<ManagementClient>;
  composition: ManagementComposition;
  compositionDeviceCode: ManagementCompositionDeviceCode;
  compositionDeviceCodeByCode: ManagementCompositionDeviceCode;
  compositions: Array<ManagementComposition>;
  device: ManagementDevice;
  deviceCode: ManagementDeviceCode;
  deviceCodeByCode: ManagementDeviceCode;
  deviceGroup: ManagementDeviceGroup;
  deviceGroups: Array<ManagementDeviceGroup>;
  devices: Array<ManagementDevice>;
  friends: Array<ManagementUser>;
  instanceAlias: ManagementInstanceAlias;
  instanceAliases: Array<ManagementInstanceAlias>;
  invite: ManagementInvite;
  inviteByCode: ManagementInvite;
  ionscaleAuthKey: ManagementIonscaleAuthKey;
  ionscaleAuthKeys: Array<ManagementIonscaleAuthKey>;
  kommunityPartner: ManagementKommunityPartner;
  kommunityPartners: Array<ManagementKommunityPartner>;
  layer: ManagementLayer;
  layers: Array<ManagementLayer>;
  machine: ManagementMachine;
  managementLayers: Array<ManagementLayer>;
  me: ManagementUser;
  membership: ManagementMembership;
  memberships: Array<ManagementMembership>;
  oauth2ClientByClientId: ManagementOAuth2Client;
  organization: ManagementOrganization;
  organizations: Array<ManagementOrganization>;
  redeemTokens: Array<ManagementRedeemToken>;
  release: ManagementRelease;
  releases: Array<ManagementRelease>;
  role: ManagementRole;
  roles: Array<ManagementRole>;
  scope: ManagementScope;
  scopes: Array<ManagementScope>;
  service: ManagementService;
  serviceDeviceCode: ManagementServiceDeviceCode;
  serviceDeviceCodeByCode: ManagementServiceDeviceCode;
  serviceInstance: ManagementServiceInstance;
  serviceInstanceMapping: ManagementServiceInstanceMapping;
  serviceInstanceMappings: Array<ManagementServiceInstanceMapping>;
  serviceInstances: Array<ManagementServiceInstance>;
  serviceRelease: ManagementServiceRelease;
  serviceReleases: Array<ManagementServiceRelease>;
  services: Array<ManagementService>;
  socialAccount: ManagementSocialAccount;
  socialAccounts: Array<ManagementSocialAccount>;
  usedAlias: ManagementUsedAlias;
  usedAliases: Array<ManagementUsedAlias>;
  validateDeviceCode: ValidationResult;
};


export type QueryAppArgs = {
  id: Scalars['ID']['input'];
};


export type QueryAppsArgs = {
  filters?: InputMaybe<AppFilter>;
  pagination?: InputMaybe<OffsetPaginationInput>;
};


export type QueryClientArgs = {
  id: Scalars['ID']['input'];
};


export type QueryClientsArgs = {
  filters?: InputMaybe<ManagementClientFilter>;
  order?: InputMaybe<ManagementClientOrder>;
  pagination?: InputMaybe<OffsetPaginationInput>;
};


export type QueryCompositionArgs = {
  id: Scalars['ID']['input'];
};


export type QueryCompositionDeviceCodeArgs = {
  id: Scalars['ID']['input'];
};


export type QueryCompositionDeviceCodeByCodeArgs = {
  code: Scalars['String']['input'];
};


export type QueryCompositionsArgs = {
  filters?: InputMaybe<ManagementCompositionFilter>;
  order?: InputMaybe<ManagementCompositionOrder>;
  pagination?: InputMaybe<OffsetPaginationInput>;
};


export type QueryDeviceArgs = {
  id: Scalars['ID']['input'];
};


export type QueryDeviceCodeArgs = {
  id: Scalars['ID']['input'];
};


export type QueryDeviceCodeByCodeArgs = {
  deviceCode: Scalars['String']['input'];
};


export type QueryDeviceGroupArgs = {
  id: Scalars['ID']['input'];
};


export type QueryDeviceGroupsArgs = {
  filters?: InputMaybe<ManagementDeviceGroupFilter>;
  order?: InputMaybe<ManagementDeviceGroupOrder>;
  pagination?: InputMaybe<OffsetPaginationInput>;
};


export type QueryDevicesArgs = {
  filters?: InputMaybe<ManagementDeviceFilter>;
  order?: InputMaybe<ManagementDeviceOrder>;
  pagination?: InputMaybe<OffsetPaginationInput>;
};


export type QueryFriendsArgs = {
  filters?: InputMaybe<UserFilter>;
  pagination?: InputMaybe<OffsetPaginationInput>;
};


export type QueryInstanceAliasArgs = {
  id: Scalars['ID']['input'];
};


export type QueryInstanceAliasesArgs = {
  filters?: InputMaybe<ManagementInstanceAliasFilter>;
  order?: InputMaybe<ManagementInstanceAliasOrder>;
  pagination?: InputMaybe<OffsetPaginationInput>;
};


export type QueryInviteArgs = {
  id: Scalars['ID']['input'];
};


export type QueryInviteByCodeArgs = {
  inviteCode: Scalars['String']['input'];
};


export type QueryIonscaleAuthKeyArgs = {
  id: Scalars['ID']['input'];
};


export type QueryIonscaleAuthKeysArgs = {
  filters?: InputMaybe<ManagementIonscaleAuthKeyFilter>;
  order?: InputMaybe<ManagementIonscaleAuthKeyOrder>;
  pagination?: InputMaybe<OffsetPaginationInput>;
};


export type QueryKommunityPartnerArgs = {
  id: Scalars['ID']['input'];
};


export type QueryKommunityPartnersArgs = {
  filters?: InputMaybe<ManagementKommunityPartnerFilter>;
  order?: InputMaybe<ManagementKommunityPartnerOrder>;
  pagination?: InputMaybe<OffsetPaginationInput>;
};


export type QueryLayerArgs = {
  id: Scalars['ID']['input'];
};


export type QueryLayersArgs = {
  filters?: InputMaybe<ManagementLayerFilter>;
  order?: InputMaybe<ManagementLayerOrder>;
  pagination?: InputMaybe<OffsetPaginationInput>;
};


export type QueryMachineArgs = {
  id: Scalars['ID']['input'];
};


export type QueryManagementLayersArgs = {
  filters?: InputMaybe<ManagementLayerFilter>;
  order?: InputMaybe<ManagementLayerOrder>;
  pagination?: InputMaybe<OffsetPaginationInput>;
};


export type QueryMembershipArgs = {
  id: Scalars['ID']['input'];
};


export type QueryMembershipsArgs = {
  filters?: InputMaybe<ManagementMembershipFilter>;
  order?: InputMaybe<ManagementMembershipOrder>;
  pagination?: InputMaybe<OffsetPaginationInput>;
};


export type QueryOauth2ClientByClientIdArgs = {
  clientId: Scalars['String']['input'];
};


export type QueryOrganizationArgs = {
  id: Scalars['ID']['input'];
};


export type QueryOrganizationsArgs = {
  filters?: InputMaybe<OrganizationFilter>;
  pagination?: InputMaybe<OffsetPaginationInput>;
};


export type QueryRedeemTokensArgs = {
  pagination?: InputMaybe<OffsetPaginationInput>;
};


export type QueryReleaseArgs = {
  id: Scalars['ID']['input'];
};


export type QueryRoleArgs = {
  id: Scalars['ID']['input'];
};


export type QueryRolesArgs = {
  filters?: InputMaybe<ManagementRoleFilter>;
  order?: InputMaybe<ManagementRoleOrder>;
  pagination?: InputMaybe<OffsetPaginationInput>;
};


export type QueryScopeArgs = {
  id: Scalars['ID']['input'];
};


export type QueryScopesArgs = {
  filters?: InputMaybe<ManagementScopeFilter>;
  order?: InputMaybe<ManagementScopeOrder>;
  pagination?: InputMaybe<OffsetPaginationInput>;
};


export type QueryServiceArgs = {
  id: Scalars['ID']['input'];
};


export type QueryServiceDeviceCodeArgs = {
  id: Scalars['ID']['input'];
};


export type QueryServiceDeviceCodeByCodeArgs = {
  code: Scalars['String']['input'];
};


export type QueryServiceInstanceArgs = {
  id: Scalars['ID']['input'];
};


export type QueryServiceInstanceMappingArgs = {
  id: Scalars['ID']['input'];
};


export type QueryServiceInstanceMappingsArgs = {
  filters?: InputMaybe<ServiceInstanceMappingFilter>;
  pagination?: InputMaybe<OffsetPaginationInput>;
};


export type QueryServiceInstancesArgs = {
  filters?: InputMaybe<ManagementServiceInstanceFilter>;
  order?: InputMaybe<ManagementServiceInstanceOrder>;
  pagination?: InputMaybe<OffsetPaginationInput>;
};


export type QueryServiceReleaseArgs = {
  id: Scalars['ID']['input'];
};


export type QueryServiceReleasesArgs = {
  filters?: InputMaybe<ServiceInstanceFilter>;
  pagination?: InputMaybe<OffsetPaginationInput>;
};


export type QueryServicesArgs = {
  filters?: InputMaybe<ServiceFilter>;
  pagination?: InputMaybe<OffsetPaginationInput>;
};


export type QuerySocialAccountArgs = {
  id: Scalars['ID']['input'];
};


export type QueryUsedAliasArgs = {
  id: Scalars['ID']['input'];
};


export type QueryUsedAliasesArgs = {
  filters?: InputMaybe<ManagementDeviceFilter>;
  pagination?: InputMaybe<OffsetPaginationInput>;
};


export type QueryValidateDeviceCodeArgs = {
  composition: Scalars['ID']['input'];
  deviceCode: Scalars['ID']['input'];
};

export type RequestMediaUploadInput = {
  datalayer: Scalars['String']['input'];
  key: Scalars['String']['input'];
};

/** Service(id, name, identifier, logo, description) */
export type ServiceFilter = {
  AND?: InputMaybe<ServiceFilter>;
  DISTINCT?: InputMaybe<Scalars['Boolean']['input']>;
  NOT?: InputMaybe<ServiceFilter>;
  OR?: InputMaybe<ServiceFilter>;
  ids?: InputMaybe<Array<Scalars['ID']['input']>>;
  search?: InputMaybe<Scalars['String']['input']>;
};

/** ServiceInstance(id, composition, release, logo, instance_id, private_key, steward, organization, device, template, public_key, token) */
export type ServiceInstanceFilter = {
  AND?: InputMaybe<ServiceInstanceFilter>;
  DISTINCT?: InputMaybe<Scalars['Boolean']['input']>;
  NOT?: InputMaybe<ServiceInstanceFilter>;
  OR?: InputMaybe<ServiceInstanceFilter>;
  ids?: InputMaybe<Array<Scalars['ID']['input']>>;
  search?: InputMaybe<Scalars['String']['input']>;
};

/** ServiceInstanceMapping(id, client, instance, key, description, optional) */
export type ServiceInstanceMappingFilter = {
  AND?: InputMaybe<ServiceInstanceMappingFilter>;
  DISTINCT?: InputMaybe<Scalars['Boolean']['input']>;
  NOT?: InputMaybe<ServiceInstanceMappingFilter>;
  OR?: InputMaybe<ServiceInstanceMappingFilter>;
  ids?: InputMaybe<Array<Scalars['ID']['input']>>;
  organization?: InputMaybe<Scalars['ID']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
};

export type StagingAlias = {
  __typename?: 'StagingAlias';
  challenge?: Maybe<Scalars['String']['output']>;
  host?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  kind: Scalars['String']['output'];
  name?: Maybe<Scalars['String']['output']>;
  path?: Maybe<Scalars['String']['output']>;
  port?: Maybe<Scalars['Int']['output']>;
  scope: Scalars['String']['output'];
  ssl: Scalars['Boolean']['output'];
};

export type StagingRole = {
  __typename?: 'StagingRole';
  description?: Maybe<Scalars['String']['output']>;
  key: Scalars['String']['output'];
};

export type StagingScope = {
  __typename?: 'StagingScope';
  description?: Maybe<Scalars['String']['output']>;
  key: Scalars['String']['output'];
};

export type StrFilterLookup = {
  contains?: InputMaybe<Scalars['String']['input']>;
  endsWith?: InputMaybe<Scalars['String']['input']>;
  exact?: InputMaybe<Scalars['String']['input']>;
  gt?: InputMaybe<Scalars['String']['input']>;
  gte?: InputMaybe<Scalars['String']['input']>;
  iContains?: InputMaybe<Scalars['String']['input']>;
  iEndsWith?: InputMaybe<Scalars['String']['input']>;
  iExact?: InputMaybe<Scalars['String']['input']>;
  iRegex?: InputMaybe<Scalars['String']['input']>;
  iStartsWith?: InputMaybe<Scalars['String']['input']>;
  inList?: InputMaybe<Array<Scalars['String']['input']>>;
  isNull?: InputMaybe<Scalars['Boolean']['input']>;
  lt?: InputMaybe<Scalars['String']['input']>;
  lte?: InputMaybe<Scalars['String']['input']>;
  range?: InputMaybe<Array<Scalars['String']['input']>>;
  regex?: InputMaybe<Scalars['String']['input']>;
  startsWith?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateAliasInput = {
  host: Scalars['String']['input'];
  id: Scalars['ID']['input'];
  kind: Scalars['String']['input'];
  path?: InputMaybe<Scalars['String']['input']>;
  port: Scalars['Int']['input'];
};

export type UpdateCompositionInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateDeviceInput = {
  id: Scalars['ID']['input'];
  name: Scalars['String']['input'];
};

export type UpdateIonscaleLayerInput = {
  /** List of membership IDs to block from accessing this layer. */
  blockedFor?: InputMaybe<Array<Scalars['ID']['input']>>;
  /** The description of the tailnet layer. */
  description?: InputMaybe<Scalars['String']['input']>;
  /** The ID of the Ionscale layer to update. */
  id: Scalars['ID']['input'];
  /** The name of the tailnet layer. */
  name?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateMembershipInput = {
  id: Scalars['ID']['input'];
  roles?: InputMaybe<Array<Scalars['ID']['input']>>;
};

export type UpdateOrganizationInput = {
  avatar?: InputMaybe<Scalars['ID']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  setupKommunityPartners?: Scalars['Boolean']['input'];
  slug?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateOrganizationProfileInput = {
  avatar?: InputMaybe<Scalars['ID']['input']>;
  banner?: InputMaybe<Scalars['ID']['input']>;
  id: Scalars['ID']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateProfileInput = {
  avatar?: InputMaybe<Scalars['ID']['input']>;
  banner?: InputMaybe<Scalars['ID']['input']>;
  id: Scalars['ID']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
};

/**
 * A User of the System
 *
 * Lok Users are the main users of the system. They can be assigned to groups and have profiles, that can be used to display information about them.
 * Each user is identifier by a unique username, and can have an email address associated with them.
 */
export type UserFilter = {
  AND?: InputMaybe<UserFilter>;
  DISTINCT?: InputMaybe<Scalars['Boolean']['input']>;
  NOT?: InputMaybe<UserFilter>;
  OR?: InputMaybe<UserFilter>;
  ids?: InputMaybe<Array<Scalars['ID']['input']>>;
  search?: InputMaybe<Scalars['String']['input']>;
  /** Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only. */
  username?: InputMaybe<StrFilterLookup>;
};

export type ValidationResult = {
  __typename?: 'ValidationResult';
  mappings: Array<PotentialMapping>;
  reason?: Maybe<Scalars['String']['output']>;
  valid: Scalars['Boolean']['output'];
};

export type _Service = {
  __typename?: '_Service';
  sdl: Scalars['String']['output'];
};

export type InstanceAliasFragment = { __typename?: 'ManagementInstanceAlias', id: string, host?: string | null, port?: number | null, ssl: boolean, path?: string | null, challenge: string, kind: string, scope: string, layer?: { __typename?: 'ManagementLayer', id: string, name: string } | null, instance: { __typename?: 'ManagementServiceInstance', id: string } };

export type ListInstanceAliasFragment = { __typename?: 'ManagementInstanceAlias', id: string, host?: string | null, port?: number | null, ssl: boolean, path?: string | null, challenge: string, kind: string, scope: string, layer?: { __typename?: 'ManagementLayer', id: string, name: string } | null, instance: { __typename?: 'ManagementServiceInstance', id: string, identifier: string, release: { __typename?: 'ManagementServiceRelease', version: string, service: { __typename?: 'ManagementService', id: string, identifier: any } } } };

export type DetailAppFragment = { __typename?: 'ManagementApp', id: string, identifier: any, logo?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null, releases: Array<{ __typename?: 'ManagementRelease', id: string, version: any, logo?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null, app: { __typename?: 'ManagementApp', id: string, identifier: any, logo?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null } }> };

export type ListAppFragment = { __typename?: 'ManagementApp', id: string, identifier: any, logo?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null };

export type IonscaleAuthKeyFragment = { __typename?: 'ManagementIonscaleAuthKey', id: string, key: string, createdAt: any, ephemeral: boolean, tags: Array<string>, creator: { __typename?: 'ManagementUser', id: string, email?: string | null } };

export type ListIonscaleAuthKeyFragment = { __typename?: 'ManagementIonscaleAuthKey', id: string, key: string, createdAt: any, ephemeral: boolean, tags: Array<string>, creator: { __typename?: 'ManagementUser', id: string, email?: string | null } };

export type DetailClientFragment = { __typename?: 'ManagementClient', id: string, token: string, name: string, lastReportedAt?: any | null, functional: boolean, kind: string, issueUrl?: string | null, user?: { __typename?: 'ManagementUser', id: string, username: string } | null, organization: { __typename?: 'ManagementOrganization', id: string, name?: string | null, slug: string }, release: { __typename?: 'ManagementRelease', id: string, version: any, logo?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null, app: { __typename?: 'ManagementApp', id: string, identifier: any, logo?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null } }, logo?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null, mappings: Array<{ __typename?: 'ManagementServiceInstanceMapping', id: string, key: string, optional: boolean, instance: { __typename?: 'ManagementServiceInstance', id: string, identifier: string, release: { __typename?: 'ManagementServiceRelease', id: string, version: string, service: { __typename?: 'ManagementService', id: string, identifier: any, logo?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null } }, organization: { __typename?: 'ManagementOrganization', id: string } }, client: { __typename?: 'ManagementClient', id: string, name: string, kind: string, lastReportedAt?: any | null, organization: { __typename?: 'ManagementOrganization', id: string }, user?: { __typename?: 'ManagementUser', id: string, username: string } | null, logo?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null, device?: { __typename?: 'ManagementDevice', id: string, name?: string | null } | null, release: { __typename?: 'ManagementRelease', version: any, logo?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null, app: { __typename?: 'ManagementApp', id: string, identifier: any, logo?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null } }, manifest: { __typename?: 'ManagementStagingManifest', identifier: string, version: string, requirements: Array<{ __typename?: 'ManagementStagingRequirement', key: string, description?: string | null }> } } }>, usedAliases: Array<{ __typename?: 'ManagementUsedAlias', id: string, key: string, valid: boolean, reason?: string | null, alias?: { __typename?: 'ManagementInstanceAlias', id: string, host?: string | null, port?: number | null, ssl: boolean, path?: string | null, challenge: string, kind: string, scope: string, layer?: { __typename?: 'ManagementLayer', id: string, name: string } | null, instance: { __typename?: 'ManagementServiceInstance', id: string, identifier: string, release: { __typename?: 'ManagementServiceRelease', version: string, service: { __typename?: 'ManagementService', id: string, identifier: any } } } } | null }>, device?: { __typename?: 'ManagementDevice', id: string, name?: string | null } | null, publicSources: Array<{ __typename?: 'ManagementPublicSource', kind: string, url: string }>, manifest: { __typename?: 'ManagementStagingManifest', identifier: string, version: string, requirements: Array<{ __typename?: 'ManagementStagingRequirement', key: string, description?: string | null }> }, scopes: Array<{ __typename?: 'ManagementScope', id: string, identifier: string, description: string }> };

export type ListClientFragment = { __typename?: 'ManagementClient', id: string, name: string, kind: string, lastReportedAt?: any | null, organization: { __typename?: 'ManagementOrganization', id: string }, user?: { __typename?: 'ManagementUser', id: string, username: string } | null, logo?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null, device?: { __typename?: 'ManagementDevice', id: string, name?: string | null } | null, release: { __typename?: 'ManagementRelease', version: any, logo?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null, app: { __typename?: 'ManagementApp', id: string, identifier: any, logo?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null } }, manifest: { __typename?: 'ManagementStagingManifest', identifier: string, version: string, requirements: Array<{ __typename?: 'ManagementStagingRequirement', key: string, description?: string | null }> } };

export type ListCompositionFragment = { __typename?: 'ManagementComposition', id: string, name: string, organization: { __typename?: 'ManagementOrganization', id: string, name?: string | null }, instances: Array<{ __typename?: 'ManagementServiceInstance', id: string, identifier: string, release: { __typename?: 'ManagementServiceRelease', id: string, version: string, service: { __typename?: 'ManagementService', id: string, identifier: any, logo?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null } }, organization: { __typename?: 'ManagementOrganization', id: string } }>, clients: Array<{ __typename?: 'ManagementClient', id: string, name: string, kind: string, lastReportedAt?: any | null, organization: { __typename?: 'ManagementOrganization', id: string }, user?: { __typename?: 'ManagementUser', id: string, username: string } | null, logo?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null, device?: { __typename?: 'ManagementDevice', id: string, name?: string | null } | null, release: { __typename?: 'ManagementRelease', version: any, logo?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null, app: { __typename?: 'ManagementApp', id: string, identifier: any, logo?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null } }, manifest: { __typename?: 'ManagementStagingManifest', identifier: string, version: string, requirements: Array<{ __typename?: 'ManagementStagingRequirement', key: string, description?: string | null }> } }> };

export type CompositionFragment = { __typename?: 'ManagementComposition', id: string, name: string, organization: { __typename?: 'ManagementOrganization', id: string, name?: string | null }, instances: Array<{ __typename?: 'ManagementServiceInstance', id: string, identifier: string, release: { __typename?: 'ManagementServiceRelease', id: string, version: string, service: { __typename?: 'ManagementService', id: string, identifier: any, logo?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null } }, organization: { __typename?: 'ManagementOrganization', id: string } }>, clients: Array<{ __typename?: 'ManagementClient', id: string, name: string, kind: string, lastReportedAt?: any | null, organization: { __typename?: 'ManagementOrganization', id: string }, user?: { __typename?: 'ManagementUser', id: string, username: string } | null, logo?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null, device?: { __typename?: 'ManagementDevice', id: string, name?: string | null } | null, release: { __typename?: 'ManagementRelease', version: any, logo?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null, app: { __typename?: 'ManagementApp', id: string, identifier: any, logo?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null } }, manifest: { __typename?: 'ManagementStagingManifest', identifier: string, version: string, requirements: Array<{ __typename?: 'ManagementStagingRequirement', key: string, description?: string | null }> } }> };

export type CompositionDeviceCodeFragment = { __typename?: 'ManagementCompositionDeviceCode', id: string, code: string, manifest?: { __typename?: 'ManagementCompositionManifest', identifier: string, instances: Array<{ __typename?: 'ManagementStagingInstanceRequest', description?: string | null, identifier: string, manifest: { __typename?: 'ManagementStagingServiceManifest', identifier: string, version: string, logo?: string | null, description?: string | null, roles?: Array<{ __typename?: 'StagingRole', key: string, description?: string | null }> | null, scopes?: Array<{ __typename?: 'StagingScope', key: string, description?: string | null }> | null, publicSources: Array<{ __typename?: 'ManagementStagingPublicSource', kind: string, url: string }> } }>, clients: Array<{ __typename?: 'ManagementStagingClientRequest', description?: string | null, identifier: string, manifest: { __typename?: 'ManagementStagingManifest', identifier: string, version: string, requirements: Array<{ __typename?: 'ManagementStagingRequirement', key: string, description?: string | null }> } }> } | null };

export type DeviceFragment = { __typename?: 'ManagementDevice', id: string, name?: string | null, nodeId: string, clients: Array<{ __typename?: 'ManagementClient', id: string, name: string, kind: string, lastReportedAt?: any | null, organization: { __typename?: 'ManagementOrganization', id: string }, user?: { __typename?: 'ManagementUser', id: string, username: string } | null, logo?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null, device?: { __typename?: 'ManagementDevice', id: string, name?: string | null } | null, release: { __typename?: 'ManagementRelease', version: any, logo?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null, app: { __typename?: 'ManagementApp', id: string, identifier: any, logo?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null } }, manifest: { __typename?: 'ManagementStagingManifest', identifier: string, version: string, requirements: Array<{ __typename?: 'ManagementStagingRequirement', key: string, description?: string | null }> } }>, deviceGroups: Array<{ __typename?: 'ManagementDeviceGroup', id: string, name: string }>, serviceInstances: Array<{ __typename?: 'ManagementServiceInstance', id: string, identifier: string, release: { __typename?: 'ManagementServiceRelease', id: string, version: string, service: { __typename?: 'ManagementService', id: string, identifier: any, logo?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null } }, organization: { __typename?: 'ManagementOrganization', id: string } }> };

export type DetailDeviceFragment = { __typename?: 'ManagementDevice', id: string, name?: string | null, nodeId: string, organization: { __typename?: 'ManagementOrganization', id: string, name?: string | null }, clients: Array<{ __typename?: 'ManagementClient', id: string, token: string, name: string, lastReportedAt?: any | null, functional: boolean, kind: string, issueUrl?: string | null, user?: { __typename?: 'ManagementUser', id: string, username: string } | null, organization: { __typename?: 'ManagementOrganization', id: string, name?: string | null, slug: string }, release: { __typename?: 'ManagementRelease', id: string, version: any, logo?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null, app: { __typename?: 'ManagementApp', id: string, identifier: any, logo?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null } }, logo?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null, mappings: Array<{ __typename?: 'ManagementServiceInstanceMapping', id: string, key: string, optional: boolean, instance: { __typename?: 'ManagementServiceInstance', id: string, identifier: string, release: { __typename?: 'ManagementServiceRelease', id: string, version: string, service: { __typename?: 'ManagementService', id: string, identifier: any, logo?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null } }, organization: { __typename?: 'ManagementOrganization', id: string } }, client: { __typename?: 'ManagementClient', id: string, name: string, kind: string, lastReportedAt?: any | null, organization: { __typename?: 'ManagementOrganization', id: string }, user?: { __typename?: 'ManagementUser', id: string, username: string } | null, logo?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null, device?: { __typename?: 'ManagementDevice', id: string, name?: string | null } | null, release: { __typename?: 'ManagementRelease', version: any, logo?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null, app: { __typename?: 'ManagementApp', id: string, identifier: any, logo?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null } }, manifest: { __typename?: 'ManagementStagingManifest', identifier: string, version: string, requirements: Array<{ __typename?: 'ManagementStagingRequirement', key: string, description?: string | null }> } } }>, usedAliases: Array<{ __typename?: 'ManagementUsedAlias', id: string, key: string, valid: boolean, reason?: string | null, alias?: { __typename?: 'ManagementInstanceAlias', id: string, host?: string | null, port?: number | null, ssl: boolean, path?: string | null, challenge: string, kind: string, scope: string, layer?: { __typename?: 'ManagementLayer', id: string, name: string } | null, instance: { __typename?: 'ManagementServiceInstance', id: string, identifier: string, release: { __typename?: 'ManagementServiceRelease', version: string, service: { __typename?: 'ManagementService', id: string, identifier: any } } } } | null }>, device?: { __typename?: 'ManagementDevice', id: string, name?: string | null } | null, publicSources: Array<{ __typename?: 'ManagementPublicSource', kind: string, url: string }>, manifest: { __typename?: 'ManagementStagingManifest', identifier: string, version: string, requirements: Array<{ __typename?: 'ManagementStagingRequirement', key: string, description?: string | null }> }, scopes: Array<{ __typename?: 'ManagementScope', id: string, identifier: string, description: string }> }>, deviceGroups: Array<{ __typename?: 'ManagementDeviceGroup', id: string, name: string }>, serviceInstances: Array<{ __typename?: 'ManagementServiceInstance', id: string, identifier: string, release: { __typename?: 'ManagementServiceRelease', id: string, version: string, service: { __typename?: 'ManagementService', id: string, identifier: any, logo?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null } }, organization: { __typename?: 'ManagementOrganization', id: string } }> };

export type ListDeviceFragment = { __typename?: 'ManagementDevice', id: string, name?: string | null, nodeId: string };

export type DeviceCodeFragment = { __typename?: 'ManagementDeviceCode', id: string, code: string, stagingKind: string, stagingManifest?: { __typename?: 'ManagementStagingManifest', identifier: string, version: string, logo?: string | null, description?: string | null, url?: string | null, scopes: Array<string>, publicSources?: Array<{ __typename?: 'ManagementStagingPublicSource', kind: string, url: string }> | null } | null, client?: { __typename?: 'ManagementClient', id: string, kind: string, name: string, release: { __typename?: 'ManagementRelease', version: any, scopes: Array<string>, app: { __typename?: 'ManagementApp', identifier: any } } } | null };

export type DetailDeviceGroupFragment = { __typename?: 'ManagementDeviceGroup', id: string, name: string, devices: Array<{ __typename?: 'ManagementDevice', id: string, name?: string | null, nodeId: string }> };

export type ListDeviceGroupFragment = { __typename?: 'ManagementDeviceGroup', id: string, name: string };

export type ListInviteFragment = { __typename?: 'ManagementInvite', id: string, token: string, status: string, createdAt: any, expiresAt?: any | null, createdBy: { __typename?: 'ManagementUser', id: string, username: string }, createdFor: { __typename?: 'ManagementOrganization', id: string, name?: string | null, slug: string } };

export type InviteFragment = { __typename?: 'ManagementInvite', id: string, token: string, status: string, inviteUrl: string, createdAt: any, expiresAt?: any | null, createdBy: { __typename?: 'ManagementUser', id: string, username: string, profile: { __typename?: 'ManagementProfile', id: string, avatar?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null } }, createdFor: { __typename?: 'ManagementOrganization', id: string, name?: string | null, slug: string, roles: Array<{ __typename?: 'ManagementRole', id: string, identifier: string, description: string }>, memberships: Array<{ __typename?: 'ManagementMembership', id: string, roles: Array<{ __typename?: 'ManagementRole', identifier: string }>, user: { __typename?: 'ManagementUser', id: string, username: string, email?: string | null, profile: { __typename?: 'ManagementProfile', id: string, avatar?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null } } }>, profile?: { __typename?: 'ManagementOrganizationProfile', id: string, name?: string | null, bio?: string | null, avatar?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null, banner?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null } | null, invites: Array<{ __typename?: 'ManagementInvite', id: string, status: string, expiresAt?: any | null, token: string, inviteUrl: string, acceptedBy?: { __typename?: 'ManagementUser', id: string, username: string, profile: { __typename?: 'ManagementProfile', id: string, avatar?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null } } | null }> }, acceptedBy?: { __typename?: 'ManagementUser', id: string, username: string, profile: { __typename?: 'ManagementProfile', id: string, avatar?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null } } | null };

export type DetailInviteFragment = { __typename?: 'ManagementInvite', id: string, token: string, status: string, inviteUrl: string, createdAt: any, expiresAt?: any | null, createdBy: { __typename?: 'ManagementUser', id: string, username: string, profile: { __typename?: 'ManagementProfile', id: string, avatar?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null } }, createdFor: { __typename?: 'ManagementOrganization', id: string, name?: string | null, slug: string, roles: Array<{ __typename?: 'ManagementRole', id: string, identifier: string, description: string }>, memberships: Array<{ __typename?: 'ManagementMembership', id: string, roles: Array<{ __typename?: 'ManagementRole', identifier: string }>, user: { __typename?: 'ManagementUser', id: string, username: string, email?: string | null, profile: { __typename?: 'ManagementProfile', id: string, avatar?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null } } }>, profile?: { __typename?: 'ManagementOrganizationProfile', id: string, name?: string | null, bio?: string | null, avatar?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null, banner?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null } | null, invites: Array<{ __typename?: 'ManagementInvite', id: string, status: string, expiresAt?: any | null, token: string, inviteUrl: string, acceptedBy?: { __typename?: 'ManagementUser', id: string, username: string, profile: { __typename?: 'ManagementProfile', id: string, avatar?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null } } | null }> }, acceptedBy?: { __typename?: 'ManagementUser', id: string, username: string, profile: { __typename?: 'ManagementProfile', id: string, avatar?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null } } | null, createdMemberships: Array<{ __typename?: 'ManagementMembership', id: string, roles: Array<{ __typename?: 'ManagementRole', identifier: string, id: string }>, user: { __typename?: 'ManagementUser', id: string, username: string, email?: string | null, profile: { __typename?: 'ManagementProfile', id: string, avatar?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null } } }> };

export type LayerFragment = { __typename?: 'ManagementLayer', id: string, name: string, description?: string | null, logo?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null, aliases: Array<{ __typename?: 'ManagementInstanceAlias', id: string, host?: string | null, port?: number | null, ssl: boolean, path?: string | null, challenge: string, kind: string, scope: string, layer?: { __typename?: 'ManagementLayer', id: string, name: string } | null, instance: { __typename?: 'ManagementServiceInstance', id: string, identifier: string, release: { __typename?: 'ManagementServiceRelease', version: string, service: { __typename?: 'ManagementService', id: string, identifier: any } } } }>, machines: Array<{ __typename?: 'ManagementMachine', id: string, localId: string, name: string, ipv4?: string | null, ipv6?: string | null, connected: boolean, ephemeral: boolean, lastSeen?: any | null, tags: Array<string> }>, authKeys: Array<{ __typename?: 'ManagementIonscaleAuthKey', id: string, key: string, createdAt: any, ephemeral: boolean, tags: Array<string>, creator: { __typename?: 'ManagementUser', id: string, email?: string | null } }> };

export type ListLayerFragment = { __typename?: 'ManagementLayer', id: string, name: string, description?: string | null, logo?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null };

export type MachineFragment = { __typename?: 'ManagementMachine', id: string, localId: string, name: string, ipv4?: string | null, ipv6?: string | null, connected: boolean, ephemeral: boolean, lastSeen?: any | null, tags: Array<string> };

export type ManifestFragment = { __typename?: 'ManagementStagingManifest', identifier: string, version: string, requirements: Array<{ __typename?: 'ManagementStagingRequirement', key: string, description?: string | null }> };

export type ServiceManifestFragment = { __typename?: 'ManagementStagingServiceManifest', identifier: string, version: string, logo?: string | null, description?: string | null, roles?: Array<{ __typename?: 'StagingRole', key: string, description?: string | null }> | null, scopes?: Array<{ __typename?: 'StagingScope', key: string, description?: string | null }> | null, publicSources: Array<{ __typename?: 'ManagementStagingPublicSource', kind: string, url: string }> };

export type CompositionManifestFragment = { __typename?: 'ManagementCompositionManifest', identifier: string, instances: Array<{ __typename?: 'ManagementStagingInstanceRequest', description?: string | null, identifier: string, manifest: { __typename?: 'ManagementStagingServiceManifest', identifier: string, version: string, logo?: string | null, description?: string | null, roles?: Array<{ __typename?: 'StagingRole', key: string, description?: string | null }> | null, scopes?: Array<{ __typename?: 'StagingScope', key: string, description?: string | null }> | null, publicSources: Array<{ __typename?: 'ManagementStagingPublicSource', kind: string, url: string }> } }>, clients: Array<{ __typename?: 'ManagementStagingClientRequest', description?: string | null, identifier: string, manifest: { __typename?: 'ManagementStagingManifest', identifier: string, version: string, requirements: Array<{ __typename?: 'ManagementStagingRequirement', key: string, description?: string | null }> } }> };

export type MembershipFragment = { __typename?: 'ManagementMembership', id: string, roles: Array<{ __typename?: 'ManagementRole', identifier: string, id: string }>, user: { __typename?: 'ManagementUser', id: string, username: string, email?: string | null, profile: { __typename?: 'ManagementProfile', id: string, avatar?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null } }, organization: { __typename?: 'ManagementOrganization', id: string, name?: string | null, slug: string, roles: Array<{ __typename?: 'ManagementRole', id: string, identifier: string, description: string }> } };

export type ListMembershipFragment = { __typename?: 'ManagementMembership', id: string, roles: Array<{ __typename?: 'ManagementRole', identifier: string, id: string }>, user: { __typename?: 'ManagementUser', id: string, username: string, profile: { __typename?: 'ManagementProfile', id: string, avatar?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null } }, organization: { __typename?: 'ManagementOrganization', id: string, name?: string | null, slug: string, profile?: { __typename?: 'ManagementOrganizationProfile', id: string, name?: string | null, bio?: string | null, avatar?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null, banner?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null } | null, memberships: Array<{ __typename?: 'ManagementMembership', id: string, roles: Array<{ __typename?: 'ManagementRole', identifier: string }>, user: { __typename?: 'ManagementUser', id: string, username: string, profile: { __typename?: 'ManagementProfile', id: string, avatar?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null } } }>, latestClients: Array<{ __typename?: 'ManagementClient', id: string, name: string, kind: string, lastReportedAt?: any | null, organization: { __typename?: 'ManagementOrganization', id: string }, user?: { __typename?: 'ManagementUser', id: string, username: string } | null, logo?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null, device?: { __typename?: 'ManagementDevice', id: string, name?: string | null } | null, release: { __typename?: 'ManagementRelease', version: any, logo?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null, app: { __typename?: 'ManagementApp', id: string, identifier: any, logo?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null } }, manifest: { __typename?: 'ManagementStagingManifest', identifier: string, version: string, requirements: Array<{ __typename?: 'ManagementStagingRequirement', key: string, description?: string | null }> } }>, latestServices: Array<{ __typename?: 'ManagementServiceInstance', id: string, identifier: string, release: { __typename?: 'ManagementServiceRelease', id: string, version: string, service: { __typename?: 'ManagementService', id: string, identifier: any, logo?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null } }, organization: { __typename?: 'ManagementOrganization', id: string } }> } };

export type Oauth2ClientFragment = { __typename?: 'ManagementOAuth2Client', id: string, name: string, clientId: string, redirectUris: string };

export type OrganizationFragment = { __typename?: 'ManagementOrganization', id: string, name?: string | null, slug: string, roles: Array<{ __typename?: 'ManagementRole', id: string, identifier: string, description: string }>, memberships: Array<{ __typename?: 'ManagementMembership', id: string, roles: Array<{ __typename?: 'ManagementRole', identifier: string }>, user: { __typename?: 'ManagementUser', id: string, username: string, email?: string | null, profile: { __typename?: 'ManagementProfile', id: string, avatar?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null } } }>, profile?: { __typename?: 'ManagementOrganizationProfile', id: string, name?: string | null, bio?: string | null, avatar?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null, banner?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null } | null, invites: Array<{ __typename?: 'ManagementInvite', id: string, status: string, expiresAt?: any | null, token: string, inviteUrl: string, acceptedBy?: { __typename?: 'ManagementUser', id: string, username: string, profile: { __typename?: 'ManagementProfile', id: string, avatar?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null } } | null }> };

export type ListOrganizationFragment = { __typename?: 'ManagementOrganization', id: string, name?: string | null, slug: string };

export type SidebarOrganizationFragment = { __typename?: 'ManagementOrganization', id: string, name?: string | null, slug: string, profile?: { __typename?: 'ManagementOrganizationProfile', id: string, name?: string | null, bio?: string | null, avatar?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null, banner?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null } | null, memberships: Array<{ __typename?: 'ManagementMembership', id: string, roles: Array<{ __typename?: 'ManagementRole', identifier: string }>, user: { __typename?: 'ManagementUser', id: string, username: string, profile: { __typename?: 'ManagementProfile', id: string, avatar?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null } } }>, latestClients: Array<{ __typename?: 'ManagementClient', id: string, name: string, kind: string, lastReportedAt?: any | null, organization: { __typename?: 'ManagementOrganization', id: string }, user?: { __typename?: 'ManagementUser', id: string, username: string } | null, logo?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null, device?: { __typename?: 'ManagementDevice', id: string, name?: string | null } | null, release: { __typename?: 'ManagementRelease', version: any, logo?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null, app: { __typename?: 'ManagementApp', id: string, identifier: any, logo?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null } }, manifest: { __typename?: 'ManagementStagingManifest', identifier: string, version: string, requirements: Array<{ __typename?: 'ManagementStagingRequirement', key: string, description?: string | null }> } }>, latestServices: Array<{ __typename?: 'ManagementServiceInstance', id: string, identifier: string, release: { __typename?: 'ManagementServiceRelease', id: string, version: string, service: { __typename?: 'ManagementService', id: string, identifier: any, logo?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null } }, organization: { __typename?: 'ManagementOrganization', id: string } }> };

export type OrganizationProfileFragment = { __typename?: 'ManagementOrganizationProfile', id: string, name?: string | null, bio?: string | null, avatar?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null, banner?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null };

export type KommunityPartnerFragment = { __typename?: 'ManagementKommunityPartner', id: string, identifier: string, name: string, description?: string | null, logoUrl?: string | null, authUrl?: string | null, websiteUrl?: string | null, partnerKind: string, kommunityKind: string, autoConfigure: boolean, preconfiguredComposition?: any | null };

export type ListKommunityPartnerFragment = { __typename?: 'ManagementKommunityPartner', id: string, identifier: string, name: string, description?: string | null, logoUrl?: string | null, authUrl?: string | null, websiteUrl?: string | null, partnerKind: string, kommunityKind: string, autoConfigure: boolean };

export type PresignedPostCredentialsFragment = { __typename?: 'PresignedPostCredentials', xAmzAlgorithm: string, xAmzCredential: string, xAmzDate: string, xAmzSignature: string, key: string, bucket: string, datalayer: string, policy: string, store: string };

export type ProfileFragment = { __typename?: 'ManagementProfile', id: string, name?: string | null, bio?: string | null, avatar?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null, banner?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null };

export type ListRedeemTokenFragment = { __typename?: 'ManagementRedeemToken', id: string, token: string, user: { __typename?: 'ManagementUser', id: string, email?: string | null }, client?: { __typename?: 'ManagementClient', id: string, release: { __typename?: 'ManagementRelease', version: any, app: { __typename?: 'ManagementApp', identifier: any } } } | null };

export type DetailRedeemTokenFragment = { __typename?: 'ManagementRedeemToken', id: string, token: string, user: { __typename?: 'ManagementUser', id: string, email?: string | null }, client?: { __typename?: 'ManagementClient', id: string, release: { __typename?: 'ManagementRelease', version: any, app: { __typename?: 'ManagementApp', identifier: any } } } | null };

export type DetailReleaseFragment = { __typename?: 'ManagementRelease', id: string, version: any, logo?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null, app: { __typename?: 'ManagementApp', id: string, identifier: any, logo?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null }, clients: Array<{ __typename?: 'ManagementClient', id: string, name: string, kind: string, lastReportedAt?: any | null, organization: { __typename?: 'ManagementOrganization', id: string }, user?: { __typename?: 'ManagementUser', id: string, username: string } | null, logo?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null, device?: { __typename?: 'ManagementDevice', id: string, name?: string | null } | null, release: { __typename?: 'ManagementRelease', version: any, logo?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null, app: { __typename?: 'ManagementApp', id: string, identifier: any, logo?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null } }, manifest: { __typename?: 'ManagementStagingManifest', identifier: string, version: string, requirements: Array<{ __typename?: 'ManagementStagingRequirement', key: string, description?: string | null }> } }> };

export type ListReleaseFragment = { __typename?: 'ManagementRelease', id: string, version: any, logo?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null, app: { __typename?: 'ManagementApp', id: string, identifier: any, logo?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null } };

export type RoleFragment = { __typename?: 'ManagementRole', id: string, identifier: string, description: string, creatingInstance?: { __typename?: 'ManagementServiceInstance', id: string, identifier: string, release: { __typename?: 'ManagementServiceRelease', id: string, version: string, service: { __typename?: 'ManagementService', id: string, identifier: any, logo?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null } }, organization: { __typename?: 'ManagementOrganization', id: string } } | null, organization: { __typename?: 'ManagementOrganization', id: string }, usedBy: Array<{ __typename?: 'ManagementServiceInstance', id: string, identifier: string, release: { __typename?: 'ManagementServiceRelease', id: string, version: string, service: { __typename?: 'ManagementService', id: string, identifier: any, logo?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null } }, organization: { __typename?: 'ManagementOrganization', id: string } }> };

export type ListRoleFragment = { __typename?: 'ManagementRole', id: string, description: string, identifier: string };

export type ScopeFragment = { __typename?: 'ManagementScope', id: string, description: string, identifier: string, creatingInstance?: { __typename?: 'ManagementServiceInstance', id: string, identifier: string, release: { __typename?: 'ManagementServiceRelease', id: string, version: string, service: { __typename?: 'ManagementService', id: string, identifier: any, logo?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null } }, organization: { __typename?: 'ManagementOrganization', id: string } } | null, organization: { __typename?: 'ManagementOrganization', id: string }, usedBy: Array<{ __typename?: 'ManagementServiceInstance', id: string, identifier: string, release: { __typename?: 'ManagementServiceRelease', id: string, version: string, service: { __typename?: 'ManagementService', id: string, identifier: any, logo?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null } }, organization: { __typename?: 'ManagementOrganization', id: string } }> };

export type ListScopeFragment = { __typename?: 'ManagementScope', id: string, description: string, identifier: string };

export type ListServiceFragment = { __typename?: 'ManagementService', identifier: any, id: string, name: string, description?: string | null, logo?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null, releases: Array<{ __typename?: 'ManagementServiceRelease', id: string, version: string, instances: Array<{ __typename?: 'ManagementServiceInstance', id: string, identifier: string, release: { __typename?: 'ManagementServiceRelease', id: string, version: string, service: { __typename?: 'ManagementService', id: string, identifier: any, logo?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null } }, organization: { __typename?: 'ManagementOrganization', id: string } }> }> };

export type ServiceFragment = { __typename?: 'ManagementService', identifier: any, id: string, name: string, description?: string | null, logo?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null, releases: Array<{ __typename?: 'ManagementServiceRelease', id: string, version: string, instances: Array<{ __typename?: 'ManagementServiceInstance', id: string, identifier: string, release: { __typename?: 'ManagementServiceRelease', id: string, version: string, service: { __typename?: 'ManagementService', id: string, identifier: any, logo?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null } }, organization: { __typename?: 'ManagementOrganization', id: string } }> }> };

export type ServiceDeviceCodeFragment = { __typename?: 'ManagementServiceDeviceCode', id: string, code: string, stagingAliases?: Array<{ __typename?: 'StagingAlias', host?: string | null, port?: number | null }> | null, stagingManifest?: { __typename?: 'ManagementStagingServiceManifest', identifier: string, version: string, logo?: string | null, description?: string | null, roles?: Array<{ __typename?: 'StagingRole', key: string, description?: string | null }> | null, scopes?: Array<{ __typename?: 'StagingScope', key: string, description?: string | null }> | null, publicSources: Array<{ __typename?: 'ManagementStagingPublicSource', kind: string, url: string }> } | null, instance?: { __typename?: 'ManagementServiceInstance', id: string, identifier: string, release: { __typename?: 'ManagementServiceRelease', id: string, version: string, service: { __typename?: 'ManagementService', id: string, identifier: any } } } | null };

export type ServiceInstanceFragment = { __typename?: 'ManagementServiceInstance', identifier: string, id: string, release: { __typename?: 'ManagementServiceRelease', id: string, version: string, service: { __typename?: 'ManagementService', identifier: any, id: string, description?: string | null, name: string, logo?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null } }, device?: { __typename?: 'ManagementDevice', id: string, name?: string | null } | null, organization: { __typename?: 'ManagementOrganization', id: string }, allowedUsers: Array<{ __typename?: 'ManagementUser', username: string, firstName?: string | null, lastName?: string | null, email?: string | null, avatar?: string | null, id: string, profile: { __typename?: 'ManagementProfile', id: string, name?: string | null, bio?: string | null, avatar?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null, banner?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null } }>, deniedUsers: Array<{ __typename?: 'ManagementUser', username: string, firstName?: string | null, lastName?: string | null, email?: string | null, avatar?: string | null, id: string, profile: { __typename?: 'ManagementProfile', id: string, name?: string | null, bio?: string | null, avatar?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null, banner?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null } }>, mappings: Array<{ __typename?: 'ManagementServiceInstanceMapping', id: string, key: string, optional: boolean, instance: { __typename?: 'ManagementServiceInstance', id: string, identifier: string, release: { __typename?: 'ManagementServiceRelease', id: string, version: string, service: { __typename?: 'ManagementService', id: string, identifier: any, logo?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null } }, organization: { __typename?: 'ManagementOrganization', id: string } }, client: { __typename?: 'ManagementClient', id: string, name: string, kind: string, lastReportedAt?: any | null, organization: { __typename?: 'ManagementOrganization', id: string }, user?: { __typename?: 'ManagementUser', id: string, username: string } | null, logo?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null, device?: { __typename?: 'ManagementDevice', id: string, name?: string | null } | null, release: { __typename?: 'ManagementRelease', version: any, logo?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null, app: { __typename?: 'ManagementApp', id: string, identifier: any, logo?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null } }, manifest: { __typename?: 'ManagementStagingManifest', identifier: string, version: string, requirements: Array<{ __typename?: 'ManagementStagingRequirement', key: string, description?: string | null }> } } }>, aliases: Array<{ __typename?: 'ManagementInstanceAlias', id: string, host?: string | null, port?: number | null, ssl: boolean, path?: string | null, challenge: string, kind: string, scope: string, layer?: { __typename?: 'ManagementLayer', id: string, name: string } | null, instance: { __typename?: 'ManagementServiceInstance', id: string, identifier: string, release: { __typename?: 'ManagementServiceRelease', version: string, service: { __typename?: 'ManagementService', id: string, identifier: any } } } }>, logo?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null, roles: Array<{ __typename?: 'ManagementRole', id: string, identifier: string, description: string }>, scopes: Array<{ __typename?: 'ManagementScope', id: string, identifier: string, description: string }> };

export type ListServiceInstanceFragment = { __typename?: 'ManagementServiceInstance', id: string, identifier: string, release: { __typename?: 'ManagementServiceRelease', id: string, version: string, service: { __typename?: 'ManagementService', id: string, identifier: any, logo?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null } }, organization: { __typename?: 'ManagementOrganization', id: string } };

export type ListServiceReleaseFragment = { __typename?: 'ManagementServiceRelease', id: string, version: string, instances: Array<{ __typename?: 'ManagementServiceInstance', id: string, identifier: string, release: { __typename?: 'ManagementServiceRelease', id: string, version: string, service: { __typename?: 'ManagementService', id: string, identifier: any, logo?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null } }, organization: { __typename?: 'ManagementOrganization', id: string } }> };

export type ServiceReleaseFragment = { __typename?: 'ManagementServiceRelease', id: string, version: string, service: { __typename?: 'ManagementService', identifier: any, id: string, name: string, description?: string | null, logo?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null, releases: Array<{ __typename?: 'ManagementServiceRelease', id: string, version: string, instances: Array<{ __typename?: 'ManagementServiceInstance', id: string, identifier: string, release: { __typename?: 'ManagementServiceRelease', id: string, version: string, service: { __typename?: 'ManagementService', id: string, identifier: any, logo?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null } }, organization: { __typename?: 'ManagementOrganization', id: string } }> }> } };

export type ListServiceInstanceMappingFragment = { __typename?: 'ManagementServiceInstanceMapping', id: string, key: string, optional: boolean, instance: { __typename?: 'ManagementServiceInstance', id: string, identifier: string, release: { __typename?: 'ManagementServiceRelease', id: string, version: string, service: { __typename?: 'ManagementService', id: string, identifier: any, logo?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null } }, organization: { __typename?: 'ManagementOrganization', id: string } }, client: { __typename?: 'ManagementClient', id: string, name: string, kind: string, lastReportedAt?: any | null, organization: { __typename?: 'ManagementOrganization', id: string }, user?: { __typename?: 'ManagementUser', id: string, username: string } | null, logo?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null, device?: { __typename?: 'ManagementDevice', id: string, name?: string | null } | null, release: { __typename?: 'ManagementRelease', version: any, logo?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null, app: { __typename?: 'ManagementApp', id: string, identifier: any, logo?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null } }, manifest: { __typename?: 'ManagementStagingManifest', identifier: string, version: string, requirements: Array<{ __typename?: 'ManagementStagingRequirement', key: string, description?: string | null }> } } };

type BaseSocialAccount_ManagementGenericAccount_Fragment = { __typename: 'ManagementGenericAccount', id: string, provider: string };

type BaseSocialAccount_ManagementGithubAccount_Fragment = { __typename: 'ManagementGithubAccount', id: string, provider: string };

type BaseSocialAccount_ManagementGoogleAccount_Fragment = { __typename: 'ManagementGoogleAccount', id: string, provider: string };

type BaseSocialAccount_ManagementOrcidAccount_Fragment = { __typename: 'ManagementOrcidAccount', id: string, provider: string };

export type BaseSocialAccountFragment =
  | BaseSocialAccount_ManagementGenericAccount_Fragment
  | BaseSocialAccount_ManagementGithubAccount_Fragment
  | BaseSocialAccount_ManagementGoogleAccount_Fragment
  | BaseSocialAccount_ManagementOrcidAccount_Fragment
;

export type OrcidSocialAccountFragment = { __typename: 'ManagementOrcidAccount', id: string, provider: string, identifier: { __typename?: 'ManagementOrcidIdentifier', uri: string, path: string, host: string }, person?: { __typename?: 'ManagementOrcidPerson', researcherUrls: Array<string>, addresses: Array<string> } | null };

export type GithubSocialAccountFragment = { __typename: 'ManagementGithubAccount', id: string, provider: string };

export type GooglebSocialAccountFragment = { __typename: 'ManagementGoogleAccount', id: string, provider: string };

type DetailSocialAccount_ManagementGenericAccount_Fragment = { __typename: 'ManagementGenericAccount', id: string, provider: string };

type DetailSocialAccount_ManagementGithubAccount_Fragment = { __typename: 'ManagementGithubAccount', id: string, provider: string };

type DetailSocialAccount_ManagementGoogleAccount_Fragment = { __typename: 'ManagementGoogleAccount', id: string, provider: string };

type DetailSocialAccount_ManagementOrcidAccount_Fragment = { __typename: 'ManagementOrcidAccount', id: string, provider: string, identifier: { __typename?: 'ManagementOrcidIdentifier', uri: string, path: string, host: string }, person?: { __typename?: 'ManagementOrcidPerson', researcherUrls: Array<string>, addresses: Array<string> } | null };

export type DetailSocialAccountFragment =
  | DetailSocialAccount_ManagementGenericAccount_Fragment
  | DetailSocialAccount_ManagementGithubAccount_Fragment
  | DetailSocialAccount_ManagementGoogleAccount_Fragment
  | DetailSocialAccount_ManagementOrcidAccount_Fragment
;

type ListSocialAccount_ManagementGenericAccount_Fragment = { __typename: 'ManagementGenericAccount', id: string, provider: string };

type ListSocialAccount_ManagementGithubAccount_Fragment = { __typename: 'ManagementGithubAccount', id: string, provider: string };

type ListSocialAccount_ManagementGoogleAccount_Fragment = { __typename: 'ManagementGoogleAccount', id: string, provider: string };

type ListSocialAccount_ManagementOrcidAccount_Fragment = { __typename: 'ManagementOrcidAccount', id: string, provider: string };

export type ListSocialAccountFragment =
  | ListSocialAccount_ManagementGenericAccount_Fragment
  | ListSocialAccount_ManagementGithubAccount_Fragment
  | ListSocialAccount_ManagementGoogleAccount_Fragment
  | ListSocialAccount_ManagementOrcidAccount_Fragment
;

export type ListUsedAliasFragment = { __typename?: 'ManagementUsedAlias', id: string, key: string, valid: boolean, reason?: string | null, alias?: { __typename?: 'ManagementInstanceAlias', id: string, host?: string | null, port?: number | null, ssl: boolean, path?: string | null, challenge: string, kind: string, scope: string, layer?: { __typename?: 'ManagementLayer', id: string, name: string } | null, instance: { __typename?: 'ManagementServiceInstance', id: string, identifier: string, release: { __typename?: 'ManagementServiceRelease', version: string, service: { __typename?: 'ManagementService', id: string, identifier: any } } } } | null };

export type DetailUsedAliasFragment = { __typename?: 'ManagementUsedAlias', id: string, key: string, valid: boolean, reason?: string | null, alias?: { __typename?: 'ManagementInstanceAlias', id: string, host?: string | null, port?: number | null, ssl: boolean, path?: string | null, challenge: string, kind: string, scope: string, layer?: { __typename?: 'ManagementLayer', id: string, name: string } | null, instance: { __typename?: 'ManagementServiceInstance', id: string } } | null, client: { __typename?: 'ManagementClient', id: string, name: string, kind: string, lastReportedAt?: any | null, organization: { __typename?: 'ManagementOrganization', id: string }, user?: { __typename?: 'ManagementUser', id: string, username: string } | null, logo?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null, device?: { __typename?: 'ManagementDevice', id: string, name?: string | null } | null, release: { __typename?: 'ManagementRelease', version: any, logo?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null, app: { __typename?: 'ManagementApp', id: string, identifier: any, logo?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null } }, manifest: { __typename?: 'ManagementStagingManifest', identifier: string, version: string, requirements: Array<{ __typename?: 'ManagementStagingRequirement', key: string, description?: string | null }> } } };

export type ListUserFragment = { __typename?: 'ManagementUser', username: string, firstName?: string | null, lastName?: string | null, email?: string | null, avatar?: string | null, id: string, profile: { __typename?: 'ManagementProfile', id: string, name?: string | null, bio?: string | null, avatar?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null, banner?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null } };

export type DetailUserFragment = { __typename?: 'ManagementUser', id: string, username: string, email?: string | null, firstName?: string | null, lastName?: string | null, avatar?: string | null, groups: Array<{ __typename?: 'ManagementGroup', id: string, name: string }>, profile: { __typename?: 'ManagementProfile', id: string, name?: string | null, bio?: string | null, avatar?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null, banner?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null }, memberships: Array<{ __typename?: 'ManagementMembership', id: string, roles: Array<{ __typename?: 'ManagementRole', identifier: string, id: string }>, user: { __typename?: 'ManagementUser', id: string, username: string, email?: string | null, profile: { __typename?: 'ManagementProfile', id: string, avatar?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null } }, organization: { __typename?: 'ManagementOrganization', id: string, name?: string | null, slug: string, roles: Array<{ __typename?: 'ManagementRole', id: string, identifier: string, description: string }> } }> };

export type MeUserFragment = { __typename?: 'ManagementUser', id: string, username: string, email?: string | null, firstName?: string | null, lastName?: string | null, avatar?: string | null, profile: { __typename?: 'ManagementProfile', id: string, name?: string | null, bio?: string | null, avatar?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null, banner?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null }, memberships: Array<{ __typename?: 'ManagementMembership', id: string, roles: Array<{ __typename?: 'ManagementRole', identifier: string, id: string }>, user: { __typename?: 'ManagementUser', id: string, username: string, email?: string | null, profile: { __typename?: 'ManagementProfile', id: string, avatar?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null } }, organization: { __typename?: 'ManagementOrganization', id: string, name?: string | null, slug: string, roles: Array<{ __typename?: 'ManagementRole', id: string, identifier: string, description: string }> } }>, socialAccounts: Array<
    | { __typename: 'ManagementGenericAccount', id: string, provider: string }
    | { __typename: 'ManagementGithubAccount', id: string, provider: string }
    | { __typename: 'ManagementGoogleAccount', id: string, provider: string }
    | { __typename: 'ManagementOrcidAccount', id: string, provider: string }
  > };

export type CreateAliasMutationVariables = Exact<{
  input: CreateAliasInput;
}>;


export type CreateAliasMutation = { __typename?: 'Mutation', createAlias: { __typename?: 'ManagementInstanceAlias', id: string, host?: string | null, port?: number | null, ssl: boolean, path?: string | null, challenge: string, kind: string, scope: string, layer?: { __typename?: 'ManagementLayer', id: string, name: string } | null, instance: { __typename?: 'ManagementServiceInstance', id: string } } };

export type DeleteAliasMutationVariables = Exact<{
  input: DeleteAliasInput;
}>;


export type DeleteAliasMutation = { __typename?: 'Mutation', deleteAlias: string };

export type UpdateAliasMutationVariables = Exact<{
  input: UpdateAliasInput;
}>;


export type UpdateAliasMutation = { __typename?: 'Mutation', updateAlias: { __typename?: 'ManagementInstanceAlias', id: string, host?: string | null, port?: number | null, ssl: boolean, path?: string | null, challenge: string, kind: string, scope: string, layer?: { __typename?: 'ManagementLayer', id: string, name: string } | null, instance: { __typename?: 'ManagementServiceInstance', id: string } } };

export type UpdateCompositionMutationVariables = Exact<{
  input: UpdateCompositionInput;
}>;


export type UpdateCompositionMutation = { __typename?: 'Mutation', updateComposition: { __typename?: 'ManagementComposition', id: string, name: string, organization: { __typename?: 'ManagementOrganization', id: string, name?: string | null }, instances: Array<{ __typename?: 'ManagementServiceInstance', id: string, identifier: string, release: { __typename?: 'ManagementServiceRelease', id: string, version: string, service: { __typename?: 'ManagementService', id: string, identifier: any, logo?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null } }, organization: { __typename?: 'ManagementOrganization', id: string } }>, clients: Array<{ __typename?: 'ManagementClient', id: string, name: string, kind: string, lastReportedAt?: any | null, organization: { __typename?: 'ManagementOrganization', id: string }, user?: { __typename?: 'ManagementUser', id: string, username: string } | null, logo?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null, device?: { __typename?: 'ManagementDevice', id: string, name?: string | null } | null, release: { __typename?: 'ManagementRelease', version: any, logo?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null, app: { __typename?: 'ManagementApp', id: string, identifier: any, logo?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null } }, manifest: { __typename?: 'ManagementStagingManifest', identifier: string, version: string, requirements: Array<{ __typename?: 'ManagementStagingRequirement', key: string, description?: string | null }> } }> } };

export type DeleteCompositionMutationVariables = Exact<{
  input: DeleteCompositionInput;
}>;


export type DeleteCompositionMutation = { __typename?: 'Mutation', deleteComposition: string };

export type AcceptCompositionDeviceCodeMutationVariables = Exact<{
  input: AcceptCompositionDeviceCodeInput;
}>;


export type AcceptCompositionDeviceCodeMutation = { __typename?: 'Mutation', acceptCompositionDeviceCode: { __typename?: 'ManagementComposition', id: string, name: string, organization: { __typename?: 'ManagementOrganization', id: string, name?: string | null }, instances: Array<{ __typename?: 'ManagementServiceInstance', id: string, identifier: string, release: { __typename?: 'ManagementServiceRelease', id: string, version: string, service: { __typename?: 'ManagementService', id: string, identifier: any, logo?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null } }, organization: { __typename?: 'ManagementOrganization', id: string } }>, clients: Array<{ __typename?: 'ManagementClient', id: string, name: string, kind: string, lastReportedAt?: any | null, organization: { __typename?: 'ManagementOrganization', id: string }, user?: { __typename?: 'ManagementUser', id: string, username: string } | null, logo?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null, device?: { __typename?: 'ManagementDevice', id: string, name?: string | null } | null, release: { __typename?: 'ManagementRelease', version: any, logo?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null, app: { __typename?: 'ManagementApp', id: string, identifier: any, logo?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null } }, manifest: { __typename?: 'ManagementStagingManifest', identifier: string, version: string, requirements: Array<{ __typename?: 'ManagementStagingRequirement', key: string, description?: string | null }> } }> } };

export type DeclineCompositionDeviceCodeMutationVariables = Exact<{
  input: DeclineCompositionDeviceCodeInput;
}>;


export type DeclineCompositionDeviceCodeMutation = { __typename?: 'Mutation', declineCompositionDeviceCode: { __typename?: 'ManagementCompositionDeviceCode', id: string, code: string, manifest?: { __typename?: 'ManagementCompositionManifest', identifier: string, instances: Array<{ __typename?: 'ManagementStagingInstanceRequest', description?: string | null, identifier: string, manifest: { __typename?: 'ManagementStagingServiceManifest', identifier: string, version: string, logo?: string | null, description?: string | null, roles?: Array<{ __typename?: 'StagingRole', key: string, description?: string | null }> | null, scopes?: Array<{ __typename?: 'StagingScope', key: string, description?: string | null }> | null, publicSources: Array<{ __typename?: 'ManagementStagingPublicSource', kind: string, url: string }> } }>, clients: Array<{ __typename?: 'ManagementStagingClientRequest', description?: string | null, identifier: string, manifest: { __typename?: 'ManagementStagingManifest', identifier: string, version: string, requirements: Array<{ __typename?: 'ManagementStagingRequirement', key: string, description?: string | null }> } }> } | null } };

export type CreateDeviceMutationVariables = Exact<{
  input: CreateDeviceInput;
}>;


export type CreateDeviceMutation = { __typename?: 'Mutation', createDevice: { __typename?: 'ManagementDevice', id: string, name?: string | null, nodeId: string, clients: Array<{ __typename?: 'ManagementClient', id: string, name: string, kind: string, lastReportedAt?: any | null, organization: { __typename?: 'ManagementOrganization', id: string }, user?: { __typename?: 'ManagementUser', id: string, username: string } | null, logo?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null, device?: { __typename?: 'ManagementDevice', id: string, name?: string | null } | null, release: { __typename?: 'ManagementRelease', version: any, logo?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null, app: { __typename?: 'ManagementApp', id: string, identifier: any, logo?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null } }, manifest: { __typename?: 'ManagementStagingManifest', identifier: string, version: string, requirements: Array<{ __typename?: 'ManagementStagingRequirement', key: string, description?: string | null }> } }>, deviceGroups: Array<{ __typename?: 'ManagementDeviceGroup', id: string, name: string }>, serviceInstances: Array<{ __typename?: 'ManagementServiceInstance', id: string, identifier: string, release: { __typename?: 'ManagementServiceRelease', id: string, version: string, service: { __typename?: 'ManagementService', id: string, identifier: any, logo?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null } }, organization: { __typename?: 'ManagementOrganization', id: string } }> } };

export type DeleteDeviceMutationVariables = Exact<{
  input: DeleteDeviceInput;
}>;


export type DeleteDeviceMutation = { __typename?: 'Mutation', deleteDevice: string };

export type UpdateDeviceMutationVariables = Exact<{
  input: UpdateDeviceInput;
}>;


export type UpdateDeviceMutation = { __typename?: 'Mutation', updateDevice: { __typename?: 'ManagementDevice', id: string, name?: string | null, nodeId: string, clients: Array<{ __typename?: 'ManagementClient', id: string, name: string, kind: string, lastReportedAt?: any | null, organization: { __typename?: 'ManagementOrganization', id: string }, user?: { __typename?: 'ManagementUser', id: string, username: string } | null, logo?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null, device?: { __typename?: 'ManagementDevice', id: string, name?: string | null } | null, release: { __typename?: 'ManagementRelease', version: any, logo?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null, app: { __typename?: 'ManagementApp', id: string, identifier: any, logo?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null } }, manifest: { __typename?: 'ManagementStagingManifest', identifier: string, version: string, requirements: Array<{ __typename?: 'ManagementStagingRequirement', key: string, description?: string | null }> } }>, deviceGroups: Array<{ __typename?: 'ManagementDeviceGroup', id: string, name: string }>, serviceInstances: Array<{ __typename?: 'ManagementServiceInstance', id: string, identifier: string, release: { __typename?: 'ManagementServiceRelease', id: string, version: string, service: { __typename?: 'ManagementService', id: string, identifier: any, logo?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null } }, organization: { __typename?: 'ManagementOrganization', id: string } }> } };

export type AcceptDeviceCodeMutationVariables = Exact<{
  input: AcceptDeviceCodeInput;
}>;


export type AcceptDeviceCodeMutation = { __typename?: 'Mutation', acceptDeviceCode: { __typename?: 'ManagementClient', id: string, token: string, name: string, lastReportedAt?: any | null, functional: boolean, kind: string, issueUrl?: string | null, user?: { __typename?: 'ManagementUser', id: string, username: string } | null, organization: { __typename?: 'ManagementOrganization', id: string, name?: string | null, slug: string }, release: { __typename?: 'ManagementRelease', id: string, version: any, logo?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null, app: { __typename?: 'ManagementApp', id: string, identifier: any, logo?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null } }, logo?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null, mappings: Array<{ __typename?: 'ManagementServiceInstanceMapping', id: string, key: string, optional: boolean, instance: { __typename?: 'ManagementServiceInstance', id: string, identifier: string, release: { __typename?: 'ManagementServiceRelease', id: string, version: string, service: { __typename?: 'ManagementService', id: string, identifier: any, logo?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null } }, organization: { __typename?: 'ManagementOrganization', id: string } }, client: { __typename?: 'ManagementClient', id: string, name: string, kind: string, lastReportedAt?: any | null, organization: { __typename?: 'ManagementOrganization', id: string }, user?: { __typename?: 'ManagementUser', id: string, username: string } | null, logo?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null, device?: { __typename?: 'ManagementDevice', id: string, name?: string | null } | null, release: { __typename?: 'ManagementRelease', version: any, logo?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null, app: { __typename?: 'ManagementApp', id: string, identifier: any, logo?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null } }, manifest: { __typename?: 'ManagementStagingManifest', identifier: string, version: string, requirements: Array<{ __typename?: 'ManagementStagingRequirement', key: string, description?: string | null }> } } }>, usedAliases: Array<{ __typename?: 'ManagementUsedAlias', id: string, key: string, valid: boolean, reason?: string | null, alias?: { __typename?: 'ManagementInstanceAlias', id: string, host?: string | null, port?: number | null, ssl: boolean, path?: string | null, challenge: string, kind: string, scope: string, layer?: { __typename?: 'ManagementLayer', id: string, name: string } | null, instance: { __typename?: 'ManagementServiceInstance', id: string, identifier: string, release: { __typename?: 'ManagementServiceRelease', version: string, service: { __typename?: 'ManagementService', id: string, identifier: any } } } } | null }>, device?: { __typename?: 'ManagementDevice', id: string, name?: string | null } | null, publicSources: Array<{ __typename?: 'ManagementPublicSource', kind: string, url: string }>, manifest: { __typename?: 'ManagementStagingManifest', identifier: string, version: string, requirements: Array<{ __typename?: 'ManagementStagingRequirement', key: string, description?: string | null }> }, scopes: Array<{ __typename?: 'ManagementScope', id: string, identifier: string, description: string }> } };

export type DeclineDeviceCodeMutationVariables = Exact<{
  input: DeclineDeviceCodeInput;
}>;


export type DeclineDeviceCodeMutation = { __typename?: 'Mutation', declineDeviceCode: { __typename?: 'ManagementDeviceCode', id: string, code: string, stagingKind: string, stagingManifest?: { __typename?: 'ManagementStagingManifest', identifier: string, version: string, logo?: string | null, description?: string | null, url?: string | null, scopes: Array<string>, publicSources?: Array<{ __typename?: 'ManagementStagingPublicSource', kind: string, url: string }> | null } | null, client?: { __typename?: 'ManagementClient', id: string, kind: string, name: string, release: { __typename?: 'ManagementRelease', version: any, scopes: Array<string>, app: { __typename?: 'ManagementApp', identifier: any } } } | null } };

export type CreateDeviceGroupMutationVariables = Exact<{
  input: CreateDeviceGroupInput;
}>;


export type CreateDeviceGroupMutation = { __typename?: 'Mutation', createDeviceGroup: { __typename?: 'ManagementDeviceGroup', id: string, name: string, devices: Array<{ __typename?: 'ManagementDevice', id: string, name?: string | null, nodeId: string }> } };

export type DeleteDeviceGroupMutationVariables = Exact<{
  input: DeleteDeviceGroupInput;
}>;


export type DeleteDeviceGroupMutation = { __typename?: 'Mutation', deleteDeviceGroup: string };

export type AddDeviceToGroupMutationVariables = Exact<{
  input: AddDeviceToGroupInput;
}>;


export type AddDeviceToGroupMutation = { __typename?: 'Mutation', addDeviceToGroup: { __typename?: 'ManagementDevice', id: string, name?: string | null, nodeId: string, clients: Array<{ __typename?: 'ManagementClient', id: string, name: string, kind: string, lastReportedAt?: any | null, organization: { __typename?: 'ManagementOrganization', id: string }, user?: { __typename?: 'ManagementUser', id: string, username: string } | null, logo?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null, device?: { __typename?: 'ManagementDevice', id: string, name?: string | null } | null, release: { __typename?: 'ManagementRelease', version: any, logo?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null, app: { __typename?: 'ManagementApp', id: string, identifier: any, logo?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null } }, manifest: { __typename?: 'ManagementStagingManifest', identifier: string, version: string, requirements: Array<{ __typename?: 'ManagementStagingRequirement', key: string, description?: string | null }> } }>, deviceGroups: Array<{ __typename?: 'ManagementDeviceGroup', id: string, name: string }>, serviceInstances: Array<{ __typename?: 'ManagementServiceInstance', id: string, identifier: string, release: { __typename?: 'ManagementServiceRelease', id: string, version: string, service: { __typename?: 'ManagementService', id: string, identifier: any, logo?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null } }, organization: { __typename?: 'ManagementOrganization', id: string } }> } };

export type CreateInviteMutationVariables = Exact<{
  input: CreateInviteInput;
}>;


export type CreateInviteMutation = { __typename?: 'Mutation', createInvite: { __typename?: 'ManagementInvite', id: string, token: string, status: string, inviteUrl: string, createdAt: any, expiresAt?: any | null, createdBy: { __typename?: 'ManagementUser', id: string, username: string, profile: { __typename?: 'ManagementProfile', id: string, avatar?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null } }, createdFor: { __typename?: 'ManagementOrganization', id: string, name?: string | null, slug: string, roles: Array<{ __typename?: 'ManagementRole', id: string, identifier: string, description: string }>, memberships: Array<{ __typename?: 'ManagementMembership', id: string, roles: Array<{ __typename?: 'ManagementRole', identifier: string }>, user: { __typename?: 'ManagementUser', id: string, username: string, email?: string | null, profile: { __typename?: 'ManagementProfile', id: string, avatar?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null } } }>, profile?: { __typename?: 'ManagementOrganizationProfile', id: string, name?: string | null, bio?: string | null, avatar?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null, banner?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null } | null, invites: Array<{ __typename?: 'ManagementInvite', id: string, status: string, expiresAt?: any | null, token: string, inviteUrl: string, acceptedBy?: { __typename?: 'ManagementUser', id: string, username: string, profile: { __typename?: 'ManagementProfile', id: string, avatar?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null } } | null }> }, acceptedBy?: { __typename?: 'ManagementUser', id: string, username: string, profile: { __typename?: 'ManagementProfile', id: string, avatar?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null } } | null } };

export type AcceptInviteMutationVariables = Exact<{
  input: AcceptInviteInput;
}>;


export type AcceptInviteMutation = { __typename?: 'Mutation', acceptInvite: { __typename?: 'ManagementMembership', organization: { __typename?: 'ManagementOrganization', id: string, name?: string | null, slug: string, roles: Array<{ __typename?: 'ManagementRole', id: string, identifier: string, description: string }>, memberships: Array<{ __typename?: 'ManagementMembership', id: string, roles: Array<{ __typename?: 'ManagementRole', identifier: string }>, user: { __typename?: 'ManagementUser', id: string, username: string, email?: string | null, profile: { __typename?: 'ManagementProfile', id: string, avatar?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null } } }>, profile?: { __typename?: 'ManagementOrganizationProfile', id: string, name?: string | null, bio?: string | null, avatar?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null, banner?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null } | null, invites: Array<{ __typename?: 'ManagementInvite', id: string, status: string, expiresAt?: any | null, token: string, inviteUrl: string, acceptedBy?: { __typename?: 'ManagementUser', id: string, username: string, profile: { __typename?: 'ManagementProfile', id: string, avatar?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null } } | null }> } } };

export type DeclineInviteMutationVariables = Exact<{
  input: DeclineInviteInput;
}>;


export type DeclineInviteMutation = { __typename?: 'Mutation', declineInvite: { __typename?: 'ManagementInvite', id: string, token: string, status: string, inviteUrl: string, createdAt: any, expiresAt?: any | null, createdBy: { __typename?: 'ManagementUser', id: string, username: string, profile: { __typename?: 'ManagementProfile', id: string, avatar?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null } }, createdFor: { __typename?: 'ManagementOrganization', id: string, name?: string | null, slug: string, roles: Array<{ __typename?: 'ManagementRole', id: string, identifier: string, description: string }>, memberships: Array<{ __typename?: 'ManagementMembership', id: string, roles: Array<{ __typename?: 'ManagementRole', identifier: string }>, user: { __typename?: 'ManagementUser', id: string, username: string, email?: string | null, profile: { __typename?: 'ManagementProfile', id: string, avatar?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null } } }>, profile?: { __typename?: 'ManagementOrganizationProfile', id: string, name?: string | null, bio?: string | null, avatar?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null, banner?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null } | null, invites: Array<{ __typename?: 'ManagementInvite', id: string, status: string, expiresAt?: any | null, token: string, inviteUrl: string, acceptedBy?: { __typename?: 'ManagementUser', id: string, username: string, profile: { __typename?: 'ManagementProfile', id: string, avatar?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null } } | null }> }, acceptedBy?: { __typename?: 'ManagementUser', id: string, username: string, profile: { __typename?: 'ManagementProfile', id: string, avatar?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null } } | null } };

export type CancelInviteMutationVariables = Exact<{
  input: CancelInviteInput;
}>;


export type CancelInviteMutation = { __typename?: 'Mutation', cancelInvite: { __typename?: 'ManagementInvite', id: string, token: string, status: string, inviteUrl: string, createdAt: any, expiresAt?: any | null, createdBy: { __typename?: 'ManagementUser', id: string, username: string, profile: { __typename?: 'ManagementProfile', id: string, avatar?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null } }, createdFor: { __typename?: 'ManagementOrganization', id: string, name?: string | null, slug: string, roles: Array<{ __typename?: 'ManagementRole', id: string, identifier: string, description: string }>, memberships: Array<{ __typename?: 'ManagementMembership', id: string, roles: Array<{ __typename?: 'ManagementRole', identifier: string }>, user: { __typename?: 'ManagementUser', id: string, username: string, email?: string | null, profile: { __typename?: 'ManagementProfile', id: string, avatar?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null } } }>, profile?: { __typename?: 'ManagementOrganizationProfile', id: string, name?: string | null, bio?: string | null, avatar?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null, banner?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null } | null, invites: Array<{ __typename?: 'ManagementInvite', id: string, status: string, expiresAt?: any | null, token: string, inviteUrl: string, acceptedBy?: { __typename?: 'ManagementUser', id: string, username: string, profile: { __typename?: 'ManagementProfile', id: string, avatar?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null } } | null }> }, acceptedBy?: { __typename?: 'ManagementUser', id: string, username: string, profile: { __typename?: 'ManagementProfile', id: string, avatar?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null } } | null } };

export type CreateIonscaleLayerMutationVariables = Exact<{
  input: CreateIonscaleLayerInput;
}>;


export type CreateIonscaleLayerMutation = { __typename?: 'Mutation', createIonscaleLayer: { __typename?: 'ManagementLayer', id: string, name: string, description?: string | null, logo?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null, aliases: Array<{ __typename?: 'ManagementInstanceAlias', id: string, host?: string | null, port?: number | null, ssl: boolean, path?: string | null, challenge: string, kind: string, scope: string, layer?: { __typename?: 'ManagementLayer', id: string, name: string } | null, instance: { __typename?: 'ManagementServiceInstance', id: string, identifier: string, release: { __typename?: 'ManagementServiceRelease', version: string, service: { __typename?: 'ManagementService', id: string, identifier: any } } } }>, machines: Array<{ __typename?: 'ManagementMachine', id: string, localId: string, name: string, ipv4?: string | null, ipv6?: string | null, connected: boolean, ephemeral: boolean, lastSeen?: any | null, tags: Array<string> }>, authKeys: Array<{ __typename?: 'ManagementIonscaleAuthKey', id: string, key: string, createdAt: any, ephemeral: boolean, tags: Array<string>, creator: { __typename?: 'ManagementUser', id: string, email?: string | null } }> } };

export type UpdateIonscaleLayerMutationVariables = Exact<{
  input: UpdateIonscaleLayerInput;
}>;


export type UpdateIonscaleLayerMutation = { __typename?: 'Mutation', updateIonscaleLayer: { __typename?: 'ManagementLayer', id: string, name: string, description?: string | null, logo?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null, aliases: Array<{ __typename?: 'ManagementInstanceAlias', id: string, host?: string | null, port?: number | null, ssl: boolean, path?: string | null, challenge: string, kind: string, scope: string, layer?: { __typename?: 'ManagementLayer', id: string, name: string } | null, instance: { __typename?: 'ManagementServiceInstance', id: string, identifier: string, release: { __typename?: 'ManagementServiceRelease', version: string, service: { __typename?: 'ManagementService', id: string, identifier: any } } } }>, machines: Array<{ __typename?: 'ManagementMachine', id: string, localId: string, name: string, ipv4?: string | null, ipv6?: string | null, connected: boolean, ephemeral: boolean, lastSeen?: any | null, tags: Array<string> }>, authKeys: Array<{ __typename?: 'ManagementIonscaleAuthKey', id: string, key: string, createdAt: any, ephemeral: boolean, tags: Array<string>, creator: { __typename?: 'ManagementUser', id: string, email?: string | null } }> } };

export type DeleteIonscaleLayerMutationVariables = Exact<{
  input: DeleteIonscaleLayerInput;
}>;


export type DeleteIonscaleLayerMutation = { __typename?: 'Mutation', deleteIonscaleLayer: string };

export type CreateIonscaleAuthKeyMutationVariables = Exact<{
  input: CreateIonscaleAuthKeyInput;
}>;


export type CreateIonscaleAuthKeyMutation = { __typename?: 'Mutation', createIonscaleAuthKey: { __typename?: 'ManagementIonscaleAuthKey', id: string, key: string, createdAt: any, ephemeral: boolean, tags: Array<string>, creator: { __typename?: 'ManagementUser', id: string, email?: string | null } } };

export type UpdateMembershipMutationVariables = Exact<{
  input: UpdateMembershipInput;
}>;


export type UpdateMembershipMutation = { __typename?: 'Mutation', updateMembership: { __typename?: 'ManagementMembership', id: string, roles: Array<{ __typename?: 'ManagementRole', identifier: string, id: string }>, user: { __typename?: 'ManagementUser', id: string, username: string, email?: string | null, profile: { __typename?: 'ManagementProfile', id: string, avatar?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null } }, organization: { __typename?: 'ManagementOrganization', id: string, name?: string | null, slug: string, roles: Array<{ __typename?: 'ManagementRole', id: string, identifier: string, description: string }> } } };

export type DeleteMembershipMutationVariables = Exact<{
  input: DeleteMembershipInput;
}>;


export type DeleteMembershipMutation = { __typename?: 'Mutation', deleteMembership: string };

export type AcceptAuthorizeCodeMutationVariables = Exact<{
  input: AcceptAuthorizeCodeInput;
}>;


export type AcceptAuthorizeCodeMutation = { __typename?: 'Mutation', acceptAuthorizeCode: string };

export type CreateOrganizationMutationVariables = Exact<{
  input: CreateOrganizationInput;
}>;


export type CreateOrganizationMutation = { __typename?: 'Mutation', createOrganization: { __typename?: 'ManagementOrganization', id: string, name?: string | null, slug: string, roles: Array<{ __typename?: 'ManagementRole', id: string, identifier: string, description: string }>, memberships: Array<{ __typename?: 'ManagementMembership', id: string, roles: Array<{ __typename?: 'ManagementRole', identifier: string }>, user: { __typename?: 'ManagementUser', id: string, username: string, email?: string | null, profile: { __typename?: 'ManagementProfile', id: string, avatar?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null } } }>, profile?: { __typename?: 'ManagementOrganizationProfile', id: string, name?: string | null, bio?: string | null, avatar?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null, banner?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null } | null, invites: Array<{ __typename?: 'ManagementInvite', id: string, status: string, expiresAt?: any | null, token: string, inviteUrl: string, acceptedBy?: { __typename?: 'ManagementUser', id: string, username: string, profile: { __typename?: 'ManagementProfile', id: string, avatar?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null } } | null }> } };

export type UpdateOrganizationMutationVariables = Exact<{
  input: UpdateOrganizationInput;
}>;


export type UpdateOrganizationMutation = { __typename?: 'Mutation', updateOrganization: { __typename?: 'ManagementOrganization', id: string, name?: string | null, slug: string, roles: Array<{ __typename?: 'ManagementRole', id: string, identifier: string, description: string }>, memberships: Array<{ __typename?: 'ManagementMembership', id: string, roles: Array<{ __typename?: 'ManagementRole', identifier: string }>, user: { __typename?: 'ManagementUser', id: string, username: string, email?: string | null, profile: { __typename?: 'ManagementProfile', id: string, avatar?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null } } }>, profile?: { __typename?: 'ManagementOrganizationProfile', id: string, name?: string | null, bio?: string | null, avatar?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null, banner?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null } | null, invites: Array<{ __typename?: 'ManagementInvite', id: string, status: string, expiresAt?: any | null, token: string, inviteUrl: string, acceptedBy?: { __typename?: 'ManagementUser', id: string, username: string, profile: { __typename?: 'ManagementProfile', id: string, avatar?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null } } | null }> } };

export type DeleteOrganizationMutationVariables = Exact<{
  input: DeleteOrganizationInput;
}>;


export type DeleteOrganizationMutation = { __typename?: 'Mutation', deleteOrganization: string };

export type ChangeOrganizationOwnerMutationVariables = Exact<{
  organizationId: Scalars['ID']['input'];
  newOwnerId: Scalars['ID']['input'];
}>;


export type ChangeOrganizationOwnerMutation = { __typename?: 'Mutation', changeOrganizationOwner: { __typename?: 'ManagementOrganization', id: string, name?: string | null, slug: string, roles: Array<{ __typename?: 'ManagementRole', id: string, identifier: string, description: string }>, memberships: Array<{ __typename?: 'ManagementMembership', id: string, roles: Array<{ __typename?: 'ManagementRole', identifier: string }>, user: { __typename?: 'ManagementUser', id: string, username: string, email?: string | null, profile: { __typename?: 'ManagementProfile', id: string, avatar?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null } } }>, profile?: { __typename?: 'ManagementOrganizationProfile', id: string, name?: string | null, bio?: string | null, avatar?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null, banner?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null } | null, invites: Array<{ __typename?: 'ManagementInvite', id: string, status: string, expiresAt?: any | null, token: string, inviteUrl: string, acceptedBy?: { __typename?: 'ManagementUser', id: string, username: string, profile: { __typename?: 'ManagementProfile', id: string, avatar?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null } } | null }> } };

export type CreateOrganizationProfileMutationVariables = Exact<{
  input: CreateOrganizationProfileInput;
}>;


export type CreateOrganizationProfileMutation = { __typename?: 'Mutation', createOrganizationProfile: { __typename?: 'ManagementOrganizationProfile', id: string, name?: string | null, bio?: string | null, avatar?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null, banner?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null } };

export type UpdateOrganizationProfileMutationVariables = Exact<{
  input: UpdateOrganizationProfileInput;
}>;


export type UpdateOrganizationProfileMutation = { __typename?: 'Mutation', updateOrganizationProfile: { __typename?: 'ManagementOrganizationProfile', id: string, name?: string | null, bio?: string | null, avatar?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null, banner?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null } };

export type DeleteOrganizationProfileMutationVariables = Exact<{
  input: DeleteOrganizationProfileInput;
}>;


export type DeleteOrganizationProfileMutation = { __typename?: 'Mutation', deleteOrganizationProfile: string };

export type CreateProfileMutationVariables = Exact<{
  input: CreateProfileInput;
}>;


export type CreateProfileMutation = { __typename?: 'Mutation', createProfile: { __typename?: 'ManagementProfile', id: string, name?: string | null, bio?: string | null, avatar?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null, banner?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null } };

export type UpdateProfileMutationVariables = Exact<{
  input: UpdateProfileInput;
}>;


export type UpdateProfileMutation = { __typename?: 'Mutation', updateProfile: { __typename?: 'ManagementProfile', id: string, name?: string | null, bio?: string | null, avatar?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null, banner?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null } };

export type DeleteProfileMutationVariables = Exact<{
  input: DeleteProfileInput;
}>;


export type DeleteProfileMutation = { __typename?: 'Mutation', deleteProfile: string };

export type AcceptServiceDeviceCodeMutationVariables = Exact<{
  input: AcceptServiceDeviceCodeInput;
}>;


export type AcceptServiceDeviceCodeMutation = { __typename?: 'Mutation', acceptServiceDeviceCode: { __typename?: 'ManagementServiceInstance', identifier: string, id: string, release: { __typename?: 'ManagementServiceRelease', id: string, version: string, service: { __typename?: 'ManagementService', identifier: any, id: string, description?: string | null, name: string, logo?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null } }, device?: { __typename?: 'ManagementDevice', id: string, name?: string | null } | null, organization: { __typename?: 'ManagementOrganization', id: string }, allowedUsers: Array<{ __typename?: 'ManagementUser', username: string, firstName?: string | null, lastName?: string | null, email?: string | null, avatar?: string | null, id: string, profile: { __typename?: 'ManagementProfile', id: string, name?: string | null, bio?: string | null, avatar?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null, banner?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null } }>, deniedUsers: Array<{ __typename?: 'ManagementUser', username: string, firstName?: string | null, lastName?: string | null, email?: string | null, avatar?: string | null, id: string, profile: { __typename?: 'ManagementProfile', id: string, name?: string | null, bio?: string | null, avatar?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null, banner?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null } }>, mappings: Array<{ __typename?: 'ManagementServiceInstanceMapping', id: string, key: string, optional: boolean, instance: { __typename?: 'ManagementServiceInstance', id: string, identifier: string, release: { __typename?: 'ManagementServiceRelease', id: string, version: string, service: { __typename?: 'ManagementService', id: string, identifier: any, logo?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null } }, organization: { __typename?: 'ManagementOrganization', id: string } }, client: { __typename?: 'ManagementClient', id: string, name: string, kind: string, lastReportedAt?: any | null, organization: { __typename?: 'ManagementOrganization', id: string }, user?: { __typename?: 'ManagementUser', id: string, username: string } | null, logo?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null, device?: { __typename?: 'ManagementDevice', id: string, name?: string | null } | null, release: { __typename?: 'ManagementRelease', version: any, logo?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null, app: { __typename?: 'ManagementApp', id: string, identifier: any, logo?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null } }, manifest: { __typename?: 'ManagementStagingManifest', identifier: string, version: string, requirements: Array<{ __typename?: 'ManagementStagingRequirement', key: string, description?: string | null }> } } }>, aliases: Array<{ __typename?: 'ManagementInstanceAlias', id: string, host?: string | null, port?: number | null, ssl: boolean, path?: string | null, challenge: string, kind: string, scope: string, layer?: { __typename?: 'ManagementLayer', id: string, name: string } | null, instance: { __typename?: 'ManagementServiceInstance', id: string, identifier: string, release: { __typename?: 'ManagementServiceRelease', version: string, service: { __typename?: 'ManagementService', id: string, identifier: any } } } }>, logo?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null, roles: Array<{ __typename?: 'ManagementRole', id: string, identifier: string, description: string }>, scopes: Array<{ __typename?: 'ManagementScope', id: string, identifier: string, description: string }> } };

export type DeclineServiceDeviceCodeMutationVariables = Exact<{
  input: DeclineServiceDeviceCodeInput;
}>;


export type DeclineServiceDeviceCodeMutation = { __typename?: 'Mutation', declineServiceDeviceCode: { __typename?: 'ManagementServiceDeviceCode', id: string, code: string, stagingAliases?: Array<{ __typename?: 'StagingAlias', host?: string | null, port?: number | null }> | null, stagingManifest?: { __typename?: 'ManagementStagingServiceManifest', identifier: string, version: string, logo?: string | null, description?: string | null, roles?: Array<{ __typename?: 'StagingRole', key: string, description?: string | null }> | null, scopes?: Array<{ __typename?: 'StagingScope', key: string, description?: string | null }> | null, publicSources: Array<{ __typename?: 'ManagementStagingPublicSource', kind: string, url: string }> } | null, instance?: { __typename?: 'ManagementServiceInstance', id: string, identifier: string, release: { __typename?: 'ManagementServiceRelease', id: string, version: string, service: { __typename?: 'ManagementService', id: string, identifier: any } } } | null } };

export type RequestMediaUploadMutationVariables = Exact<{
  key: Scalars['String']['input'];
  datalayer: Scalars['String']['input'];
}>;


export type RequestMediaUploadMutation = { __typename?: 'Mutation', requestMediaUpload: { __typename?: 'PresignedPostCredentials', xAmzAlgorithm: string, xAmzCredential: string, xAmzDate: string, xAmzSignature: string, key: string, bucket: string, datalayer: string, policy: string, store: string } };

export type AppsQueryVariables = Exact<{
  filters?: InputMaybe<AppFilter>;
  pagination?: InputMaybe<OffsetPaginationInput>;
}>;


export type AppsQuery = { __typename?: 'Query', apps: Array<{ __typename?: 'ManagementApp', id: string, identifier: any, logo?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null }> };

export type DetailAppQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type DetailAppQuery = { __typename?: 'Query', app: { __typename?: 'ManagementApp', id: string, identifier: any, logo?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null, releases: Array<{ __typename?: 'ManagementRelease', id: string, version: any, logo?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null, app: { __typename?: 'ManagementApp', id: string, identifier: any, logo?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null } }> } };

export type IonscaleAuthKeyQueryVariables = Exact<{
  filters?: InputMaybe<ManagementIonscaleAuthKeyFilter>;
  pagination?: InputMaybe<OffsetPaginationInput>;
  order?: InputMaybe<ManagementIonscaleAuthKeyOrder>;
}>;


export type IonscaleAuthKeyQuery = { __typename?: 'Query', ionscaleAuthKeys: Array<{ __typename?: 'ManagementIonscaleAuthKey', id: string, key: string, createdAt: any, ephemeral: boolean, tags: Array<string>, creator: { __typename?: 'ManagementUser', id: string, email?: string | null } }> };

export type GetAuthKeyQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetAuthKeyQuery = { __typename?: 'Query', ionscaleAuthKey: { __typename?: 'ManagementIonscaleAuthKey', id: string, key: string, createdAt: any, ephemeral: boolean, tags: Array<string>, creator: { __typename?: 'ManagementUser', id: string, email?: string | null } } };

export type ClientsQueryVariables = Exact<{
  filters?: InputMaybe<ManagementClientFilter>;
  pagination?: InputMaybe<OffsetPaginationInput>;
  order?: InputMaybe<ManagementClientOrder>;
}>;


export type ClientsQuery = { __typename?: 'Query', clients: Array<{ __typename?: 'ManagementClient', id: string, name: string, kind: string, lastReportedAt?: any | null, organization: { __typename?: 'ManagementOrganization', id: string }, user?: { __typename?: 'ManagementUser', id: string, username: string } | null, logo?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null, device?: { __typename?: 'ManagementDevice', id: string, name?: string | null } | null, release: { __typename?: 'ManagementRelease', version: any, logo?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null, app: { __typename?: 'ManagementApp', id: string, identifier: any, logo?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null } }, manifest: { __typename?: 'ManagementStagingManifest', identifier: string, version: string, requirements: Array<{ __typename?: 'ManagementStagingRequirement', key: string, description?: string | null }> } }> };

export type DetailClientQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type DetailClientQuery = { __typename?: 'Query', client: { __typename?: 'ManagementClient', id: string, token: string, name: string, lastReportedAt?: any | null, functional: boolean, kind: string, issueUrl?: string | null, user?: { __typename?: 'ManagementUser', id: string, username: string } | null, organization: { __typename?: 'ManagementOrganization', id: string, name?: string | null, slug: string }, release: { __typename?: 'ManagementRelease', id: string, version: any, logo?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null, app: { __typename?: 'ManagementApp', id: string, identifier: any, logo?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null } }, logo?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null, mappings: Array<{ __typename?: 'ManagementServiceInstanceMapping', id: string, key: string, optional: boolean, instance: { __typename?: 'ManagementServiceInstance', id: string, identifier: string, release: { __typename?: 'ManagementServiceRelease', id: string, version: string, service: { __typename?: 'ManagementService', id: string, identifier: any, logo?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null } }, organization: { __typename?: 'ManagementOrganization', id: string } }, client: { __typename?: 'ManagementClient', id: string, name: string, kind: string, lastReportedAt?: any | null, organization: { __typename?: 'ManagementOrganization', id: string }, user?: { __typename?: 'ManagementUser', id: string, username: string } | null, logo?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null, device?: { __typename?: 'ManagementDevice', id: string, name?: string | null } | null, release: { __typename?: 'ManagementRelease', version: any, logo?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null, app: { __typename?: 'ManagementApp', id: string, identifier: any, logo?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null } }, manifest: { __typename?: 'ManagementStagingManifest', identifier: string, version: string, requirements: Array<{ __typename?: 'ManagementStagingRequirement', key: string, description?: string | null }> } } }>, usedAliases: Array<{ __typename?: 'ManagementUsedAlias', id: string, key: string, valid: boolean, reason?: string | null, alias?: { __typename?: 'ManagementInstanceAlias', id: string, host?: string | null, port?: number | null, ssl: boolean, path?: string | null, challenge: string, kind: string, scope: string, layer?: { __typename?: 'ManagementLayer', id: string, name: string } | null, instance: { __typename?: 'ManagementServiceInstance', id: string, identifier: string, release: { __typename?: 'ManagementServiceRelease', version: string, service: { __typename?: 'ManagementService', id: string, identifier: any } } } } | null }>, device?: { __typename?: 'ManagementDevice', id: string, name?: string | null } | null, publicSources: Array<{ __typename?: 'ManagementPublicSource', kind: string, url: string }>, manifest: { __typename?: 'ManagementStagingManifest', identifier: string, version: string, requirements: Array<{ __typename?: 'ManagementStagingRequirement', key: string, description?: string | null }> }, scopes: Array<{ __typename?: 'ManagementScope', id: string, identifier: string, description: string }> } };

export type CompositionsQueryVariables = Exact<{
  filters?: InputMaybe<ManagementCompositionFilter>;
  order?: InputMaybe<ManagementCompositionOrder>;
  pagination?: InputMaybe<OffsetPaginationInput>;
}>;


export type CompositionsQuery = { __typename?: 'Query', compositions: Array<{ __typename?: 'ManagementComposition', id: string, name: string, organization: { __typename?: 'ManagementOrganization', id: string, name?: string | null }, instances: Array<{ __typename?: 'ManagementServiceInstance', id: string, identifier: string, release: { __typename?: 'ManagementServiceRelease', id: string, version: string, service: { __typename?: 'ManagementService', id: string, identifier: any, logo?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null } }, organization: { __typename?: 'ManagementOrganization', id: string } }>, clients: Array<{ __typename?: 'ManagementClient', id: string, name: string, kind: string, lastReportedAt?: any | null, organization: { __typename?: 'ManagementOrganization', id: string }, user?: { __typename?: 'ManagementUser', id: string, username: string } | null, logo?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null, device?: { __typename?: 'ManagementDevice', id: string, name?: string | null } | null, release: { __typename?: 'ManagementRelease', version: any, logo?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null, app: { __typename?: 'ManagementApp', id: string, identifier: any, logo?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null } }, manifest: { __typename?: 'ManagementStagingManifest', identifier: string, version: string, requirements: Array<{ __typename?: 'ManagementStagingRequirement', key: string, description?: string | null }> } }> }> };

export type GetCompositionQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetCompositionQuery = { __typename?: 'Query', composition: { __typename?: 'ManagementComposition', id: string, name: string, organization: { __typename?: 'ManagementOrganization', id: string, name?: string | null }, instances: Array<{ __typename?: 'ManagementServiceInstance', id: string, identifier: string, release: { __typename?: 'ManagementServiceRelease', id: string, version: string, service: { __typename?: 'ManagementService', id: string, identifier: any, logo?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null } }, organization: { __typename?: 'ManagementOrganization', id: string } }>, clients: Array<{ __typename?: 'ManagementClient', id: string, name: string, kind: string, lastReportedAt?: any | null, organization: { __typename?: 'ManagementOrganization', id: string }, user?: { __typename?: 'ManagementUser', id: string, username: string } | null, logo?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null, device?: { __typename?: 'ManagementDevice', id: string, name?: string | null } | null, release: { __typename?: 'ManagementRelease', version: any, logo?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null, app: { __typename?: 'ManagementApp', id: string, identifier: any, logo?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null } }, manifest: { __typename?: 'ManagementStagingManifest', identifier: string, version: string, requirements: Array<{ __typename?: 'ManagementStagingRequirement', key: string, description?: string | null }> } }> } };

export type CompositionDeviceCodeByCodeQueryVariables = Exact<{
  code: Scalars['String']['input'];
}>;


export type CompositionDeviceCodeByCodeQuery = { __typename?: 'Query', compositionDeviceCodeByCode: { __typename?: 'ManagementCompositionDeviceCode', id: string, code: string, manifest?: { __typename?: 'ManagementCompositionManifest', identifier: string, instances: Array<{ __typename?: 'ManagementStagingInstanceRequest', description?: string | null, identifier: string, manifest: { __typename?: 'ManagementStagingServiceManifest', identifier: string, version: string, logo?: string | null, description?: string | null, roles?: Array<{ __typename?: 'StagingRole', key: string, description?: string | null }> | null, scopes?: Array<{ __typename?: 'StagingScope', key: string, description?: string | null }> | null, publicSources: Array<{ __typename?: 'ManagementStagingPublicSource', kind: string, url: string }> } }>, clients: Array<{ __typename?: 'ManagementStagingClientRequest', description?: string | null, identifier: string, manifest: { __typename?: 'ManagementStagingManifest', identifier: string, version: string, requirements: Array<{ __typename?: 'ManagementStagingRequirement', key: string, description?: string | null }> } }> } | null } };

export type ListDevicesQueryVariables = Exact<{
  pagination?: InputMaybe<OffsetPaginationInput>;
  filters?: InputMaybe<ManagementDeviceFilter>;
  order?: InputMaybe<ManagementDeviceOrder>;
}>;


export type ListDevicesQuery = { __typename?: 'Query', devices: Array<{ __typename?: 'ManagementDevice', id: string, name?: string | null, nodeId: string }> };

export type GetDeviceQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetDeviceQuery = { __typename?: 'Query', device: { __typename?: 'ManagementDevice', id: string, name?: string | null, nodeId: string, organization: { __typename?: 'ManagementOrganization', id: string, name?: string | null }, clients: Array<{ __typename?: 'ManagementClient', id: string, token: string, name: string, lastReportedAt?: any | null, functional: boolean, kind: string, issueUrl?: string | null, user?: { __typename?: 'ManagementUser', id: string, username: string } | null, organization: { __typename?: 'ManagementOrganization', id: string, name?: string | null, slug: string }, release: { __typename?: 'ManagementRelease', id: string, version: any, logo?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null, app: { __typename?: 'ManagementApp', id: string, identifier: any, logo?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null } }, logo?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null, mappings: Array<{ __typename?: 'ManagementServiceInstanceMapping', id: string, key: string, optional: boolean, instance: { __typename?: 'ManagementServiceInstance', id: string, identifier: string, release: { __typename?: 'ManagementServiceRelease', id: string, version: string, service: { __typename?: 'ManagementService', id: string, identifier: any, logo?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null } }, organization: { __typename?: 'ManagementOrganization', id: string } }, client: { __typename?: 'ManagementClient', id: string, name: string, kind: string, lastReportedAt?: any | null, organization: { __typename?: 'ManagementOrganization', id: string }, user?: { __typename?: 'ManagementUser', id: string, username: string } | null, logo?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null, device?: { __typename?: 'ManagementDevice', id: string, name?: string | null } | null, release: { __typename?: 'ManagementRelease', version: any, logo?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null, app: { __typename?: 'ManagementApp', id: string, identifier: any, logo?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null } }, manifest: { __typename?: 'ManagementStagingManifest', identifier: string, version: string, requirements: Array<{ __typename?: 'ManagementStagingRequirement', key: string, description?: string | null }> } } }>, usedAliases: Array<{ __typename?: 'ManagementUsedAlias', id: string, key: string, valid: boolean, reason?: string | null, alias?: { __typename?: 'ManagementInstanceAlias', id: string, host?: string | null, port?: number | null, ssl: boolean, path?: string | null, challenge: string, kind: string, scope: string, layer?: { __typename?: 'ManagementLayer', id: string, name: string } | null, instance: { __typename?: 'ManagementServiceInstance', id: string, identifier: string, release: { __typename?: 'ManagementServiceRelease', version: string, service: { __typename?: 'ManagementService', id: string, identifier: any } } } } | null }>, device?: { __typename?: 'ManagementDevice', id: string, name?: string | null } | null, publicSources: Array<{ __typename?: 'ManagementPublicSource', kind: string, url: string }>, manifest: { __typename?: 'ManagementStagingManifest', identifier: string, version: string, requirements: Array<{ __typename?: 'ManagementStagingRequirement', key: string, description?: string | null }> }, scopes: Array<{ __typename?: 'ManagementScope', id: string, identifier: string, description: string }> }>, deviceGroups: Array<{ __typename?: 'ManagementDeviceGroup', id: string, name: string }>, serviceInstances: Array<{ __typename?: 'ManagementServiceInstance', id: string, identifier: string, release: { __typename?: 'ManagementServiceRelease', id: string, version: string, service: { __typename?: 'ManagementService', id: string, identifier: any, logo?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null } }, organization: { __typename?: 'ManagementOrganization', id: string } }> } };

export type DeviceCodeByCodeQueryVariables = Exact<{
  code: Scalars['String']['input'];
}>;


export type DeviceCodeByCodeQuery = { __typename?: 'Query', deviceCodeByCode: { __typename?: 'ManagementDeviceCode', id: string, code: string, stagingKind: string, stagingManifest?: { __typename?: 'ManagementStagingManifest', identifier: string, version: string, logo?: string | null, description?: string | null, url?: string | null, scopes: Array<string>, publicSources?: Array<{ __typename?: 'ManagementStagingPublicSource', kind: string, url: string }> | null } | null, client?: { __typename?: 'ManagementClient', id: string, kind: string, name: string, release: { __typename?: 'ManagementRelease', version: any, scopes: Array<string>, app: { __typename?: 'ManagementApp', identifier: any } } } | null } };

export type ValidateDeviceCodeQueryVariables = Exact<{
  deviceCode: Scalars['ID']['input'];
  composition: Scalars['ID']['input'];
}>;


export type ValidateDeviceCodeQuery = { __typename?: 'Query', validateDeviceCode: { __typename?: 'ValidationResult', valid: boolean, reason?: string | null, mappings: Array<{ __typename?: 'PotentialMapping', key: string, serviceInstance?: { __typename?: 'ManagementServiceInstance', id: string, identifier: string } | null }> } };

export type ListDeviceGroupsQueryVariables = Exact<{
  pagination?: InputMaybe<OffsetPaginationInput>;
  filters?: InputMaybe<ManagementDeviceGroupFilter>;
  order?: InputMaybe<ManagementDeviceGroupOrder>;
}>;


export type ListDeviceGroupsQuery = { __typename?: 'Query', deviceGroups: Array<{ __typename?: 'ManagementDeviceGroup', id: string, name: string }> };

export type GetDeviceGroupQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetDeviceGroupQuery = { __typename?: 'Query', deviceGroup: { __typename?: 'ManagementDeviceGroup', id: string, name: string, devices: Array<{ __typename?: 'ManagementDevice', id: string, name?: string | null, nodeId: string }> } };

export type ListInstanceAliasQueryVariables = Exact<{
  filters?: InputMaybe<ManagementInstanceAliasFilter>;
  pagination?: InputMaybe<OffsetPaginationInput>;
  order?: InputMaybe<ManagementInstanceAliasOrder>;
}>;


export type ListInstanceAliasQuery = { __typename?: 'Query', instanceAliases: Array<{ __typename?: 'ManagementInstanceAlias', id: string, host?: string | null, port?: number | null, ssl: boolean, path?: string | null, challenge: string, kind: string, scope: string, layer?: { __typename?: 'ManagementLayer', id: string, name: string } | null, instance: { __typename?: 'ManagementServiceInstance', id: string, identifier: string, release: { __typename?: 'ManagementServiceRelease', version: string, service: { __typename?: 'ManagementService', id: string, identifier: any } } } }> };

export type DetailInstanceAliasQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type DetailInstanceAliasQuery = { __typename?: 'Query', instanceAlias: { __typename?: 'ManagementInstanceAlias', id: string, host?: string | null, port?: number | null, ssl: boolean, path?: string | null, challenge: string, kind: string, scope: string, layer?: { __typename?: 'ManagementLayer', id: string, name: string } | null, instance: { __typename?: 'ManagementServiceInstance', id: string } } };

export type InviteByCodeQueryVariables = Exact<{
  code: Scalars['String']['input'];
}>;


export type InviteByCodeQuery = { __typename?: 'Query', inviteByCode: { __typename?: 'ManagementInvite', id: string, token: string, status: string, inviteUrl: string, createdAt: any, expiresAt?: any | null, createdBy: { __typename?: 'ManagementUser', id: string, username: string, profile: { __typename?: 'ManagementProfile', id: string, avatar?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null } }, createdFor: { __typename?: 'ManagementOrganization', id: string, name?: string | null, slug: string, roles: Array<{ __typename?: 'ManagementRole', id: string, identifier: string, description: string }>, memberships: Array<{ __typename?: 'ManagementMembership', id: string, roles: Array<{ __typename?: 'ManagementRole', identifier: string }>, user: { __typename?: 'ManagementUser', id: string, username: string, email?: string | null, profile: { __typename?: 'ManagementProfile', id: string, avatar?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null } } }>, profile?: { __typename?: 'ManagementOrganizationProfile', id: string, name?: string | null, bio?: string | null, avatar?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null, banner?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null } | null, invites: Array<{ __typename?: 'ManagementInvite', id: string, status: string, expiresAt?: any | null, token: string, inviteUrl: string, acceptedBy?: { __typename?: 'ManagementUser', id: string, username: string, profile: { __typename?: 'ManagementProfile', id: string, avatar?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null } } | null }> }, acceptedBy?: { __typename?: 'ManagementUser', id: string, username: string, profile: { __typename?: 'ManagementProfile', id: string, avatar?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null } } | null } };

export type GetInviteQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetInviteQuery = { __typename?: 'Query', invite: { __typename?: 'ManagementInvite', id: string, token: string, status: string, inviteUrl: string, createdAt: any, expiresAt?: any | null, createdBy: { __typename?: 'ManagementUser', id: string, username: string, profile: { __typename?: 'ManagementProfile', id: string, avatar?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null } }, createdFor: { __typename?: 'ManagementOrganization', id: string, name?: string | null, slug: string, roles: Array<{ __typename?: 'ManagementRole', id: string, identifier: string, description: string }>, memberships: Array<{ __typename?: 'ManagementMembership', id: string, roles: Array<{ __typename?: 'ManagementRole', identifier: string }>, user: { __typename?: 'ManagementUser', id: string, username: string, email?: string | null, profile: { __typename?: 'ManagementProfile', id: string, avatar?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null } } }>, profile?: { __typename?: 'ManagementOrganizationProfile', id: string, name?: string | null, bio?: string | null, avatar?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null, banner?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null } | null, invites: Array<{ __typename?: 'ManagementInvite', id: string, status: string, expiresAt?: any | null, token: string, inviteUrl: string, acceptedBy?: { __typename?: 'ManagementUser', id: string, username: string, profile: { __typename?: 'ManagementProfile', id: string, avatar?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null } } | null }> }, acceptedBy?: { __typename?: 'ManagementUser', id: string, username: string, profile: { __typename?: 'ManagementProfile', id: string, avatar?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null } } | null, createdMemberships: Array<{ __typename?: 'ManagementMembership', id: string, roles: Array<{ __typename?: 'ManagementRole', identifier: string, id: string }>, user: { __typename?: 'ManagementUser', id: string, username: string, email?: string | null, profile: { __typename?: 'ManagementProfile', id: string, avatar?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null } } }> } };

export type ListKommunityPartnerQueryVariables = Exact<{
  pagination?: InputMaybe<OffsetPaginationInput>;
  filters?: InputMaybe<ManagementKommunityPartnerFilter>;
  order?: InputMaybe<ManagementKommunityPartnerOrder>;
}>;


export type ListKommunityPartnerQuery = { __typename?: 'Query', kommunityPartners: Array<{ __typename?: 'ManagementKommunityPartner', id: string, identifier: string, name: string, description?: string | null, logoUrl?: string | null, authUrl?: string | null, websiteUrl?: string | null, partnerKind: string, kommunityKind: string, autoConfigure: boolean }> };

export type GetKommunityPartnerQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetKommunityPartnerQuery = { __typename?: 'Query', kommunityPartner: { __typename?: 'ManagementKommunityPartner', id: string, identifier: string, name: string, description?: string | null, logoUrl?: string | null, authUrl?: string | null, websiteUrl?: string | null, partnerKind: string, kommunityKind: string, autoConfigure: boolean, preconfiguredComposition?: any | null } };

export type LayersQueryVariables = Exact<{
  filters?: InputMaybe<ManagementLayerFilter>;
  pagination?: InputMaybe<OffsetPaginationInput>;
  order?: InputMaybe<ManagementLayerOrder>;
}>;


export type LayersQuery = { __typename?: 'Query', layers: Array<{ __typename?: 'ManagementLayer', id: string, name: string, description?: string | null, logo?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null }> };

export type DetailLayerQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type DetailLayerQuery = { __typename?: 'Query', layer: { __typename?: 'ManagementLayer', id: string, name: string, description?: string | null, logo?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null, aliases: Array<{ __typename?: 'ManagementInstanceAlias', id: string, host?: string | null, port?: number | null, ssl: boolean, path?: string | null, challenge: string, kind: string, scope: string, layer?: { __typename?: 'ManagementLayer', id: string, name: string } | null, instance: { __typename?: 'ManagementServiceInstance', id: string, identifier: string, release: { __typename?: 'ManagementServiceRelease', version: string, service: { __typename?: 'ManagementService', id: string, identifier: any } } } }>, machines: Array<{ __typename?: 'ManagementMachine', id: string, localId: string, name: string, ipv4?: string | null, ipv6?: string | null, connected: boolean, ephemeral: boolean, lastSeen?: any | null, tags: Array<string> }>, authKeys: Array<{ __typename?: 'ManagementIonscaleAuthKey', id: string, key: string, createdAt: any, ephemeral: boolean, tags: Array<string>, creator: { __typename?: 'ManagementUser', id: string, email?: string | null } }> } };

export type DetailMachineQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type DetailMachineQuery = { __typename?: 'Query', machine: { __typename?: 'ManagementMachine', id: string, localId: string, name: string, ipv4?: string | null, ipv6?: string | null, connected: boolean, ephemeral: boolean, lastSeen?: any | null, tags: Array<string> } };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me: { __typename?: 'ManagementUser', id: string, username: string, email?: string | null, firstName?: string | null, lastName?: string | null, avatar?: string | null, profile: { __typename?: 'ManagementProfile', id: string, name?: string | null, bio?: string | null, avatar?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null, banner?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null }, memberships: Array<{ __typename?: 'ManagementMembership', id: string, roles: Array<{ __typename?: 'ManagementRole', identifier: string, id: string }>, user: { __typename?: 'ManagementUser', id: string, username: string, email?: string | null, profile: { __typename?: 'ManagementProfile', id: string, avatar?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null } }, organization: { __typename?: 'ManagementOrganization', id: string, name?: string | null, slug: string, roles: Array<{ __typename?: 'ManagementRole', id: string, identifier: string, description: string }> } }>, socialAccounts: Array<
      | { __typename: 'ManagementGenericAccount', id: string, provider: string }
      | { __typename: 'ManagementGithubAccount', id: string, provider: string }
      | { __typename: 'ManagementGoogleAccount', id: string, provider: string }
      | { __typename: 'ManagementOrcidAccount', id: string, provider: string }
    > } };

export type MembershipsQueryVariables = Exact<{
  filters?: InputMaybe<ManagementMembershipFilter>;
  order?: InputMaybe<ManagementMembershipOrder>;
  pagination?: InputMaybe<OffsetPaginationInput>;
}>;


export type MembershipsQuery = { __typename?: 'Query', memberships: Array<{ __typename?: 'ManagementMembership', id: string, roles: Array<{ __typename?: 'ManagementRole', identifier: string, id: string }>, user: { __typename?: 'ManagementUser', id: string, username: string, profile: { __typename?: 'ManagementProfile', id: string, avatar?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null } }, organization: { __typename?: 'ManagementOrganization', id: string, name?: string | null, slug: string, profile?: { __typename?: 'ManagementOrganizationProfile', id: string, name?: string | null, bio?: string | null, avatar?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null, banner?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null } | null, memberships: Array<{ __typename?: 'ManagementMembership', id: string, roles: Array<{ __typename?: 'ManagementRole', identifier: string }>, user: { __typename?: 'ManagementUser', id: string, username: string, profile: { __typename?: 'ManagementProfile', id: string, avatar?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null } } }>, latestClients: Array<{ __typename?: 'ManagementClient', id: string, name: string, kind: string, lastReportedAt?: any | null, organization: { __typename?: 'ManagementOrganization', id: string }, user?: { __typename?: 'ManagementUser', id: string, username: string } | null, logo?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null, device?: { __typename?: 'ManagementDevice', id: string, name?: string | null } | null, release: { __typename?: 'ManagementRelease', version: any, logo?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null, app: { __typename?: 'ManagementApp', id: string, identifier: any, logo?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null } }, manifest: { __typename?: 'ManagementStagingManifest', identifier: string, version: string, requirements: Array<{ __typename?: 'ManagementStagingRequirement', key: string, description?: string | null }> } }>, latestServices: Array<{ __typename?: 'ManagementServiceInstance', id: string, identifier: string, release: { __typename?: 'ManagementServiceRelease', id: string, version: string, service: { __typename?: 'ManagementService', id: string, identifier: any, logo?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null } }, organization: { __typename?: 'ManagementOrganization', id: string } }> } }> };

export type GetMembershipQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetMembershipQuery = { __typename?: 'Query', membership: { __typename?: 'ManagementMembership', id: string, roles: Array<{ __typename?: 'ManagementRole', identifier: string, id: string }>, user: { __typename?: 'ManagementUser', id: string, username: string, email?: string | null, profile: { __typename?: 'ManagementProfile', id: string, avatar?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null } }, organization: { __typename?: 'ManagementOrganization', id: string, name?: string | null, slug: string, roles: Array<{ __typename?: 'ManagementRole', id: string, identifier: string, description: string }> } } };

export type GetOauth2ClientByClientIdQueryVariables = Exact<{
  clientId: Scalars['String']['input'];
}>;


export type GetOauth2ClientByClientIdQuery = { __typename?: 'Query', oauth2ClientByClientId: { __typename?: 'ManagementOAuth2Client', id: string, name: string, clientId: string, redirectUris: string } };

export type OrganizationQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type OrganizationQuery = { __typename?: 'Query', organization: { __typename?: 'ManagementOrganization', id: string, name?: string | null, slug: string, roles: Array<{ __typename?: 'ManagementRole', id: string, identifier: string, description: string }>, memberships: Array<{ __typename?: 'ManagementMembership', id: string, roles: Array<{ __typename?: 'ManagementRole', identifier: string }>, user: { __typename?: 'ManagementUser', id: string, username: string, email?: string | null, profile: { __typename?: 'ManagementProfile', id: string, avatar?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null } } }>, profile?: { __typename?: 'ManagementOrganizationProfile', id: string, name?: string | null, bio?: string | null, avatar?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null, banner?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null } | null, invites: Array<{ __typename?: 'ManagementInvite', id: string, status: string, expiresAt?: any | null, token: string, inviteUrl: string, acceptedBy?: { __typename?: 'ManagementUser', id: string, username: string, profile: { __typename?: 'ManagementProfile', id: string, avatar?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null } } | null }> } };

export type SidebarOrganizationQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type SidebarOrganizationQuery = { __typename?: 'Query', organization: { __typename?: 'ManagementOrganization', id: string, name?: string | null, slug: string, profile?: { __typename?: 'ManagementOrganizationProfile', id: string, name?: string | null, bio?: string | null, avatar?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null, banner?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null } | null, memberships: Array<{ __typename?: 'ManagementMembership', id: string, roles: Array<{ __typename?: 'ManagementRole', identifier: string }>, user: { __typename?: 'ManagementUser', id: string, username: string, profile: { __typename?: 'ManagementProfile', id: string, avatar?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null } } }>, latestClients: Array<{ __typename?: 'ManagementClient', id: string, name: string, kind: string, lastReportedAt?: any | null, organization: { __typename?: 'ManagementOrganization', id: string }, user?: { __typename?: 'ManagementUser', id: string, username: string } | null, logo?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null, device?: { __typename?: 'ManagementDevice', id: string, name?: string | null } | null, release: { __typename?: 'ManagementRelease', version: any, logo?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null, app: { __typename?: 'ManagementApp', id: string, identifier: any, logo?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null } }, manifest: { __typename?: 'ManagementStagingManifest', identifier: string, version: string, requirements: Array<{ __typename?: 'ManagementStagingRequirement', key: string, description?: string | null }> } }>, latestServices: Array<{ __typename?: 'ManagementServiceInstance', id: string, identifier: string, release: { __typename?: 'ManagementServiceRelease', id: string, version: string, service: { __typename?: 'ManagementService', id: string, identifier: any, logo?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null } }, organization: { __typename?: 'ManagementOrganization', id: string } }> } };

export type ListOrganizationsQueryVariables = Exact<{
  filters?: InputMaybe<OrganizationFilter>;
  pagination?: InputMaybe<OffsetPaginationInput>;
}>;


export type ListOrganizationsQuery = { __typename?: 'Query', organizations: Array<{ __typename?: 'ManagementOrganization', id: string, name?: string | null, slug: string }> };

export type OrganizationOptionsQueryVariables = Exact<{
  search?: InputMaybe<Scalars['String']['input']>;
  values?: InputMaybe<Array<Scalars['ID']['input']> | Scalars['ID']['input']>;
}>;


export type OrganizationOptionsQuery = { __typename?: 'Query', options: Array<{ __typename?: 'ManagementOrganization', value: string, label?: string | null }> };

export type ReleasesQueryVariables = Exact<{ [key: string]: never; }>;


export type ReleasesQuery = { __typename?: 'Query', releases: Array<{ __typename?: 'ManagementRelease', id: string, version: any, logo?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null, app: { __typename?: 'ManagementApp', id: string, identifier: any, logo?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null } }> };

export type DetailReleaseQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type DetailReleaseQuery = { __typename?: 'Query', release: { __typename?: 'ManagementRelease', id: string, version: any, logo?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null, app: { __typename?: 'ManagementApp', id: string, identifier: any, logo?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null }, clients: Array<{ __typename?: 'ManagementClient', id: string, name: string, kind: string, lastReportedAt?: any | null, organization: { __typename?: 'ManagementOrganization', id: string }, user?: { __typename?: 'ManagementUser', id: string, username: string } | null, logo?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null, device?: { __typename?: 'ManagementDevice', id: string, name?: string | null } | null, release: { __typename?: 'ManagementRelease', version: any, logo?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null, app: { __typename?: 'ManagementApp', id: string, identifier: any, logo?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null } }, manifest: { __typename?: 'ManagementStagingManifest', identifier: string, version: string, requirements: Array<{ __typename?: 'ManagementStagingRequirement', key: string, description?: string | null }> } }> } };

export type RolesQueryVariables = Exact<{
  filters?: InputMaybe<ManagementRoleFilter>;
  order?: InputMaybe<ManagementRoleOrder>;
  pagination?: InputMaybe<OffsetPaginationInput>;
}>;


export type RolesQuery = { __typename?: 'Query', roles: Array<{ __typename?: 'ManagementRole', id: string, description: string, identifier: string }> };

export type GetRoleQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetRoleQuery = { __typename?: 'Query', role: { __typename?: 'ManagementRole', id: string, identifier: string, description: string, creatingInstance?: { __typename?: 'ManagementServiceInstance', id: string, identifier: string, release: { __typename?: 'ManagementServiceRelease', id: string, version: string, service: { __typename?: 'ManagementService', id: string, identifier: any, logo?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null } }, organization: { __typename?: 'ManagementOrganization', id: string } } | null, organization: { __typename?: 'ManagementOrganization', id: string }, usedBy: Array<{ __typename?: 'ManagementServiceInstance', id: string, identifier: string, release: { __typename?: 'ManagementServiceRelease', id: string, version: string, service: { __typename?: 'ManagementService', id: string, identifier: any, logo?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null } }, organization: { __typename?: 'ManagementOrganization', id: string } }> } };

export type ScopesQueryVariables = Exact<{
  filters?: InputMaybe<ManagementScopeFilter>;
  order?: InputMaybe<ManagementScopeOrder>;
  pagination?: InputMaybe<OffsetPaginationInput>;
}>;


export type ScopesQuery = { __typename?: 'Query', scopes: Array<{ __typename?: 'ManagementScope', id: string, description: string, identifier: string }> };

export type DeteilScopeQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type DeteilScopeQuery = { __typename?: 'Query', scope: { __typename?: 'ManagementScope', id: string, description: string, identifier: string, creatingInstance?: { __typename?: 'ManagementServiceInstance', id: string, identifier: string, release: { __typename?: 'ManagementServiceRelease', id: string, version: string, service: { __typename?: 'ManagementService', id: string, identifier: any, logo?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null } }, organization: { __typename?: 'ManagementOrganization', id: string } } | null, organization: { __typename?: 'ManagementOrganization', id: string }, usedBy: Array<{ __typename?: 'ManagementServiceInstance', id: string, identifier: string, release: { __typename?: 'ManagementServiceRelease', id: string, version: string, service: { __typename?: 'ManagementService', id: string, identifier: any, logo?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null } }, organization: { __typename?: 'ManagementOrganization', id: string } }> } };

export type ServiceDeviceCodeByCodeQueryVariables = Exact<{
  code: Scalars['String']['input'];
}>;


export type ServiceDeviceCodeByCodeQuery = { __typename?: 'Query', serviceDeviceCodeByCode: { __typename?: 'ManagementServiceDeviceCode', id: string, code: string, stagingAliases?: Array<{ __typename?: 'StagingAlias', host?: string | null, port?: number | null }> | null, stagingManifest?: { __typename?: 'ManagementStagingServiceManifest', identifier: string, version: string, logo?: string | null, description?: string | null, roles?: Array<{ __typename?: 'StagingRole', key: string, description?: string | null }> | null, scopes?: Array<{ __typename?: 'StagingScope', key: string, description?: string | null }> | null, publicSources: Array<{ __typename?: 'ManagementStagingPublicSource', kind: string, url: string }> } | null, instance?: { __typename?: 'ManagementServiceInstance', id: string, identifier: string, release: { __typename?: 'ManagementServiceRelease', id: string, version: string, service: { __typename?: 'ManagementService', id: string, identifier: any } } } | null } };

export type ListServiceInstancesQueryVariables = Exact<{
  pagination?: InputMaybe<OffsetPaginationInput>;
  filters?: InputMaybe<ManagementServiceInstanceFilter>;
  order?: InputMaybe<ManagementServiceInstanceOrder>;
}>;


export type ListServiceInstancesQuery = { __typename?: 'Query', serviceInstances: Array<{ __typename?: 'ManagementServiceInstance', id: string, identifier: string, release: { __typename?: 'ManagementServiceRelease', id: string, version: string, service: { __typename?: 'ManagementService', id: string, identifier: any, logo?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null } }, organization: { __typename?: 'ManagementOrganization', id: string } }> };

export type GetServiceInstanceQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetServiceInstanceQuery = { __typename?: 'Query', serviceInstance: { __typename?: 'ManagementServiceInstance', identifier: string, id: string, release: { __typename?: 'ManagementServiceRelease', id: string, version: string, service: { __typename?: 'ManagementService', identifier: any, id: string, description?: string | null, name: string, logo?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null } }, device?: { __typename?: 'ManagementDevice', id: string, name?: string | null } | null, organization: { __typename?: 'ManagementOrganization', id: string }, allowedUsers: Array<{ __typename?: 'ManagementUser', username: string, firstName?: string | null, lastName?: string | null, email?: string | null, avatar?: string | null, id: string, profile: { __typename?: 'ManagementProfile', id: string, name?: string | null, bio?: string | null, avatar?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null, banner?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null } }>, deniedUsers: Array<{ __typename?: 'ManagementUser', username: string, firstName?: string | null, lastName?: string | null, email?: string | null, avatar?: string | null, id: string, profile: { __typename?: 'ManagementProfile', id: string, name?: string | null, bio?: string | null, avatar?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null, banner?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null } }>, mappings: Array<{ __typename?: 'ManagementServiceInstanceMapping', id: string, key: string, optional: boolean, instance: { __typename?: 'ManagementServiceInstance', id: string, identifier: string, release: { __typename?: 'ManagementServiceRelease', id: string, version: string, service: { __typename?: 'ManagementService', id: string, identifier: any, logo?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null } }, organization: { __typename?: 'ManagementOrganization', id: string } }, client: { __typename?: 'ManagementClient', id: string, name: string, kind: string, lastReportedAt?: any | null, organization: { __typename?: 'ManagementOrganization', id: string }, user?: { __typename?: 'ManagementUser', id: string, username: string } | null, logo?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null, device?: { __typename?: 'ManagementDevice', id: string, name?: string | null } | null, release: { __typename?: 'ManagementRelease', version: any, logo?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null, app: { __typename?: 'ManagementApp', id: string, identifier: any, logo?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null } }, manifest: { __typename?: 'ManagementStagingManifest', identifier: string, version: string, requirements: Array<{ __typename?: 'ManagementStagingRequirement', key: string, description?: string | null }> } } }>, aliases: Array<{ __typename?: 'ManagementInstanceAlias', id: string, host?: string | null, port?: number | null, ssl: boolean, path?: string | null, challenge: string, kind: string, scope: string, layer?: { __typename?: 'ManagementLayer', id: string, name: string } | null, instance: { __typename?: 'ManagementServiceInstance', id: string, identifier: string, release: { __typename?: 'ManagementServiceRelease', version: string, service: { __typename?: 'ManagementService', id: string, identifier: any } } } }>, logo?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null, roles: Array<{ __typename?: 'ManagementRole', id: string, identifier: string, description: string }>, scopes: Array<{ __typename?: 'ManagementScope', id: string, identifier: string, description: string }> } };

export type ListServiceInstanceMappingsQueryVariables = Exact<{
  pagination?: InputMaybe<OffsetPaginationInput>;
  filters?: InputMaybe<ServiceInstanceMappingFilter>;
}>;


export type ListServiceInstanceMappingsQuery = { __typename?: 'Query', serviceInstanceMappings: Array<{ __typename?: 'ManagementServiceInstanceMapping', id: string, key: string, optional: boolean, instance: { __typename?: 'ManagementServiceInstance', id: string, identifier: string, release: { __typename?: 'ManagementServiceRelease', id: string, version: string, service: { __typename?: 'ManagementService', id: string, identifier: any, logo?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null } }, organization: { __typename?: 'ManagementOrganization', id: string } }, client: { __typename?: 'ManagementClient', id: string, name: string, kind: string, lastReportedAt?: any | null, organization: { __typename?: 'ManagementOrganization', id: string }, user?: { __typename?: 'ManagementUser', id: string, username: string } | null, logo?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null, device?: { __typename?: 'ManagementDevice', id: string, name?: string | null } | null, release: { __typename?: 'ManagementRelease', version: any, logo?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null, app: { __typename?: 'ManagementApp', id: string, identifier: any, logo?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null } }, manifest: { __typename?: 'ManagementStagingManifest', identifier: string, version: string, requirements: Array<{ __typename?: 'ManagementStagingRequirement', key: string, description?: string | null }> } } }> };

export type GetServiceInstanceMappingQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetServiceInstanceMappingQuery = { __typename?: 'Query', serviceInstanceMapping: { __typename?: 'ManagementServiceInstanceMapping', id: string, key: string, optional: boolean, instance: { __typename?: 'ManagementServiceInstance', id: string, identifier: string, release: { __typename?: 'ManagementServiceRelease', id: string, version: string, service: { __typename?: 'ManagementService', id: string, identifier: any, logo?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null } }, organization: { __typename?: 'ManagementOrganization', id: string } }, client: { __typename?: 'ManagementClient', id: string, name: string, kind: string, lastReportedAt?: any | null, organization: { __typename?: 'ManagementOrganization', id: string }, user?: { __typename?: 'ManagementUser', id: string, username: string } | null, logo?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null, device?: { __typename?: 'ManagementDevice', id: string, name?: string | null } | null, release: { __typename?: 'ManagementRelease', version: any, logo?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null, app: { __typename?: 'ManagementApp', id: string, identifier: any, logo?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null } }, manifest: { __typename?: 'ManagementStagingManifest', identifier: string, version: string, requirements: Array<{ __typename?: 'ManagementStagingRequirement', key: string, description?: string | null }> } } } };

export type ServiceReleasesQueryVariables = Exact<{ [key: string]: never; }>;


export type ServiceReleasesQuery = { __typename?: 'Query', serviceReleases: Array<{ __typename?: 'ManagementServiceRelease', id: string, version: string, instances: Array<{ __typename?: 'ManagementServiceInstance', id: string, identifier: string, release: { __typename?: 'ManagementServiceRelease', id: string, version: string, service: { __typename?: 'ManagementService', id: string, identifier: any, logo?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null } }, organization: { __typename?: 'ManagementOrganization', id: string } }> }> };

export type DetailServiceReleaseQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type DetailServiceReleaseQuery = { __typename?: 'Query', serviceRelease: { __typename?: 'ManagementServiceRelease', id: string, version: string, service: { __typename?: 'ManagementService', identifier: any, id: string, name: string, description?: string | null, logo?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null, releases: Array<{ __typename?: 'ManagementServiceRelease', id: string, version: string, instances: Array<{ __typename?: 'ManagementServiceInstance', id: string, identifier: string, release: { __typename?: 'ManagementServiceRelease', id: string, version: string, service: { __typename?: 'ManagementService', id: string, identifier: any, logo?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null } }, organization: { __typename?: 'ManagementOrganization', id: string } }> }> } } };

export type ListServicesQueryVariables = Exact<{
  pagination?: InputMaybe<OffsetPaginationInput>;
  filters?: InputMaybe<ServiceFilter>;
}>;


export type ListServicesQuery = { __typename?: 'Query', services: Array<{ __typename?: 'ManagementService', identifier: any, id: string, name: string, description?: string | null, logo?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null, releases: Array<{ __typename?: 'ManagementServiceRelease', id: string, version: string, instances: Array<{ __typename?: 'ManagementServiceInstance', id: string, identifier: string, release: { __typename?: 'ManagementServiceRelease', id: string, version: string, service: { __typename?: 'ManagementService', id: string, identifier: any, logo?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null } }, organization: { __typename?: 'ManagementOrganization', id: string } }> }> }> };

export type GetServiceQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetServiceQuery = { __typename?: 'Query', service: { __typename?: 'ManagementService', identifier: any, id: string, name: string, description?: string | null, logo?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null, releases: Array<{ __typename?: 'ManagementServiceRelease', id: string, version: string, instances: Array<{ __typename?: 'ManagementServiceInstance', id: string, identifier: string, release: { __typename?: 'ManagementServiceRelease', id: string, version: string, service: { __typename?: 'ManagementService', id: string, identifier: any, logo?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null } }, organization: { __typename?: 'ManagementOrganization', id: string } }> }> } };

export type GetSocialAccountQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetSocialAccountQuery = { __typename?: 'Query', socialAccount:
    | { __typename: 'ManagementGenericAccount', id: string, provider: string }
    | { __typename: 'ManagementGithubAccount', id: string, provider: string }
    | { __typename: 'ManagementGoogleAccount', id: string, provider: string }
    | { __typename: 'ManagementOrcidAccount', id: string, provider: string, identifier: { __typename?: 'ManagementOrcidIdentifier', uri: string, path: string, host: string }, person?: { __typename?: 'ManagementOrcidPerson', researcherUrls: Array<string>, addresses: Array<string> } | null }
   };

export type ListUsedAliasesQueryVariables = Exact<{
  pagination?: InputMaybe<OffsetPaginationInput>;
  filters?: InputMaybe<ManagementDeviceFilter>;
}>;


export type ListUsedAliasesQuery = { __typename?: 'Query', usedAliases: Array<{ __typename?: 'ManagementUsedAlias', id: string, key: string, valid: boolean, reason?: string | null, alias?: { __typename?: 'ManagementInstanceAlias', id: string, host?: string | null, port?: number | null, ssl: boolean, path?: string | null, challenge: string, kind: string, scope: string, layer?: { __typename?: 'ManagementLayer', id: string, name: string } | null, instance: { __typename?: 'ManagementServiceInstance', id: string, identifier: string, release: { __typename?: 'ManagementServiceRelease', version: string, service: { __typename?: 'ManagementService', id: string, identifier: any } } } } | null }> };

export type GetUsedAliasQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetUsedAliasQuery = { __typename?: 'Query', usedAlias: { __typename?: 'ManagementUsedAlias', id: string, key: string, valid: boolean, reason?: string | null, alias?: { __typename?: 'ManagementInstanceAlias', id: string, host?: string | null, port?: number | null, ssl: boolean, path?: string | null, challenge: string, kind: string, scope: string, layer?: { __typename?: 'ManagementLayer', id: string, name: string } | null, instance: { __typename?: 'ManagementServiceInstance', id: string } } | null, client: { __typename?: 'ManagementClient', id: string, name: string, kind: string, lastReportedAt?: any | null, organization: { __typename?: 'ManagementOrganization', id: string }, user?: { __typename?: 'ManagementUser', id: string, username: string } | null, logo?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null, device?: { __typename?: 'ManagementDevice', id: string, name?: string | null } | null, release: { __typename?: 'ManagementRelease', version: any, logo?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null, app: { __typename?: 'ManagementApp', id: string, identifier: any, logo?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null } }, manifest: { __typename?: 'ManagementStagingManifest', identifier: string, version: string, requirements: Array<{ __typename?: 'ManagementStagingRequirement', key: string, description?: string | null }> } } } };

export const ListAppFragmentDoc = gql`
    fragment ListApp on ManagementApp {
  id
  identifier
  logo {
    presignedUrl
  }
}
    `;
export const ListReleaseFragmentDoc = gql`
    fragment ListRelease on ManagementRelease {
  id
  version
  logo {
    presignedUrl
  }
  app {
    ...ListApp
  }
}
    ${ListAppFragmentDoc}`;
export const DetailAppFragmentDoc = gql`
    fragment DetailApp on ManagementApp {
  id
  identifier
  logo {
    presignedUrl
  }
  releases {
    ...ListRelease
  }
}
    ${ListReleaseFragmentDoc}`;
export const IonscaleAuthKeyFragmentDoc = gql`
    fragment IonscaleAuthKey on ManagementIonscaleAuthKey {
  id
  key
  createdAt
  ephemeral
  tags
  creator {
    id
    email
  }
}
    `;
export const ListServiceInstanceFragmentDoc = gql`
    fragment ListServiceInstance on ManagementServiceInstance {
  id
  identifier
  release {
    id
    service {
      id
      identifier
      logo {
        presignedUrl
      }
    }
    version
  }
  organization {
    id
  }
}
    `;
export const ManifestFragmentDoc = gql`
    fragment Manifest on ManagementStagingManifest {
  identifier
  version
  requirements {
    key
    description
  }
}
    `;
export const ListClientFragmentDoc = gql`
    fragment ListClient on ManagementClient {
  id
  organization {
    id
  }
  user {
    id
    username
  }
  logo {
    presignedUrl
  }
  device {
    id
    name
  }
  name
  kind
  release {
    version
    logo {
      presignedUrl
    }
    app {
      id
      identifier
      logo {
        presignedUrl
      }
    }
  }
  manifest {
    ...Manifest
  }
  lastReportedAt
}
    ${ManifestFragmentDoc}`;
export const ListCompositionFragmentDoc = gql`
    fragment ListComposition on ManagementComposition {
  id
  name
  organization {
    id
    name
  }
  instances {
    ...ListServiceInstance
  }
  clients {
    ...ListClient
  }
}
    ${ListServiceInstanceFragmentDoc}
${ListClientFragmentDoc}`;
export const CompositionFragmentDoc = gql`
    fragment Composition on ManagementComposition {
  id
  name
  organization {
    id
    name
  }
  instances {
    ...ListServiceInstance
  }
  clients {
    ...ListClient
  }
}
    ${ListServiceInstanceFragmentDoc}
${ListClientFragmentDoc}`;
export const ServiceManifestFragmentDoc = gql`
    fragment ServiceManifest on ManagementStagingServiceManifest {
  identifier
  version
  logo
  description
  roles {
    key
    description
  }
  scopes {
    key
    description
  }
  publicSources {
    kind
    url
  }
}
    `;
export const CompositionManifestFragmentDoc = gql`
    fragment CompositionManifest on ManagementCompositionManifest {
  identifier
  instances {
    manifest {
      ...ServiceManifest
    }
    description
    identifier
  }
  clients {
    manifest {
      ...Manifest
    }
    description
    identifier
  }
}
    ${ServiceManifestFragmentDoc}
${ManifestFragmentDoc}`;
export const CompositionDeviceCodeFragmentDoc = gql`
    fragment CompositionDeviceCode on ManagementCompositionDeviceCode {
  id
  code
  manifest {
    ...CompositionManifest
  }
}
    ${CompositionManifestFragmentDoc}`;
export const ListDeviceGroupFragmentDoc = gql`
    fragment ListDeviceGroup on ManagementDeviceGroup {
  id
  name
}
    `;
export const DeviceFragmentDoc = gql`
    fragment Device on ManagementDevice {
  id
  name
  nodeId
  clients {
    ...ListClient
  }
  deviceGroups {
    ...ListDeviceGroup
  }
  serviceInstances {
    ...ListServiceInstance
  }
}
    ${ListClientFragmentDoc}
${ListDeviceGroupFragmentDoc}
${ListServiceInstanceFragmentDoc}`;
export const ListServiceInstanceMappingFragmentDoc = gql`
    fragment ListServiceInstanceMapping on ManagementServiceInstanceMapping {
  id
  key
  instance {
    ...ListServiceInstance
  }
  client {
    ...ListClient
  }
  optional
}
    ${ListServiceInstanceFragmentDoc}
${ListClientFragmentDoc}`;
export const ListInstanceAliasFragmentDoc = gql`
    fragment ListInstanceAlias on ManagementInstanceAlias {
  id
  host
  port
  ssl
  path
  challenge
  kind
  layer {
    id
    name
  }
  instance {
    id
    identifier
    release {
      service {
        id
        identifier
      }
      version
    }
  }
  scope
}
    `;
export const ListUsedAliasFragmentDoc = gql`
    fragment ListUsedAlias on ManagementUsedAlias {
  id
  key
  valid
  reason
  alias {
    ...ListInstanceAlias
  }
}
    ${ListInstanceAliasFragmentDoc}`;
export const DetailClientFragmentDoc = gql`
    fragment DetailClient on ManagementClient {
  id
  token
  name
  user {
    id
    username
  }
  organization {
    id
    name
    slug
  }
  lastReportedAt
  functional
  kind
  release {
    ...ListRelease
  }
  logo {
    presignedUrl
  }
  mappings {
    ...ListServiceInstanceMapping
  }
  usedAliases {
    ...ListUsedAlias
  }
  device {
    id
    name
  }
  issueUrl
  publicSources {
    kind
    url
  }
  manifest {
    ...Manifest
  }
  scopes {
    id
    identifier
    description
  }
}
    ${ListReleaseFragmentDoc}
${ListServiceInstanceMappingFragmentDoc}
${ListUsedAliasFragmentDoc}
${ManifestFragmentDoc}`;
export const DetailDeviceFragmentDoc = gql`
    fragment DetailDevice on ManagementDevice {
  id
  name
  nodeId
  organization {
    id
    name
  }
  clients {
    ...DetailClient
  }
  deviceGroups {
    ...ListDeviceGroup
  }
  serviceInstances {
    ...ListServiceInstance
  }
}
    ${DetailClientFragmentDoc}
${ListDeviceGroupFragmentDoc}
${ListServiceInstanceFragmentDoc}`;
export const DeviceCodeFragmentDoc = gql`
    fragment DeviceCode on ManagementDeviceCode {
  id
  code
  stagingKind
  stagingManifest {
    identifier
    version
    logo
    description
    url
    scopes
    publicSources {
      kind
      url
    }
  }
  client {
    id
    kind
    name
    release {
      version
      scopes
      app {
        identifier
      }
    }
  }
}
    `;
export const ListDeviceFragmentDoc = gql`
    fragment ListDevice on ManagementDevice {
  id
  name
  nodeId
}
    `;
export const DetailDeviceGroupFragmentDoc = gql`
    fragment DetailDeviceGroup on ManagementDeviceGroup {
  id
  name
  devices {
    ...ListDevice
  }
}
    ${ListDeviceFragmentDoc}`;
export const ListOrganizationFragmentDoc = gql`
    fragment ListOrganization on ManagementOrganization {
  id
  name
  slug
}
    `;
export const ListInviteFragmentDoc = gql`
    fragment ListInvite on ManagementInvite {
  id
  token
  createdBy {
    id
    username
  }
  createdFor {
    ...ListOrganization
  }
  status
  createdAt
  expiresAt
}
    ${ListOrganizationFragmentDoc}`;
export const OrganizationProfileFragmentDoc = gql`
    fragment OrganizationProfile on ManagementOrganizationProfile {
  id
  name
  avatar {
    presignedUrl
  }
  banner {
    presignedUrl
  }
  bio
}
    `;
export const OrganizationFragmentDoc = gql`
    fragment Organization on ManagementOrganization {
  id
  name
  slug
  roles {
    id
    identifier
    description
  }
  memberships {
    id
    roles {
      identifier
    }
    user {
      id
      username
      email
      profile {
        id
        avatar {
          presignedUrl
        }
      }
    }
  }
  profile {
    ...OrganizationProfile
  }
  invites {
    id
    acceptedBy {
      id
      username
      profile {
        id
        avatar {
          presignedUrl
        }
      }
    }
    status
    expiresAt
    token
    inviteUrl
  }
}
    ${OrganizationProfileFragmentDoc}`;
export const InviteFragmentDoc = gql`
    fragment Invite on ManagementInvite {
  id
  token
  createdBy {
    id
    username
    profile {
      id
      avatar {
        presignedUrl
      }
    }
  }
  createdFor {
    ...Organization
  }
  acceptedBy {
    id
    username
    profile {
      id
      avatar {
        presignedUrl
      }
    }
  }
  status
  inviteUrl
  createdAt
  expiresAt
}
    ${OrganizationFragmentDoc}`;
export const DetailInviteFragmentDoc = gql`
    fragment DetailInvite on ManagementInvite {
  id
  token
  createdBy {
    id
    username
    profile {
      id
      avatar {
        presignedUrl
      }
    }
  }
  createdFor {
    ...Organization
  }
  acceptedBy {
    id
    username
    profile {
      id
      avatar {
        presignedUrl
      }
    }
  }
  createdMemberships {
    id
    roles {
      identifier
      id
    }
    user {
      id
      username
      email
      profile {
        id
        avatar {
          presignedUrl
        }
      }
    }
  }
  status
  inviteUrl
  createdAt
  expiresAt
}
    ${OrganizationFragmentDoc}`;
export const MachineFragmentDoc = gql`
    fragment Machine on ManagementMachine {
  id
  localId
  name
  ipv4
  ipv6
  connected
  ephemeral
  lastSeen
  tags
}
    `;
export const ListIonscaleAuthKeyFragmentDoc = gql`
    fragment ListIonscaleAuthKey on ManagementIonscaleAuthKey {
  id
  key
  createdAt
  ephemeral
  tags
  creator {
    id
    email
  }
}
    `;
export const LayerFragmentDoc = gql`
    fragment Layer on ManagementLayer {
  id
  name
  description
  logo {
    presignedUrl
  }
  aliases {
    ...ListInstanceAlias
  }
  machines {
    ...Machine
  }
  authKeys {
    ...ListIonscaleAuthKey
  }
}
    ${ListInstanceAliasFragmentDoc}
${MachineFragmentDoc}
${ListIonscaleAuthKeyFragmentDoc}`;
export const ListLayerFragmentDoc = gql`
    fragment ListLayer on ManagementLayer {
  id
  name
  description
  logo {
    presignedUrl
  }
}
    `;
export const SidebarOrganizationFragmentDoc = gql`
    fragment SidebarOrganization on ManagementOrganization {
  id
  name
  slug
  profile {
    ...OrganizationProfile
  }
  memberships {
    id
    roles {
      identifier
    }
    user {
      id
      username
      profile {
        id
        avatar {
          presignedUrl
        }
      }
    }
  }
  latestClients: clients(filters: {functional: true}, pagination: {limit: 5}) {
    ...ListClient
  }
  latestServices: serviceInstances(pagination: {limit: 5}) {
    ...ListServiceInstance
  }
}
    ${OrganizationProfileFragmentDoc}
${ListClientFragmentDoc}
${ListServiceInstanceFragmentDoc}`;
export const ListMembershipFragmentDoc = gql`
    fragment ListMembership on ManagementMembership {
  id
  roles {
    identifier
    id
  }
  user {
    id
    username
    profile {
      id
      avatar {
        presignedUrl
      }
    }
  }
  organization {
    ...SidebarOrganization
  }
}
    ${SidebarOrganizationFragmentDoc}`;
export const Oauth2ClientFragmentDoc = gql`
    fragment Oauth2Client on ManagementOAuth2Client {
  id
  name
  clientId
  redirectUris
}
    `;
export const KommunityPartnerFragmentDoc = gql`
    fragment KommunityPartner on ManagementKommunityPartner {
  id
  identifier
  name
  description
  logoUrl
  authUrl
  websiteUrl
  partnerKind
  kommunityKind
  autoConfigure
  preconfiguredComposition
}
    `;
export const ListKommunityPartnerFragmentDoc = gql`
    fragment ListKommunityPartner on ManagementKommunityPartner {
  id
  identifier
  name
  description
  logoUrl
  authUrl
  websiteUrl
  partnerKind
  kommunityKind
  autoConfigure
}
    `;
export const PresignedPostCredentialsFragmentDoc = gql`
    fragment PresignedPostCredentials on PresignedPostCredentials {
  xAmzAlgorithm
  xAmzCredential
  xAmzDate
  xAmzSignature
  key
  bucket
  datalayer
  policy
  store
}
    `;
export const ListRedeemTokenFragmentDoc = gql`
    fragment ListRedeemToken on ManagementRedeemToken {
  id
  token
  user {
    id
    email
  }
  client {
    id
    release {
      version
      app {
        identifier
      }
    }
  }
}
    `;
export const DetailRedeemTokenFragmentDoc = gql`
    fragment DetailRedeemToken on ManagementRedeemToken {
  ...ListRedeemToken
}
    ${ListRedeemTokenFragmentDoc}`;
export const DetailReleaseFragmentDoc = gql`
    fragment DetailRelease on ManagementRelease {
  id
  version
  logo {
    presignedUrl
  }
  app {
    ...ListApp
  }
  clients {
    ...ListClient
  }
}
    ${ListAppFragmentDoc}
${ListClientFragmentDoc}`;
export const RoleFragmentDoc = gql`
    fragment Role on ManagementRole {
  id
  identifier
  description
  creatingInstance {
    ...ListServiceInstance
  }
  organization {
    id
  }
  usedBy {
    ...ListServiceInstance
  }
}
    ${ListServiceInstanceFragmentDoc}`;
export const ListRoleFragmentDoc = gql`
    fragment ListRole on ManagementRole {
  id
  description
  identifier
}
    `;
export const ScopeFragmentDoc = gql`
    fragment Scope on ManagementScope {
  id
  description
  identifier
  creatingInstance {
    ...ListServiceInstance
  }
  organization {
    id
  }
  usedBy {
    ...ListServiceInstance
  }
}
    ${ListServiceInstanceFragmentDoc}`;
export const ListScopeFragmentDoc = gql`
    fragment ListScope on ManagementScope {
  id
  description
  identifier
}
    `;
export const ListServiceReleaseFragmentDoc = gql`
    fragment ListServiceRelease on ManagementServiceRelease {
  id
  version
  instances {
    ...ListServiceInstance
  }
}
    ${ListServiceInstanceFragmentDoc}`;
export const ListServiceFragmentDoc = gql`
    fragment ListService on ManagementService {
  identifier
  id
  name
  logo {
    presignedUrl
  }
  description
  releases {
    ...ListServiceRelease
  }
}
    ${ListServiceReleaseFragmentDoc}`;
export const ServiceDeviceCodeFragmentDoc = gql`
    fragment ServiceDeviceCode on ManagementServiceDeviceCode {
  id
  code
  stagingAliases {
    host
    port
  }
  stagingManifest {
    identifier
    version
    logo
    description
    roles {
      key
      description
    }
    scopes {
      key
      description
    }
    publicSources {
      kind
      url
    }
  }
  instance {
    id
    identifier
    release {
      id
      service {
        id
        identifier
      }
      version
    }
  }
}
    `;
export const ProfileFragmentDoc = gql`
    fragment Profile on ManagementProfile {
  id
  name
  avatar {
    presignedUrl
  }
  banner {
    presignedUrl
  }
  bio
}
    `;
export const ListUserFragmentDoc = gql`
    fragment ListUser on ManagementUser {
  username
  firstName
  lastName
  email
  avatar
  id
  profile {
    ...Profile
  }
}
    ${ProfileFragmentDoc}`;
export const ServiceInstanceFragmentDoc = gql`
    fragment ServiceInstance on ManagementServiceInstance {
  identifier
  release {
    id
    service {
      identifier
      id
      description
      name
      logo {
        presignedUrl
      }
    }
    version
  }
  id
  device {
    id
    name
  }
  organization {
    id
  }
  allowedUsers {
    ...ListUser
  }
  deniedUsers {
    ...ListUser
  }
  mappings {
    ...ListServiceInstanceMapping
  }
  aliases {
    ...ListInstanceAlias
  }
  logo {
    presignedUrl
  }
  roles {
    id
    identifier
    description
  }
  scopes {
    id
    identifier
    description
  }
}
    ${ListUserFragmentDoc}
${ListServiceInstanceMappingFragmentDoc}
${ListInstanceAliasFragmentDoc}`;
export const ServiceFragmentDoc = gql`
    fragment Service on ManagementService {
  identifier
  id
  name
  logo {
    presignedUrl
  }
  description
  releases {
    ...ListServiceRelease
  }
}
    ${ListServiceReleaseFragmentDoc}`;
export const ServiceReleaseFragmentDoc = gql`
    fragment ServiceRelease on ManagementServiceRelease {
  id
  version
  service {
    ...Service
  }
}
    ${ServiceFragmentDoc}`;
export const BaseSocialAccountFragmentDoc = gql`
    fragment BaseSocialAccount on ManagementSocialAccount {
  id
  provider
  __typename
}
    `;
export const OrcidSocialAccountFragmentDoc = gql`
    fragment OrcidSocialAccount on ManagementOrcidAccount {
  ...BaseSocialAccount
  identifier {
    uri
    path
    host
  }
  person {
    researcherUrls
    addresses
  }
}
    ${BaseSocialAccountFragmentDoc}`;
export const GithubSocialAccountFragmentDoc = gql`
    fragment GithubSocialAccount on ManagementGithubAccount {
  ...BaseSocialAccount
}
    ${BaseSocialAccountFragmentDoc}`;
export const GooglebSocialAccountFragmentDoc = gql`
    fragment GooglebSocialAccount on ManagementGoogleAccount {
  ...BaseSocialAccount
}
    ${BaseSocialAccountFragmentDoc}`;
export const DetailSocialAccountFragmentDoc = gql`
    fragment DetailSocialAccount on ManagementSocialAccount {
  id
  provider
  __typename
  ...OrcidSocialAccount
  ...GithubSocialAccount
  ...GooglebSocialAccount
}
    ${OrcidSocialAccountFragmentDoc}
${GithubSocialAccountFragmentDoc}
${GooglebSocialAccountFragmentDoc}`;
export const InstanceAliasFragmentDoc = gql`
    fragment InstanceAlias on ManagementInstanceAlias {
  id
  host
  port
  ssl
  path
  challenge
  kind
  layer {
    id
    name
  }
  instance {
    id
  }
  scope
}
    `;
export const DetailUsedAliasFragmentDoc = gql`
    fragment DetailUsedAlias on ManagementUsedAlias {
  id
  key
  valid
  reason
  alias {
    ...InstanceAlias
  }
  client {
    ...ListClient
  }
}
    ${InstanceAliasFragmentDoc}
${ListClientFragmentDoc}`;
export const MembershipFragmentDoc = gql`
    fragment Membership on ManagementMembership {
  id
  roles {
    identifier
    id
  }
  user {
    id
    username
    email
    profile {
      id
      avatar {
        presignedUrl
      }
    }
  }
  organization {
    ...ListOrganization
    roles {
      id
      identifier
      description
    }
  }
}
    ${ListOrganizationFragmentDoc}`;
export const DetailUserFragmentDoc = gql`
    fragment DetailUser on ManagementUser {
  id
  username
  email
  firstName
  lastName
  avatar
  groups {
    id
    name
  }
  profile {
    ...Profile
  }
  memberships {
    ...Membership
  }
}
    ${ProfileFragmentDoc}
${MembershipFragmentDoc}`;
export const ListSocialAccountFragmentDoc = gql`
    fragment ListSocialAccount on ManagementSocialAccount {
  id
  provider
  __typename
}
    `;
export const MeUserFragmentDoc = gql`
    fragment MeUser on ManagementUser {
  id
  username
  email
  firstName
  lastName
  avatar
  profile {
    ...Profile
  }
  memberships {
    ...Membership
  }
  socialAccounts {
    ...ListSocialAccount
  }
}
    ${ProfileFragmentDoc}
${MembershipFragmentDoc}
${ListSocialAccountFragmentDoc}`;
export const CreateAliasDocument = gql`
    mutation CreateAlias($input: CreateAliasInput!) {
  createAlias(input: $input) {
    ...InstanceAlias
  }
}
    ${InstanceAliasFragmentDoc}`;
export type CreateAliasMutationFn = Apollo.MutationFunction<CreateAliasMutation, CreateAliasMutationVariables>;

/**
 * __useCreateAliasMutation__
 *
 * To run a mutation, you first call `useCreateAliasMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateAliasMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createAliasMutation, { data, loading, error }] = useCreateAliasMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateAliasMutation(baseOptions?: Apollo.MutationHookOptions<CreateAliasMutation, CreateAliasMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateAliasMutation, CreateAliasMutationVariables>(CreateAliasDocument, options);
      }
export type CreateAliasMutationHookResult = ReturnType<typeof useCreateAliasMutation>;
export type CreateAliasMutationResult = Apollo.MutationResult<CreateAliasMutation>;
export type CreateAliasMutationOptions = Apollo.BaseMutationOptions<CreateAliasMutation, CreateAliasMutationVariables>;
export const DeleteAliasDocument = gql`
    mutation DeleteAlias($input: DeleteAliasInput!) {
  deleteAlias(input: $input)
}
    `;
export type DeleteAliasMutationFn = Apollo.MutationFunction<DeleteAliasMutation, DeleteAliasMutationVariables>;

/**
 * __useDeleteAliasMutation__
 *
 * To run a mutation, you first call `useDeleteAliasMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteAliasMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteAliasMutation, { data, loading, error }] = useDeleteAliasMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useDeleteAliasMutation(baseOptions?: Apollo.MutationHookOptions<DeleteAliasMutation, DeleteAliasMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteAliasMutation, DeleteAliasMutationVariables>(DeleteAliasDocument, options);
      }
export type DeleteAliasMutationHookResult = ReturnType<typeof useDeleteAliasMutation>;
export type DeleteAliasMutationResult = Apollo.MutationResult<DeleteAliasMutation>;
export type DeleteAliasMutationOptions = Apollo.BaseMutationOptions<DeleteAliasMutation, DeleteAliasMutationVariables>;
export const UpdateAliasDocument = gql`
    mutation UpdateAlias($input: UpdateAliasInput!) {
  updateAlias(input: $input) {
    ...InstanceAlias
  }
}
    ${InstanceAliasFragmentDoc}`;
export type UpdateAliasMutationFn = Apollo.MutationFunction<UpdateAliasMutation, UpdateAliasMutationVariables>;

/**
 * __useUpdateAliasMutation__
 *
 * To run a mutation, you first call `useUpdateAliasMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateAliasMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateAliasMutation, { data, loading, error }] = useUpdateAliasMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateAliasMutation(baseOptions?: Apollo.MutationHookOptions<UpdateAliasMutation, UpdateAliasMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateAliasMutation, UpdateAliasMutationVariables>(UpdateAliasDocument, options);
      }
export type UpdateAliasMutationHookResult = ReturnType<typeof useUpdateAliasMutation>;
export type UpdateAliasMutationResult = Apollo.MutationResult<UpdateAliasMutation>;
export type UpdateAliasMutationOptions = Apollo.BaseMutationOptions<UpdateAliasMutation, UpdateAliasMutationVariables>;
export const UpdateCompositionDocument = gql`
    mutation UpdateComposition($input: UpdateCompositionInput!) {
  updateComposition(input: $input) {
    ...Composition
  }
}
    ${CompositionFragmentDoc}`;
export type UpdateCompositionMutationFn = Apollo.MutationFunction<UpdateCompositionMutation, UpdateCompositionMutationVariables>;

/**
 * __useUpdateCompositionMutation__
 *
 * To run a mutation, you first call `useUpdateCompositionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateCompositionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateCompositionMutation, { data, loading, error }] = useUpdateCompositionMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateCompositionMutation(baseOptions?: Apollo.MutationHookOptions<UpdateCompositionMutation, UpdateCompositionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateCompositionMutation, UpdateCompositionMutationVariables>(UpdateCompositionDocument, options);
      }
export type UpdateCompositionMutationHookResult = ReturnType<typeof useUpdateCompositionMutation>;
export type UpdateCompositionMutationResult = Apollo.MutationResult<UpdateCompositionMutation>;
export type UpdateCompositionMutationOptions = Apollo.BaseMutationOptions<UpdateCompositionMutation, UpdateCompositionMutationVariables>;
export const DeleteCompositionDocument = gql`
    mutation DeleteComposition($input: DeleteCompositionInput!) {
  deleteComposition(input: $input)
}
    `;
export type DeleteCompositionMutationFn = Apollo.MutationFunction<DeleteCompositionMutation, DeleteCompositionMutationVariables>;

/**
 * __useDeleteCompositionMutation__
 *
 * To run a mutation, you first call `useDeleteCompositionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteCompositionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteCompositionMutation, { data, loading, error }] = useDeleteCompositionMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useDeleteCompositionMutation(baseOptions?: Apollo.MutationHookOptions<DeleteCompositionMutation, DeleteCompositionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteCompositionMutation, DeleteCompositionMutationVariables>(DeleteCompositionDocument, options);
      }
export type DeleteCompositionMutationHookResult = ReturnType<typeof useDeleteCompositionMutation>;
export type DeleteCompositionMutationResult = Apollo.MutationResult<DeleteCompositionMutation>;
export type DeleteCompositionMutationOptions = Apollo.BaseMutationOptions<DeleteCompositionMutation, DeleteCompositionMutationVariables>;
export const AcceptCompositionDeviceCodeDocument = gql`
    mutation AcceptCompositionDeviceCode($input: AcceptCompositionDeviceCodeInput!) {
  acceptCompositionDeviceCode(input: $input) {
    ...Composition
  }
}
    ${CompositionFragmentDoc}`;
export type AcceptCompositionDeviceCodeMutationFn = Apollo.MutationFunction<AcceptCompositionDeviceCodeMutation, AcceptCompositionDeviceCodeMutationVariables>;

/**
 * __useAcceptCompositionDeviceCodeMutation__
 *
 * To run a mutation, you first call `useAcceptCompositionDeviceCodeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAcceptCompositionDeviceCodeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [acceptCompositionDeviceCodeMutation, { data, loading, error }] = useAcceptCompositionDeviceCodeMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useAcceptCompositionDeviceCodeMutation(baseOptions?: Apollo.MutationHookOptions<AcceptCompositionDeviceCodeMutation, AcceptCompositionDeviceCodeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AcceptCompositionDeviceCodeMutation, AcceptCompositionDeviceCodeMutationVariables>(AcceptCompositionDeviceCodeDocument, options);
      }
export type AcceptCompositionDeviceCodeMutationHookResult = ReturnType<typeof useAcceptCompositionDeviceCodeMutation>;
export type AcceptCompositionDeviceCodeMutationResult = Apollo.MutationResult<AcceptCompositionDeviceCodeMutation>;
export type AcceptCompositionDeviceCodeMutationOptions = Apollo.BaseMutationOptions<AcceptCompositionDeviceCodeMutation, AcceptCompositionDeviceCodeMutationVariables>;
export const DeclineCompositionDeviceCodeDocument = gql`
    mutation DeclineCompositionDeviceCode($input: DeclineCompositionDeviceCodeInput!) {
  declineCompositionDeviceCode(input: $input) {
    ...CompositionDeviceCode
  }
}
    ${CompositionDeviceCodeFragmentDoc}`;
export type DeclineCompositionDeviceCodeMutationFn = Apollo.MutationFunction<DeclineCompositionDeviceCodeMutation, DeclineCompositionDeviceCodeMutationVariables>;

/**
 * __useDeclineCompositionDeviceCodeMutation__
 *
 * To run a mutation, you first call `useDeclineCompositionDeviceCodeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeclineCompositionDeviceCodeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [declineCompositionDeviceCodeMutation, { data, loading, error }] = useDeclineCompositionDeviceCodeMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useDeclineCompositionDeviceCodeMutation(baseOptions?: Apollo.MutationHookOptions<DeclineCompositionDeviceCodeMutation, DeclineCompositionDeviceCodeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeclineCompositionDeviceCodeMutation, DeclineCompositionDeviceCodeMutationVariables>(DeclineCompositionDeviceCodeDocument, options);
      }
export type DeclineCompositionDeviceCodeMutationHookResult = ReturnType<typeof useDeclineCompositionDeviceCodeMutation>;
export type DeclineCompositionDeviceCodeMutationResult = Apollo.MutationResult<DeclineCompositionDeviceCodeMutation>;
export type DeclineCompositionDeviceCodeMutationOptions = Apollo.BaseMutationOptions<DeclineCompositionDeviceCodeMutation, DeclineCompositionDeviceCodeMutationVariables>;
export const CreateDeviceDocument = gql`
    mutation CreateDevice($input: CreateDeviceInput!) {
  createDevice(input: $input) {
    ...Device
  }
}
    ${DeviceFragmentDoc}`;
export type CreateDeviceMutationFn = Apollo.MutationFunction<CreateDeviceMutation, CreateDeviceMutationVariables>;

/**
 * __useCreateDeviceMutation__
 *
 * To run a mutation, you first call `useCreateDeviceMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateDeviceMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createDeviceMutation, { data, loading, error }] = useCreateDeviceMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateDeviceMutation(baseOptions?: Apollo.MutationHookOptions<CreateDeviceMutation, CreateDeviceMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateDeviceMutation, CreateDeviceMutationVariables>(CreateDeviceDocument, options);
      }
export type CreateDeviceMutationHookResult = ReturnType<typeof useCreateDeviceMutation>;
export type CreateDeviceMutationResult = Apollo.MutationResult<CreateDeviceMutation>;
export type CreateDeviceMutationOptions = Apollo.BaseMutationOptions<CreateDeviceMutation, CreateDeviceMutationVariables>;
export const DeleteDeviceDocument = gql`
    mutation DeleteDevice($input: DeleteDeviceInput!) {
  deleteDevice(input: $input)
}
    `;
export type DeleteDeviceMutationFn = Apollo.MutationFunction<DeleteDeviceMutation, DeleteDeviceMutationVariables>;

/**
 * __useDeleteDeviceMutation__
 *
 * To run a mutation, you first call `useDeleteDeviceMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteDeviceMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteDeviceMutation, { data, loading, error }] = useDeleteDeviceMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useDeleteDeviceMutation(baseOptions?: Apollo.MutationHookOptions<DeleteDeviceMutation, DeleteDeviceMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteDeviceMutation, DeleteDeviceMutationVariables>(DeleteDeviceDocument, options);
      }
export type DeleteDeviceMutationHookResult = ReturnType<typeof useDeleteDeviceMutation>;
export type DeleteDeviceMutationResult = Apollo.MutationResult<DeleteDeviceMutation>;
export type DeleteDeviceMutationOptions = Apollo.BaseMutationOptions<DeleteDeviceMutation, DeleteDeviceMutationVariables>;
export const UpdateDeviceDocument = gql`
    mutation UpdateDevice($input: UpdateDeviceInput!) {
  updateDevice(input: $input) {
    ...Device
  }
}
    ${DeviceFragmentDoc}`;
export type UpdateDeviceMutationFn = Apollo.MutationFunction<UpdateDeviceMutation, UpdateDeviceMutationVariables>;

/**
 * __useUpdateDeviceMutation__
 *
 * To run a mutation, you first call `useUpdateDeviceMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateDeviceMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateDeviceMutation, { data, loading, error }] = useUpdateDeviceMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateDeviceMutation(baseOptions?: Apollo.MutationHookOptions<UpdateDeviceMutation, UpdateDeviceMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateDeviceMutation, UpdateDeviceMutationVariables>(UpdateDeviceDocument, options);
      }
export type UpdateDeviceMutationHookResult = ReturnType<typeof useUpdateDeviceMutation>;
export type UpdateDeviceMutationResult = Apollo.MutationResult<UpdateDeviceMutation>;
export type UpdateDeviceMutationOptions = Apollo.BaseMutationOptions<UpdateDeviceMutation, UpdateDeviceMutationVariables>;
export const AcceptDeviceCodeDocument = gql`
    mutation AcceptDeviceCode($input: AcceptDeviceCodeInput!) {
  acceptDeviceCode(input: $input) {
    ...DetailClient
  }
}
    ${DetailClientFragmentDoc}`;
export type AcceptDeviceCodeMutationFn = Apollo.MutationFunction<AcceptDeviceCodeMutation, AcceptDeviceCodeMutationVariables>;

/**
 * __useAcceptDeviceCodeMutation__
 *
 * To run a mutation, you first call `useAcceptDeviceCodeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAcceptDeviceCodeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [acceptDeviceCodeMutation, { data, loading, error }] = useAcceptDeviceCodeMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useAcceptDeviceCodeMutation(baseOptions?: Apollo.MutationHookOptions<AcceptDeviceCodeMutation, AcceptDeviceCodeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AcceptDeviceCodeMutation, AcceptDeviceCodeMutationVariables>(AcceptDeviceCodeDocument, options);
      }
export type AcceptDeviceCodeMutationHookResult = ReturnType<typeof useAcceptDeviceCodeMutation>;
export type AcceptDeviceCodeMutationResult = Apollo.MutationResult<AcceptDeviceCodeMutation>;
export type AcceptDeviceCodeMutationOptions = Apollo.BaseMutationOptions<AcceptDeviceCodeMutation, AcceptDeviceCodeMutationVariables>;
export const DeclineDeviceCodeDocument = gql`
    mutation DeclineDeviceCode($input: DeclineDeviceCodeInput!) {
  declineDeviceCode(input: $input) {
    ...DeviceCode
  }
}
    ${DeviceCodeFragmentDoc}`;
export type DeclineDeviceCodeMutationFn = Apollo.MutationFunction<DeclineDeviceCodeMutation, DeclineDeviceCodeMutationVariables>;

/**
 * __useDeclineDeviceCodeMutation__
 *
 * To run a mutation, you first call `useDeclineDeviceCodeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeclineDeviceCodeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [declineDeviceCodeMutation, { data, loading, error }] = useDeclineDeviceCodeMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useDeclineDeviceCodeMutation(baseOptions?: Apollo.MutationHookOptions<DeclineDeviceCodeMutation, DeclineDeviceCodeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeclineDeviceCodeMutation, DeclineDeviceCodeMutationVariables>(DeclineDeviceCodeDocument, options);
      }
export type DeclineDeviceCodeMutationHookResult = ReturnType<typeof useDeclineDeviceCodeMutation>;
export type DeclineDeviceCodeMutationResult = Apollo.MutationResult<DeclineDeviceCodeMutation>;
export type DeclineDeviceCodeMutationOptions = Apollo.BaseMutationOptions<DeclineDeviceCodeMutation, DeclineDeviceCodeMutationVariables>;
export const CreateDeviceGroupDocument = gql`
    mutation CreateDeviceGroup($input: CreateDeviceGroupInput!) {
  createDeviceGroup(input: $input) {
    ...DetailDeviceGroup
  }
}
    ${DetailDeviceGroupFragmentDoc}`;
export type CreateDeviceGroupMutationFn = Apollo.MutationFunction<CreateDeviceGroupMutation, CreateDeviceGroupMutationVariables>;

/**
 * __useCreateDeviceGroupMutation__
 *
 * To run a mutation, you first call `useCreateDeviceGroupMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateDeviceGroupMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createDeviceGroupMutation, { data, loading, error }] = useCreateDeviceGroupMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateDeviceGroupMutation(baseOptions?: Apollo.MutationHookOptions<CreateDeviceGroupMutation, CreateDeviceGroupMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateDeviceGroupMutation, CreateDeviceGroupMutationVariables>(CreateDeviceGroupDocument, options);
      }
export type CreateDeviceGroupMutationHookResult = ReturnType<typeof useCreateDeviceGroupMutation>;
export type CreateDeviceGroupMutationResult = Apollo.MutationResult<CreateDeviceGroupMutation>;
export type CreateDeviceGroupMutationOptions = Apollo.BaseMutationOptions<CreateDeviceGroupMutation, CreateDeviceGroupMutationVariables>;
export const DeleteDeviceGroupDocument = gql`
    mutation DeleteDeviceGroup($input: DeleteDeviceGroupInput!) {
  deleteDeviceGroup(input: $input)
}
    `;
export type DeleteDeviceGroupMutationFn = Apollo.MutationFunction<DeleteDeviceGroupMutation, DeleteDeviceGroupMutationVariables>;

/**
 * __useDeleteDeviceGroupMutation__
 *
 * To run a mutation, you first call `useDeleteDeviceGroupMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteDeviceGroupMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteDeviceGroupMutation, { data, loading, error }] = useDeleteDeviceGroupMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useDeleteDeviceGroupMutation(baseOptions?: Apollo.MutationHookOptions<DeleteDeviceGroupMutation, DeleteDeviceGroupMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteDeviceGroupMutation, DeleteDeviceGroupMutationVariables>(DeleteDeviceGroupDocument, options);
      }
export type DeleteDeviceGroupMutationHookResult = ReturnType<typeof useDeleteDeviceGroupMutation>;
export type DeleteDeviceGroupMutationResult = Apollo.MutationResult<DeleteDeviceGroupMutation>;
export type DeleteDeviceGroupMutationOptions = Apollo.BaseMutationOptions<DeleteDeviceGroupMutation, DeleteDeviceGroupMutationVariables>;
export const AddDeviceToGroupDocument = gql`
    mutation AddDeviceToGroup($input: AddDeviceToGroupInput!) {
  addDeviceToGroup(input: $input) {
    ...Device
  }
}
    ${DeviceFragmentDoc}`;
export type AddDeviceToGroupMutationFn = Apollo.MutationFunction<AddDeviceToGroupMutation, AddDeviceToGroupMutationVariables>;

/**
 * __useAddDeviceToGroupMutation__
 *
 * To run a mutation, you first call `useAddDeviceToGroupMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddDeviceToGroupMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addDeviceToGroupMutation, { data, loading, error }] = useAddDeviceToGroupMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useAddDeviceToGroupMutation(baseOptions?: Apollo.MutationHookOptions<AddDeviceToGroupMutation, AddDeviceToGroupMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddDeviceToGroupMutation, AddDeviceToGroupMutationVariables>(AddDeviceToGroupDocument, options);
      }
export type AddDeviceToGroupMutationHookResult = ReturnType<typeof useAddDeviceToGroupMutation>;
export type AddDeviceToGroupMutationResult = Apollo.MutationResult<AddDeviceToGroupMutation>;
export type AddDeviceToGroupMutationOptions = Apollo.BaseMutationOptions<AddDeviceToGroupMutation, AddDeviceToGroupMutationVariables>;
export const CreateInviteDocument = gql`
    mutation CreateInvite($input: CreateInviteInput!) {
  createInvite(input: $input) {
    ...Invite
  }
}
    ${InviteFragmentDoc}`;
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
export const AcceptInviteDocument = gql`
    mutation AcceptInvite($input: AcceptInviteInput!) {
  acceptInvite(input: $input) {
    organization {
      ...Organization
    }
  }
}
    ${OrganizationFragmentDoc}`;
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
export const DeclineInviteDocument = gql`
    mutation DeclineInvite($input: DeclineInviteInput!) {
  declineInvite(input: $input) {
    ...Invite
  }
}
    ${InviteFragmentDoc}`;
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
export const CancelInviteDocument = gql`
    mutation CancelInvite($input: CancelInviteInput!) {
  cancelInvite(input: $input) {
    ...Invite
  }
}
    ${InviteFragmentDoc}`;
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
export const CreateIonscaleLayerDocument = gql`
    mutation CreateIonscaleLayer($input: CreateIonscaleLayerInput!) {
  createIonscaleLayer(input: $input) {
    ...Layer
  }
}
    ${LayerFragmentDoc}`;
export type CreateIonscaleLayerMutationFn = Apollo.MutationFunction<CreateIonscaleLayerMutation, CreateIonscaleLayerMutationVariables>;

/**
 * __useCreateIonscaleLayerMutation__
 *
 * To run a mutation, you first call `useCreateIonscaleLayerMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateIonscaleLayerMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createIonscaleLayerMutation, { data, loading, error }] = useCreateIonscaleLayerMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateIonscaleLayerMutation(baseOptions?: Apollo.MutationHookOptions<CreateIonscaleLayerMutation, CreateIonscaleLayerMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateIonscaleLayerMutation, CreateIonscaleLayerMutationVariables>(CreateIonscaleLayerDocument, options);
      }
export type CreateIonscaleLayerMutationHookResult = ReturnType<typeof useCreateIonscaleLayerMutation>;
export type CreateIonscaleLayerMutationResult = Apollo.MutationResult<CreateIonscaleLayerMutation>;
export type CreateIonscaleLayerMutationOptions = Apollo.BaseMutationOptions<CreateIonscaleLayerMutation, CreateIonscaleLayerMutationVariables>;
export const UpdateIonscaleLayerDocument = gql`
    mutation UpdateIonscaleLayer($input: UpdateIonscaleLayerInput!) {
  updateIonscaleLayer(input: $input) {
    ...Layer
  }
}
    ${LayerFragmentDoc}`;
export type UpdateIonscaleLayerMutationFn = Apollo.MutationFunction<UpdateIonscaleLayerMutation, UpdateIonscaleLayerMutationVariables>;

/**
 * __useUpdateIonscaleLayerMutation__
 *
 * To run a mutation, you first call `useUpdateIonscaleLayerMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateIonscaleLayerMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateIonscaleLayerMutation, { data, loading, error }] = useUpdateIonscaleLayerMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateIonscaleLayerMutation(baseOptions?: Apollo.MutationHookOptions<UpdateIonscaleLayerMutation, UpdateIonscaleLayerMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateIonscaleLayerMutation, UpdateIonscaleLayerMutationVariables>(UpdateIonscaleLayerDocument, options);
      }
export type UpdateIonscaleLayerMutationHookResult = ReturnType<typeof useUpdateIonscaleLayerMutation>;
export type UpdateIonscaleLayerMutationResult = Apollo.MutationResult<UpdateIonscaleLayerMutation>;
export type UpdateIonscaleLayerMutationOptions = Apollo.BaseMutationOptions<UpdateIonscaleLayerMutation, UpdateIonscaleLayerMutationVariables>;
export const DeleteIonscaleLayerDocument = gql`
    mutation DeleteIonscaleLayer($input: DeleteIonscaleLayerInput!) {
  deleteIonscaleLayer(input: $input)
}
    `;
export type DeleteIonscaleLayerMutationFn = Apollo.MutationFunction<DeleteIonscaleLayerMutation, DeleteIonscaleLayerMutationVariables>;

/**
 * __useDeleteIonscaleLayerMutation__
 *
 * To run a mutation, you first call `useDeleteIonscaleLayerMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteIonscaleLayerMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteIonscaleLayerMutation, { data, loading, error }] = useDeleteIonscaleLayerMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useDeleteIonscaleLayerMutation(baseOptions?: Apollo.MutationHookOptions<DeleteIonscaleLayerMutation, DeleteIonscaleLayerMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteIonscaleLayerMutation, DeleteIonscaleLayerMutationVariables>(DeleteIonscaleLayerDocument, options);
      }
export type DeleteIonscaleLayerMutationHookResult = ReturnType<typeof useDeleteIonscaleLayerMutation>;
export type DeleteIonscaleLayerMutationResult = Apollo.MutationResult<DeleteIonscaleLayerMutation>;
export type DeleteIonscaleLayerMutationOptions = Apollo.BaseMutationOptions<DeleteIonscaleLayerMutation, DeleteIonscaleLayerMutationVariables>;
export const CreateIonscaleAuthKeyDocument = gql`
    mutation CreateIonscaleAuthKey($input: CreateIonscaleAuthKeyInput!) {
  createIonscaleAuthKey(input: $input) {
    ...IonscaleAuthKey
  }
}
    ${IonscaleAuthKeyFragmentDoc}`;
export type CreateIonscaleAuthKeyMutationFn = Apollo.MutationFunction<CreateIonscaleAuthKeyMutation, CreateIonscaleAuthKeyMutationVariables>;

/**
 * __useCreateIonscaleAuthKeyMutation__
 *
 * To run a mutation, you first call `useCreateIonscaleAuthKeyMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateIonscaleAuthKeyMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createIonscaleAuthKeyMutation, { data, loading, error }] = useCreateIonscaleAuthKeyMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateIonscaleAuthKeyMutation(baseOptions?: Apollo.MutationHookOptions<CreateIonscaleAuthKeyMutation, CreateIonscaleAuthKeyMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateIonscaleAuthKeyMutation, CreateIonscaleAuthKeyMutationVariables>(CreateIonscaleAuthKeyDocument, options);
      }
export type CreateIonscaleAuthKeyMutationHookResult = ReturnType<typeof useCreateIonscaleAuthKeyMutation>;
export type CreateIonscaleAuthKeyMutationResult = Apollo.MutationResult<CreateIonscaleAuthKeyMutation>;
export type CreateIonscaleAuthKeyMutationOptions = Apollo.BaseMutationOptions<CreateIonscaleAuthKeyMutation, CreateIonscaleAuthKeyMutationVariables>;
export const UpdateMembershipDocument = gql`
    mutation UpdateMembership($input: UpdateMembershipInput!) {
  updateMembership(input: $input) {
    ...Membership
  }
}
    ${MembershipFragmentDoc}`;
export type UpdateMembershipMutationFn = Apollo.MutationFunction<UpdateMembershipMutation, UpdateMembershipMutationVariables>;

/**
 * __useUpdateMembershipMutation__
 *
 * To run a mutation, you first call `useUpdateMembershipMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateMembershipMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateMembershipMutation, { data, loading, error }] = useUpdateMembershipMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateMembershipMutation(baseOptions?: Apollo.MutationHookOptions<UpdateMembershipMutation, UpdateMembershipMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateMembershipMutation, UpdateMembershipMutationVariables>(UpdateMembershipDocument, options);
      }
export type UpdateMembershipMutationHookResult = ReturnType<typeof useUpdateMembershipMutation>;
export type UpdateMembershipMutationResult = Apollo.MutationResult<UpdateMembershipMutation>;
export type UpdateMembershipMutationOptions = Apollo.BaseMutationOptions<UpdateMembershipMutation, UpdateMembershipMutationVariables>;
export const DeleteMembershipDocument = gql`
    mutation DeleteMembership($input: DeleteMembershipInput!) {
  deleteMembership(input: $input)
}
    `;
export type DeleteMembershipMutationFn = Apollo.MutationFunction<DeleteMembershipMutation, DeleteMembershipMutationVariables>;

/**
 * __useDeleteMembershipMutation__
 *
 * To run a mutation, you first call `useDeleteMembershipMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteMembershipMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteMembershipMutation, { data, loading, error }] = useDeleteMembershipMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useDeleteMembershipMutation(baseOptions?: Apollo.MutationHookOptions<DeleteMembershipMutation, DeleteMembershipMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteMembershipMutation, DeleteMembershipMutationVariables>(DeleteMembershipDocument, options);
      }
export type DeleteMembershipMutationHookResult = ReturnType<typeof useDeleteMembershipMutation>;
export type DeleteMembershipMutationResult = Apollo.MutationResult<DeleteMembershipMutation>;
export type DeleteMembershipMutationOptions = Apollo.BaseMutationOptions<DeleteMembershipMutation, DeleteMembershipMutationVariables>;
export const AcceptAuthorizeCodeDocument = gql`
    mutation AcceptAuthorizeCode($input: AcceptAuthorizeCodeInput!) {
  acceptAuthorizeCode(input: $input)
}
    `;
export type AcceptAuthorizeCodeMutationFn = Apollo.MutationFunction<AcceptAuthorizeCodeMutation, AcceptAuthorizeCodeMutationVariables>;

/**
 * __useAcceptAuthorizeCodeMutation__
 *
 * To run a mutation, you first call `useAcceptAuthorizeCodeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAcceptAuthorizeCodeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [acceptAuthorizeCodeMutation, { data, loading, error }] = useAcceptAuthorizeCodeMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useAcceptAuthorizeCodeMutation(baseOptions?: Apollo.MutationHookOptions<AcceptAuthorizeCodeMutation, AcceptAuthorizeCodeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AcceptAuthorizeCodeMutation, AcceptAuthorizeCodeMutationVariables>(AcceptAuthorizeCodeDocument, options);
      }
export type AcceptAuthorizeCodeMutationHookResult = ReturnType<typeof useAcceptAuthorizeCodeMutation>;
export type AcceptAuthorizeCodeMutationResult = Apollo.MutationResult<AcceptAuthorizeCodeMutation>;
export type AcceptAuthorizeCodeMutationOptions = Apollo.BaseMutationOptions<AcceptAuthorizeCodeMutation, AcceptAuthorizeCodeMutationVariables>;
export const CreateOrganizationDocument = gql`
    mutation CreateOrganization($input: CreateOrganizationInput!) {
  createOrganization(input: $input) {
    ...Organization
  }
}
    ${OrganizationFragmentDoc}`;
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
export const UpdateOrganizationDocument = gql`
    mutation UpdateOrganization($input: UpdateOrganizationInput!) {
  updateOrganization(input: $input) {
    ...Organization
  }
}
    ${OrganizationFragmentDoc}`;
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
export const DeleteOrganizationDocument = gql`
    mutation DeleteOrganization($input: DeleteOrganizationInput!) {
  deleteOrganization(input: $input)
}
    `;
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
export const ChangeOrganizationOwnerDocument = gql`
    mutation ChangeOrganizationOwner($organizationId: ID!, $newOwnerId: ID!) {
  changeOrganizationOwner(
    organizationId: $organizationId
    newOwnerId: $newOwnerId
  ) {
    ...Organization
  }
}
    ${OrganizationFragmentDoc}`;
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
 *      organizationId: // value for 'organizationId'
 *      newOwnerId: // value for 'newOwnerId'
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
export const CreateOrganizationProfileDocument = gql`
    mutation CreateOrganizationProfile($input: CreateOrganizationProfileInput!) {
  createOrganizationProfile(input: $input) {
    ...OrganizationProfile
  }
}
    ${OrganizationProfileFragmentDoc}`;
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
export const UpdateOrganizationProfileDocument = gql`
    mutation UpdateOrganizationProfile($input: UpdateOrganizationProfileInput!) {
  updateOrganizationProfile(input: $input) {
    ...OrganizationProfile
  }
}
    ${OrganizationProfileFragmentDoc}`;
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
export const DeleteOrganizationProfileDocument = gql`
    mutation DeleteOrganizationProfile($input: DeleteOrganizationProfileInput!) {
  deleteOrganizationProfile(input: $input)
}
    `;
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
export const CreateProfileDocument = gql`
    mutation CreateProfile($input: CreateProfileInput!) {
  createProfile(input: $input) {
    ...Profile
  }
}
    ${ProfileFragmentDoc}`;
export type CreateProfileMutationFn = Apollo.MutationFunction<CreateProfileMutation, CreateProfileMutationVariables>;

/**
 * __useCreateProfileMutation__
 *
 * To run a mutation, you first call `useCreateProfileMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateProfileMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createProfileMutation, { data, loading, error }] = useCreateProfileMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateProfileMutation(baseOptions?: Apollo.MutationHookOptions<CreateProfileMutation, CreateProfileMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateProfileMutation, CreateProfileMutationVariables>(CreateProfileDocument, options);
      }
export type CreateProfileMutationHookResult = ReturnType<typeof useCreateProfileMutation>;
export type CreateProfileMutationResult = Apollo.MutationResult<CreateProfileMutation>;
export type CreateProfileMutationOptions = Apollo.BaseMutationOptions<CreateProfileMutation, CreateProfileMutationVariables>;
export const UpdateProfileDocument = gql`
    mutation UpdateProfile($input: UpdateProfileInput!) {
  updateProfile(input: $input) {
    ...Profile
  }
}
    ${ProfileFragmentDoc}`;
export type UpdateProfileMutationFn = Apollo.MutationFunction<UpdateProfileMutation, UpdateProfileMutationVariables>;

/**
 * __useUpdateProfileMutation__
 *
 * To run a mutation, you first call `useUpdateProfileMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateProfileMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateProfileMutation, { data, loading, error }] = useUpdateProfileMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateProfileMutation(baseOptions?: Apollo.MutationHookOptions<UpdateProfileMutation, UpdateProfileMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateProfileMutation, UpdateProfileMutationVariables>(UpdateProfileDocument, options);
      }
export type UpdateProfileMutationHookResult = ReturnType<typeof useUpdateProfileMutation>;
export type UpdateProfileMutationResult = Apollo.MutationResult<UpdateProfileMutation>;
export type UpdateProfileMutationOptions = Apollo.BaseMutationOptions<UpdateProfileMutation, UpdateProfileMutationVariables>;
export const DeleteProfileDocument = gql`
    mutation DeleteProfile($input: DeleteProfileInput!) {
  deleteProfile(input: $input)
}
    `;
export type DeleteProfileMutationFn = Apollo.MutationFunction<DeleteProfileMutation, DeleteProfileMutationVariables>;

/**
 * __useDeleteProfileMutation__
 *
 * To run a mutation, you first call `useDeleteProfileMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteProfileMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteProfileMutation, { data, loading, error }] = useDeleteProfileMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useDeleteProfileMutation(baseOptions?: Apollo.MutationHookOptions<DeleteProfileMutation, DeleteProfileMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteProfileMutation, DeleteProfileMutationVariables>(DeleteProfileDocument, options);
      }
export type DeleteProfileMutationHookResult = ReturnType<typeof useDeleteProfileMutation>;
export type DeleteProfileMutationResult = Apollo.MutationResult<DeleteProfileMutation>;
export type DeleteProfileMutationOptions = Apollo.BaseMutationOptions<DeleteProfileMutation, DeleteProfileMutationVariables>;
export const AcceptServiceDeviceCodeDocument = gql`
    mutation AcceptServiceDeviceCode($input: AcceptServiceDeviceCodeInput!) {
  acceptServiceDeviceCode(input: $input) {
    ...ServiceInstance
  }
}
    ${ServiceInstanceFragmentDoc}`;
export type AcceptServiceDeviceCodeMutationFn = Apollo.MutationFunction<AcceptServiceDeviceCodeMutation, AcceptServiceDeviceCodeMutationVariables>;

/**
 * __useAcceptServiceDeviceCodeMutation__
 *
 * To run a mutation, you first call `useAcceptServiceDeviceCodeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAcceptServiceDeviceCodeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [acceptServiceDeviceCodeMutation, { data, loading, error }] = useAcceptServiceDeviceCodeMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useAcceptServiceDeviceCodeMutation(baseOptions?: Apollo.MutationHookOptions<AcceptServiceDeviceCodeMutation, AcceptServiceDeviceCodeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AcceptServiceDeviceCodeMutation, AcceptServiceDeviceCodeMutationVariables>(AcceptServiceDeviceCodeDocument, options);
      }
export type AcceptServiceDeviceCodeMutationHookResult = ReturnType<typeof useAcceptServiceDeviceCodeMutation>;
export type AcceptServiceDeviceCodeMutationResult = Apollo.MutationResult<AcceptServiceDeviceCodeMutation>;
export type AcceptServiceDeviceCodeMutationOptions = Apollo.BaseMutationOptions<AcceptServiceDeviceCodeMutation, AcceptServiceDeviceCodeMutationVariables>;
export const DeclineServiceDeviceCodeDocument = gql`
    mutation DeclineServiceDeviceCode($input: DeclineServiceDeviceCodeInput!) {
  declineServiceDeviceCode(input: $input) {
    ...ServiceDeviceCode
  }
}
    ${ServiceDeviceCodeFragmentDoc}`;
export type DeclineServiceDeviceCodeMutationFn = Apollo.MutationFunction<DeclineServiceDeviceCodeMutation, DeclineServiceDeviceCodeMutationVariables>;

/**
 * __useDeclineServiceDeviceCodeMutation__
 *
 * To run a mutation, you first call `useDeclineServiceDeviceCodeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeclineServiceDeviceCodeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [declineServiceDeviceCodeMutation, { data, loading, error }] = useDeclineServiceDeviceCodeMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useDeclineServiceDeviceCodeMutation(baseOptions?: Apollo.MutationHookOptions<DeclineServiceDeviceCodeMutation, DeclineServiceDeviceCodeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeclineServiceDeviceCodeMutation, DeclineServiceDeviceCodeMutationVariables>(DeclineServiceDeviceCodeDocument, options);
      }
export type DeclineServiceDeviceCodeMutationHookResult = ReturnType<typeof useDeclineServiceDeviceCodeMutation>;
export type DeclineServiceDeviceCodeMutationResult = Apollo.MutationResult<DeclineServiceDeviceCodeMutation>;
export type DeclineServiceDeviceCodeMutationOptions = Apollo.BaseMutationOptions<DeclineServiceDeviceCodeMutation, DeclineServiceDeviceCodeMutationVariables>;
export const RequestMediaUploadDocument = gql`
    mutation RequestMediaUpload($key: String!, $datalayer: String!) {
  requestMediaUpload(input: {key: $key, datalayer: $datalayer}) {
    ...PresignedPostCredentials
  }
}
    ${PresignedPostCredentialsFragmentDoc}`;
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
export const AppsDocument = gql`
    query Apps($filters: AppFilter, $pagination: OffsetPaginationInput) {
  apps(filters: $filters, pagination: $pagination) {
    ...ListApp
  }
}
    ${ListAppFragmentDoc}`;

/**
 * __useAppsQuery__
 *
 * To run a query within a React component, call `useAppsQuery` and pass it any options that fit your needs.
 * When your component renders, `useAppsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAppsQuery({
 *   variables: {
 *      filters: // value for 'filters'
 *      pagination: // value for 'pagination'
 *   },
 * });
 */
export function useAppsQuery(baseOptions?: Apollo.QueryHookOptions<AppsQuery, AppsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AppsQuery, AppsQueryVariables>(AppsDocument, options);
      }
export function useAppsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AppsQuery, AppsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AppsQuery, AppsQueryVariables>(AppsDocument, options);
        }
// @ts-ignore
export function useAppsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<AppsQuery, AppsQueryVariables>): Apollo.UseSuspenseQueryResult<AppsQuery, AppsQueryVariables>;
export function useAppsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<AppsQuery, AppsQueryVariables>): Apollo.UseSuspenseQueryResult<AppsQuery | undefined, AppsQueryVariables>;
export function useAppsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<AppsQuery, AppsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<AppsQuery, AppsQueryVariables>(AppsDocument, options);
        }
export type AppsQueryHookResult = ReturnType<typeof useAppsQuery>;
export type AppsLazyQueryHookResult = ReturnType<typeof useAppsLazyQuery>;
export type AppsSuspenseQueryHookResult = ReturnType<typeof useAppsSuspenseQuery>;
export type AppsQueryResult = Apollo.QueryResult<AppsQuery, AppsQueryVariables>;
export const DetailAppDocument = gql`
    query DetailApp($id: ID!) {
  app(id: $id) {
    ...DetailApp
  }
}
    ${DetailAppFragmentDoc}`;

/**
 * __useDetailAppQuery__
 *
 * To run a query within a React component, call `useDetailAppQuery` and pass it any options that fit your needs.
 * When your component renders, `useDetailAppQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useDetailAppQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDetailAppQuery(baseOptions: Apollo.QueryHookOptions<DetailAppQuery, DetailAppQueryVariables> & ({ variables: DetailAppQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<DetailAppQuery, DetailAppQueryVariables>(DetailAppDocument, options);
      }
export function useDetailAppLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<DetailAppQuery, DetailAppQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<DetailAppQuery, DetailAppQueryVariables>(DetailAppDocument, options);
        }
// @ts-ignore
export function useDetailAppSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<DetailAppQuery, DetailAppQueryVariables>): Apollo.UseSuspenseQueryResult<DetailAppQuery, DetailAppQueryVariables>;
export function useDetailAppSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<DetailAppQuery, DetailAppQueryVariables>): Apollo.UseSuspenseQueryResult<DetailAppQuery | undefined, DetailAppQueryVariables>;
export function useDetailAppSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<DetailAppQuery, DetailAppQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<DetailAppQuery, DetailAppQueryVariables>(DetailAppDocument, options);
        }
export type DetailAppQueryHookResult = ReturnType<typeof useDetailAppQuery>;
export type DetailAppLazyQueryHookResult = ReturnType<typeof useDetailAppLazyQuery>;
export type DetailAppSuspenseQueryHookResult = ReturnType<typeof useDetailAppSuspenseQuery>;
export type DetailAppQueryResult = Apollo.QueryResult<DetailAppQuery, DetailAppQueryVariables>;
export const IonscaleAuthKeyDocument = gql`
    query IonscaleAuthKey($filters: ManagementIonscaleAuthKeyFilter, $pagination: OffsetPaginationInput, $order: ManagementIonscaleAuthKeyOrder) {
  ionscaleAuthKeys(filters: $filters, pagination: $pagination, order: $order) {
    ...IonscaleAuthKey
  }
}
    ${IonscaleAuthKeyFragmentDoc}`;

/**
 * __useIonscaleAuthKeyQuery__
 *
 * To run a query within a React component, call `useIonscaleAuthKeyQuery` and pass it any options that fit your needs.
 * When your component renders, `useIonscaleAuthKeyQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useIonscaleAuthKeyQuery({
 *   variables: {
 *      filters: // value for 'filters'
 *      pagination: // value for 'pagination'
 *      order: // value for 'order'
 *   },
 * });
 */
export function useIonscaleAuthKeyQuery(baseOptions?: Apollo.QueryHookOptions<IonscaleAuthKeyQuery, IonscaleAuthKeyQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<IonscaleAuthKeyQuery, IonscaleAuthKeyQueryVariables>(IonscaleAuthKeyDocument, options);
      }
export function useIonscaleAuthKeyLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<IonscaleAuthKeyQuery, IonscaleAuthKeyQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<IonscaleAuthKeyQuery, IonscaleAuthKeyQueryVariables>(IonscaleAuthKeyDocument, options);
        }
// @ts-ignore
export function useIonscaleAuthKeySuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<IonscaleAuthKeyQuery, IonscaleAuthKeyQueryVariables>): Apollo.UseSuspenseQueryResult<IonscaleAuthKeyQuery, IonscaleAuthKeyQueryVariables>;
export function useIonscaleAuthKeySuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<IonscaleAuthKeyQuery, IonscaleAuthKeyQueryVariables>): Apollo.UseSuspenseQueryResult<IonscaleAuthKeyQuery | undefined, IonscaleAuthKeyQueryVariables>;
export function useIonscaleAuthKeySuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<IonscaleAuthKeyQuery, IonscaleAuthKeyQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<IonscaleAuthKeyQuery, IonscaleAuthKeyQueryVariables>(IonscaleAuthKeyDocument, options);
        }
export type IonscaleAuthKeyQueryHookResult = ReturnType<typeof useIonscaleAuthKeyQuery>;
export type IonscaleAuthKeyLazyQueryHookResult = ReturnType<typeof useIonscaleAuthKeyLazyQuery>;
export type IonscaleAuthKeySuspenseQueryHookResult = ReturnType<typeof useIonscaleAuthKeySuspenseQuery>;
export type IonscaleAuthKeyQueryResult = Apollo.QueryResult<IonscaleAuthKeyQuery, IonscaleAuthKeyQueryVariables>;
export const GetAuthKeyDocument = gql`
    query GetAuthKey($id: ID!) {
  ionscaleAuthKey(id: $id) {
    ...IonscaleAuthKey
  }
}
    ${IonscaleAuthKeyFragmentDoc}`;

/**
 * __useGetAuthKeyQuery__
 *
 * To run a query within a React component, call `useGetAuthKeyQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAuthKeyQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAuthKeyQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetAuthKeyQuery(baseOptions: Apollo.QueryHookOptions<GetAuthKeyQuery, GetAuthKeyQueryVariables> & ({ variables: GetAuthKeyQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAuthKeyQuery, GetAuthKeyQueryVariables>(GetAuthKeyDocument, options);
      }
export function useGetAuthKeyLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAuthKeyQuery, GetAuthKeyQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAuthKeyQuery, GetAuthKeyQueryVariables>(GetAuthKeyDocument, options);
        }
// @ts-ignore
export function useGetAuthKeySuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetAuthKeyQuery, GetAuthKeyQueryVariables>): Apollo.UseSuspenseQueryResult<GetAuthKeyQuery, GetAuthKeyQueryVariables>;
export function useGetAuthKeySuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetAuthKeyQuery, GetAuthKeyQueryVariables>): Apollo.UseSuspenseQueryResult<GetAuthKeyQuery | undefined, GetAuthKeyQueryVariables>;
export function useGetAuthKeySuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetAuthKeyQuery, GetAuthKeyQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetAuthKeyQuery, GetAuthKeyQueryVariables>(GetAuthKeyDocument, options);
        }
export type GetAuthKeyQueryHookResult = ReturnType<typeof useGetAuthKeyQuery>;
export type GetAuthKeyLazyQueryHookResult = ReturnType<typeof useGetAuthKeyLazyQuery>;
export type GetAuthKeySuspenseQueryHookResult = ReturnType<typeof useGetAuthKeySuspenseQuery>;
export type GetAuthKeyQueryResult = Apollo.QueryResult<GetAuthKeyQuery, GetAuthKeyQueryVariables>;
export const ClientsDocument = gql`
    query Clients($filters: ManagementClientFilter, $pagination: OffsetPaginationInput, $order: ManagementClientOrder) {
  clients(filters: $filters, pagination: $pagination, order: $order) {
    ...ListClient
  }
}
    ${ListClientFragmentDoc}`;

/**
 * __useClientsQuery__
 *
 * To run a query within a React component, call `useClientsQuery` and pass it any options that fit your needs.
 * When your component renders, `useClientsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useClientsQuery({
 *   variables: {
 *      filters: // value for 'filters'
 *      pagination: // value for 'pagination'
 *      order: // value for 'order'
 *   },
 * });
 */
export function useClientsQuery(baseOptions?: Apollo.QueryHookOptions<ClientsQuery, ClientsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ClientsQuery, ClientsQueryVariables>(ClientsDocument, options);
      }
export function useClientsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ClientsQuery, ClientsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ClientsQuery, ClientsQueryVariables>(ClientsDocument, options);
        }
// @ts-ignore
export function useClientsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<ClientsQuery, ClientsQueryVariables>): Apollo.UseSuspenseQueryResult<ClientsQuery, ClientsQueryVariables>;
export function useClientsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<ClientsQuery, ClientsQueryVariables>): Apollo.UseSuspenseQueryResult<ClientsQuery | undefined, ClientsQueryVariables>;
export function useClientsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<ClientsQuery, ClientsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ClientsQuery, ClientsQueryVariables>(ClientsDocument, options);
        }
export type ClientsQueryHookResult = ReturnType<typeof useClientsQuery>;
export type ClientsLazyQueryHookResult = ReturnType<typeof useClientsLazyQuery>;
export type ClientsSuspenseQueryHookResult = ReturnType<typeof useClientsSuspenseQuery>;
export type ClientsQueryResult = Apollo.QueryResult<ClientsQuery, ClientsQueryVariables>;
export const DetailClientDocument = gql`
    query DetailClient($id: ID!) {
  client(id: $id) {
    ...DetailClient
  }
}
    ${DetailClientFragmentDoc}`;

/**
 * __useDetailClientQuery__
 *
 * To run a query within a React component, call `useDetailClientQuery` and pass it any options that fit your needs.
 * When your component renders, `useDetailClientQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useDetailClientQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDetailClientQuery(baseOptions: Apollo.QueryHookOptions<DetailClientQuery, DetailClientQueryVariables> & ({ variables: DetailClientQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<DetailClientQuery, DetailClientQueryVariables>(DetailClientDocument, options);
      }
export function useDetailClientLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<DetailClientQuery, DetailClientQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<DetailClientQuery, DetailClientQueryVariables>(DetailClientDocument, options);
        }
// @ts-ignore
export function useDetailClientSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<DetailClientQuery, DetailClientQueryVariables>): Apollo.UseSuspenseQueryResult<DetailClientQuery, DetailClientQueryVariables>;
export function useDetailClientSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<DetailClientQuery, DetailClientQueryVariables>): Apollo.UseSuspenseQueryResult<DetailClientQuery | undefined, DetailClientQueryVariables>;
export function useDetailClientSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<DetailClientQuery, DetailClientQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<DetailClientQuery, DetailClientQueryVariables>(DetailClientDocument, options);
        }
export type DetailClientQueryHookResult = ReturnType<typeof useDetailClientQuery>;
export type DetailClientLazyQueryHookResult = ReturnType<typeof useDetailClientLazyQuery>;
export type DetailClientSuspenseQueryHookResult = ReturnType<typeof useDetailClientSuspenseQuery>;
export type DetailClientQueryResult = Apollo.QueryResult<DetailClientQuery, DetailClientQueryVariables>;
export const CompositionsDocument = gql`
    query Compositions($filters: ManagementCompositionFilter, $order: ManagementCompositionOrder, $pagination: OffsetPaginationInput) {
  compositions(filters: $filters, order: $order, pagination: $pagination) {
    ...ListComposition
  }
}
    ${ListCompositionFragmentDoc}`;

/**
 * __useCompositionsQuery__
 *
 * To run a query within a React component, call `useCompositionsQuery` and pass it any options that fit your needs.
 * When your component renders, `useCompositionsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCompositionsQuery({
 *   variables: {
 *      filters: // value for 'filters'
 *      order: // value for 'order'
 *      pagination: // value for 'pagination'
 *   },
 * });
 */
export function useCompositionsQuery(baseOptions?: Apollo.QueryHookOptions<CompositionsQuery, CompositionsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CompositionsQuery, CompositionsQueryVariables>(CompositionsDocument, options);
      }
export function useCompositionsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CompositionsQuery, CompositionsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CompositionsQuery, CompositionsQueryVariables>(CompositionsDocument, options);
        }
// @ts-ignore
export function useCompositionsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<CompositionsQuery, CompositionsQueryVariables>): Apollo.UseSuspenseQueryResult<CompositionsQuery, CompositionsQueryVariables>;
export function useCompositionsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<CompositionsQuery, CompositionsQueryVariables>): Apollo.UseSuspenseQueryResult<CompositionsQuery | undefined, CompositionsQueryVariables>;
export function useCompositionsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<CompositionsQuery, CompositionsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<CompositionsQuery, CompositionsQueryVariables>(CompositionsDocument, options);
        }
export type CompositionsQueryHookResult = ReturnType<typeof useCompositionsQuery>;
export type CompositionsLazyQueryHookResult = ReturnType<typeof useCompositionsLazyQuery>;
export type CompositionsSuspenseQueryHookResult = ReturnType<typeof useCompositionsSuspenseQuery>;
export type CompositionsQueryResult = Apollo.QueryResult<CompositionsQuery, CompositionsQueryVariables>;
export const GetCompositionDocument = gql`
    query GetComposition($id: ID!) {
  composition(id: $id) {
    ...Composition
  }
}
    ${CompositionFragmentDoc}`;

/**
 * __useGetCompositionQuery__
 *
 * To run a query within a React component, call `useGetCompositionQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCompositionQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCompositionQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetCompositionQuery(baseOptions: Apollo.QueryHookOptions<GetCompositionQuery, GetCompositionQueryVariables> & ({ variables: GetCompositionQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCompositionQuery, GetCompositionQueryVariables>(GetCompositionDocument, options);
      }
export function useGetCompositionLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCompositionQuery, GetCompositionQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCompositionQuery, GetCompositionQueryVariables>(GetCompositionDocument, options);
        }
// @ts-ignore
export function useGetCompositionSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetCompositionQuery, GetCompositionQueryVariables>): Apollo.UseSuspenseQueryResult<GetCompositionQuery, GetCompositionQueryVariables>;
export function useGetCompositionSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetCompositionQuery, GetCompositionQueryVariables>): Apollo.UseSuspenseQueryResult<GetCompositionQuery | undefined, GetCompositionQueryVariables>;
export function useGetCompositionSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetCompositionQuery, GetCompositionQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetCompositionQuery, GetCompositionQueryVariables>(GetCompositionDocument, options);
        }
export type GetCompositionQueryHookResult = ReturnType<typeof useGetCompositionQuery>;
export type GetCompositionLazyQueryHookResult = ReturnType<typeof useGetCompositionLazyQuery>;
export type GetCompositionSuspenseQueryHookResult = ReturnType<typeof useGetCompositionSuspenseQuery>;
export type GetCompositionQueryResult = Apollo.QueryResult<GetCompositionQuery, GetCompositionQueryVariables>;
export const CompositionDeviceCodeByCodeDocument = gql`
    query CompositionDeviceCodeByCode($code: String!) {
  compositionDeviceCodeByCode(code: $code) {
    ...CompositionDeviceCode
  }
}
    ${CompositionDeviceCodeFragmentDoc}`;

/**
 * __useCompositionDeviceCodeByCodeQuery__
 *
 * To run a query within a React component, call `useCompositionDeviceCodeByCodeQuery` and pass it any options that fit your needs.
 * When your component renders, `useCompositionDeviceCodeByCodeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCompositionDeviceCodeByCodeQuery({
 *   variables: {
 *      code: // value for 'code'
 *   },
 * });
 */
export function useCompositionDeviceCodeByCodeQuery(baseOptions: Apollo.QueryHookOptions<CompositionDeviceCodeByCodeQuery, CompositionDeviceCodeByCodeQueryVariables> & ({ variables: CompositionDeviceCodeByCodeQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CompositionDeviceCodeByCodeQuery, CompositionDeviceCodeByCodeQueryVariables>(CompositionDeviceCodeByCodeDocument, options);
      }
export function useCompositionDeviceCodeByCodeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CompositionDeviceCodeByCodeQuery, CompositionDeviceCodeByCodeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CompositionDeviceCodeByCodeQuery, CompositionDeviceCodeByCodeQueryVariables>(CompositionDeviceCodeByCodeDocument, options);
        }
// @ts-ignore
export function useCompositionDeviceCodeByCodeSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<CompositionDeviceCodeByCodeQuery, CompositionDeviceCodeByCodeQueryVariables>): Apollo.UseSuspenseQueryResult<CompositionDeviceCodeByCodeQuery, CompositionDeviceCodeByCodeQueryVariables>;
export function useCompositionDeviceCodeByCodeSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<CompositionDeviceCodeByCodeQuery, CompositionDeviceCodeByCodeQueryVariables>): Apollo.UseSuspenseQueryResult<CompositionDeviceCodeByCodeQuery | undefined, CompositionDeviceCodeByCodeQueryVariables>;
export function useCompositionDeviceCodeByCodeSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<CompositionDeviceCodeByCodeQuery, CompositionDeviceCodeByCodeQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<CompositionDeviceCodeByCodeQuery, CompositionDeviceCodeByCodeQueryVariables>(CompositionDeviceCodeByCodeDocument, options);
        }
export type CompositionDeviceCodeByCodeQueryHookResult = ReturnType<typeof useCompositionDeviceCodeByCodeQuery>;
export type CompositionDeviceCodeByCodeLazyQueryHookResult = ReturnType<typeof useCompositionDeviceCodeByCodeLazyQuery>;
export type CompositionDeviceCodeByCodeSuspenseQueryHookResult = ReturnType<typeof useCompositionDeviceCodeByCodeSuspenseQuery>;
export type CompositionDeviceCodeByCodeQueryResult = Apollo.QueryResult<CompositionDeviceCodeByCodeQuery, CompositionDeviceCodeByCodeQueryVariables>;
export const ListDevicesDocument = gql`
    query ListDevices($pagination: OffsetPaginationInput, $filters: ManagementDeviceFilter, $order: ManagementDeviceOrder) {
  devices(pagination: $pagination, filters: $filters, order: $order) {
    ...ListDevice
  }
}
    ${ListDeviceFragmentDoc}`;

/**
 * __useListDevicesQuery__
 *
 * To run a query within a React component, call `useListDevicesQuery` and pass it any options that fit your needs.
 * When your component renders, `useListDevicesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useListDevicesQuery({
 *   variables: {
 *      pagination: // value for 'pagination'
 *      filters: // value for 'filters'
 *      order: // value for 'order'
 *   },
 * });
 */
export function useListDevicesQuery(baseOptions?: Apollo.QueryHookOptions<ListDevicesQuery, ListDevicesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ListDevicesQuery, ListDevicesQueryVariables>(ListDevicesDocument, options);
      }
export function useListDevicesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ListDevicesQuery, ListDevicesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ListDevicesQuery, ListDevicesQueryVariables>(ListDevicesDocument, options);
        }
// @ts-ignore
export function useListDevicesSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<ListDevicesQuery, ListDevicesQueryVariables>): Apollo.UseSuspenseQueryResult<ListDevicesQuery, ListDevicesQueryVariables>;
export function useListDevicesSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<ListDevicesQuery, ListDevicesQueryVariables>): Apollo.UseSuspenseQueryResult<ListDevicesQuery | undefined, ListDevicesQueryVariables>;
export function useListDevicesSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<ListDevicesQuery, ListDevicesQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ListDevicesQuery, ListDevicesQueryVariables>(ListDevicesDocument, options);
        }
export type ListDevicesQueryHookResult = ReturnType<typeof useListDevicesQuery>;
export type ListDevicesLazyQueryHookResult = ReturnType<typeof useListDevicesLazyQuery>;
export type ListDevicesSuspenseQueryHookResult = ReturnType<typeof useListDevicesSuspenseQuery>;
export type ListDevicesQueryResult = Apollo.QueryResult<ListDevicesQuery, ListDevicesQueryVariables>;
export const GetDeviceDocument = gql`
    query GetDevice($id: ID!) {
  device(id: $id) {
    ...DetailDevice
  }
}
    ${DetailDeviceFragmentDoc}`;

/**
 * __useGetDeviceQuery__
 *
 * To run a query within a React component, call `useGetDeviceQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetDeviceQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetDeviceQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetDeviceQuery(baseOptions: Apollo.QueryHookOptions<GetDeviceQuery, GetDeviceQueryVariables> & ({ variables: GetDeviceQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetDeviceQuery, GetDeviceQueryVariables>(GetDeviceDocument, options);
      }
export function useGetDeviceLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetDeviceQuery, GetDeviceQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetDeviceQuery, GetDeviceQueryVariables>(GetDeviceDocument, options);
        }
// @ts-ignore
export function useGetDeviceSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetDeviceQuery, GetDeviceQueryVariables>): Apollo.UseSuspenseQueryResult<GetDeviceQuery, GetDeviceQueryVariables>;
export function useGetDeviceSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetDeviceQuery, GetDeviceQueryVariables>): Apollo.UseSuspenseQueryResult<GetDeviceQuery | undefined, GetDeviceQueryVariables>;
export function useGetDeviceSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetDeviceQuery, GetDeviceQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetDeviceQuery, GetDeviceQueryVariables>(GetDeviceDocument, options);
        }
export type GetDeviceQueryHookResult = ReturnType<typeof useGetDeviceQuery>;
export type GetDeviceLazyQueryHookResult = ReturnType<typeof useGetDeviceLazyQuery>;
export type GetDeviceSuspenseQueryHookResult = ReturnType<typeof useGetDeviceSuspenseQuery>;
export type GetDeviceQueryResult = Apollo.QueryResult<GetDeviceQuery, GetDeviceQueryVariables>;
export const DeviceCodeByCodeDocument = gql`
    query DeviceCodeByCode($code: String!) {
  deviceCodeByCode(deviceCode: $code) {
    ...DeviceCode
  }
}
    ${DeviceCodeFragmentDoc}`;

/**
 * __useDeviceCodeByCodeQuery__
 *
 * To run a query within a React component, call `useDeviceCodeByCodeQuery` and pass it any options that fit your needs.
 * When your component renders, `useDeviceCodeByCodeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useDeviceCodeByCodeQuery({
 *   variables: {
 *      code: // value for 'code'
 *   },
 * });
 */
export function useDeviceCodeByCodeQuery(baseOptions: Apollo.QueryHookOptions<DeviceCodeByCodeQuery, DeviceCodeByCodeQueryVariables> & ({ variables: DeviceCodeByCodeQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<DeviceCodeByCodeQuery, DeviceCodeByCodeQueryVariables>(DeviceCodeByCodeDocument, options);
      }
export function useDeviceCodeByCodeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<DeviceCodeByCodeQuery, DeviceCodeByCodeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<DeviceCodeByCodeQuery, DeviceCodeByCodeQueryVariables>(DeviceCodeByCodeDocument, options);
        }
// @ts-ignore
export function useDeviceCodeByCodeSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<DeviceCodeByCodeQuery, DeviceCodeByCodeQueryVariables>): Apollo.UseSuspenseQueryResult<DeviceCodeByCodeQuery, DeviceCodeByCodeQueryVariables>;
export function useDeviceCodeByCodeSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<DeviceCodeByCodeQuery, DeviceCodeByCodeQueryVariables>): Apollo.UseSuspenseQueryResult<DeviceCodeByCodeQuery | undefined, DeviceCodeByCodeQueryVariables>;
export function useDeviceCodeByCodeSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<DeviceCodeByCodeQuery, DeviceCodeByCodeQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<DeviceCodeByCodeQuery, DeviceCodeByCodeQueryVariables>(DeviceCodeByCodeDocument, options);
        }
export type DeviceCodeByCodeQueryHookResult = ReturnType<typeof useDeviceCodeByCodeQuery>;
export type DeviceCodeByCodeLazyQueryHookResult = ReturnType<typeof useDeviceCodeByCodeLazyQuery>;
export type DeviceCodeByCodeSuspenseQueryHookResult = ReturnType<typeof useDeviceCodeByCodeSuspenseQuery>;
export type DeviceCodeByCodeQueryResult = Apollo.QueryResult<DeviceCodeByCodeQuery, DeviceCodeByCodeQueryVariables>;
export const ValidateDeviceCodeDocument = gql`
    query ValidateDeviceCode($deviceCode: ID!, $composition: ID!) {
  validateDeviceCode(deviceCode: $deviceCode, composition: $composition) {
    valid
    reason
    mappings {
      key
      serviceInstance {
        id
        identifier
      }
    }
  }
}
    `;

/**
 * __useValidateDeviceCodeQuery__
 *
 * To run a query within a React component, call `useValidateDeviceCodeQuery` and pass it any options that fit your needs.
 * When your component renders, `useValidateDeviceCodeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useValidateDeviceCodeQuery({
 *   variables: {
 *      deviceCode: // value for 'deviceCode'
 *      composition: // value for 'composition'
 *   },
 * });
 */
export function useValidateDeviceCodeQuery(baseOptions: Apollo.QueryHookOptions<ValidateDeviceCodeQuery, ValidateDeviceCodeQueryVariables> & ({ variables: ValidateDeviceCodeQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ValidateDeviceCodeQuery, ValidateDeviceCodeQueryVariables>(ValidateDeviceCodeDocument, options);
      }
export function useValidateDeviceCodeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ValidateDeviceCodeQuery, ValidateDeviceCodeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ValidateDeviceCodeQuery, ValidateDeviceCodeQueryVariables>(ValidateDeviceCodeDocument, options);
        }
// @ts-ignore
export function useValidateDeviceCodeSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<ValidateDeviceCodeQuery, ValidateDeviceCodeQueryVariables>): Apollo.UseSuspenseQueryResult<ValidateDeviceCodeQuery, ValidateDeviceCodeQueryVariables>;
export function useValidateDeviceCodeSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<ValidateDeviceCodeQuery, ValidateDeviceCodeQueryVariables>): Apollo.UseSuspenseQueryResult<ValidateDeviceCodeQuery | undefined, ValidateDeviceCodeQueryVariables>;
export function useValidateDeviceCodeSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<ValidateDeviceCodeQuery, ValidateDeviceCodeQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ValidateDeviceCodeQuery, ValidateDeviceCodeQueryVariables>(ValidateDeviceCodeDocument, options);
        }
export type ValidateDeviceCodeQueryHookResult = ReturnType<typeof useValidateDeviceCodeQuery>;
export type ValidateDeviceCodeLazyQueryHookResult = ReturnType<typeof useValidateDeviceCodeLazyQuery>;
export type ValidateDeviceCodeSuspenseQueryHookResult = ReturnType<typeof useValidateDeviceCodeSuspenseQuery>;
export type ValidateDeviceCodeQueryResult = Apollo.QueryResult<ValidateDeviceCodeQuery, ValidateDeviceCodeQueryVariables>;
export const ListDeviceGroupsDocument = gql`
    query ListDeviceGroups($pagination: OffsetPaginationInput, $filters: ManagementDeviceGroupFilter, $order: ManagementDeviceGroupOrder) {
  deviceGroups(pagination: $pagination, filters: $filters, order: $order) {
    ...ListDeviceGroup
  }
}
    ${ListDeviceGroupFragmentDoc}`;

/**
 * __useListDeviceGroupsQuery__
 *
 * To run a query within a React component, call `useListDeviceGroupsQuery` and pass it any options that fit your needs.
 * When your component renders, `useListDeviceGroupsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useListDeviceGroupsQuery({
 *   variables: {
 *      pagination: // value for 'pagination'
 *      filters: // value for 'filters'
 *      order: // value for 'order'
 *   },
 * });
 */
export function useListDeviceGroupsQuery(baseOptions?: Apollo.QueryHookOptions<ListDeviceGroupsQuery, ListDeviceGroupsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ListDeviceGroupsQuery, ListDeviceGroupsQueryVariables>(ListDeviceGroupsDocument, options);
      }
export function useListDeviceGroupsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ListDeviceGroupsQuery, ListDeviceGroupsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ListDeviceGroupsQuery, ListDeviceGroupsQueryVariables>(ListDeviceGroupsDocument, options);
        }
// @ts-ignore
export function useListDeviceGroupsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<ListDeviceGroupsQuery, ListDeviceGroupsQueryVariables>): Apollo.UseSuspenseQueryResult<ListDeviceGroupsQuery, ListDeviceGroupsQueryVariables>;
export function useListDeviceGroupsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<ListDeviceGroupsQuery, ListDeviceGroupsQueryVariables>): Apollo.UseSuspenseQueryResult<ListDeviceGroupsQuery | undefined, ListDeviceGroupsQueryVariables>;
export function useListDeviceGroupsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<ListDeviceGroupsQuery, ListDeviceGroupsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ListDeviceGroupsQuery, ListDeviceGroupsQueryVariables>(ListDeviceGroupsDocument, options);
        }
export type ListDeviceGroupsQueryHookResult = ReturnType<typeof useListDeviceGroupsQuery>;
export type ListDeviceGroupsLazyQueryHookResult = ReturnType<typeof useListDeviceGroupsLazyQuery>;
export type ListDeviceGroupsSuspenseQueryHookResult = ReturnType<typeof useListDeviceGroupsSuspenseQuery>;
export type ListDeviceGroupsQueryResult = Apollo.QueryResult<ListDeviceGroupsQuery, ListDeviceGroupsQueryVariables>;
export const GetDeviceGroupDocument = gql`
    query GetDeviceGroup($id: ID!) {
  deviceGroup(id: $id) {
    ...DetailDeviceGroup
  }
}
    ${DetailDeviceGroupFragmentDoc}`;

/**
 * __useGetDeviceGroupQuery__
 *
 * To run a query within a React component, call `useGetDeviceGroupQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetDeviceGroupQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetDeviceGroupQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetDeviceGroupQuery(baseOptions: Apollo.QueryHookOptions<GetDeviceGroupQuery, GetDeviceGroupQueryVariables> & ({ variables: GetDeviceGroupQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetDeviceGroupQuery, GetDeviceGroupQueryVariables>(GetDeviceGroupDocument, options);
      }
export function useGetDeviceGroupLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetDeviceGroupQuery, GetDeviceGroupQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetDeviceGroupQuery, GetDeviceGroupQueryVariables>(GetDeviceGroupDocument, options);
        }
// @ts-ignore
export function useGetDeviceGroupSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetDeviceGroupQuery, GetDeviceGroupQueryVariables>): Apollo.UseSuspenseQueryResult<GetDeviceGroupQuery, GetDeviceGroupQueryVariables>;
export function useGetDeviceGroupSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetDeviceGroupQuery, GetDeviceGroupQueryVariables>): Apollo.UseSuspenseQueryResult<GetDeviceGroupQuery | undefined, GetDeviceGroupQueryVariables>;
export function useGetDeviceGroupSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetDeviceGroupQuery, GetDeviceGroupQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetDeviceGroupQuery, GetDeviceGroupQueryVariables>(GetDeviceGroupDocument, options);
        }
export type GetDeviceGroupQueryHookResult = ReturnType<typeof useGetDeviceGroupQuery>;
export type GetDeviceGroupLazyQueryHookResult = ReturnType<typeof useGetDeviceGroupLazyQuery>;
export type GetDeviceGroupSuspenseQueryHookResult = ReturnType<typeof useGetDeviceGroupSuspenseQuery>;
export type GetDeviceGroupQueryResult = Apollo.QueryResult<GetDeviceGroupQuery, GetDeviceGroupQueryVariables>;
export const ListInstanceAliasDocument = gql`
    query ListInstanceAlias($filters: ManagementInstanceAliasFilter, $pagination: OffsetPaginationInput, $order: ManagementInstanceAliasOrder) {
  instanceAliases(filters: $filters, pagination: $pagination, order: $order) {
    ...ListInstanceAlias
  }
}
    ${ListInstanceAliasFragmentDoc}`;

/**
 * __useListInstanceAliasQuery__
 *
 * To run a query within a React component, call `useListInstanceAliasQuery` and pass it any options that fit your needs.
 * When your component renders, `useListInstanceAliasQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useListInstanceAliasQuery({
 *   variables: {
 *      filters: // value for 'filters'
 *      pagination: // value for 'pagination'
 *      order: // value for 'order'
 *   },
 * });
 */
export function useListInstanceAliasQuery(baseOptions?: Apollo.QueryHookOptions<ListInstanceAliasQuery, ListInstanceAliasQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ListInstanceAliasQuery, ListInstanceAliasQueryVariables>(ListInstanceAliasDocument, options);
      }
export function useListInstanceAliasLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ListInstanceAliasQuery, ListInstanceAliasQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ListInstanceAliasQuery, ListInstanceAliasQueryVariables>(ListInstanceAliasDocument, options);
        }
// @ts-ignore
export function useListInstanceAliasSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<ListInstanceAliasQuery, ListInstanceAliasQueryVariables>): Apollo.UseSuspenseQueryResult<ListInstanceAliasQuery, ListInstanceAliasQueryVariables>;
export function useListInstanceAliasSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<ListInstanceAliasQuery, ListInstanceAliasQueryVariables>): Apollo.UseSuspenseQueryResult<ListInstanceAliasQuery | undefined, ListInstanceAliasQueryVariables>;
export function useListInstanceAliasSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<ListInstanceAliasQuery, ListInstanceAliasQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ListInstanceAliasQuery, ListInstanceAliasQueryVariables>(ListInstanceAliasDocument, options);
        }
export type ListInstanceAliasQueryHookResult = ReturnType<typeof useListInstanceAliasQuery>;
export type ListInstanceAliasLazyQueryHookResult = ReturnType<typeof useListInstanceAliasLazyQuery>;
export type ListInstanceAliasSuspenseQueryHookResult = ReturnType<typeof useListInstanceAliasSuspenseQuery>;
export type ListInstanceAliasQueryResult = Apollo.QueryResult<ListInstanceAliasQuery, ListInstanceAliasQueryVariables>;
export const DetailInstanceAliasDocument = gql`
    query DetailInstanceAlias($id: ID!) {
  instanceAlias(id: $id) {
    ...InstanceAlias
  }
}
    ${InstanceAliasFragmentDoc}`;

/**
 * __useDetailInstanceAliasQuery__
 *
 * To run a query within a React component, call `useDetailInstanceAliasQuery` and pass it any options that fit your needs.
 * When your component renders, `useDetailInstanceAliasQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useDetailInstanceAliasQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDetailInstanceAliasQuery(baseOptions: Apollo.QueryHookOptions<DetailInstanceAliasQuery, DetailInstanceAliasQueryVariables> & ({ variables: DetailInstanceAliasQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<DetailInstanceAliasQuery, DetailInstanceAliasQueryVariables>(DetailInstanceAliasDocument, options);
      }
export function useDetailInstanceAliasLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<DetailInstanceAliasQuery, DetailInstanceAliasQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<DetailInstanceAliasQuery, DetailInstanceAliasQueryVariables>(DetailInstanceAliasDocument, options);
        }
// @ts-ignore
export function useDetailInstanceAliasSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<DetailInstanceAliasQuery, DetailInstanceAliasQueryVariables>): Apollo.UseSuspenseQueryResult<DetailInstanceAliasQuery, DetailInstanceAliasQueryVariables>;
export function useDetailInstanceAliasSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<DetailInstanceAliasQuery, DetailInstanceAliasQueryVariables>): Apollo.UseSuspenseQueryResult<DetailInstanceAliasQuery | undefined, DetailInstanceAliasQueryVariables>;
export function useDetailInstanceAliasSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<DetailInstanceAliasQuery, DetailInstanceAliasQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<DetailInstanceAliasQuery, DetailInstanceAliasQueryVariables>(DetailInstanceAliasDocument, options);
        }
export type DetailInstanceAliasQueryHookResult = ReturnType<typeof useDetailInstanceAliasQuery>;
export type DetailInstanceAliasLazyQueryHookResult = ReturnType<typeof useDetailInstanceAliasLazyQuery>;
export type DetailInstanceAliasSuspenseQueryHookResult = ReturnType<typeof useDetailInstanceAliasSuspenseQuery>;
export type DetailInstanceAliasQueryResult = Apollo.QueryResult<DetailInstanceAliasQuery, DetailInstanceAliasQueryVariables>;
export const InviteByCodeDocument = gql`
    query InviteByCode($code: String!) {
  inviteByCode(inviteCode: $code) {
    ...Invite
  }
}
    ${InviteFragmentDoc}`;

/**
 * __useInviteByCodeQuery__
 *
 * To run a query within a React component, call `useInviteByCodeQuery` and pass it any options that fit your needs.
 * When your component renders, `useInviteByCodeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useInviteByCodeQuery({
 *   variables: {
 *      code: // value for 'code'
 *   },
 * });
 */
export function useInviteByCodeQuery(baseOptions: Apollo.QueryHookOptions<InviteByCodeQuery, InviteByCodeQueryVariables> & ({ variables: InviteByCodeQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<InviteByCodeQuery, InviteByCodeQueryVariables>(InviteByCodeDocument, options);
      }
export function useInviteByCodeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<InviteByCodeQuery, InviteByCodeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<InviteByCodeQuery, InviteByCodeQueryVariables>(InviteByCodeDocument, options);
        }
// @ts-ignore
export function useInviteByCodeSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<InviteByCodeQuery, InviteByCodeQueryVariables>): Apollo.UseSuspenseQueryResult<InviteByCodeQuery, InviteByCodeQueryVariables>;
export function useInviteByCodeSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<InviteByCodeQuery, InviteByCodeQueryVariables>): Apollo.UseSuspenseQueryResult<InviteByCodeQuery | undefined, InviteByCodeQueryVariables>;
export function useInviteByCodeSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<InviteByCodeQuery, InviteByCodeQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<InviteByCodeQuery, InviteByCodeQueryVariables>(InviteByCodeDocument, options);
        }
export type InviteByCodeQueryHookResult = ReturnType<typeof useInviteByCodeQuery>;
export type InviteByCodeLazyQueryHookResult = ReturnType<typeof useInviteByCodeLazyQuery>;
export type InviteByCodeSuspenseQueryHookResult = ReturnType<typeof useInviteByCodeSuspenseQuery>;
export type InviteByCodeQueryResult = Apollo.QueryResult<InviteByCodeQuery, InviteByCodeQueryVariables>;
export const GetInviteDocument = gql`
    query GetInvite($id: ID!) {
  invite(id: $id) {
    ...DetailInvite
  }
}
    ${DetailInviteFragmentDoc}`;

/**
 * __useGetInviteQuery__
 *
 * To run a query within a React component, call `useGetInviteQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetInviteQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetInviteQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetInviteQuery(baseOptions: Apollo.QueryHookOptions<GetInviteQuery, GetInviteQueryVariables> & ({ variables: GetInviteQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetInviteQuery, GetInviteQueryVariables>(GetInviteDocument, options);
      }
export function useGetInviteLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetInviteQuery, GetInviteQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetInviteQuery, GetInviteQueryVariables>(GetInviteDocument, options);
        }
// @ts-ignore
export function useGetInviteSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetInviteQuery, GetInviteQueryVariables>): Apollo.UseSuspenseQueryResult<GetInviteQuery, GetInviteQueryVariables>;
export function useGetInviteSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetInviteQuery, GetInviteQueryVariables>): Apollo.UseSuspenseQueryResult<GetInviteQuery | undefined, GetInviteQueryVariables>;
export function useGetInviteSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetInviteQuery, GetInviteQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetInviteQuery, GetInviteQueryVariables>(GetInviteDocument, options);
        }
export type GetInviteQueryHookResult = ReturnType<typeof useGetInviteQuery>;
export type GetInviteLazyQueryHookResult = ReturnType<typeof useGetInviteLazyQuery>;
export type GetInviteSuspenseQueryHookResult = ReturnType<typeof useGetInviteSuspenseQuery>;
export type GetInviteQueryResult = Apollo.QueryResult<GetInviteQuery, GetInviteQueryVariables>;
export const ListKommunityPartnerDocument = gql`
    query ListKommunityPartner($pagination: OffsetPaginationInput, $filters: ManagementKommunityPartnerFilter, $order: ManagementKommunityPartnerOrder) {
  kommunityPartners(pagination: $pagination, filters: $filters, order: $order) {
    ...ListKommunityPartner
  }
}
    ${ListKommunityPartnerFragmentDoc}`;

/**
 * __useListKommunityPartnerQuery__
 *
 * To run a query within a React component, call `useListKommunityPartnerQuery` and pass it any options that fit your needs.
 * When your component renders, `useListKommunityPartnerQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useListKommunityPartnerQuery({
 *   variables: {
 *      pagination: // value for 'pagination'
 *      filters: // value for 'filters'
 *      order: // value for 'order'
 *   },
 * });
 */
export function useListKommunityPartnerQuery(baseOptions?: Apollo.QueryHookOptions<ListKommunityPartnerQuery, ListKommunityPartnerQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ListKommunityPartnerQuery, ListKommunityPartnerQueryVariables>(ListKommunityPartnerDocument, options);
      }
export function useListKommunityPartnerLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ListKommunityPartnerQuery, ListKommunityPartnerQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ListKommunityPartnerQuery, ListKommunityPartnerQueryVariables>(ListKommunityPartnerDocument, options);
        }
// @ts-ignore
export function useListKommunityPartnerSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<ListKommunityPartnerQuery, ListKommunityPartnerQueryVariables>): Apollo.UseSuspenseQueryResult<ListKommunityPartnerQuery, ListKommunityPartnerQueryVariables>;
export function useListKommunityPartnerSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<ListKommunityPartnerQuery, ListKommunityPartnerQueryVariables>): Apollo.UseSuspenseQueryResult<ListKommunityPartnerQuery | undefined, ListKommunityPartnerQueryVariables>;
export function useListKommunityPartnerSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<ListKommunityPartnerQuery, ListKommunityPartnerQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ListKommunityPartnerQuery, ListKommunityPartnerQueryVariables>(ListKommunityPartnerDocument, options);
        }
export type ListKommunityPartnerQueryHookResult = ReturnType<typeof useListKommunityPartnerQuery>;
export type ListKommunityPartnerLazyQueryHookResult = ReturnType<typeof useListKommunityPartnerLazyQuery>;
export type ListKommunityPartnerSuspenseQueryHookResult = ReturnType<typeof useListKommunityPartnerSuspenseQuery>;
export type ListKommunityPartnerQueryResult = Apollo.QueryResult<ListKommunityPartnerQuery, ListKommunityPartnerQueryVariables>;
export const GetKommunityPartnerDocument = gql`
    query GetKommunityPartner($id: ID!) {
  kommunityPartner(id: $id) {
    ...KommunityPartner
  }
}
    ${KommunityPartnerFragmentDoc}`;

/**
 * __useGetKommunityPartnerQuery__
 *
 * To run a query within a React component, call `useGetKommunityPartnerQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetKommunityPartnerQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetKommunityPartnerQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetKommunityPartnerQuery(baseOptions: Apollo.QueryHookOptions<GetKommunityPartnerQuery, GetKommunityPartnerQueryVariables> & ({ variables: GetKommunityPartnerQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetKommunityPartnerQuery, GetKommunityPartnerQueryVariables>(GetKommunityPartnerDocument, options);
      }
export function useGetKommunityPartnerLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetKommunityPartnerQuery, GetKommunityPartnerQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetKommunityPartnerQuery, GetKommunityPartnerQueryVariables>(GetKommunityPartnerDocument, options);
        }
// @ts-ignore
export function useGetKommunityPartnerSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetKommunityPartnerQuery, GetKommunityPartnerQueryVariables>): Apollo.UseSuspenseQueryResult<GetKommunityPartnerQuery, GetKommunityPartnerQueryVariables>;
export function useGetKommunityPartnerSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetKommunityPartnerQuery, GetKommunityPartnerQueryVariables>): Apollo.UseSuspenseQueryResult<GetKommunityPartnerQuery | undefined, GetKommunityPartnerQueryVariables>;
export function useGetKommunityPartnerSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetKommunityPartnerQuery, GetKommunityPartnerQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetKommunityPartnerQuery, GetKommunityPartnerQueryVariables>(GetKommunityPartnerDocument, options);
        }
export type GetKommunityPartnerQueryHookResult = ReturnType<typeof useGetKommunityPartnerQuery>;
export type GetKommunityPartnerLazyQueryHookResult = ReturnType<typeof useGetKommunityPartnerLazyQuery>;
export type GetKommunityPartnerSuspenseQueryHookResult = ReturnType<typeof useGetKommunityPartnerSuspenseQuery>;
export type GetKommunityPartnerQueryResult = Apollo.QueryResult<GetKommunityPartnerQuery, GetKommunityPartnerQueryVariables>;
export const LayersDocument = gql`
    query Layers($filters: ManagementLayerFilter, $pagination: OffsetPaginationInput, $order: ManagementLayerOrder) {
  layers(filters: $filters, pagination: $pagination, order: $order) {
    ...ListLayer
  }
}
    ${ListLayerFragmentDoc}`;

/**
 * __useLayersQuery__
 *
 * To run a query within a React component, call `useLayersQuery` and pass it any options that fit your needs.
 * When your component renders, `useLayersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useLayersQuery({
 *   variables: {
 *      filters: // value for 'filters'
 *      pagination: // value for 'pagination'
 *      order: // value for 'order'
 *   },
 * });
 */
export function useLayersQuery(baseOptions?: Apollo.QueryHookOptions<LayersQuery, LayersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<LayersQuery, LayersQueryVariables>(LayersDocument, options);
      }
export function useLayersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<LayersQuery, LayersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<LayersQuery, LayersQueryVariables>(LayersDocument, options);
        }
// @ts-ignore
export function useLayersSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<LayersQuery, LayersQueryVariables>): Apollo.UseSuspenseQueryResult<LayersQuery, LayersQueryVariables>;
export function useLayersSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<LayersQuery, LayersQueryVariables>): Apollo.UseSuspenseQueryResult<LayersQuery | undefined, LayersQueryVariables>;
export function useLayersSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<LayersQuery, LayersQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<LayersQuery, LayersQueryVariables>(LayersDocument, options);
        }
export type LayersQueryHookResult = ReturnType<typeof useLayersQuery>;
export type LayersLazyQueryHookResult = ReturnType<typeof useLayersLazyQuery>;
export type LayersSuspenseQueryHookResult = ReturnType<typeof useLayersSuspenseQuery>;
export type LayersQueryResult = Apollo.QueryResult<LayersQuery, LayersQueryVariables>;
export const DetailLayerDocument = gql`
    query DetailLayer($id: ID!) {
  layer(id: $id) {
    ...Layer
  }
}
    ${LayerFragmentDoc}`;

/**
 * __useDetailLayerQuery__
 *
 * To run a query within a React component, call `useDetailLayerQuery` and pass it any options that fit your needs.
 * When your component renders, `useDetailLayerQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useDetailLayerQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDetailLayerQuery(baseOptions: Apollo.QueryHookOptions<DetailLayerQuery, DetailLayerQueryVariables> & ({ variables: DetailLayerQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<DetailLayerQuery, DetailLayerQueryVariables>(DetailLayerDocument, options);
      }
export function useDetailLayerLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<DetailLayerQuery, DetailLayerQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<DetailLayerQuery, DetailLayerQueryVariables>(DetailLayerDocument, options);
        }
// @ts-ignore
export function useDetailLayerSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<DetailLayerQuery, DetailLayerQueryVariables>): Apollo.UseSuspenseQueryResult<DetailLayerQuery, DetailLayerQueryVariables>;
export function useDetailLayerSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<DetailLayerQuery, DetailLayerQueryVariables>): Apollo.UseSuspenseQueryResult<DetailLayerQuery | undefined, DetailLayerQueryVariables>;
export function useDetailLayerSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<DetailLayerQuery, DetailLayerQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<DetailLayerQuery, DetailLayerQueryVariables>(DetailLayerDocument, options);
        }
export type DetailLayerQueryHookResult = ReturnType<typeof useDetailLayerQuery>;
export type DetailLayerLazyQueryHookResult = ReturnType<typeof useDetailLayerLazyQuery>;
export type DetailLayerSuspenseQueryHookResult = ReturnType<typeof useDetailLayerSuspenseQuery>;
export type DetailLayerQueryResult = Apollo.QueryResult<DetailLayerQuery, DetailLayerQueryVariables>;
export const DetailMachineDocument = gql`
    query DetailMachine($id: ID!) {
  machine(id: $id) {
    ...Machine
  }
}
    ${MachineFragmentDoc}`;

/**
 * __useDetailMachineQuery__
 *
 * To run a query within a React component, call `useDetailMachineQuery` and pass it any options that fit your needs.
 * When your component renders, `useDetailMachineQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useDetailMachineQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDetailMachineQuery(baseOptions: Apollo.QueryHookOptions<DetailMachineQuery, DetailMachineQueryVariables> & ({ variables: DetailMachineQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<DetailMachineQuery, DetailMachineQueryVariables>(DetailMachineDocument, options);
      }
export function useDetailMachineLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<DetailMachineQuery, DetailMachineQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<DetailMachineQuery, DetailMachineQueryVariables>(DetailMachineDocument, options);
        }
// @ts-ignore
export function useDetailMachineSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<DetailMachineQuery, DetailMachineQueryVariables>): Apollo.UseSuspenseQueryResult<DetailMachineQuery, DetailMachineQueryVariables>;
export function useDetailMachineSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<DetailMachineQuery, DetailMachineQueryVariables>): Apollo.UseSuspenseQueryResult<DetailMachineQuery | undefined, DetailMachineQueryVariables>;
export function useDetailMachineSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<DetailMachineQuery, DetailMachineQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<DetailMachineQuery, DetailMachineQueryVariables>(DetailMachineDocument, options);
        }
export type DetailMachineQueryHookResult = ReturnType<typeof useDetailMachineQuery>;
export type DetailMachineLazyQueryHookResult = ReturnType<typeof useDetailMachineLazyQuery>;
export type DetailMachineSuspenseQueryHookResult = ReturnType<typeof useDetailMachineSuspenseQuery>;
export type DetailMachineQueryResult = Apollo.QueryResult<DetailMachineQuery, DetailMachineQueryVariables>;
export const MeDocument = gql`
    query Me {
  me {
    ...MeUser
  }
}
    ${MeUserFragmentDoc}`;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, options);
      }
export function useMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, options);
        }
// @ts-ignore
export function useMeSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<MeQuery, MeQueryVariables>): Apollo.UseSuspenseQueryResult<MeQuery, MeQueryVariables>;
export function useMeSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<MeQuery, MeQueryVariables>): Apollo.UseSuspenseQueryResult<MeQuery | undefined, MeQueryVariables>;
export function useMeSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<MeQuery, MeQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<MeQuery, MeQueryVariables>(MeDocument, options);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeSuspenseQueryHookResult = ReturnType<typeof useMeSuspenseQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;
export const MembershipsDocument = gql`
    query Memberships($filters: ManagementMembershipFilter, $order: ManagementMembershipOrder, $pagination: OffsetPaginationInput) {
  memberships(filters: $filters, order: $order, pagination: $pagination) {
    ...ListMembership
  }
}
    ${ListMembershipFragmentDoc}`;

/**
 * __useMembershipsQuery__
 *
 * To run a query within a React component, call `useMembershipsQuery` and pass it any options that fit your needs.
 * When your component renders, `useMembershipsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMembershipsQuery({
 *   variables: {
 *      filters: // value for 'filters'
 *      order: // value for 'order'
 *      pagination: // value for 'pagination'
 *   },
 * });
 */
export function useMembershipsQuery(baseOptions?: Apollo.QueryHookOptions<MembershipsQuery, MembershipsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MembershipsQuery, MembershipsQueryVariables>(MembershipsDocument, options);
      }
export function useMembershipsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MembershipsQuery, MembershipsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MembershipsQuery, MembershipsQueryVariables>(MembershipsDocument, options);
        }
// @ts-ignore
export function useMembershipsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<MembershipsQuery, MembershipsQueryVariables>): Apollo.UseSuspenseQueryResult<MembershipsQuery, MembershipsQueryVariables>;
export function useMembershipsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<MembershipsQuery, MembershipsQueryVariables>): Apollo.UseSuspenseQueryResult<MembershipsQuery | undefined, MembershipsQueryVariables>;
export function useMembershipsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<MembershipsQuery, MembershipsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<MembershipsQuery, MembershipsQueryVariables>(MembershipsDocument, options);
        }
export type MembershipsQueryHookResult = ReturnType<typeof useMembershipsQuery>;
export type MembershipsLazyQueryHookResult = ReturnType<typeof useMembershipsLazyQuery>;
export type MembershipsSuspenseQueryHookResult = ReturnType<typeof useMembershipsSuspenseQuery>;
export type MembershipsQueryResult = Apollo.QueryResult<MembershipsQuery, MembershipsQueryVariables>;
export const GetMembershipDocument = gql`
    query GetMembership($id: ID!) {
  membership(id: $id) {
    ...Membership
  }
}
    ${MembershipFragmentDoc}`;

/**
 * __useGetMembershipQuery__
 *
 * To run a query within a React component, call `useGetMembershipQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMembershipQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMembershipQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetMembershipQuery(baseOptions: Apollo.QueryHookOptions<GetMembershipQuery, GetMembershipQueryVariables> & ({ variables: GetMembershipQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetMembershipQuery, GetMembershipQueryVariables>(GetMembershipDocument, options);
      }
export function useGetMembershipLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMembershipQuery, GetMembershipQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetMembershipQuery, GetMembershipQueryVariables>(GetMembershipDocument, options);
        }
// @ts-ignore
export function useGetMembershipSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetMembershipQuery, GetMembershipQueryVariables>): Apollo.UseSuspenseQueryResult<GetMembershipQuery, GetMembershipQueryVariables>;
export function useGetMembershipSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetMembershipQuery, GetMembershipQueryVariables>): Apollo.UseSuspenseQueryResult<GetMembershipQuery | undefined, GetMembershipQueryVariables>;
export function useGetMembershipSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetMembershipQuery, GetMembershipQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetMembershipQuery, GetMembershipQueryVariables>(GetMembershipDocument, options);
        }
export type GetMembershipQueryHookResult = ReturnType<typeof useGetMembershipQuery>;
export type GetMembershipLazyQueryHookResult = ReturnType<typeof useGetMembershipLazyQuery>;
export type GetMembershipSuspenseQueryHookResult = ReturnType<typeof useGetMembershipSuspenseQuery>;
export type GetMembershipQueryResult = Apollo.QueryResult<GetMembershipQuery, GetMembershipQueryVariables>;
export const GetOauth2ClientByClientIdDocument = gql`
    query GetOauth2ClientByClientId($clientId: String!) {
  oauth2ClientByClientId(clientId: $clientId) {
    ...Oauth2Client
  }
}
    ${Oauth2ClientFragmentDoc}`;

/**
 * __useGetOauth2ClientByClientIdQuery__
 *
 * To run a query within a React component, call `useGetOauth2ClientByClientIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetOauth2ClientByClientIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetOauth2ClientByClientIdQuery({
 *   variables: {
 *      clientId: // value for 'clientId'
 *   },
 * });
 */
export function useGetOauth2ClientByClientIdQuery(baseOptions: Apollo.QueryHookOptions<GetOauth2ClientByClientIdQuery, GetOauth2ClientByClientIdQueryVariables> & ({ variables: GetOauth2ClientByClientIdQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetOauth2ClientByClientIdQuery, GetOauth2ClientByClientIdQueryVariables>(GetOauth2ClientByClientIdDocument, options);
      }
export function useGetOauth2ClientByClientIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetOauth2ClientByClientIdQuery, GetOauth2ClientByClientIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetOauth2ClientByClientIdQuery, GetOauth2ClientByClientIdQueryVariables>(GetOauth2ClientByClientIdDocument, options);
        }
// @ts-ignore
export function useGetOauth2ClientByClientIdSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetOauth2ClientByClientIdQuery, GetOauth2ClientByClientIdQueryVariables>): Apollo.UseSuspenseQueryResult<GetOauth2ClientByClientIdQuery, GetOauth2ClientByClientIdQueryVariables>;
export function useGetOauth2ClientByClientIdSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetOauth2ClientByClientIdQuery, GetOauth2ClientByClientIdQueryVariables>): Apollo.UseSuspenseQueryResult<GetOauth2ClientByClientIdQuery | undefined, GetOauth2ClientByClientIdQueryVariables>;
export function useGetOauth2ClientByClientIdSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetOauth2ClientByClientIdQuery, GetOauth2ClientByClientIdQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetOauth2ClientByClientIdQuery, GetOauth2ClientByClientIdQueryVariables>(GetOauth2ClientByClientIdDocument, options);
        }
export type GetOauth2ClientByClientIdQueryHookResult = ReturnType<typeof useGetOauth2ClientByClientIdQuery>;
export type GetOauth2ClientByClientIdLazyQueryHookResult = ReturnType<typeof useGetOauth2ClientByClientIdLazyQuery>;
export type GetOauth2ClientByClientIdSuspenseQueryHookResult = ReturnType<typeof useGetOauth2ClientByClientIdSuspenseQuery>;
export type GetOauth2ClientByClientIdQueryResult = Apollo.QueryResult<GetOauth2ClientByClientIdQuery, GetOauth2ClientByClientIdQueryVariables>;
export const OrganizationDocument = gql`
    query Organization($id: ID!) {
  organization(id: $id) {
    ...Organization
  }
}
    ${OrganizationFragmentDoc}`;

/**
 * __useOrganizationQuery__
 *
 * To run a query within a React component, call `useOrganizationQuery` and pass it any options that fit your needs.
 * When your component renders, `useOrganizationQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useOrganizationQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useOrganizationQuery(baseOptions: Apollo.QueryHookOptions<OrganizationQuery, OrganizationQueryVariables> & ({ variables: OrganizationQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<OrganizationQuery, OrganizationQueryVariables>(OrganizationDocument, options);
      }
export function useOrganizationLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<OrganizationQuery, OrganizationQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<OrganizationQuery, OrganizationQueryVariables>(OrganizationDocument, options);
        }
// @ts-ignore
export function useOrganizationSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<OrganizationQuery, OrganizationQueryVariables>): Apollo.UseSuspenseQueryResult<OrganizationQuery, OrganizationQueryVariables>;
export function useOrganizationSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<OrganizationQuery, OrganizationQueryVariables>): Apollo.UseSuspenseQueryResult<OrganizationQuery | undefined, OrganizationQueryVariables>;
export function useOrganizationSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<OrganizationQuery, OrganizationQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<OrganizationQuery, OrganizationQueryVariables>(OrganizationDocument, options);
        }
export type OrganizationQueryHookResult = ReturnType<typeof useOrganizationQuery>;
export type OrganizationLazyQueryHookResult = ReturnType<typeof useOrganizationLazyQuery>;
export type OrganizationSuspenseQueryHookResult = ReturnType<typeof useOrganizationSuspenseQuery>;
export type OrganizationQueryResult = Apollo.QueryResult<OrganizationQuery, OrganizationQueryVariables>;
export const SidebarOrganizationDocument = gql`
    query SidebarOrganization($id: ID!) {
  organization(id: $id) {
    ...SidebarOrganization
  }
}
    ${SidebarOrganizationFragmentDoc}`;

/**
 * __useSidebarOrganizationQuery__
 *
 * To run a query within a React component, call `useSidebarOrganizationQuery` and pass it any options that fit your needs.
 * When your component renders, `useSidebarOrganizationQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSidebarOrganizationQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useSidebarOrganizationQuery(baseOptions: Apollo.QueryHookOptions<SidebarOrganizationQuery, SidebarOrganizationQueryVariables> & ({ variables: SidebarOrganizationQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SidebarOrganizationQuery, SidebarOrganizationQueryVariables>(SidebarOrganizationDocument, options);
      }
export function useSidebarOrganizationLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SidebarOrganizationQuery, SidebarOrganizationQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SidebarOrganizationQuery, SidebarOrganizationQueryVariables>(SidebarOrganizationDocument, options);
        }
// @ts-ignore
export function useSidebarOrganizationSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<SidebarOrganizationQuery, SidebarOrganizationQueryVariables>): Apollo.UseSuspenseQueryResult<SidebarOrganizationQuery, SidebarOrganizationQueryVariables>;
export function useSidebarOrganizationSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<SidebarOrganizationQuery, SidebarOrganizationQueryVariables>): Apollo.UseSuspenseQueryResult<SidebarOrganizationQuery | undefined, SidebarOrganizationQueryVariables>;
export function useSidebarOrganizationSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<SidebarOrganizationQuery, SidebarOrganizationQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<SidebarOrganizationQuery, SidebarOrganizationQueryVariables>(SidebarOrganizationDocument, options);
        }
export type SidebarOrganizationQueryHookResult = ReturnType<typeof useSidebarOrganizationQuery>;
export type SidebarOrganizationLazyQueryHookResult = ReturnType<typeof useSidebarOrganizationLazyQuery>;
export type SidebarOrganizationSuspenseQueryHookResult = ReturnType<typeof useSidebarOrganizationSuspenseQuery>;
export type SidebarOrganizationQueryResult = Apollo.QueryResult<SidebarOrganizationQuery, SidebarOrganizationQueryVariables>;
export const ListOrganizationsDocument = gql`
    query ListOrganizations($filters: OrganizationFilter, $pagination: OffsetPaginationInput) {
  organizations(filters: $filters, pagination: $pagination) {
    ...ListOrganization
  }
}
    ${ListOrganizationFragmentDoc}`;

/**
 * __useListOrganizationsQuery__
 *
 * To run a query within a React component, call `useListOrganizationsQuery` and pass it any options that fit your needs.
 * When your component renders, `useListOrganizationsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useListOrganizationsQuery({
 *   variables: {
 *      filters: // value for 'filters'
 *      pagination: // value for 'pagination'
 *   },
 * });
 */
export function useListOrganizationsQuery(baseOptions?: Apollo.QueryHookOptions<ListOrganizationsQuery, ListOrganizationsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ListOrganizationsQuery, ListOrganizationsQueryVariables>(ListOrganizationsDocument, options);
      }
export function useListOrganizationsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ListOrganizationsQuery, ListOrganizationsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ListOrganizationsQuery, ListOrganizationsQueryVariables>(ListOrganizationsDocument, options);
        }
// @ts-ignore
export function useListOrganizationsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<ListOrganizationsQuery, ListOrganizationsQueryVariables>): Apollo.UseSuspenseQueryResult<ListOrganizationsQuery, ListOrganizationsQueryVariables>;
export function useListOrganizationsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<ListOrganizationsQuery, ListOrganizationsQueryVariables>): Apollo.UseSuspenseQueryResult<ListOrganizationsQuery | undefined, ListOrganizationsQueryVariables>;
export function useListOrganizationsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<ListOrganizationsQuery, ListOrganizationsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ListOrganizationsQuery, ListOrganizationsQueryVariables>(ListOrganizationsDocument, options);
        }
export type ListOrganizationsQueryHookResult = ReturnType<typeof useListOrganizationsQuery>;
export type ListOrganizationsLazyQueryHookResult = ReturnType<typeof useListOrganizationsLazyQuery>;
export type ListOrganizationsSuspenseQueryHookResult = ReturnType<typeof useListOrganizationsSuspenseQuery>;
export type ListOrganizationsQueryResult = Apollo.QueryResult<ListOrganizationsQuery, ListOrganizationsQueryVariables>;
export const OrganizationOptionsDocument = gql`
    query OrganizationOptions($search: String, $values: [ID!]) {
  options: organizations(filters: {search: $search, ids: $values}) {
    value: id
    label: name
  }
}
    `;

/**
 * __useOrganizationOptionsQuery__
 *
 * To run a query within a React component, call `useOrganizationOptionsQuery` and pass it any options that fit your needs.
 * When your component renders, `useOrganizationOptionsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useOrganizationOptionsQuery({
 *   variables: {
 *      search: // value for 'search'
 *      values: // value for 'values'
 *   },
 * });
 */
export function useOrganizationOptionsQuery(baseOptions?: Apollo.QueryHookOptions<OrganizationOptionsQuery, OrganizationOptionsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<OrganizationOptionsQuery, OrganizationOptionsQueryVariables>(OrganizationOptionsDocument, options);
      }
export function useOrganizationOptionsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<OrganizationOptionsQuery, OrganizationOptionsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<OrganizationOptionsQuery, OrganizationOptionsQueryVariables>(OrganizationOptionsDocument, options);
        }
// @ts-ignore
export function useOrganizationOptionsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<OrganizationOptionsQuery, OrganizationOptionsQueryVariables>): Apollo.UseSuspenseQueryResult<OrganizationOptionsQuery, OrganizationOptionsQueryVariables>;
export function useOrganizationOptionsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<OrganizationOptionsQuery, OrganizationOptionsQueryVariables>): Apollo.UseSuspenseQueryResult<OrganizationOptionsQuery | undefined, OrganizationOptionsQueryVariables>;
export function useOrganizationOptionsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<OrganizationOptionsQuery, OrganizationOptionsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<OrganizationOptionsQuery, OrganizationOptionsQueryVariables>(OrganizationOptionsDocument, options);
        }
export type OrganizationOptionsQueryHookResult = ReturnType<typeof useOrganizationOptionsQuery>;
export type OrganizationOptionsLazyQueryHookResult = ReturnType<typeof useOrganizationOptionsLazyQuery>;
export type OrganizationOptionsSuspenseQueryHookResult = ReturnType<typeof useOrganizationOptionsSuspenseQuery>;
export type OrganizationOptionsQueryResult = Apollo.QueryResult<OrganizationOptionsQuery, OrganizationOptionsQueryVariables>;
export const ReleasesDocument = gql`
    query Releases {
  releases {
    ...ListRelease
  }
}
    ${ListReleaseFragmentDoc}`;

/**
 * __useReleasesQuery__
 *
 * To run a query within a React component, call `useReleasesQuery` and pass it any options that fit your needs.
 * When your component renders, `useReleasesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useReleasesQuery({
 *   variables: {
 *   },
 * });
 */
export function useReleasesQuery(baseOptions?: Apollo.QueryHookOptions<ReleasesQuery, ReleasesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ReleasesQuery, ReleasesQueryVariables>(ReleasesDocument, options);
      }
export function useReleasesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ReleasesQuery, ReleasesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ReleasesQuery, ReleasesQueryVariables>(ReleasesDocument, options);
        }
// @ts-ignore
export function useReleasesSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<ReleasesQuery, ReleasesQueryVariables>): Apollo.UseSuspenseQueryResult<ReleasesQuery, ReleasesQueryVariables>;
export function useReleasesSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<ReleasesQuery, ReleasesQueryVariables>): Apollo.UseSuspenseQueryResult<ReleasesQuery | undefined, ReleasesQueryVariables>;
export function useReleasesSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<ReleasesQuery, ReleasesQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ReleasesQuery, ReleasesQueryVariables>(ReleasesDocument, options);
        }
export type ReleasesQueryHookResult = ReturnType<typeof useReleasesQuery>;
export type ReleasesLazyQueryHookResult = ReturnType<typeof useReleasesLazyQuery>;
export type ReleasesSuspenseQueryHookResult = ReturnType<typeof useReleasesSuspenseQuery>;
export type ReleasesQueryResult = Apollo.QueryResult<ReleasesQuery, ReleasesQueryVariables>;
export const DetailReleaseDocument = gql`
    query DetailRelease($id: ID!) {
  release(id: $id) {
    ...DetailRelease
  }
}
    ${DetailReleaseFragmentDoc}`;

/**
 * __useDetailReleaseQuery__
 *
 * To run a query within a React component, call `useDetailReleaseQuery` and pass it any options that fit your needs.
 * When your component renders, `useDetailReleaseQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useDetailReleaseQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDetailReleaseQuery(baseOptions: Apollo.QueryHookOptions<DetailReleaseQuery, DetailReleaseQueryVariables> & ({ variables: DetailReleaseQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<DetailReleaseQuery, DetailReleaseQueryVariables>(DetailReleaseDocument, options);
      }
export function useDetailReleaseLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<DetailReleaseQuery, DetailReleaseQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<DetailReleaseQuery, DetailReleaseQueryVariables>(DetailReleaseDocument, options);
        }
// @ts-ignore
export function useDetailReleaseSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<DetailReleaseQuery, DetailReleaseQueryVariables>): Apollo.UseSuspenseQueryResult<DetailReleaseQuery, DetailReleaseQueryVariables>;
export function useDetailReleaseSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<DetailReleaseQuery, DetailReleaseQueryVariables>): Apollo.UseSuspenseQueryResult<DetailReleaseQuery | undefined, DetailReleaseQueryVariables>;
export function useDetailReleaseSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<DetailReleaseQuery, DetailReleaseQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<DetailReleaseQuery, DetailReleaseQueryVariables>(DetailReleaseDocument, options);
        }
export type DetailReleaseQueryHookResult = ReturnType<typeof useDetailReleaseQuery>;
export type DetailReleaseLazyQueryHookResult = ReturnType<typeof useDetailReleaseLazyQuery>;
export type DetailReleaseSuspenseQueryHookResult = ReturnType<typeof useDetailReleaseSuspenseQuery>;
export type DetailReleaseQueryResult = Apollo.QueryResult<DetailReleaseQuery, DetailReleaseQueryVariables>;
export const RolesDocument = gql`
    query Roles($filters: ManagementRoleFilter, $order: ManagementRoleOrder, $pagination: OffsetPaginationInput) {
  roles(filters: $filters, order: $order, pagination: $pagination) {
    ...ListRole
  }
}
    ${ListRoleFragmentDoc}`;

/**
 * __useRolesQuery__
 *
 * To run a query within a React component, call `useRolesQuery` and pass it any options that fit your needs.
 * When your component renders, `useRolesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useRolesQuery({
 *   variables: {
 *      filters: // value for 'filters'
 *      order: // value for 'order'
 *      pagination: // value for 'pagination'
 *   },
 * });
 */
export function useRolesQuery(baseOptions?: Apollo.QueryHookOptions<RolesQuery, RolesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<RolesQuery, RolesQueryVariables>(RolesDocument, options);
      }
export function useRolesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<RolesQuery, RolesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<RolesQuery, RolesQueryVariables>(RolesDocument, options);
        }
// @ts-ignore
export function useRolesSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<RolesQuery, RolesQueryVariables>): Apollo.UseSuspenseQueryResult<RolesQuery, RolesQueryVariables>;
export function useRolesSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<RolesQuery, RolesQueryVariables>): Apollo.UseSuspenseQueryResult<RolesQuery | undefined, RolesQueryVariables>;
export function useRolesSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<RolesQuery, RolesQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<RolesQuery, RolesQueryVariables>(RolesDocument, options);
        }
export type RolesQueryHookResult = ReturnType<typeof useRolesQuery>;
export type RolesLazyQueryHookResult = ReturnType<typeof useRolesLazyQuery>;
export type RolesSuspenseQueryHookResult = ReturnType<typeof useRolesSuspenseQuery>;
export type RolesQueryResult = Apollo.QueryResult<RolesQuery, RolesQueryVariables>;
export const GetRoleDocument = gql`
    query GetRole($id: ID!) {
  role(id: $id) {
    ...Role
  }
}
    ${RoleFragmentDoc}`;

/**
 * __useGetRoleQuery__
 *
 * To run a query within a React component, call `useGetRoleQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetRoleQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetRoleQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetRoleQuery(baseOptions: Apollo.QueryHookOptions<GetRoleQuery, GetRoleQueryVariables> & ({ variables: GetRoleQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetRoleQuery, GetRoleQueryVariables>(GetRoleDocument, options);
      }
export function useGetRoleLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetRoleQuery, GetRoleQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetRoleQuery, GetRoleQueryVariables>(GetRoleDocument, options);
        }
// @ts-ignore
export function useGetRoleSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetRoleQuery, GetRoleQueryVariables>): Apollo.UseSuspenseQueryResult<GetRoleQuery, GetRoleQueryVariables>;
export function useGetRoleSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetRoleQuery, GetRoleQueryVariables>): Apollo.UseSuspenseQueryResult<GetRoleQuery | undefined, GetRoleQueryVariables>;
export function useGetRoleSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetRoleQuery, GetRoleQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetRoleQuery, GetRoleQueryVariables>(GetRoleDocument, options);
        }
export type GetRoleQueryHookResult = ReturnType<typeof useGetRoleQuery>;
export type GetRoleLazyQueryHookResult = ReturnType<typeof useGetRoleLazyQuery>;
export type GetRoleSuspenseQueryHookResult = ReturnType<typeof useGetRoleSuspenseQuery>;
export type GetRoleQueryResult = Apollo.QueryResult<GetRoleQuery, GetRoleQueryVariables>;
export const ScopesDocument = gql`
    query Scopes($filters: ManagementScopeFilter, $order: ManagementScopeOrder, $pagination: OffsetPaginationInput) {
  scopes(filters: $filters, order: $order, pagination: $pagination) {
    ...ListScope
  }
}
    ${ListScopeFragmentDoc}`;

/**
 * __useScopesQuery__
 *
 * To run a query within a React component, call `useScopesQuery` and pass it any options that fit your needs.
 * When your component renders, `useScopesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useScopesQuery({
 *   variables: {
 *      filters: // value for 'filters'
 *      order: // value for 'order'
 *      pagination: // value for 'pagination'
 *   },
 * });
 */
export function useScopesQuery(baseOptions?: Apollo.QueryHookOptions<ScopesQuery, ScopesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ScopesQuery, ScopesQueryVariables>(ScopesDocument, options);
      }
export function useScopesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ScopesQuery, ScopesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ScopesQuery, ScopesQueryVariables>(ScopesDocument, options);
        }
// @ts-ignore
export function useScopesSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<ScopesQuery, ScopesQueryVariables>): Apollo.UseSuspenseQueryResult<ScopesQuery, ScopesQueryVariables>;
export function useScopesSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<ScopesQuery, ScopesQueryVariables>): Apollo.UseSuspenseQueryResult<ScopesQuery | undefined, ScopesQueryVariables>;
export function useScopesSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<ScopesQuery, ScopesQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ScopesQuery, ScopesQueryVariables>(ScopesDocument, options);
        }
export type ScopesQueryHookResult = ReturnType<typeof useScopesQuery>;
export type ScopesLazyQueryHookResult = ReturnType<typeof useScopesLazyQuery>;
export type ScopesSuspenseQueryHookResult = ReturnType<typeof useScopesSuspenseQuery>;
export type ScopesQueryResult = Apollo.QueryResult<ScopesQuery, ScopesQueryVariables>;
export const DeteilScopeDocument = gql`
    query DeteilScope($id: ID!) {
  scope(id: $id) {
    ...Scope
  }
}
    ${ScopeFragmentDoc}`;

/**
 * __useDeteilScopeQuery__
 *
 * To run a query within a React component, call `useDeteilScopeQuery` and pass it any options that fit your needs.
 * When your component renders, `useDeteilScopeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useDeteilScopeQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeteilScopeQuery(baseOptions: Apollo.QueryHookOptions<DeteilScopeQuery, DeteilScopeQueryVariables> & ({ variables: DeteilScopeQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<DeteilScopeQuery, DeteilScopeQueryVariables>(DeteilScopeDocument, options);
      }
export function useDeteilScopeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<DeteilScopeQuery, DeteilScopeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<DeteilScopeQuery, DeteilScopeQueryVariables>(DeteilScopeDocument, options);
        }
// @ts-ignore
export function useDeteilScopeSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<DeteilScopeQuery, DeteilScopeQueryVariables>): Apollo.UseSuspenseQueryResult<DeteilScopeQuery, DeteilScopeQueryVariables>;
export function useDeteilScopeSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<DeteilScopeQuery, DeteilScopeQueryVariables>): Apollo.UseSuspenseQueryResult<DeteilScopeQuery | undefined, DeteilScopeQueryVariables>;
export function useDeteilScopeSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<DeteilScopeQuery, DeteilScopeQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<DeteilScopeQuery, DeteilScopeQueryVariables>(DeteilScopeDocument, options);
        }
export type DeteilScopeQueryHookResult = ReturnType<typeof useDeteilScopeQuery>;
export type DeteilScopeLazyQueryHookResult = ReturnType<typeof useDeteilScopeLazyQuery>;
export type DeteilScopeSuspenseQueryHookResult = ReturnType<typeof useDeteilScopeSuspenseQuery>;
export type DeteilScopeQueryResult = Apollo.QueryResult<DeteilScopeQuery, DeteilScopeQueryVariables>;
export const ServiceDeviceCodeByCodeDocument = gql`
    query ServiceDeviceCodeByCode($code: String!) {
  serviceDeviceCodeByCode(code: $code) {
    ...ServiceDeviceCode
  }
}
    ${ServiceDeviceCodeFragmentDoc}`;

/**
 * __useServiceDeviceCodeByCodeQuery__
 *
 * To run a query within a React component, call `useServiceDeviceCodeByCodeQuery` and pass it any options that fit your needs.
 * When your component renders, `useServiceDeviceCodeByCodeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useServiceDeviceCodeByCodeQuery({
 *   variables: {
 *      code: // value for 'code'
 *   },
 * });
 */
export function useServiceDeviceCodeByCodeQuery(baseOptions: Apollo.QueryHookOptions<ServiceDeviceCodeByCodeQuery, ServiceDeviceCodeByCodeQueryVariables> & ({ variables: ServiceDeviceCodeByCodeQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ServiceDeviceCodeByCodeQuery, ServiceDeviceCodeByCodeQueryVariables>(ServiceDeviceCodeByCodeDocument, options);
      }
export function useServiceDeviceCodeByCodeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ServiceDeviceCodeByCodeQuery, ServiceDeviceCodeByCodeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ServiceDeviceCodeByCodeQuery, ServiceDeviceCodeByCodeQueryVariables>(ServiceDeviceCodeByCodeDocument, options);
        }
// @ts-ignore
export function useServiceDeviceCodeByCodeSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<ServiceDeviceCodeByCodeQuery, ServiceDeviceCodeByCodeQueryVariables>): Apollo.UseSuspenseQueryResult<ServiceDeviceCodeByCodeQuery, ServiceDeviceCodeByCodeQueryVariables>;
export function useServiceDeviceCodeByCodeSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<ServiceDeviceCodeByCodeQuery, ServiceDeviceCodeByCodeQueryVariables>): Apollo.UseSuspenseQueryResult<ServiceDeviceCodeByCodeQuery | undefined, ServiceDeviceCodeByCodeQueryVariables>;
export function useServiceDeviceCodeByCodeSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<ServiceDeviceCodeByCodeQuery, ServiceDeviceCodeByCodeQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ServiceDeviceCodeByCodeQuery, ServiceDeviceCodeByCodeQueryVariables>(ServiceDeviceCodeByCodeDocument, options);
        }
export type ServiceDeviceCodeByCodeQueryHookResult = ReturnType<typeof useServiceDeviceCodeByCodeQuery>;
export type ServiceDeviceCodeByCodeLazyQueryHookResult = ReturnType<typeof useServiceDeviceCodeByCodeLazyQuery>;
export type ServiceDeviceCodeByCodeSuspenseQueryHookResult = ReturnType<typeof useServiceDeviceCodeByCodeSuspenseQuery>;
export type ServiceDeviceCodeByCodeQueryResult = Apollo.QueryResult<ServiceDeviceCodeByCodeQuery, ServiceDeviceCodeByCodeQueryVariables>;
export const ListServiceInstancesDocument = gql`
    query ListServiceInstances($pagination: OffsetPaginationInput, $filters: ManagementServiceInstanceFilter, $order: ManagementServiceInstanceOrder) {
  serviceInstances(pagination: $pagination, filters: $filters, order: $order) {
    ...ListServiceInstance
  }
}
    ${ListServiceInstanceFragmentDoc}`;

/**
 * __useListServiceInstancesQuery__
 *
 * To run a query within a React component, call `useListServiceInstancesQuery` and pass it any options that fit your needs.
 * When your component renders, `useListServiceInstancesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useListServiceInstancesQuery({
 *   variables: {
 *      pagination: // value for 'pagination'
 *      filters: // value for 'filters'
 *      order: // value for 'order'
 *   },
 * });
 */
export function useListServiceInstancesQuery(baseOptions?: Apollo.QueryHookOptions<ListServiceInstancesQuery, ListServiceInstancesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ListServiceInstancesQuery, ListServiceInstancesQueryVariables>(ListServiceInstancesDocument, options);
      }
export function useListServiceInstancesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ListServiceInstancesQuery, ListServiceInstancesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ListServiceInstancesQuery, ListServiceInstancesQueryVariables>(ListServiceInstancesDocument, options);
        }
// @ts-ignore
export function useListServiceInstancesSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<ListServiceInstancesQuery, ListServiceInstancesQueryVariables>): Apollo.UseSuspenseQueryResult<ListServiceInstancesQuery, ListServiceInstancesQueryVariables>;
export function useListServiceInstancesSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<ListServiceInstancesQuery, ListServiceInstancesQueryVariables>): Apollo.UseSuspenseQueryResult<ListServiceInstancesQuery | undefined, ListServiceInstancesQueryVariables>;
export function useListServiceInstancesSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<ListServiceInstancesQuery, ListServiceInstancesQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ListServiceInstancesQuery, ListServiceInstancesQueryVariables>(ListServiceInstancesDocument, options);
        }
export type ListServiceInstancesQueryHookResult = ReturnType<typeof useListServiceInstancesQuery>;
export type ListServiceInstancesLazyQueryHookResult = ReturnType<typeof useListServiceInstancesLazyQuery>;
export type ListServiceInstancesSuspenseQueryHookResult = ReturnType<typeof useListServiceInstancesSuspenseQuery>;
export type ListServiceInstancesQueryResult = Apollo.QueryResult<ListServiceInstancesQuery, ListServiceInstancesQueryVariables>;
export const GetServiceInstanceDocument = gql`
    query GetServiceInstance($id: ID!) {
  serviceInstance(id: $id) {
    ...ServiceInstance
  }
}
    ${ServiceInstanceFragmentDoc}`;

/**
 * __useGetServiceInstanceQuery__
 *
 * To run a query within a React component, call `useGetServiceInstanceQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetServiceInstanceQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetServiceInstanceQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetServiceInstanceQuery(baseOptions: Apollo.QueryHookOptions<GetServiceInstanceQuery, GetServiceInstanceQueryVariables> & ({ variables: GetServiceInstanceQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetServiceInstanceQuery, GetServiceInstanceQueryVariables>(GetServiceInstanceDocument, options);
      }
export function useGetServiceInstanceLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetServiceInstanceQuery, GetServiceInstanceQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetServiceInstanceQuery, GetServiceInstanceQueryVariables>(GetServiceInstanceDocument, options);
        }
// @ts-ignore
export function useGetServiceInstanceSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetServiceInstanceQuery, GetServiceInstanceQueryVariables>): Apollo.UseSuspenseQueryResult<GetServiceInstanceQuery, GetServiceInstanceQueryVariables>;
export function useGetServiceInstanceSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetServiceInstanceQuery, GetServiceInstanceQueryVariables>): Apollo.UseSuspenseQueryResult<GetServiceInstanceQuery | undefined, GetServiceInstanceQueryVariables>;
export function useGetServiceInstanceSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetServiceInstanceQuery, GetServiceInstanceQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetServiceInstanceQuery, GetServiceInstanceQueryVariables>(GetServiceInstanceDocument, options);
        }
export type GetServiceInstanceQueryHookResult = ReturnType<typeof useGetServiceInstanceQuery>;
export type GetServiceInstanceLazyQueryHookResult = ReturnType<typeof useGetServiceInstanceLazyQuery>;
export type GetServiceInstanceSuspenseQueryHookResult = ReturnType<typeof useGetServiceInstanceSuspenseQuery>;
export type GetServiceInstanceQueryResult = Apollo.QueryResult<GetServiceInstanceQuery, GetServiceInstanceQueryVariables>;
export const ListServiceInstanceMappingsDocument = gql`
    query ListServiceInstanceMappings($pagination: OffsetPaginationInput, $filters: ServiceInstanceMappingFilter) {
  serviceInstanceMappings(pagination: $pagination, filters: $filters) {
    ...ListServiceInstanceMapping
  }
}
    ${ListServiceInstanceMappingFragmentDoc}`;

/**
 * __useListServiceInstanceMappingsQuery__
 *
 * To run a query within a React component, call `useListServiceInstanceMappingsQuery` and pass it any options that fit your needs.
 * When your component renders, `useListServiceInstanceMappingsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useListServiceInstanceMappingsQuery({
 *   variables: {
 *      pagination: // value for 'pagination'
 *      filters: // value for 'filters'
 *   },
 * });
 */
export function useListServiceInstanceMappingsQuery(baseOptions?: Apollo.QueryHookOptions<ListServiceInstanceMappingsQuery, ListServiceInstanceMappingsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ListServiceInstanceMappingsQuery, ListServiceInstanceMappingsQueryVariables>(ListServiceInstanceMappingsDocument, options);
      }
export function useListServiceInstanceMappingsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ListServiceInstanceMappingsQuery, ListServiceInstanceMappingsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ListServiceInstanceMappingsQuery, ListServiceInstanceMappingsQueryVariables>(ListServiceInstanceMappingsDocument, options);
        }
// @ts-ignore
export function useListServiceInstanceMappingsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<ListServiceInstanceMappingsQuery, ListServiceInstanceMappingsQueryVariables>): Apollo.UseSuspenseQueryResult<ListServiceInstanceMappingsQuery, ListServiceInstanceMappingsQueryVariables>;
export function useListServiceInstanceMappingsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<ListServiceInstanceMappingsQuery, ListServiceInstanceMappingsQueryVariables>): Apollo.UseSuspenseQueryResult<ListServiceInstanceMappingsQuery | undefined, ListServiceInstanceMappingsQueryVariables>;
export function useListServiceInstanceMappingsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<ListServiceInstanceMappingsQuery, ListServiceInstanceMappingsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ListServiceInstanceMappingsQuery, ListServiceInstanceMappingsQueryVariables>(ListServiceInstanceMappingsDocument, options);
        }
export type ListServiceInstanceMappingsQueryHookResult = ReturnType<typeof useListServiceInstanceMappingsQuery>;
export type ListServiceInstanceMappingsLazyQueryHookResult = ReturnType<typeof useListServiceInstanceMappingsLazyQuery>;
export type ListServiceInstanceMappingsSuspenseQueryHookResult = ReturnType<typeof useListServiceInstanceMappingsSuspenseQuery>;
export type ListServiceInstanceMappingsQueryResult = Apollo.QueryResult<ListServiceInstanceMappingsQuery, ListServiceInstanceMappingsQueryVariables>;
export const GetServiceInstanceMappingDocument = gql`
    query GetServiceInstanceMapping($id: ID!) {
  serviceInstanceMapping(id: $id) {
    ...ListServiceInstanceMapping
  }
}
    ${ListServiceInstanceMappingFragmentDoc}`;

/**
 * __useGetServiceInstanceMappingQuery__
 *
 * To run a query within a React component, call `useGetServiceInstanceMappingQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetServiceInstanceMappingQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetServiceInstanceMappingQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetServiceInstanceMappingQuery(baseOptions: Apollo.QueryHookOptions<GetServiceInstanceMappingQuery, GetServiceInstanceMappingQueryVariables> & ({ variables: GetServiceInstanceMappingQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetServiceInstanceMappingQuery, GetServiceInstanceMappingQueryVariables>(GetServiceInstanceMappingDocument, options);
      }
export function useGetServiceInstanceMappingLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetServiceInstanceMappingQuery, GetServiceInstanceMappingQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetServiceInstanceMappingQuery, GetServiceInstanceMappingQueryVariables>(GetServiceInstanceMappingDocument, options);
        }
// @ts-ignore
export function useGetServiceInstanceMappingSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetServiceInstanceMappingQuery, GetServiceInstanceMappingQueryVariables>): Apollo.UseSuspenseQueryResult<GetServiceInstanceMappingQuery, GetServiceInstanceMappingQueryVariables>;
export function useGetServiceInstanceMappingSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetServiceInstanceMappingQuery, GetServiceInstanceMappingQueryVariables>): Apollo.UseSuspenseQueryResult<GetServiceInstanceMappingQuery | undefined, GetServiceInstanceMappingQueryVariables>;
export function useGetServiceInstanceMappingSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetServiceInstanceMappingQuery, GetServiceInstanceMappingQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetServiceInstanceMappingQuery, GetServiceInstanceMappingQueryVariables>(GetServiceInstanceMappingDocument, options);
        }
export type GetServiceInstanceMappingQueryHookResult = ReturnType<typeof useGetServiceInstanceMappingQuery>;
export type GetServiceInstanceMappingLazyQueryHookResult = ReturnType<typeof useGetServiceInstanceMappingLazyQuery>;
export type GetServiceInstanceMappingSuspenseQueryHookResult = ReturnType<typeof useGetServiceInstanceMappingSuspenseQuery>;
export type GetServiceInstanceMappingQueryResult = Apollo.QueryResult<GetServiceInstanceMappingQuery, GetServiceInstanceMappingQueryVariables>;
export const ServiceReleasesDocument = gql`
    query ServiceReleases {
  serviceReleases {
    ...ListServiceRelease
  }
}
    ${ListServiceReleaseFragmentDoc}`;

/**
 * __useServiceReleasesQuery__
 *
 * To run a query within a React component, call `useServiceReleasesQuery` and pass it any options that fit your needs.
 * When your component renders, `useServiceReleasesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useServiceReleasesQuery({
 *   variables: {
 *   },
 * });
 */
export function useServiceReleasesQuery(baseOptions?: Apollo.QueryHookOptions<ServiceReleasesQuery, ServiceReleasesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ServiceReleasesQuery, ServiceReleasesQueryVariables>(ServiceReleasesDocument, options);
      }
export function useServiceReleasesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ServiceReleasesQuery, ServiceReleasesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ServiceReleasesQuery, ServiceReleasesQueryVariables>(ServiceReleasesDocument, options);
        }
// @ts-ignore
export function useServiceReleasesSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<ServiceReleasesQuery, ServiceReleasesQueryVariables>): Apollo.UseSuspenseQueryResult<ServiceReleasesQuery, ServiceReleasesQueryVariables>;
export function useServiceReleasesSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<ServiceReleasesQuery, ServiceReleasesQueryVariables>): Apollo.UseSuspenseQueryResult<ServiceReleasesQuery | undefined, ServiceReleasesQueryVariables>;
export function useServiceReleasesSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<ServiceReleasesQuery, ServiceReleasesQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ServiceReleasesQuery, ServiceReleasesQueryVariables>(ServiceReleasesDocument, options);
        }
export type ServiceReleasesQueryHookResult = ReturnType<typeof useServiceReleasesQuery>;
export type ServiceReleasesLazyQueryHookResult = ReturnType<typeof useServiceReleasesLazyQuery>;
export type ServiceReleasesSuspenseQueryHookResult = ReturnType<typeof useServiceReleasesSuspenseQuery>;
export type ServiceReleasesQueryResult = Apollo.QueryResult<ServiceReleasesQuery, ServiceReleasesQueryVariables>;
export const DetailServiceReleaseDocument = gql`
    query DetailServiceRelease($id: ID!) {
  serviceRelease(id: $id) {
    ...ServiceRelease
  }
}
    ${ServiceReleaseFragmentDoc}`;

/**
 * __useDetailServiceReleaseQuery__
 *
 * To run a query within a React component, call `useDetailServiceReleaseQuery` and pass it any options that fit your needs.
 * When your component renders, `useDetailServiceReleaseQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useDetailServiceReleaseQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDetailServiceReleaseQuery(baseOptions: Apollo.QueryHookOptions<DetailServiceReleaseQuery, DetailServiceReleaseQueryVariables> & ({ variables: DetailServiceReleaseQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<DetailServiceReleaseQuery, DetailServiceReleaseQueryVariables>(DetailServiceReleaseDocument, options);
      }
export function useDetailServiceReleaseLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<DetailServiceReleaseQuery, DetailServiceReleaseQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<DetailServiceReleaseQuery, DetailServiceReleaseQueryVariables>(DetailServiceReleaseDocument, options);
        }
// @ts-ignore
export function useDetailServiceReleaseSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<DetailServiceReleaseQuery, DetailServiceReleaseQueryVariables>): Apollo.UseSuspenseQueryResult<DetailServiceReleaseQuery, DetailServiceReleaseQueryVariables>;
export function useDetailServiceReleaseSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<DetailServiceReleaseQuery, DetailServiceReleaseQueryVariables>): Apollo.UseSuspenseQueryResult<DetailServiceReleaseQuery | undefined, DetailServiceReleaseQueryVariables>;
export function useDetailServiceReleaseSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<DetailServiceReleaseQuery, DetailServiceReleaseQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<DetailServiceReleaseQuery, DetailServiceReleaseQueryVariables>(DetailServiceReleaseDocument, options);
        }
export type DetailServiceReleaseQueryHookResult = ReturnType<typeof useDetailServiceReleaseQuery>;
export type DetailServiceReleaseLazyQueryHookResult = ReturnType<typeof useDetailServiceReleaseLazyQuery>;
export type DetailServiceReleaseSuspenseQueryHookResult = ReturnType<typeof useDetailServiceReleaseSuspenseQuery>;
export type DetailServiceReleaseQueryResult = Apollo.QueryResult<DetailServiceReleaseQuery, DetailServiceReleaseQueryVariables>;
export const ListServicesDocument = gql`
    query ListServices($pagination: OffsetPaginationInput, $filters: ServiceFilter) {
  services(pagination: $pagination, filters: $filters) {
    ...ListService
  }
}
    ${ListServiceFragmentDoc}`;

/**
 * __useListServicesQuery__
 *
 * To run a query within a React component, call `useListServicesQuery` and pass it any options that fit your needs.
 * When your component renders, `useListServicesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useListServicesQuery({
 *   variables: {
 *      pagination: // value for 'pagination'
 *      filters: // value for 'filters'
 *   },
 * });
 */
export function useListServicesQuery(baseOptions?: Apollo.QueryHookOptions<ListServicesQuery, ListServicesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ListServicesQuery, ListServicesQueryVariables>(ListServicesDocument, options);
      }
export function useListServicesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ListServicesQuery, ListServicesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ListServicesQuery, ListServicesQueryVariables>(ListServicesDocument, options);
        }
// @ts-ignore
export function useListServicesSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<ListServicesQuery, ListServicesQueryVariables>): Apollo.UseSuspenseQueryResult<ListServicesQuery, ListServicesQueryVariables>;
export function useListServicesSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<ListServicesQuery, ListServicesQueryVariables>): Apollo.UseSuspenseQueryResult<ListServicesQuery | undefined, ListServicesQueryVariables>;
export function useListServicesSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<ListServicesQuery, ListServicesQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ListServicesQuery, ListServicesQueryVariables>(ListServicesDocument, options);
        }
export type ListServicesQueryHookResult = ReturnType<typeof useListServicesQuery>;
export type ListServicesLazyQueryHookResult = ReturnType<typeof useListServicesLazyQuery>;
export type ListServicesSuspenseQueryHookResult = ReturnType<typeof useListServicesSuspenseQuery>;
export type ListServicesQueryResult = Apollo.QueryResult<ListServicesQuery, ListServicesQueryVariables>;
export const GetServiceDocument = gql`
    query GetService($id: ID!) {
  service(id: $id) {
    ...Service
  }
}
    ${ServiceFragmentDoc}`;

/**
 * __useGetServiceQuery__
 *
 * To run a query within a React component, call `useGetServiceQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetServiceQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetServiceQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetServiceQuery(baseOptions: Apollo.QueryHookOptions<GetServiceQuery, GetServiceQueryVariables> & ({ variables: GetServiceQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetServiceQuery, GetServiceQueryVariables>(GetServiceDocument, options);
      }
export function useGetServiceLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetServiceQuery, GetServiceQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetServiceQuery, GetServiceQueryVariables>(GetServiceDocument, options);
        }
// @ts-ignore
export function useGetServiceSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetServiceQuery, GetServiceQueryVariables>): Apollo.UseSuspenseQueryResult<GetServiceQuery, GetServiceQueryVariables>;
export function useGetServiceSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetServiceQuery, GetServiceQueryVariables>): Apollo.UseSuspenseQueryResult<GetServiceQuery | undefined, GetServiceQueryVariables>;
export function useGetServiceSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetServiceQuery, GetServiceQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetServiceQuery, GetServiceQueryVariables>(GetServiceDocument, options);
        }
export type GetServiceQueryHookResult = ReturnType<typeof useGetServiceQuery>;
export type GetServiceLazyQueryHookResult = ReturnType<typeof useGetServiceLazyQuery>;
export type GetServiceSuspenseQueryHookResult = ReturnType<typeof useGetServiceSuspenseQuery>;
export type GetServiceQueryResult = Apollo.QueryResult<GetServiceQuery, GetServiceQueryVariables>;
export const GetSocialAccountDocument = gql`
    query GetSocialAccount($id: ID!) {
  socialAccount(id: $id) {
    ...DetailSocialAccount
  }
}
    ${DetailSocialAccountFragmentDoc}`;

/**
 * __useGetSocialAccountQuery__
 *
 * To run a query within a React component, call `useGetSocialAccountQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetSocialAccountQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetSocialAccountQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetSocialAccountQuery(baseOptions: Apollo.QueryHookOptions<GetSocialAccountQuery, GetSocialAccountQueryVariables> & ({ variables: GetSocialAccountQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetSocialAccountQuery, GetSocialAccountQueryVariables>(GetSocialAccountDocument, options);
      }
export function useGetSocialAccountLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetSocialAccountQuery, GetSocialAccountQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetSocialAccountQuery, GetSocialAccountQueryVariables>(GetSocialAccountDocument, options);
        }
// @ts-ignore
export function useGetSocialAccountSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetSocialAccountQuery, GetSocialAccountQueryVariables>): Apollo.UseSuspenseQueryResult<GetSocialAccountQuery, GetSocialAccountQueryVariables>;
export function useGetSocialAccountSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetSocialAccountQuery, GetSocialAccountQueryVariables>): Apollo.UseSuspenseQueryResult<GetSocialAccountQuery | undefined, GetSocialAccountQueryVariables>;
export function useGetSocialAccountSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetSocialAccountQuery, GetSocialAccountQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetSocialAccountQuery, GetSocialAccountQueryVariables>(GetSocialAccountDocument, options);
        }
export type GetSocialAccountQueryHookResult = ReturnType<typeof useGetSocialAccountQuery>;
export type GetSocialAccountLazyQueryHookResult = ReturnType<typeof useGetSocialAccountLazyQuery>;
export type GetSocialAccountSuspenseQueryHookResult = ReturnType<typeof useGetSocialAccountSuspenseQuery>;
export type GetSocialAccountQueryResult = Apollo.QueryResult<GetSocialAccountQuery, GetSocialAccountQueryVariables>;
export const ListUsedAliasesDocument = gql`
    query ListUsedAliases($pagination: OffsetPaginationInput, $filters: ManagementDeviceFilter) {
  usedAliases(pagination: $pagination, filters: $filters) {
    ...ListUsedAlias
  }
}
    ${ListUsedAliasFragmentDoc}`;

/**
 * __useListUsedAliasesQuery__
 *
 * To run a query within a React component, call `useListUsedAliasesQuery` and pass it any options that fit your needs.
 * When your component renders, `useListUsedAliasesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useListUsedAliasesQuery({
 *   variables: {
 *      pagination: // value for 'pagination'
 *      filters: // value for 'filters'
 *   },
 * });
 */
export function useListUsedAliasesQuery(baseOptions?: Apollo.QueryHookOptions<ListUsedAliasesQuery, ListUsedAliasesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ListUsedAliasesQuery, ListUsedAliasesQueryVariables>(ListUsedAliasesDocument, options);
      }
export function useListUsedAliasesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ListUsedAliasesQuery, ListUsedAliasesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ListUsedAliasesQuery, ListUsedAliasesQueryVariables>(ListUsedAliasesDocument, options);
        }
// @ts-ignore
export function useListUsedAliasesSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<ListUsedAliasesQuery, ListUsedAliasesQueryVariables>): Apollo.UseSuspenseQueryResult<ListUsedAliasesQuery, ListUsedAliasesQueryVariables>;
export function useListUsedAliasesSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<ListUsedAliasesQuery, ListUsedAliasesQueryVariables>): Apollo.UseSuspenseQueryResult<ListUsedAliasesQuery | undefined, ListUsedAliasesQueryVariables>;
export function useListUsedAliasesSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<ListUsedAliasesQuery, ListUsedAliasesQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ListUsedAliasesQuery, ListUsedAliasesQueryVariables>(ListUsedAliasesDocument, options);
        }
export type ListUsedAliasesQueryHookResult = ReturnType<typeof useListUsedAliasesQuery>;
export type ListUsedAliasesLazyQueryHookResult = ReturnType<typeof useListUsedAliasesLazyQuery>;
export type ListUsedAliasesSuspenseQueryHookResult = ReturnType<typeof useListUsedAliasesSuspenseQuery>;
export type ListUsedAliasesQueryResult = Apollo.QueryResult<ListUsedAliasesQuery, ListUsedAliasesQueryVariables>;
export const GetUsedAliasDocument = gql`
    query GetUsedAlias($id: ID!) {
  usedAlias(id: $id) {
    ...DetailUsedAlias
  }
}
    ${DetailUsedAliasFragmentDoc}`;

/**
 * __useGetUsedAliasQuery__
 *
 * To run a query within a React component, call `useGetUsedAliasQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUsedAliasQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUsedAliasQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetUsedAliasQuery(baseOptions: Apollo.QueryHookOptions<GetUsedAliasQuery, GetUsedAliasQueryVariables> & ({ variables: GetUsedAliasQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUsedAliasQuery, GetUsedAliasQueryVariables>(GetUsedAliasDocument, options);
      }
export function useGetUsedAliasLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUsedAliasQuery, GetUsedAliasQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUsedAliasQuery, GetUsedAliasQueryVariables>(GetUsedAliasDocument, options);
        }
// @ts-ignore
export function useGetUsedAliasSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetUsedAliasQuery, GetUsedAliasQueryVariables>): Apollo.UseSuspenseQueryResult<GetUsedAliasQuery, GetUsedAliasQueryVariables>;
export function useGetUsedAliasSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetUsedAliasQuery, GetUsedAliasQueryVariables>): Apollo.UseSuspenseQueryResult<GetUsedAliasQuery | undefined, GetUsedAliasQueryVariables>;
export function useGetUsedAliasSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetUsedAliasQuery, GetUsedAliasQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetUsedAliasQuery, GetUsedAliasQueryVariables>(GetUsedAliasDocument, options);
        }
export type GetUsedAliasQueryHookResult = ReturnType<typeof useGetUsedAliasQuery>;
export type GetUsedAliasLazyQueryHookResult = ReturnType<typeof useGetUsedAliasLazyQuery>;
export type GetUsedAliasSuspenseQueryHookResult = ReturnType<typeof useGetUsedAliasSuspenseQuery>;
export type GetUsedAliasQueryResult = Apollo.QueryResult<GetUsedAliasQuery, GetUsedAliasQueryVariables>;