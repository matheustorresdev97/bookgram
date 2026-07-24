import { Star } from "lucide-react";

import { cn } from "@/lib/utils";

export function StarRating({
  value,
  className,
}: {
  value: number;
  className?: string;
}) {
  return (
    <div className={cn("flex items-center gap-0.5", className)}>
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={cn(
            "size-4 text-muted-foreground",
            star <= Math.round(value) && "fill-primary text-primary",
          )}
        />
      ))}
    </div>
  );
}
