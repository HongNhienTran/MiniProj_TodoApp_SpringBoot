"use client";

import { Todo } from "@/types/todo";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Props {
  date: Date;
  todos: Todo[];
}

export function TasksSelectedDate({
  date,
  todos,
}: Props) {
  return (
    <Card className="p-5 mt-4">

      <h3 className="font-semibold mb-4">
        Tasks Selected Date
      </h3>

      <p className="text-sm text-muted-foreground mb-4">
        {date.toLocaleDateString()}
      </p>

      {todos.length === 0 ? (
        <p className="text-sm text-muted-foreground">
          No task.
        </p>
      ) : (
        <div className="space-y-3">
          {todos.map((todo) => (
            <div
              key={todo.id}
              className="rounded-lg border p-3"
            >
              <div className="flex justify-between">

                <span className="font-medium">
                  {todo.title}
                </span>

                <Badge>
                  {todo.priority}
                </Badge>

              </div>

              <p className="text-sm text-muted-foreground mt-2">
                {todo.description}
              </p>

            </div>
          ))}
        </div>
      )}

    </Card>
  );
}