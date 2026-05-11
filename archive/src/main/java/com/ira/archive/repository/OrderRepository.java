package com.ira.archive.repository;

import com.ira.archive.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {

    // 1. Find by Email (Useful for administrative lookups or support)
    // Refined to include sorting by Date (Descending)
    List<Order> findByUser_EmailOrderByOrderDateDesc(String email);

    // 2. Find by User ID (Primary method for the 'OrderHistory.jsx' page)
    // We use 'OrderByOrderDateDesc' to ensure the newest manifest appears first
    List<Order> findByUserIdOrderByOrderDateDesc(Long userId);

    // 3. Optional: Find by status (Useful if you want to filter "Processing" vs "Archived")
    List<Order> findByUserIdAndStatus(Long userId, String status);
}