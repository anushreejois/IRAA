package com.ira.archive.dto;

import com.ira.archive.entity.OrderItem;
import lombok.Data;
import java.util.List;

@Data
public class OrderRequest {
    private String userMail;
    private List<OrderItem> items;
    private Double totalPrice;
    private String shippingAddress;
}