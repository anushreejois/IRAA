package com.ira.archive.controller;

import com.ira.archive.entity.Wishlist;
import com.ira.archive.repository.WishlistRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/wishlist")
@CrossOrigin(origins = "http://localhost:5173")
public class WishlistController {

    @Autowired private WishlistRepository wishlistRepo;

    @GetMapping("/{userId}")
    public List<Wishlist> getWishlist(@PathVariable Long userId) {
        return wishlistRepo.findByUserId(userId);
    }

    @PostMapping("/add")
    public Wishlist addToWishlist(@RequestBody Wishlist wishlist) {
        return wishlistRepo.save(wishlist);
    }
}