package com.matheustorres.bookgram.comment;

import java.time.Instant;

import com.matheustorres.bookgram.book.Book;

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
@Table(name = "comments")
@Getter
@Setter
@NoArgsConstructor
public class Comment {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "book_id", nullable = false)
	private Book book;

	@Column(nullable = false, length = 100)
	private String username;

	@Column(nullable = false)
	private Integer rating;

	@Column(columnDefinition = "TEXT", nullable = false)
	private String text;

	@Column(name = "created_at", nullable = false)
	private Instant createdAt;

	public Comment(Book book, String username, Integer rating, String text, Instant createdAt) {
		this.book = book;
		this.username = username;
		this.rating = rating;
		this.text = text;
		this.createdAt = createdAt;
	}
}
