package com.ira.archive.service;

import com.ira.archive.entity.Order;
import com.ira.archive.entity.OrderItem;
import com.ira.archive.entity.User;
import com.ira.archive.repository.OrderRepository;
import jakarta.transaction.Transactional; // Crucial for database safety
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class OrderService {

    @Autowired
    private OrderRepository orderRepository;

    /**
     * This method takes the processed data from the Controller
     * and saves it as a permanent record.
     */
    @Transactional
    public Order placeOrder(User user, List<OrderItem> items, Double total, String address) {
        Order order = new Order();

        // 1. Set the basic Order details
        order.setUser(user);
        order.setOrderDate(LocalDateTime.now());
        order.setStatus("ARCHIVED"); // Using your brand language
        order.setTotalPrice(total);
        order.setShippingAddress(address); // Make sure this field exists in your Order.java!

        // 2. Connect the Items to this Order
        // In JPA, we must tell each Item which Order it belongs to
        for (OrderItem item : items) {
            item.setOrder(order);
        }

        order.setItems(items);

        // 3. Save the whole bundle to MySQL
        return orderRepository.save(order);
    }

    /**
     * Used to display the "Past Acquisitions" for a specific member.
     */
    public List<Order> getUserOrdersByMail(String email) {
        return orderRepository.findByUser_UserMail(email);
    }
}