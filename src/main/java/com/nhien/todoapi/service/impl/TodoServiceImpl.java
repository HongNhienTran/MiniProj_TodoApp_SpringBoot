package com.nhien.todoapi.service.impl;

import com.nhien.todoapi.entity.Todo;
import com.nhien.todoapi.repository.TodoRepository;
import com.nhien.todoapi.service.TodoService;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class TodoServiceImpl implements TodoService {
    private final TodoRepository todoRepository;

    public TodoServiceImpl(TodoRepository todoRepository) {
        this.todoRepository = todoRepository;
    }

    @Override
    public List<Todo> getAllTodos() {
        return todoRepository.findAll();
    }

    @Override
    public Todo getTodoById(Long id) {
        return todoRepository.findById(id).orElse(null);
    }

    @Override
    public Todo createTodo(Todo todo) {
        todo.setCreatedAt(LocalDateTime.now());
        todo.setCompleted(false);

        return todoRepository.save(todo);
    }

    @Override
    public Todo updateTodo(Long id, Todo todo) {
        Todo existing = todoRepository.findById(id).orElse(null);
        if (existing != null) {
            return null;
        }

        existing.setTitle(todo.getTitle());
        existing.setDescription(todo.getDescription());
        existing.setPriority(todo.getPriority());
        existing.setDueDate(todo.getDueDate());
        existing.setCompleted(todo.getCompleted());

        return todoRepository.save(existing);
    }

    @Override
    public void deleteTodo(Long id) {
        todoRepository.deleteById(id);
    }
}
