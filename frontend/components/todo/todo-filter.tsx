"use client";

import { Input } from "@/components/ui/input";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Props {
  title: string;
  setTitle: (value: string) => void;

  completed?: boolean;
  setCompleted: (value: boolean | undefined) => void;

  priority?: "LOW" | "MEDIUM" | "HIGH";
  setPriority: (
    value: "LOW" | "MEDIUM" | "HIGH" | undefined
  ) => void;

  sortBy: string;
  setSortBy: (value: string) => void;

  direction: "asc" | "desc";
  setDirection: (value: "asc" | "desc") => void;
}

export function TodoFilter({
  title,
  setTitle,

  completed,
  setCompleted,

  priority,
  setPriority,

  sortBy,
  setSortBy,

  direction,
  setDirection,
}: Props) {
  return (
    <div className="flex flex-wrap gap-3">

      <Input
        className="w-72"
        placeholder="Search title..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <Select
        value={priority ?? ""}
        onValueChange={(value) =>
          setPriority(
            value === ""
              ? undefined
              : (value as "LOW" | "MEDIUM" | "HIGH")
          )
        }
      >
        <SelectTrigger className="w-40">
          <SelectValue placeholder="Priority" />
        </SelectTrigger>

        <SelectContent>
          <SelectItem value="">All Priority</SelectItem>
          <SelectItem value="LOW">Low</SelectItem>
          <SelectItem value="MEDIUM">Medium</SelectItem>
          <SelectItem value="HIGH">High</SelectItem>
        </SelectContent>
      </Select>

      <Select
        value={
          completed === undefined
            ? ""
            : completed
            ? "true"
            : "false"
        }
        onValueChange={(value) => {
          if (value === "") {
            setCompleted(undefined);
          } else {
            setCompleted(value === "true");
          }
        }}
      >
        <SelectTrigger className="w-40">
          <SelectValue placeholder="Status" />
        </SelectTrigger>

        <SelectContent>
          <SelectItem value="">All Status</SelectItem>
          <SelectItem value="true">
            Completed
          </SelectItem>
          <SelectItem value="false">
            Pending
          </SelectItem>
        </SelectContent>
      </Select>

      <Select
        value={sortBy}
        onValueChange={setSortBy}
      >
        <SelectTrigger className="w-44">
          <SelectValue />
        </SelectTrigger>

        <SelectContent>
          <SelectItem value="createdAt">
            Created Time
          </SelectItem>

          <SelectItem value="title">
            Title
          </SelectItem>

          <SelectItem value="priority">
            Priority
          </SelectItem>

          <SelectItem value="dueDate">
            Due Date
          </SelectItem>
        </SelectContent>
      </Select>

      <Select
        value={direction}
        onValueChange={(value) =>
          setDirection(value as "asc" | "desc")
        }
      >
        <SelectTrigger className="w-36">
          <SelectValue />
        </SelectTrigger>

        <SelectContent>
          <SelectItem value="asc">
            Ascending
          </SelectItem>

          <SelectItem value="desc">
            Descending
          </SelectItem>
        </SelectContent>
      </Select>

    </div>
  );
}