package com.ira.archive.repository;

import com.ira.archive.entity.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {

    // 1. Updated Search: Returns a Page instead of a List to support pagination in search results
    Page<Product> findByTitleContainingIgnoreCase(String title, Pageable pageable);

    // 2. Updated Category Filter: Returns a Page to support pagination when browsing specific categories
    Page<Product> findByCategoryId(Long categoryId, Pageable pageable);

    // Note: The standard findAll() method is already provided by JpaRepository
    // and supports Pageable by default.
}