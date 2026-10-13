import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { onError } from "@apollo/client/link/error";
import { ApolloProvider } from "@apollo/client/react";
import { getCSRFToken } from "./lib/django";
import { getAuth, wasAuthenticated } from "./lib/allauth";
import fragment from "./api/fragments";



  const httpLink = createHttpLink({
    uri: "/lok/managementgraphql/",
    credentials: "include",
  });

  const authLink = setContext((_, { headers }) => {
    // get the authentication token from local storage if it exists
    const token = getCSRFToken();
    // return the headers to the context so httpLink can read them
    return {
      headers: {
        ...headers,
        "X-CSRFToken": token,
      }
    }
  });

  // lok's answer to a request without a session (api/management/extensions.py).
  const AUTH_REQUIRED_RE = /authentication required/i;
  let recheckingSession = false;

  // The app learns about its session from allauth responses only, so a session
  // that expired between two of them left it believing it was signed in: the
  // "Sign in" button then bounced straight back to the failing page. Asking
  // allauth again makes it broadcast the real state, and the route guards send
  // the user to the login form (and back here afterwards).
  const sessionLink = onError(({ graphQLErrors, networkError }) => {
    const status = (networkError as { statusCode?: number } | undefined)?.statusCode;
    // 403 too: without a CSRF cookie Django refuses the POST before lok's own
    // check runs. Re-asking is harmless when the session turns out to be fine.
    const unauthenticated =
      status === 401 || status === 403 || (graphQLErrors ?? []).some((e) => AUTH_REQUIRED_RE.test(e.message));
    if (!unauthenticated || recheckingSession || !wasAuthenticated()) return;
    recheckingSession = true;
    getAuth()
      .catch(() => undefined)
      .finally(() => { recheckingSession = false; });
  });

export const client = new ApolloClient({
  link: sessionLink.concat(authLink).concat(httpLink),

  cache: new InMemoryCache({
    possibleTypes: fragment.possibleTypes
  }),

});


export const Apollo = ({ children }: { children: React.ReactNode }) => {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}