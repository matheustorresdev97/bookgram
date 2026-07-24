import { StatsCharts } from "@/components/stats-charts";
import { getBooksByUser } from "@/lib/api/books";
import { getCommentsByBookId } from "@/lib/api/comments";
import { getLikesCountForBook } from "@/lib/api/likes";
import { getCurrentUser } from "@/lib/session";

export default async function StatisticsPage() {
  const user = await getCurrentUser();
  const books = user ? await getBooksByUser(user.username) : [];

  const perBookStats = await Promise.all(
    books.map(async (book) => {
      const [comments, likesCount] = await Promise.all([
        getCommentsByBookId(book.id),
        getLikesCountForBook(book.id),
      ]);

      return {
        id: book.id,
        title: book.title,
        genre: book.genre,
        comments: comments.length,
        likes: likesCount,
      };
    }),
  );

  const totalComments = perBookStats.reduce(
    (sum, book) => sum + book.comments,
    0,
  );
  const totalLikes = perBookStats.reduce((sum, book) => sum + book.likes, 0);

  const genreCounts = new Map<string, number>();
  for (const book of books) {
    genreCounts.set(book.genre, (genreCounts.get(book.genre) ?? 0) + 1);
  }
  const genreData = Array.from(genreCounts, ([genre, count]) => ({
    genre,
    count,
  })).sort((a, b) => b.count - a.count);

  return (
    <div className="flex flex-col gap-8">
      <h1 className="text-3xl">Estatísticas</h1>
      <StatsCharts
        totalBooks={books.length}
        totalComments={totalComments}
        totalLikes={totalLikes}
        genreData={genreData}
        perBookStats={perBookStats}
      />
    </div>
  );
}
