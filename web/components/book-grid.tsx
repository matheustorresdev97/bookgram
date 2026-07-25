import { BookCover } from "@/components/book-cover";
import { BookPagination } from "@/components/book-pagination";
import { getBooks } from "@/lib/api/books";

export async function BookGrid({
  query = "",
  page = 1,
}: {
  query?: string;
  page?: number;
}) {
  const { books, totalPages } = await getBooks({ query, page });

  function buildHref(targetPage: number) {
    const params = new URLSearchParams();
    if (query) params.set("q", query);
    params.set("page", String(targetPage));
    return `/?${params.toString()}`;
  }

  if (books.length === 0) {
    return (
      <p className="text-sm text-muted-foreground">
        Nenhum livro encontrado{query ? ` para "${query}"` : ""}.
      </p>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        {books.map((book) => (
          <BookCover key={book.id} book={book} />
        ))}
      </div>
      <BookPagination page={page} totalPages={totalPages} buildHref={buildHref} />
    </div>
  );
}
