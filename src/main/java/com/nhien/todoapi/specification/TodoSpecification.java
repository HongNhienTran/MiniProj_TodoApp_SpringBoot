package com.nhien.todoapi.specification;

import com.nhien.todoapi.entity.Todo;
import com.nhien.todoapi.entity.enums.Priority;
import org.springframework.data.jpa.domain.Specification;

public class TodoSpecification {

    public static Specification<Todo> hasTitle(String title){
        return (root, query, cb) ->
                cb.like(
                        cb.lower(root.get("title")),
                        "%" + title.toLowerCase() + "%"
                );
    }

    public static Specification<Todo> hasCompleted(Boolean completed){
        return (root, query, cb) ->
                cb.equal(root.get("completed"), completed);
    }

    public static Specification<Todo> hasPriority(Priority priority){
        return (root, query, cb) ->
                cb.equal(root.get("priority"), priority);
    }

}
