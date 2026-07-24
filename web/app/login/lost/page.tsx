import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default async function LostPasswordPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">Esqueci minha senha</CardTitle>
        <CardDescription>
          Informe seu e-mail e enviaremos um link para redefinir sua senha.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <form className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="email">E-mail</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="voce@email.com"
              required
            />
          </div>
          <Button type="submit" className="mt-2">
            Enviar link de redefinição
          </Button>
        </form>
        <p className="text-center text-sm text-muted-foreground">
          Lembrou a senha?{" "}
          <Link
            href="/login"
            className="text-foreground underline underline-offset-4"
          >
            Entrar
          </Link>
        </p>
      </CardContent>
    </Card>
  );
}
