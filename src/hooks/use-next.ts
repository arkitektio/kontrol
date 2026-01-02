import type { AuthFlow } from "@/auth/types";
import { activateTOTPAuthenticator, deactivateTOTPAuthenticator, login, mfaAuthenticate, mfaReauthenticate, mfaTrust, type APIResponse } from "@/lib/allauth";
import { handleFormErrors } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm, type UseFormReturn } from "react-hook-form";
import { useNavigate, useSearchParams } from "react-router";
import * as z from "zod";

export const flowToUrl = (flow: AuthFlow, next: string): string => {

  switch (flow.id) {
    case 'mfa_authenticate':
      return "/account/authenticate/totp";
    case 'mfa_trust':
      return "/account/2fa/trust";
    case 'mfa_reauthenticate':
      return "/account/reauthenticate/totp";
    default:
      return "/error/" + flow.id;
  }
}

const isPending = (flow: AuthFlow): boolean => {
  return flow.is_pending || flow.id == "mfa_reauthenticate";
}

const useNextFunc = <T extends {[key: string]: unknown}>(form: UseFormReturn<T>, setGlobalError: React.Dispatch<React.SetStateAction<string | null>>) => {
    const navigate = useNavigate();
    const [pendingFlows, setPendingFlows] = useState<Array<AuthFlow>>([]);

    const path = useSearchParams()[0].get("next") || "/home";

    const next = (content: APIResponse) => {

        console.log("Next called with content:", content, path);
        if (content.status === 200) {

            navigate(path);
        }
        try {
            if (content.data?.flows?.some(isPending)) {
                navigate(flowToUrl(content.data.flows.find(isPending)!, path));
                return
            }
             else {
            const handled = handleFormErrors(content.errors, form.setError, setGlobalError)
            if (!handled) {
                setGlobalError("Login failed.")
            }
            }
        } catch (e) {
            console.error(e)
            setGlobalError("An unexpected error occurred.")
        }
    };



    return { next };

};


const loginFormSchema = z.object({
  username: z.string().min(1, "Username/Email is required"),
  password: z.string().min(1, "Password is required"),
})


export const useLoginForm = () => {



    const [globalError, setGlobalError] = useState<string | null>(null);

    const form = useForm<z.infer<typeof loginFormSchema>>({
        resolver: zodResolver(loginFormSchema),
        defaultValues: {
          username: "",
          password: "",
        },
      })



    const next = useNextFunc(form, setGlobalError);

    function onSubmit (data: {username: string, password: string}) {
        setGlobalError(null)
        login({ username: data.username, password: data.password }).then((content) => {
            next.next(content);
        }).catch((e) => {
            console.error(e)
        })
      }

    return { onSubmit, globalError, form };
}

export const authCodeFormSchema = z.object({
  code: z.string().min(1, "Authentication code is required"),
})


export const useAuthCodeForm = () => {



    const [globalError, setGlobalError] = useState<string | null>(null);

    const form = useForm<z.infer<typeof authCodeFormSchema>>({
        resolver: zodResolver(authCodeFormSchema),
        defaultValues: {
          code: "",
        },
      })



    const next = useNextFunc(form, setGlobalError);

    function onSubmit (data: {code: string}) {
        setGlobalError(null)
        mfaAuthenticate(data.code).then((content) => {
            next.next(content);
        }).catch((e) => {
            console.error(e)
            setGlobalError("An unexpected error occurred.")
        })
      }

    return { onSubmit, globalError, form };
}


export const reauthenticateTOTPFormSchema = z.object({
  code: z.string().min(1, "Authentication code is required"),
})


export const useMFAReauthenticateForm = () => {



    const [globalError, setGlobalError] = useState<string | null>(null);

    const form = useForm<z.infer<typeof reauthenticateTOTPFormSchema>>({
        resolver: zodResolver(reauthenticateTOTPFormSchema),
        defaultValues: {
          code: "",
        },
      })



    const next = useNextFunc(form, setGlobalError);

    function onSubmit (data: {code: string}) {
        setGlobalError(null)
        mfaReauthenticate(data.code).then((content) => {
            next.next(content);
        }).catch((e) => {
            console.error(e)
            setGlobalError("An unexpected error occurred.")
        })
      }

    return { onSubmit, globalError, form };
}



export const trustSchema = z.object({
  trust: z.boolean(),
})


export const useMFATrustForm = () => {



    const [globalError, setGlobalError] = useState<string | null>(null);

    const form = useForm<z.infer<typeof trustSchema>>({
        resolver: zodResolver(trustSchema),
        defaultValues: {
          trust: false,
        },
      })



    const next = useNextFunc(form, setGlobalError);

    function onSubmit (data: {trust: boolean}) {
        setGlobalError(null)
        mfaTrust(data.trust).then((content) => {
            next.next(content);
        }).catch((e) => {
            console.error(e)
            setGlobalError("An unexpected error occurred.")
        })
      }

    return { onSubmit, globalError, form };
}


const activateTotpSchema = z.object({
  code: z.string().min(1, "Authenticator code is required"),
})

export const useActivateTotpForm = () => {



    const [globalError, setGlobalError] = useState<string | null>(null);

    const form = useForm<z.infer<typeof activateTotpSchema>>({
        resolver: zodResolver(activateTotpSchema),
        defaultValues: {
          code: "",
        },
      })



    const next = useNextFunc(form, setGlobalError);

    function onSubmit (data: {code: string}) {
        setGlobalError(null)
        activateTOTPAuthenticator(data.code).then((content) => {
            next.next(content);
        }).catch((e) => {
            console.error(e)
            setGlobalError("An unexpected error occurred.")
        })
      }

    return { onSubmit, globalError, form };
}

const deactivateTotpSchema = z.object({
  code: z.string().nullable(),
})

export const useDeactivateTotpForm = () => {



    const [globalError, setGlobalError] = useState<string | null>(null);

    const form = useForm<z.infer<typeof deactivateTotpSchema>>({
        resolver: zodResolver(deactivateTotpSchema),
        defaultValues: {
          code: null,
        },
      })



    const next = useNextFunc(form, setGlobalError);

    function onSubmit (data: {code: string}) {
        setGlobalError(null)
        deactivateTOTPAuthenticator().then((content) => {
            next.next(content);
        }).catch((e) => {
            console.error(e)
            setGlobalError("An unexpected error occurred.")
        })
      }

    return { onSubmit, globalError, form };
}