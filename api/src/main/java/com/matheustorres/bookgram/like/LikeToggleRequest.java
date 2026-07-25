package com.matheustorres.bookgram.like;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record LikeToggleRequest(
		@NotNull(message = "Livro é obrigatório") Long bookId,

		@NotBlank(message = "Usuário é obrigatório") String username) {
}
