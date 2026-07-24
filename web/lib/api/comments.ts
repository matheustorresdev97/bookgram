import type { BookComment } from "@/interfaces/Comment";

const MOCK_LATENCY_MS = 500;

function delay<T>(value: T, ms = MOCK_LATENCY_MS): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(value), ms));
}

let comments: BookComment[] = [
  {
    id: 1,
    bookId: 1,
    username: "leitor",
    rating: 5,
    text: "Releitura obrigatória. A vigilância descrita parece cada vez mais atual.",
    createdAt: "2026-06-02T10:00:00.000Z",
  },
  {
    id: 2,
    bookId: 1,
    username: "maria.leitora",
    rating: 4,
    text: "Sombrio, mas necessário. O final ainda me assombra.",
    createdAt: "2026-06-10T18:30:00.000Z",
  },
  {
    id: 3,
    bookId: 3,
    username: "leitor",
    rating: 5,
    text: "Bilbo é um herói improvável demais bom. Recomendo para todas as idades.",
    createdAt: "2026-05-20T09:15:00.000Z",
  },
];

let nextId = comments.length + 1;

/**
 * Mock do client da futura API de comentários: assíncrono e com latência
 * simulada, para consumir igual a uma chamada de rede real.
 */
export async function getCommentsByBookId(
  bookId: number,
): Promise<BookComment[]> {
  const bookComments = comments
    .filter((comment) => comment.bookId === bookId)
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    );

  return delay(bookComments);
}

export async function addComment(input: {
  bookId: number;
  username: string;
  rating: number;
  text: string;
}): Promise<BookComment> {
  const comment: BookComment = {
    id: nextId++,
    createdAt: new Date().toISOString(),
    ...input,
  };

  comments = [comment, ...comments];

  return delay(comment);
}
