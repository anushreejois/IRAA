package com.ira.archive.controller;

import com.ira.archive.entity.Cart;
import com.ira.archive.service.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/cart")
@CrossOrigin(origins = "http://localhost:5173")
public class CartController {

    @Autowired private CartService cartService;

    @GetMapping("/{userId}")
    public Cart getCart(@PathVariable Long userId) {
        return cartService.getCartByUser(userId);
    }

    @PostMapping("/add")
    public Cart addToCart(@RequestParam Long userId, @RequestParam Long productId, @RequestParam Integer qty) {
        return cartService.addItem(userId, productId, qty);
    }
}