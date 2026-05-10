package com.ira.archive.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "order_items")
@Data
public class OrderItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // The specific size chosen by the member (S, M, L, XL)
    private String size;

    private Integer quantity;

    // The price of the item at the exact moment of purchase
    private Double price;

    @ManyToOne
    @JoinColumn(name = "order_id")
    @JsonIgnore // Prevents circular reference loops during JSON conversion
    private Order order;

    @ManyToOne
    @JoinColumn(name = "product_id")
    private Product product;
}