package com.nhien.todoapi.dto.user;

import com.nhien.todoapi.entity.enums.Role;
import lombok.Data;

@Data
public class UserProfileResponse {

    private Long id;

    private String fullName;

    private String email;

    private Role role;
}