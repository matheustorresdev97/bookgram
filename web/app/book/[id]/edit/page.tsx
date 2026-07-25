import { notFound, redirect } from "next/navigation";

import { EditBookForm } from "@/components/edit-book-form";
import { getBookById } from "@/lib/api/books";
import { getGenres } from "@/lib/api/genres";
import { getCurrentUser } from "@/lib/session";

export default async function EditBookPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const bookId = Number(id);
  const book = await getBookById(bookId);

  if (!book) {
    notFound();
  }

  const user = await getCurrentUser();

  if (!user || user.username !== book.postedBy) {
    redirect(`/book/${bookId}`);
  }

  const genres = await getGenres();

  return (
    <main className="mx-auto flex w-full max-w-3xl flex-col gap-6 px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="text-3xl">Editar livro</h1>
      <EditBookForm
        bookId={book.id}
        defaultValues={{
          title: book.title,
          author: book.author,
          genre: book.genre,
          description: book.description,
          coverUrl: book.coverUrl,
        }}
        genres={genres}
      />
    </main>
  );
}
