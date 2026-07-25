package com.matheustorres.bookgram.book;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.matheustorres.bookgram.exception.ResourceNotFoundException;
import com.matheustorres.bookgram.genre.Genre;
import com.matheustorres.bookgram.genre.GenreRepository;

@Service
@Transactional
public class BookService {

	private final BookRepository bookRepository;
	private final GenreRepository genreRepository;

	public BookService(BookRepository bookRepository, GenreRepository genreRepository) {
		this.bookRepository = bookRepository;
		this.genreRepository = genreRepository;
	}

	@Transactional(readOnly = true)
	public BookPageResponse findAll(String query, int page, int pageSize) {
		String q = query == null ? "" : query.trim();

		long total = bookRepository.countByTitleContainingIgnoreCaseOrAuthorContainingIgnoreCase(q, q);
		int totalPages = Math.max(1, (int) Math.ceil((double) total / pageSize));
		int currentPage = Math.min(Math.max(page, 1), totalPages);

		Pageable pageable = PageRequest.of(currentPage - 1, pageSize, Sort.by("id"));
		var books = bookRepository
				.findByTitleContainingIgnoreCaseOrAuthorContainingIgnoreCase(q, q, pageable)
				.stream()
				.map(BookResponse::from)
				.toList();

		return new BookPageResponse(books, total, currentPage, pageSize, totalPages);
	}

	@Transactional(readOnly = true)
	public BookResponse findById(Long id) {
		return BookResponse.from(getBookOrThrow(id));
	}

	@Transactional(readOnly = true)
	public List<BookResponse> findByUser(String postedBy) {
		return bookRepository.findByPostedBy(postedBy, Sort.by("id")).stream().map(BookResponse::from).toList();
	}

	public BookResponse create(BookCreateRequest request) {
		Genre genre = getGenreByNameOrThrow(request.genre());
		String postedBy = request.postedBy() == null || request.postedBy().isBlank() ? null : request.postedBy();

		Book book = new Book(request.title().trim(), request.author().trim(), request.description().trim(),
				request.coverUrl().trim(), genre, 0.0, 0, LocalDate.now(), postedBy);

		return BookResponse.from(bookRepository.save(book));
	}

	public BookResponse update(Long id, BookUpdateRequest request) {
		Book book = getBookOrThrow(id);
		Genre genre = getGenreByNameOrThrow(request.genre());

		book.setTitle(request.title().trim());
		book.setAuthor(request.author().trim());
		book.setDescription(request.description().trim());
		book.setCoverUrl(request.coverUrl().trim());
		book.setGenre(genre);

		return BookResponse.from(book);
	}

	public void delete(Long id) {
		Book book = getBookOrThrow(id);
		bookRepository.delete(book);
	}

	private Book getBookOrThrow(Long id) {
		return bookRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Livro com id %d não encontrado".formatted(id)));
	}

	private Genre getGenreByNameOrThrow(String name) {
		return genreRepository.findByNameIgnoreCase(name.trim())
				.orElseThrow(() -> new ResourceNotFoundException("Gênero '%s' não encontrado".formatted(name)));
	}
}
