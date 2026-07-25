export interface Book {
  id: number;
  author: string;
  title: string;
  description: string;
  coverUrl: string;
  genre: string;
  averageRating: number;
  totalReviews: number;
  publishedDate: string;
  postedBy?: string;
}
