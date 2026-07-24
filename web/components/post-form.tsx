"use client";

import { createBook } from "@/app/account/post/actions";
import { BookForm } from "@/components/book-form";

export function PostForm() {
  return (
    <BookForm
      action={createBook}
      submitLabel="Publicar"
      pendingLabel="Publicando..."
    />
  );
}
