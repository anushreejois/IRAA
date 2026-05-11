package com.ira.archive.controller;

import com.ira.archive.entity.Product;
import com.ira.archive.repository.ProductRepository;
import com.ira.archive.exception.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    @Autowired
    private ProductRepository productRepository;

    // 1. UPLOAD NEW ARTIFACT
    @PostMapping("/products")
    public ResponseEntity<Product> addProduct(@RequestBody Product product) {
        return ResponseEntity.ok(productRepository.save(product));
    }

    // 2. UPDATE EXISTING ARTIFACT
    @PutMapping("/products/{id}")
    public ResponseEntity<Product> updateProduct(@PathVariable Long id, @RequestBody Product details) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found"));

        product.setTitle(details.getTitle());
        product.setPrice(details.getPrice());
        product.setStock(details.getStock());
        product.setImageUrl(details.getImageUrl());

        return ResponseEntity.ok(productRepository.save(product));
    }

    // 3. REMOVE FROM ARCHIVE
    @DeleteMapping("/products/{id}")
    public ResponseEntity<?> deleteProduct(@PathVariable Long id) {
        productRepository.deleteById(id);
        return ResponseEntity.ok("Artifact removed from the archive.");
    }
}