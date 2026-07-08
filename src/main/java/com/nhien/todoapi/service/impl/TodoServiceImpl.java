package com.nhien.todoapi.service.impl;

import com.nhien.todoapi.dto.TodoRequest;
import com.nhien.todoapi.dto.TodoResponse;
import com.nhien.todoapi.entity.Todo;
import com.nhien.todoapi.entity.User;
import com.nhien.todoapi.entity.enums.Priority;
import com.nhien.todoapi.exception.ResourceNotFoundException;
import com.nhien.todoapi.repository.TodoRepository;
import com.nhien.todoapi.service.TodoService;
import com.nhien.todoapi.service.UserService;
import com.nhien.todoapi.specification.TodoSpecification;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.*;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

@Service
public class TodoServiceImpl implements TodoService {

    private static final Logger log =
            LoggerFactory.getLogger(TodoServiceImpl.class);

    private final TodoRepository todoRepository;
    private final UserService userService;

    public TodoServiceImpl(
            TodoRepository todoRepository,
            UserService userService
    ) {
        this.todoRepository = todoRepository;
        this.userService = userService;
    }

    @Override
    public Page<TodoResponse> getAllTodos(
            int page,
            int size,
            String sortBy,
            String direction
    ) {

        Pageable pageable = buildPageable(page, size, sortBy, direction);

        User currentUser = userService.getCurrentUser();

        log.info(
                "Fetching todos of user={} page={}, size={}",
                currentUser.getEmail(),
                page,
                size
        );

        return todoRepository
                .findByUser(currentUser, pageable)
                .map(this::convertToResponse);
    }

    @Override
    public TodoResponse getTodoById(Long id) {

        log.info("Getting todo id={}", id);

        User currentUser = userService.getCurrentUser();

        Todo todo = todoRepository
                .findByIdAndUser(id, currentUser)
                .orElseThrow(() -> {
                    log.warn("Todo not found id={}", id);
                    return new ResourceNotFoundException("Todo not found");
                });

        return convertToResponse(todo);
    }

    @Override
    public TodoResponse createTodo(TodoRequest request) {

        User currentUser = userService.getCurrentUser();

        log.info(
                "Creating todo '{}' for user={}",
                request.getTitle(),
                currentUser.getEmail()
        );

        Todo todo = new Todo();

        todo.setTitle(request.getTitle());
        todo.setDescription(request.getDescription());
        todo.setPriority(request.getPriority());
        todo.setDueDate(request.getDueDate());
        todo.setUser(currentUser);

        Todo savedTodo = todoRepository.save(todo);

        log.info("Todo created successfully id={}", savedTodo.getId());

        return convertToResponse(savedTodo);
    }

    @Override
    public TodoResponse updateTodo(Long id, TodoRequest request) {

        User currentUser = userService.getCurrentUser();

        Todo todo = todoRepository
                .findByIdAndUser(id, currentUser)
                .orElseThrow(() -> {
                    log.warn("Todo not found id={}", id);
                    return new ResourceNotFoundException("Todo not found");
                });

        todo.setTitle(request.getTitle());
        todo.setDescription(request.getDescription());
        todo.setPriority(request.getPriority());
        todo.setDueDate(request.getDueDate());

        Todo updatedTodo = todoRepository.save(todo);

        log.info("Todo updated successfully id={}", id);

        return convertToResponse(updatedTodo);
    }

    @Override
    public void deleteTodo(Long id) {

        User currentUser = userService.getCurrentUser();

        Todo todo = todoRepository
                .findByIdAndUser(id, currentUser)
                .orElseThrow(() -> {
                    log.warn("Todo not found id={}", id);
                    return new ResourceNotFoundException("Todo not found");
                });

        todoRepository.delete(todo);

        log.info("Todo deleted successfully id={}", id);
    }

    @Override
    public Page<TodoResponse> searchTodos(
            String title,
            Boolean completed,
            Priority priority,
            int page,
            int size,
            String sortBy,
            String direction
    ) {

        User currentUser = userService.getCurrentUser();

        Pageable pageable = buildPageable(page, size, sortBy, direction);

        Specification<Todo> spec = Specification.where(
                TodoSpecification.hasUser(currentUser)
        );

        if (title != null && !title.isBlank()) {
            spec = spec.and(TodoSpecification.hasTitle(title));
        }

        if (completed != null) {
            spec = spec.and(TodoSpecification.hasCompleted(completed));
        }

        if (priority != null) {
            spec = spec.and(TodoSpecification.hasPriority(priority));
        }

        Page<Todo> todos =
                todoRepository.findAll(spec, pageable);

        log.info(
                "Found {} todos for user={}",
                todos.getTotalElements(),
                currentUser.getEmail()
        );

        return todos.map(this::convertToResponse);
    }

    private TodoResponse convertToResponse(Todo todo) {

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

    private Pageable buildPageable(
            int page,
            int size,
            String sortBy,
            String direction
    ) {

        Sort sort = direction.equalsIgnoreCase("desc")
                ? Sort.by(sortBy).descending()
                : Sort.by(sortBy).ascending();

        return PageRequest.of(page, size, sort);
    }
}