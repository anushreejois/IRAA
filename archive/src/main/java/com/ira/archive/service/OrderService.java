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

    /**
     * Finalize Acquisition
     * Saves the order manifest and links all individual items to it.
     */
    @Transactional
    public Order placeOrder(User user, List<OrderItem> items, Double total, String address) {
        Order order = new Order();

        order.setUser(user);
        order.setOrderDate(LocalDateTime.now());
        order.setStatus("ARCHIVED"); // Default status for IRA
        order.setTotalPrice(total);
        order.setShippingAddress(address);

        // Link each individual item to this specific order manifest
        for (OrderItem item : items) {
            item.setOrder(order);
        }

        order.setItems(items);
        return orderRepository.save(order);
    }

    /**
     * Fetch by Email
     * Updated to match the repository's sorted method: findByUser_EmailOrderByOrderDateDesc
     */
    public List<Order> getUserOrdersByMail(String email) {
        return orderRepository.findByUser_EmailOrderByOrderDateDesc(email);
    }

    /**
     * Fetch by User ID
     * Primary method used by the Archivist's Log (OrderHistory.jsx)
     */
    public List<Order> getUserOrders(Long userId) {
        return orderRepository.findByUserIdOrderByOrderDateDesc(userId);
    }
}