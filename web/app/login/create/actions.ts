"use server";

import { redirect } from "next/navigation";

import { register } from "@/lib/api/auth";
import { createSession } from "@/lib/session";

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

  await createSession(result.user.username);

  redirect("/account");
}
