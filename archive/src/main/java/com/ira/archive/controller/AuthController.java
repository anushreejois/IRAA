package com.ira.archive.controller;

import com.ira.archive.dto.AuthResponse;
import com.ira.archive.dto.LoginRequest;
import com.ira.archive.dto.SignupRequest;
import com.ira.archive.entity.User;
import com.ira.archive.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173") // Handshake with React
public class AuthController {

    @Autowired
    private UserService userService;

    // 1. SIGNUP ENDPOINT
    @PostMapping("/signup")
    public ResponseEntity<?> register(@RequestBody SignupRequest request) {
        String result = userService.registerUser(request);
        if (result.contains("Error")) {
            return ResponseEntity.badRequest().body(result);
        }
        return ResponseEntity.ok(result);
    }

    // 2. LOGIN ENDPOINT
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        User user = userService.loginUser(request);
        if (user != null) {
            // We return the AuthResponse DTO (Security Shield)
            return ResponseEntity.ok(new AuthResponse(
                    user.getId(),
                    user.getName(),
                    user.getEmail(),
                    user.getRole(),
                    "Login Successful"
            ));
        }
        return ResponseEntity.status(401).body("Invalid email or password");
    }
}