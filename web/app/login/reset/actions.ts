"use server";

import { redirect } from "next/navigation";

import { resetPassword } from "@/lib/api/auth";

export interface ResetPasswordFormState {
  error?: string;
}

export async function resetPasswordAction(
  _prevState: ResetPasswordFormState,
  formData: FormData,
): Promise<ResetPasswordFormState> {
  const token = String(formData.get("token") ?? "");
  const password = String(formData.get("password") ?? "");
  const confirmPassword = String(formData.get("confirm-password") ?? "");

  if (password !== confirmPassword) {
    return { error: "As senhas não coincidem." };
  }

  const result = await resetPassword(token, password);

  if (!result.success) {
    return { error: result.error ?? "Não foi possível redefinir a senha." };
  }

  redirect("/login");
}
