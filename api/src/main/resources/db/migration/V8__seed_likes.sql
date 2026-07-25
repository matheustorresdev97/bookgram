INSERT INTO likes (book_id, username) VALUES
((SELECT id FROM books WHERE title = '1984'), 'leitor'),
((SELECT id FROM books WHERE title = 'The Hobbit'), 'leitor'),
((SELECT id FROM books WHERE title = 'To Kill a Mockingbird'), 'leitor'),
((SELECT id FROM books WHERE title = 'Harry Potter and the Sorcerer''s Stone'), 'leitor'),
((SELECT id FROM books WHERE title = 'Sapiens: A Brief History of Humankind'), 'leitor'),
((SELECT id FROM books WHERE title = '1984'), 'maria.leitora');
