import { API_URL, handleResponse } from "@/lib/api/http";

export async function hasLiked(
  bookId: number,
  username: string,
): Promise<boolean> {
  const params = new URLSearchParams({ bookId: String(bookId), username });
  const response = await fetch(`${API_URL}/api/likes/has-liked?${params.toString()}`);

  return handleResponse<boolean>(response);
}

export async function getLikesCountForBook(bookId: number): Promise<number> {
  const response = await fetch(`${API_URL}/api/likes/count/by-book/${bookId}`);

  return handleResponse<number>(response);
}

export async function getLikesCountByBookIds(
  bookIds: number[],
): Promise<number> {
  if (bookIds.length === 0) {
    return 0;
  }

  const response = await fetch(
    `${API_URL}/api/likes/count?bookIds=${bookIds.join(",")}`,
  );

  return handleResponse<number>(response);
}

export async function toggleLike(
  bookId: number,
  token: string | null,
): Promise<{ liked: boolean; likesCount: number }> {
  const response = await fetch(`${API_URL}/api/likes/toggle`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify({ bookId }),
  });

  return handleResponse<{ liked: boolean; likesCount: number }>(response);
}
