"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import {
  getTodos,
  createTodo,
  updateTodo,
  deleteTodo,
  TodoFilter,
} from "@/services/todo.service";

import { TodoRequest } from "@/types/todo";

export function useTodos(filter?: TodoFilter) {
  return useQuery({
    queryKey: ["todos", filter],
    queryFn: () => getTodos(filter),
  });
}

export function useCreateTodo() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: TodoRequest) => createTodo(data),

    onSuccess: () => {
      toast.success("Created successfully");

      queryClient.invalidateQueries({
        queryKey: ["todos"],
      });
    },
  });
}

export function useUpdateTodo() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: number;
      data: TodoRequest;
    }) => updateTodo(id, data),

    onSuccess: () => {
      toast.success("Updated successfully");

      queryClient.invalidateQueries({
        queryKey: ["todos"],
      });
    },
  });
}

export function useDeleteTodo() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => deleteTodo(id),

    onSuccess: () => {
      toast.success("Deleted successfully");

      queryClient.invalidateQueries({
        queryKey: ["todos"],
      });
    },
  });
}