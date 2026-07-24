"use client";

import { useTransition } from "react";

import { deleteBookAction } from "@/app/book/[id]/actions";
import { Button } from "@/components/ui/button";

export function DeleteBookButton({ bookId }: { bookId: number }) {
  const [isPending, startTransition] = useTransition();

  return (
    <Button
      type="button"
      variant="destructive"
      disabled={isPending}
      onClick={() => startTransition(() => deleteBookAction(bookId))}
    >
      Excluir
    </Button>
  );
}
