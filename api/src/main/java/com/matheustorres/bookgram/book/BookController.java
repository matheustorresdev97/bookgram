package com.matheustorres.bookgram.book;

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
@RequestMapping("/api/books")
public class BookController {

	private final BookService bookService;
	private final JwtService jwtService;

	public BookController(BookService bookService, JwtService jwtService) {
		this.bookService = bookService;
		this.jwtService = jwtService;
	}

	@GetMapping
	public BookPageResponse findAll(
			@RequestParam(defaultValue = "") String query,
			@RequestParam(defaultValue = "1") int page,
			@RequestParam(defaultValue = "10") int pageSize) {
		return bookService.findAll(query, page, pageSize);
	}

	@GetMapping("/{id}")
	public BookResponse findById(@PathVariable Long id) {
		return bookService.findById(id);
	}

	@GetMapping("/by-user/{username}")
	public List<BookResponse> findByUser(@PathVariable String username) {
		return bookService.findByUser(username);
	}

	@PostMapping
	@ResponseStatus(HttpStatus.CREATED)
	public BookResponse create(@Valid @RequestBody BookCreateRequest request,
			@RequestHeader(value = "Authorization", required = false) String authorization) {
		String username = jwtService.extractUsernameFromHeader(authorization);
		return bookService.create(request, username);
	}

	@PutMapping("/{id}")
	public BookResponse update(@PathVariable Long id, @Valid @RequestBody BookUpdateRequest request,
			@RequestHeader(value = "Authorization", required = false) String authorization) {
		String username = jwtService.extractUsernameFromHeader(authorization);
		return bookService.update(id, request, username);
	}

	@DeleteMapping("/{id}")
	@ResponseStatus(HttpStatus.NO_CONTENT)
	public void delete(@PathVariable Long id,
			@RequestHeader(value = "Authorization", required = false) String authorization) {
		String username = jwtService.extractUsernameFromHeader(authorization);
		bookService.delete(id, username);
	}
}
