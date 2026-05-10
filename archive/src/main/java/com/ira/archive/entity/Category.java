package com.ira.archive.entity;

import com.fasterxml.jackson.annotation.JsonIgnore; // Import added
import jakarta.persistence.*;
import lombok.Data;
import java.util.List;

@Entity
@Table(name = "categories")
@Data
public class Category {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String imageUrl;

    // One category can have many products
    @OneToMany(mappedBy = "category", cascade = CascadeType.ALL)
    @JsonIgnore // <--- THIS PREVENTS THE INFINITE RECURSION ERROR
    private List<Product> products;
}