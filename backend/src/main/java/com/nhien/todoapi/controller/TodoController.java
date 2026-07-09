package com.nhien.todoapi.controller;

import com.nhien.todoapi.dto.TodoRequest;
import com.nhien.todoapi.dto.TodoResponse;
import com.nhien.todoapi.entity.enums.Priority;
import com.nhien.todoapi.response.ApiResponse;
import com.nhien.todoapi.service.TodoService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Tag(
        name = "Todo API",
        description = "APIs for managing todos"
)
@RestController
@RequestMapping("/api/todos")
    public class TodoController {
        private final TodoService todoService;

        public TodoController(TodoService todoService) {
            this.todoService = todoService;
        }

        @Operation(
                summary = "Get all todos",
                description = "Returns paginated list of todos"
        )
        @GetMapping
        public ResponseEntity<ApiResponse<Page<TodoResponse>>> getAllTodos(
                @RequestParam(defaultValue = "0")
                int page,
                @RequestParam(defaultValue = "10")
                int size,
                @RequestParam(defaultValue = "id")
                String sortBy,
                @RequestParam(defaultValue = "asc")
                String direction
        ) {
            Page<TodoResponse> todos = todoService.getAllTodos(page, size, sortBy, direction);
            return ResponseEntity.ok(
                    new ApiResponse<>(
                            true,
                            "Todos retrieved successfully",
                            todos
                    )
            );
        }

        @Operation(
                summary = "Get todo by id"
        )
        @GetMapping("/{id}")
        public ResponseEntity<ApiResponse<TodoResponse>> getTodoById(@PathVariable Long id) {
            TodoResponse todo = todoService.getTodoById(id);
            return ResponseEntity.ok(
                    new ApiResponse<>(
                            true,
                            "Todo retrieved successfully",
                            todo
                    )
            );
        }

        @Operation(
                summary = "Create new todo"
        )
        @PostMapping
        @ResponseStatus(HttpStatus.CREATED)
        public ResponseEntity<ApiResponse<TodoResponse>> createTodo(@Valid @RequestBody TodoRequest request) {
            TodoResponse todo = todoService.createTodo(request);
            return ResponseEntity.status(HttpStatus.CREATED)
                    .body(
                            new ApiResponse<>(
                                    true,
                                    "Todo created successfully",
                                    todo
                            )
                    );
        }

        @Operation(
                summary = "Update todo"
        )
        @PutMapping("/{id}")
        public ResponseEntity<ApiResponse<TodoResponse>> updateTodo(
                @PathVariable Long id,
                @Valid
                @RequestBody TodoRequest request
        ) {
            TodoResponse todo = todoService.updateTodo(id, request);
            return ResponseEntity.ok(
                    new ApiResponse<>(
                            true,
                            "Todo updated successfully",
                            todo
                    )
            );
        }

        @Operation(
                summary = "Delete todo"
        )
        @DeleteMapping("/{id}")
        public ResponseEntity<ApiResponse<Void>> deleteTodo(@PathVariable Long id) {
            todoService.deleteTodo(id);

            return ResponseEntity.ok(
                    new ApiResponse<>(
                            true,
                            "Todo deleted successfully",
                            null
                    )
            );
        }

        @Operation(
                summary = "Search todos"
        )
        @GetMapping("/search")
        public ResponseEntity<ApiResponse<Page<TodoResponse>>> getTodos(
                @RequestParam(required = false) String title,
                @RequestParam(required = false) Boolean completed,
                @RequestParam(required = false) Priority priority,

                @RequestParam(defaultValue = "0") int page,
                @RequestParam(defaultValue = "10") int size,
                @RequestParam(defaultValue = "id") String sortBy,
                @RequestParam(defaultValue = "asc") String direction
        ) {

            Page<TodoResponse> todos =
                    todoService.searchTodos(
                            title,
                            completed,
                            priority,
                            page,
                            size,
                            sortBy,
                            direction
                    );
            return ResponseEntity.ok(
                    new ApiResponse<>(
                            true,
                            "Todos retrieved successfully",
                            todos
                    )
            );
        }
}



