INSERT INTO comments (book_id, username, rating, text, created_at) VALUES
((SELECT id FROM books WHERE title = '1984'), 'leitor', 5,
 'Releitura obrigatória. A vigilância descrita parece cada vez mais atual.', '2026-06-02T10:00:00Z'),
((SELECT id FROM books WHERE title = '1984'), 'maria.leitora', 4,
 'Sombrio, mas necessário. O final ainda me assombra.', '2026-06-10T18:30:00Z'),
((SELECT id FROM books WHERE title = 'The Hobbit'), 'leitor', 5,
 'Bilbo é um herói improvável demais bom. Recomendo para todas as idades.', '2026-05-20T09:15:00Z');
