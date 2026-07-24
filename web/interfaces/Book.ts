export interface Book {
  id: number;
  author: string;
  title: string;
  description: string;
  coverUrl: string;
  averageRating: number;
  totalReviews: number;
  publishedDate: string;
  isFavorite: boolean;
}

export interface Books {
    books: Book[];
}