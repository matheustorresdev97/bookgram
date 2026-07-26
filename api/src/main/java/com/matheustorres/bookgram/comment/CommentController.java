package com.matheustorres.bookgram.comment;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.matheustorres.bookgram.user.JwtService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/comments")
public class CommentController {

	private final CommentService commentService;
	private final JwtService jwtService;

	public CommentController(CommentService commentService, JwtService jwtService) {
		this.commentService = commentService;
		this.jwtService = jwtService;
	}

	@GetMapping("/by-book/{bookId}")
	public List<CommentResponse> findByBookId(@PathVariable Long bookId) {
		return commentService.findByBookId(bookId);
	}

	@GetMapping("/count")
	public long countByBookIds(@RequestParam(required = false) List<Long> bookIds) {
		return commentService.countByBookIds(bookIds);
	}

	@GetMapping("/{id}")
	public CommentResponse findById(@PathVariable Long id) {
		return commentService.findById(id);
	}

	@PostMapping
	@ResponseStatus(HttpStatus.CREATED)
	public CommentResponse create(@Valid @RequestBody CommentCreateRequest request,
			@RequestHeader(value = "Authorization", required = false) String authorization) {
		String username = jwtService.extractUsernameFromHeader(authorization);
		return commentService.create(request, username);
	}

	@PutMapping("/{id}")
	public CommentResponse update(@PathVariable Long id, @Valid @RequestBody CommentUpdateRequest request,
			@RequestHeader(value = "Authorization", required = false) String authorization) {
		String username = jwtService.extractUsernameFromHeader(authorization);
		return commentService.update(id, request, username);
	}

	@DeleteMapping("/{id}")
	@ResponseStatus(HttpStatus.NO_CONTENT)
	public void delete(@PathVariable Long id,
			@RequestHeader(value = "Authorization", required = false) String authorization) {
		String username = jwtService.extractUsernameFromHeader(authorization);
		commentService.delete(id, username);
	}
}
