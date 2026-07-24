import { MessageCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { CommentForm } from "@/components/comment-form";
import { DeleteBookButton } from "@/components/delete-book-button";
import { LikeButton } from "@/components/like-button";
import { StarRating } from "@/components/star-rating";
import { Button } from "@/components/ui/button";
import { getBookById } from "@/lib/api/books";
import { getCommentsByBookId } from "@/lib/api/comments";
import { getLikesCountForBook, hasLiked } from "@/lib/api/likes";
import { getCurrentUser } from "@/lib/session";

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

export default async function BookIdPage({
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
  const [comments, likesCount, liked] = await Promise.all([
    getCommentsByBookId(bookId),
    getLikesCountForBook(bookId),
    user ? hasLiked(bookId, user.username) : Promise.resolve(false),
  ]);

  const isOwner = user?.username === book.postedBy;

  return (
    <main className="mx-auto flex w-full max-w-3xl flex-col gap-10 px-4 py-8 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-6 sm:flex-row">
        <div className="relative aspect-2/3 w-40 shrink-0 overflow-hidden rounded-lg bg-muted sm:w-48">
          <Image
            src={book.coverUrl}
            alt={`Capa de ${book.title}`}
            fill
            sizes="192px"
            className="object-cover"
            priority
          />
        </div>
        <div className="flex flex-col gap-3">
          <div>
            <h1 className="text-3xl">{book.title}</h1>
            <p className="text-muted-foreground">{book.author}</p>
            <p className="text-xs tracking-wide text-muted-foreground uppercase">
              {book.genre}
            </p>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <StarRating value={book.averageRating} />
            <span>
              {book.averageRating.toFixed(1)} ({book.totalReviews}{" "}
              avaliações)
            </span>
          </div>
          <p className="text-sm text-muted-foreground">
            Publicado em {formatDate(book.publishedDate)}
            {book.postedBy ? ` · Postado por ${book.postedBy}` : null}
          </p>
          <p className="max-w-prose text-base">{book.description}</p>
          <div className="flex items-center gap-2">
            <LikeButton
              bookId={book.id}
              initialLiked={liked}
              initialLikesCount={likesCount}
            />
            {isOwner ? (
              <>
                <Button
                  variant="outline"
                  render={<Link href={`/book/${book.id}/edit`} />}
                >
                  Editar
                </Button>
                <DeleteBookButton bookId={book.id} />
              </>
            ) : null}
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-4 border-t border-border pt-8">
        <h2 className="flex items-center gap-2 text-2xl">
          <MessageCircle className="size-5" />
          Comentários ({comments.length})
        </h2>
        <CommentForm bookId={book.id} />
        {comments.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            Ainda não há comentários sobre esse livro.
          </p>
        ) : (
          <div className="flex flex-col gap-4">
            {comments.map((comment) => (
              <div
                key={comment.id}
                className="flex flex-col gap-1 rounded-lg border border-border p-4"
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium">{comment.username}</span>
                  <StarRating value={comment.rating} />
                </div>
                <p className="text-sm text-muted-foreground">
                  {comment.text}
                </p>
                <span className="text-xs text-muted-foreground">
                  {formatDate(comment.createdAt)}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
