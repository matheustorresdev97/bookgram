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

export default async function CreatePage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">Criar conta</CardTitle>
        <CardDescription>
          Crie sua conta para começar a compartilhar suas leituras.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <form className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="name">Nome</Label>
            <Input
              id="name"
              name="name"
              type="text"
              placeholder="Seu nome"
              required
            />
          </div>
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
          <div className="flex flex-col gap-2">
            <Label htmlFor="password">Senha</Label>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="••••••••"
              required
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="confirm-password">Confirmar senha</Label>
            <Input
              id="confirm-password"
              name="confirm-password"
              type="password"
              placeholder="••••••••"
              required
            />
          </div>
          <Button type="submit" className="mt-2">
            Criar conta
          </Button>
        </form>
        <p className="text-center text-sm text-muted-foreground">
          Já tem conta?{" "}
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
