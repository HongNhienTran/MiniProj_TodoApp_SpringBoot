"use client";

import { useState } from "react";
import { Plus } from "lucide-react";

import { useSearchTodos } from "@/hooks/use-search-todos";

import { Button } from "@/components/ui/button";

import { TodoFilter } from "@/components/todo/todo-filter";
import { TodoList } from "@/components/todo/todo-list";
import { TodoDialog } from "@/components/todo/todo-dialog";

export default function TodoPage() {
  const [title, setTitle] = useState("");

  const [completed, setCompleted] = useState<
    boolean | undefined
  >(undefined);

  const [priority, setPriority] = useState<
    "LOW" | "MEDIUM" | "HIGH" | undefined
  >(undefined);

  const [sortBy, setSortBy] =
    useState("createdAt");

  const [direction, setDirection] = useState<
    "asc" | "desc"
  >("desc");

  const [open, setOpen] =
    useState(false);

  const { data, isLoading } =
    useSearchTodos({
      title,
      completed,
      priority,
      sortBy,
      direction,
      page: 0,
      size: 10,
    });

  return (
    <div className="space-y-6">

      <div className="flex items-center justify-between">

        <div>

          <h1 className="text-3xl font-bold">
            Todos
          </h1>

          <p className="text-muted-foreground">
            Manage your daily tasks
          </p>

        </div>

        <Button onClick={() => setOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          New Todo
        </Button>

      </div>

      <TodoFilter
        title={title}
        setTitle={setTitle}

        completed={completed}
        setCompleted={setCompleted}

        priority={priority}
        setPriority={setPriority}

        sortBy={sortBy}
        setSortBy={setSortBy}

        direction={direction}
        setDirection={setDirection}
      />

      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <TodoList
          todos={data?.content ?? []}
        />
      )}

      <TodoDialog
        open={open}
        onOpenChange={setOpen}
      />

    </div>
  );
}