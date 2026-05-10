package com.ira.archive.service;

import com.ira.archive.entity.*;
import com.ira.archive.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.*;

@Service
public class CartService {
    @Autowired private CartRepository cartRepo;
    @Autowired private CartItemRepository itemRepo;

    public Cart getCartByUser(Long userId) {
        return cartRepo.findByUserId(userId).orElseGet(() -> {
            Cart newCart = new Cart();
            User user = new User(); user.setId(userId);
            newCart.setUser(user);
            return cartRepo.save(newCart);
        });
    }

    public Cart addItem(Long userId, Long productId, Integer qty) {
        Cart cart = getCartByUser(userId);
        Optional<CartItem> existingItem = cart.getItems().stream()
                .filter(i -> i.getProduct().getId().equals(productId)).findFirst();

        if (existingItem.isPresent()) {
            existingItem.get().setQuantity(existingItem.get().getQuantity() + qty);
        } else {
            CartItem item = new CartItem();
            Product p = new Product(); p.setId(productId);
            item.setProduct(p);
            item.setQuantity(qty);
            item.setCart(cart);
            cart.getItems().add(item);
        }
        return cartRepo.save(cart);
    }
}