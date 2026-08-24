import { Link, useSearchParams } from 'react-router-dom'
import { useConfig, appendNext, useCredentialKey } from '../auth'
import ProviderList from '../socialaccount/ProviderList'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"
import { useLoginForm } from '@/hooks/use-next'

/** The "or" rule between the password form and each alternative sign-in route. */
const Divider = ({ label }: { label: string }) => (
  <div className="relative">
    <div className="absolute inset-0 flex items-center">
      <span className="w-full border-t" />
    </div>
    <div className="relative flex justify-center text-xs uppercase">
      {/*
        * Transparent, not `bg-background`: RootLayout paints a LavaBackground
        * behind every route, so an opaque swatch here showed as a grey block
        * sitting on the gradient.
        */}
      <span className="text-muted-foreground bg-background/0 px-2 backdrop-blur-sm">
        {label}
      </span>
    </div>
  </div>
)

export const LoginForm = () => {
  const config = useConfig()
  const hasProviders = (config?.data?.socialaccount?.providers?.length ?? 0) > 0
  const nextParam = useSearchParams()[0].get("next")
  const next = nextParam || "/home"

  // Same as signup: label the single identifier field for the server's
  // configured login method rather than hedging with "Username or Email",
  // which contradicted the line above it telling people to enter their email.
  const isEmailLogin = useCredentialKey() === 'email'
  const identifierLabel = isEmailLogin ? 'Email' : 'Username'

  const { form, onSubmit, globalError } = useLoginForm()

  return (
    <div className="space-y-4">
      {/*
        * Only when a deep link actually asked for somewhere: `next` falls back
        * to /home, so testing it announced "you will be redirected to /home"
        * on every ordinary sign-in.
        */}
      {nextParam && nextParam !== '/' && (
        <p className="text-muted-foreground rounded-md border px-3 py-2 text-xs">
          You'll be taken to <code className="text-foreground">{nextParam}</code> after signing in.
        </p>
      )}

      {globalError && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{globalError}</AlertDescription>
        </Alert>
      )}

      <div className="space-y-8">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-semibold tracking-tight">Welcome back</h1>
          <p className="text-muted-foreground text-balance">
            Sign in to your account to continue
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{identifierLabel}</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={isEmailLogin ? 'name@example.com' : 'username'}
                      {...field}
                      autoComplete="username"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center justify-between gap-2">
                    <FormLabel>Password</FormLabel>
                    <Link
                      to={appendNext('/account/password/reset', nextParam)}
                      className="text-muted-foreground hover:text-foreground text-xs underline-offset-4 transition-colors hover:underline"
                    >
                      Forgot?
                    </Link>
                  </div>
                  <FormControl>
                    <Input type="password" {...field} autoComplete="current-password" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              size="lg"
              className="mt-2 w-full"
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting ? "Signing in…" : "Log in"}
            </Button>
          </form>
        </Form>

        {hasProviders && (
          <div>
            <Divider label="Or continue with" />
            {/*
              * No GoogleOneTap here: the one-tap prompt loads Google's script
              * and overlays itself on the page uninvited. The ordinary provider
              * buttons below cover the same sign-in without that.
              */}
            <div className="mt-4">
              <ProviderList callbackURL={next} process='login'/>
            </div>
          </div>
        )}

        {config?.data?.account?.login_by_code_enabled && (
          <div>
            {/* "Or" on its own when a provider divider already said the long form. */}
            <Divider label={hasProviders ? "Or" : "Or continue with"} />
            <div className="mt-4">
              <Button asChild variant="outline" className="w-full">
                <Link to={appendNext('/account/login/code', nextParam)}>Send me a sign-in code</Link>
              </Button>
            </div>
          </div>
        )}
      </div>

      <div className="pt-2 text-center text-sm">
        <p className="text-muted-foreground">
          Don't have an account?{" "}
          <Link to={appendNext('/account/signup', nextParam)} className="text-primary underline underline-offset-4 hover:text-primary/80">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  )
}

export default function Login () {
  // Centring and page padding come from LandingLayout's `center` prop; this
  // only caps the measure so the fields don't stretch on a wide screen.
  return (
    <div className="w-full max-w-sm">
      <LoginForm />
    </div>
  )
}
