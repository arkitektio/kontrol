import { useState } from "react";
import { Configure } from "./Configure";

export function ConfigurePage() {
  const [submitted, setSubmitted] = useState(false);
  const [authorized, setAuthorized] = useState(false);

  const mockUser = {
    username: "john_doe",
    active_organization: {
      name: "Acme Research Lab",
    },
  };

  const mockOrganizations = [
    { id: "1", name: "Acme Research Lab" },
    { id: "2", name: "Innovation Hub" },
    { id: "3", name: "Tech Collective" },
  ];

  const mockData = {
    user: mockUser,
    organizations: mockOrganizations,
    staging_kind: "development" as const,
    staging_logo: "https://via.placeholder.com/100",
    staging_identifier: "my-awesome-app",
    staging_version: "1.2.3",
    staging_scopes: [
      "read:data",
      "write:data",
      "manage:projects",
      "execute:workflows",
    ],
    app: undefined, // New app
    release: undefined, // New version
    client: false,
    composition_valid: true,
    composition_requirements: {
      "Authentication Service": "v2.0+",
      "Data API": "v3.1+",
      "Workflow Engine": "v1.5+",
    },
    staging_node: true,
    onSubmit: (action: "allow" | "cancel", organizationId?: string) => {
      console.log("Action:", action, "Organization:", organizationId);
      setAuthorized(action === "allow");
      setSubmitted(true);
    },
  };

  // Show success state if submitted
  if (submitted) {
    return (
      <Configure
        {...mockData}
        success={true}
        authorized={authorized}
      />
    );
  }

  // Show configuration flow
  return <Configure {...mockData} />;
}

// Example for Desktop App
export function ConfigurePageDesktop() {
  const [submitted, setSubmitted] = useState(false);
  const [authorized, setAuthorized] = useState(false);

  const mockUser = {
    username: "jane_smith",
    active_organization: {
      name: "Quantum Computing Inc",
    },
  };

  const mockOrganizations = [
    { id: "1", name: "Quantum Computing Inc" },
    { id: "2", name: "Physics Lab" },
  ];

  const mockData = {
    user: mockUser,
    organizations: mockOrganizations,
    staging_kind: "desktop" as const,
    staging_logo: "https://via.placeholder.com/100",
    staging_identifier: "quantum-desktop",
    staging_version: "2.0.0",
    staging_scopes: [
      "openid",
      "profile",
      "email",
      "read:quantum_data",
      "execute:simulations",
    ],
    app: {
      identifier: "quantum-desktop",
    },
    release: {
      version: "1.9.5",
      scopes: [
        "openid",
        "profile",
        "email",
        "read:quantum_data",
      ],
    },
    client: true,
    composition_valid: true,
    composition_requirements: {
      "OAuth Server": "v2.0+",
      "Quantum API": "v1.0+",
    },
    on_node: "Jane's Workstation",
    onSubmit: (action: "allow" | "cancel", organizationId?: string) => {
      console.log("Action:", action, "Organization:", organizationId);
      setAuthorized(action === "allow");
      setSubmitted(true);
    },
  };

  if (submitted) {
    return (
      <Configure
        {...mockData}
        success={true}
        authorized={authorized}
      />
    );
  }

  return <Configure {...mockData} />;
}

// Example for Website with errors
export function ConfigurePageWebsiteWithErrors() {
  const [submitted, setSubmitted] = useState(false);
  const [authorized, setAuthorized] = useState(false);

  const mockUser = {
    username: "bob_admin",
    active_organization: {
      name: "BioTech Solutions",
    },
  };

  const mockOrganizations = [
    { id: "1", name: "BioTech Solutions" },
    { id: "2", name: "Research Division" },
  ];

  const mockData = {
    user: mockUser,
    organizations: mockOrganizations,
    staging_kind: "website" as const,
    staging_logo: "https://via.placeholder.com/100",
    staging_identifier: "biotech-portal",
    staging_version: "3.1.0",
    staging_scopes: [
      "openid",
      "profile",
      "email",
      "read:experiments",
      "write:results",
    ],
    staging_redirect_uris: [
      "https://biotech-portal.example.com/callback",
      "https://biotech-portal.example.com/auth/callback",
    ],
    staging_public: true,
    app: undefined,
    release: undefined,
    client: false,
    composition_valid: false,
    composition_errors: [
      "Required service 'Experiment Database v5.0+' is not available",
      "API Gateway version mismatch: requires v4.0+, found v3.8",
    ],
    composition_warnings: [
      "Using deprecated authentication method",
      "Redirect URI 'https://biotech-portal.example.com/callback' is not HTTPS",
    ],
    onSubmit: (action: "allow" | "cancel", organizationId?: string) => {
      console.log("Action:", action, "Organization:", organizationId);
      setAuthorized(action === "allow");
      setSubmitted(true);
    },
  };

  if (submitted) {
    return (
      <Configure
        {...mockData}
        success={true}
        authorized={authorized}
      />
    );
  }

  return <Configure {...mockData} />;
}

// Example for No Organization
export function ConfigurePageNoOrg() {
  const mockUser = {
    username: "new_user",
  };

  const mockData = {
    user: mockUser,
    onSubmit: (action: "allow" | "cancel", organizationId?: string) => {
      console.log("Action:", action, "Organization:", organizationId);
    },
  };

  return <Configure {...mockData} />;
}
