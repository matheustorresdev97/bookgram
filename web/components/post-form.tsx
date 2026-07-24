"use client";

import { Star } from "lucide-react";
import { useActionState, useState } from "react";

import { createPost, type CreatePostFormState } from "@/app/account/post/actions";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import type { Book } from "@/interfaces/Book";
import { cn } from "@/lib/utils";

const initialState: CreatePostFormState = {};

export function PostForm({ books }: { books: Book[] }) {
  const [state, formAction, pending] = useActionState(
    createPost,
    initialState,
  );
  const [rating, setRating] = useState(0);

  return (
    <form action={formAction} className="flex max-w-md flex-col gap-4">
      <div className="flex flex-col gap-2">
        <Label htmlFor="bookId">Livro</Label>
        <Select
          name="bookId"
          required
          items={books.map((book) => ({
            value: String(book.id),
            label: book.title,
          }))}
        >
          <SelectTrigger id="bookId" className="w-full">
            <SelectValue placeholder="Selecione um livro" />
          </SelectTrigger>
          <SelectContent>
            {books.map((book) => (
              <SelectItem key={book.id} value={String(book.id)}>
                {book.title}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-col gap-2">
        <Label>Nota</Label>
        <div className="flex items-center gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setRating(star)}
              aria-label={`${star} estrela${star > 1 ? "s" : ""}`}
              className="p-0.5"
            >
              <Star
                className={cn(
                  "size-6 text-muted-foreground transition-colors",
                  star <= rating && "fill-primary text-primary",
                )}
              />
            </button>
          ))}
        </div>
        <input type="hidden" name="rating" value={rating} />
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="text">Comentário</Label>
        <Textarea
          id="text"
          name="text"
          placeholder="O que você achou desse livro?"
          rows={4}
          required
        />
      </div>

      {state?.error ? (
        <p className="text-sm text-destructive" role="alert">
          {state.error}
        </p>
      ) : null}

      <Button type="submit" className="mt-2" disabled={pending}>
        {pending ? "Publicando..." : "Publicar"}
      </Button>
    </form>
  );
}
