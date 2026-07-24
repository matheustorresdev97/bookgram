import { BookOpen } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="flex flex-col items-center gap-2 px-6 py-8 text-sm text-muted-foreground sm:flex-row sm:justify-between">
        <div className="flex items-center gap-2 font-heading text-base text-foreground">
          <BookOpen className="size-4 text-primary" />
          BookGram
        </div>
        <p>
          © {new Date().getFullYear()} BookGram. Rede social para amantes de
          livros.
        </p>
      </div>
    </footer>
  );
}
