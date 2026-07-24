import { PostForm } from "@/components/post-form";

export default function PostPage() {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-3xl">Postar</h1>
      <PostForm />
    </div>
  );
}
