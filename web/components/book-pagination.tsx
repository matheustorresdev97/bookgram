import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";

export function BookPagination({
  page,
  totalPages,
  buildHref,
}: {
  page: number;
  totalPages: number;
  buildHref: (page: number) => string;
}) {
  if (totalPages <= 1) {
    return null;
  }

  return (
    <div className="flex items-center justify-center gap-4">
      {page > 1 ? (
        <Button
          variant="outline"
          size="icon"
          render={<Link href={buildHref(page - 1)} aria-label="Página anterior" />}
        >
          <ChevronLeft className="size-4" />
        </Button>
      ) : (
        <Button variant="outline" size="icon" disabled aria-label="Página anterior">
          <ChevronLeft className="size-4" />
        </Button>
      )}
      <span className="text-sm text-muted-foreground">
        Página {page} de {totalPages}
      </span>
      {page < totalPages ? (
        <Button
          variant="outline"
          size="icon"
          render={<Link href={buildHref(page + 1)} aria-label="Próxima página" />}
        >
          <ChevronRight className="size-4" />
        </Button>
      ) : (
        <Button variant="outline" size="icon" disabled aria-label="Próxima página">
          <ChevronRight className="size-4" />
        </Button>
      )}
    </div>
  );
}
