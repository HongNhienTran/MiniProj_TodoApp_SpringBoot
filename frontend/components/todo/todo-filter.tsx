"use client";

import { Button } from "@/components/ui/button";
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
    <div className="flex flex-wrap items-center gap-3">

      <Input
        placeholder="Search title..."
        className="w-72"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <Select
        value={priority ?? "ALL"}
        onValueChange={(value) =>
          setPriority(
            value === "ALL"
              ? undefined
              : (value as "LOW" | "MEDIUM" | "HIGH")
          )
        }
      >
        <SelectTrigger className="w-40">
          <SelectValue placeholder="Priority" />
        </SelectTrigger>

        <SelectContent>
          <SelectItem value="ALL">All Priority</SelectItem>
          <SelectItem value="LOW">Low</SelectItem>
          <SelectItem value="MEDIUM">Medium</SelectItem>
          <SelectItem value="HIGH">High</SelectItem>
        </SelectContent>
      </Select>

      <Select
        value={
          completed === undefined
            ? "ALL"
            : completed
            ? "TRUE"
            : "FALSE"
        }
        onValueChange={(value) => {
          if (value === "ALL") {
            setCompleted(undefined);
          } else {
            setCompleted(value === "TRUE");
          }
        }}
      >
        <SelectTrigger className="w-40">
          <SelectValue placeholder="Status" />
        </SelectTrigger>

        <SelectContent>
          <SelectItem value="ALL">All Status</SelectItem>
          <SelectItem value="TRUE">Completed</SelectItem>
          <SelectItem value="FALSE">Pending</SelectItem>
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

      <Button>
        Search
      </Button>

    </div>
  );
}