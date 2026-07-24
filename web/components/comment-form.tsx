"use client";

import { Star } from "lucide-react";
import Link from "next/link";
import { useActionState, useState } from "react";

import {
  addBookComment,
  type AddCommentFormState,
} from "@/app/book/[id]/actions";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useUser } from "@/components/user-provider";
import { cn } from "@/lib/utils";

const initialState: AddCommentFormState = {};

export function CommentForm({ bookId }: { bookId: number }) {
  const user = useUser();
  const [rating, setRating] = useState(0);
  const [state, formAction, pending] = useActionState(
    addBookComment.bind(null, bookId),
    initialState,
  );

  if (!user) {
    return (
      <p className="text-sm text-muted-foreground">
        <Link
          href="/login"
          className="text-foreground underline underline-offset-4"
        >
          Faça login
        </Link>{" "}
        para comentar sobre esse livro.
      </p>
    );
  }

  return (
    <form action={formAction} className="flex flex-col gap-3">
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
                "size-5 text-muted-foreground transition-colors",
                star <= rating && "fill-primary text-primary",
              )}
            />
          </button>
        ))}
        <input type="hidden" name="rating" value={rating} />
      </div>
      <Textarea
        name="text"
        placeholder="O que você achou desse livro?"
        rows={3}
        required
      />
      {state?.error ? (
        <p className="text-sm text-destructive" role="alert">
          {state.error}
        </p>
      ) : null}
      <Button type="submit" className="self-start" disabled={pending}>
        {pending ? "Enviando..." : "Comentar"}
      </Button>
    </form>
  );
}
