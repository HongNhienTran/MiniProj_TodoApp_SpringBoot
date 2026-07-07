package com.nhien.todoapi.service;

import com.nhien.todoapi.dto.auth.RegisterRequest;
import com.nhien.todoapi.dto.auth.RegisterResponse;

public interface AuthService {

    RegisterResponse register(RegisterRequest request);

}