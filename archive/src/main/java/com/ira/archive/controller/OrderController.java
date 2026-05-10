package com.ira.archive.controller;

import com.ira.archive.dto.OrderRequest; // Import the DTO
import com.ira.archive.entity.Order;
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

    /**
     * Updated checkout logic to resolve the argument mismatch.
     * We now accept OrderRequest to capture total and address.
     */
    @PostMapping("/place")
    public ResponseEntity<Order> checkout(@RequestBody OrderRequest request, @RequestParam Long userId) {
        // Mocking the user for now using the ID provided in the request param
        User user = new User();
        user.setId(userId);

        // Pass all 4 required arguments to match the OrderService.placeOrder signature
        Order savedOrder = orderService.placeOrder(
                user,
                request.getItems(),
                request.getTotalPrice(),
                request.getShippingAddress()
        );

        return ResponseEntity.ok(savedOrder);
    }

    // GET ORDER HISTORY
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Order>> getHistory(@PathVariable Long userId) {
        return ResponseEntity.ok(orderService.getUserOrders(userId));
    }
}