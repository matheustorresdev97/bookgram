package com.matheustorres.bookgram.like;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.matheustorres.bookgram.user.JwtService;

import jakarta.validation.Valid;

import java.util.List;

@RestController
@RequestMapping("/api/likes")
public class LikeController {

	private final LikeService likeService;
	private final JwtService jwtService;

	public LikeController(LikeService likeService, JwtService jwtService) {
		this.likeService = likeService;
		this.jwtService = jwtService;
	}

	@GetMapping("/has-liked")
	public boolean hasLiked(@RequestParam Long bookId, @RequestParam String username) {
		return likeService.hasLiked(bookId, username);
	}

	@GetMapping("/count/by-book/{bookId}")
	public long countForBook(@PathVariable Long bookId) {
		return likeService.countForBook(bookId);
	}

	@GetMapping("/count")
	public long countByBookIds(@RequestParam(required = false) List<Long> bookIds) {
		return likeService.countByBookIds(bookIds);
	}

	@PostMapping("/toggle")
	public ToggleLikeResponse toggle(@Valid @RequestBody LikeToggleRequest request,
			@RequestHeader(value = "Authorization", required = false) String authorization) {
		String username = jwtService.extractUsernameFromHeader(authorization);
		return likeService.toggle(request, username);
	}
}
