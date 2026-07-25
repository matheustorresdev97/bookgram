package com.matheustorres.bookgram.book;

import java.time.LocalDate;

import com.matheustorres.bookgram.genre.Genre;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "books")
@Getter
@Setter
@NoArgsConstructor
public class Book {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	private String title;

	private String author;

	@Column(columnDefinition = "TEXT")
	private String description;

	@Column(name = "cover_url", length = 500)
	private String coverUrl;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "genre_id", nullable = false)
	private Genre genre;

	@Column(name = "average_rating", nullable = false)
	private Double averageRating;

	@Column(name = "total_reviews", nullable = false)
	private Integer totalReviews;

	@Column(name = "published_date", nullable = false)
	private LocalDate publishedDate;

	@Column(name = "posted_by")
	private String postedBy;

	public Book(String title, String author, String description, String coverUrl, Genre genre, Double averageRating,
			Integer totalReviews, LocalDate publishedDate, String postedBy) {
		this.title = title;
		this.author = author;
		this.description = description;
		this.coverUrl = coverUrl;
		this.genre = genre;
		this.averageRating = averageRating;
		this.totalReviews = totalReviews;
		this.publishedDate = publishedDate;
		this.postedBy = postedBy;
	}
}
