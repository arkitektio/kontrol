import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { ApolloProvider } from "@apollo/client/react";
import { getCSRFToken } from "./lib/django";
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

export const client = new ApolloClient({
  link: authLink.concat(httpLink),

  cache: new InMemoryCache({
    possibleTypes: fragment.possibleTypes
  }),

});


export const Apollo = ({ children }: { children: React.ReactNode }) => {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}