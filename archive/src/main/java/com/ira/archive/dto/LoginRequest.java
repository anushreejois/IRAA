package com.ira.archive.dto;

import lombok.Data;

@Data
public class LoginRequest {
    private String email;
    private String password;
}