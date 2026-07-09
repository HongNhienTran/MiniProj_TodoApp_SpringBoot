package com.nhien.todoapi.controller;

import com.nhien.todoapi.dto.user.ChangePasswordRequest;
import com.nhien.todoapi.dto.user.UpdateProfileRequest;
import com.nhien.todoapi.dto.user.UserProfileResponse;
import com.nhien.todoapi.response.ApiResponse;
import com.nhien.todoapi.service.UserService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/me")
    public ApiResponse<UserProfileResponse> getProfile() {

        return ApiResponse.success(
                "Profile retrieved successfully",
                userService.getProfile()
        );
    }

    @PutMapping("/me")
    public ApiResponse<UserProfileResponse> updateProfile(
            @Valid @RequestBody UpdateProfileRequest request) {

        return ApiResponse.success(
                "Profile updated successfully",
                userService.updateProfile(request)
        );
    }

    @PutMapping("/change-password")
    public ApiResponse<Void> changePassword(
            @Valid @RequestBody ChangePasswordRequest request) {

        userService.changePassword(request);

        return ApiResponse.success(
                "Password changed successfully",
                null
        );
    }
}