import { PostForm } from "@/components/post-form";
import { getBooks } from "@/lib/api/books";

export default async function PostPage() {
  const { books } = await getBooks();

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-3xl">Postar</h1>
      <PostForm books={books} />
    </div>
  );
}
