package com.nhien.todoapi.controller;

import com.nhien.todoapi.dto.auth.RegisterRequest;
import com.nhien.todoapi.dto.auth.RegisterResponse;
import com.nhien.todoapi.response.ApiResponse;
import com.nhien.todoapi.service.AuthService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/register")
    @ResponseStatus(HttpStatus.CREATED)
    public ApiResponse<RegisterResponse> register(
            @Valid @RequestBody RegisterRequest request) {

        RegisterResponse response = authService.register(request);

        return ApiResponse.success(
                "User registered successfully",
                response
        );
    }
}