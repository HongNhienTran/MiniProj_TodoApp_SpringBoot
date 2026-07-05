package com.nhien.todoapi.service;

import com.nhien.todoapi.dto.TodoRequest;
import com.nhien.todoapi.dto.TodoResponse;
import com.nhien.todoapi.entity.Todo;
import com.nhien.todoapi.entity.enums.Priority;
import org.springframework.data.domain.Page;

import java.util.List;

public interface TodoService {
    Page<TodoResponse> getAllTodos(int page, int size,
                                    String sortBy, String direction);
    TodoResponse getTodoById(Long id);
    TodoResponse createTodo(TodoRequest request);
    TodoResponse updateTodo(Long id, TodoRequest request);
    void deleteTodo(Long id);
    Page<TodoResponse> searchTodos(String title,
                                   Boolean completed,
                                   Priority priority,
                                   int page,
                                   int size,
                                   String sortBy,
                                   String direction);
}
