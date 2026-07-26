"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { deleteBook, getBookById } from "@/lib/api/books";
import {
  addComment,
  deleteComment,
  getCommentById,
  updateComment,
} from "@/lib/api/comments";
import { toggleLike as toggleLikeApi } from "@/lib/api/likes";
import { getCurrentUser, getSessionToken } from "@/lib/session";

export async function toggleLike(bookId: number) {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  const token = await getSessionToken();
  await toggleLikeApi(bookId, token);
  revalidatePath(`/book/${bookId}`);
}

export interface AddCommentFormState {
  error?: string;
}

export async function addBookComment(
  bookId: number,
  _prevState: AddCommentFormState,
  formData: FormData,
): Promise<AddCommentFormState> {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  const rating = Number(formData.get("rating"));
  const text = String(formData.get("text") ?? "").trim();

  if (!rating || rating < 1 || rating > 5) {
    return { error: "Selecione uma nota de 1 a 5." };
  }

  if (!text) {
    return { error: "Escreva um comentário." };
  }

  const token = await getSessionToken();
  await addComment({ bookId, rating, text }, token);
  revalidatePath(`/book/${bookId}`);

  return {};
}

export async function deleteBookAction(bookId: number) {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  const book = await getBookById(bookId);

  if (!book || book.postedBy !== user.username) {
    redirect(`/book/${bookId}`);
  }

  const token = await getSessionToken();
  await deleteBook(bookId, token);
  redirect("/account");
}

export interface UpdateCommentFormState {
  error?: string;
}

export async function updateCommentAction(
  commentId: number,
  bookId: number,
  formData: FormData,
): Promise<UpdateCommentFormState> {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  const existing = await getCommentById(commentId);

  if (!existing) {
    return { error: "Comentário não encontrado." };
  }

  if (existing.username !== user.username) {
    return { error: "Você não tem permissão para editar este comentário." };
  }

  const rating = Number(formData.get("rating"));
  const text = String(formData.get("text") ?? "").trim();

  if (!rating || rating < 1 || rating > 5) {
    return { error: "Selecione uma nota de 1 a 5." };
  }

  if (!text) {
    return { error: "Escreva um comentário." };
  }

  const token = await getSessionToken();
  await updateComment(commentId, { rating, text }, token);
  revalidatePath(`/book/${bookId}`);

  return {};
}

export async function deleteCommentAction(commentId: number, bookId: number) {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  const existing = await getCommentById(commentId);

  if (!existing || existing.username !== user.username) {
    redirect(`/book/${bookId}`);
  }

  const token = await getSessionToken();
  await deleteComment(commentId, token);
  revalidatePath(`/book/${bookId}`);
}
