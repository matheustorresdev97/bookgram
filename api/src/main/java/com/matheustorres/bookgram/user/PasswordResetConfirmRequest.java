package com.matheustorres.bookgram.user;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record PasswordResetConfirmRequest(
		@NotBlank(message = "Token é obrigatório") String token,

		@NotBlank(message = "Senha é obrigatória") @Size(min = 6, message = "A senha deve ter pelo menos 6 caracteres") String newPassword) {
}
