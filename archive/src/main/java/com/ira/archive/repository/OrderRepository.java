package com.ira.archive.repository;

import com.ira.archive.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface OrderRepository extends JpaRepository<Order, Long> {
    // FIX: Renamed from findByUser_UserMail to findByUser_Email to match User.java
    List<Order> findByUser_Email(String email);

    // NEW: Added to support the controller's lookup by ID
    List<Order> findByUserId(Long userId);
}