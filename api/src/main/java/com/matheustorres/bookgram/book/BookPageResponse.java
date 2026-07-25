package com.matheustorres.bookgram.book;

import java.util.List;

public record BookPageResponse(List<BookResponse> books, long total, int page, int pageSize, int totalPages) {
}
