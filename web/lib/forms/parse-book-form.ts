export interface BookFormFields {
  title: string;
  author: string;
  genre: string;
  description: string;
  coverUrl: string;
}

export type ParseBookFormResult =
  | { success: true; data: BookFormFields }
  | { success: false; error: string };

/**
 * Extrai e valida os campos do formulário de livro (título/autor/gênero/
 * descrição/URL da capa), usado tanto na criação quanto na edição.
 */
export function parseBookFormFields(formData: FormData): ParseBookFormResult {
  const title = String(formData.get("title") ?? "").trim();
  const author = String(formData.get("author") ?? "").trim();
  const genre = String(formData.get("genre") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();
  const coverUrl = String(formData.get("coverUrl") ?? "").trim();

  if (!title || !author || !genre || !description || !coverUrl) {
    return { success: false, error: "Preencha todos os campos." };
  }

  return { success: true, data: { title, author, genre, description, coverUrl } };
}
