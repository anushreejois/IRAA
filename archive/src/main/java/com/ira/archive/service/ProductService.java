package com.ira.archive.service;

import com.ira.archive.entity.Product;
import com.ira.archive.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;

    /**
     * Unified logic for the main Gallery.
     * Handles Department filtering and Search queries.
     */
    public Page<Product> getAllProducts(String department, String searchTerm, Pageable pageable) {

        // 1. Search within a specific department
        if (department != null && !department.equalsIgnoreCase("All") && searchTerm != null && !searchTerm.isEmpty()) {
            return productRepository.findByTitleContainingIgnoreCaseAndDepartment(searchTerm, department, pageable);
        }

        // 2. Filter by department only
        if (department != null && !department.equalsIgnoreCase("All")) {
            return productRepository.findByDepartment(department, pageable);
        }

        // 3. Default: Search everything
        String search = (searchTerm != null) ? searchTerm : "";
        return productRepository.findByTitleContainingIgnoreCase(search, pageable);
    }

    /**
     * Fetch products by Category ID (Heritage, Accessories, etc.)
     */
    public Page<Product> getProductsByCategory(Long categoryId, Pageable pageable) {
        return productRepository.findByCategoryId(categoryId, pageable);
    }

    /**
     * Get a single artifact by ID
     */
    public Optional<Product> getProductById(Long id) {
        return productRepository.findById(id);
    }

    /**
     * Save/Update an artifact (Curator's Desk)
     */
    public Product saveProduct(Product product) {
        return productRepository.save(product);
    }

    /**
     * Remove an artifact
     */
    public void deleteProduct(Long id) {
        productRepository.deleteById(id);
    }
}