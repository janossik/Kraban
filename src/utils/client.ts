import { clientAuth } from "@/clientFirebase";
import axios, { AxiosRequestConfig } from "axios";
import nookies from "nookies";

export const queryWithAuthorization = async <ResultType extends unknown>(
  verb: "get" | "post" | "put" | "delete",
  url: string,
  config?: AxiosRequestConfig<any> | null,
  data?: any,
  token?: string
) => {
  if (verb === "post" || verb === "put") {
    const result = await axios[verb]<ResultType>(url, data, {
      headers: {
        authorization: token || nookies.get(undefined, "token").token || false,
      },
      ...config,
    });
    return result.data;
  }
  const result = await axios[verb]<ResultType>(url, {
    headers: {
      authorization: token || nookies.get(undefined, "token").token || false,
    },
    ...config,
  });

  return result.data;
};

export const checkUserisAdmin = () => clientAuth.currentUser;
