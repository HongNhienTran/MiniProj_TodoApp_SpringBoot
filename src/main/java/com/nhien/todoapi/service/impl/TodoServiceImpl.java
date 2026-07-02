package com.nhien.todoapi.service.impl;

import com.nhien.todoapi.dto.TodoRequest;
import com.nhien.todoapi.dto.TodoResponse;
import com.nhien.todoapi.entity.Todo;
import com.nhien.todoapi.exception.ResourceNotFoundException;
import com.nhien.todoapi.repository.TodoRepository;
import com.nhien.todoapi.service.TodoService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class TodoServiceImpl implements TodoService {
    private final TodoRepository todoRepository;

    public TodoServiceImpl(TodoRepository todoRepository) {
        this.todoRepository = todoRepository;
    }

    @Override
    public Page<TodoResponse> getAllTodos(int page, int size,  String sortBy, String direction) {
        Sort sort = direction.equalsIgnoreCase("desc")
                ? Sort.by(sortBy).descending()
                : Sort.by(sortBy).ascending();

        Pageable pageable = PageRequest.of(page, size, sort);

        return todoRepository
                .findAll(pageable)
                .map(this::convertToRespone);
    }

    @Override
    public TodoResponse getTodoById(Long id) {
        Todo todo = todoRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Todo not found"));
        return convertToRespone(todo);
    }

    @Override
    public TodoResponse createTodo(TodoRequest request) {

        Todo todo = new Todo();

        todo.setTitle(request.getTitle());
        todo.setDescription(request.getDescription());
        todo.setPriority(request.getPriority());
        todo.setDueDate(request.getDueDate());
        todo.setCompleted(false);
        todo.setCreatedAt(LocalDateTime.now());

        Todo savedTodo = todoRepository.save(todo);

        return convertToRespone(savedTodo);
    }

    @Override
    public TodoResponse updateTodo(Long id, TodoRequest request) {
        Todo todo = todoRepository.findById(id)
                        .orElseThrow(() -> new ResourceNotFoundException("Todo not found"));

        todo.setTitle(todo.getTitle());
        todo.setDescription(todo.getDescription());
        todo.setPriority(todo.getPriority());
        todo.setDueDate(todo.getDueDate());

        Todo updatedTodo = todoRepository.save(todo);

        return convertToRespone(updatedTodo);
    }

    @Override
    public void deleteTodo(Long id) {
        Todo todo = todoRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Todo not found"));

        todoRepository.deleteById(id);
    }

    private TodoResponse convertToRespone(Todo todo){
        TodoResponse response = new TodoResponse();

        response.setId(todo.getId());
        response.setTitle(todo.getTitle());
        response.setDescription(todo.getDescription());
        response.setCompleted(todo.getCompleted());
        response.setPriority(todo.getPriority());
        response.setDueDate(todo.getDueDate());
        response.setCreatedAt(todo.getCreatedAt());

        return response;
    }
}
