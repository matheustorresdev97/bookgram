"use server";

import { redirect } from "next/navigation";

import { addComment } from "@/lib/api/comments";
import { getCurrentUser } from "@/lib/session";

export interface CreatePostFormState {
  error?: string;
}

export async function createPost(
  _prevState: CreatePostFormState,
  formData: FormData,
): Promise<CreatePostFormState> {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  const bookId = Number(formData.get("bookId"));
  const rating = Number(formData.get("rating"));
  const text = String(formData.get("text") ?? "").trim();

  if (!bookId) {
    return { error: "Selecione um livro." };
  }

  if (!rating || rating < 1 || rating > 5) {
    return { error: "Selecione uma nota de 1 a 5." };
  }

  if (!text) {
    return { error: "Escreva um comentário." };
  }

  await addComment({ bookId, username: user.username, rating, text });

  redirect(`/book/${bookId}`);
}
