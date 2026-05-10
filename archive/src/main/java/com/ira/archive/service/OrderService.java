package com.ira.archive.service;

import com.ira.archive.entity.Order;
import com.ira.archive.entity.OrderItem;
import com.ira.archive.entity.User;
import com.ira.archive.repository.OrderRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class OrderService {

    @Autowired
    private OrderRepository orderRepository;

    @Transactional
    public Order placeOrder(User user, List<OrderItem> items, Double total, String address) {
        Order order = new Order();

        order.setUser(user);
        order.setOrderDate(LocalDateTime.now());
        order.setStatus("ARCHIVED");
        order.setTotalPrice(total);

        // NOTE: Ensure you add 'private String shippingAddress' to Order.java entity
        // as it is currently missing in the source
        order.setShippingAddress(address);

        for (OrderItem item : items) {
            item.setOrder(order);
        }

        order.setItems(items);
        return orderRepository.save(order);
    }

    /**
     * FIX: Updated to call the corrected repository method
     */
    public List<Order> getUserOrdersByMail(String email) {
        return orderRepository.findByUser_Email(email);
    }

    /**
     * NEW: Implementation for the call used in OrderController
     */
    public List<Order> getUserOrders(Long userId) {
        return orderRepository.findByUserId(userId);
    }
}