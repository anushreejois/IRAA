package com.ira.archive.controller;

import com.ira.archive.entity.Order;
import com.ira.archive.entity.OrderItem;
import com.ira.archive.entity.User;
import com.ira.archive.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/orders")
@CrossOrigin(origins = "http://localhost:5173")
public class OrderController {

    @Autowired
    private OrderService orderService;

    // 1. PLACE ORDER (Checkout)
    @PostMapping("/place")
    public ResponseEntity<Order> checkout(@RequestBody List<OrderItem> items, @RequestParam Long userId) {
        // In a real app, we'd get the User from the session/context
        User user = new User();
        user.setId(userId);

        Order savedOrder = orderService.placeOrder(user, items);
        return ResponseEntity.ok(savedOrder);
    }

    // 2. GET ORDER HISTORY
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Order>> getHistory(@PathVariable Long userId) {
        return ResponseEntity.ok(orderService.getUserOrders(userId));
    }
}