"use server";

import { requestPasswordReset } from "@/lib/api/auth";

export interface LostPasswordFormState {
  submitted: boolean;
}

export async function requestReset(
  _prevState: LostPasswordFormState,
  formData: FormData,
): Promise<LostPasswordFormState> {
  const email = String(formData.get("email") ?? "");

  await requestPasswordReset(email);

  return { submitted: true };
}
