import type { AuthFlow } from "@/auth/types";
import { resolveCredentialKey, appendNext, pathForFlow } from "@/auth";
import {
  activateTOTPAuthenticator,
  deactivateTOTPAuthenticator,
  login,
  mfaAuthenticate,
  mfaReauthenticate,
  mfaTrust,
  reauthenticate,
  type APIResponse,
} from "@/lib/allauth";
import { handleFormErrors } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, type Dispatch, type SetStateAction } from "react";
import { useForm, type DefaultValues, type Resolver, type UseFormSetError } from "react-hook-form";
import { useLocation, useNavigate, useSearchParams } from "react-router";
import * as z from "zod";

export type FlowRoute = { path: string; state?: { reauth: APIResponse } };

// Reauthentication is the one case allauth does NOT mark with `is_pending`:
// get_reauthentication_flows() returns the available methods as plain options
// (allauth/account/internal/flows/reauthentication.py:91-110), so a 401 offering
// them has to be recognised by flow id instead.
const REAUTH_FLOWS = ["reauthenticate", "mfa_reauthenticate"];

/**
 * Where an allauth response says the user should go, or `null` when it isn't a
 * routing response at all (the caller should render its errors instead).
 *
 * Routing lives in ONE place — `pathForFlow` in auth/routing.tsx — because it is
 * the only mapping that keys on `flow.types`. A user whose only factor is
 * recovery codes or a security key must not be sent to the TOTP page.
 *
 * `returnTo` is where to come back to after an interstitial (used for reauth,
 * which interrupts an action the user had already started); an explicit `next`
 * from the URL always wins over it.
 */
export function flowRoute(
  content: APIResponse,
  nextParam: string | null,
  returnTo?: string,
  currentPath?: string
): FlowRoute | null {
  const flows: AuthFlow[] = content.data?.flows ?? [];
  try {
    const pending = flows.find((flow) => flow.is_pending);
    if (pending) {
      return { path: appendNext(pathForFlow(pending), nextParam) };
    }
    if (content.status === 401) {
      // Take the method allauth lists first — password when the account has a
      // usable one, otherwise the MFA factor. The whole response rides along in
      // router state so ReauthenticateFlow can offer the alternatives.
      const reauth = flows.find((flow) => REAUTH_FLOWS.includes(flow.id));
      if (reauth) {
        const path = pathForFlow(reauth);
        // Never bounce a page to itself. A rejected password or code is a 400
        // (allauth/headless/internal/restkit/response.py:51), which falls through
        // to the error handler as it should — but any 401 arriving ON the reauth
        // page would otherwise navigate in place and wipe the message that was
        // about to be shown.
        if (currentPath && currentPath.split("?")[0] === path) {
          return null;
        }
        return {
          path: appendNext(path, nextParam ?? returnTo ?? null),
          state: { reauth: content },
        };
      }
    }
  } catch (e) {
    // pathForFlow throws on a flow id it has no route for; that is a bug to fix
    // in flow2path, not a reason to navigate somewhere that 404s.
    console.error(e);
  }
  return null;
}

// Shared post-response handler: on success go to `next`, on a pending flow route
// to that flow, otherwise surface field/global errors from the allauth response.
const useNextFunc = (
  setError: UseFormSetError<any>,
  setGlobalError: Dispatch<SetStateAction<string | null>>
) => {
  const navigate = useNavigate();
  const location = useLocation();
  // Raw nullable value (not `|| '/home'`) so it can be re-attached to an
  // intermediate flow URL without pinning downstream steps to /home.
  const nextParam = useSearchParams()[0].get("next");

  const next = (content: APIResponse) => {
    if (content.status === 200) {
      navigate(nextParam || "/home");
      return;
    }
    try {
      // Reauth interrupts whatever the user was doing, so hand the current URL
      // over as the return target — otherwise they reauthenticate successfully
      // and land on /home, having lost the action they started.
      const route = flowRoute(content, nextParam, location.pathname + location.search, location.pathname);
      if (route) {
        navigate(route.path, route.state ? { state: route.state } : undefined);
        return;
      }
      const handled = handleFormErrors(content.errors, setError, setGlobalError);
      if (!handled) {
        setGlobalError("Something went wrong. Please try again.");
      }
    } catch (e) {
      console.error(e);
      setGlobalError("An unexpected error occurred.");
    }
  };

  return { next };
};

// One factory backs every allauth form hook — only the schema, defaults, and the
// single allauth call differ; success/flow/error handling is shared via `next`.
function useAllauthForm<T extends Record<string, unknown>>(
  schema: z.ZodType<T>,
  defaultValues: DefaultValues<T>,
  submitFn: (data: T) => Promise<APIResponse>
) {
  const [globalError, setGlobalError] = useState<string | null>(null);
  // Cast: zodResolver can't infer the input type from the generic `z.ZodType<T>`
  // parameter, but callers supply a concrete schema so the T inference is sound.
  const form = useForm<T>({ resolver: zodResolver(schema as never) as Resolver<T>, defaultValues });
  const { next } = useNextFunc(form.setError, setGlobalError);

  function onSubmit(data: T) {
    setGlobalError(null);
    submitFn(data)
      .then(next)
      .catch((e) => {
        console.error(e);
        setGlobalError("An unexpected error occurred.");
      });
  }

  return { onSubmit, globalError, form };
}

// Shared by every code-entry flow (MFA authenticate/reauthenticate, TOTP activate).
const codeSchema = z.object({
  code: z.string().min(1, "Code is required"),
});

const loginFormSchema = z.object({
  username: z.string().min(1, "Username/Email is required"),
  password: z.string().min(1, "Password is required"),
});

export const useLoginForm = () => {
  // Send the identifier under the key the server's login method expects
  // ('email' when email login is configured, otherwise 'username'). Resolved
  // at submit time so it waits for the lazily-loaded config.
  return useAllauthForm(
    loginFormSchema,
    { username: "", password: "" },
    async (data) => login({ [await resolveCredentialKey()]: data.username, password: data.password })
  );
};

export const useAuthCodeForm = () =>
  useAllauthForm(codeSchema, { code: "" }, (data) => mfaAuthenticate(data.code));

export const useMFAReauthenticateForm = () =>
  useAllauthForm(codeSchema, { code: "" }, (data) => mfaReauthenticate(data.code));

const passwordSchema = z.object({
  password: z.string().min(1, "Password is required"),
});

// Password reauthentication. Shares `next`, so a successful confirm returns the
// user to whatever action sent them here rather than dropping them on /home.
export const useReauthenticateForm = () =>
  useAllauthForm(passwordSchema, { password: "" }, (data) => reauthenticate({ password: data.password }));

const trustSchema = z.object({
  trust: z.boolean(),
});

export const useMFATrustForm = () =>
  useAllauthForm(trustSchema, { trust: false }, (data) => mfaTrust(data.trust));

export const useActivateTotpForm = () =>
  useAllauthForm(codeSchema, { code: "" }, (data) => activateTOTPAuthenticator(data.code));

// Deactivation takes no input; the empty form only drives submit state in the UI.
const emptySchema = z.object({});

export const useDeactivateTotpForm = () =>
  useAllauthForm(emptySchema, {}, () => deactivateTOTPAuthenticator());
