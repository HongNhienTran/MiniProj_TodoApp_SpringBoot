import { Todo } from "@/types/todo";

import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";

interface Props {
  todo: Todo;
}

export function TodoCard({
  todo,
}: Props) {
  return (
    <Card>

      <CardHeader>

        <div className="flex justify-between">

          <h3 className="font-semibold">

            {todo.title}

          </h3>

          <Badge>

            {todo.priority}

          </Badge>

        </div>

      </CardHeader>

      <CardContent>

        <p>

          {todo.description}

        </p>

        <p className="mt-3 text-sm text-muted-foreground">

          Due: {todo.dueDate}

        </p>

      </CardContent>

    </Card>
  );
}