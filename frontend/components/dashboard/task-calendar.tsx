"use client";

import { useState } from "react";
import {
  startOfWeek,
  addDays,
  format,
  isSameDay,
} from "date-fns";

import { Calendar } from "@/components/ui/calendar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

type CalendarView = "month" | "week";

interface Props {
  selected: Date;
  onSelect: (date: Date) => void;
}

export function TaskCalendar({
  selected,
  onSelect,
}: Props) {
  const [view, setView] =
    useState<CalendarView>("month");

  const weekStart =
    startOfWeek(selected, {
      weekStartsOn: 1,
    });

  return (
    <Card className="p-5">

      <div className="mb-4 flex items-center justify-between">

        <div className="flex gap-2">

          <Button
            size="sm"
            variant={
              view === "month"
                ? "default"
                : "outline"
            }
            onClick={() => setView("month")}
          >
            Month
          </Button>

          <Button
            size="sm"
            variant={
              view === "week"
                ? "default"
                : "outline"
            }
            onClick={() => setView("week")}
          >
            Week
          </Button>

        </div>

        <Button
          size="sm"
          variant="secondary"
          onClick={() => onSelect(new Date())}
        >
          Today
        </Button>

      </div>

      {view === "month" ? (
        <Calendar
          mode="single"
          selected={selected}
          onSelect={(d) => d && onSelect(d)}
          className="w-full"
        />
      ) : (
        <div className="grid grid-cols-7 gap-3">

          {Array.from({ length: 7 }).map((_, i) => {
            const day = addDays(weekStart, i);

            return (
              <Button
                key={i}
                variant={
                  isSameDay(day, selected)
                    ? "default"
                    : "outline"
                }
                className="h-20 flex-col"
                onClick={() => onSelect(day)}
              >
                <span>
                  {format(day, "EEE")}
                </span>

                <span className="text-lg">
                  {format(day, "dd")}
                </span>
              </Button>
            );
          })}

        </div>
      )}

    </Card>
  );
}