import { Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Card, CardContent } from "@/components/ui/card";
import type { Book } from "@/interfaces/Book";

export function BookCover({ book }: { book: Book }) {
  return (
    <Link href={`/book/${book.id}`} className="group">
      <Card className="gap-0 py-0 transition-shadow hover:shadow-md">
        <div className="relative aspect-2/3 w-full bg-muted">
          <Image
            src={book.coverUrl}
            alt={`Capa de ${book.title}`}
            fill
            sizes="(min-width: 1024px) 20vw, (min-width: 640px) 33vw, 50vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        <CardContent className="flex flex-col gap-1 py-3">
          <p className="line-clamp-1 font-heading text-sm text-foreground">
            {book.title}
          </p>
          <p className="line-clamp-1 text-xs text-muted-foreground">
            {book.author}
          </p>
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Star className="size-3.5 fill-primary text-primary" />
            {book.averageRating.toFixed(1)}
            <span>({book.totalReviews})</span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
