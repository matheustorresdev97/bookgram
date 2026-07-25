import { API_URL } from "@/lib/api/http";

interface ApiErrorBody {
  message?: string;
  fieldErrors?: Record<string, string> | null;
}

async function postAuth<T>(
  path: string,
  body: unknown,
): Promise<{ ok: true; data: T } | { ok: false; error: string }> {
  const response = await fetch(`${API_URL}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (response.ok) {
    const data =
      response.status === 204 ? undefined : ((await response.json()) as T);
    return { ok: true, data: data as T };
  }

  const apiError = (await response.json().catch(() => null)) as ApiErrorBody | null;
  const fieldErrorValues = apiError?.fieldErrors
    ? Object.values(apiError.fieldErrors)
    : [];
  const error =
    fieldErrorValues[0] ?? apiError?.message ?? "Erro ao comunicar com a API.";

  return { ok: false, error };
}

export interface LoginResult {
  success: boolean;
  user?: { username: string };
  token?: string;
  error?: string;
}

export async function login(
  username: string,
  password: string,
): Promise<LoginResult> {
  const result = await postAuth<{ token: string; username: string }>(
    "/api/auth/login",
    { username, password },
  );

  if (!result.ok) {
    return { success: false, error: result.error };
  }

  return {
    success: true,
    user: { username: result.data.username },
    token: result.data.token,
  };
}

export interface RegisterResult {
  success: boolean;
  user?: { username: string };
  token?: string;
  error?: string;
}

export async function register(
  name: string,
  email: string,
  password: string,
): Promise<RegisterResult> {
  const result = await postAuth<{ token: string; username: string }>(
    "/api/auth/register",
    { username: name, email, password },
  );

  if (!result.ok) {
    return { success: false, error: result.error };
  }

  return {
    success: true,
    user: { username: result.data.username },
    token: result.data.token,
  };
}

export interface RequestPasswordResetResult {
  success: boolean;
  token?: string;
}

export async function requestPasswordReset(
  email: string,
): Promise<RequestPasswordResetResult> {
  const result = await postAuth<{ token: string | null }>(
    "/api/auth/password-reset/request",
    { email },
  );

  if (!result.ok) {
    return { success: false };
  }

  return { success: true, token: result.data.token ?? undefined };
}

export interface ResetPasswordResult {
  success: boolean;
  error?: string;
}

export async function resetPassword(
  token: string,
  password: string,
): Promise<ResetPasswordResult> {
  const result = await postAuth<undefined>("/api/auth/password-reset/confirm", {
    token,
    newPassword: password,
  });

  if (!result.ok) {
    return { success: false, error: result.error };
  }

  return { success: true };
}
