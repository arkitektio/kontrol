import type { AuthFlow } from "@/auth/types";
import { useCredentialKey, appendNext } from "@/auth";
import {
  activateTOTPAuthenticator,
  deactivateTOTPAuthenticator,
  login,
  mfaAuthenticate,
  mfaReauthenticate,
  mfaTrust,
  type APIResponse,
} from "@/lib/allauth";
import { handleFormErrors } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, type Dispatch, type SetStateAction } from "react";
import { useForm, type DefaultValues, type Resolver, type UseFormSetError } from "react-hook-form";
import { useNavigate, useSearchParams } from "react-router";
import * as z from "zod";

export const flowToUrl = (flow: { id: string }): string => {
  switch (flow.id) {
    case 'mfa_authenticate':
      return "/account/authenticate/totp";
    case 'mfa_trust':
      return "/account/2fa/trust";
    case 'mfa_reauthenticate':
      return "/account/reauthenticate/totp";
    case 'verify_email':
      return "/account/verify-email";
    case 'provider_signup':
      return "/account/provider/signup";
    default:
      return "/error/" + flow.id;
  }
}

export const isPending = (flow: AuthFlow): boolean => {
  return flow.is_pending || flow.id == "mfa_reauthenticate";
}

// Shared post-response handler: on success go to `next`, on a pending flow route
// to that flow, otherwise surface field/global errors from the allauth response.
const useNextFunc = (
  setError: UseFormSetError<any>,
  setGlobalError: Dispatch<SetStateAction<string | null>>
) => {
  const navigate = useNavigate();
  // Raw nullable value (not `|| '/home'`) so it can be re-attached to an
  // intermediate flow URL without pinning downstream steps to /home.
  const nextParam = useSearchParams()[0].get("next");

  const next = (content: APIResponse) => {
    if (content.status === 200) {
      navigate(nextParam || "/home");
      return;
    }
    try {
      if (content.data?.flows?.some(isPending)) {
        navigate(appendNext(flowToUrl(content.data.flows.find(isPending)!), nextParam));
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
  // ('email' when email login is configured, otherwise 'username').
  const credKey = useCredentialKey();
  return useAllauthForm(
    loginFormSchema,
    { username: "", password: "" },
    (data) => login({ [credKey]: data.username, password: data.password })
  );
};

export const useAuthCodeForm = () =>
  useAllauthForm(codeSchema, { code: "" }, (data) => mfaAuthenticate(data.code));

export const useMFAReauthenticateForm = () =>
  useAllauthForm(codeSchema, { code: "" }, (data) => mfaReauthenticate(data.code));

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
