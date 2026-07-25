import type { Book } from "@/interfaces/Book";

const MOCK_LATENCY_MS = 500;

function cover(olid: string) {
  return `https://covers.openlibrary.org/b/olid/${olid}-L.jpg`;
}

function delay<T>(value: T, ms = MOCK_LATENCY_MS): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(value), ms));
}

let books: Book[] = [
  {
    id: 1,
    title: "1984",
    author: "George Orwell",
    description:
      "Um retrato sombrio de um regime totalitário que vigia cada pensamento dos seus cidadãos.",
    coverUrl: cover("OL24382006M"),
    genre: "Distopia",
    averageRating: 4.8,
    totalReviews: 3241,
    publishedDate: "1949-06-08",
  },
  {
    id: 2,
    title: "Pride and Prejudice",
    author: "Jane Austen",
    description:
      "A história de Elizabeth Bennet e suas irmãs em busca de amor e independência na Inglaterra do século XIX.",
    coverUrl: cover("OL3700132M"),
    genre: "Romance",
    averageRating: 4.7,
    totalReviews: 2894,
    publishedDate: "1813-01-28",
  },
  {
    id: 3,
    title: "The Hobbit",
    author: "J.R.R. Tolkien",
    description:
      "A jornada inesperada de Bilbo Bolseiro rumo à Montanha Solitária.",
    coverUrl: cover("OL10683695M"),
    genre: "Fantasia",
    averageRating: 4.9,
    totalReviews: 4102,
    publishedDate: "1937-09-21",
  },
  {
    id: 4,
    title: "Dom Casmurro",
    author: "Machado de Assis",
    description:
      "Bentinho narra sua obsessão pela dúvida sobre a fidelidade de Capitu.",
    coverUrl: cover("OL1004411M"),
    genre: "Romance",
    averageRating: 4.6,
    totalReviews: 1523,
    publishedDate: "1899-01-01",
  },
  {
    id: 5,
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    description:
      "Scout Finch relembra a infância marcada pela luta do pai contra o preconceito racial no sul dos Estados Unidos.",
    coverUrl: cover("OL2463652M"),
    genre: "Drama",
    averageRating: 4.8,
    totalReviews: 3897,
    publishedDate: "1960-07-11",
  },
  {
    id: 6,
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    description:
      "Os excessos e ilusões do sonho americano vistos pelos olhos de Nick Carraway.",
    coverUrl: cover("OL22152141M"),
    genre: "Drama",
    averageRating: 4.4,
    totalReviews: 2765,
    publishedDate: "1925-04-10",
  },
  {
    id: 7,
    title: "Harry Potter and the Sorcerer's Stone",
    author: "J.K. Rowling",
    description:
      "Harry descobre que é um bruxo e embarca em sua primeira jornada em Hogwarts.",
    coverUrl: cover("OL26820966M"),
    genre: "Fantasia",
    averageRating: 4.9,
    totalReviews: 5231,
    publishedDate: "1997-06-26",
  },
  {
    id: 8,
    title: "O Alquimista",
    author: "Paulo Coelho",
    description:
      "O pastor Santiago parte em busca de um tesouro e descobre sua própria lenda pessoal.",
    coverUrl: cover("OL18511145M"),
    genre: "Ficção",
    averageRating: 4.3,
    totalReviews: 3120,
    publishedDate: "1988-01-01",
  },
  {
    id: 9,
    title: "Brave New World",
    author: "Aldous Huxley",
    description:
      "Uma sociedade futurista controlada pelo prazer, pela genética e pela ausência de liberdade.",
    coverUrl: cover("OL6504102M"),
    genre: "Distopia",
    averageRating: 4.6,
    totalReviews: 2201,
    publishedDate: "1932-01-01",
  },
  {
    id: 10,
    title: "Sapiens: A Brief History of Humankind",
    author: "Yuval Noah Harari",
    description:
      "Uma jornada pela história da humanidade, da revolução cognitiva à era da inteligência artificial.",
    coverUrl: cover("OL27000666M"),
    genre: "Não-ficção",
    averageRating: 4.7,
    totalReviews: 4567,
    publishedDate: "2011-01-01",
  },
];

let nextId = books.length + 1;

export interface GetBooksOptions {
  query?: string;
  page?: number;
  pageSize?: number;
}

export interface GetBooksResult {
  books: Book[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

/**
 * Mock do client da futura API (Java + Open Library): assíncrono e com
 * latência simulada, para consumir igual a uma chamada de rede real.
 */
export async function getBooks(
  options: GetBooksOptions = {},
): Promise<GetBooksResult> {
  const { query = "", page = 1, pageSize = 10 } = options;

  const normalizedQuery = query.trim().toLowerCase();
  const filtered = normalizedQuery
    ? books.filter(
        (book) =>
          book.title.toLowerCase().includes(normalizedQuery) ||
          book.author.toLowerCase().includes(normalizedQuery),
      )
    : books;

  const total = filtered.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const currentPage = Math.min(Math.max(1, page), totalPages);
  const start = (currentPage - 1) * pageSize;

  return delay({
    books: filtered.slice(start, start + pageSize),
    total,
    page: currentPage,
    pageSize,
    totalPages,
  });
}

export async function getBookById(id: number): Promise<Book | undefined> {
  return delay(books.find((book) => book.id === id));
}

export async function getBooksByUser(username: string): Promise<Book[]> {
  return delay(books.filter((book) => book.postedBy === username));
}

export interface AddBookInput {
  title: string;
  author: string;
  description: string;
  coverUrl: string;
  genre: string;
  postedBy: string;
}

export async function addBook(input: AddBookInput): Promise<Book> {
  const book: Book = {
    id: nextId++,
    averageRating: 0,
    totalReviews: 0,
    publishedDate: new Date().toISOString().slice(0, 10),
    ...input,
  };

  books = [book, ...books];

  return delay(book);
}

export interface UpdateBookInput {
  title: string;
  author: string;
  description: string;
  coverUrl: string;
  genre: string;
}

export async function updateBook(
  id: number,
  input: UpdateBookInput,
): Promise<Book | undefined> {
  const book = books.find((b) => b.id === id);

  if (!book) {
    return delay(undefined);
  }

  Object.assign(book, input);

  return delay(book);
}

export async function deleteBook(id: number): Promise<boolean> {
  const lengthBefore = books.length;
  books = books.filter((book) => book.id !== id);

  return delay(books.length < lengthBefore);
}
