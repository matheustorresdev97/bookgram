"use client";

import { useActionState } from "react";
import Link from "next/link";

import {
  requestReset,
  type LostPasswordFormState,
} from "@/app/login/lost/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const initialState: LostPasswordFormState = { submitted: false };

export function LostPasswordForm() {
  const [state, formAction, pending] = useActionState(
    requestReset,
    initialState,
  );

  if (state.submitted) {
    return (
      <div className="flex flex-col gap-4">
        <p className="text-sm text-muted-foreground">
          Se o e-mail informado estiver cadastrado, você receberá um link
          para redefinir sua senha em instantes.
        </p>
        <Button
          variant="outline"
          render={<Link href="/login/reset?token=demo-token-123" />}
        >
          Simular link recebido por e-mail
        </Button>
      </div>
    );
  }

  return (
    <form className="flex flex-col gap-4" action={formAction}>
      <div className="flex flex-col gap-2">
        <Label htmlFor="email">E-mail</Label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="voce@email.com"
          autoComplete="email"
          required
        />
      </div>
      <Button type="submit" className="mt-2" disabled={pending}>
        {pending ? "Enviando..." : "Enviar link de redefinição"}
      </Button>
    </form>
  );
}
