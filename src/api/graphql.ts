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
  /** The Service identifier is a unique identifier for a service. It is used to identify the service in the database and in the code. We encourage you to use the reverse domain name notation. E.g. `com.example.myservice` */
  ServiceIdentifier: { input: any; output: any; }
  /** The `Version` represents a semver version string */
  Version: { input: any; output: any; }
  _Any: { input: any; output: any; }
};

export type AcceptDeviceCodeInput = {
  deviceCode: Scalars['ID']['input'];
  organization: Scalars['ID']['input'];
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

export type CreateInviteInput = {
  expiresInDays?: InputMaybe<Scalars['Int']['input']>;
  organization?: InputMaybe<Scalars['ID']['input']>;
  roles?: InputMaybe<Array<Scalars['String']['input']>>;
};

export type CreateOrganizationInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
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

export type DeleteDeviceGroupInput = {
  id: Scalars['ID']['input'];
};

/** ComputeNode(id, node_id, name, organization) */
export type DeviceFilter = {
  AND?: InputMaybe<DeviceFilter>;
  DISTINCT?: InputMaybe<Scalars['Boolean']['input']>;
  NOT?: InputMaybe<DeviceFilter>;
  OR?: InputMaybe<DeviceFilter>;
  ids?: InputMaybe<Array<Scalars['ID']['input']>>;
  search?: InputMaybe<Scalars['String']['input']>;
};

/** DeviceGroup(id, name, organization) */
export type DeviceGroupFilter = {
  AND?: InputMaybe<DeviceGroupFilter>;
  DISTINCT?: InputMaybe<Scalars['Boolean']['input']>;
  NOT?: InputMaybe<DeviceGroupFilter>;
  OR?: InputMaybe<DeviceGroupFilter>;
  ids?: InputMaybe<Array<Scalars['ID']['input']>>;
  search?: InputMaybe<Scalars['String']['input']>;
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

/** Layer(id, name, identifier, logo, description, dns_probe, get_probe, kind) */
export type LayerFilter = {
  AND?: InputMaybe<LayerFilter>;
  DISTINCT?: InputMaybe<Scalars['Boolean']['input']>;
  NOT?: InputMaybe<LayerFilter>;
  OR?: InputMaybe<LayerFilter>;
  ids?: InputMaybe<Array<Scalars['ID']['input']>>;
  search?: InputMaybe<Scalars['String']['input']>;
};

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
  /** The logo of the release. This should be a url to a logo that can be used to represent the release. */
  logo?: Maybe<ManagementMediaStore>;
  /** The mappings of the client. A mapping is a mapping of a service to a service instance. This is used to configure the composition. */
  mappings: Array<ManagementServiceInstanceMapping>;
  /** The name of the client. This is a human readable name of the client. */
  name: Scalars['String']['output'];
  /** Is this client public? If a client is public  */
  public: Scalars['Boolean']['output'];
  /** The public sources of the client. These are the public sources where users can find more information about the client. */
  publicSources: Array<ManagementPublicSource>;
  /** The release that this client belongs to. */
  release: ManagementRelease;
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
export type ManagementClientUsedAliasesArgs = {
  filters?: InputMaybe<DeviceFilter>;
  pagination?: InputMaybe<OffsetPaginationInput>;
};

/** Client(id, functional, name, release, oauth2_client, kind, user, organization, redirect_uris, public, token, node, public_sources, tenant, created_at, requirements_hash, logo) */
export type ManagementClientFilter = {
  AND?: InputMaybe<ManagementClientFilter>;
  DISTINCT?: InputMaybe<Scalars['Boolean']['input']>;
  NOT?: InputMaybe<ManagementClientFilter>;
  OR?: InputMaybe<ManagementClientFilter>;
  functional?: InputMaybe<Scalars['Boolean']['input']>;
  ids?: InputMaybe<Array<Scalars['ID']['input']>>;
  search?: InputMaybe<Scalars['String']['input']>;
};

export type ManagementClientOrder = {
  createdAt?: InputMaybe<Ordering>;
  name?: InputMaybe<Ordering>;
  updatedAt?: InputMaybe<Ordering>;
};

/** An Organization is a group of users that can work together on a project. */
export type ManagementComChannel = {
  __typename?: 'ManagementComChannel';
  id: Scalars['ID']['output'];
  user: ManagementUser;
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
};


/** ComputeNode(id, node_id, name, organization) */
export type ManagementDeviceClientsArgs = {
  filters?: InputMaybe<ManagementClientFilter>;
  order?: InputMaybe<ManagementClientOrder>;
  pagination?: InputMaybe<OffsetPaginationInput>;
};


/** ComputeNode(id, node_id, name, organization) */
export type ManagementDeviceDeviceGroupsArgs = {
  filters?: InputMaybe<DeviceGroupFilter>;
  pagination?: InputMaybe<OffsetPaginationInput>;
};

/** An Organization is a group of users that can work together on a project. */
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
  /** Check if the device code is still valid */
  stagingManifest?: Maybe<ManagementStagingManifest>;
  user?: Maybe<ManagementUser>;
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
 *
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
  /** The challenge of the alias. This is used to verify that the alias is reachable. If set, the alias will be accessed via the challenge URL (e.g. 'example.com/.well-known/challenge'). If not set, the alias will be accessed via the instance's URL. */
  challenge: Scalars['String']['output'];
  /** The host of the alias, if its a ABSOLUTE alias (e.g. 'example.com'). If not set, the alias is relative to the layer's domain. */
  host?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  /** The instance that this alias belongs to. */
  instance: ManagementServiceInstance;
  /** The name of the alias. This is a human readable name of the alias. */
  kind: Scalars['String']['output'];
  /** The layer that this alias belongs to. */
  layer?: Maybe<ManagementLayer>;
  /** The path of the alias, if its a ABSOLUTE alias (e.g. 'example.com/path'). If not set, the alias is relative to the layer's path. */
  path?: Maybe<Scalars['String']['output']>;
  /** The port of the alias, if its a ABSOLUTE alias (e.g. 'example.com:8080'). If not set, the alias is relative to the layer's port. */
  port?: Maybe<Scalars['Int']['output']>;
  /** Is this alias using SSL? If true, the alias will be accessed via https:// instead of http://. This is used to indicate that the alias is secure and should be accessed via SSL */
  ssl: Scalars['Boolean']['output'];
  /** The usages of this alias by clients. */
  usages: Array<ManagementUsedAlias>;
};


/** An alias for a service instance. This is used to provide a more user-friendly name for the instance. */
export type ManagementInstanceAliasUsagesArgs = {
  filters?: InputMaybe<DeviceFilter>;
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
export type ManagementInviteRolesArgs = {
  filters?: InputMaybe<RoleFilter>;
  pagination?: InputMaybe<OffsetPaginationInput>;
};

/** A Service is a Webservice that a Client might want to access. It is not the configured instance of the service, but the service itself. */
export type ManagementLayer = {
  __typename?: 'ManagementLayer';
  /** The description of the service. This should be a human readable description of the service. */
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  /** The identifier of the service. This should be a globally unique string that identifies the service. We encourage you to use the reverse domain name notation. E.g. `com.example.myservice` */
  identifier: Scalars['ServiceIdentifier']['output'];
  /** The instances of the service. A service instance is a configured instance of a service. It will be configured by a configuration backend and will be used to send to the client as a configuration. It should never contain sensitive information. */
  instances: Array<ManagementServiceInstance>;
  /** The logo of the service. This should be a url to a logo that can be used to represent the service. */
  logo?: Maybe<ManagementMediaStore>;
  /** The name of the layer */
  name: Scalars['String']['output'];
};


/** A Service is a Webservice that a Client might want to access. It is not the configured instance of the service, but the service itself. */
export type ManagementLayerInstancesArgs = {
  filters?: InputMaybe<ServiceInstanceFilter>;
  pagination?: InputMaybe<OffsetPaginationInput>;
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
  filters?: InputMaybe<RoleFilter>;
  pagination?: InputMaybe<OffsetPaginationInput>;
};

/** An Organization is a group of users that can work together on a project. */
export type ManagementOrganization = {
  __typename?: 'ManagementOrganization';
  /** The users that are currently active in the organization */
  activeUsers: Array<ManagementUser>;
  /** The logo of the organization */
  avatar?: Maybe<ManagementMediaStore>;
  /** A short description of the organization */
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  /** the invites for this organization */
  invites: Array<ManagementInvite>;
  /** the memberships of people */
  memberships: Array<ManagementMembership>;
  /** The name of this organization */
  name: Scalars['String']['output'];
  profile: ManagementOrganizationProfile;
  /** The roles that are available in the organization */
  roles: Array<ManagementRole>;
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
export type ManagementOrganizationInvitesArgs = {
  filters?: InputMaybe<OrganizationFilter>;
  pagination?: InputMaybe<OffsetPaginationInput>;
};


/** An Organization is a group of users that can work together on a project. */
export type ManagementOrganizationMembershipsArgs = {
  filters?: InputMaybe<MembershipFilter>;
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
  /** The avatar of the user */
  avatar?: Maybe<ManagementMediaStore>;
  /** A short bio of the user */
  bio?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  /** The name of the user */
  name?: Maybe<Scalars['String']['output']>;
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
  description: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  identifier: Scalars['String']['output'];
  organization: ManagementOrganization;
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

/** An Organization is a group of users that can work together on a project. */
export type ManagementServiceDeviceCode = {
  __typename?: 'ManagementServiceDeviceCode';
  code: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  denied: Scalars['Boolean']['output'];
  expiresAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  instance?: Maybe<ManagementServiceInstance>;
  /** The instance that this device code is for. */
  stagingAliases?: Maybe<Array<StagingAlias>>;
  stagingKind: Scalars['String']['output'];
  /** Check if the device code is still valid */
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
  filters?: InputMaybe<ServiceInstanceFilter>;
  pagination?: InputMaybe<OffsetPaginationInput>;
};

export type ManagementStagingManifest = {
  __typename?: 'ManagementStagingManifest';
  description?: Maybe<Scalars['String']['output']>;
  identifier: Scalars['String']['output'];
  logo?: Maybe<Scalars['String']['output']>;
  nodeId: Scalars['ID']['output'];
  publicSources: Array<ManagementStagingPublicSource>;
  repoUrl?: Maybe<Scalars['String']['output']>;
  requirements: Array<ManagementStagingRequirement>;
  scopes: Array<Scalars['String']['output']>;
  url?: Maybe<Scalars['String']['output']>;
  version: Scalars['String']['output'];
};

export type ManagementStagingPublicSource = {
  __typename?: 'ManagementStagingPublicSource';
  description: Scalars['String']['output'];
  identifier: Scalars['String']['output'];
  key: Scalars['String']['output'];
};

export type ManagementStagingRequirement = {
  __typename?: 'ManagementStagingRequirement';
  description: Scalars['String']['output'];
  identifier: Scalars['String']['output'];
  key: Scalars['String']['output'];
};

export type ManagementStagingServiceManifest = {
  __typename?: 'ManagementStagingServiceManifest';
  description?: Maybe<Scalars['String']['output']>;
  identifier: Scalars['String']['output'];
  instanceId: Scalars['String']['output'];
  logo?: Maybe<Scalars['String']['output']>;
  nodeId: Scalars['ID']['output'];
  publicSources: Array<ManagementStagingPublicSource>;
  roles: Array<StagingRole>;
  scopes: Array<StagingScope>;
  url?: Maybe<Scalars['String']['output']>;
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
  filters?: InputMaybe<MembershipFilter>;
  pagination?: InputMaybe<OffsetPaginationInput>;
};

/** __doc__ */
export type MembershipFilter = {
  AND?: InputMaybe<MembershipFilter>;
  DISTINCT?: InputMaybe<Scalars['Boolean']['input']>;
  NOT?: InputMaybe<MembershipFilter>;
  OR?: InputMaybe<MembershipFilter>;
  ids?: InputMaybe<Array<Scalars['ID']['input']>>;
  name?: InputMaybe<StrFilterLookup>;
  search?: InputMaybe<Scalars['String']['input']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  acceptDeviceCode: ManagementClient;
  acceptInvite: ManagementMembership;
  acceptServiceDeviceCode: ManagementServiceInstance;
  addDeviceToGroup: ManagementDevice;
  cancelInvite: ManagementInvite;
  changeOrganizationOwner: ManagementOrganization;
  createAlias: ManagementInstanceAlias;
  createDeviceGroup: ManagementDeviceGroup;
  createInvite: ManagementInvite;
  createOrganization: ManagementOrganization;
  declineDeviceCode: ManagementDeviceCode;
  /** Decline an invite to join an organization. */
  declineInvite: ManagementInvite;
  declineServiceDeviceCode: ManagementServiceDeviceCode;
  deleteAlias: Scalars['ID']['output'];
  deleteDeviceGroup: Scalars['ID']['output'];
  updateAlias: ManagementInstanceAlias;
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


export type MutationCreateDeviceGroupArgs = {
  input: CreateDeviceGroupInput;
};


export type MutationCreateInviteArgs = {
  input: CreateInviteInput;
};


export type MutationCreateOrganizationArgs = {
  input: CreateOrganizationInput;
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


export type MutationDeleteDeviceGroupArgs = {
  input: DeleteDeviceGroupInput;
};


export type MutationUpdateAliasArgs = {
  input: UpdateAliasInput;
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

export type Query = {
  __typename?: 'Query';
  _service: _Service;
  app: ManagementApp;
  apps: Array<ManagementApp>;
  client: ManagementClient;
  clients: Array<ManagementClient>;
  device: ManagementDevice;
  deviceCode: ManagementDeviceCode;
  deviceCodeByCode: ManagementDeviceCode;
  deviceGroup: ManagementDeviceGroup;
  deviceGroups: Array<ManagementDeviceGroup>;
  devices: Array<ManagementDevice>;
  friends: Array<ManagementUser>;
  instanceAlias: ManagementInstanceAlias;
  instanceAliases: Array<ManagementInstanceAlias>;
  inviteByCode: ManagementInvite;
  layer: ManagementLayer;
  layers: Array<ManagementLayer>;
  me: ManagementUser;
  organization: ManagementOrganization;
  organizations: Array<ManagementOrganization>;
  redeemTokens: Array<ManagementRedeemToken>;
  release: ManagementRelease;
  releases: Array<ManagementRelease>;
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
  filters?: InputMaybe<DeviceGroupFilter>;
  pagination?: InputMaybe<OffsetPaginationInput>;
};


export type QueryDevicesArgs = {
  filters?: InputMaybe<DeviceFilter>;
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


export type QueryInviteByCodeArgs = {
  inviteCode: Scalars['String']['input'];
};


export type QueryLayerArgs = {
  id: Scalars['ID']['input'];
};


export type QueryLayersArgs = {
  filters?: InputMaybe<LayerFilter>;
  pagination?: InputMaybe<OffsetPaginationInput>;
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
  filters?: InputMaybe<ServiceInstanceFilter>;
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


export type QueryUsedAliasArgs = {
  id: Scalars['ID']['input'];
};


export type QueryUsedAliasesArgs = {
  filters?: InputMaybe<DeviceFilter>;
  pagination?: InputMaybe<OffsetPaginationInput>;
};


export type QueryValidateDeviceCodeArgs = {
  deviceCode: Scalars['ID']['input'];
  organization: Scalars['ID']['input'];
};

/** __doc__ */
export type RoleFilter = {
  AND?: InputMaybe<RoleFilter>;
  DISTINCT?: InputMaybe<Scalars['Boolean']['input']>;
  NOT?: InputMaybe<RoleFilter>;
  OR?: InputMaybe<RoleFilter>;
  ids?: InputMaybe<Array<Scalars['ID']['input']>>;
  name?: InputMaybe<StrFilterLookup>;
  search?: InputMaybe<Scalars['String']['input']>;
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

/** ServiceInstance(id, release, logo, instance_id, steward, organization, device, template, public_key, token) */
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

export type InstanceAliasFragment = { __typename?: 'ManagementInstanceAlias', id: string, host?: string | null, port?: number | null, ssl: boolean, path?: string | null, challenge: string, kind: string, layer?: { __typename?: 'ManagementLayer', id: string, name: string } | null, instance: { __typename?: 'ManagementServiceInstance', id: string } };

export type ListInstanceAliasFragment = { __typename?: 'ManagementInstanceAlias', id: string, host?: string | null, port?: number | null, ssl: boolean, path?: string | null, challenge: string, kind: string, layer?: { __typename?: 'ManagementLayer', id: string, name: string } | null, instance: { __typename?: 'ManagementServiceInstance', id: string, identifier: string, release: { __typename?: 'ManagementServiceRelease', version: string, service: { __typename?: 'ManagementService', id: string, identifier: any } } } };

export type DetailAppFragment = { __typename?: 'ManagementApp', id: string, identifier: any, logo?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null, releases: Array<{ __typename?: 'ManagementRelease', id: string, version: any, logo?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null, app: { __typename?: 'ManagementApp', id: string, identifier: any, logo?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null } }> };

export type ListAppFragment = { __typename?: 'ManagementApp', id: string, identifier: any, logo?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null };

export type DetailClientFragment = { __typename?: 'ManagementClient', id: string, token: string, name: string, functional: boolean, kind: string, issueUrl?: string | null, user?: { __typename?: 'ManagementUser', id: string, username: string } | null, release: { __typename?: 'ManagementRelease', id: string, version: any, logo?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null, app: { __typename?: 'ManagementApp', id: string, identifier: any, logo?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null } }, logo?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null, mappings: Array<{ __typename?: 'ManagementServiceInstanceMapping', id: string, key: string, optional: boolean, instance: { __typename?: 'ManagementServiceInstance', id: string, identifier: string, release: { __typename?: 'ManagementServiceRelease', id: string, version: string, service: { __typename?: 'ManagementService', id: string, identifier: any, logo?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null } }, allowedUsers: Array<{ __typename?: 'ManagementUser', username: string, firstName?: string | null, lastName?: string | null, email?: string | null, avatar?: string | null, id: string, profile: { __typename?: 'ManagementProfile', id: string, name?: string | null, bio?: string | null, avatar?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null } }>, deniedUsers: Array<{ __typename?: 'ManagementUser', username: string, firstName?: string | null, lastName?: string | null, email?: string | null, avatar?: string | null, id: string, profile: { __typename?: 'ManagementProfile', id: string, name?: string | null, bio?: string | null, avatar?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null } }> }, client: { __typename?: 'ManagementClient', id: string, name: string, kind: string, user?: { __typename?: 'ManagementUser', id: string, username: string } | null, logo?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null, device?: { __typename?: 'ManagementDevice', id: string, name?: string | null } | null, release: { __typename?: 'ManagementRelease', version: any, logo?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null, app: { __typename?: 'ManagementApp', id: string, identifier: any, logo?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null } } } }>, usedAliases: Array<{ __typename?: 'ManagementUsedAlias', id: string, key: string, valid: boolean, reason?: string | null, alias?: { __typename?: 'ManagementInstanceAlias', id: string, host?: string | null, port?: number | null, ssl: boolean, path?: string | null, challenge: string, kind: string, layer?: { __typename?: 'ManagementLayer', id: string, name: string } | null, instance: { __typename?: 'ManagementServiceInstance', id: string, identifier: string, release: { __typename?: 'ManagementServiceRelease', version: string, service: { __typename?: 'ManagementService', id: string, identifier: any } } } } | null }>, device?: { __typename?: 'ManagementDevice', id: string, name?: string | null } | null, publicSources: Array<{ __typename?: 'ManagementPublicSource', kind: string, url: string }> };

export type ListClientFragment = { __typename?: 'ManagementClient', id: string, name: string, kind: string, user?: { __typename?: 'ManagementUser', id: string, username: string } | null, logo?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null, device?: { __typename?: 'ManagementDevice', id: string, name?: string | null } | null, release: { __typename?: 'ManagementRelease', version: any, logo?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null, app: { __typename?: 'ManagementApp', id: string, identifier: any, logo?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null } } };

export type DeviceFragment = { __typename?: 'ManagementDevice', id: string, name?: string | null, nodeId: string, clients: Array<{ __typename?: 'ManagementClient', id: string, name: string, kind: string, user?: { __typename?: 'ManagementUser', id: string, username: string } | null, logo?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null, device?: { __typename?: 'ManagementDevice', id: string, name?: string | null } | null, release: { __typename?: 'ManagementRelease', version: any, logo?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null, app: { __typename?: 'ManagementApp', id: string, identifier: any, logo?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null } } }>, deviceGroups: Array<{ __typename?: 'ManagementDeviceGroup', id: string, name: string }> };

export type DetailDeviceFragment = { __typename?: 'ManagementDevice', id: string, name?: string | null, nodeId: string, clients: Array<{ __typename?: 'ManagementClient', id: string, token: string, name: string, functional: boolean, kind: string, issueUrl?: string | null, user?: { __typename?: 'ManagementUser', id: string, username: string } | null, release: { __typename?: 'ManagementRelease', id: string, version: any, logo?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null, app: { __typename?: 'ManagementApp', id: string, identifier: any, logo?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null } }, logo?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null, mappings: Array<{ __typename?: 'ManagementServiceInstanceMapping', id: string, key: string, optional: boolean, instance: { __typename?: 'ManagementServiceInstance', id: string, identifier: string, release: { __typename?: 'ManagementServiceRelease', id: string, version: string, service: { __typename?: 'ManagementService', id: string, identifier: any, logo?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null } }, allowedUsers: Array<{ __typename?: 'ManagementUser', username: string, firstName?: string | null, lastName?: string | null, email?: string | null, avatar?: string | null, id: string, profile: { __typename?: 'ManagementProfile', id: string, name?: string | null, bio?: string | null, avatar?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null } }>, deniedUsers: Array<{ __typename?: 'ManagementUser', username: string, firstName?: string | null, lastName?: string | null, email?: string | null, avatar?: string | null, id: string, profile: { __typename?: 'ManagementProfile', id: string, name?: string | null, bio?: string | null, avatar?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null } }> }, client: { __typename?: 'ManagementClient', id: string, name: string, kind: string, user?: { __typename?: 'ManagementUser', id: string, username: string } | null, logo?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null, device?: { __typename?: 'ManagementDevice', id: string, name?: string | null } | null, release: { __typename?: 'ManagementRelease', version: any, logo?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null, app: { __typename?: 'ManagementApp', id: string, identifier: any, logo?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null } } } }>, usedAliases: Array<{ __typename?: 'ManagementUsedAlias', id: string, key: string, valid: boolean, reason?: string | null, alias?: { __typename?: 'ManagementInstanceAlias', id: string, host?: string | null, port?: number | null, ssl: boolean, path?: string | null, challenge: string, kind: string, layer?: { __typename?: 'ManagementLayer', id: string, name: string } | null, instance: { __typename?: 'ManagementServiceInstance', id: string, identifier: string, release: { __typename?: 'ManagementServiceRelease', version: string, service: { __typename?: 'ManagementService', id: string, identifier: any } } } } | null }>, device?: { __typename?: 'ManagementDevice', id: string, name?: string | null } | null, publicSources: Array<{ __typename?: 'ManagementPublicSource', kind: string, url: string }> }>, deviceGroups: Array<{ __typename?: 'ManagementDeviceGroup', id: string, name: string }> };

export type ListDeviceFragment = { __typename?: 'ManagementDevice', id: string, name?: string | null, nodeId: string };

export type DeviceCodeFragment = { __typename?: 'ManagementDeviceCode', id: string, code: string, stagingKind: string, stagingManifest?: { __typename?: 'ManagementStagingManifest', identifier: string, version: string, logo?: string | null, description?: string | null, url?: string | null } | null, client?: { __typename?: 'ManagementClient', id: string, kind: string, name: string, release: { __typename?: 'ManagementRelease', version: any, scopes: Array<string>, app: { __typename?: 'ManagementApp', identifier: any } } } | null };

export type DetailDeviceGroupFragment = { __typename?: 'ManagementDeviceGroup', id: string, name: string, devices: Array<{ __typename?: 'ManagementDevice', id: string, name?: string | null, nodeId: string }> };

export type ListDeviceGroupFragment = { __typename?: 'ManagementDeviceGroup', id: string, name: string };

export type ListInviteFragment = { __typename?: 'ManagementInvite', id: string, token: string, status: string, createdAt: any, expiresAt?: any | null, createdBy: { __typename?: 'ManagementUser', id: string, username: string }, createdFor: { __typename?: 'ManagementOrganization', id: string, name: string, slug: string, avatar?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null } };

export type InviteFragment = { __typename?: 'ManagementInvite', id: string, token: string, status: string, createdAt: any, expiresAt?: any | null, createdBy: { __typename?: 'ManagementUser', id: string, username: string, profile: { __typename?: 'ManagementProfile', id: string, avatar?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null } }, createdFor: { __typename?: 'ManagementOrganization', id: string, name: string, slug: string, roles: Array<{ __typename?: 'ManagementRole', id: string, identifier: string, description: string }>, avatar?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null, memberships: Array<{ __typename?: 'ManagementMembership', id: string, roles: Array<{ __typename?: 'ManagementRole', identifier: string }>, user: { __typename?: 'ManagementUser', id: string, username: string, profile: { __typename?: 'ManagementProfile', id: string, avatar?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null } } }>, invites: Array<{ __typename?: 'ManagementInvite', status: string, expiresAt?: any | null, token: string, inviteUrl: string, acceptedBy?: { __typename?: 'ManagementUser', id: string, username: string, profile: { __typename?: 'ManagementProfile', id: string, avatar?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null } } | null }> }, acceptedBy?: { __typename?: 'ManagementUser', id: string, username: string, profile: { __typename?: 'ManagementProfile', id: string, avatar?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null } } | null };

export type LayerFragment = { __typename?: 'ManagementLayer', id: string, name: string, description?: string | null, logo?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null, instances: Array<{ __typename?: 'ManagementServiceInstance', id: string, identifier: string, release: { __typename?: 'ManagementServiceRelease', id: string, version: string, service: { __typename?: 'ManagementService', id: string, identifier: any, logo?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null } }, allowedUsers: Array<{ __typename?: 'ManagementUser', username: string, firstName?: string | null, lastName?: string | null, email?: string | null, avatar?: string | null, id: string, profile: { __typename?: 'ManagementProfile', id: string, name?: string | null, bio?: string | null, avatar?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null } }>, deniedUsers: Array<{ __typename?: 'ManagementUser', username: string, firstName?: string | null, lastName?: string | null, email?: string | null, avatar?: string | null, id: string, profile: { __typename?: 'ManagementProfile', id: string, name?: string | null, bio?: string | null, avatar?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null } }> }> };

export type ListLayerFragment = { __typename?: 'ManagementLayer', id: string, name: string, description?: string | null, logo?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null };

export type MembershipFragment = { __typename?: 'ManagementMembership', id: string, roles: Array<{ __typename?: 'ManagementRole', identifier: string, id: string }>, organization: { __typename?: 'ManagementOrganization', id: string, name: string, slug: string, avatar?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null } };

export type OrganizationFragment = { __typename?: 'ManagementOrganization', id: string, name: string, slug: string, roles: Array<{ __typename?: 'ManagementRole', id: string, identifier: string, description: string }>, avatar?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null, memberships: Array<{ __typename?: 'ManagementMembership', id: string, roles: Array<{ __typename?: 'ManagementRole', identifier: string }>, user: { __typename?: 'ManagementUser', id: string, username: string, profile: { __typename?: 'ManagementProfile', id: string, avatar?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null } } }>, invites: Array<{ __typename?: 'ManagementInvite', status: string, expiresAt?: any | null, token: string, inviteUrl: string, acceptedBy?: { __typename?: 'ManagementUser', id: string, username: string, profile: { __typename?: 'ManagementProfile', id: string, avatar?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null } } | null }> };

export type ListOrganizationFragment = { __typename?: 'ManagementOrganization', id: string, name: string, slug: string, avatar?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null };

export type ProfileFragment = { __typename?: 'ManagementProfile', id: string, name?: string | null, bio?: string | null, avatar?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null };

export type ListRedeemTokenFragment = { __typename?: 'ManagementRedeemToken', id: string, token: string, user: { __typename?: 'ManagementUser', id: string, email?: string | null }, client?: { __typename?: 'ManagementClient', id: string, release: { __typename?: 'ManagementRelease', version: any, app: { __typename?: 'ManagementApp', identifier: any } } } | null };

export type DetailRedeemTokenFragment = { __typename?: 'ManagementRedeemToken', id: string, token: string, user: { __typename?: 'ManagementUser', id: string, email?: string | null }, client?: { __typename?: 'ManagementClient', id: string, release: { __typename?: 'ManagementRelease', version: any, app: { __typename?: 'ManagementApp', identifier: any } } } | null };

export type DetailReleaseFragment = { __typename?: 'ManagementRelease', id: string, version: any, logo?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null, app: { __typename?: 'ManagementApp', id: string, identifier: any, logo?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null }, clients: Array<{ __typename?: 'ManagementClient', id: string, name: string, kind: string, user?: { __typename?: 'ManagementUser', id: string, username: string } | null, logo?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null, device?: { __typename?: 'ManagementDevice', id: string, name?: string | null } | null, release: { __typename?: 'ManagementRelease', version: any, logo?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null, app: { __typename?: 'ManagementApp', id: string, identifier: any, logo?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null } } }> };

export type ListReleaseFragment = { __typename?: 'ManagementRelease', id: string, version: any, logo?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null, app: { __typename?: 'ManagementApp', id: string, identifier: any, logo?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null } };

export type ListServiceFragment = { __typename?: 'ManagementService', identifier: any, id: string, name: string, description?: string | null, logo?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null, releases: Array<{ __typename?: 'ManagementServiceRelease', id: string, version: string, instances: Array<{ __typename?: 'ManagementServiceInstance', id: string, identifier: string, release: { __typename?: 'ManagementServiceRelease', id: string, version: string, service: { __typename?: 'ManagementService', id: string, identifier: any, logo?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null } }, allowedUsers: Array<{ __typename?: 'ManagementUser', username: string, firstName?: string | null, lastName?: string | null, email?: string | null, avatar?: string | null, id: string, profile: { __typename?: 'ManagementProfile', id: string, name?: string | null, bio?: string | null, avatar?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null } }>, deniedUsers: Array<{ __typename?: 'ManagementUser', username: string, firstName?: string | null, lastName?: string | null, email?: string | null, avatar?: string | null, id: string, profile: { __typename?: 'ManagementProfile', id: string, name?: string | null, bio?: string | null, avatar?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null } }> }> }> };

export type ServiceFragment = { __typename?: 'ManagementService', identifier: any, id: string, name: string, description?: string | null, logo?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null, releases: Array<{ __typename?: 'ManagementServiceRelease', id: string, version: string, instances: Array<{ __typename?: 'ManagementServiceInstance', id: string, identifier: string, release: { __typename?: 'ManagementServiceRelease', id: string, version: string, service: { __typename?: 'ManagementService', id: string, identifier: any, logo?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null } }, allowedUsers: Array<{ __typename?: 'ManagementUser', username: string, firstName?: string | null, lastName?: string | null, email?: string | null, avatar?: string | null, id: string, profile: { __typename?: 'ManagementProfile', id: string, name?: string | null, bio?: string | null, avatar?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null } }>, deniedUsers: Array<{ __typename?: 'ManagementUser', username: string, firstName?: string | null, lastName?: string | null, email?: string | null, avatar?: string | null, id: string, profile: { __typename?: 'ManagementProfile', id: string, name?: string | null, bio?: string | null, avatar?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null } }> }> }> };

export type ServiceDeviceCodeFragment = { __typename?: 'ManagementServiceDeviceCode', id: string, code: string, stagingAliases?: Array<{ __typename?: 'StagingAlias', host?: string | null, port?: number | null }> | null, stagingManifest?: { __typename?: 'ManagementStagingServiceManifest', identifier: string, version: string, logo?: string | null, description?: string | null, url?: string | null } | null, instance?: { __typename?: 'ManagementServiceInstance', id: string, identifier: string, release: { __typename?: 'ManagementServiceRelease', id: string, version: string, service: { __typename?: 'ManagementService', id: string, identifier: any } } } | null };

export type ServiceInstanceFragment = { __typename?: 'ManagementServiceInstance', identifier: string, id: string, release: { __typename?: 'ManagementServiceRelease', id: string, version: string, service: { __typename?: 'ManagementService', identifier: any, id: string, description?: string | null, name: string, logo?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null } }, allowedUsers: Array<{ __typename?: 'ManagementUser', username: string, firstName?: string | null, lastName?: string | null, email?: string | null, avatar?: string | null, id: string, profile: { __typename?: 'ManagementProfile', id: string, name?: string | null, bio?: string | null, avatar?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null } }>, deniedUsers: Array<{ __typename?: 'ManagementUser', username: string, firstName?: string | null, lastName?: string | null, email?: string | null, avatar?: string | null, id: string, profile: { __typename?: 'ManagementProfile', id: string, name?: string | null, bio?: string | null, avatar?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null } }>, mappings: Array<{ __typename?: 'ManagementServiceInstanceMapping', id: string, key: string, optional: boolean, instance: { __typename?: 'ManagementServiceInstance', id: string, identifier: string, release: { __typename?: 'ManagementServiceRelease', id: string, version: string, service: { __typename?: 'ManagementService', id: string, identifier: any, logo?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null } }, allowedUsers: Array<{ __typename?: 'ManagementUser', username: string, firstName?: string | null, lastName?: string | null, email?: string | null, avatar?: string | null, id: string, profile: { __typename?: 'ManagementProfile', id: string, name?: string | null, bio?: string | null, avatar?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null } }>, deniedUsers: Array<{ __typename?: 'ManagementUser', username: string, firstName?: string | null, lastName?: string | null, email?: string | null, avatar?: string | null, id: string, profile: { __typename?: 'ManagementProfile', id: string, name?: string | null, bio?: string | null, avatar?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null } }> }, client: { __typename?: 'ManagementClient', id: string, name: string, kind: string, user?: { __typename?: 'ManagementUser', id: string, username: string } | null, logo?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null, device?: { __typename?: 'ManagementDevice', id: string, name?: string | null } | null, release: { __typename?: 'ManagementRelease', version: any, logo?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null, app: { __typename?: 'ManagementApp', id: string, identifier: any, logo?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null } } } }>, aliases: Array<{ __typename?: 'ManagementInstanceAlias', id: string, host?: string | null, port?: number | null, ssl: boolean, path?: string | null, challenge: string, kind: string, layer?: { __typename?: 'ManagementLayer', id: string, name: string } | null, instance: { __typename?: 'ManagementServiceInstance', id: string, identifier: string, release: { __typename?: 'ManagementServiceRelease', version: string, service: { __typename?: 'ManagementService', id: string, identifier: any } } } }>, logo?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null };

export type ListServiceInstanceFragment = { __typename?: 'ManagementServiceInstance', id: string, identifier: string, release: { __typename?: 'ManagementServiceRelease', id: string, version: string, service: { __typename?: 'ManagementService', id: string, identifier: any, logo?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null } }, allowedUsers: Array<{ __typename?: 'ManagementUser', username: string, firstName?: string | null, lastName?: string | null, email?: string | null, avatar?: string | null, id: string, profile: { __typename?: 'ManagementProfile', id: string, name?: string | null, bio?: string | null, avatar?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null } }>, deniedUsers: Array<{ __typename?: 'ManagementUser', username: string, firstName?: string | null, lastName?: string | null, email?: string | null, avatar?: string | null, id: string, profile: { __typename?: 'ManagementProfile', id: string, name?: string | null, bio?: string | null, avatar?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null } }> };

export type ListServiceReleaseFragment = { __typename?: 'ManagementServiceRelease', id: string, version: string, instances: Array<{ __typename?: 'ManagementServiceInstance', id: string, identifier: string, release: { __typename?: 'ManagementServiceRelease', id: string, version: string, service: { __typename?: 'ManagementService', id: string, identifier: any, logo?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null } }, allowedUsers: Array<{ __typename?: 'ManagementUser', username: string, firstName?: string | null, lastName?: string | null, email?: string | null, avatar?: string | null, id: string, profile: { __typename?: 'ManagementProfile', id: string, name?: string | null, bio?: string | null, avatar?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null } }>, deniedUsers: Array<{ __typename?: 'ManagementUser', username: string, firstName?: string | null, lastName?: string | null, email?: string | null, avatar?: string | null, id: string, profile: { __typename?: 'ManagementProfile', id: string, name?: string | null, bio?: string | null, avatar?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null } }> }> };

export type ServiceReleaseFragment = { __typename?: 'ManagementServiceRelease', id: string, version: string, service: { __typename?: 'ManagementService', identifier: any, id: string, name: string, description?: string | null, logo?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null, releases: Array<{ __typename?: 'ManagementServiceRelease', id: string, version: string, instances: Array<{ __typename?: 'ManagementServiceInstance', id: string, identifier: string, release: { __typename?: 'ManagementServiceRelease', id: string, version: string, service: { __typename?: 'ManagementService', id: string, identifier: any, logo?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null } }, allowedUsers: Array<{ __typename?: 'ManagementUser', username: string, firstName?: string | null, lastName?: string | null, email?: string | null, avatar?: string | null, id: string, profile: { __typename?: 'ManagementProfile', id: string, name?: string | null, bio?: string | null, avatar?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null } }>, deniedUsers: Array<{ __typename?: 'ManagementUser', username: string, firstName?: string | null, lastName?: string | null, email?: string | null, avatar?: string | null, id: string, profile: { __typename?: 'ManagementProfile', id: string, name?: string | null, bio?: string | null, avatar?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null } }> }> }> } };

export type ListServiceInstanceMappingFragment = { __typename?: 'ManagementServiceInstanceMapping', id: string, key: string, optional: boolean, instance: { __typename?: 'ManagementServiceInstance', id: string, identifier: string, release: { __typename?: 'ManagementServiceRelease', id: string, version: string, service: { __typename?: 'ManagementService', id: string, identifier: any, logo?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null } }, allowedUsers: Array<{ __typename?: 'ManagementUser', username: string, firstName?: string | null, lastName?: string | null, email?: string | null, avatar?: string | null, id: string, profile: { __typename?: 'ManagementProfile', id: string, name?: string | null, bio?: string | null, avatar?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null } }>, deniedUsers: Array<{ __typename?: 'ManagementUser', username: string, firstName?: string | null, lastName?: string | null, email?: string | null, avatar?: string | null, id: string, profile: { __typename?: 'ManagementProfile', id: string, name?: string | null, bio?: string | null, avatar?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null } }> }, client: { __typename?: 'ManagementClient', id: string, name: string, kind: string, user?: { __typename?: 'ManagementUser', id: string, username: string } | null, logo?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null, device?: { __typename?: 'ManagementDevice', id: string, name?: string | null } | null, release: { __typename?: 'ManagementRelease', version: any, logo?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null, app: { __typename?: 'ManagementApp', id: string, identifier: any, logo?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null } } } };

export type ListUsedAliasFragment = { __typename?: 'ManagementUsedAlias', id: string, key: string, valid: boolean, reason?: string | null, alias?: { __typename?: 'ManagementInstanceAlias', id: string, host?: string | null, port?: number | null, ssl: boolean, path?: string | null, challenge: string, kind: string, layer?: { __typename?: 'ManagementLayer', id: string, name: string } | null, instance: { __typename?: 'ManagementServiceInstance', id: string, identifier: string, release: { __typename?: 'ManagementServiceRelease', version: string, service: { __typename?: 'ManagementService', id: string, identifier: any } } } } | null };

export type DetailUsedAliasFragment = { __typename?: 'ManagementUsedAlias', id: string, key: string, valid: boolean, reason?: string | null, alias?: { __typename?: 'ManagementInstanceAlias', id: string, host?: string | null, port?: number | null, ssl: boolean, path?: string | null, challenge: string, kind: string, layer?: { __typename?: 'ManagementLayer', id: string, name: string } | null, instance: { __typename?: 'ManagementServiceInstance', id: string } } | null, client: { __typename?: 'ManagementClient', id: string, name: string, kind: string, user?: { __typename?: 'ManagementUser', id: string, username: string } | null, logo?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null, device?: { __typename?: 'ManagementDevice', id: string, name?: string | null } | null, release: { __typename?: 'ManagementRelease', version: any, logo?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null, app: { __typename?: 'ManagementApp', id: string, identifier: any, logo?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null } } } };

export type ListUserFragment = { __typename?: 'ManagementUser', username: string, firstName?: string | null, lastName?: string | null, email?: string | null, avatar?: string | null, id: string, profile: { __typename?: 'ManagementProfile', id: string, name?: string | null, bio?: string | null, avatar?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null } };

export type DetailUserFragment = { __typename?: 'ManagementUser', id: string, username: string, email?: string | null, firstName?: string | null, lastName?: string | null, avatar?: string | null, groups: Array<{ __typename?: 'ManagementGroup', id: string, name: string }>, profile: { __typename?: 'ManagementProfile', id: string, name?: string | null, bio?: string | null, avatar?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null }, memberships: Array<{ __typename?: 'ManagementMembership', id: string, roles: Array<{ __typename?: 'ManagementRole', identifier: string, id: string }>, organization: { __typename?: 'ManagementOrganization', id: string, name: string, slug: string, avatar?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null } }> };

export type MeUserFragment = { __typename?: 'ManagementUser', id: string, username: string, email?: string | null, firstName?: string | null, lastName?: string | null, avatar?: string | null, profile: { __typename?: 'ManagementProfile', id: string, name?: string | null, bio?: string | null, avatar?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null }, memberships: Array<{ __typename?: 'ManagementMembership', id: string, roles: Array<{ __typename?: 'ManagementRole', identifier: string, id: string }>, organization: { __typename?: 'ManagementOrganization', id: string, name: string, slug: string, avatar?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null } }> };

export type CreateAliasMutationVariables = Exact<{
  input: CreateAliasInput;
}>;


export type CreateAliasMutation = { __typename?: 'Mutation', createAlias: { __typename?: 'ManagementInstanceAlias', id: string, host?: string | null, port?: number | null, ssl: boolean, path?: string | null, challenge: string, kind: string, layer?: { __typename?: 'ManagementLayer', id: string, name: string } | null, instance: { __typename?: 'ManagementServiceInstance', id: string } } };

export type DeleteAliasMutationVariables = Exact<{
  input: DeleteAliasInput;
}>;


export type DeleteAliasMutation = { __typename?: 'Mutation', deleteAlias: string };

export type UpdateAliasMutationVariables = Exact<{
  input: UpdateAliasInput;
}>;


export type UpdateAliasMutation = { __typename?: 'Mutation', updateAlias: { __typename?: 'ManagementInstanceAlias', id: string, host?: string | null, port?: number | null, ssl: boolean, path?: string | null, challenge: string, kind: string, layer?: { __typename?: 'ManagementLayer', id: string, name: string } | null, instance: { __typename?: 'ManagementServiceInstance', id: string } } };

export type AcceptDeviceCodeMutationVariables = Exact<{
  input: AcceptDeviceCodeInput;
}>;


export type AcceptDeviceCodeMutation = { __typename?: 'Mutation', acceptDeviceCode: { __typename?: 'ManagementClient', id: string, token: string, name: string, functional: boolean, kind: string, issueUrl?: string | null, user?: { __typename?: 'ManagementUser', id: string, username: string } | null, release: { __typename?: 'ManagementRelease', id: string, version: any, logo?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null, app: { __typename?: 'ManagementApp', id: string, identifier: any, logo?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null } }, logo?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null, mappings: Array<{ __typename?: 'ManagementServiceInstanceMapping', id: string, key: string, optional: boolean, instance: { __typename?: 'ManagementServiceInstance', id: string, identifier: string, release: { __typename?: 'ManagementServiceRelease', id: string, version: string, service: { __typename?: 'ManagementService', id: string, identifier: any, logo?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null } }, allowedUsers: Array<{ __typename?: 'ManagementUser', username: string, firstName?: string | null, lastName?: string | null, email?: string | null, avatar?: string | null, id: string, profile: { __typename?: 'ManagementProfile', id: string, name?: string | null, bio?: string | null, avatar?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null } }>, deniedUsers: Array<{ __typename?: 'ManagementUser', username: string, firstName?: string | null, lastName?: string | null, email?: string | null, avatar?: string | null, id: string, profile: { __typename?: 'ManagementProfile', id: string, name?: string | null, bio?: string | null, avatar?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null } }> }, client: { __typename?: 'ManagementClient', id: string, name: string, kind: string, user?: { __typename?: 'ManagementUser', id: string, username: string } | null, logo?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null, device?: { __typename?: 'ManagementDevice', id: string, name?: string | null } | null, release: { __typename?: 'ManagementRelease', version: any, logo?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null, app: { __typename?: 'ManagementApp', id: string, identifier: any, logo?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null } } } }>, usedAliases: Array<{ __typename?: 'ManagementUsedAlias', id: string, key: string, valid: boolean, reason?: string | null, alias?: { __typename?: 'ManagementInstanceAlias', id: string, host?: string | null, port?: number | null, ssl: boolean, path?: string | null, challenge: string, kind: string, layer?: { __typename?: 'ManagementLayer', id: string, name: string } | null, instance: { __typename?: 'ManagementServiceInstance', id: string, identifier: string, release: { __typename?: 'ManagementServiceRelease', version: string, service: { __typename?: 'ManagementService', id: string, identifier: any } } } } | null }>, device?: { __typename?: 'ManagementDevice', id: string, name?: string | null } | null, publicSources: Array<{ __typename?: 'ManagementPublicSource', kind: string, url: string }> } };

export type DeclineDeviceCodeMutationVariables = Exact<{
  input: DeclineDeviceCodeInput;
}>;


export type DeclineDeviceCodeMutation = { __typename?: 'Mutation', declineDeviceCode: { __typename?: 'ManagementDeviceCode', id: string, code: string, stagingKind: string, stagingManifest?: { __typename?: 'ManagementStagingManifest', identifier: string, version: string, logo?: string | null, description?: string | null, url?: string | null } | null, client?: { __typename?: 'ManagementClient', id: string, kind: string, name: string, release: { __typename?: 'ManagementRelease', version: any, scopes: Array<string>, app: { __typename?: 'ManagementApp', identifier: any } } } | null } };

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


export type AddDeviceToGroupMutation = { __typename?: 'Mutation', addDeviceToGroup: { __typename?: 'ManagementDevice', id: string, name?: string | null, nodeId: string, clients: Array<{ __typename?: 'ManagementClient', id: string, name: string, kind: string, user?: { __typename?: 'ManagementUser', id: string, username: string } | null, logo?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null, device?: { __typename?: 'ManagementDevice', id: string, name?: string | null } | null, release: { __typename?: 'ManagementRelease', version: any, logo?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null, app: { __typename?: 'ManagementApp', id: string, identifier: any, logo?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null } } }>, deviceGroups: Array<{ __typename?: 'ManagementDeviceGroup', id: string, name: string }> } };

export type CreateInviteMutationVariables = Exact<{
  input: CreateInviteInput;
}>;


export type CreateInviteMutation = { __typename?: 'Mutation', createInvite: { __typename?: 'ManagementInvite', id: string, token: string, status: string, createdAt: any, expiresAt?: any | null, createdBy: { __typename?: 'ManagementUser', id: string, username: string, profile: { __typename?: 'ManagementProfile', id: string, avatar?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null } }, createdFor: { __typename?: 'ManagementOrganization', id: string, name: string, slug: string, roles: Array<{ __typename?: 'ManagementRole', id: string, identifier: string, description: string }>, avatar?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null, memberships: Array<{ __typename?: 'ManagementMembership', id: string, roles: Array<{ __typename?: 'ManagementRole', identifier: string }>, user: { __typename?: 'ManagementUser', id: string, username: string, profile: { __typename?: 'ManagementProfile', id: string, avatar?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null } } }>, invites: Array<{ __typename?: 'ManagementInvite', status: string, expiresAt?: any | null, token: string, inviteUrl: string, acceptedBy?: { __typename?: 'ManagementUser', id: string, username: string, profile: { __typename?: 'ManagementProfile', id: string, avatar?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null } } | null }> }, acceptedBy?: { __typename?: 'ManagementUser', id: string, username: string, profile: { __typename?: 'ManagementProfile', id: string, avatar?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null } } | null } };

export type AcceptInviteMutationVariables = Exact<{
  input: AcceptInviteInput;
}>;


export type AcceptInviteMutation = { __typename?: 'Mutation', acceptInvite: { __typename?: 'ManagementMembership', organization: { __typename?: 'ManagementOrganization', id: string, name: string, slug: string, roles: Array<{ __typename?: 'ManagementRole', id: string, identifier: string, description: string }>, avatar?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null, memberships: Array<{ __typename?: 'ManagementMembership', id: string, roles: Array<{ __typename?: 'ManagementRole', identifier: string }>, user: { __typename?: 'ManagementUser', id: string, username: string, profile: { __typename?: 'ManagementProfile', id: string, avatar?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null } } }>, invites: Array<{ __typename?: 'ManagementInvite', status: string, expiresAt?: any | null, token: string, inviteUrl: string, acceptedBy?: { __typename?: 'ManagementUser', id: string, username: string, profile: { __typename?: 'ManagementProfile', id: string, avatar?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null } } | null }> } } };

export type DeclineInviteMutationVariables = Exact<{
  input: DeclineInviteInput;
}>;


export type DeclineInviteMutation = { __typename?: 'Mutation', declineInvite: { __typename?: 'ManagementInvite', id: string, token: string, status: string, createdAt: any, expiresAt?: any | null, createdBy: { __typename?: 'ManagementUser', id: string, username: string, profile: { __typename?: 'ManagementProfile', id: string, avatar?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null } }, createdFor: { __typename?: 'ManagementOrganization', id: string, name: string, slug: string, roles: Array<{ __typename?: 'ManagementRole', id: string, identifier: string, description: string }>, avatar?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null, memberships: Array<{ __typename?: 'ManagementMembership', id: string, roles: Array<{ __typename?: 'ManagementRole', identifier: string }>, user: { __typename?: 'ManagementUser', id: string, username: string, profile: { __typename?: 'ManagementProfile', id: string, avatar?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null } } }>, invites: Array<{ __typename?: 'ManagementInvite', status: string, expiresAt?: any | null, token: string, inviteUrl: string, acceptedBy?: { __typename?: 'ManagementUser', id: string, username: string, profile: { __typename?: 'ManagementProfile', id: string, avatar?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null } } | null }> }, acceptedBy?: { __typename?: 'ManagementUser', id: string, username: string, profile: { __typename?: 'ManagementProfile', id: string, avatar?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null } } | null } };

export type CreateOrganizationMutationVariables = Exact<{
  input: CreateOrganizationInput;
}>;


export type CreateOrganizationMutation = { __typename?: 'Mutation', createOrganization: { __typename?: 'ManagementOrganization', id: string, name: string, slug: string, roles: Array<{ __typename?: 'ManagementRole', id: string, identifier: string, description: string }>, avatar?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null, memberships: Array<{ __typename?: 'ManagementMembership', id: string, roles: Array<{ __typename?: 'ManagementRole', identifier: string }>, user: { __typename?: 'ManagementUser', id: string, username: string, profile: { __typename?: 'ManagementProfile', id: string, avatar?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null } } }>, invites: Array<{ __typename?: 'ManagementInvite', status: string, expiresAt?: any | null, token: string, inviteUrl: string, acceptedBy?: { __typename?: 'ManagementUser', id: string, username: string, profile: { __typename?: 'ManagementProfile', id: string, avatar?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null } } | null }> } };

export type AcceptServiceDeviceCodeMutationVariables = Exact<{
  input: AcceptServiceDeviceCodeInput;
}>;


export type AcceptServiceDeviceCodeMutation = { __typename?: 'Mutation', acceptServiceDeviceCode: { __typename?: 'ManagementServiceInstance', identifier: string, id: string, release: { __typename?: 'ManagementServiceRelease', id: string, version: string, service: { __typename?: 'ManagementService', identifier: any, id: string, description?: string | null, name: string, logo?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null } }, allowedUsers: Array<{ __typename?: 'ManagementUser', username: string, firstName?: string | null, lastName?: string | null, email?: string | null, avatar?: string | null, id: string, profile: { __typename?: 'ManagementProfile', id: string, name?: string | null, bio?: string | null, avatar?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null } }>, deniedUsers: Array<{ __typename?: 'ManagementUser', username: string, firstName?: string | null, lastName?: string | null, email?: string | null, avatar?: string | null, id: string, profile: { __typename?: 'ManagementProfile', id: string, name?: string | null, bio?: string | null, avatar?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null } }>, mappings: Array<{ __typename?: 'ManagementServiceInstanceMapping', id: string, key: string, optional: boolean, instance: { __typename?: 'ManagementServiceInstance', id: string, identifier: string, release: { __typename?: 'ManagementServiceRelease', id: string, version: string, service: { __typename?: 'ManagementService', id: string, identifier: any, logo?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null } }, allowedUsers: Array<{ __typename?: 'ManagementUser', username: string, firstName?: string | null, lastName?: string | null, email?: string | null, avatar?: string | null, id: string, profile: { __typename?: 'ManagementProfile', id: string, name?: string | null, bio?: string | null, avatar?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null } }>, deniedUsers: Array<{ __typename?: 'ManagementUser', username: string, firstName?: string | null, lastName?: string | null, email?: string | null, avatar?: string | null, id: string, profile: { __typename?: 'ManagementProfile', id: string, name?: string | null, bio?: string | null, avatar?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null } }> }, client: { __typename?: 'ManagementClient', id: string, name: string, kind: string, user?: { __typename?: 'ManagementUser', id: string, username: string } | null, logo?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null, device?: { __typename?: 'ManagementDevice', id: string, name?: string | null } | null, release: { __typename?: 'ManagementRelease', version: any, logo?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null, app: { __typename?: 'ManagementApp', id: string, identifier: any, logo?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null } } } }>, aliases: Array<{ __typename?: 'ManagementInstanceAlias', id: string, host?: string | null, port?: number | null, ssl: boolean, path?: string | null, challenge: string, kind: string, layer?: { __typename?: 'ManagementLayer', id: string, name: string } | null, instance: { __typename?: 'ManagementServiceInstance', id: string, identifier: string, release: { __typename?: 'ManagementServiceRelease', version: string, service: { __typename?: 'ManagementService', id: string, identifier: any } } } }>, logo?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null } };

export type DeclineServiceDeviceCodeMutationVariables = Exact<{
  input: DeclineServiceDeviceCodeInput;
}>;


export type DeclineServiceDeviceCodeMutation = { __typename?: 'Mutation', declineServiceDeviceCode: { __typename?: 'ManagementServiceDeviceCode', id: string, code: string, stagingAliases?: Array<{ __typename?: 'StagingAlias', host?: string | null, port?: number | null }> | null, stagingManifest?: { __typename?: 'ManagementStagingServiceManifest', identifier: string, version: string, logo?: string | null, description?: string | null, url?: string | null } | null, instance?: { __typename?: 'ManagementServiceInstance', id: string, identifier: string, release: { __typename?: 'ManagementServiceRelease', id: string, version: string, service: { __typename?: 'ManagementService', id: string, identifier: any } } } | null } };

export type AppsQueryVariables = Exact<{
  filters?: InputMaybe<AppFilter>;
  pagination?: InputMaybe<OffsetPaginationInput>;
}>;


export type AppsQuery = { __typename?: 'Query', apps: Array<{ __typename?: 'ManagementApp', id: string, identifier: any, logo?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null }> };

export type DetailAppQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type DetailAppQuery = { __typename?: 'Query', app: { __typename?: 'ManagementApp', id: string, identifier: any, logo?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null, releases: Array<{ __typename?: 'ManagementRelease', id: string, version: any, logo?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null, app: { __typename?: 'ManagementApp', id: string, identifier: any, logo?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null } }> } };

export type ClientsQueryVariables = Exact<{
  filters?: InputMaybe<ManagementClientFilter>;
  pagination?: InputMaybe<OffsetPaginationInput>;
  order?: InputMaybe<ManagementClientOrder>;
}>;


export type ClientsQuery = { __typename?: 'Query', clients: Array<{ __typename?: 'ManagementClient', id: string, name: string, kind: string, user?: { __typename?: 'ManagementUser', id: string, username: string } | null, logo?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null, device?: { __typename?: 'ManagementDevice', id: string, name?: string | null } | null, release: { __typename?: 'ManagementRelease', version: any, logo?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null, app: { __typename?: 'ManagementApp', id: string, identifier: any, logo?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null } } }> };

export type DetailClientQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type DetailClientQuery = { __typename?: 'Query', client: { __typename?: 'ManagementClient', id: string, token: string, name: string, functional: boolean, kind: string, issueUrl?: string | null, user?: { __typename?: 'ManagementUser', id: string, username: string } | null, release: { __typename?: 'ManagementRelease', id: string, version: any, logo?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null, app: { __typename?: 'ManagementApp', id: string, identifier: any, logo?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null } }, logo?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null, mappings: Array<{ __typename?: 'ManagementServiceInstanceMapping', id: string, key: string, optional: boolean, instance: { __typename?: 'ManagementServiceInstance', id: string, identifier: string, release: { __typename?: 'ManagementServiceRelease', id: string, version: string, service: { __typename?: 'ManagementService', id: string, identifier: any, logo?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null } }, allowedUsers: Array<{ __typename?: 'ManagementUser', username: string, firstName?: string | null, lastName?: string | null, email?: string | null, avatar?: string | null, id: string, profile: { __typename?: 'ManagementProfile', id: string, name?: string | null, bio?: string | null, avatar?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null } }>, deniedUsers: Array<{ __typename?: 'ManagementUser', username: string, firstName?: string | null, lastName?: string | null, email?: string | null, avatar?: string | null, id: string, profile: { __typename?: 'ManagementProfile', id: string, name?: string | null, bio?: string | null, avatar?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null } }> }, client: { __typename?: 'ManagementClient', id: string, name: string, kind: string, user?: { __typename?: 'ManagementUser', id: string, username: string } | null, logo?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null, device?: { __typename?: 'ManagementDevice', id: string, name?: string | null } | null, release: { __typename?: 'ManagementRelease', version: any, logo?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null, app: { __typename?: 'ManagementApp', id: string, identifier: any, logo?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null } } } }>, usedAliases: Array<{ __typename?: 'ManagementUsedAlias', id: string, key: string, valid: boolean, reason?: string | null, alias?: { __typename?: 'ManagementInstanceAlias', id: string, host?: string | null, port?: number | null, ssl: boolean, path?: string | null, challenge: string, kind: string, layer?: { __typename?: 'ManagementLayer', id: string, name: string } | null, instance: { __typename?: 'ManagementServiceInstance', id: string, identifier: string, release: { __typename?: 'ManagementServiceRelease', version: string, service: { __typename?: 'ManagementService', id: string, identifier: any } } } } | null }>, device?: { __typename?: 'ManagementDevice', id: string, name?: string | null } | null, publicSources: Array<{ __typename?: 'ManagementPublicSource', kind: string, url: string }> } };

export type ListDevicesQueryVariables = Exact<{
  pagination?: InputMaybe<OffsetPaginationInput>;
  filters?: InputMaybe<DeviceFilter>;
}>;


export type ListDevicesQuery = { __typename?: 'Query', devices: Array<{ __typename?: 'ManagementDevice', id: string, name?: string | null, nodeId: string }> };

export type GetDeviceQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetDeviceQuery = { __typename?: 'Query', device: { __typename?: 'ManagementDevice', id: string, name?: string | null, nodeId: string, clients: Array<{ __typename?: 'ManagementClient', id: string, token: string, name: string, functional: boolean, kind: string, issueUrl?: string | null, user?: { __typename?: 'ManagementUser', id: string, username: string } | null, release: { __typename?: 'ManagementRelease', id: string, version: any, logo?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null, app: { __typename?: 'ManagementApp', id: string, identifier: any, logo?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null } }, logo?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null, mappings: Array<{ __typename?: 'ManagementServiceInstanceMapping', id: string, key: string, optional: boolean, instance: { __typename?: 'ManagementServiceInstance', id: string, identifier: string, release: { __typename?: 'ManagementServiceRelease', id: string, version: string, service: { __typename?: 'ManagementService', id: string, identifier: any, logo?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null } }, allowedUsers: Array<{ __typename?: 'ManagementUser', username: string, firstName?: string | null, lastName?: string | null, email?: string | null, avatar?: string | null, id: string, profile: { __typename?: 'ManagementProfile', id: string, name?: string | null, bio?: string | null, avatar?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null } }>, deniedUsers: Array<{ __typename?: 'ManagementUser', username: string, firstName?: string | null, lastName?: string | null, email?: string | null, avatar?: string | null, id: string, profile: { __typename?: 'ManagementProfile', id: string, name?: string | null, bio?: string | null, avatar?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null } }> }, client: { __typename?: 'ManagementClient', id: string, name: string, kind: string, user?: { __typename?: 'ManagementUser', id: string, username: string } | null, logo?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null, device?: { __typename?: 'ManagementDevice', id: string, name?: string | null } | null, release: { __typename?: 'ManagementRelease', version: any, logo?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null, app: { __typename?: 'ManagementApp', id: string, identifier: any, logo?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null } } } }>, usedAliases: Array<{ __typename?: 'ManagementUsedAlias', id: string, key: string, valid: boolean, reason?: string | null, alias?: { __typename?: 'ManagementInstanceAlias', id: string, host?: string | null, port?: number | null, ssl: boolean, path?: string | null, challenge: string, kind: string, layer?: { __typename?: 'ManagementLayer', id: string, name: string } | null, instance: { __typename?: 'ManagementServiceInstance', id: string, identifier: string, release: { __typename?: 'ManagementServiceRelease', version: string, service: { __typename?: 'ManagementService', id: string, identifier: any } } } } | null }>, device?: { __typename?: 'ManagementDevice', id: string, name?: string | null } | null, publicSources: Array<{ __typename?: 'ManagementPublicSource', kind: string, url: string }> }>, deviceGroups: Array<{ __typename?: 'ManagementDeviceGroup', id: string, name: string }> } };

export type DeviceCodeByCodeQueryVariables = Exact<{
  code: Scalars['String']['input'];
}>;


export type DeviceCodeByCodeQuery = { __typename?: 'Query', deviceCodeByCode: { __typename?: 'ManagementDeviceCode', id: string, code: string, stagingKind: string, stagingManifest?: { __typename?: 'ManagementStagingManifest', identifier: string, version: string, logo?: string | null, description?: string | null, url?: string | null } | null, client?: { __typename?: 'ManagementClient', id: string, kind: string, name: string, release: { __typename?: 'ManagementRelease', version: any, scopes: Array<string>, app: { __typename?: 'ManagementApp', identifier: any } } } | null } };

export type ValidateDeviceCodeQueryVariables = Exact<{
  deviceCode: Scalars['ID']['input'];
  organization: Scalars['ID']['input'];
}>;


export type ValidateDeviceCodeQuery = { __typename?: 'Query', validateDeviceCode: { __typename?: 'ValidationResult', valid: boolean, reason?: string | null, mappings: Array<{ __typename?: 'PotentialMapping', key: string, serviceInstance?: { __typename?: 'ManagementServiceInstance', id: string, identifier: string } | null }> } };

export type ListDeviceGroupsQueryVariables = Exact<{
  pagination?: InputMaybe<OffsetPaginationInput>;
  filters?: InputMaybe<DeviceGroupFilter>;
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


export type ListInstanceAliasQuery = { __typename?: 'Query', instanceAliases: Array<{ __typename?: 'ManagementInstanceAlias', id: string, host?: string | null, port?: number | null, ssl: boolean, path?: string | null, challenge: string, kind: string, layer?: { __typename?: 'ManagementLayer', id: string, name: string } | null, instance: { __typename?: 'ManagementServiceInstance', id: string, identifier: string, release: { __typename?: 'ManagementServiceRelease', version: string, service: { __typename?: 'ManagementService', id: string, identifier: any } } } }> };

export type DetailInstanceAliasQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type DetailInstanceAliasQuery = { __typename?: 'Query', instanceAlias: { __typename?: 'ManagementInstanceAlias', id: string, host?: string | null, port?: number | null, ssl: boolean, path?: string | null, challenge: string, kind: string, layer?: { __typename?: 'ManagementLayer', id: string, name: string } | null, instance: { __typename?: 'ManagementServiceInstance', id: string } } };

export type InviteByCodeQueryVariables = Exact<{
  code: Scalars['String']['input'];
}>;


export type InviteByCodeQuery = { __typename?: 'Query', inviteByCode: { __typename?: 'ManagementInvite', id: string, token: string, status: string, createdAt: any, expiresAt?: any | null, createdBy: { __typename?: 'ManagementUser', id: string, username: string, profile: { __typename?: 'ManagementProfile', id: string, avatar?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null } }, createdFor: { __typename?: 'ManagementOrganization', id: string, name: string, slug: string, roles: Array<{ __typename?: 'ManagementRole', id: string, identifier: string, description: string }>, avatar?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null, memberships: Array<{ __typename?: 'ManagementMembership', id: string, roles: Array<{ __typename?: 'ManagementRole', identifier: string }>, user: { __typename?: 'ManagementUser', id: string, username: string, profile: { __typename?: 'ManagementProfile', id: string, avatar?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null } } }>, invites: Array<{ __typename?: 'ManagementInvite', status: string, expiresAt?: any | null, token: string, inviteUrl: string, acceptedBy?: { __typename?: 'ManagementUser', id: string, username: string, profile: { __typename?: 'ManagementProfile', id: string, avatar?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null } } | null }> }, acceptedBy?: { __typename?: 'ManagementUser', id: string, username: string, profile: { __typename?: 'ManagementProfile', id: string, avatar?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null } } | null } };

export type LayersQueryVariables = Exact<{
  filters?: InputMaybe<LayerFilter>;
  pagination?: InputMaybe<OffsetPaginationInput>;
}>;


export type LayersQuery = { __typename?: 'Query', layers: Array<{ __typename?: 'ManagementLayer', id: string, name: string, description?: string | null, logo?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null }> };

export type DetailLayerQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type DetailLayerQuery = { __typename?: 'Query', layer: { __typename?: 'ManagementLayer', id: string, name: string, description?: string | null, logo?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null, instances: Array<{ __typename?: 'ManagementServiceInstance', id: string, identifier: string, release: { __typename?: 'ManagementServiceRelease', id: string, version: string, service: { __typename?: 'ManagementService', id: string, identifier: any, logo?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null } }, allowedUsers: Array<{ __typename?: 'ManagementUser', username: string, firstName?: string | null, lastName?: string | null, email?: string | null, avatar?: string | null, id: string, profile: { __typename?: 'ManagementProfile', id: string, name?: string | null, bio?: string | null, avatar?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null } }>, deniedUsers: Array<{ __typename?: 'ManagementUser', username: string, firstName?: string | null, lastName?: string | null, email?: string | null, avatar?: string | null, id: string, profile: { __typename?: 'ManagementProfile', id: string, name?: string | null, bio?: string | null, avatar?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null } }> }> } };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me: { __typename?: 'ManagementUser', id: string, username: string, email?: string | null, profile: { __typename?: 'ManagementProfile', avatar?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null } } };

export type OrganizationQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type OrganizationQuery = { __typename?: 'Query', organization: { __typename?: 'ManagementOrganization', id: string, name: string, slug: string, roles: Array<{ __typename?: 'ManagementRole', id: string, identifier: string, description: string }>, avatar?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null, memberships: Array<{ __typename?: 'ManagementMembership', id: string, roles: Array<{ __typename?: 'ManagementRole', identifier: string }>, user: { __typename?: 'ManagementUser', id: string, username: string, profile: { __typename?: 'ManagementProfile', id: string, avatar?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null } } }>, invites: Array<{ __typename?: 'ManagementInvite', status: string, expiresAt?: any | null, token: string, inviteUrl: string, acceptedBy?: { __typename?: 'ManagementUser', id: string, username: string, profile: { __typename?: 'ManagementProfile', id: string, avatar?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null } } | null }> } };

export type ListOrganizationsQueryVariables = Exact<{
  filters?: InputMaybe<OrganizationFilter>;
  pagination?: InputMaybe<OffsetPaginationInput>;
}>;


export type ListOrganizationsQuery = { __typename?: 'Query', organizations: Array<{ __typename?: 'ManagementOrganization', id: string, name: string, slug: string, avatar?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null }> };

export type OrganizationOptionsQueryVariables = Exact<{
  search?: InputMaybe<Scalars['String']['input']>;
  values?: InputMaybe<Array<Scalars['ID']['input']> | Scalars['ID']['input']>;
}>;


export type OrganizationOptionsQuery = { __typename?: 'Query', options: Array<{ __typename?: 'ManagementOrganization', value: string, label: string }> };

export type ReleasesQueryVariables = Exact<{ [key: string]: never; }>;


export type ReleasesQuery = { __typename?: 'Query', releases: Array<{ __typename?: 'ManagementRelease', id: string, version: any, logo?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null, app: { __typename?: 'ManagementApp', id: string, identifier: any, logo?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null } }> };

export type DetailReleaseQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type DetailReleaseQuery = { __typename?: 'Query', release: { __typename?: 'ManagementRelease', id: string, version: any, logo?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null, app: { __typename?: 'ManagementApp', id: string, identifier: any, logo?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null }, clients: Array<{ __typename?: 'ManagementClient', id: string, name: string, kind: string, user?: { __typename?: 'ManagementUser', id: string, username: string } | null, logo?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null, device?: { __typename?: 'ManagementDevice', id: string, name?: string | null } | null, release: { __typename?: 'ManagementRelease', version: any, logo?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null, app: { __typename?: 'ManagementApp', id: string, identifier: any, logo?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null } } }> } };

export type ServiceDeviceCodeByCodeQueryVariables = Exact<{
  code: Scalars['String']['input'];
}>;


export type ServiceDeviceCodeByCodeQuery = { __typename?: 'Query', serviceDeviceCodeByCode: { __typename?: 'ManagementServiceDeviceCode', id: string, code: string, stagingAliases?: Array<{ __typename?: 'StagingAlias', host?: string | null, port?: number | null }> | null, stagingManifest?: { __typename?: 'ManagementStagingServiceManifest', identifier: string, version: string, logo?: string | null, description?: string | null, url?: string | null } | null, instance?: { __typename?: 'ManagementServiceInstance', id: string, identifier: string, release: { __typename?: 'ManagementServiceRelease', id: string, version: string, service: { __typename?: 'ManagementService', id: string, identifier: any } } } | null } };

export type ListServiceInstancesQueryVariables = Exact<{
  pagination?: InputMaybe<OffsetPaginationInput>;
  filters?: InputMaybe<ServiceInstanceFilter>;
}>;


export type ListServiceInstancesQuery = { __typename?: 'Query', serviceInstances: Array<{ __typename?: 'ManagementServiceInstance', id: string, identifier: string, release: { __typename?: 'ManagementServiceRelease', id: string, version: string, service: { __typename?: 'ManagementService', id: string, identifier: any, logo?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null } }, allowedUsers: Array<{ __typename?: 'ManagementUser', username: string, firstName?: string | null, lastName?: string | null, email?: string | null, avatar?: string | null, id: string, profile: { __typename?: 'ManagementProfile', id: string, name?: string | null, bio?: string | null, avatar?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null } }>, deniedUsers: Array<{ __typename?: 'ManagementUser', username: string, firstName?: string | null, lastName?: string | null, email?: string | null, avatar?: string | null, id: string, profile: { __typename?: 'ManagementProfile', id: string, name?: string | null, bio?: string | null, avatar?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null } }> }> };

export type GetServiceInstanceQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetServiceInstanceQuery = { __typename?: 'Query', serviceInstance: { __typename?: 'ManagementServiceInstance', identifier: string, id: string, release: { __typename?: 'ManagementServiceRelease', id: string, version: string, service: { __typename?: 'ManagementService', identifier: any, id: string, description?: string | null, name: string, logo?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null } }, allowedUsers: Array<{ __typename?: 'ManagementUser', username: string, firstName?: string | null, lastName?: string | null, email?: string | null, avatar?: string | null, id: string, profile: { __typename?: 'ManagementProfile', id: string, name?: string | null, bio?: string | null, avatar?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null } }>, deniedUsers: Array<{ __typename?: 'ManagementUser', username: string, firstName?: string | null, lastName?: string | null, email?: string | null, avatar?: string | null, id: string, profile: { __typename?: 'ManagementProfile', id: string, name?: string | null, bio?: string | null, avatar?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null } }>, mappings: Array<{ __typename?: 'ManagementServiceInstanceMapping', id: string, key: string, optional: boolean, instance: { __typename?: 'ManagementServiceInstance', id: string, identifier: string, release: { __typename?: 'ManagementServiceRelease', id: string, version: string, service: { __typename?: 'ManagementService', id: string, identifier: any, logo?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null } }, allowedUsers: Array<{ __typename?: 'ManagementUser', username: string, firstName?: string | null, lastName?: string | null, email?: string | null, avatar?: string | null, id: string, profile: { __typename?: 'ManagementProfile', id: string, name?: string | null, bio?: string | null, avatar?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null } }>, deniedUsers: Array<{ __typename?: 'ManagementUser', username: string, firstName?: string | null, lastName?: string | null, email?: string | null, avatar?: string | null, id: string, profile: { __typename?: 'ManagementProfile', id: string, name?: string | null, bio?: string | null, avatar?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null } }> }, client: { __typename?: 'ManagementClient', id: string, name: string, kind: string, user?: { __typename?: 'ManagementUser', id: string, username: string } | null, logo?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null, device?: { __typename?: 'ManagementDevice', id: string, name?: string | null } | null, release: { __typename?: 'ManagementRelease', version: any, logo?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null, app: { __typename?: 'ManagementApp', id: string, identifier: any, logo?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null } } } }>, aliases: Array<{ __typename?: 'ManagementInstanceAlias', id: string, host?: string | null, port?: number | null, ssl: boolean, path?: string | null, challenge: string, kind: string, layer?: { __typename?: 'ManagementLayer', id: string, name: string } | null, instance: { __typename?: 'ManagementServiceInstance', id: string, identifier: string, release: { __typename?: 'ManagementServiceRelease', version: string, service: { __typename?: 'ManagementService', id: string, identifier: any } } } }>, logo?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null } };

export type ListServiceInstanceMappingsQueryVariables = Exact<{
  pagination?: InputMaybe<OffsetPaginationInput>;
  filters?: InputMaybe<ServiceInstanceMappingFilter>;
}>;


export type ListServiceInstanceMappingsQuery = { __typename?: 'Query', serviceInstanceMappings: Array<{ __typename?: 'ManagementServiceInstanceMapping', id: string, key: string, optional: boolean, instance: { __typename?: 'ManagementServiceInstance', id: string, identifier: string, release: { __typename?: 'ManagementServiceRelease', id: string, version: string, service: { __typename?: 'ManagementService', id: string, identifier: any, logo?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null } }, allowedUsers: Array<{ __typename?: 'ManagementUser', username: string, firstName?: string | null, lastName?: string | null, email?: string | null, avatar?: string | null, id: string, profile: { __typename?: 'ManagementProfile', id: string, name?: string | null, bio?: string | null, avatar?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null } }>, deniedUsers: Array<{ __typename?: 'ManagementUser', username: string, firstName?: string | null, lastName?: string | null, email?: string | null, avatar?: string | null, id: string, profile: { __typename?: 'ManagementProfile', id: string, name?: string | null, bio?: string | null, avatar?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null } }> }, client: { __typename?: 'ManagementClient', id: string, name: string, kind: string, user?: { __typename?: 'ManagementUser', id: string, username: string } | null, logo?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null, device?: { __typename?: 'ManagementDevice', id: string, name?: string | null } | null, release: { __typename?: 'ManagementRelease', version: any, logo?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null, app: { __typename?: 'ManagementApp', id: string, identifier: any, logo?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null } } } }> };

export type GetServiceInstanceMappingQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetServiceInstanceMappingQuery = { __typename?: 'Query', serviceInstanceMapping: { __typename?: 'ManagementServiceInstanceMapping', id: string, key: string, optional: boolean, instance: { __typename?: 'ManagementServiceInstance', id: string, identifier: string, release: { __typename?: 'ManagementServiceRelease', id: string, version: string, service: { __typename?: 'ManagementService', id: string, identifier: any, logo?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null } }, allowedUsers: Array<{ __typename?: 'ManagementUser', username: string, firstName?: string | null, lastName?: string | null, email?: string | null, avatar?: string | null, id: string, profile: { __typename?: 'ManagementProfile', id: string, name?: string | null, bio?: string | null, avatar?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null } }>, deniedUsers: Array<{ __typename?: 'ManagementUser', username: string, firstName?: string | null, lastName?: string | null, email?: string | null, avatar?: string | null, id: string, profile: { __typename?: 'ManagementProfile', id: string, name?: string | null, bio?: string | null, avatar?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null } }> }, client: { __typename?: 'ManagementClient', id: string, name: string, kind: string, user?: { __typename?: 'ManagementUser', id: string, username: string } | null, logo?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null, device?: { __typename?: 'ManagementDevice', id: string, name?: string | null } | null, release: { __typename?: 'ManagementRelease', version: any, logo?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null, app: { __typename?: 'ManagementApp', id: string, identifier: any, logo?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null } } } } };

export type ServiceReleasesQueryVariables = Exact<{ [key: string]: never; }>;


export type ServiceReleasesQuery = { __typename?: 'Query', serviceReleases: Array<{ __typename?: 'ManagementServiceRelease', id: string, version: string, instances: Array<{ __typename?: 'ManagementServiceInstance', id: string, identifier: string, release: { __typename?: 'ManagementServiceRelease', id: string, version: string, service: { __typename?: 'ManagementService', id: string, identifier: any, logo?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null } }, allowedUsers: Array<{ __typename?: 'ManagementUser', username: string, firstName?: string | null, lastName?: string | null, email?: string | null, avatar?: string | null, id: string, profile: { __typename?: 'ManagementProfile', id: string, name?: string | null, bio?: string | null, avatar?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null } }>, deniedUsers: Array<{ __typename?: 'ManagementUser', username: string, firstName?: string | null, lastName?: string | null, email?: string | null, avatar?: string | null, id: string, profile: { __typename?: 'ManagementProfile', id: string, name?: string | null, bio?: string | null, avatar?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null } }> }> }> };

export type DetailServiceReleaseQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type DetailServiceReleaseQuery = { __typename?: 'Query', serviceRelease: { __typename?: 'ManagementServiceRelease', id: string, version: string, service: { __typename?: 'ManagementService', identifier: any, id: string, name: string, description?: string | null, logo?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null, releases: Array<{ __typename?: 'ManagementServiceRelease', id: string, version: string, instances: Array<{ __typename?: 'ManagementServiceInstance', id: string, identifier: string, release: { __typename?: 'ManagementServiceRelease', id: string, version: string, service: { __typename?: 'ManagementService', id: string, identifier: any, logo?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null } }, allowedUsers: Array<{ __typename?: 'ManagementUser', username: string, firstName?: string | null, lastName?: string | null, email?: string | null, avatar?: string | null, id: string, profile: { __typename?: 'ManagementProfile', id: string, name?: string | null, bio?: string | null, avatar?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null } }>, deniedUsers: Array<{ __typename?: 'ManagementUser', username: string, firstName?: string | null, lastName?: string | null, email?: string | null, avatar?: string | null, id: string, profile: { __typename?: 'ManagementProfile', id: string, name?: string | null, bio?: string | null, avatar?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null } }> }> }> } } };

export type ListServicesQueryVariables = Exact<{
  pagination?: InputMaybe<OffsetPaginationInput>;
  filters?: InputMaybe<ServiceFilter>;
}>;


export type ListServicesQuery = { __typename?: 'Query', services: Array<{ __typename?: 'ManagementService', identifier: any, id: string, name: string, description?: string | null, logo?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null, releases: Array<{ __typename?: 'ManagementServiceRelease', id: string, version: string, instances: Array<{ __typename?: 'ManagementServiceInstance', id: string, identifier: string, release: { __typename?: 'ManagementServiceRelease', id: string, version: string, service: { __typename?: 'ManagementService', id: string, identifier: any, logo?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null } }, allowedUsers: Array<{ __typename?: 'ManagementUser', username: string, firstName?: string | null, lastName?: string | null, email?: string | null, avatar?: string | null, id: string, profile: { __typename?: 'ManagementProfile', id: string, name?: string | null, bio?: string | null, avatar?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null } }>, deniedUsers: Array<{ __typename?: 'ManagementUser', username: string, firstName?: string | null, lastName?: string | null, email?: string | null, avatar?: string | null, id: string, profile: { __typename?: 'ManagementProfile', id: string, name?: string | null, bio?: string | null, avatar?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null } }> }> }> }> };

export type GetServiceQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetServiceQuery = { __typename?: 'Query', service: { __typename?: 'ManagementService', identifier: any, id: string, name: string, description?: string | null, logo?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null, releases: Array<{ __typename?: 'ManagementServiceRelease', id: string, version: string, instances: Array<{ __typename?: 'ManagementServiceInstance', id: string, identifier: string, release: { __typename?: 'ManagementServiceRelease', id: string, version: string, service: { __typename?: 'ManagementService', id: string, identifier: any, logo?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null } }, allowedUsers: Array<{ __typename?: 'ManagementUser', username: string, firstName?: string | null, lastName?: string | null, email?: string | null, avatar?: string | null, id: string, profile: { __typename?: 'ManagementProfile', id: string, name?: string | null, bio?: string | null, avatar?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null } }>, deniedUsers: Array<{ __typename?: 'ManagementUser', username: string, firstName?: string | null, lastName?: string | null, email?: string | null, avatar?: string | null, id: string, profile: { __typename?: 'ManagementProfile', id: string, name?: string | null, bio?: string | null, avatar?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null } }> }> }> } };

export type ListUsedAliasesQueryVariables = Exact<{
  pagination?: InputMaybe<OffsetPaginationInput>;
  filters?: InputMaybe<DeviceFilter>;
}>;


export type ListUsedAliasesQuery = { __typename?: 'Query', usedAliases: Array<{ __typename?: 'ManagementUsedAlias', id: string, key: string, valid: boolean, reason?: string | null, alias?: { __typename?: 'ManagementInstanceAlias', id: string, host?: string | null, port?: number | null, ssl: boolean, path?: string | null, challenge: string, kind: string, layer?: { __typename?: 'ManagementLayer', id: string, name: string } | null, instance: { __typename?: 'ManagementServiceInstance', id: string, identifier: string, release: { __typename?: 'ManagementServiceRelease', version: string, service: { __typename?: 'ManagementService', id: string, identifier: any } } } } | null }> };

export type GetUsedAliasQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetUsedAliasQuery = { __typename?: 'Query', usedAlias: { __typename?: 'ManagementUsedAlias', id: string, key: string, valid: boolean, reason?: string | null, alias?: { __typename?: 'ManagementInstanceAlias', id: string, host?: string | null, port?: number | null, ssl: boolean, path?: string | null, challenge: string, kind: string, layer?: { __typename?: 'ManagementLayer', id: string, name: string } | null, instance: { __typename?: 'ManagementServiceInstance', id: string } } | null, client: { __typename?: 'ManagementClient', id: string, name: string, kind: string, user?: { __typename?: 'ManagementUser', id: string, username: string } | null, logo?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null, device?: { __typename?: 'ManagementDevice', id: string, name?: string | null } | null, release: { __typename?: 'ManagementRelease', version: any, logo?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null, app: { __typename?: 'ManagementApp', id: string, identifier: any, logo?: { __typename?: 'ManagementMediaStore', presignedUrl: string } | null } } } } };

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
export const ListClientFragmentDoc = gql`
    fragment ListClient on ManagementClient {
  id
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
}
    `;
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
}
    ${ListClientFragmentDoc}
${ListDeviceGroupFragmentDoc}`;
export const ProfileFragmentDoc = gql`
    fragment Profile on ManagementProfile {
  id
  name
  avatar {
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
  allowedUsers {
    ...ListUser
  }
  deniedUsers {
    ...ListUser
  }
}
    ${ListUserFragmentDoc}`;
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
}
    ${ListReleaseFragmentDoc}
${ListServiceInstanceMappingFragmentDoc}
${ListUsedAliasFragmentDoc}`;
export const DetailDeviceFragmentDoc = gql`
    fragment DetailDevice on ManagementDevice {
  id
  name
  nodeId
  clients {
    ...DetailClient
  }
  deviceGroups {
    ...ListDeviceGroup
  }
}
    ${DetailClientFragmentDoc}
${ListDeviceGroupFragmentDoc}`;
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
  avatar {
    presignedUrl
  }
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
  avatar {
    presignedUrl
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
  invites {
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
    `;
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
  createdAt
  expiresAt
}
    ${OrganizationFragmentDoc}`;
export const LayerFragmentDoc = gql`
    fragment Layer on ManagementLayer {
  id
  name
  description
  logo {
    presignedUrl
  }
  instances {
    ...ListServiceInstance
  }
}
    ${ListServiceInstanceFragmentDoc}`;
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
    url
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
  organization {
    ...ListOrganization
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
}
    ${ProfileFragmentDoc}
${MembershipFragmentDoc}`;
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
export const ListDevicesDocument = gql`
    query ListDevices($pagination: OffsetPaginationInput, $filters: DeviceFilter) {
  devices(pagination: $pagination, filters: $filters) {
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
    query ValidateDeviceCode($deviceCode: ID!, $organization: ID!) {
  validateDeviceCode(deviceCode: $deviceCode, organization: $organization) {
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
 *      organization: // value for 'organization'
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
    query ListDeviceGroups($pagination: OffsetPaginationInput, $filters: DeviceGroupFilter) {
  deviceGroups(pagination: $pagination, filters: $filters) {
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
export const LayersDocument = gql`
    query Layers($filters: LayerFilter, $pagination: OffsetPaginationInput) {
  layers(filters: $filters, pagination: $pagination) {
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
export const MeDocument = gql`
    query Me {
  me {
    id
    username
    email
    profile {
      avatar {
        presignedUrl
      }
    }
  }
}
    `;

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
    query ListServiceInstances($pagination: OffsetPaginationInput, $filters: ServiceInstanceFilter) {
  serviceInstances(pagination: $pagination, filters: $filters) {
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
export const ListUsedAliasesDocument = gql`
    query ListUsedAliases($pagination: OffsetPaginationInput, $filters: DeviceFilter) {
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