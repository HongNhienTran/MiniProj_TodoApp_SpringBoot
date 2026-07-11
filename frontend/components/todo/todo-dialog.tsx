"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";

import { Todo, TodoRequest } from "@/types/todo";
import { useCreateTodo } from "@/hooks/use-todos";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface TodoDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialData?: Todo;
}

export function TodoDialog({
  open,
  onOpenChange,
  initialData,
}: TodoDialogProps) {
  const createTodo = useCreateTodo();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
  } = useForm<TodoRequest>({
    defaultValues: {
      title: "",
      description: "",
      priority: "MEDIUM",
      dueDate: "",
    },
  });

  useEffect(() => {
    if (!open) {
      reset({
        title: "",
        description: "",
        priority: "MEDIUM",
        dueDate: "",
      });

      return;
    }

    if (initialData) {
      reset({
        title: initialData.title,
        description: initialData.description,
        priority: initialData.priority,
        dueDate: initialData.dueDate,
      });
    }
  }, [open, initialData, reset]);

  const onSubmit = async (data: TodoRequest) => {
    await createTodo.mutateAsync(data);

    onOpenChange(false);

    reset();
  };

  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
    >
      <DialogContent className="sm:max-w-lg">

        <DialogHeader>
          <DialogTitle>Create Todo</DialogTitle>
        </DialogHeader>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-5"
        >
          <div className="space-y-2">
            <label className="text-sm font-medium">
              Title
            </label>

            <Input
              placeholder="Learn Spring Boot"
              {...register("title", {
                required: true,
              })}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">
              Description
            </label>

            <Textarea
              rows={4}
              placeholder="Description..."
              {...register("description")}
            />
          </div>

          <div className="space-y-2">
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

          <div className="space-y-2">
            <label className="text-sm font-medium">
              Due Date
            </label>

            <Input
              type="date"
              {...register("dueDate")}
            />
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>

            <Button
              type="submit"
              disabled={createTodo.isPending}
            >
              {createTodo.isPending
                ? "Creating..."
                : "Create"}
            </Button>
          </DialogFooter>
        </form>

      </DialogContent>
    </Dialog>
  );
}