package com.ira.archive.dto;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class AuthResponse {
    // Setters (Optional but good practice)
    // Getters
    private String token;
    private Long id;
    private String name;
    private String email;
    private String role;

    // Standard constructor
    public AuthResponse(String token, Long id, String name, String email, String role) {
        this.token = token;
        this.id = id;
        this.name = name;
        this.email = email;
        this.role = role;
    }

    // FIX: If your AuthController is passing the JWT as the last argument,
    // make sure you actually assign the values!
    public AuthResponse(Long id, String name, String email, String role, String jwt) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.role = role;
        this.token = jwt; // Assign the JWT to our token field
    }

}