package com.ira.archive.repository;

import com.ira.archive.entity.Cart;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface CartRepository extends JpaRepository<Cart, Long> {

    // Crucial for the CartService to find the user's specific cart
    Optional<Cart> findByUserId(Long userId);
}