package com.ira.archive.repository;

import com.ira.archive.entity.CartItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CartItemRepository extends JpaRepository<CartItem, Long> {
    // Basic CRUD operations are enough for now
}