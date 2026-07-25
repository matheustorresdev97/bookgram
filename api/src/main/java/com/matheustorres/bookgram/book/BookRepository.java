package com.matheustorres.bookgram.book;

import java.util.List;

import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BookRepository extends JpaRepository<Book, Long> {

	List<Book> findByTitleContainingIgnoreCaseOrAuthorContainingIgnoreCase(String title, String author,
			Pageable pageable);

	long countByTitleContainingIgnoreCaseOrAuthorContainingIgnoreCase(String title, String author);

	List<Book> findByPostedBy(String postedBy, Sort sort);
}
