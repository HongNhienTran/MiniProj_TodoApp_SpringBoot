package com.nhien.todoapi.repository;

import com.nhien.todoapi.entity.Todo;
import com.nhien.todoapi.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.util.Optional;

public interface TodoRepository extends JpaRepository<Todo, Long>, JpaSpecificationExecutor<Todo> {
    Page<Todo> findByUser(User user, Pageable pageable);

    Optional<Todo> findByIdAndUser(Long id, User user);
}
