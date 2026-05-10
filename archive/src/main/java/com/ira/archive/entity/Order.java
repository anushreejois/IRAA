package com.ira.archive.entity;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "orders")
@Data
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // The total value of the acquisition
    private Double totalPrice;

    // Brand Status: "ARCHIVED", "IN_TRANSIT", "DELIVERED"
    private String status;

    // The destination for the artifacts
    private String shippingAddress;

    private LocalDateTime orderDate;

    // Many orders can belong to one member
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    // One order contains many items
    // CascadeType.ALL ensures that saving the Order also saves the OrderItems
    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<OrderItem> items;
}