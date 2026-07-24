import Link from "next/link";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function NavButton({
  href,
  active,
  children,
}: {
  href: string;
  active: boolean;
  children: React.ReactNode;
}) {
  return (
    <Button
      variant="ghost"
      className={cn(active && "bg-muted text-foreground")}
      render={<Link href={href} />}
    >
      {children}
    </Button>
  );
}
