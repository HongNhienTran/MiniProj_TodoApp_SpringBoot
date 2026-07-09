package com.nhien.todoapi.dto.auth;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RegisterResponse {

    private Long id;

    private String fullName;

    private String email;

}