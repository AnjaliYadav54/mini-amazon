package com.miniamazon.dto.response;

import com.miniamazon.entity.Product;
import lombok.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data @Builder @NoArgsConstructor @AllArgsConstructor
public class ProductResponse {
    private Long id;
    private String title;
    private String description;
    private BigDecimal price;
    private String imageUrl;
    private String category;
    private Integer stock;
    private BigDecimal rating;
    private Integer reviews;
    private LocalDateTime createdAt;

    public static ProductResponse from(Product p) {
        return ProductResponse.builder()
                .id(p.getId())
                .title(p.getTitle())
                .description(p.getDescription())
                .price(p.getPrice())
                .imageUrl(p.getImageUrl())
                .category(p.getCategory())
                .stock(p.getStock())
                .rating(p.getRating())
                .reviews(p.getReviews())
                .createdAt(p.getCreatedAt())
                .build();
    }
}