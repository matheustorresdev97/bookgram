CREATE TABLE books (
    id BIGSERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    author VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    cover_url VARCHAR(500) NOT NULL,
    genre_id BIGINT NOT NULL REFERENCES genres(id),
    average_rating DOUBLE PRECISION NOT NULL DEFAULT 0,
    total_reviews INTEGER NOT NULL DEFAULT 0,
    published_date DATE NOT NULL,
    posted_by VARCHAR(100)
);

CREATE INDEX idx_books_genre_id ON books(genre_id);
