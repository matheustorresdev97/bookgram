import Link from "next/link";

import { BookCover } from "@/components/book-cover";
import { Button } from "@/components/ui/button";
import { getBooksByUser } from "@/lib/api/books";
import { getCurrentUser } from "@/lib/session";

export default async function AccountPage() {
  const user = await getCurrentUser();
  const books = user ? await getBooksByUser(user.username) : [];

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl">Meus livros</h1>
        <Button render={<Link href="/account/post" />}>Postar livro</Button>
      </div>
      {books.length === 0 ? (
        <p className="text-sm text-muted-foreground">
          Você ainda não postou nenhum livro.
        </p>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {books.map((book) => (
            <BookCover key={book.id} book={book} />
          ))}
        </div>
      )}
    </div>
  );
}
