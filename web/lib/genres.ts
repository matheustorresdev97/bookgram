export const GENRES = [
  "Ficção",
  "Não-ficção",
  "Fantasia",
  "Romance",
  "Distopia",
  "Drama",
  "Clássico",
  "Biografia",
  "Aventura",
  "Mistério",
] as const;

export type Genre = (typeof GENRES)[number];
