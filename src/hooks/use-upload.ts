
import { type PresignedPostCredentialsFragment } from "@/graphql/fragments/presigned_post.generated"
import { RequestMediaUploadDocument, type RequestMediaUploadMutation, type RequestMediaUploadMutationVariables } from "@/graphql/mutations/upload.generated"
import { useApolloClient } from "@apollo/client/react";
import { useCallback } from "react";
import { useDatalayerEndpoint } from "./use-datalayer";

export const uploadFetch = (
  url: RequestInfo | URL,
  options?:
    | (RequestInit & { onProgress?: (ev: ProgressEvent) => void })
    | undefined,
) =>
  new Promise<Response>((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = () => {
      if (xhr.status !== 204) {
        reject(new Error(`Failed to upload file: ${xhr.responseText}`));
      }
      const body = "response" in xhr ? xhr.response : (xhr as any).responseText;
      resolve(new Response(body));
    };
    xhr.onerror = () => {
      reject(new TypeError("Network request failed"));
    };
    xhr.ontimeout = () => {
      reject(new TypeError("Network request failed"));
    };

    xhr.open(options?.method || "POST", url.toString(), true);

    if (options?.headers) {
      Object.entries(options.headers).forEach(([key, value]) => {
        xhr.setRequestHeader(key, value);
      });
    }

    if (options?.onProgress) {
      xhr.upload.addEventListener("progress", options.onProgress);
    }

    if (options?.signal) {
      const signal = options.signal;

      if (signal) {
        signal.addEventListener("abort", () => {
          xhr.abort();
          reject(new DOMException("Aborted", "AbortError"));
        });
      }
    }

    xhr.send(options?.body as any);
  });

export type ExtraRequest = RequestInit & {
  onProgress?: (this: any, e: ProgressEvent) => void;
};

const customFetch = (uri: any, options: ExtraRequest) => {
  if (options.onProgress) {
    return uploadFetch(uri, options);
  }
  return fetch(uri, options);
};

export type UploadOptions = {
  signal?: AbortSignal;
  onProgress?: (ev: ProgressEvent) => void;
};

const uploadToStore = async (
  file: File,
  endpointUrl: string,
  z: PresignedPostCredentialsFragment,
  options?: UploadOptions,
) => {
  if (!z) {
    throw Error("No client configured");
  }

  const data = new FormData();
  data.append("key", z.key);
  data.append("bucket", z.bucket);
  data.append("X-Amz-Algorithm", z.xAmzAlgorithm);
  data.append("X-Amz-Credential", z.xAmzCredential);
  data.append("X-Amz-Date", z.xAmzDate);
  data.append("X-Amz-Signature", z.xAmzSignature);
  data.append("Policy", z.policy);
  // The policy pins this exactly (lok only allows png/jpeg/gif/webp/avif).
  data.append("Content-Type", z.contentType);

  data.append("file", file); // HYPER IMPORTANT TO BE THE LAST ITEM FOR FUCKS SAKE; HOW CAN THIS BE A STANDARD?

  const x = customFetch(`${endpointUrl}/${z.bucket}`, {
    body: data,
    mode: "cors",
    method: "POST",
    onProgress: options?.onProgress,
    signal: options?.signal,
  });

  const response = await x;
  if (!response.ok) {
    // The store refuses anything outside the signed policy (size, type) with a 4xx;
    // fetch doesn't throw on that, and returning the store id would attach an empty object.
    throw new Error(`Upload rejected by storage (${response.status})`);
  }
  return `${z.store}`;
};



// Mirrors lok's UPLOAD_MAX_BYTES; the presigned policy enforces it regardless.
export const MAX_MEDIA_UPLOAD_BYTES = 10 * 1024 * 1024;

export const useMediaUpload = () => {
  const client = useApolloClient();
  const datalayerEndpoint = useDatalayerEndpoint();

  const upload = useCallback(
    async (file: File) => {
      if (file.size > MAX_MEDIA_UPLOAD_BYTES) {
        throw new Error("Image is larger than 10 MB");
      }
      const data = await client.mutate<
        RequestMediaUploadMutation,
        RequestMediaUploadMutationVariables
      >({
        mutation: RequestMediaUploadDocument,
        variables: {
          key: file.name,
          datalayer: "default",
          contentType: file.type || undefined,
        },
      });

      if (!data.data?.requestMediaUpload) {
        throw Error("Failed to request upload");
      }

      const z = data.data.requestMediaUpload;

      return await uploadToStore(file, datalayerEndpoint, z, {});
    },
    [client, datalayerEndpoint],
  );

  return upload;
};