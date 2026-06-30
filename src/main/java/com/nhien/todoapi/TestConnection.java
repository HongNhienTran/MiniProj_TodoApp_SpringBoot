package com.nhien.todoapi;

import java.sql.Connection;
import java.sql.DriverManager;
import java.util.TimeZone;

public class TestConnection {

    public static void main(String[] args) throws Exception {

        System.setProperty("user.timezone", "Asia/Ho_Chi_Minh");
        TimeZone.setDefault(TimeZone.getTimeZone("Asia/Ho_Chi_Minh"));

        System.out.println(TimeZone.getDefault());

        Connection conn = DriverManager.getConnection(
                "jdbc:postgresql://localhost:5432/todo_db",
                "postgres",
                "postgres"
        );

        System.out.println("Connected!");
    }
}