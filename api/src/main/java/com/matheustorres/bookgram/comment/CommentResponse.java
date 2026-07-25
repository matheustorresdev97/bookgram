package com.matheustorres.bookgram.comment;

import java.time.Instant;

public record CommentResponse(
		Long id,
		Long bookId,
		String username,
		Integer rating,
		String text,
		Instant createdAt) {

	public static CommentResponse from(Comment comment) {
		return new CommentResponse(comment.getId(), comment.getBook().getId(), comment.getUsername(),
				comment.getRating(), comment.getText(), comment.getCreatedAt());
	}
}
