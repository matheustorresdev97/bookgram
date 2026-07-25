package com.matheustorres.bookgram.genre;

public record GenreResponse(Long id, String name) {

	public static GenreResponse from(Genre genre) {
		return new GenreResponse(genre.getId(), genre.getName());
	}
}
