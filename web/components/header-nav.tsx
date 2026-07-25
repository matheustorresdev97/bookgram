"use client";

import { usePathname } from "next/navigation";

import { logout } from "@/app/actions";
import { Avatar } from "@/components/avatar";
import { NavButton } from "@/components/nav-button";
import { Button } from "@/components/ui/button";
import { useUser } from "@/components/user-provider";

export function HeaderNav() {
  const pathname = usePathname();
  const user = useUser();

  return (
    <nav className="flex items-center gap-1">
      {user ? (
        <>
          <NavButton href="/account" active={pathname === "/account"}>
            <Avatar username={user.username} size="sm" />
            {user.username}
          </NavButton>
          <form action={logout}>
            <Button type="submit" variant="ghost">
              Sair
            </Button>
          </form>
        </>
      ) : (
        <>
          <NavButton href="/login" active={pathname === "/login"}>
            Entrar
          </NavButton>
          <NavButton
            href="/login/create"
            active={pathname === "/login/create"}
          >
            Criar conta
          </NavButton>
        </>
      )}
    </nav>
  );
}
