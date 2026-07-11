"use client";

import { useEffect, useState } from "react";
import { Eye, Trash2 } from "lucide-react";
import { useForm } from "react-hook-form";

import { Todo, TodoRequest } from "@/types/todo";

import {
  useDeleteTodo,
  useUpdateTodo,
} from "@/hooks/use-todos";

import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Props {
  todo: Todo;
}

export function TodoCard({
  todo,
}: Props) {
  const [open, setOpen] = useState(false);

  const deleteTodo = useDeleteTodo();
  const updateTodo = useUpdateTodo();

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
  } = useForm<TodoRequest>();

  useEffect(() => {
    reset({
      title: todo.title,
      description: todo.description,
      priority: todo.priority,
      dueDate: todo.dueDate,
      completed: todo.completed,
    });
  }, [todo, reset]);

  const handleDelete = async () => {
    const ok = confirm(`Delete "${todo.title}" ?`);

    if (!ok) return;

    await deleteTodo.mutateAsync(todo.id);
  };

  const handleCompleted = async (
    checked: boolean
  ) => {
    await updateTodo.mutateAsync({
      id: todo.id,
      data: {
        title: todo.title,
        description: todo.description,
        priority: todo.priority,
        dueDate: todo.dueDate,
        completed: checked,
      },
    });
  };

  const onSubmit = async (
    data: TodoRequest
  ) => {
    await updateTodo.mutateAsync({
      id: todo.id,
      data,
    });

    setOpen(false);
  };

  return (
    <>
      <Card>

        <CardHeader>

          <div className="flex items-start gap-3">

            <Checkbox
              checked={todo.completed}
              onCheckedChange={(checked) =>
                handleCompleted(Boolean(checked))
              }
            />

            <div className="flex-1">

              <div className="flex items-center justify-between">

                <h3
                  className={`font-semibold ${
                    todo.completed
                      ? "line-through text-muted-foreground"
                      : ""
                  }`}
                >
                  {todo.title}
                </h3>

                <Badge>
                  {todo.priority}
                </Badge>

              </div>

              <p className="mt-2 text-sm text-muted-foreground">
                {todo.description || "No description"}
              </p>

            </div>

          </div>

        </CardHeader>

        <CardContent>

          <div className="flex items-center justify-between">

            <p className="text-sm text-muted-foreground">
              Due: {todo.dueDate || "-"}
            </p>

            <div className="flex gap-2">

              <Button
                size="icon"
                variant="outline"
                onClick={() => setOpen(true)}
              >
                <Eye className="h-4 w-4" />
              </Button>

              <Button
                size="icon"
                variant="destructive"
                onClick={handleDelete}
              >
                <Trash2 className="h-4 w-4" />
              </Button>

            </div>

          </div>

        </CardContent>

      </Card>

      <Dialog
        open={open}
        onOpenChange={setOpen}
      >

        <DialogContent className="sm:max-w-lg">

          <DialogHeader>

            <DialogTitle>
              Todo Detail
            </DialogTitle>

          </DialogHeader>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-5"
          >

            <div>

              <label className="text-sm font-medium">
                Title
              </label>

              <Input
                {...register("title", {
                  required: true,
                })}
              />

            </div>

            <div>

              <label className="text-sm font-medium">
                Description
              </label>

              <Textarea
                rows={4}
                {...register("description")}
              />

            </div>

            <div>

              <label className="text-sm font-medium">
                Priority
              </label>

              <Select
                value={watch("priority")}
                onValueChange={(value) =>
                  setValue(
                    "priority",
                    value as
                      | "LOW"
                      | "MEDIUM"
                      | "HIGH"
                  )
                }
              >

                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>

                <SelectContent>

                  <SelectItem value="LOW">
                    Low
                  </SelectItem>

                  <SelectItem value="MEDIUM">
                    Medium
                  </SelectItem>

                  <SelectItem value="HIGH">
                    High
                  </SelectItem>

                </SelectContent>

              </Select>

            </div>

            <div>

              <label className="text-sm font-medium">
                Due Date
              </label>

              <Input
                type="date"
                {...register("dueDate")}
              />

            </div>

            <div className="flex items-center gap-3">

              <Checkbox
                checked={watch("completed")}
                onCheckedChange={(checked) =>
                  setValue(
                    "completed",
                    Boolean(checked)
                  )
                }
              />

              <span>
                Completed
              </span>

            </div>

            <DialogFooter>

              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  reset();
                  setOpen(false);
                }}
              >
                Cancel
              </Button>

              <Button
                type="submit"
                disabled={updateTodo.isPending}
              >
                {updateTodo.isPending
                  ? "Saving..."
                  : "Save"}
              </Button>

            </DialogFooter>

          </form>

        </DialogContent>

      </Dialog>
    </>
  );
}