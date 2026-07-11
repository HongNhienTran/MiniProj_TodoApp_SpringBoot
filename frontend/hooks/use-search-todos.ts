"use client";

import { useQuery } from "@tanstack/react-query";

import {
  searchTodos,
  TodoSearchParams,
} from "@/services/todo.service";

export function useSearchTodos(
  params: TodoSearchParams
) {
  return useQuery({
    queryKey: ["todo-search", params],

    queryFn: () => searchTodos(params),
  });
}