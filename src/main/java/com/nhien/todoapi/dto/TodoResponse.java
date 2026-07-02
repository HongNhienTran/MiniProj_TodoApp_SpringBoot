package com.nhien.todoapi.dto;

import com.nhien.todoapi.entity.enums.Priority;
import lombok.Data;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
public class TodoResponse {
    private Long id;
    private String title;
    private String description;
    private Boolean completed;
    private LocalDate dueDate;
    private Priority priority;
    private LocalDateTime createdAt;
}
