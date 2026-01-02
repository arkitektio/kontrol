
export type MFAType = "recovery_code" | "totp" | "webauthn";


export type BaseAuthFlow = {
    id: string;
    is_pending: boolean;
}

export type MFAFlow = BaseAuthFlow & {
    id: "mfa_authenticate",
    types: MFAType[];
}

export type MFAReauthenticateFlow = BaseAuthFlow & {
    id: "mfa_reauthenticate",
    types: MFAType[];
}

export type ReauthenticateFlow = BaseAuthFlow & {
    id: "reauthenticate";
}

export type MFATrustFlow = BaseAuthFlow & {
    id: "mfa_trust";
}

export type AuthFlow = ReauthenticateFlow | MFAFlow | MFAReauthenticateFlow | MFATrustFlow;
