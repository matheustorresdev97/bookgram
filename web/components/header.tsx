import { BookOpen } from "lucide-react";
import Link from "next/link";

import { HeaderNav } from "@/components/header-nav";
import { getCurrentUser } from "@/lib/session";

export async function Header() {
  const user = await getCurrentUser();

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
        <HeaderNav user={user} />
      </div>
    </header>
  );
}
