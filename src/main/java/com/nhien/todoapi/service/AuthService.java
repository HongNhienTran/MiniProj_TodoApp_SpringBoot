package com.nhien.todoapi.service;

import com.nhien.todoapi.dto.auth.LoginRequest;
import com.nhien.todoapi.dto.auth.LoginResponse;
import com.nhien.todoapi.dto.auth.RegisterRequest;
import com.nhien.todoapi.dto.auth.RegisterResponse;

public interface AuthService {

    RegisterResponse register(RegisterRequest request);
    LoginResponse login(LoginRequest request);

}