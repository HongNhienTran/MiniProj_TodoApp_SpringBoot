package com.nhien.todoapi.service.impl;

import com.nhien.todoapi.dto.TodoRequest;
import com.nhien.todoapi.dto.TodoResponse;
import com.nhien.todoapi.entity.Todo;
import com.nhien.todoapi.entity.enums.Priority;
import com.nhien.todoapi.exception.ResourceNotFoundException;
import com.nhien.todoapi.repository.TodoRepository;
import com.nhien.todoapi.service.TodoService;
import com.nhien.todoapi.specification.TodoSpecification;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class TodoServiceImpl implements TodoService {
    private final TodoRepository todoRepository;
    private static final Logger log =
            LoggerFactory.getLogger(TodoServiceImpl.class);

    public TodoServiceImpl(TodoRepository todoRepository) {
        this.todoRepository = todoRepository;
    }

    @Override
    public Page<TodoResponse> getAllTodos(int page, int size,  String sortBy, String direction) {
        Pageable pageable = buildPageable(page, size, sortBy, direction);

        log.info(
                "Fetching todos - page = {}, size= {}, sortBy= {}, direction= {}",
                page, size, sortBy, direction
        );
        return todoRepository
                .findAll(pageable)
                .map(this::convertToResponse);
    }

    @Override
    public TodoResponse getTodoById(Long id) {
        log.info("Getting todo with id={}", id);

        Todo todo = todoRepository.findById(id)
                .orElseThrow(() -> {
                    log.warn("Todo not found with id={}", id);
                    return new ResourceNotFoundException("Todo not found");
                });

        return convertToResponse(todo);
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

        log.info("Creating todo with title= {}", request.getTitle());
        Todo savedTodo = todoRepository.save(todo);
        log.info(
                "Todo created successfully with id= {}",
                savedTodo.getId()
        );

        return convertToResponse(savedTodo);
    }

    @Override
    public TodoResponse updateTodo(Long id, TodoRequest request) {
        Todo todo = todoRepository.findById(id)
                .orElseThrow(() -> {
                    log.warn("Todo not found with id={}", id);
                    return new ResourceNotFoundException("Todo not found");
                });

        todo.setTitle(request.getTitle());
        todo.setDescription(request.getDescription());
        todo.setPriority(request.getPriority());
        todo.setDueDate(request.getDueDate());

        Todo updatedTodo = todoRepository.save(todo);

        log.info(
                "Todo updated successfully with id= {}",
                id
        );

        return convertToResponse(updatedTodo);
    }

    @Override
    public void deleteTodo(Long id) {
        log.info("Deleting todo with id={}", id);

        todoRepository.findById(id)
                .orElseThrow(() -> {
                    log.warn("Todo not found with id={}", id);
                    return new ResourceNotFoundException("Todo not found");
                });

        todoRepository.deleteById(id);

        log.info("Todo deleted successfully with id={}", id);
    }

    @Override
    public Page<TodoResponse> searchTodos(String title, Boolean completed, Priority priority, int page, int size, String sortBy, String direction) {
        log.info(
                "Searching todos: title={}, completed={}, priority={}, page={}, size={}",
                title,
                completed,
                priority,
                page,
                size
        );
        Pageable pageable = buildPageable(page, size, sortBy, direction);

        Specification<Todo> spec = (root, query, cb) -> cb.conjunction();

        if(title != null && !title.isBlank()){

            spec = spec.and(
                    TodoSpecification.hasTitle(title)
            );

        }

        if(completed != null){

            spec = spec.and(
                    TodoSpecification.hasCompleted(completed)
            );

        }

        if(priority != null){

            spec = spec.and(
                    TodoSpecification.hasPriority(priority)
            );

        }

        Page<Todo> todos = todoRepository.findAll(spec, pageable);

        log.info("Found {} todos", todos.getTotalElements());

        return todos.map(this::convertToResponse);
    }

    private TodoResponse convertToResponse(Todo todo){
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

    private Pageable buildPageable(int page,
                                   int size,
                                   String sortBy,
                                   String direction) {
        Sort sort = direction.equalsIgnoreCase("desc")
                ? Sort.by(sortBy).descending()
                : Sort.by(sortBy).ascending();

        return PageRequest.of(page, size, sort);
    }
}
