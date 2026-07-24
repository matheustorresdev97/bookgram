import { Suspense } from "react";

import { BookGrid } from "@/components/book-grid";
import { BookGridSkeleton } from "@/components/book-grid-skeleton";

export default function Home() {
  return (
    <main className="mx-auto flex max-w-6xl flex-col gap-6 px-6 py-10">
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl">Descubra seu próximo livro</h1>
        <p className="text-muted-foreground">
          Capas selecionadas para você explorar.
        </p>
      </div>
      <Suspense fallback={<BookGridSkeleton />}>
        <BookGrid />
      </Suspense>
    </main>
  );
}
