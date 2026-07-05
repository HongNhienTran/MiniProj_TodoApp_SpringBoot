package com.nhien.todoapi.controller;

import com.nhien.todoapi.dto.TodoRequest;
import com.nhien.todoapi.dto.TodoResponse;
import com.nhien.todoapi.entity.Todo;
import com.nhien.todoapi.entity.enums.Priority;
import com.nhien.todoapi.service.TodoService;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/todos")
public class TodoController {
    private final TodoService todoService;

    public TodoController(TodoService todoService) {
        this.todoService = todoService;
    }

    @GetMapping
    public Page<TodoResponse> getAllTodos(
            @RequestParam(defaultValue = "0")
            int page,
            @RequestParam(defaultValue = "10")
            int size,
            @RequestParam(defaultValue = "id")
            String sortBy,
            @RequestParam(defaultValue = "asc")
            String direction
    ) {
        return todoService.getAllTodos(page, size, sortBy, direction);
    }

    @GetMapping("/{id}")
    public TodoResponse getTodoById(@PathVariable Long id){
        return todoService.getTodoById(id);
    }

    @PostMapping
    public TodoResponse createTodo(@Valid @RequestBody TodoRequest request){
        return todoService.createTodo(request);
    }

    @PutMapping("/{id}")
    public TodoResponse updateTodo(
            @PathVariable Long id,
            @Valid
            @RequestBody TodoRequest request
    ){
        return todoService.updateTodo(id, request);
    }

    @DeleteMapping("/{id}")
    public void deleteTodo(@PathVariable Long id){
        todoService.deleteTodo(id);
    }

    @GetMapping("/search")
    public Page<TodoResponse> getTodos(
            @RequestParam(required = false) String  title,
            @RequestParam(required = false) Boolean completed,
            @RequestParam(required = false) Priority priority,

            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "id") String sortBy,
            @RequestParam(defaultValue = "asc") String direction
            ){
        return todoService.searchTodos(
                title,
                completed,
                priority,
                page,
                size,
                sortBy,
                direction
        );
    }
}
