package com.nhien.todoapi.service;

import com.nhien.todoapi.dto.TodoResponse;
import com.nhien.todoapi.entity.Todo;
import com.nhien.todoapi.entity.enums.Priority;
import com.nhien.todoapi.exception.ResourceNotFoundException;
import com.nhien.todoapi.repository.TodoRepository;
import com.nhien.todoapi.service.impl.TodoServiceImpl;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class TodoServiceImplTest {

    @Mock
    private TodoRepository todoRepository;

    @InjectMocks
    private TodoServiceImpl todoService;

    @Test
    void shouldReturnTodoWhenIdExists() {

        // Arrange
        Todo todo = new Todo();
        todo.setId(1L);
        todo.setTitle("Learn Spring Boot");
        todo.setDescription("Study DTO");
        todo.setCompleted(false);
        todo.setPriority(Priority.HIGH);
        todo.setDueDate(LocalDate.now());
        todo.setCreatedAt(LocalDateTime.now());

        when(todoRepository.findById(1L))
                .thenReturn(Optional.of(todo));

        // Act
        TodoResponse response = todoService.getTodoById(1L);

        // Assert
        assertNotNull(response);
        assertEquals(1L, response.getId());
        assertEquals("Learn Spring Boot", response.getTitle());
        assertEquals("Study DTO", response.getDescription());
        assertEquals(Priority.HIGH, response.getPriority());
        assertFalse(response.getCompleted());

        verify(todoRepository, times(1)).findById(1L);
    }

    @Test
    void shouldThrowExceptionWhenTodoNotFound() {

        // Arrange
        when(todoRepository.findById(100L))
                .thenReturn(Optional.empty());

        // Act & Assert
        ResourceNotFoundException exception =
                assertThrows(
                        ResourceNotFoundException.class,
                        () -> todoService.getTodoById(100L)
                );

        assertEquals("Todo not found", exception.getMessage());

        verify(todoRepository, times(1)).findById(100L);
    }
}