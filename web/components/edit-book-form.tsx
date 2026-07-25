"use client";

import { updateBookAction } from "@/app/book/[id]/edit/actions";
import { BookForm, type BookFormDefaultValues } from "@/components/book-form";
import type { Genre } from "@/interfaces/Genre";

export function EditBookForm({
  bookId,
  defaultValues,
  genres,
}: {
  bookId: number;
  defaultValues: BookFormDefaultValues;
  genres: Genre[];
}) {
  return (
    <BookForm
      action={updateBookAction.bind(null, bookId)}
      defaultValues={defaultValues}
      submitLabel="Salvar alterações"
      pendingLabel="Salvando..."
      genres={genres}
    />
  );
}
