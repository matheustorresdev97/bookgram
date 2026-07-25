package com.matheustorres.bookgram.genre;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/genres")
public class GenreController {

	private final GenreService genreService;

	public GenreController(GenreService genreService) {
		this.genreService = genreService;
	}

	@GetMapping
	public List<GenreResponse> findAll() {
		return genreService.findAll();
	}

	@GetMapping("/{id}")
	public GenreResponse findById(@PathVariable Long id) {
		return genreService.findById(id);
	}

	@PostMapping
	@ResponseStatus(HttpStatus.CREATED)
	public GenreResponse create(@Valid @RequestBody GenreRequest request) {
		return genreService.create(request);
	}

	@PutMapping("/{id}")
	public GenreResponse update(@PathVariable Long id, @Valid @RequestBody GenreRequest request) {
		return genreService.update(id, request);
	}

	@DeleteMapping("/{id}")
	@ResponseStatus(HttpStatus.NO_CONTENT)
	public void delete(@PathVariable Long id) {
		genreService.delete(id);
	}
}
