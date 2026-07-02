package com.nhien.todoapi.dto;

import com.nhien.todoapi.entity.enums.Priority;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

import java.time.LocalDate;

@Data
public class TodoRequest {
    @NotBlank
    private String title;
    private String description;
    private LocalDate dueDate;
    private Priority priority;
}
