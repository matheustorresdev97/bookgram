"use client";

import { Pencil, Star, Trash2 } from "lucide-react";
import { useState, useTransition } from "react";

import {
  deleteCommentAction,
  updateCommentAction,
} from "@/app/book/[id]/actions";
import { Avatar } from "@/components/avatar";
import { StarRating } from "@/components/star-rating";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useUser } from "@/components/user-provider";
import type { BookComment } from "@/interfaces/Comment";
import { cn } from "@/lib/utils";

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

export function CommentItem({
  comment,
  bookId,
}: {
  comment: BookComment;
  bookId: number;
}) {
  const user = useUser();
  const isOwner = user?.username === comment.username;
  const [displayComment, setDisplayComment] = useState(comment);
  const [isDeleted, setIsDeleted] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [rating, setRating] = useState(displayComment.rating);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  if (isDeleted) {
    return null;
  }

  if (isEditing) {
    return (
      <form
        className="flex flex-col gap-3 rounded-lg border border-border p-4"
        action={(formData) => {
          setError(null);
          startTransition(async () => {
            const result = await updateCommentAction(
              comment.id,
              bookId,
              formData,
            );

            if (result.error) {
              setError(result.error);
              return;
            }

            const text = String(formData.get("text") ?? "");
            setDisplayComment((current) => ({ ...current, rating, text }));
            setIsEditing(false);
          });
        }}
      >
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
          defaultValue={displayComment.text}
          rows={3}
          required
        />
        {error ? (
          <p className="text-sm text-destructive" role="alert">
            {error}
          </p>
        ) : null}
        <div className="flex gap-2">
          <Button type="submit" disabled={isPending}>
            {isPending ? "Salvando..." : "Salvar"}
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => setIsEditing(false)}
          >
            Cancelar
          </Button>
        </div>
      </form>
    );
  }

  return (
    <div className="flex flex-col gap-1 rounded-lg border border-border p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Avatar username={displayComment.username} size="sm" />
          <span className="font-medium">{displayComment.username}</span>
        </div>
        <StarRating value={displayComment.rating} />
      </div>
      <p className="text-sm text-muted-foreground">{displayComment.text}</p>
      <div className="flex items-center justify-between">
        <span className="text-xs text-muted-foreground">
          {formatDate(displayComment.createdAt)}
        </span>
        {isOwner ? (
          <div className="flex gap-1">
            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              onClick={() => setIsEditing(true)}
              aria-label="Editar comentário"
            >
              <Pencil className="size-3.5" />
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              disabled={isPending}
              onClick={() =>
                startTransition(async () => {
                  await deleteCommentAction(comment.id, bookId);
                  setIsDeleted(true);
                })
              }
              aria-label="Excluir comentário"
            >
              <Trash2 className="size-3.5" />
            </Button>
          </div>
        ) : null}
      </div>
    </div>
  );
}
