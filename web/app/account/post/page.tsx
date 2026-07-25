import { PostForm } from "@/components/post-form";
import { getGenres } from "@/lib/api/genres";

export default async function PostPage() {
  const genres = await getGenres();

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-3xl">Postar</h1>
      <PostForm genres={genres} />
    </div>
  );
}
