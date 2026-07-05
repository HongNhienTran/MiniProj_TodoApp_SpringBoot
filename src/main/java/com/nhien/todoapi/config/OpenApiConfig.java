package com.nhien.todoapi.config;

import io.swagger.v3.oas.models.ExternalDocumentation;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class OpenApiConfig {

    @Bean
    public OpenAPI todoOpenAPI(){
        return new OpenAPI()
                .info(new Info()
                        .title("Todo REST API")
                        .description("Spring Boot Todo Management API")
                        .version("1.0")
                        .contact(
                                new Contact()
                                        .name("Tran Hong Nhien")
                                        .email("hongnhientran.contact@gmail.com")
                        )
                        .license(new License()
                                .name("MIT License")))
                .externalDocs(new ExternalDocumentation()
                        .description("Project Documentation")
                        .url("https://github.com/HongNhienTran/MiniProj_TodoApp_SpringBoot.git")
                );
    }
}
