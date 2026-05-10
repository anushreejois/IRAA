package com.ira.archive.repository;

import com.ira.archive.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
    // Custom finder: This helps with the "Search" bar later
    List<Product> findByTitleContainingIgnoreCase(String title);

    // Custom finder: This helps with "Shop by Category"
    List<Product> findByCategoryId(Long categoryId);
}