import { ApiError } from "./ApiError";
import { clearToken, getToken } from "./token";

export const methods = ["GET", "POST", "PATCH", "DELETE"] as const;
export type Method = (typeof methods)[number];

let onUnauthorized: (() => void) | null = null;

export const setUnauthorizedHandler = (fn: () => void) => {
  onUnauthorized = fn;
};

const BASIC_API_URL = import.meta.env.VITE_API_URL;
if (!BASIC_API_URL) {
  throw new ApiError("VITE_API_URL not set");
}

export type Options = {
  method?: Method;
  body?: unknown;
  skipAuthHandling?: boolean;
};

type ErrorResponseSchema = {
  success: boolean;
  message: string;
  errors?: { field: string; message: string }[];
};

export const request = async <T>(
  path: string,
  options: Options = {},
): Promise<T> => {
  const url = `${BASIC_API_URL}${path}`;
  const headerPayload: Record<string, string> = {};

  if (options.body !== undefined) {
    headerPayload["Content-Type"] = "application/json";
  }
  const token = getToken();
  if (token && !options.skipAuthHandling) {
    headerPayload["Authorization"] = `Bearer ${token}`;
  }

  let response: Response;
  try {
    response = await fetch(url, {
      method: options.method || "GET",
      headers: headerPayload,
      body:
        options.body !== undefined ? JSON.stringify(options.body) : undefined,
    });
  } catch {
    throw new ApiError("Couldn't reach the server", 0);
  }

  if (!response.ok) {
    const statusCode = response.status;
    if (statusCode === 401 && !options.skipAuthHandling) {
      clearToken();
      onUnauthorized?.();
    }
    let data: ErrorResponseSchema | null;
    try {
      data = await response.json();
    } catch {
      data = null;
    }
    if (typeof data?.message !== "string") {
      throw new ApiError(`Request failed with ${statusCode}`, statusCode);
    }
    throw new ApiError(data?.message, statusCode, data?.errors);
  }

  if (response.status === 204) {
    return null as T;
  }

  const responseBody = await response.json();
  return responseBody.data;
};
