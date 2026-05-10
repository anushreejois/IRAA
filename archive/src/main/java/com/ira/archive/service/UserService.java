package com.ira.archive.service;

import com.ira.archive.dto.LoginRequest;
import com.ira.archive.dto.SignupRequest;
import com.ira.archive.entity.User;
import com.ira.archive.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    // 1. SIGNUP LOGIC
    public String registerUser(SignupRequest request) {
        // Check if email already exists
        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            return "Error: Email already in use!";
        }

        User user = new User();
        user.setName(request.getName());
        user.setEmail(request.getEmail());
        user.setRole("USER"); // Default role

        // THE BCRYPT THINGY: Hash the password before saving
        String hashedPassword = passwordEncoder.encode(request.getPassword());
        user.setPassword(hashedPassword);

        userRepository.save(user);
        return "User registered successfully!";
    }

    // 2. SIMPLE LOGIN LOGIC (No JWT)
    public User loginUser(LoginRequest request) {
        Optional<User> userOpt = userRepository.findByEmail(request.getEmail());

        if (userOpt.isPresent()) {
            User user = userOpt.get();
            // Check if the raw password matches the hashed password in DB
            if (passwordEncoder.matches(request.getPassword(), user.getPassword())) {
                return user; // Login successful
            }
        }
        return null; // Login failed
    }
}