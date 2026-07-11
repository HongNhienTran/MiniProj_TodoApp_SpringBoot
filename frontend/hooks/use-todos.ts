"use client";

import { useQuery } from "@tanstack/react-query";
import {
  getTodos,
  TodoFilter,
} from "@/services/todo.service";

export function useTodos(filter?: TodoFilter) {
  return useQuery({
    queryKey: ["todos", filter],
    queryFn: () => getTodos(filter),
  });
}