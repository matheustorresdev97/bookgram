package com.matheustorres.bookgram.user;

import java.nio.charset.StandardCharsets;
import java.time.Duration;
import java.time.Instant;
import java.util.Date;

import javax.crypto.SecretKey;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;

import com.matheustorres.bookgram.exception.InvalidCredentialsException;

@Component
public class JwtService {

	private static final String INVALID_TOKEN_MESSAGE = "Token ausente ou inválido.";

	private final SecretKey key;
	private final Duration expiration;

	public JwtService(@Value("${app.jwt.secret}") String secret,
			@Value("${app.jwt.expiration-seconds:86400}") long expirationSeconds) {
		this.key = Keys.hmacShaKeyFor(secret.getBytes(StandardCharsets.UTF_8));
		this.expiration = Duration.ofSeconds(expirationSeconds);
	}

	public String issueToken(String username) {
		Instant now = Instant.now();

		return Jwts.builder()
				.subject(username)
				.issuedAt(Date.from(now))
				.expiration(Date.from(now.plus(expiration)))
				.signWith(key)
				.compact();
	}

	public String parseUsername(String token) {
		try {
			return Jwts.parser().verifyWith(key).build().parseSignedClaims(token).getPayload().getSubject();
		} catch (JwtException | IllegalArgumentException e) {
			throw new InvalidCredentialsException(INVALID_TOKEN_MESSAGE);
		}
	}

	public String extractUsernameFromHeader(String authorizationHeader) {
		if (authorizationHeader == null || !authorizationHeader.startsWith("Bearer ")) {
			throw new InvalidCredentialsException(INVALID_TOKEN_MESSAGE);
		}

		return parseUsername(authorizationHeader.substring("Bearer ".length()));
	}
}
