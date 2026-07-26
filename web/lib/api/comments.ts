import type { BookComment } from "@/interfaces/Comment";
import {
  API_URL,
  handleDeleteResponse,
  handleResponse,
  handleResponseOrUndefined,
} from "@/lib/api/http";

export async function getCommentsByBookId(
  bookId: number,
): Promise<BookComment[]> {
  const response = await fetch(`${API_URL}/api/comments/by-book/${bookId}`);

  return handleResponse<BookComment[]>(response);
}

export async function addComment(
  input: {
    bookId: number;
    rating: number;
    text: string;
  },
  token: string | null,
): Promise<BookComment> {
  const response = await fetch(`${API_URL}/api/comments`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify(input),
  });

  return handleResponse<BookComment>(response);
}

export async function getCommentsCountByBookIds(
  bookIds: number[],
): Promise<number> {
  if (bookIds.length === 0) {
    return 0;
  }

  const response = await fetch(
    `${API_URL}/api/comments/count?bookIds=${bookIds.join(",")}`,
  );

  return handleResponse<number>(response);
}

export async function getCommentById(
  id: number,
): Promise<BookComment | undefined> {
  const response = await fetch(`${API_URL}/api/comments/${id}`);

  return handleResponseOrUndefined<BookComment>(response);
}

export async function updateComment(
  id: number,
  input: { rating: number; text: string },
  token: string | null,
): Promise<BookComment | undefined> {
  const response = await fetch(`${API_URL}/api/comments/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify(input),
  });

  return handleResponseOrUndefined<BookComment>(response);
}

export async function deleteComment(
  id: number,
  token: string | null,
): Promise<boolean> {
  const response = await fetch(`${API_URL}/api/comments/${id}`, {
    method: "DELETE",
    headers: token ? { Authorization: `Bearer ${token}` } : undefined,
  });

  return handleDeleteResponse(response);
}
