package com.ira.archive;

import com.ira.archive.entity.Category;
import com.ira.archive.entity.Product;
import com.ira.archive.repository.CategoryRepository;
import com.ira.archive.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.Arrays;

@Component
public class DataLoader implements CommandLineRunner {

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private ProductRepository productRepository;

    @Override
    public void run(String... args) throws Exception {
        if (categoryRepository.count() == 0) {
            // 1. Create Categories
            Category heritage = new Category();
            heritage.setName("The Heritage Core");
            heritage.setImageUrl("https://images.unsplash.com/photo-1594633312681-425c7b97ccd1");

            Category minimal = new Category();
            minimal.setName("Minimal Silhouettes");
            minimal.setImageUrl("https://images.unsplash.com/photo-1515886657613-9f3515b0c78f");

            categoryRepository.saveAll(Arrays.asList(heritage, minimal));

            // 2. Create Products for Heritage
            Product p1 = new Product();
            p1.setTitle("Raw Silk Vest");
            p1.setDescription("Hand-woven raw silk vest with minimal silhouette.");
            p1.setPrice(120.0);
            p1.setStock(15);
            p1.setRating(4.8);
            p1.setImageUrl("https://images.unsplash.com/photo-1539109132314-34a7795ee12f");
            p1.setCategory(heritage);

            Product p2 = new Product();
            p2.setTitle("Ikat Overcoat");
            p2.setDescription("Authentic heritage Ikat patterns on a modern long coat.");
            p2.setPrice(250.0);
            p2.setStock(10);
            p2.setRating(4.9);
            p2.setImageUrl("https://images.unsplash.com/photo-1591047139829-d91aecb6caea");
            p2.setCategory(heritage);

            productRepository.saveAll(Arrays.asList(p1, p2));

            System.out.println(">> IRA Archive: Database seeded with fashion items!");
        }
    }
}