package com.matheustorres.bookgram.like;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.matheustorres.bookgram.book.Book;
import com.matheustorres.bookgram.book.BookRepository;
import com.matheustorres.bookgram.exception.ResourceNotFoundException;

@Service
@Transactional
public class LikeService {

	private final LikeRepository likeRepository;
	private final BookRepository bookRepository;

	public LikeService(LikeRepository likeRepository, BookRepository bookRepository) {
		this.likeRepository = likeRepository;
		this.bookRepository = bookRepository;
	}

	@Transactional(readOnly = true)
	public boolean hasLiked(Long bookId, String username) {
		return likeRepository.existsByBook_IdAndUsername(bookId, username);
	}

	@Transactional(readOnly = true)
	public long countForBook(Long bookId) {
		return likeRepository.countByBook_Id(bookId);
	}

	@Transactional(readOnly = true)
	public long countByBookIds(List<Long> bookIds) {
		if (bookIds == null || bookIds.isEmpty()) {
			return 0;
		}

		return likeRepository.countByBook_IdIn(bookIds);
	}

	public ToggleLikeResponse toggle(LikeToggleRequest request) {
		Long bookId = request.bookId();
		String username = request.username().trim();

		Optional<Like> existing = likeRepository.findByBook_IdAndUsername(bookId, username);
		boolean liked;

		if (existing.isPresent()) {
			likeRepository.delete(existing.get());
			liked = false;
		} else {
			Book book = getBookOrThrow(bookId);
			likeRepository.save(new Like(book, username));
			liked = true;
		}

		return new ToggleLikeResponse(liked, likeRepository.countByBook_Id(bookId));
	}

	private Book getBookOrThrow(Long id) {
		return bookRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Livro com id %d não encontrado".formatted(id)));
	}
}
