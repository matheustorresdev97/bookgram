import { Suspense } from "react";

import { BookGrid } from "@/components/book-grid";
import { BookGridSkeleton } from "@/components/book-grid-skeleton";
import { BookSearch } from "@/components/book-search";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; page?: string }>;
}) {
  const { q = "", page = "1" } = await searchParams;

  return (
    <main className="mx-auto flex max-w-6xl flex-col gap-6 px-6 py-10">
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl">Descubra seu próximo livro</h1>
        <p className="text-muted-foreground">
          Capas selecionadas para você explorar.
        </p>
      </div>
      <BookSearch />
      <Suspense key={`${q}-${page}`} fallback={<BookGridSkeleton />}>
        <BookGrid query={q} page={Number(page) || 1} />
      </Suspense>
    </main>
  );
}
