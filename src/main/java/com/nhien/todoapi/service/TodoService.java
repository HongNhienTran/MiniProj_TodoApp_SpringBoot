package com.nhien.todoapi.service;

import com.nhien.todoapi.dto.TodoRequest;
import com.nhien.todoapi.dto.TodoResponse;
import com.nhien.todoapi.entity.Todo;

import java.util.List;

public interface TodoService {
    List<TodoResponse> getAllTodos();
    TodoResponse getTodoById(Long id);
    TodoResponse createTodo(TodoRequest request);
    TodoResponse updateTodo(Long id, TodoRequest request);
    void deleteTodo(Long id);
}
