package com.matheustorres.bookgram.book;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record BookCreateRequest(
		@NotBlank(message = "Título é obrigatório") @Size(max = 255, message = "Título deve ter no máximo 255 caracteres") String title,

		@NotBlank(message = "Autor é obrigatório") @Size(max = 255, message = "Autor deve ter no máximo 255 caracteres") String author,

		@NotBlank(message = "Descrição é obrigatória") String description,

		@NotBlank(message = "URL da capa é obrigatória") @Size(max = 500, message = "URL da capa deve ter no máximo 500 caracteres") String coverUrl,

		@NotBlank(message = "Gênero é obrigatório") @Size(max = 100, message = "Gênero deve ter no máximo 100 caracteres") String genre) {
}
