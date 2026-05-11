package com.ira.archive.controller;

import com.ira.archive.dto.OrderRequest;
import com.ira.archive.entity.Order;
import com.ira.archive.entity.User;
import com.ira.archive.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/orders")
@CrossOrigin(origins = "http://localhost:5173")
public class OrderController {

    @Autowired
    private OrderService orderService;

    /**
     * Finalize Acquisition
     * Now includes a basic check to ensure the request is valid before hitting the service.
     */
    @PostMapping("/place")
    public ResponseEntity<?> checkout(@RequestBody OrderRequest request, @RequestParam Long userId) {
        try {
            // 1. Basic validation: Ensure items and userId are present
            if (userId == null || request.getItems() == null || request.getItems().isEmpty()) {
                return ResponseEntity.badRequest().body("Incomplete Manifest: Member ID or Items missing.");
            }

            // 2. Prepare user reference
            User user = new User();
            user.setId(userId);

            // 3. Process the acquisition
            Order savedOrder = orderService.placeOrder(
                    user,
                    request.getItems(),
                    request.getTotalPrice(),
                    request.getShippingAddress()
            );

            return ResponseEntity.status(HttpStatus.CREATED).body(savedOrder);

        } catch (Exception e) {
            // This catches database or logic errors and returns a cleaner 500 message
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("The Archive encountered an internal error: " + e.getMessage());
        }
    }

    /**
     * Retrieve the Archivist's Log
     * Returns the full history of acquisitions for a specific member.
     */
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Order>> getHistory(@PathVariable Long userId) {
        List<Order> history = orderService.getUserOrders(userId);

        // If the vault is empty, we still return 200 but with an empty list
        // This is easier for React to handle than a 204 No Content.
        return ResponseEntity.ok(history);
    }
}