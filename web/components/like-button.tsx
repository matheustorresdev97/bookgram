"use client";

import { Heart } from "lucide-react";
import Link from "next/link";
import { useState, useTransition } from "react";

import { toggleLike } from "@/app/book/[id]/actions";
import { Button } from "@/components/ui/button";
import { useUser } from "@/components/user-provider";
import { cn } from "@/lib/utils";

export function LikeButton({
  bookId,
  initialLiked,
  initialLikesCount,
}: {
  bookId: number;
  initialLiked: boolean;
  initialLikesCount: number;
}) {
  const user = useUser();
  const [liked, setLiked] = useState(initialLiked);
  const [likesCount, setLikesCount] = useState(initialLikesCount);
  const [isPending, startTransition] = useTransition();

  if (!user) {
    return (
      <Button type="button" variant="outline" render={<Link href="/login" />}>
        <Heart className="size-4" />
        Curtir ({likesCount})
      </Button>
    );
  }

  function handleClick() {
    setLiked((current) => !current);
    setLikesCount((current) => (liked ? current - 1 : current + 1));
    startTransition(async () => {
      await toggleLike(bookId);
    });
  }

  return (
    <Button
      type="button"
      variant="outline"
      onClick={handleClick}
      disabled={isPending}
      aria-pressed={liked}
    >
      <Heart className={cn("size-4", liked && "fill-primary text-primary")} />
      {liked ? "Curtido" : "Curtir"} ({likesCount})
    </Button>
  );
}
