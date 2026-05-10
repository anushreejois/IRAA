package com.ira.archive.service;

import com.ira.archive.entity.*;
import com.ira.archive.repository.*;
import com.ira.archive.exception.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.*;

@Service
public class CartService {
    @Autowired private CartRepository cartRepo;
    @Autowired private CartItemRepository itemRepo;
    @Autowired private ProductRepository productRepo;
    @Autowired private UserRepository userRepo;

    public Cart getCartByUser(Long userId) {
        return cartRepo.findByUserId(userId).orElseGet(() -> {
            Cart newCart = new Cart();
            User user = userRepo.findById(userId)
                    .orElseThrow(() -> new ResourceNotFoundException("User not found"));
            newCart.setUser(user);
            return cartRepo.save(newCart);
        });
    }

    @Transactional
    public Cart addItem(Long userId, Long productId, Integer qty) {
        Cart cart = getCartByUser(userId);

        // Find if the product is already in the cart
        Optional<CartItem> existingItem = cart.getItems().stream()
                .filter(i -> i.getProduct().getId().equals(productId)).findFirst();

        if (existingItem.isPresent()) {
            existingItem.get().setQuantity(existingItem.get().getQuantity() + qty);
        } else {
            Product product = productRepo.findById(productId)
                    .orElseThrow(() -> new ResourceNotFoundException("Product not found"));

            CartItem newItem = new CartItem();
            newItem.setProduct(product);
            newItem.setQuantity(qty);
            newItem.setCart(cart);
            cart.getItems().add(newItem);
        }
        return cartRepo.save(cart);
    }

    @Transactional
    public Cart removeItem(Long userId, Long productId) {
        Cart cart = getCartByUser(userId);
        cart.getItems().removeIf(item -> item.getProduct().getId().equals(productId));
        return cartRepo.save(cart);
    }

    @Transactional
    public void clearCart(Long userId) {
        Cart cart = getCartByUser(userId);
        cart.getItems().clear();
        cartRepo.save(cart);
    }
}