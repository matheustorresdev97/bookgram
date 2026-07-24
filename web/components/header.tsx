"use client";

import { BookOpen } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { NavButton } from "@/components/nav-button";
import { currentUser } from "@/lib/session";

export function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-10 border-b border-border bg-background">
      <div className="flex h-14 w-full items-center justify-between px-6">
        <Link
          href="/"
          className="flex items-center gap-2 font-heading text-xl"
        >
          <BookOpen className="size-5 text-primary" />
          BookGram
        </Link>
        <nav className="flex items-center gap-1">
          {currentUser ? (
            <NavButton href="/account" active={pathname === "/account"}>
              Conta
            </NavButton>
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
      </div>
    </header>
  );
}
