package com.nhien.todoapi.integration;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.nhien.todoapi.dto.TodoRequest;
import com.nhien.todoapi.entity.enums.Priority;
import com.nhien.todoapi.repository.TodoRepository;
import jakarta.transaction.Transactional;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
@Transactional
public class TodoIntegrationTest {
    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private TodoRepository todoRepository;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    void shouldCreateTodoSuccessfully() throws Exception {

        TodoRequest request = new TodoRequest();

        request.setTitle("Learn Integration Test");
        request.setDescription("Spring Boot");
        request.setPriority(Priority.HIGH);

        mockMvc.perform(
                        post("/api/todos")
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(objectMapper.writeValueAsString(request))
                )
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.data.title")
                        .value("Learn Integration Test"));

        assertEquals(1, todoRepository.count());
    }
}
