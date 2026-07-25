package com.matheustorres.bookgram.book;

import java.time.LocalDate;

public record BookResponse(
		Long id,
		String title,
		String author,
		String description,
		String coverUrl,
		String genre,
		Double averageRating,
		Integer totalReviews,
		LocalDate publishedDate,
		String postedBy) {

	public static BookResponse from(Book book) {
		return new BookResponse(book.getId(), book.getTitle(), book.getAuthor(), book.getDescription(),
				book.getCoverUrl(), book.getGenre().getName(), book.getAverageRating(), book.getTotalReviews(),
				book.getPublishedDate(), book.getPostedBy());
	}
}
