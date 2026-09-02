
// The wire values allauth uses for authenticator types (Authenticator.Type).
// Note "recovery_codes" is PLURAL — matching AuthenticatorType in lib/allauth.ts.
export type MFAType = "recovery_codes" | "totp" | "webauthn";


// `is_pending` is optional on purpose: allauth only sets it on the stage it is
// actually waiting for. Reauthentication flows are returned as available
// *options* with no such key at all
// (allauth/account/internal/flows/reauthentication.py:91-110).
export type BaseAuthFlow = {
    id: string;
    is_pending?: boolean;
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

// Flows this app routes on but does not model individually (login, signup,
// verify_email, provider_signup, login_by_code, password_reset_by_code,
// mfa_signup_webauthn). Keeping the union open matters: `pathForFlow` is handed
// whatever allauth returns, and a too-narrow union made those callers untypeable.
export type OtherAuthFlow = BaseAuthFlow & {
    id: string;
    types?: MFAType[];
}

export type AuthFlow = ReauthenticateFlow | MFAFlow | MFAReauthenticateFlow | MFATrustFlow | OtherAuthFlow;
