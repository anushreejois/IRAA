package com.ira.archive.repository;

import com.ira.archive.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Long> {
    // JpaRepository gives us save(), findAll(), findById(), and delete() for free!
}