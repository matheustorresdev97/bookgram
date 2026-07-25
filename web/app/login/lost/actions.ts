"use server";

import { requestPasswordReset } from "@/lib/api/auth";

export interface LostPasswordFormState {
  submitted: boolean;
  token?: string;
}

export async function requestReset(
  _prevState: LostPasswordFormState,
  formData: FormData,
): Promise<LostPasswordFormState> {
  const email = String(formData.get("email") ?? "");

  const result = await requestPasswordReset(email);

  return { submitted: true, token: result.token };
}
