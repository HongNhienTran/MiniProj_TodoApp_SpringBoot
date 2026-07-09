package com.nhien.todoapi.service;

import com.nhien.todoapi.dto.user.ChangePasswordRequest;
import com.nhien.todoapi.dto.user.UpdateProfileRequest;
import com.nhien.todoapi.dto.user.UserProfileResponse;
import com.nhien.todoapi.entity.User;

public interface UserService {
    User getCurrentUser();

    UserProfileResponse getProfile();

    UserProfileResponse updateProfile(UpdateProfileRequest request);

    void changePassword(ChangePasswordRequest request);
}
