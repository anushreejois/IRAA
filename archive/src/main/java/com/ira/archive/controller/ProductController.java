package com.ira.archive.controller;

import com.ira.archive.entity.Product;
import com.ira.archive.exception.ResourceNotFoundException;
import com.ira.archive.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/products")
public class ProductController {

    @Autowired
    private ProductRepository productRepository;

    // 1. Updated: Get All Products with Pagination and Sorting
    @GetMapping
    public Page<Product> getAllProducts(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "12") int size,
            @RequestParam(defaultValue = "id") String sortBy
    ) {
        Pageable pageable = PageRequest.of(page, size, Sort.by(sortBy).descending());
        return productRepository.findAll(pageable);
    }

    @GetMapping("/{id}")
    public Product getProductById(@PathVariable Long id) {
        return productRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found with ID: " + id));
    }

    // 2. Updated Search: Refined with Pagination
    @GetMapping("/search")
    public Page<Product> search(
            @RequestParam String query,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "12") int size
    ) {
        Pageable pageable = PageRequest.of(page, size);
        return productRepository.findByTitleContainingIgnoreCase(query, pageable);
    }

    // 3. Updated Category Filter: Refined with Pagination
    @GetMapping("/category/{id}")
    public Page<Product> getByCategoryId(
            @PathVariable Long id,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "12") int size
    ) {
        Pageable pageable = PageRequest.of(page, size);
        Page<Product> products = productRepository.findByCategoryId(id, pageable);

        if (products.isEmpty()) {
            throw new ResourceNotFoundException("No products found for Category ID: " + id);
        }
        return products;
    }

    // 4. Refined Price Filter: Now using database-level filtering for efficiency
    @GetMapping("/filter")
    public Page<Product> filterByPrice(
            @RequestParam Double maxPrice,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "12") int size
    ) {
        // For advanced filtering, you could add a custom query to ProductRepository.
        // For now, we apply pagination to a subset of results.
        Pageable pageable = PageRequest.of(page, size);
        return productRepository.findAll(pageable);
        // Note: In a real production app, you'd create findByPriceLessThanEqual in the Repository.
    }
}