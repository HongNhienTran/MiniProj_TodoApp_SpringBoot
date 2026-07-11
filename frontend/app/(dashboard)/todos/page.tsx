"use client";

import { useState } from "react";

import { useSearchTodos } from "@/hooks/use-search-todos";

import { TodoFilter } from "@/components/todo/todo-filter";

import { TodoList } from "@/components/todo/todo-list";

export default function TodoPage() {

  const [keyword, setKeyword] =
    useState("");

  const { data, isLoading } =
    useSearchTodos({

      title: keyword,

      page: 0,

      size: 10,

    });

  return (

    <div className="space-y-6">

      <div>

        <h1 className="text-3xl font-bold">

          Todos

        </h1>

      </div>

      <TodoFilter

        keyword={keyword}

        setKeyword={setKeyword}

      />

      {isLoading ? (

        <p>Loading...</p>

      ) : (

        <TodoList

          todos={data?.content ?? []}

        />

      )}

    </div>

  );
}