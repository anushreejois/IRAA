package com.ira.archive.controller;

import com.ira.archive.entity.Product;
import com.ira.archive.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/products")
@CrossOrigin(origins = "http://localhost:5173")
public class ProductController {

    @Autowired private ProductRepository productRepository;

    @GetMapping
    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    @GetMapping("/{id}")
    public Product getProductById(@PathVariable Long id) {
        return productRepository.findById(id).orElse(null);
    }

    // POWER FEATURE: SEARCH
    @GetMapping("/search")
    public List<Product> search(@RequestParam String query) {
        return productRepository.findByTitleContainingIgnoreCase(query);
    }

    // POWER FEATURE: FILTER BY CATEGORY
    @GetMapping("/category/{id}")
    public List<Product> getByCategoryId(@PathVariable Long id) {
        return productRepository.findByCategoryId(id);
    }

    // POWER FEATURE: FILTER BY PRICE
    @GetMapping("/filter")
    public List<Product> filterByPrice(@RequestParam Double maxPrice) {
        return productRepository.findAll().stream()
                .filter(p -> p.getPrice() <= maxPrice)
                .collect(Collectors.toList());
    }
}