package com.matheustorres.bookgram.comment;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record CommentCreateRequest(
		@NotNull(message = "Livro é obrigatório") Long bookId,

		@NotBlank(message = "Usuário é obrigatório") String username,

		@NotNull(message = "Nota é obrigatória") @Min(value = 1, message = "Nota deve ser no mínimo 1") @Max(value = 5, message = "Nota deve ser no máximo 5") Integer rating,

		@NotBlank(message = "Comentário é obrigatório") String text) {
}
