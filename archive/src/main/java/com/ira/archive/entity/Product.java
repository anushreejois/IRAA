package com.ira.archive.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "products")
@Data
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    @Column(length = 1000)
    private String description;

    private Double price;
    private Integer stock;
    private Double rating;
    private String imageUrl;

    // Added for Task 6.1: Departmental Filtering
    // Stores "Men", "Women", "Kids", or "Unisex"
    private String department;

    @ManyToOne
    @JoinColumn(name = "category_id")
    private Category category;
}