package com.ira.archive.controller;

import com.ira.archive.dto.AuthResponse;
import com.ira.archive.dto.LoginRequest;
import com.ira.archive.dto.SignupRequest;
import com.ira.archive.entity.User;
import com.ira.archive.security.JwtUtils;
import com.ira.archive.service.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserService userService;

    @Autowired
    private JwtUtils jwtUtils;

    // 1. SIGNUP ENDPOINT (Now with @Valid)
    @PostMapping("/signup")
    public ResponseEntity<?> register(@Valid @RequestBody SignupRequest request) {
        String result = userService.registerUser(request);
        if (result.contains("Error")) {
            return ResponseEntity.badRequest().body(result);
        }
        return ResponseEntity.ok(result);
    }

    // 2. LOGIN ENDPOINT (Now with @Valid)
    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody LoginRequest request) {
        // Authenticate using the manager
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);

        // Generate the JWT
        String jwt = jwtUtils.generateJwtToken(authentication);

        // Get user details
        User user = userService.findByEmail(request.getEmail());

        // Return response including the Token
        return ResponseEntity.ok(new AuthResponse(
                user.getId(),
                user.getName(),
                user.getEmail(),
                user.getRole(),
                jwt
        ));
    }
}