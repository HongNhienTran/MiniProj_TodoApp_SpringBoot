import { Todo } from "@/types/todo";

import { TodoCard } from "./todo-card";

interface Props {
  todos: Todo[];
}

export function TodoList({
  todos,
}: Props) {
  return (
    <div className="space-y-4">

      {todos.map((todo) => (

        <TodoCard
          key={todo.id}
          todo={todo}
        />

      ))}

    </div>
  );
}