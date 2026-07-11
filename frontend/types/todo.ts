export interface Todo {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  priority: "LOW" | "MEDIUM" | "HIGH";
  createdAt: string;
}

export interface TodoPageResponse {
  content: Todo[];

  totalElements: number;

  totalPages: number;

  number: number;

  size: number;
}

export interface TodoRequest {
  title: string;
  description: string;
  priority: "LOW" | "MEDIUM" | "HIGH";
  completed?: boolean;
}