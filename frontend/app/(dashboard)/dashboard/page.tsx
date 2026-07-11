"use client";

import { StatsCard } from "@/components/dashboard/stats-card";
import { TaskCalendar } from "@/components/dashboard/task-calendar";
import { UpcomingTask } from "@/components/dashboard/upcoming-task";

import { useTodos } from "@/hooks/use-todos";

export default function DashboardPage() {

  const { data, isLoading } = useTodos({

    page: 0,

    size: 1000,

  });

  const todos = data?.content ?? [];

  const total = todos.length;

  const completed = todos.filter(

    t => t.completed

  ).length;

  const pending = todos.filter(

    t => !t.completed

  ).length;

  const high = todos.filter(

    t => t.priority === "HIGH"

  ).length;

  return (

    <div className="space-y-6">

      <div>

        <h1 className="text-3xl font-bold">

          Dashboard

        </h1>

        <p className="text-muted-foreground">

          Welcome back!

        </p>

      </div>

      <div className="grid gap-4 md:grid-cols-4">

        <StatsCard
          title="Total"
          value={total}
        />

        <StatsCard
          title="Completed"
          value={completed}
        />

        <StatsCard
          title="Pending"
          value={pending}
        />

        <StatsCard
          title="High Priority"
          value={high}
        />

      </div>

      <div className="grid lg:grid-cols-3 gap-4">

        <div className="lg:col-span-2">

          <TaskCalendar />

        </div>

        <UpcomingTask
          todos={todos.slice(0, 5)}
        />

      </div>

    </div>

  )

}