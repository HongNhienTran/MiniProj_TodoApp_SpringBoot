import api from "@/lib/axios";
import {
  Todo,
  TodoPageResponse,
  TodoRequest,
} from "@/types/todo";

export interface TodoSearchParams {
  title?: string;

  completed?: boolean;

  priority?: "LOW" | "MEDIUM" | "HIGH";

  page?: number;

  size?: number;

  sortBy?: string;

  direction?: "asc" | "desc";
}

export async function getTodos(
  params?: TodoSearchParams
): Promise<TodoPageResponse> {
  const response = await api.get("/todos", {
    params,
  });

  return response.data.data;
}

export async function searchTodos(
  params: TodoSearchParams
): Promise<TodoPageResponse> {
  const response = await api.get(
    "/todos/search",
    {
      params,
    }
  );

  return response.data.data;
}

export async function getTodoById(
  id: number
): Promise<Todo> {
  const response = await api.get(
    `/todos/${id}`
  );

  return response.data.data;
}

export async function createTodo(
  body: TodoRequest
) {
  const response = await api.post(
    "/todos",
    body
  );

  return response.data.data;
}

export async function updateTodo(
  id: number,
  body: TodoRequest
) {
  const response = await api.put(
    `/todos/${id}`,
    body
  );

  return response.data.data;
}

export async function deleteTodo(
  id: number
) {
  await api.delete(`/todos/${id}`);
}