import type { Genre } from "@/interfaces/Genre";
import { API_URL, handleResponse } from "@/lib/api/http";

export async function getGenres(): Promise<Genre[]> {
  const response = await fetch(`${API_URL}/api/genres`);

  return handleResponse<Genre[]>(response);
}

export async function getGenreById(id: number): Promise<Genre> {
  const response = await fetch(`${API_URL}/api/genres/${id}`);

  return handleResponse<Genre>(response);
}

export interface GenreInput {
  name: string;
}

export async function createGenre(input: GenreInput): Promise<Genre> {
  const response = await fetch(`${API_URL}/api/genres`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });

  return handleResponse<Genre>(response);
}

export async function updateGenre(
  id: number,
  input: GenreInput,
): Promise<Genre> {
  const response = await fetch(`${API_URL}/api/genres/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });

  return handleResponse<Genre>(response);
}

export async function deleteGenre(id: number): Promise<void> {
  const response = await fetch(`${API_URL}/api/genres/${id}`, {
    method: "DELETE",
  });

  return handleResponse<void>(response);
}
