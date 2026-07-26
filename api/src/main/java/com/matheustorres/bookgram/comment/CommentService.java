package com.matheustorres.bookgram.comment;

import java.time.Instant;
import java.util.List;
import java.util.Objects;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.matheustorres.bookgram.book.Book;
import com.matheustorres.bookgram.book.BookRepository;
import com.matheustorres.bookgram.exception.ForbiddenException;
import com.matheustorres.bookgram.exception.ResourceNotFoundException;

@Service
@Transactional
public class CommentService {

	private final CommentRepository commentRepository;
	private final BookRepository bookRepository;

	public CommentService(CommentRepository commentRepository, BookRepository bookRepository) {
		this.commentRepository = commentRepository;
		this.bookRepository = bookRepository;
	}

	@Transactional(readOnly = true)
	public List<CommentResponse> findByBookId(Long bookId) {
		return commentRepository.findByBook_IdOrderByCreatedAtDesc(bookId).stream().map(CommentResponse::from)
				.toList();
	}

	@Transactional(readOnly = true)
	public CommentResponse findById(Long id) {
		return CommentResponse.from(getCommentOrThrow(id));
	}

	@Transactional(readOnly = true)
	public long countByBookIds(List<Long> bookIds) {
		if (bookIds == null || bookIds.isEmpty()) {
			return 0;
		}

		return commentRepository.countByBook_IdIn(bookIds);
	}

	public CommentResponse create(CommentCreateRequest request, String username) {
		Book book = getBookOrThrow(request.bookId());

		Comment comment = new Comment(book, username, request.rating(), request.text().trim(), Instant.now());

		return CommentResponse.from(commentRepository.save(comment));
	}

	public CommentResponse update(Long id, CommentUpdateRequest request, String requesterUsername) {
		Comment comment = getCommentOrThrow(id);
		assertOwner(comment, requesterUsername);

		comment.setRating(request.rating());
		comment.setText(request.text().trim());

		return CommentResponse.from(comment);
	}

	public void delete(Long id, String requesterUsername) {
		Comment comment = getCommentOrThrow(id);
		assertOwner(comment, requesterUsername);
		commentRepository.delete(comment);
	}

	private Comment getCommentOrThrow(Long id) {
		return commentRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Comentário com id %d não encontrado".formatted(id)));
	}

	private Book getBookOrThrow(Long id) {
		return bookRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Livro com id %d não encontrado".formatted(id)));
	}

	private void assertOwner(Comment comment, String requesterUsername) {
		if (!Objects.equals(comment.getUsername(), requesterUsername)) {
			throw new ForbiddenException("Você não tem permissão para modificar este comentário.");
		}
	}
}
