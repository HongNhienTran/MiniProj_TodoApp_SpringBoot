package com.nhien.todoapi.service.impl;

import com.nhien.todoapi.dto.user.ChangePasswordRequest;
import com.nhien.todoapi.dto.user.UpdateProfileRequest;
import com.nhien.todoapi.dto.user.UserProfileResponse;
import com.nhien.todoapi.entity.User;
import com.nhien.todoapi.exception.InvalidPasswordException;
import com.nhien.todoapi.exception.ResourceNotFoundException;
import com.nhien.todoapi.repository.UserRepository;
import com.nhien.todoapi.service.UserService;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserServiceImpl(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
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

        User user = getCurrentUser();

        return toProfile(user);
    }

    @Override
    public UserProfileResponse updateProfile(UpdateProfileRequest request) {

        User user = getCurrentUser();

        user.setFullName(request.getFullName());

        User updatedUser = userRepository.save(user);

        return toProfile(updatedUser);
    }

    @Override
    public void changePassword(ChangePasswordRequest request) {

        User user = getCurrentUser();

        if (!passwordEncoder.matches(
                request.getOldPassword(),
                user.getPassword())) {

            throw new InvalidPasswordException(
                    "Old password is incorrect");
        }

        user.setPassword(
                passwordEncoder.encode(
                        request.getNewPassword()
                )
        );

        userRepository.save(user);
    }

    private UserProfileResponse toProfile(User user) {

        UserProfileResponse response = new UserProfileResponse();

        response.setId(user.getId());
        response.setFullName(user.getFullName());
        response.setEmail(user.getEmail());
        response.setRole(user.getRole());

        return response;
    }
}

