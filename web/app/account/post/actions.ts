"use server";

import { redirect } from "next/navigation";

import type { BookFormState } from "@/components/book-form";
import { addBook } from "@/lib/api/books";
import { getCurrentUser, getSessionToken } from "@/lib/session";

export async function createBook(
  _prevState: BookFormState,
  formData: FormData,
): Promise<BookFormState> {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  const title = String(formData.get("title") ?? "").trim();
  const author = String(formData.get("author") ?? "").trim();
  const genre = String(formData.get("genre") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();
  const coverUrl = String(formData.get("coverUrl") ?? "").trim();

  if (!title || !author || !genre || !description || !coverUrl) {
    return { error: "Preencha todos os campos." };
  }

  const token = await getSessionToken();
  const book = await addBook({ title, author, genre, description, coverUrl }, token);

  redirect(`/book/${book.id}`);
}
