package com.matheustorres.bookgram.like;

import jakarta.validation.constraints.NotNull;

public record LikeToggleRequest(
		@NotNull(message = "Livro é obrigatório") Long bookId) {
}
