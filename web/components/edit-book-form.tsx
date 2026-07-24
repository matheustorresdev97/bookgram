"use client";

import { updateBookAction } from "@/app/book/[id]/edit/actions";
import { BookForm, type BookFormDefaultValues } from "@/components/book-form";

export function EditBookForm({
  bookId,
  defaultValues,
}: {
  bookId: number;
  defaultValues: BookFormDefaultValues;
}) {
  return (
    <BookForm
      action={updateBookAction.bind(null, bookId)}
      defaultValues={defaultValues}
      submitLabel="Salvar alterações"
      pendingLabel="Salvando..."
    />
  );
}
