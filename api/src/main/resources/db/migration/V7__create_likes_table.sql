CREATE TABLE likes (
    id BIGSERIAL PRIMARY KEY,
    book_id BIGINT NOT NULL REFERENCES books(id) ON DELETE CASCADE,
    username VARCHAR(100) NOT NULL,
    CONSTRAINT uk_likes_book_id_username UNIQUE (book_id, username)
);

CREATE INDEX idx_likes_book_id ON likes(book_id);
