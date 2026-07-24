"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { register } from "@/lib/api/auth";

export interface CreateAccountFormState {
  error?: string;
}

export async function createAccount(
  _prevState: CreateAccountFormState,
  formData: FormData,
): Promise<CreateAccountFormState> {
  const name = String(formData.get("name") ?? "");
  const email = String(formData.get("email") ?? "");
  const password = String(formData.get("password") ?? "");
  const confirmPassword = String(formData.get("confirm-password") ?? "");

  if (password !== confirmPassword) {
    return { error: "As senhas não coincidem." };
  }

  const result = await register(name, email, password);

  if (!result.success || !result.user) {
    return { error: result.error ?? "Não foi possível criar a conta." };
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
