package com.ira.archive.repository;

import com.ira.archive.entity.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {

    // Inside ProductRepository.java
    Page<Product> findByDepartment(String department, Pageable pageable);

    Page<Product> findByCategoryId(Long categoryId, Pageable pageable);

    Page<Product> findByTitleContainingIgnoreCaseAndDepartment(String title, String department, Pageable pageable);

    Page<Product> findByTitleContainingIgnoreCase(String search, Pageable pageable);
}