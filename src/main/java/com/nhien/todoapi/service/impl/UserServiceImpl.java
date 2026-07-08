package com.nhien.todoapi.service.impl;

import com.nhien.todoapi.dto.user.ChangePasswordRequest;
import com.nhien.todoapi.dto.user.UpdateProfileRequest;
import com.nhien.todoapi.dto.user.UserProfileResponse;
import com.nhien.todoapi.entity.User;
import com.nhien.todoapi.exception.ResourceNotFoundException;
import com.nhien.todoapi.repository.UserRepository;
import com.nhien.todoapi.service.UserService;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    public UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public User getCurrentUser() {
        Authentication authentication =
                SecurityContextHolder.getContext().getAuthentication();

        String email = authentication.getName();

        return userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new ResourceNotFoundException("User not found"));
    }

    @Override
    public UserProfileResponse getProfile() {
        return null;
    }

    @Override
    public UserProfileResponse updateProfile(UpdateProfileRequest request) {
        return null;
    }

    @Override
    public void changePassword(ChangePasswordRequest request) {

    }
}

