package com.matheustorres.bookgram.comment;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface CommentRepository extends JpaRepository<Comment, Long> {

	List<Comment> findByBook_IdOrderByCreatedAtDesc(Long bookId);

	long countByBook_IdIn(List<Long> bookIds);
}
