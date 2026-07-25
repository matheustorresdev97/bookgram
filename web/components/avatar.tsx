import { cn } from "@/lib/utils";

const SIZE_CLASSES = {
  sm: "size-6 text-xs",
  default: "size-8 text-sm",
  lg: "size-10 text-base",
} as const;

export function Avatar({
  username,
  size = "default",
  className,
}: {
  username: string;
  size?: keyof typeof SIZE_CLASSES;
  className?: string;
}) {
  const initial = username.trim().charAt(0).toUpperCase() || "?";

  return (
    <div
      aria-hidden="true"
      className={cn(
        "flex shrink-0 items-center justify-center rounded-full bg-primary font-medium text-primary-foreground",
        SIZE_CLASSES[size],
        className,
      )}
    >
      {initial}
    </div>
  );
}
