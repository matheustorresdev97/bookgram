import type { Like } from "@/interfaces/Like";

const MOCK_LATENCY_MS = 300;

function delay<T>(value: T, ms = MOCK_LATENCY_MS): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(value), ms));
}

const likes: Like[] = [
  { bookId: 1, username: "leitor" },
  { bookId: 3, username: "leitor" },
  { bookId: 5, username: "leitor" },
  { bookId: 7, username: "leitor" },
  { bookId: 10, username: "leitor" },
  { bookId: 1, username: "maria.leitora" },
];

export async function hasLiked(
  bookId: number,
  username: string,
): Promise<boolean> {
  return delay(
    likes.some((like) => like.bookId === bookId && like.username === username),
  );
}

export async function getLikesCountForBook(bookId: number): Promise<number> {
  return delay(likes.filter((like) => like.bookId === bookId).length);
}

export async function getLikesCountByBookIds(
  bookIds: number[],
): Promise<number> {
  return delay(likes.filter((like) => bookIds.includes(like.bookId)).length);
}

export async function toggleLike(
  bookId: number,
  username: string,
): Promise<{ liked: boolean; likesCount: number }> {
  const index = likes.findIndex(
    (like) => like.bookId === bookId && like.username === username,
  );

  if (index >= 0) {
    likes.splice(index, 1);
  } else {
    likes.push({ bookId, username });
  }

  const likesCount = likes.filter((like) => like.bookId === bookId).length;

  return delay({ liked: index < 0, likesCount });
}
