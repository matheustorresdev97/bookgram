package com.matheustorres.bookgram.like;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

public interface LikeRepository extends JpaRepository<Like, Long> {

	boolean existsByBook_IdAndUsername(Long bookId, String username);

	Optional<Like> findByBook_IdAndUsername(Long bookId, String username);

	long countByBook_Id(Long bookId);

	long countByBook_IdIn(List<Long> bookIds);
}
