"use server";

import { redirect } from "next/navigation";

import { login as loginRequest } from "@/lib/api/auth";
import { createSession } from "@/lib/session";

export interface LoginFormState {
  error?: string;
}

export async function login(
  _prevState: LoginFormState,
  formData: FormData,
): Promise<LoginFormState> {
  const username = String(formData.get("username") ?? "");
  const password = String(formData.get("password") ?? "");

  const result = await loginRequest(username, password);

  if (!result.success || !result.user) {
    return { error: result.error ?? "Não foi possível entrar." };
  }

  await createSession(result.user.username);

  redirect("/account");
}
