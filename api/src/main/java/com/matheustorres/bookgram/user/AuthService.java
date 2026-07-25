package com.matheustorres.bookgram.user;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Optional;
import java.util.UUID;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.matheustorres.bookgram.exception.DuplicateResourceException;
import com.matheustorres.bookgram.exception.InvalidCredentialsException;
import com.matheustorres.bookgram.exception.ResourceNotFoundException;

@Service
@Transactional
public class AuthService {

	private static final String INVALID_CREDENTIALS_MESSAGE = "Usuário ou senha inválidos.";

	private final UserRepository userRepository;
	private final PasswordResetTokenRepository passwordResetTokenRepository;
	private final PasswordEncoder passwordEncoder;
	private final JwtService jwtService;

	public AuthService(UserRepository userRepository, PasswordResetTokenRepository passwordResetTokenRepository,
			PasswordEncoder passwordEncoder, JwtService jwtService) {
		this.userRepository = userRepository;
		this.passwordResetTokenRepository = passwordResetTokenRepository;
		this.passwordEncoder = passwordEncoder;
		this.jwtService = jwtService;
	}

	public AuthResponse register(RegisterRequest request) {
		String username = request.username().trim();
		String email = request.email().trim();

		if (userRepository.existsByUsername(username)) {
			throw new DuplicateResourceException("Este nome de usuário já está em uso.");
		}

		if (userRepository.existsByEmailIgnoreCase(email)) {
			throw new DuplicateResourceException("Este e-mail já está cadastrado.");
		}

		User user = new User(username, email, passwordEncoder.encode(request.password()), Instant.now());
		userRepository.save(user);

		return new AuthResponse(jwtService.issueToken(user.getUsername()), user.getUsername());
	}

	@Transactional(readOnly = true)
	public AuthResponse login(LoginRequest request) {
		User user = userRepository.findByUsername(request.username().trim())
				.orElseThrow(() -> new InvalidCredentialsException(INVALID_CREDENTIALS_MESSAGE));

		if (!passwordEncoder.matches(request.password(), user.getPasswordHash())) {
			throw new InvalidCredentialsException(INVALID_CREDENTIALS_MESSAGE);
		}

		return new AuthResponse(jwtService.issueToken(user.getUsername()), user.getUsername());
	}

	public PasswordResetRequestResponse requestPasswordReset(PasswordResetRequestRequest request) {
		Optional<User> user = userRepository.findByEmailIgnoreCase(request.email().trim());

		if (user.isEmpty()) {
			return new PasswordResetRequestResponse(null);
		}

		String token = UUID.randomUUID().toString().replace("-", "");
		passwordResetTokenRepository
				.save(new PasswordResetToken(user.get(), token, Instant.now().plus(1, ChronoUnit.HOURS), false));

		return new PasswordResetRequestResponse(token);
	}

	public void confirmPasswordReset(PasswordResetConfirmRequest request) {
		PasswordResetToken resetToken = passwordResetTokenRepository.findByToken(request.token())
				.filter(t -> !t.isUsed() && t.getExpiresAt().isAfter(Instant.now()))
				.orElseThrow(() -> new ResourceNotFoundException("Link de redefinição inválido ou expirado."));

		User user = resetToken.getUser();
		user.setPasswordHash(passwordEncoder.encode(request.newPassword()));
		resetToken.setUsed(true);
	}
}
