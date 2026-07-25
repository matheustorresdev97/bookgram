"use client";

import { createBook } from "@/app/account/post/actions";
import { BookForm } from "@/components/book-form";
import type { Genre } from "@/interfaces/Genre";

export function PostForm({ genres }: { genres: Genre[] }) {
  return (
    <BookForm
      action={createBook}
      submitLabel="Publicar"
      pendingLabel="Publicando..."
      genres={genres}
    />
  );
}
