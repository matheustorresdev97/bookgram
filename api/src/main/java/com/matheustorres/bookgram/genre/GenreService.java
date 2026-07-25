package com.matheustorres.bookgram.genre;

import java.util.List;

import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.matheustorres.bookgram.exception.DuplicateResourceException;
import com.matheustorres.bookgram.exception.ResourceNotFoundException;

@Service
@Transactional
public class GenreService {

	private final GenreRepository genreRepository;

	public GenreService(GenreRepository genreRepository) {
		this.genreRepository = genreRepository;
	}

	@Transactional(readOnly = true)
	public List<GenreResponse> findAll() {
		return genreRepository.findAll(Sort.by("name")).stream()
				.map(GenreResponse::from)
				.toList();
	}

	@Transactional(readOnly = true)
	public GenreResponse findById(Long id) {
		return GenreResponse.from(getGenreOrThrow(id));
	}

	public GenreResponse create(GenreRequest request) {
		String name = request.name().trim();

		if (genreRepository.existsByNameIgnoreCase(name)) {
			throw new DuplicateResourceException("Já existe um gênero com o nome '%s'".formatted(name));
		}

		Genre genre = new Genre(name);

		return GenreResponse.from(genreRepository.save(genre));
	}

	public GenreResponse update(Long id, GenreRequest request) {
		Genre genre = getGenreOrThrow(id);
		String name = request.name().trim();

		genreRepository.findByNameIgnoreCase(name).ifPresent(existing -> {
			if (!existing.getId().equals(id)) {
				throw new DuplicateResourceException("Já existe um gênero com o nome '%s'".formatted(name));
			}
		});

		genre.setName(name);

		return GenreResponse.from(genre);
	}

	public void delete(Long id) {
		Genre genre = getGenreOrThrow(id);
		genreRepository.delete(genre);
	}

	private Genre getGenreOrThrow(Long id) {
		return genreRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Gênero com id %d não encontrado".formatted(id)));
	}
}
