"use server";

import { redirect } from "next/navigation";

import type { BookFormState } from "@/components/book-form";
import { addBook } from "@/lib/api/books";
import { parseBookFormFields } from "@/lib/forms/parse-book-form";
import { getCurrentUser, getSessionToken } from "@/lib/session";

export async function createBook(
  _prevState: BookFormState,
  formData: FormData,
): Promise<BookFormState> {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  const parsed = parseBookFormFields(formData);

  if (!parsed.success) {
    return { error: parsed.error };
  }

  const token = await getSessionToken();
  const book = await addBook(parsed.data, token);

  redirect(`/book/${book.id}`);
}
