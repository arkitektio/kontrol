import {
  LazyQueryHookOptions,
  MutationHookOptions,
  QueryHookOptions,
  SubscriptionHookOptions,
  useLazyQuery as useApolloLazyQuery,
  useMutation as useApolloMutation,
  useQuery as useApolloQuery,
  useSubscription as useApolloSubscription,
} from "@apollo/client";
import { ApolloError } from "@apollo/client";
import { toast } from "sonner";

export const onApolloError = (service: name) => (error: ApolloError) => {
  console.error(error);

  if (error.graphQLErrors) {
    let message = error.graphQLErrors.map((e) => e.message).join(", ");
    error.graphQLErrors.forEach((e) => {
      toast.error(<div className="p-3">{message}</div>, {
        description: "This is a graphql-server on " + service,
      });
    });
  } else {
    toast.error(<div className="p-3">{error.message}</div>, {
      description: "This is a network-error on " + service,
    });
  }

  return error;
};


type MutationFuncType = typeof useApolloMutation;
type QueryFuncType = typeof useApolloQuery;
type LazyQueryFuncType = typeof useApolloLazyQuery;
type SubscriptionFuncType = typeof useApolloSubscription;

export type {
  LazyQueryHookOptions,
  MutationHookOptions,
  QueryHookOptions,
  SubscriptionHookOptions
};

export const useMutation: MutationFuncType = (doc, options) => {
  

  return useApolloMutation(doc, {
    ...options,
    onError: onApolloError("lok"),
  });
};

export const useQuery: QueryFuncType = (doc, options) => {
  

  console.log("lok", lok);

  return useApolloQuery(doc, { ...options });
};

export const useSubscription: SubscriptionFuncType = (doc, options) => {
  

  return useApolloSubscription(doc, { ...options });
};

export const useLazyQuery: LazyQueryFuncType = (doc, options) => {
  
  return useApolloLazyQuery(doc, { ...options});
};
