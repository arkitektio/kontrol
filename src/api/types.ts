export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
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
  /** The Service identifier is a unique identifier for a service. It is used to identify the service in the database and in the code. We encourage you to use the reverse domain name notation. E.g. `com.example.myservice` */
  ServiceIdentifier: { input: any; output: any; }
  /** The `Version` represents a semver version string */
  Version: { input: any; output: any; }
  _Any: { input: any; output: any; }
};

export type AcceptDeviceCodeInput = {
  /** Hand the app a pre-authorized key for the organization's mesh, if it asked for one (`requestAuthKey`). */
  allowIonscale?: Scalars['Boolean']['input'];
  /** The user-facing code the device displayed — proof that the approver actually saw the enrolment request */
  code: Scalars['String']['input'];
  declinedRequirements?: Array<Scalars['String']['input']>;
  deviceCode: Scalars['ID']['input'];
  /** Name to give a newly created device (ignored if the device already exists). */
  deviceName?: InputMaybe<Scalars['String']['input']>;
  hub: Scalars['ID']['input'];
};

export type AcceptHubDeviceCodeInput = {
  allowIonscale?: Scalars['Boolean']['input'];
  /** The user-facing code the device displayed — proof that the approver actually saw the enrolment request */
  code: Scalars['String']['input'];
  deviceCode: Scalars['ID']['input'];
  organization: Scalars['ID']['input'];
};

export type AcceptInviteInput = {
  token: Scalars['String']['input'];
};

export type AcceptMeshDeviceCodeInput = {
  /** The user-facing code the device displayed — proof that the approver actually saw the enrolment request */
  code: Scalars['String']['input'];
  deviceCode: Scalars['ID']['input'];
  ephemeral?: Scalars['Boolean']['input'];
  machineName?: InputMaybe<Scalars['String']['input']>;
  organization: Scalars['ID']['input'];
  tags?: InputMaybe<Array<Scalars['String']['input']>>;
};

export type AddDeviceToGroupInput = {
  device: Scalars['ID']['input'];
  deviceGroup: Scalars['ID']['input'];
};

/** App(id, name, identifier, organization, logo) */
export type AppFilter = {
  AND?: InputMaybe<AppFilter>;
  DISTINCT?: InputMaybe<Scalars['Boolean']['input']>;
  NOT?: InputMaybe<AppFilter>;
  OR?: InputMaybe<AppFilter>;
  ids?: InputMaybe<Array<Scalars['ID']['input']>>;
  search?: InputMaybe<Scalars['String']['input']>;
};

export type ApproveMembershipRequestInput = {
  id: Scalars['ID']['input'];
  /** Identifiers of the roles the new member gets. Defaults to `guest`. */
  roles?: InputMaybe<Array<Scalars['String']['input']>>;
};

export type CancelInviteInput = {
  id: Scalars['ID']['input'];
};

export type ChangeOrganizationOwnerInput = {
  /** The user who becomes the new owner. Must already be a member. */
  newOwner: Scalars['ID']['input'];
  /** The organization to transfer. */
  organization: Scalars['ID']['input'];
};

export const ClientKind = {
  Desktop: 'DESKTOP',
  Development: 'DEVELOPMENT',
  Hub: 'HUB',
  Mobile: 'MOBILE',
  RelyingParty: 'RELYING_PARTY',
  Website: 'WEBSITE'
} as const;

export type ClientKind = typeof ClientKind[keyof typeof ClientKind];
export const ClientRole = {
  Agent: 'AGENT',
  Interface: 'INTERFACE'
} as const;

export type ClientRole = typeof ClientRole[keyof typeof ClientRole];
export type ConnectKommunityPartnerInput = {
  licenseSignature?: InputMaybe<Scalars['String']['input']>;
  organizationId: Scalars['ID']['input'];
  partnerId: Scalars['ID']['input'];
};

export type CreateAliasInput = {
  host?: InputMaybe<Scalars['String']['input']>;
  instance: Scalars['ID']['input'];
  kind: Scalars['String']['input'];
  path?: InputMaybe<Scalars['String']['input']>;
  port: Scalars['Int']['input'];
  public?: Scalars['Boolean']['input'];
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
  public?: Scalars['Boolean']['input'];
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
  /** Deprecated — the mesh is a per-organization singleton; ignored. */
  name?: InputMaybe<Scalars['String']['input']>;
  /** The ID of the organization to enable the mesh for. */
  organizationId: Scalars['ID']['input'];
};

export type CreateOrganizationInput = {
  brandChroma?: InputMaybe<Scalars['Float']['input']>;
  brandHue?: InputMaybe<Scalars['Float']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  slug?: InputMaybe<Scalars['String']['input']>;
};

export type CreateOrganizationProfileInput = {
  name: Scalars['String']['input'];
  organization: Scalars['ID']['input'];
};

export type CreateProfileInput = {
  bio?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  user: Scalars['ID']['input'];
};

export type CreateRedeemTokenInput = {
  expiresInDays?: InputMaybe<Scalars['Int']['input']>;
  hub: Scalars['ID']['input'];
};

export type CreateRoleSetInput = {
  name: Scalars['String']['input'];
  organization: Scalars['ID']['input'];
  roles?: InputMaybe<Array<Scalars['ID']['input']>>;
};

export type DeclineDeviceCodeInput = {
  /** The code the device displayed. Proves the caller was actually shown this enrolment; without it, a guessed id is enough to deny someone else's. Optional only until clients are updated to send it. */
  code?: InputMaybe<Scalars['String']['input']>;
  deviceCode: Scalars['ID']['input'];
};

export type DeclineHubDeviceCodeInput = {
  /** The code the device displayed. Proves the caller was actually shown this enrolment; without it, a guessed id is enough to deny someone else's. Optional only until clients are updated to send it. */
  code?: InputMaybe<Scalars['String']['input']>;
  deviceCode: Scalars['ID']['input'];
};

export type DeclineInviteInput = {
  token: Scalars['String']['input'];
};

export type DeclineMembershipRequestInput = {
  id: Scalars['ID']['input'];
};

export type DeclineMeshDeviceCodeInput = {
  /** The code the machine displayed. Proves the caller was actually shown this join request; without it, a guessed id is enough to deny someone else's. Optional only until clients are updated to send it. */
  code?: InputMaybe<Scalars['String']['input']>;
  deviceCode: Scalars['ID']['input'];
};

/** An app this organization's deep links may open. */
export type DeeplinkAppInput = {
  /** An https page where the app can be installed. */
  installUrl?: InputMaybe<Scalars['String']['input']>;
  /** Whether the app also exists on phones and tablets. */
  mobile?: Scalars['Boolean']['input'];
  /** Display name. Defaults to the capitalised protocol. */
  name?: InputMaybe<Scalars['String']['input']>;
  /** The app's URL scheme, e.g. 'orkestrator'. */
  protocol: Scalars['String']['input'];
};

export type DeleteAliasInput = {
  id: Scalars['ID']['input'];
};

export type DeleteDeviceGroupInput = {
  id: Scalars['ID']['input'];
};

export type DeleteDeviceInput = {
  id: Scalars['ID']['input'];
};

export type DeleteHubInput = {
  id: Scalars['ID']['input'];
};

export type DeleteIonscaleLayerInput = {
  /** The mesh to disable. Irreversible: the tailnet and every machine enrolled in it are deleted on ionscale as well. */
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

export type DeleteRoleSetInput = {
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

export const LayerKind = {
  Base: 'BASE',
  Ionscale: 'IONSCALE',
  Tailnet: 'TAILNET',
  Vpn: 'VPN'
} as const;

export type LayerKind = typeof LayerKind[keyof typeof LayerKind];
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


/** An App is the Arkitekt equivalent of a Software Application. It is a collection of `Releases` that can be all part of the same application. E.g the App `Napari` could have the releases `0.1.0` and `0.2.0`. */
export type ManagementAppReleasesArgs = {
  ordering?: Array<ManagementReleaseOrdering>;
};

export type ManagementAppOrdering =
  { id: Ordering; name?: never; }
  |  { id?: never; name: Ordering; };

/**
 * A client is a way of authenticating users with a release.
 *  The strategy of authentication is defined by the kind of client. And allows for different authentication flow.
 *  E.g a client can be a DESKTOP app, that might be used by multiple users, or a WEBSITE that wants to connect to a user's account,
 *  but also a DEVELOPMENT client that is used by a developer to test the app. The client model thinly wraps the oauth2 client model, which is used to authenticate users.
 */
export type ManagementClient = {
  __typename?: 'ManagementClient';
  /** The device (compute node) this client runs on, if it registered one. */
  device?: Maybe<ManagementDevice>;
  /** Is this client functional? A non-functional client cannot be used to authenticate users. */
  functional: Scalars['Boolean']['output'];
  id: Scalars['ID']['output'];
  /** The issue url of the client. This is the url where users can report issues and get more information about the client. */
  issueUrl?: Maybe<Scalars['String']['output']>;
  /** The kind of the client. The kind defines the authentication flow that is used to authenticate users with this client. */
  kind: ClientKind;
  /** The most recent report where the client was functional; null if it has never reported healthy. */
  lastHealthyReport?: Maybe<ManagementReport>;
  /** The last time the client reported in. This is used to determine if the client is active or not. */
  lastReportedAt?: Maybe<Scalars['DateTime']['output']>;
  /** The client's most recent report; null if it has never reported. */
  latestReport?: Maybe<ManagementReport>;
  /** Has an operator acknowledged this client's most recent report? Reset by every incoming report. */
  latestReportResolved: Scalars['Boolean']['output'];
  /** The logo of the release. This should be a url to a logo that can be used to represent the release. */
  logo?: Maybe<ManagementMediaStore>;
  /** The app manifest this client was registered with, if it parses. */
  manifest?: Maybe<ManagementStagingManifest>;
  /** The mappings of the client. A mapping is a mapping of a service to a service instance. This is used to configure the hub. */
  mappings: Array<ManagementServiceInstanceMapping>;
  /** The name of the client. This is a human readable name of the client. */
  name: Scalars['String']['output'];
  /** The organization this client is bound to. Null until a registration is approved, and for global relying-party clients. */
  organization?: Maybe<ManagementOrganization>;
  /** Is this client being asked to re-report its configuration? True until the client's next report arrives. */
  pleaseReport: Scalars['Boolean']['output'];
  /** Is this client public? A public client has no client secret and authenticates through a user-facing flow (device code / PKCE) instead. */
  public: Scalars['Boolean']['output'];
  /** The public sources of the client. These are the public sources where users can find more information about the client. */
  publicSources: Array<ManagementPublicSource>;
  /** The release that this client belongs to. Null for clients that are not bound to an app release: hub identities, relying parties, and registrations that are still awaiting approval. */
  release?: Maybe<ManagementRelease>;
  /** When an operator asked this client to re-report its configuration; null when nothing is pending. While set, the client's token responses carry `please_report`. */
  reportRequestedAt?: Maybe<Scalars['DateTime']['output']>;
  /** The operator who asked this client to re-report. */
  reportRequestedBy?: Maybe<ManagementUser>;
  /** The retained self-reports of this client, most recent first. */
  reports: Array<ManagementReport>;
  /** The operational role of the client: INTERFACE (a human interface operated by a user) vs AGENT (an autonomous client authorized once that then runs unattended, receiving tasks). */
  role: ClientRole;
  /** The scopes that are granted to this client. */
  scopes: Array<ManagementScope>;
  /** The aliases that are used by this client. */
  usedAliases: Array<ManagementUsedAlias>;
  /** The user this client acts for (derived from its membership). */
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
  ordering?: Array<ManagementServiceInstanceMappingOrdering>;
  pagination?: InputMaybe<OffsetPaginationInput>;
};


/**
 * A client is a way of authenticating users with a release.
 *  The strategy of authentication is defined by the kind of client. And allows for different authentication flow.
 *  E.g a client can be a DESKTOP app, that might be used by multiple users, or a WEBSITE that wants to connect to a user's account,
 *  but also a DEVELOPMENT client that is used by a developer to test the app. The client model thinly wraps the oauth2 client model, which is used to authenticate users.
 */
export type ManagementClientReportsArgs = {
  filters?: InputMaybe<ManagementReportFilter>;
  ordering?: Array<ManagementReportOrdering>;
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
  ordering?: Array<ManagementScopeOrdering>;
  pagination?: InputMaybe<OffsetPaginationInput>;
};


/**
 * A client is a way of authenticating users with a release.
 *  The strategy of authentication is defined by the kind of client. And allows for different authentication flow.
 *  E.g a client can be a DESKTOP app, that might be used by multiple users, or a WEBSITE that wants to connect to a user's account,
 *  but also a DEVELOPMENT client that is used by a developer to test the app. The client model thinly wraps the oauth2 client model, which is used to authenticate users.
 */
export type ManagementClientUsedAliasesArgs = {
  ordering?: Array<ManagementUsedAliasOrdering>;
  pagination?: InputMaybe<OffsetPaginationInput>;
};

/**
 * The one client model: every OAuth2 principal is a row here.
 *
 * Kinds of rows and their lifecycle:
 *
 * - **App clients** (`development`/`website`/`desktop`/`mobile`): the row is created by
 *   dynamic registration at ``/o/app-authorization/`` with identity fields
 *   only; human approval *binds* it (membership, organization, release, hub,
 *   mappings, scope). ``membership`` null == not yet approved.
 * - **Hub identities** (`hub`): same lifecycle via ``/o/hub-authorization/``;
 *   the created ``Hub`` links back via ``Hub.client`` (reverse:
 *   ``client.hub_identity``).
 * - **Relying parties** (`relying_party`): confidential OIDC clients
 *   provisioned from config by ``ensureopenid``; global (no organization).
 *
 * Implements authlib's ``ClientMixin`` directly — there is no separate
 * OAuth2 client table anymore.
 */
export type ManagementClientFilter = {
  AND?: InputMaybe<ManagementClientFilter>;
  DISTINCT?: InputMaybe<Scalars['Boolean']['input']>;
  NOT?: InputMaybe<ManagementClientFilter>;
  OR?: InputMaybe<ManagementClientFilter>;
  functional?: InputMaybe<Scalars['Boolean']['input']>;
  hub?: InputMaybe<Scalars['ID']['input']>;
  ids?: InputMaybe<Array<Scalars['ID']['input']>>;
  latestReportResolved?: InputMaybe<Scalars['Boolean']['input']>;
  organization?: InputMaybe<Scalars['ID']['input']>;
  role?: InputMaybe<ClientRole>;
  search?: InputMaybe<Scalars['String']['input']>;
};

export type ManagementClientOrdering =
  { createdAt: Ordering; id?: never; lastReportedAt?: never; name?: never; }
  |  { createdAt?: never; id: Ordering; lastReportedAt?: never; name?: never; }
  |  { createdAt?: never; id?: never; lastReportedAt: Ordering; name?: never; }
  |  { createdAt?: never; id?: never; lastReportedAt?: never; name: Ordering; };

/** A communication channel (e.g. a push-notification endpoint) through which a user can be notified. */
export type ManagementComChannel = {
  __typename?: 'ManagementComChannel';
  id: Scalars['ID']['output'];
  user: ManagementUser;
};

/** A Channel to send notifications to a user */
export type ManagementComChannelFilter = {
  AND?: InputMaybe<ManagementComChannelFilter>;
  DISTINCT?: InputMaybe<Scalars['Boolean']['input']>;
  NOT?: InputMaybe<ManagementComChannelFilter>;
  OR?: InputMaybe<ManagementComChannelFilter>;
  ids?: InputMaybe<Array<Scalars['ID']['input']>>;
  search?: InputMaybe<Scalars['String']['input']>;
};

/** An app an organization's deep links may open. */
export type ManagementDeeplinkApp = {
  __typename?: 'ManagementDeeplinkApp';
  /** An https page where the app can be installed, if the organization set one. */
  installUrl?: Maybe<Scalars['String']['output']>;
  /** Whether the app also exists on phones and tablets. */
  mobile: Scalars['Boolean']['output'];
  /** The app's display name. */
  name: Scalars['String']['output'];
  /** The app's URL scheme, e.g. 'orkestrator'. */
  protocol: Scalars['String']['output'];
};

/** Device(id, node_id, name, organization) */
export type ManagementDevice = {
  __typename?: 'ManagementDevice';
  clients: Array<ManagementClient>;
  /** The device groups that belong to this compute node. */
  deviceGroups: Array<ManagementDeviceGroup>;
  /** The (per-organization hashed) id of the device. */
  deviceId: Scalars['ID']['output'];
  id: Scalars['ID']['output'];
  name?: Maybe<Scalars['String']['output']>;
  /** @deprecated Use deviceId. */
  nodeId: Scalars['ID']['output'];
  /** The organization that owns this compute node. */
  organization: ManagementOrganization;
  /** The service instances that are associated with this compute node. */
  serviceInstances: Array<ManagementServiceInstance>;
};


/** Device(id, node_id, name, organization) */
export type ManagementDeviceClientsArgs = {
  filters?: InputMaybe<ManagementClientFilter>;
  ordering?: Array<ManagementClientOrdering>;
  pagination?: InputMaybe<OffsetPaginationInput>;
};


/** Device(id, node_id, name, organization) */
export type ManagementDeviceDeviceGroupsArgs = {
  filters?: InputMaybe<ManagementDeviceGroupFilter>;
  ordering?: Array<ManagementDeviceGroupOrdering>;
  pagination?: InputMaybe<OffsetPaginationInput>;
};


/** Device(id, node_id, name, organization) */
export type ManagementDeviceServiceInstancesArgs = {
  filters?: InputMaybe<ManagementServiceInstanceFilter>;
  ordering?: Array<ManagementServiceInstanceOrdering>;
  pagination?: InputMaybe<OffsetPaginationInput>;
};

/** A DeviceCode is used for the device code flow for client authentication. */
export type ManagementDeviceCode = {
  __typename?: 'ManagementDeviceCode';
  /** The (bound) client this code was accepted into. Null while pending — the staged registration exists but is not approved yet. */
  client?: Maybe<ManagementClient>;
  code: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  denied: Scalars['Boolean']['output'];
  expiresAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  /** Clients the caller already approved for this app on this device, most recently seen first. Empty when the manifest carries no device id or nothing matches. Scoped to the caller's own approvals in organizations they belong to. */
  priorAuthorizations: Array<ManagementPriorAuthorization>;
  /** Whether the app asked for a pre-authorized key to the organization's mesh. Accepting with `allowIonscale` (the default) grants it. */
  requestAuthKey: Scalars['Boolean']['output'];
  /** The requested client kind (written onto the staged client at registration) */
  stagingKind: Scalars['String']['output'];
  /** The staging manifest for this device code */
  stagingManifest?: Maybe<ManagementStagingManifest>;
  /** Whether this device code is for a public client */
  stagingPublic: Scalars['Boolean']['output'];
};

/** Device(id, node_id, name, organization) */
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

export type ManagementDeviceGroupOrdering =
  { id: Ordering; name?: never; }
  |  { id?: never; name: Ordering; };

export type ManagementDeviceOrdering =
  { id: Ordering; name?: never; }
  |  { id?: never; name: Ordering; };

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
  /** Not available for GitHub accounts; always null. */
  identifier?: Maybe<Scalars['String']['output']>;
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
 * A Profile of a Group. A Profile can be used to display personalised information about a group.
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

/** A Hub is a collection of service instances and clients that work together. It represents a deployable configuration for an organization. */
export type ManagementHub = {
  __typename?: 'ManagementHub';
  /** The clients that are part of this hub. A client is an application that uses the services in the hub. */
  clients: Array<ManagementClient>;
  /** The user who created this hub */
  creator: ManagementUser;
  /** The description of the hub. This should be a human readable description of the hub. */
  description?: Maybe<Scalars['String']['output']>;
  /** The hub's most recent health reports, newest first. */
  healthSnapshots: Array<ManagementHubHealthSnapshot>;
  id: Scalars['ID']['output'];
  /** The instances of the hub. A service instance is a configured instance of a service. */
  instances: Array<ManagementServiceInstance>;
  /** Whether the hub's last health report said it was healthy. */
  lastHealthy?: Maybe<Scalars['Boolean']['output']>;
  /** When the hub last reported its health. Null if it never has. */
  lastSeenAt?: Maybe<Scalars['DateTime']['output']>;
  /** Whether the hub's last health report said its node is on the mesh. Null if it never reported mesh state. */
  meshConnected?: Maybe<Scalars['Boolean']['output']>;
  /** The hub node's MagicDNS name (or mesh IP), as last reported by the hub. */
  meshHost: Scalars['String']['output'];
  /** The name of the hub */
  name: Scalars['String']['output'];
  /** Whether the hub has reported its health within the last three reporting intervals. */
  online: Scalars['Boolean']['output'];
  /** The organization that owns this hub. */
  organization: ManagementOrganization;
  /** The hub software version, as last reported. */
  version: Scalars['String']['output'];
};


/** A Hub is a collection of service instances and clients that work together. It represents a deployable configuration for an organization. */
export type ManagementHubClientsArgs = {
  filters?: InputMaybe<ManagementClientFilter>;
  ordering?: Array<ManagementClientOrdering>;
  pagination?: InputMaybe<OffsetPaginationInput>;
};


/** A Hub is a collection of service instances and clients that work together. It represents a deployable configuration for an organization. */
export type ManagementHubInstancesArgs = {
  filters?: InputMaybe<ManagementServiceInstanceFilter>;
  ordering?: Array<ManagementServiceInstanceOrdering>;
  pagination?: InputMaybe<OffsetPaginationInput>;
};

/** A HubDeviceCode is a hub-kind staged authorization (unified DeviceCode model). */
export type ManagementHubDeviceCode = {
  __typename?: 'ManagementHubDeviceCode';
  code: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  denied: Scalars['Boolean']['output'];
  expiresAt: Scalars['DateTime']['output'];
  /** The hub this code was accepted into. Null while pending, and null unless the caller is a member of the hub's organization. */
  hub?: Maybe<ManagementHub>;
  id: Scalars['ID']['output'];
  /** The hub manifest for this device code */
  manifest?: Maybe<ManagementHubManifest>;
};

/** Hub(id, name, organization, identifier, description, creator, client, token, auth_key, last_seen_at, last_healthy, version, mesh_connected, mesh_host) */
export type ManagementHubFilter = {
  AND?: InputMaybe<ManagementHubFilter>;
  DISTINCT?: InputMaybe<Scalars['Boolean']['input']>;
  NOT?: InputMaybe<ManagementHubFilter>;
  OR?: InputMaybe<ManagementHubFilter>;
  ids?: InputMaybe<Array<Scalars['ID']['input']>>;
  organization?: InputMaybe<Scalars['ID']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
};

/** One health report a hub posted to /f/hubhealth/. */
export type ManagementHubHealthSnapshot = {
  __typename?: 'ManagementHubHealthSnapshot';
  createdAt: Scalars['DateTime']['output'];
  /** Did the hub report itself healthy? */
  healthy: Scalars['Boolean']['output'];
  id: Scalars['ID']['output'];
  /** The per-instance health the hub reported. */
  instances: Array<ManagementInstanceHealth>;
};

export type ManagementHubManifest = {
  __typename?: 'ManagementHubManifest';
  clients: Array<ManagementStagingClientRequest>;
  /** A unique identifier for the hub WITHIN the organization. */
  identifier: Scalars['String']['output'];
  instances: Array<ManagementStagingInstanceRequest>;
};

export type ManagementHubOrdering =
  { id: Ordering; name?: never; }
  |  { id?: never; name: Ordering; };

/** An alias for a service instance. This is used to provide a more user-friendly name for the instance. */
export type ManagementInstanceAlias = {
  __typename?: 'ManagementInstanceAlias';
  /** The challenge of the alias. This is used to verify that the alias is reachable. */
  challenge: Scalars['String']['output'];
  /** The host of the alias (e.g. 'example.com'). Not set for a mesh alias, which resolves to its hub node's MagicDNS name. */
  host?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  /** The instance that this alias belongs to. */
  instance: ManagementServiceInstance;
  /** The kind of alias (absolute, mesh or docker). A mesh alias has no host of its own: it resolves to its hub node's MagicDNS name. A docker alias is only reachable from inside the hub's own docker environment. */
  kind: Scalars['String']['output'];
  /** The layer that this alias belongs to. */
  layer?: Maybe<ManagementLayer>;
  /** The name of the alias. */
  name?: Maybe<Scalars['String']['output']>;
  /** The organization that owns this alias (via the instance). */
  organization: ManagementOrganization;
  /** The path of the alias (e.g. 'path' for 'example.com/path'). */
  path?: Maybe<Scalars['String']['output']>;
  /** The port of the alias (e.g. 8080 for 'example.com:8080'). If not set, the scheme's default port is used. */
  port?: Maybe<Scalars['Int']['output']>;
  /** Is this alias publicly reachable? If true, the coordination server can also check the alias's health directly, enabling health checks from the kontrol interface. */
  public: Scalars['Boolean']['output'];
  /** For a mesh alias, the host it currently resolves to (its hub node's MagicDNS name, or mesh IP). Null for other kinds, or while the hub is not on the mesh. */
  resolvedHost?: Maybe<Scalars['String']['output']>;
  /** The scope of the alias. E.g 'local' means that the alias can only be used within the local network. */
  scope: Scalars['String']['output'];
  /** Is this alias using SSL? If true, the alias will be accessed via https:// instead of http://. */
  ssl: Scalars['Boolean']['output'];
  /** The usages of this alias by clients. */
  usages: Array<ManagementUsedAlias>;
};


/** An alias for a service instance. This is used to provide a more user-friendly name for the instance. */
export type ManagementInstanceAliasUsagesArgs = {
  ordering?: Array<ManagementUsedAliasOrdering>;
  pagination?: InputMaybe<OffsetPaginationInput>;
};

/** An alias for a service instance. This is used to provide a more user-friendly name for the instance. */
export type ManagementInstanceAliasFilter = {
  AND?: InputMaybe<ManagementInstanceAliasFilter>;
  DISTINCT?: InputMaybe<Scalars['Boolean']['input']>;
  NOT?: InputMaybe<ManagementInstanceAliasFilter>;
  OR?: InputMaybe<ManagementInstanceAliasFilter>;
  ids?: InputMaybe<Array<Scalars['ID']['input']>>;
  search?: InputMaybe<Scalars['String']['input']>;
};

export type ManagementInstanceAliasOrdering =
  { id: Ordering; name?: never; }
  |  { id?: never; name: Ordering; };

/** The health one instance reported in a hub health report. */
export type ManagementInstanceHealth = {
  __typename?: 'ManagementInstanceHealth';
  healthy: Scalars['Boolean']['output'];
  /** The instance identifier the hub reported under. */
  identifier: Scalars['String']['output'];
  reason?: Maybe<Scalars['String']['output']>;
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
  /** The e-mail address this invite was addressed to, if any. Only visible to the organization's owner and admins. */
  email?: Maybe<Scalars['String']['output']>;
  expiresAt?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['ID']['output'];
  /** Get the full URL for accepting this invite */
  inviteUrl: Scalars['String']['output'];
  /** If true, anyone with the link can preview the invitation (organization, inviter, expiry) before signing in. Private invites require authentication before any details are shown. */
  public: Scalars['Boolean']['output'];
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
  ordering?: Array<ManagementMembershipOrdering>;
  pagination?: InputMaybe<OffsetPaginationInput>;
};


/** A single-use magic invite link that allows one person to join an organization. */
export type ManagementInviteRolesArgs = {
  filters?: InputMaybe<ManagementRoleFilter>;
  ordering?: Array<ManagementRoleOrdering>;
  pagination?: InputMaybe<OffsetPaginationInput>;
};

/** Invite(id, token, email, created_by, created_for, created_at, expires_at, public, status, accepted_by, declined_by, responded_at) */
export type ManagementInviteFilter = {
  AND?: InputMaybe<ManagementInviteFilter>;
  DISTINCT?: InputMaybe<Scalars['Boolean']['input']>;
  NOT?: InputMaybe<ManagementInviteFilter>;
  OR?: InputMaybe<ManagementInviteFilter>;
  ids?: InputMaybe<Array<Scalars['ID']['input']>>;
  organization?: InputMaybe<Scalars['ID']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
};

/** IonscaleAuthKey(id, hub, layer, key, created_at, creator, ephemeral, tags) */
export type ManagementIonscaleAuthKey = {
  __typename?: 'ManagementIonscaleAuthKey';
  createdAt: Scalars['DateTime']['output'];
  creator: ManagementUser;
  ephemeral: Scalars['Boolean']['output'];
  id: Scalars['ID']['output'];
  /** The pre-authorized mesh key. A live mesh-join credential: only returned to the key's creator and to the organization's owner/admins, null for everyone else. */
  key?: Maybe<Scalars['String']['output']>;
  layer: ManagementLayer;
  tags: Array<Scalars['String']['output']>;
};

/** IonscaleAuthKey(id, hub, layer, key, created_at, creator, ephemeral, tags) */
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

export type ManagementIonscaleAuthKeyOrdering =
  { createdAt: Ordering; id?: never; }
  |  { createdAt?: never; id: Ordering; };

/** A KommunityPartner represents a pre-configured partner that can provide hubs and services to organizations. Partners can be auto-configured to automatically create hubs for new organizations. */
export type ManagementKommunityPartner = {
  __typename?: 'ManagementKommunityPartner';
  /** Check if this partner applies to the current user based on filter conditions. */
  appliesToMe: Scalars['Boolean']['output'];
  /** The authentication URL of the partner. */
  authUrl?: Maybe<Scalars['String']['output']>;
  /** Whether this partner should automatically create hubs for new organizations. */
  autoConfigure: Scalars['Boolean']['output'];
  /** The description of the partner. */
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  /** The unique identifier of the partner. */
  identifier: Scalars['String']['output'];
  /** A larger marketing image URL for the partner. */
  imageUrl?: Maybe<Scalars['String']['output']>;
  /** The kind of kommunity (e.g., 'open', 'restricted', 'private'). */
  kommunityKind: Scalars['String']['output'];
  /** Optional license agreement text that must be signed before connecting this partner. */
  licenseAgreement?: Maybe<Scalars['String']['output']>;
  /** The logo URL of the partner. */
  logoUrl?: Maybe<Scalars['String']['output']>;
  /** The name of the partner. */
  name: Scalars['String']['output'];
  /** The OAuth2 client associated with this partner, if any. */
  oauthClient?: Maybe<ManagementOAuth2Client>;
  /** The kind of partner (e.g., 'preauthorized', 'oauth2'). */
  partnerKind: Scalars['String']['output'];
  /** A short description of the partner for cards and previews. */
  shortDescription?: Maybe<Scalars['String']['output']>;
  /** The website URL of the partner. */
  websiteUrl?: Maybe<Scalars['String']['output']>;
};

/** KommunityPartner(id, name, description, short_description, logo_url, image_url, website_url, identifier, auth_url, license_agreement, pre_authorize_hook, pre_authorize_token, oauth_client, partner_kind, kommunity_kind, auto_configure, preconfigured_hub, filter_config) */
export type ManagementKommunityPartnerFilter = {
  AND?: InputMaybe<ManagementKommunityPartnerFilter>;
  DISTINCT?: InputMaybe<Scalars['Boolean']['input']>;
  NOT?: InputMaybe<ManagementKommunityPartnerFilter>;
  OR?: InputMaybe<ManagementKommunityPartnerFilter>;
  applicableForMe?: InputMaybe<Scalars['Boolean']['input']>;
  autoConfigure?: InputMaybe<Scalars['Boolean']['input']>;
  hasPreconfiguredHub?: InputMaybe<Scalars['Boolean']['input']>;
  ids?: InputMaybe<Array<Scalars['ID']['input']>>;
  search?: InputMaybe<Scalars['String']['input']>;
};

export type ManagementKommunityPartnerOrdering =
  { id: Ordering; name?: never; }
  |  { id?: never; name: Ordering; };

/** A Layer is a transport layer that needs to be used to reach an alias. E.g a VPN layer or a Tor layer. */
export type ManagementLayer = {
  __typename?: 'ManagementLayer';
  /** The aliases that are reachable through this layer. An alias is a way to reach a service instance over this transport layer. */
  aliases: Array<ManagementInstanceAlias>;
  /** The auth keys that are associated with this layer. */
  authKeys: Array<ManagementIonscaleAuthKey>;
  /** The description of the layer. This should be a human readable description of the layer. */
  description?: Maybe<Scalars['String']['output']>;
  /** Whether HTTPS certificates are enabled for this mesh. Requires MagicDNS. */
  httpsEnabled: Scalars['Boolean']['output'];
  id: Scalars['ID']['output'];
  /** The kind of the layer. E.g. `VPN` or `TOR` */
  kind: LayerKind;
  /** The logo of the layer. This should be a url to a logo that can be used to represent the layer. */
  logo?: Maybe<ManagementMediaStore>;
  /** A specific machine associated with this layer (only works for IonscaleLayers) */
  machine?: Maybe<ManagementMachine>;
  /** The machines associated with this layer (only works for IonscaleLayers) */
  machines: Array<ManagementMachine>;
  /** Whether MagicDNS is enabled for this mesh. */
  magicDnsEnabled: Scalars['Boolean']['output'];
  /** The name of the layer */
  name: Scalars['String']['output'];
  /** The organization that owns this alias. */
  organization: ManagementOrganization;
  /** Tailnet lock status for this mesh (only works for IonscaleLayers). Null when the layer has no tailnet or ionscale is unreachable. */
  tailnetLock?: Maybe<ManagementTailnetLockStatus>;
  /** The tailnet name of the layer. This is only set for Ionscale layers. */
  tailnetName: Scalars['String']['output'];
};


/** A Layer is a transport layer that needs to be used to reach an alias. E.g a VPN layer or a Tor layer. */
export type ManagementLayerAliasesArgs = {
  filters?: InputMaybe<ManagementInstanceAliasFilter>;
  ordering?: Array<ManagementInstanceAliasOrdering>;
  pagination?: InputMaybe<OffsetPaginationInput>;
};


/** A Layer is a transport layer that needs to be used to reach an alias. E.g a VPN layer or a Tor layer. */
export type ManagementLayerAuthKeysArgs = {
  filters?: InputMaybe<ManagementIonscaleAuthKeyFilter>;
  ordering?: Array<ManagementIonscaleAuthKeyOrdering>;
  pagination?: InputMaybe<OffsetPaginationInput>;
};


/** A Layer is a transport layer that needs to be used to reach an alias. E.g a VPN layer or a Tor layer. */
export type ManagementLayerMachineArgs = {
  id: Scalars['String']['input'];
};

/** IonscaleLayer(id, name, identifier, organization, logo, description, dns_probe, get_probe, kind, layer_ptr, tailnet_name, magic_dns_enabled, https_enabled) */
export type ManagementLayerFilter = {
  AND?: InputMaybe<ManagementLayerFilter>;
  DISTINCT?: InputMaybe<Scalars['Boolean']['input']>;
  NOT?: InputMaybe<ManagementLayerFilter>;
  OR?: InputMaybe<ManagementLayerFilter>;
  ids?: InputMaybe<Array<Scalars['ID']['input']>>;
  organization?: InputMaybe<Scalars['ID']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
};

export type ManagementLayerOrdering =
  { id: Ordering; name?: never; }
  |  { id?: never; name: Ordering; };

/** The public face of a shared link: which organization it leads into and who shared it. Each part is null unless its subject opted in. */
export type ManagementLinkPreview = {
  __typename?: 'ManagementLinkPreview';
  inviter?: Maybe<ManagementLinkPreviewUser>;
  organization?: Maybe<ManagementLinkPreviewOrganization>;
};

/** What a link page may show about the organization a link belongs to. Only for organizations that opted in. */
export type ManagementLinkPreviewOrganization = {
  __typename?: 'ManagementLinkPreviewOrganization';
  avatar?: Maybe<ManagementMediaStore>;
  description?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  slug: Scalars['String']['output'];
};

/** What a link page may show about the person who shared a link. Only for users who opted in. */
export type ManagementLinkPreviewUser = {
  __typename?: 'ManagementLinkPreviewUser';
  avatar?: Maybe<ManagementMediaStore>;
  name: Scalars['String']['output'];
};

export type ManagementMachine = {
  __typename?: 'ManagementMachine';
  /** Whether the machine is authorized on the tailnet, or null when unknown. */
  authorized?: Maybe<Scalars['Boolean']['output']>;
  connected: Scalars['Boolean']['output'];
  ephemeral: Scalars['Boolean']['output'];
  id: Scalars['ID']['output'];
  ipv4?: Maybe<Scalars['String']['output']>;
  ipv6?: Maybe<Scalars['String']['output']>;
  /** Whether the machine is an external node (belongs to another tailnet), or null when unknown. */
  isExternal?: Maybe<Scalars['Boolean']['output']>;
  /** When the machine's node key expires, if key expiry is enabled. */
  keyExpiry?: Maybe<Scalars['DateTime']['output']>;
  lastSeen?: Maybe<Scalars['DateTime']['output']>;
  localId: Scalars['String']['output'];
  /** The machine's MagicDNS name (e.g. `myhost.mytailnet.mesh.example.com`), or null when MagicDNS is disabled for the mesh or no suffix is configured. */
  magicDnsName?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  /** The operating system reported by the machine, if known. */
  os?: Maybe<Scalars['String']['output']>;
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
  path?: Maybe<Scalars['String']['output']>;
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
  /** Whether this organization is allowed to push notifications to the member's registered devices. */
  allowNotifications: Scalars['Boolean']['output'];
  /** The member's personal brand chroma (0–1) for this organization, if set. */
  brandChroma?: Maybe<Scalars['Float']['output']>;
  /** The member's personal brand hue (0–360) for this organization, if set. */
  brandHue?: Maybe<Scalars['Float']['output']>;
  /** The invite that created this membership */
  createdThrough?: Maybe<ManagementInvite>;
  /** Whether the member has at least one device registered for notifications (e.g. through the companion app). Opting in does nothing until they do. */
  hasNotificationChannel: Scalars['Boolean']['output'];
  id: Scalars['ID']['output'];
  /** Whether this member owns the organization. The owner cannot be removed by others; ownership must be transferred first. */
  isOwner: Scalars['Boolean']['output'];
  organization: ManagementOrganization;
  /** The role requests this member has made in the organization */
  roleRequests: Array<ManagementRoleRequest>;
  /** The roles that the user has in the organization */
  roles: Array<ManagementRole>;
  user: ManagementUser;
};


/**
 *
 * A Membership is a relation between a User and an Organization. It can have multiple Roles assigned to it.
 *
 */
export type ManagementMembershipRoleRequestsArgs = {
  filters?: InputMaybe<ManagementRoleRequestFilter>;
  ordering?: Array<ManagementRoleRequestOrdering>;
  pagination?: InputMaybe<OffsetPaginationInput>;
};


/**
 *
 * A Membership is a relation between a User and an Organization. It can have multiple Roles assigned to it.
 *
 */
export type ManagementMembershipRolesArgs = {
  filters?: InputMaybe<ManagementRoleFilter>;
  ordering?: Array<ManagementRoleOrdering>;
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

export type ManagementMembershipOrdering =
  { id: Ordering; };

/** A request of a user who is not a member of an organization to become one. Its owner or an admin approves or declines it. */
export type ManagementMembershipRequest = {
  __typename?: 'ManagementMembershipRequest';
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  /** An optional note from the user explaining the request. */
  reason?: Maybe<Scalars['String']['output']>;
  /** The status of the request: pending, approved, or declined. */
  status: Scalars['String']['output'];
  /** The user who asks to join. Not a member yet, so they are visible here and nowhere else. */
  user: ManagementUser;
};

/** A MeshDeviceCode is used for the device-code flow that lets a machine join an organization's mesh. */
export type ManagementMeshDeviceCode = {
  __typename?: 'ManagementMeshDeviceCode';
  code: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  denied: Scalars['Boolean']['output'];
  description?: Maybe<Scalars['String']['output']>;
  expiresAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  machineName?: Maybe<Scalars['String']['output']>;
  requestedMachineName?: Maybe<Scalars['String']['output']>;
  user?: Maybe<ManagementUser>;
};

/** The outcome of sending a notification to a member. `delivered` counts the devices the push actually reached, so a send to a member with no registered device is visibly a no-op rather than a silent success. */
export type ManagementNotificationResult = {
  __typename?: 'ManagementNotificationResult';
  /** How many registered devices were tried. */
  attempted: Scalars['Int']['output'];
  /** How many of the member's devices accepted the notification. */
  delivered: Scalars['Int']['output'];
  /** The member the notification was addressed to. */
  membership: ManagementMembership;
};

/** The OAuth2 identity view of a (unified) client — what the consent page needs to display. */
export type ManagementOAuth2Client = {
  __typename?: 'ManagementOAuth2Client';
  clientId: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  /** What kind of principal this client is. */
  kind: Scalars['String']['output'];
  name: Scalars['String']['output'];
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
  identifier?: Maybe<ManagementOrcidIdentifier>;
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
  /** Access-token lifetime in seconds for this organization's clients. Null means the server default (one hour). Clamped into the server's allowed range when tokens are issued. */
  accessTokenLifetime?: Maybe<Scalars['Int']['output']>;
  /** The users that are currently active in the organization */
  activeUsers: Array<ManagementUser>;
  /** Whether the currently authenticated user owns this organization or holds its `admin` role — the bar for privileged operations such as adding a hub. */
  amIAdmin: Scalars['Boolean']['output'];
  /** Whether the currently authenticated user is the owner of this organization. */
  amIOwner: Scalars['Boolean']['output'];
  /** The organization's default brand chroma (0–1), if set. Members can override it per-membership. */
  brandChroma?: Maybe<Scalars['Float']['output']>;
  /** The organization's default brand hue (0–360), if set. Members can override it per-membership. */
  brandHue?: Maybe<Scalars['Float']['output']>;
  /** The clients that belong to this organization */
  clients: Array<ManagementClient>;
  /** The apps kontrol may forward this organization's deep links to. The first entry is the default (on a mobile device, the first with `mobile`); an empty list switches forwarding off. */
  deeplinkApps: Array<ManagementDeeplinkApp>;
  /** A short description of the organization */
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  /** the invites for this organization */
  invites: Array<ManagementInvite>;
  /** Pending requests of outsiders to join this organization, oldest first. Empty for anyone but its owner and admins. */
  membershipRequests: Array<ManagementMembershipRequest>;
  /** the memberships of people */
  memberships: Array<ManagementMembership>;
  /** The name of this organization */
  name?: Maybe<Scalars['String']['output']>;
  /** The profile of the organization */
  profile?: Maybe<ManagementOrganizationProfile>;
  /** Whether the organization opted in to showing its name, description and logo on link pages to visitors who are not members. */
  publicLinkPreview: Scalars['Boolean']['output'];
  /** Whether clients created in this organization must present a device_id. None/False means device auth is not required. */
  requireDeviceAuth?: Maybe<Scalars['Boolean']['output']>;
  /** The role sets (named bundles of roles) defined in the organization */
  roleSets: Array<ManagementRoleSet>;
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
  ordering?: Array<ManagementUserOrdering>;
  pagination?: InputMaybe<OffsetPaginationInput>;
};


/** An Organization is a group of users that can work together on a project. */
export type ManagementOrganizationClientsArgs = {
  filters?: InputMaybe<ManagementClientFilter>;
  ordering?: Array<ManagementClientOrdering>;
  pagination?: InputMaybe<OffsetPaginationInput>;
};


/** An Organization is a group of users that can work together on a project. */
export type ManagementOrganizationInvitesArgs = {
  filters?: InputMaybe<ManagementInviteFilter>;
  pagination?: InputMaybe<OffsetPaginationInput>;
};


/** An Organization is a group of users that can work together on a project. */
export type ManagementOrganizationMembershipsArgs = {
  filters?: InputMaybe<ManagementMembershipFilter>;
  ordering?: Array<ManagementMembershipOrdering>;
  pagination?: InputMaybe<OffsetPaginationInput>;
};


/** An Organization is a group of users that can work together on a project. */
export type ManagementOrganizationServiceInstancesArgs = {
  filters?: InputMaybe<ManagementServiceInstanceFilter>;
  ordering?: Array<ManagementServiceInstanceOrdering>;
  pagination?: InputMaybe<OffsetPaginationInput>;
};

export type ManagementOrganizationOrdering =
  { id: Ordering; name?: never; }
  |  { id?: never; name: Ordering; };

/**
 *
 * A Profile of an Organization. A Profile can be used to display personalised information about an organization.
 *
 *
 */
export type ManagementOrganizationProfile = {
  __typename?: 'ManagementOrganizationProfile';
  /** The avatar of the organization */
  avatar?: Maybe<ManagementMediaStore>;
  /** The banner of the organization */
  banner?: Maybe<ManagementMediaStore>;
  /** A short bio of the organization */
  bio?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  /** The display name of the organization */
  name?: Maybe<Scalars['String']['output']>;
  organization: ManagementOrganization;
};

/** A client the caller previously approved for the same app on the same device as a pending device code. Informational only: the device id in a manifest is self-asserted, so this never shortcuts consent. */
export type ManagementPriorAuthorization = {
  __typename?: 'ManagementPriorAuthorization';
  /** ACTIVE: it can still refresh (parallel install). EXPIRED: its refresh chain ran out. REVOKED: an operator or reuse detection revoked it — re-approval undoes that. */
  accessState: PriorAccessState;
  /** When the earlier approval happened. */
  authorizedAt: Scalars['DateTime']['output'];
  /** The surviving client row of that approval. Re-approving into the same hub replaces it. */
  client: ManagementClient;
  /** The hub the earlier approval bound the app to. */
  hub: ManagementHub;
  /** When that client last reported in. */
  lastSeenAt?: Maybe<Scalars['DateTime']['output']>;
  /** The scope identifiers that approval granted, for diffing against the new request. */
  scopes: Array<Scalars['String']['output']>;
  /** The app version that was approved back then. */
  version: Scalars['String']['output'];
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
  /** Whether the user opted in to being shown, by name and picture, on link pages for links they shared. */
  publicLinkPreview: Scalars['Boolean']['output'];
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
  createdAt: Scalars['DateTime']['output'];
  expiresAt?: Maybe<Scalars['DateTime']['output']>;
  /** The hub that this redeem token grants access to. */
  hub: ManagementHub;
  id: Scalars['ID']['output'];
  /** The redeem token. A bearer credential: only returned to the user who issued it and to the hub organization's owner/admins, null for everyone else. */
  token?: Maybe<Scalars['String']['output']>;
  /** The user that this redeem token belongs to. */
  user: ManagementUser;
};

/**
 * A redeem token is a token that can be used to redeem the rights to create
 * a client. It is used to give the recipient the right to create a client.
 *
 * If the token is not redeemed within the expires_at time, it will be invalid.
 * If the token has been redeemed, but the manifest has changed, the token will be invalid.
 */
export type ManagementRedeemTokenFilter = {
  AND?: InputMaybe<ManagementRedeemTokenFilter>;
  DISTINCT?: InputMaybe<Scalars['Boolean']['input']>;
  NOT?: InputMaybe<ManagementRedeemTokenFilter>;
  OR?: InputMaybe<ManagementRedeemTokenFilter>;
  hub?: InputMaybe<Scalars['ID']['input']>;
  ids?: InputMaybe<Array<Scalars['ID']['input']>>;
  organization?: InputMaybe<Scalars['ID']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
};

export type ManagementRedeemTokenOrdering =
  { createdAt: Ordering; id?: never; }
  |  { createdAt?: never; id: Ordering; };

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
  /** The requirements of the release: the services a client of this release needs mapped before it can run. */
  requirements: Array<ManagementStagingRequirement>;
  /** The scopes of the release. Scopes are used to limit the access of a client to a user's data. They represent app-level permissions. */
  scopes: Array<Scalars['String']['output']>;
  /** The version of the release. This should be a string that identifies the version of the release. We enforce semantic versioning notation. E.g. `0.1.0`. The version is unique per app. */
  version: Scalars['Version']['output'];
};


/** A Release is a version of an app. Releases might change over time. E.g. a release might be updated to fix a bug, and the release might be updated to add a new feature. This is why they are the home for `scopes` and `requirements`, which might change over the release cycle. */
export type ManagementReleaseClientsArgs = {
  filters?: InputMaybe<ManagementClientFilter>;
  ordering?: Array<ManagementClientOrdering>;
  pagination?: InputMaybe<OffsetPaginationInput>;
};

export type ManagementReleaseOrdering =
  { id: Ordering; name?: never; }
  |  { id?: never; name: Ordering; };

/** A point-in-time snapshot of a client's self-report (functional flag + per-requirement alias reports). Only the latest few per client are retained. */
export type ManagementReport = {
  __typename?: 'ManagementReport';
  /** The client this report belongs to. */
  client: ManagementClient;
  /** When the client submitted this report. */
  createdAt: Scalars['DateTime']['output'];
  /** The per-requirement alias reports captured in this snapshot. */
  entries: Array<ManagementReportEntry>;
  /** Did the client report itself as functional at report time? */
  functional: Scalars['Boolean']['output'];
  id: Scalars['ID']['output'];
  /** Has this report been acknowledged? Acknowledging does not change what the client reported — it only takes the client off the dashboard's action list until its next report. */
  isResolved: Scalars['Boolean']['output'];
  /** Optional note the operator left when acknowledging this report. */
  resolutionNote?: Maybe<Scalars['String']['output']>;
  /** When an operator acknowledged this report; null while it still needs attention. */
  resolvedAt?: Maybe<Scalars['DateTime']['output']>;
  /** The member who acknowledged this report. */
  resolvedBy?: Maybe<ManagementUser>;
};

/** One per-requirement entry in a client report snapshot: which alias was resolved for a requirement key and whether it was reachable. */
export type ManagementReportEntry = {
  __typename?: 'ManagementReportEntry';
  /** The alias the client resolved this requirement to (resolved live; may be null if it no longer exists or none was reported). */
  alias?: Maybe<ManagementInstanceAlias>;
  /** The requirement key this entry reports on. */
  key: Scalars['String']['output'];
  /** If the alias was not reachable, the reason the client gave. */
  reason?: Maybe<Scalars['String']['output']>;
  /** Was the resolved alias reachable when the client reported? */
  valid: Scalars['Boolean']['output'];
};

/**
 * A point-in-time snapshot of a client's self-report (functional flag +
 * the per-requirement alias_reports payload). Only the latest N per client
 * are retained (N configurable via settings.CLIENT_REPORT_RETENTION).
 */
export type ManagementReportFilter = {
  AND?: InputMaybe<ManagementReportFilter>;
  DISTINCT?: InputMaybe<Scalars['Boolean']['input']>;
  NOT?: InputMaybe<ManagementReportFilter>;
  OR?: InputMaybe<ManagementReportFilter>;
  client?: InputMaybe<Scalars['ID']['input']>;
  ids?: InputMaybe<Array<Scalars['ID']['input']>>;
};

export type ManagementReportOrdering =
  { createdAt: Ordering; id?: never; }
  |  { createdAt?: never; id: Ordering; };

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
  ordering?: Array<ManagementMembershipOrdering>;
  pagination?: InputMaybe<OffsetPaginationInput>;
};


/** A Role is a set of permissions that can be assigned to a user. It is used to define what a user can do in the system. */
export type ManagementRoleUsedByArgs = {
  filters?: InputMaybe<ManagementServiceInstanceFilter>;
  ordering?: Array<ManagementServiceInstanceOrdering>;
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

export type ManagementRoleOrdering =
  { id: Ordering; };

/** A member's request to be granted an additional role in their organization. The organization owner approves or declines it. */
export type ManagementRoleRequest = {
  __typename?: 'ManagementRoleRequest';
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  membership: ManagementMembership;
  /** An optional note from the member explaining the request. */
  reason?: Maybe<Scalars['String']['output']>;
  /** The owner who approved or declined the request. */
  resolvedBy?: Maybe<ManagementUser>;
  respondedAt?: Maybe<Scalars['DateTime']['output']>;
  role: ManagementRole;
  /** The status of the request: pending, approved, or declined. */
  status: Scalars['String']['output'];
};

/**
 * A member's request to be granted an additional Role in their Organization.
 *
 * A request only makes sense for an existing membership, so it hangs off the
 * Membership (which pins the user and organization) plus the Role being asked
 * for. The organization's owner or one of its admins approves or declines it;
 * approval adds the role to the membership.
 */
export type ManagementRoleRequestFilter = {
  AND?: InputMaybe<ManagementRoleRequestFilter>;
  DISTINCT?: InputMaybe<Scalars['Boolean']['input']>;
  NOT?: InputMaybe<ManagementRoleRequestFilter>;
  OR?: InputMaybe<ManagementRoleRequestFilter>;
  ids?: InputMaybe<Array<Scalars['ID']['input']>>;
  membership?: InputMaybe<Scalars['ID']['input']>;
  organization?: InputMaybe<Scalars['ID']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
};

export type ManagementRoleRequestOrdering =
  { createdAt: Ordering; id?: never; }
  |  { createdAt?: never; id: Ordering; };

/** A RoleSet is a named bundle of roles within an organization that can be applied together — to seed an invite or to grant to a member in one action. */
export type ManagementRoleSet = {
  __typename?: 'ManagementRoleSet';
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  organization: ManagementOrganization;
  /** The roles bundled in this set */
  roles: Array<ManagementRole>;
};


/** A RoleSet is a named bundle of roles within an organization that can be applied together — to seed an invite or to grant to a member in one action. */
export type ManagementRoleSetRolesArgs = {
  filters?: InputMaybe<ManagementRoleFilter>;
  ordering?: Array<ManagementRoleOrdering>;
  pagination?: InputMaybe<OffsetPaginationInput>;
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
  organization: ManagementOrganization;
  /** The service instances that use this scope */
  usedBy: Array<ManagementServiceInstance>;
};


/** A Scope represents a permission or capability that can be granted to clients and users. It is used to define what access level a user or client has in the system. */
export type ManagementScopeUsedByArgs = {
  filters?: InputMaybe<ManagementServiceInstanceFilter>;
  ordering?: Array<ManagementServiceInstanceOrdering>;
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

export type ManagementScopeOrdering =
  { id: Ordering; };

/** A Service is a Webservice that a Client might want to access. It is not the configured instance of the service, but the service itself. */
export type ManagementService = {
  __typename?: 'ManagementService';
  /** The description of the service. This should be a human readable description of the service. */
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  /** The identifier of the service. This should be a globally unique string that identifies the service. We encourage you to use the reverse domain name notation. E.g. `com.example.myservice` */
  identifier: Scalars['ServiceIdentifier']['output'];
  /** The logo of the service. This should be a url to a logo that can be used to represent the service. */
  logo?: Maybe<ManagementMediaStore>;
  /** The name of the service */
  name: Scalars['String']['output'];
  /** The releases of the service. A service release is a configured instance of a service. It will be configured by a configuration backend and will be used to send to the client as a configuration. It should never contain sensitive information. */
  releases: Array<ManagementServiceRelease>;
};


/** A Service is a Webservice that a Client might want to access. It is not the configured instance of the service, but the service itself. */
export type ManagementServiceReleasesArgs = {
  filters?: InputMaybe<ManagementServiceReleaseFilter>;
  ordering?: Array<ManagementServiceReleaseOrdering>;
  pagination?: InputMaybe<OffsetPaginationInput>;
};

/** A ServiceInstance is a configured instance of a Service. It will be configured by a configuration backend and will be used to send to the client as a configuration. It should never contain sensitive information. */
export type ManagementServiceInstance = {
  __typename?: 'ManagementServiceInstance';
  /** The aliases of the instance. An alias is a way to reach the instance. Clients can use these aliases to check if they can reach the instance. */
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
  /** A human-readable identifier of the instance: `instance_id @ device @ organization`. */
  identifier: Scalars['String']['output'];
  /** The identifier of the instance. This is a unique string that identifies the instance. It is used to identify the instance in the code and in the database. */
  instanceId: Scalars['String']['output'];
  /** The logo of the app. This should be a url to a logo that can be used to represent the app. */
  logo?: Maybe<ManagementMediaStore>;
  /** The mappings of the hub. A mapping is a mapping of a service to a service instance. This is used to configure the hub. */
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
  ordering?: Array<ManagementInstanceAliasOrdering>;
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
  ordering?: Array<ManagementUserOrdering>;
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
  ordering?: Array<ManagementUserOrdering>;
  pagination?: InputMaybe<OffsetPaginationInput>;
};


/** A ServiceInstance is a configured instance of a Service. It will be configured by a configuration backend and will be used to send to the client as a configuration. It should never contain sensitive information. */
export type ManagementServiceInstanceMappingsArgs = {
  filters?: InputMaybe<ServiceInstanceMappingFilter>;
  ordering?: Array<ManagementServiceInstanceMappingOrdering>;
  pagination?: InputMaybe<OffsetPaginationInput>;
};


/** A ServiceInstance is a configured instance of a Service. It will be configured by a configuration backend and will be used to send to the client as a configuration. It should never contain sensitive information. */
export type ManagementServiceInstanceRolesArgs = {
  filters?: InputMaybe<ManagementRoleFilter>;
  ordering?: Array<ManagementRoleOrdering>;
  pagination?: InputMaybe<OffsetPaginationInput>;
};


/** A ServiceInstance is a configured instance of a Service. It will be configured by a configuration backend and will be used to send to the client as a configuration. It should never contain sensitive information. */
export type ManagementServiceInstanceScopesArgs = {
  filters?: InputMaybe<ManagementScopeFilter>;
  ordering?: Array<ManagementScopeOrdering>;
  pagination?: InputMaybe<OffsetPaginationInput>;
};

/** ServiceInstance(id, hub, release, logo, instance_id, private_key, steward, organization, device, template, public_key, token) */
export type ManagementServiceInstanceFilter = {
  AND?: InputMaybe<ManagementServiceInstanceFilter>;
  DISTINCT?: InputMaybe<Scalars['Boolean']['input']>;
  NOT?: InputMaybe<ManagementServiceInstanceFilter>;
  OR?: InputMaybe<ManagementServiceInstanceFilter>;
  hub?: InputMaybe<Scalars['ID']['input']>;
  ids?: InputMaybe<Array<Scalars['ID']['input']>>;
  organization?: InputMaybe<Scalars['ID']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
};

/** A ServiceInstanceMapping binds one of a client's requirement keys to the service instance that fulfils it. */
export type ManagementServiceInstanceMapping = {
  __typename?: 'ManagementServiceInstanceMapping';
  /** The client this mapping belongs to. */
  client: ManagementClient;
  id: Scalars['ID']['output'];
  /** The service instance this mapping points at. */
  instance: ManagementServiceInstance;
  /** The requirement key of the client that this mapping fulfils. */
  key: Scalars['String']['output'];
  /** Is this mapping optional? If a mapping is optional, you can configure the client without this mapping. */
  optional: Scalars['Boolean']['output'];
};

export type ManagementServiceInstanceMappingOrdering =
  { id: Ordering; };

export type ManagementServiceInstanceOrdering =
  { id: Ordering; };

export type ManagementServiceOrdering =
  { id: Ordering; name?: never; }
  |  { id?: never; name: Ordering; };

/** A ServiceRelease is a specific version of a Service. Service instances are always instances of one release. */
export type ManagementServiceRelease = {
  __typename?: 'ManagementServiceRelease';
  id: Scalars['ID']['output'];
  /** The instances of the service release. A service instance is a configured instance of a service. It will be configured by a configuration backend and will be used to send to the client as a configuration. It should never contain sensitive information. */
  instances: Array<ManagementServiceInstance>;
  /** The service that this release belongs to. */
  service: ManagementService;
  /** The version of the service release. */
  version: Scalars['String']['output'];
};


/** A ServiceRelease is a specific version of a Service. Service instances are always instances of one release. */
export type ManagementServiceReleaseInstancesArgs = {
  filters?: InputMaybe<ManagementServiceInstanceFilter>;
  ordering?: Array<ManagementServiceInstanceOrdering>;
  pagination?: InputMaybe<OffsetPaginationInput>;
};

/** ServiceRelease(id, service, version) */
export type ManagementServiceReleaseFilter = {
  AND?: InputMaybe<ManagementServiceReleaseFilter>;
  DISTINCT?: InputMaybe<Scalars['Boolean']['input']>;
  NOT?: InputMaybe<ManagementServiceReleaseFilter>;
  OR?: InputMaybe<ManagementServiceReleaseFilter>;
  ids?: InputMaybe<Array<Scalars['ID']['input']>>;
  search?: InputMaybe<Scalars['String']['input']>;
  service?: InputMaybe<Scalars['ID']['input']>;
};

export type ManagementServiceReleaseOrdering =
  { id: Ordering; };

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
  authors: Array<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  /** Whether this manifest is bound to a device (carries a device id). The id itself is never exposed. */
  hasDeviceId: Scalars['Boolean']['output'];
  /** @deprecated Use hasDeviceId. */
  hasNodeId: Scalars['Boolean']['output'];
  homepage?: Maybe<Scalars['String']['output']>;
  identifier: Scalars['String']['output'];
  keywords: Array<Scalars['String']['output']>;
  license?: Maybe<Scalars['String']['output']>;
  logo?: Maybe<Scalars['String']['output']>;
  publicSources?: Maybe<Array<ManagementStagingPublicSource>>;
  repoUrl?: Maybe<Scalars['String']['output']>;
  requirements: Array<ManagementStagingRequirement>;
  scopes: Array<Scalars['String']['output']>;
  title?: Maybe<Scalars['String']['output']>;
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
  instanceId?: Maybe<Scalars['String']['output']>;
  logo?: Maybe<Scalars['String']['output']>;
  publicSources?: Maybe<Array<ManagementStagingPublicSource>>;
  roles?: Maybe<Array<StagingRole>>;
  scopes?: Maybe<Array<StagingScope>>;
  version: Scalars['String']['output'];
};

/** One machine's standing under tailnet lock. */
export type ManagementTailnetLockNode = {
  __typename?: 'ManagementTailnetLockNode';
  /** The ionscale machine id. */
  machineId: Scalars['String']['output'];
  /** The machine's name. */
  name: Scalars['String']['output'];
  /** Whether the machine's node key is signed by the key authority. An unsigned machine is registered but unreachable by locked peers until an existing signing node signs it. */
  signed: Scalars['Boolean']['output'];
};

/** The state of tailnet lock for a mesh. Tailnet lock has two independent halves: the control plane grants the capability, but the key authority itself is created by running `tailscale lock init` on a machine. A mesh can sit with the capability granted and no authority indefinitely. */
export type ManagementTailnetLockStatus = {
  __typename?: 'ManagementTailnetLockStatus';
  /** Whether a key authority actually exists and is enforcing signatures. Only a client can bring this about. */
  authorityActive: Scalars['Boolean']['output'];
  /** Whether an authority existed and was shut down with a disablement secret. Distinct from never having had one. */
  authorityDisabled: Scalars['Boolean']['output'];
  /** Whether the control plane grants machines the tailnet-lock capability. Required before `tailscale lock init` will work. */
  capabilityEnabled: Scalars['Boolean']['output'];
  /** The head of the tailnet key authority chain, empty when there is no authority. */
  head: Scalars['String']['output'];
  /** Every machine on the mesh and whether its key is signed. */
  nodes: Array<ManagementTailnetLockNode>;
};

/**
 * A client's most recent self-report for one requirement key: which alias it
 * resolved to and whether it was reachable.
 */
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

export type ManagementUsedAliasOrdering =
  { id: Ordering; };

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
  /** A short-lived URL of the user's avatar (`profile.avatar`), if they have one. */
  avatar?: Maybe<Scalars['String']['output']>;
  /** The communication channels that the user has */
  comChannels: Array<ManagementComChannel>;
  /** The user's email address. Only returned to the user themselves and to people who share an organization with them. */
  email?: Maybe<Scalars['String']['output']>;
  /** The user's first name. Only returned to the user themselves and to people who share an organization with them. */
  firstName?: Maybe<Scalars['String']['output']>;
  /** The groups this user belongs to. A user will get all permissions granted to each of their groups. */
  groups: Array<ManagementGroup>;
  id: Scalars['ID']['output'];
  /** The user's last name. Only returned to the user themselves and to people who share an organization with them. */
  lastName?: Maybe<Scalars['String']['output']>;
  /** The memberships of the user in organizations */
  memberships: Array<ManagementMembership>;
  profile: ManagementProfile;
  /** The social (external login) accounts linked to this user. Only the user themselves can see their own; empty for everyone else. */
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
  filters?: InputMaybe<ManagementComChannelFilter>;
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
  ordering?: Array<ManagementMembershipOrdering>;
  pagination?: InputMaybe<OffsetPaginationInput>;
};

export type ManagementUserOrdering =
  { id: Ordering; };

export type Mutation = {
  __typename?: 'Mutation';
  acceptDeviceCode: ManagementClient;
  acceptHubDeviceCode: ManagementHub;
  acceptInvite: ManagementMembership;
  acceptMeshDeviceCode: ManagementMeshDeviceCode;
  addDeviceToGroup: ManagementDevice;
  /** Approve a pending request to join an organization. Owner or admins only. */
  approveMembershipRequest: ManagementMembership;
  approveRoleRequest: ManagementRoleRequest;
  cancelInvite: ManagementInvite;
  cancelRoleRequest: Scalars['ID']['output'];
  changeOrganizationOwner: ManagementOrganization;
  connectKommunityPartner: ManagementHub;
  createAlias: ManagementInstanceAlias;
  createDevice: ManagementDevice;
  createDeviceGroup: ManagementDeviceGroup;
  createInvite: ManagementInvite;
  createIonscaleAuthKey: ManagementIonscaleAuthKey;
  createIonscaleLayer: ManagementLayer;
  createOrganization: ManagementOrganization;
  createOrganizationProfile: ManagementOrganizationProfile;
  createProfile: ManagementProfile;
  createRedeemToken: ManagementRedeemToken;
  createRoleSet: ManagementRoleSet;
  declineDeviceCode: ManagementDeviceCode;
  declineHubDeviceCode: ManagementHubDeviceCode;
  /** Decline an invite to join an organization. */
  declineInvite: ManagementInvite;
  /** Decline a pending request to join an organization. Owner or admins only. */
  declineMembershipRequest: ManagementMembershipRequest;
  declineMeshDeviceCode: ManagementMeshDeviceCode;
  declineRoleRequest: ManagementRoleRequest;
  deleteAlias: Scalars['ID']['output'];
  deleteDevice: Scalars['ID']['output'];
  deleteDeviceGroup: Scalars['ID']['output'];
  deleteHub: Scalars['ID']['output'];
  deleteIonscaleLayer: Scalars['ID']['output'];
  deleteMembership: Scalars['ID']['output'];
  deleteOrganization: Scalars['ID']['output'];
  deleteOrganizationProfile: Scalars['ID']['output'];
  deleteProfile: Scalars['ID']['output'];
  deleteRoleSet: Scalars['ID']['output'];
  disableTailnetLock: ManagementLayer;
  enableTailnetLock: ManagementLayer;
  notifyMember: ManagementNotificationResult;
  removeDeviceFromGroup: ManagementDevice;
  requestClientReport: ManagementClient;
  requestMediaUpload: PresignedPostCredentials;
  /** Ask to become a member of an organization (named by its handle) that the caller is not in. Always answers true. */
  requestMembership: Scalars['Boolean']['output'];
  requestRole: ManagementRoleRequest;
  resolveReport: ManagementReport;
  revokeClientSessions: ManagementClient;
  revokeOrganizationSessions: Scalars['Int']['output'];
  setMembershipBrandHue: ManagementMembership;
  setMembershipNotifications: ManagementMembership;
  unresolveReport: ManagementReport;
  updateAlias: ManagementInstanceAlias;
  updateDevice: ManagementDevice;
  updateHub: ManagementHub;
  updateIonscaleLayer: ManagementLayer;
  updateMembership: ManagementMembership;
  updateOrganization: ManagementOrganization;
  updateOrganizationProfile: ManagementOrganizationProfile;
  updateProfile: ManagementProfile;
  updateRoleSet: ManagementRoleSet;
};


export type MutationAcceptDeviceCodeArgs = {
  input: AcceptDeviceCodeInput;
};


export type MutationAcceptHubDeviceCodeArgs = {
  input: AcceptHubDeviceCodeInput;
};


export type MutationAcceptInviteArgs = {
  input: AcceptInviteInput;
};


export type MutationAcceptMeshDeviceCodeArgs = {
  input: AcceptMeshDeviceCodeInput;
};


export type MutationAddDeviceToGroupArgs = {
  input: AddDeviceToGroupInput;
};


export type MutationApproveMembershipRequestArgs = {
  input: ApproveMembershipRequestInput;
};


export type MutationApproveRoleRequestArgs = {
  input: ResolveRoleRequestInput;
};


export type MutationCancelInviteArgs = {
  input: CancelInviteInput;
};


export type MutationCancelRoleRequestArgs = {
  input: ResolveRoleRequestInput;
};


export type MutationChangeOrganizationOwnerArgs = {
  input: ChangeOrganizationOwnerInput;
};


export type MutationConnectKommunityPartnerArgs = {
  input: ConnectKommunityPartnerInput;
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


export type MutationCreateRedeemTokenArgs = {
  input: CreateRedeemTokenInput;
};


export type MutationCreateRoleSetArgs = {
  input: CreateRoleSetInput;
};


export type MutationDeclineDeviceCodeArgs = {
  input: DeclineDeviceCodeInput;
};


export type MutationDeclineHubDeviceCodeArgs = {
  input: DeclineHubDeviceCodeInput;
};


export type MutationDeclineInviteArgs = {
  input: DeclineInviteInput;
};


export type MutationDeclineMembershipRequestArgs = {
  input: DeclineMembershipRequestInput;
};


export type MutationDeclineMeshDeviceCodeArgs = {
  input: DeclineMeshDeviceCodeInput;
};


export type MutationDeclineRoleRequestArgs = {
  input: ResolveRoleRequestInput;
};


export type MutationDeleteAliasArgs = {
  input: DeleteAliasInput;
};


export type MutationDeleteDeviceArgs = {
  input: DeleteDeviceInput;
};


export type MutationDeleteDeviceGroupArgs = {
  input: DeleteDeviceGroupInput;
};


export type MutationDeleteHubArgs = {
  input: DeleteHubInput;
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


export type MutationDeleteRoleSetArgs = {
  input: DeleteRoleSetInput;
};


export type MutationDisableTailnetLockArgs = {
  input: TailnetLockInput;
};


export type MutationEnableTailnetLockArgs = {
  input: TailnetLockInput;
};


export type MutationNotifyMemberArgs = {
  input: NotifyMemberInput;
};


export type MutationRemoveDeviceFromGroupArgs = {
  input: RemoveDeviceFromGroupInput;
};


export type MutationRequestClientReportArgs = {
  input: RequestClientReportInput;
};


export type MutationRequestMediaUploadArgs = {
  input: RequestMediaUploadInput;
};


export type MutationRequestMembershipArgs = {
  input: RequestMembershipInput;
};


export type MutationRequestRoleArgs = {
  input: RequestRoleInput;
};


export type MutationResolveReportArgs = {
  input: ResolveReportInput;
};


export type MutationRevokeClientSessionsArgs = {
  input: RevokeClientSessionsInput;
};


export type MutationRevokeOrganizationSessionsArgs = {
  input: RevokeOrganizationSessionsInput;
};


export type MutationSetMembershipBrandHueArgs = {
  input: SetMembershipBrandHueInput;
};


export type MutationSetMembershipNotificationsArgs = {
  input: SetMembershipNotificationsInput;
};


export type MutationUnresolveReportArgs = {
  input: UnresolveReportInput;
};


export type MutationUpdateAliasArgs = {
  input: UpdateAliasInput;
};


export type MutationUpdateDeviceArgs = {
  input: UpdateDeviceInput;
};


export type MutationUpdateHubArgs = {
  input: UpdateHubInput;
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


export type MutationUpdateRoleSetArgs = {
  input: UpdateRoleSetInput;
};

/** Send a notification to one member of your organization. */
export type NotifyMemberInput = {
  membership: Scalars['ID']['input'];
  message: Scalars['String']['input'];
  title?: InputMaybe<Scalars['String']['input']>;
};

export type OffsetPaginationInput = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: Scalars['Int']['input'];
};

export const Ordering = {
  Asc: 'ASC',
  AscNullsFirst: 'ASC_NULLS_FIRST',
  AscNullsLast: 'ASC_NULLS_LAST',
  Desc: 'DESC',
  DescNullsFirst: 'DESC_NULLS_FIRST',
  DescNullsLast: 'DESC_NULLS_LAST'
} as const;

export type Ordering = typeof Ordering[keyof typeof Ordering];
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
  /** The Content-Type the upload form must send; the policy pins it exactly. */
  contentType: Scalars['String']['output'];
  datalayer: Scalars['String']['output'];
  key: Scalars['String']['output'];
  policy: Scalars['String']['output'];
  store: Scalars['String']['output'];
  xAmzAlgorithm: Scalars['String']['output'];
  xAmzCredential: Scalars['String']['output'];
  xAmzDate: Scalars['String']['output'];
  xAmzSignature: Scalars['String']['output'];
};

/** Whether a previously approved client can still refresh its tokens. */
export const PriorAccessState = {
  Active: 'ACTIVE',
  Expired: 'EXPIRED',
  Revoked: 'REVOKED'
} as const;

export type PriorAccessState = typeof PriorAccessState[keyof typeof PriorAccessState];
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
  hub: ManagementHub;
  hubDeviceCode: ManagementHubDeviceCode;
  hubDeviceCodeByCode: ManagementHubDeviceCode;
  hubs: Array<ManagementHub>;
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
  /** What a link page may show to anyone holding a link: the organization it leads into and who shared it. Public, and strictly opt-in: a part is null unless its subject chose to be shown. */
  linkPreview: ManagementLinkPreview;
  machine?: Maybe<ManagementMachine>;
  me: ManagementUser;
  membership: ManagementMembership;
  memberships: Array<ManagementMembership>;
  meshDeviceCode: ManagementMeshDeviceCode;
  meshDeviceCodeByCode: ManagementMeshDeviceCode;
  oauth2ClientByClientId: ManagementOAuth2Client;
  organization: ManagementOrganization;
  organizations: Array<ManagementOrganization>;
  redeemTokens: Array<ManagementRedeemToken>;
  release: ManagementRelease;
  releases: Array<ManagementRelease>;
  report: ManagementReport;
  reports: Array<ManagementReport>;
  role: ManagementRole;
  roleRequests: Array<ManagementRoleRequest>;
  roles: Array<ManagementRole>;
  scope: ManagementScope;
  scopes: Array<ManagementScope>;
  service: ManagementService;
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
  ordering?: Array<ManagementAppOrdering>;
  pagination?: InputMaybe<OffsetPaginationInput>;
};


export type QueryClientArgs = {
  id: Scalars['ID']['input'];
};


export type QueryClientsArgs = {
  filters?: InputMaybe<ManagementClientFilter>;
  ordering?: Array<ManagementClientOrdering>;
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
  ordering?: Array<ManagementDeviceGroupOrdering>;
  pagination?: InputMaybe<OffsetPaginationInput>;
};


export type QueryDevicesArgs = {
  filters?: InputMaybe<ManagementDeviceFilter>;
  ordering?: Array<ManagementDeviceOrdering>;
  pagination?: InputMaybe<OffsetPaginationInput>;
};


export type QueryFriendsArgs = {
  filters?: InputMaybe<UserFilter>;
  ordering?: Array<ManagementUserOrdering>;
  pagination?: InputMaybe<OffsetPaginationInput>;
};


export type QueryHubArgs = {
  id: Scalars['ID']['input'];
};


export type QueryHubDeviceCodeArgs = {
  id: Scalars['ID']['input'];
};


export type QueryHubDeviceCodeByCodeArgs = {
  code: Scalars['String']['input'];
};


export type QueryHubsArgs = {
  filters?: InputMaybe<ManagementHubFilter>;
  ordering?: Array<ManagementHubOrdering>;
  pagination?: InputMaybe<OffsetPaginationInput>;
};


export type QueryInstanceAliasArgs = {
  id: Scalars['ID']['input'];
};


export type QueryInstanceAliasesArgs = {
  filters?: InputMaybe<ManagementInstanceAliasFilter>;
  ordering?: Array<ManagementInstanceAliasOrdering>;
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
  ordering?: Array<ManagementIonscaleAuthKeyOrdering>;
  pagination?: InputMaybe<OffsetPaginationInput>;
};


export type QueryKommunityPartnerArgs = {
  id: Scalars['ID']['input'];
};


export type QueryKommunityPartnersArgs = {
  filters?: InputMaybe<ManagementKommunityPartnerFilter>;
  ordering?: Array<ManagementKommunityPartnerOrdering>;
  pagination?: InputMaybe<OffsetPaginationInput>;
};


export type QueryLayerArgs = {
  id: Scalars['ID']['input'];
};


export type QueryLayersArgs = {
  filters?: InputMaybe<ManagementLayerFilter>;
  ordering?: Array<ManagementLayerOrdering>;
  pagination?: InputMaybe<OffsetPaginationInput>;
};


export type QueryLinkPreviewArgs = {
  organization: Scalars['String']['input'];
  user?: InputMaybe<Scalars['ID']['input']>;
};


export type QueryMachineArgs = {
  id: Scalars['ID']['input'];
};


export type QueryMembershipArgs = {
  id: Scalars['ID']['input'];
};


export type QueryMembershipsArgs = {
  filters?: InputMaybe<ManagementMembershipFilter>;
  ordering?: Array<ManagementMembershipOrdering>;
  pagination?: InputMaybe<OffsetPaginationInput>;
};


export type QueryMeshDeviceCodeArgs = {
  id: Scalars['ID']['input'];
};


export type QueryMeshDeviceCodeByCodeArgs = {
  code: Scalars['String']['input'];
};


export type QueryOauth2ClientByClientIdArgs = {
  clientId: Scalars['String']['input'];
};


export type QueryOrganizationArgs = {
  id: Scalars['ID']['input'];
};


export type QueryOrganizationsArgs = {
  filters?: InputMaybe<OrganizationFilter>;
  ordering?: Array<ManagementOrganizationOrdering>;
  pagination?: InputMaybe<OffsetPaginationInput>;
};


export type QueryRedeemTokensArgs = {
  filters?: InputMaybe<ManagementRedeemTokenFilter>;
  ordering?: Array<ManagementRedeemTokenOrdering>;
  pagination?: InputMaybe<OffsetPaginationInput>;
};


export type QueryReleaseArgs = {
  id: Scalars['ID']['input'];
};


export type QueryReleasesArgs = {
  ordering?: Array<ManagementReleaseOrdering>;
};


export type QueryReportArgs = {
  id: Scalars['ID']['input'];
};


export type QueryReportsArgs = {
  filters?: InputMaybe<ManagementReportFilter>;
  ordering?: Array<ManagementReportOrdering>;
  pagination?: InputMaybe<OffsetPaginationInput>;
};


export type QueryRoleArgs = {
  id: Scalars['ID']['input'];
};


export type QueryRoleRequestsArgs = {
  filters?: InputMaybe<ManagementRoleRequestFilter>;
  ordering?: Array<ManagementRoleRequestOrdering>;
  pagination?: InputMaybe<OffsetPaginationInput>;
};


export type QueryRolesArgs = {
  filters?: InputMaybe<ManagementRoleFilter>;
  ordering?: Array<ManagementRoleOrdering>;
  pagination?: InputMaybe<OffsetPaginationInput>;
};


export type QueryScopeArgs = {
  id: Scalars['ID']['input'];
};


export type QueryScopesArgs = {
  filters?: InputMaybe<ManagementScopeFilter>;
  ordering?: Array<ManagementScopeOrdering>;
  pagination?: InputMaybe<OffsetPaginationInput>;
};


export type QueryServiceArgs = {
  id: Scalars['ID']['input'];
};


export type QueryServiceInstanceArgs = {
  id: Scalars['ID']['input'];
};


export type QueryServiceInstanceMappingArgs = {
  id: Scalars['ID']['input'];
};


export type QueryServiceInstanceMappingsArgs = {
  filters?: InputMaybe<ServiceInstanceMappingFilter>;
  ordering?: Array<ManagementServiceInstanceMappingOrdering>;
  pagination?: InputMaybe<OffsetPaginationInput>;
};


export type QueryServiceInstancesArgs = {
  filters?: InputMaybe<ManagementServiceInstanceFilter>;
  ordering?: Array<ManagementServiceInstanceOrdering>;
  pagination?: InputMaybe<OffsetPaginationInput>;
};


export type QueryServiceReleaseArgs = {
  id: Scalars['ID']['input'];
};


export type QueryServiceReleasesArgs = {
  filters?: InputMaybe<ManagementServiceReleaseFilter>;
  ordering?: Array<ManagementServiceReleaseOrdering>;
  pagination?: InputMaybe<OffsetPaginationInput>;
};


export type QueryServicesArgs = {
  filters?: InputMaybe<ServiceFilter>;
  ordering?: Array<ManagementServiceOrdering>;
  pagination?: InputMaybe<OffsetPaginationInput>;
};


export type QuerySocialAccountArgs = {
  id: Scalars['ID']['input'];
};


export type QueryUsedAliasArgs = {
  id: Scalars['ID']['input'];
};


export type QueryUsedAliasesArgs = {
  ordering?: Array<ManagementUsedAliasOrdering>;
  pagination?: InputMaybe<OffsetPaginationInput>;
};


export type QueryValidateDeviceCodeArgs = {
  code: Scalars['String']['input'];
  deviceCode: Scalars['ID']['input'];
  hub: Scalars['ID']['input'];
};

export type RemoveDeviceFromGroupInput = {
  device: Scalars['ID']['input'];
  deviceGroup: Scalars['ID']['input'];
};

export type RequestClientReportInput = {
  /** The client that should re-report its configuration. */
  client: Scalars['ID']['input'];
  /** True to ask the client to report, False to withdraw a pending request. */
  request?: Scalars['Boolean']['input'];
};

export type RequestMediaUploadInput = {
  /** MIME type of the file. The upload must send the same Content-Type. Guessed from `key` when omitted. */
  contentType?: InputMaybe<Scalars['String']['input']>;
  datalayer: Scalars['String']['input'];
  key: Scalars['String']['input'];
};

export type RequestMembershipInput = {
  /** The organization's handle (slug). */
  organization: Scalars['String']['input'];
  reason?: InputMaybe<Scalars['String']['input']>;
};

export type RequestRoleInput = {
  organization: Scalars['ID']['input'];
  reason?: InputMaybe<Scalars['String']['input']>;
  role: Scalars['ID']['input'];
};

export type ResolveReportInput = {
  id: Scalars['ID']['input'];
  note?: InputMaybe<Scalars['String']['input']>;
};

export type ResolveRoleRequestInput = {
  id: Scalars['ID']['input'];
};

export type RevokeClientSessionsInput = {
  client: Scalars['ID']['input'];
};

export type RevokeOrganizationSessionsInput = {
  organization: Scalars['ID']['input'];
};

/** Service(id, name, identifier, organization, logo, description) */
export type ServiceFilter = {
  AND?: InputMaybe<ServiceFilter>;
  DISTINCT?: InputMaybe<Scalars['Boolean']['input']>;
  NOT?: InputMaybe<ServiceFilter>;
  OR?: InputMaybe<ServiceFilter>;
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

export type SetMembershipBrandHueInput = {
  brandChroma?: InputMaybe<Scalars['Float']['input']>;
  brandHue?: InputMaybe<Scalars['Float']['input']>;
  organization: Scalars['ID']['input'];
};

/** Turn this organization's notifications on or off for yourself. */
export type SetMembershipNotificationsInput = {
  allow: Scalars['Boolean']['input'];
  organization: Scalars['ID']['input'];
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
  public: Scalars['Boolean']['output'];
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

export type TailnetLockInput = {
  /** The ID of the Ionscale layer (mesh) to change. */
  layerId: Scalars['ID']['input'];
};

export type UnresolveReportInput = {
  id: Scalars['ID']['input'];
};

export type UpdateAliasInput = {
  host?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  kind: Scalars['String']['input'];
  path?: InputMaybe<Scalars['String']['input']>;
  port: Scalars['Int']['input'];
  public?: InputMaybe<Scalars['Boolean']['input']>;
};

export type UpdateDeviceInput = {
  id: Scalars['ID']['input'];
  name: Scalars['String']['input'];
};

export type UpdateHubInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateIonscaleLayerInput = {
  /** The description of the tailnet layer. */
  description?: InputMaybe<Scalars['String']['input']>;
  /** Enable or disable HTTPS certificates for this mesh. Requires MagicDNS. */
  httpsCerts?: InputMaybe<Scalars['Boolean']['input']>;
  /** The ID of the Ionscale layer to update. */
  id: Scalars['ID']['input'];
  /** Enable or disable MagicDNS for this mesh. */
  magicDns?: InputMaybe<Scalars['Boolean']['input']>;
  /** The name of the tailnet layer. */
  name?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateMembershipInput = {
  id: Scalars['ID']['input'];
  roles?: InputMaybe<Array<Scalars['ID']['input']>>;
};

export type UpdateOrganizationInput = {
  accessTokenLifetime?: InputMaybe<Scalars['Int']['input']>;
  avatar?: InputMaybe<Scalars['ID']['input']>;
  brandChroma?: InputMaybe<Scalars['Float']['input']>;
  brandHue?: InputMaybe<Scalars['Float']['input']>;
  deeplinkApps?: InputMaybe<Array<DeeplinkAppInput>>;
  description?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  publicLinkPreview?: InputMaybe<Scalars['Boolean']['input']>;
  requireDeviceAuth?: InputMaybe<Scalars['Boolean']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
  syncMine?: Scalars['Boolean']['input'];
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
  bio?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  publicLinkPreview?: InputMaybe<Scalars['Boolean']['input']>;
};

export type UpdateRoleSetInput = {
  id: Scalars['ID']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  roles?: InputMaybe<Array<Scalars['ID']['input']>>;
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
  /** The device that already exists for this node in the selected hub's organization. If null, accepting will create a new device. */
  existingDevice?: Maybe<ManagementDevice>;
  mappings: Array<PotentialMapping>;
  reason?: Maybe<Scalars['String']['output']>;
  valid: Scalars['Boolean']['output'];
};

export type _Service = {
  __typename?: '_Service';
  sdl: Scalars['String']['output'];
};
