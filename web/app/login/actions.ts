"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { login as loginRequest } from "@/lib/api/auth";

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

  const cookieStore = await cookies();
  cookieStore.set("token", `mock-token-${result.user.username}`, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    maxAge: 60 * 60 * 24,
  });

  redirect("/account");
}
