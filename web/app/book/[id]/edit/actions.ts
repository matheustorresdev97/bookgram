"use server";

import { redirect } from "next/navigation";

import type { BookFormState } from "@/components/book-form";
import { getBookById, updateBook } from "@/lib/api/books";
import { getCurrentUser } from "@/lib/session";

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

  const title = String(formData.get("title") ?? "").trim();
  const author = String(formData.get("author") ?? "").trim();
  const genre = String(formData.get("genre") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();
  const coverUrl = String(formData.get("coverUrl") ?? "").trim();

  if (!title || !author || !genre || !description || !coverUrl) {
    return { error: "Preencha todos os campos." };
  }

  await updateBook(bookId, { title, author, genre, description, coverUrl });

  redirect(`/book/${bookId}`);
}
