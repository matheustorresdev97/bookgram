"use server";

import { redirect } from "next/navigation";

import type { BookFormState } from "@/components/book-form";
import { getBookById, updateBook } from "@/lib/api/books";
import { parseBookFormFields } from "@/lib/forms/parse-book-form";
import { getCurrentUser, getSessionToken } from "@/lib/session";

export async function updateBookAction(
  bookId: number,
  _prevState: BookFormState,
  formData: FormData,
): Promise<BookFormState> {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  const book = await getBookById(bookId);

  if (!book) {
    return { error: "Livro não encontrado." };
  }

  if (book.postedBy !== user.username) {
    return { error: "Você não tem permissão para editar este livro." };
  }

  const parsed = parseBookFormFields(formData);

  if (!parsed.success) {
    return { error: parsed.error };
  }

  const token = await getSessionToken();
  await updateBook(bookId, parsed.data, token);

  redirect(`/book/${bookId}`);
}
