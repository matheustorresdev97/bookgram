"use client";

import { usePathname } from "next/navigation";

import { NavButton } from "@/components/nav-button";
import { useUser } from "@/components/user-provider";

const ACCOUNT_LINKS = [
  { href: "/account", label: "Perfil" },
  { href: "/account/post", label: "Postar" },
  { href: "/account/statistics", label: "Estatísticas" },
];

export function AccountNav() {
  const pathname = usePathname();
  const user = useUser();

  return (
    <div className="flex flex-col gap-4 border-b border-border pb-4">
      {user ? (
        <p className="text-sm text-muted-foreground">
          Logado como{" "}
          <span className="font-medium text-foreground">
            {user.username}
          </span>
        </p>
      ) : null}
      <nav className="flex items-center gap-1">
        {ACCOUNT_LINKS.map((link) => (
          <NavButton
            key={link.href}
            href={link.href}
            active={pathname === link.href}
          >
            {link.label}
          </NavButton>
        ))}
      </nav>
    </div>
  );
}
