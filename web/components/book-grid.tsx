import { BookCover } from "@/components/book-cover";
import { getBooks } from "@/lib/api/books";

export async function BookGrid() {
  const { books } = await getBooks();

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
      {books.map((book) => (
        <BookCover key={book.id} book={book} />
      ))}
    </div>
  );
}
