import type { Book } from "@/interfaces/Book";
import {
  API_URL,
  handleDeleteResponse,
  handleResponse,
  handleResponseOrUndefined,
} from "@/lib/api/http";

export interface GetBooksOptions {
  query?: string;
  page?: number;
  pageSize?: number;
}

export interface GetBooksResult {
  books: Book[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export async function getBooks(
  options: GetBooksOptions = {},
): Promise<GetBooksResult> {
  const { query = "", page = 1, pageSize = 10 } = options;

  const params = new URLSearchParams();
  if (query) params.set("query", query);
  params.set("page", String(page));
  params.set("pageSize", String(pageSize));

  const response = await fetch(`${API_URL}/api/books?${params.toString()}`);

  return handleResponse<GetBooksResult>(response);
}

export async function getBookById(id: number): Promise<Book | undefined> {
  const response = await fetch(`${API_URL}/api/books/${id}`);

  return handleResponseOrUndefined<Book>(response);
}

export async function getBooksByUser(username: string): Promise<Book[]> {
  const response = await fetch(
    `${API_URL}/api/books/by-user/${encodeURIComponent(username)}`,
  );

  return handleResponse<Book[]>(response);
}

export interface AddBookInput {
  title: string;
  author: string;
  description: string;
  coverUrl: string;
  genre: string;
  postedBy: string;
}

export async function addBook(input: AddBookInput): Promise<Book> {
  const response = await fetch(`${API_URL}/api/books`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });

  return handleResponse<Book>(response);
}

export interface UpdateBookInput {
  title: string;
  author: string;
  description: string;
  coverUrl: string;
  genre: string;
}

export async function updateBook(
  id: number,
  input: UpdateBookInput,
): Promise<Book | undefined> {
  const response = await fetch(`${API_URL}/api/books/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });

  return handleResponseOrUndefined<Book>(response);
}

export async function deleteBook(id: number): Promise<boolean> {
  const response = await fetch(`${API_URL}/api/books/${id}`, {
    method: "DELETE",
  });

  return handleDeleteResponse(response);
}
